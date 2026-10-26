// Oberfläche der App „Restlos“ – rendert Ansichten aus dem Zustand und speichert lokal im Browser.
(() => {
  const { Z, REZ } = L;
  const KEY = "restlos-v1";
  const heute = () => L.isoDatum(new Date());
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const marktName = (id) => window.MAERKTE.find((m) => m.id === id)?.n || id;
  const marktFarbe = (id) => window.MAERKTE.find((m) => m.id === id)?.farbe || "#888";

  // ---------- Zustand ----------
  function standard() {
    return {
      einstellungen: {
        start: heute(),
        tage: 7,
        portionen: 2,
        mahlzeiten: {
          fruehstueck: [false, false, false, false, false, true, true],
          mittag: [true, true, true, true, true, true, true],
          abend: [true, true, true, true, true, true, true],
        },
        ausgeschlossen: ["champignons"],
        vorratFehlt: [],
        budget: null,
        maerkte: window.MAERKTE.map((m) => m.id),
        kombiAb: 3,
        theme: "auto",
      },
      plan: null,
      wuensche: [],
      favoriten: [],
      bewertungen: {},
      gesperrt: [],
      vorrat: {},
      gefroren: [],
      habeIch: {},
      abgehakt: {},
      zuletzt: [],
    };
  }
  function laden() {
    const s0 = standard();
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === "object") {
        // Alte Favoriten werden zu 5-Sterne-Bewertungen
        if (s.favoriten?.length) {
          s.bewertungen = { ...(s.bewertungen || {}) };
          for (const id of s.favoriten) s.bewertungen[id] ??= 5;
          s.favoriten = [];
        }
        return { ...s0, ...s, einstellungen: { ...s0.einstellungen, ...s.einstellungen, mahlzeiten: { ...s0.einstellungen.mahlzeiten, ...(s.einstellungen?.mahlzeiten || {}) } } };
      }
    } catch (e) { /* leerer oder gesperrter Speicher */ }
    return s0;
  }
  let S = laden();
  function speichern() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignorieren */ }
  }

  const ui = { tab: "plan", filter: "alle", zutatFilter: null, suche: "", sheet: null, sheetSuche: "", einkaufAnsicht: "abteilung", portionen: null };
  try { ui.tab = sessionStorage.getItem("restlos-tab") || "plan"; } catch (e) { /* egal */ }

  // ---------- Hilfen ----------
  let toastTimer;
  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("on"), 2400);
  }
  const plural = (n, a, b) => `${L.zahl(n)} ${n === 1 ? a : b}`;
  const rezeptNamen = (ids) => [...new Set(ids)].map((id) => REZ[id]?.n).filter(Boolean).join(", ");
  const slotTeile = (key) => { const [d, s] = key.split("-"); return { d: Number(d), s }; };
  const slotIso = (key) => L.plusTage(S.plan.start, slotTeile(key).d);
  const slotLabel = (key) => `${L.datumKurz(slotIso(key))} ${L.SLOT_NAME[slotTeile(key).s]}`;
  function anwendenTheme() {
    const t = S.einstellungen.theme;
    if (t === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
  }

  function aendern(fn, msg) {
    fn();
    speichern();
    render();
    if (msg) toast(msg);
  }

  // ---------- Plan-Operationen ----------
  function referenzen(id) {
    return Object.entries(S.plan.mahlzeiten).filter(([, m]) => m.id === id);
  }
  // Entfernt die Mahlzeit an key. Hängen Reste an einem Kochvorgang, wird der erste Rest zum Kochtermin.
  function slotFreimachen(key) {
    const p = S.plan;
    const m = p.mahlzeiten[key];
    if (!m) return;
    delete p.mahlzeiten[key];
    if (m.art === "koch") {
      const refs = referenzen(m.id).sort((a, b) => L.slotOrder(a[0]) - L.slotOrder(b[0]));
      if (refs.length) {
        const [k2] = refs[0];
        p.mahlzeiten[k2] = { art: "koch", id: m.id };
        p.kochen[m.id].key = k2;
        p.kochen[m.id].portionen = Math.max(refs.length, p.kochen[m.id].portionen - 1);
      } else delete p.kochen[m.id];
    }
  }
  function setzeRezept(key, rid) {
    const p = S.plan;
    const m = p.mahlzeiten[key];
    if (m && m.art === "koch") {
      p.kochen[m.id].rid = rid;
      p.kochen[m.id].weg = [];
      return;
    }
    if (m) slotFreimachen(key);
    const id = L.uid();
    const { s } = slotTeile(key);
    p.kochen[id] = { rid, portionen: 1, typ: s, key, weg: [] };
    p.mahlzeiten[key] = { art: "koch", id };
  }
  function setzeRest(key, quelle) {
    slotFreimachen(key);
    const p = S.plan;
    p.mahlzeiten[key] = { art: "rest", id: quelle };
    const info = L.portionenInfo(p, quelle);
    if (info.uebrig < 0) p.kochen[quelle].portionen = info.gegessen;
  }
  function setzeFrei(key) {
    slotFreimachen(key);
    S.plan.mahlzeiten[key] = { art: "frei" };
  }
  function setzeTk(key, idx) {
    const g = S.gefroren[idx];
    if (!g) return;
    slotFreimachen(key);
    S.plan.mahlzeiten[key] = { art: "tk", rid: g.rid };
    g.portionen -= 1;
    if (g.portionen <= 0) S.gefroren.splice(idx, 1);
  }
  function neuPlanen() {
    S.plan = L.neuerPlan(S);
    S.abgehakt = {};
  }

  function wocheAbschliessen() {
    const p = S.plan;
    const { kaufen, habeIch } = L.einkaufsliste(p, S);
    const neu = { ...S.vorrat };
    for (const e of [...kaufen, ...habeIch.filter((x) => x.ausVorrat)]) {
      const z = Z[e.id];
      const rest = Math.max(0, e.rest || 0);
      // Sehr Verderbliches ohne Einfriermöglichkeit gilt nach einer Woche als verbraucht
      if (rest > 0.01 && (z.sh > 7 || z.fz || z.tk)) neu[e.id] = Math.round(rest * 100) / 100;
      else delete neu[e.id];
    }
    S.vorrat = neu;
    for (const k of L.kochListe(p)) {
      if (!k.rid) continue;
      const info = L.portionenInfo(p, k.id);
      if (info.uebrig > 0) {
        const vorh = S.gefroren.find((g) => g.rid === k.rid);
        if (vorh) vorh.portionen += info.uebrig;
        else S.gefroren.push({ rid: k.rid, portionen: info.uebrig, datum: heute() });
      }
    }
    S.zuletzt = [...new Set(L.kochListe(p).map((k) => k.rid).filter(Boolean))];
    S.plan = null;
    S.abgehakt = {};
    S.habeIch = {};
    S.einstellungen.start = heute();
  }

  // ---------- Render: Rahmen ----------
  const TABS = [
    { id: "plan", n: "Plan", i: "🗓️" },
    { id: "rezepte", n: "Rezepte", i: "📖" },
    { id: "einkauf", n: "Einkauf", i: "🛒" },
    { id: "angebote", n: "Angebote", i: "🏷️" },
    { id: "mehr", n: "Einstellungen", i: "⚙️" },
  ];

  function kopf() {
    const t = {
      plan: ["Wochenplan", S.plan ? `${L.datumKurz(S.plan.start)} – ${L.datumKurz(L.plusTage(S.plan.start, S.plan.tage - 1))}` : "Restlos – weniger wegwerfen"],
      rezepte: ["Rezepte", `${window.REZEPTE.length} Gerichte`],
      einkauf: ["Einkauf", S.plan ? "für deinen Wochenplan" : ""],
      angebote: ["Angebote", window.ANGEBOTE?.von ? `${fmtDatum(window.ANGEBOTE.von)} – ${fmtDatum(window.ANGEBOTE.bis)}` : "Wipperfürth"],
      mehr: ["Einstellungen", ""],
    }[ui.tab];
    return `<header class="top"><div class="grow"><h1>${t[0]}</h1>${t[1] ? `<div class="sub">${esc(t[1])}</div>` : ""}</div></header>`;
  }
  const fmtDatum = (iso) => (iso ? L.datumKurz(iso) : "");

  function navigation() {
    const offen = S.plan ? L.einkaufsliste(S.plan, S).kaufen.filter((e) => !S.abgehakt[e.id]).length : 0;
    return `<nav class="tabs">${TABS.map(
      (t) => `<button class="${ui.tab === t.id ? "on" : ""}" data-a="tab" data-id="${t.id}" aria-label="${t.n}">
        <span class="i">${t.i}</span>${t.n}${t.id === "einkauf" && offen ? `<span class="dot">${offen}</span>` : ""}</button>`
    ).join("")}</nav>`;
  }

  function render() {
    const app = document.getElementById("app");
    const views = { plan: viewPlan, rezepte: viewRezepte, einkauf: viewEinkauf, angebote: viewAngebote, mehr: viewMehr };
    app.innerHTML = kopf() + `<main>${views[ui.tab]()}</main>` + navigation();
    renderSheet();
  }

  // ---------- Ansicht: Plan ----------
  function viewPlan() {
    if (!S.plan) {
      const w = S.wuensche.length;
      return `<div class="card hero">
        <div class="big">🥕</div>
        <h2>Lass uns deine Woche planen</h2>
        <p>Restlos sucht Gerichte, die sich Zutaten teilen. So brauchst du angebrochene Packungen auf und isst trotzdem jeden Tag etwas anderes.</p>
        <div class="stack">
          <button class="btn primary block" data-a="planNeu">✨ Plan vorschlagen</button>
          <button class="btn block" data-a="planLeer">✍️ Selbst zusammenstellen</button>
        </div>
        ${w ? `<p class="small" style="margin-top:14px">⭐ ${plural(w, "Gericht", "Gerichte")} von deiner Wunschliste werden eingeplant.</p>` : `<p class="small" style="margin-top:14px">Tipp: Markiere unter <b>Rezepte</b> Gerichte mit ⭐, auf die du Lust hast. Sie werden dann fest eingeplant.</p>`}
      </div>
      ${S.gefroren.length ? `<div class="card flat"><b>🧊 Im Tiefkühler</b><div class="small muted">${S.gefroren.map((g) => `${g.portionen}× ${esc(REZ[g.rid]?.n || "")}`).join(" · ")}</div></div>` : ""}
      <div class="card flat small muted">Mahlzeiten, Portionen und Abneigungen stellst du unter <b>Einstellungen</b> ein. Aktuell: ${zusammenfassungEinstellungen()}.</div>`;
    }
    const p = S.plan;
    const kochen = L.kochListe(p).filter((k) => k.rid);
    const kosten = L.planKosten(p, S);
    const reste = L.reste(p, S);
    const kritisch = reste.filter((r) => r.status === "verderblich");
    const geaendert = p.start !== S.einstellungen.start || p.tage !== S.einstellungen.tage;

    let html = `<div class="stats">
      <div class="stat"><b>${kochen.filter((k) => k.typ !== "fruehstueck").length}×</b><span>kochen</span></div>
      <div class="stat"><b>${kosten != null ? L.euro(kosten).replace(/\s?€/, " €") : "–"}</b><span>Einkauf ca.</span></div>
      <div class="stat"><b>${kritisch.length ? `${kritisch.length} ⚠️` : "✓"}</b><span>${kritisch.length ? "Reste verderblich" : "kaum Reste"}</span></div>
    </div>`;
    if (geaendert) html += `<div class="note small">Du hast Startdatum oder Planlänge geändert. <button class="btn sm" data-a="planNeu" style="margin-left:6px">Neu planen</button></div>`;

    for (let d = 0; d < p.tage; d++) {
      const iso = L.plusTage(p.start, d);
      const keys = L.SLOTS.map((s) => `${d}-${s}`).filter((k) => p.mahlzeiten[k]);
      if (!keys.length) continue;
      const tagKcal = keys.reduce((a, k) => a + mahlzeitKcal(k), 0);
      html += `<section class="day ${iso === heute() ? "today" : ""}">
        <div class="day-h"><span>${L.datumKurz(iso)}${iso === heute() ? ` <span class="muted">· heute</span>` : ""}</span>${tagKcal ? `<span class="muted">≈ ${(Math.round(tagKcal / 10) * 10).toLocaleString("de-DE")} kcal</span>` : ""}</div>
        ${keys.map((k) => mahlzeitZeile(k)).join("")}
      </section>`;
    }

    html += `<div class="btns" style="margin:14px 0">
      <button class="btn" data-a="planNeu">🔄 Neu vorschlagen</button>
      <button class="btn" data-a="planFuellen">🧩 Lücken füllen</button>
    </div>`;

    html += resteKarte(p, reste);
    html += `<div class="card flat">
      <b>Woche vorbei?</b>
      <p class="small muted" style="margin:4px 0 10px">Haltbare Reste wandern in deinen Vorrat, übrige Portionen in den Tiefkühler. Beides berücksichtigt der nächste Plan.</p>
      <div class="btns"><button class="btn" data-a="wocheAbschliessen">✅ Woche abschließen</button><button class="btn danger" data-a="planLoeschen">Plan löschen</button></div>
    </div>`;
    return html;
  }

  // Kalorien pro Portion; im Plan zählen abgewählte Zutaten nicht mit
  const kcalVon = (r, portionen, weg) => L.naehrwerte(r, portionen || r.s, weg || [], S.einstellungen.ausgeschlossen).kcal;
  const kcalTag = (kcal) => ` <span class="kcal">(${Math.round(kcal / 10) * 10} kcal)</span>`;
  function mahlzeitKcal(key) {
    const m = S.plan.mahlzeiten[key];
    if (m.art === "koch" || m.art === "rest") {
      const k = S.plan.kochen[m.id];
      return k && REZ[k.rid] ? kcalVon(REZ[k.rid], k.portionen, k.weg) : 0;
    }
    if (m.art === "tk" && REZ[m.rid]) return kcalVon(REZ[m.rid]);
    return 0;
  }

  function zusammenfassungEinstellungen() {
    const e = S.einstellungen;
    const f = e.mahlzeiten.fruehstueck.filter(Boolean).length;
    const m = e.mahlzeiten.mittag.filter(Boolean).length;
    const a = e.mahlzeiten.abend.filter(Boolean).length;
    return `${e.tage} Tage, Frühstück ${f}×, Mittag ${m}×, Abend ${a}×, ${e.portionen} Portionen pro Kochen`;
  }

  function mahlzeitZeile(key) {
    const p = S.plan;
    const m = p.mahlzeiten[key];
    const { s } = slotTeile(key);
    const slot = `<span class="slot">${L.SLOT_ICON[s]} ${L.SLOT_NAME[s]}</span>`;
    let em = "➕", t = "Gericht wählen", sub = "", cls = "leer";
    if (m.art === "koch") {
      const k = p.kochen[m.id];
      const r = REZ[k.rid];
      if (r) {
        const info = L.portionenInfo(p, m.id);
        em = r.e; t = r.n; cls = "";
        const teile = [k.typ === "fruehstueck" ? "zubereiten" : `kochen · ${plural(k.portionen, "Portion", "Portionen")}`];
        if (info.uebrig > 0 && k.typ !== "fruehstueck") teile.push(`${info.uebrig} übrig → einfrieren`);
        const weg = [...k.weg, ...r.z.filter((z) => S.einstellungen.ausgeschlossen.includes(z[0])).map((z) => z[0])];
        if (weg.length) teile.push(`ohne ${[...new Set(weg)].map((id) => Z[id].n).join(", ")}`);
        sub = teile.join(" · ");
      }
    } else if (m.art === "rest") {
      const k = p.kochen[m.id];
      const r = REZ[k?.rid];
      em = "↩️"; t = r ? `Rest: ${r.n}` : "Rest"; cls = "rest";
      sub = k ? `aufwärmen · gekocht ${slotLabel(k.key)}` : "";
    } else if (m.art === "tk") {
      const r = REZ[m.rid];
      em = "🧊"; t = r ? r.n : "Aus dem Tiefkühler"; cls = "rest"; sub = "aus dem Tiefkühler auftauen";
    } else if (m.art === "frei") {
      em = "🚶"; t = "Frei / auswärts"; cls = "rest"; sub = "";
    }
    return `<button class="meal ${cls}" data-a="slot" data-key="${key}">${slot}<span class="em">${em}</span>
      <span class="grow"><div class="t">${esc(t)}${mahlzeitKcal(key) ? kcalTag(mahlzeitKcal(key)) : ""}</div>${sub ? `<div class="s">${esc(sub)}</div>` : ""}</span><span class="chev">›</span></button>`;
  }

  function resteKarte(p, reste) {
    const portionen = L.kochListe(p).filter((k) => k.rid && k.typ !== "fruehstueck").map((k) => ({ k, info: L.portionenInfo(p, k.id) })).filter((x) => x.info.uebrig > 0);
    if (!reste.length && !portionen.length) {
      return `<div class="card"><h2>♻️ Was übrig bleibt</h2><p class="muted small" style="margin:0">Nichts Nennenswertes. Alle Packungen werden aufgebraucht.</p></div>`;
    }
    const haltbar = reste.filter((r) => r.status === "haltbar" || r.status === "tk");
    const label = {
      verderblich: `<span class="badge warn">bald verbrauchen</span>`,
      einfrieren: `<span class="badge accent">🧊 einfrieren</span>`,
      haltbar: `<span class="badge">📦 Vorrat</span>`,
      tk: `<span class="badge">🧊 TK</span>`,
    };
    return `<div class="card"><h2>♻️ Was übrig bleibt</h2>
      <p class="small muted" style="margin:0 0 6px">Nach dem Plan bleibt von diesen Packungen etwas übrig. Tippe auf eine Zutat, um passende Rezepte zu sehen.</p>
      ${portionen.map((x) => `<div class="leftover"><span>🍲</span><span class="grow"><b>${x.info.uebrig}× ${esc(REZ[x.k.rid].n)}</b><div class="tiny muted">fertige Portion</div></span><span class="badge accent">🧊 einfrieren</span></div>`).join("")}
      ${reste.filter((r) => r.status === "verderblich" || r.status === "einfrieren").map((r) => `<button class="leftover" style="width:100%;border:0;background:none;text-align:left;padding-left:0;padding-right:0" data-a="zutatRezepte" data-id="${r.id}">
        <span>${window.KATEGORIEN.find((k) => k.id === Z[r.id].cat).icon}</span>
        <span class="grow"><b>${esc(Z[r.id].n)}</b><div class="tiny muted">${L.menge(r.id, r.rest)} übrig</div></span>${label[r.status]}</button>`).join("")}
      ${haltbar.length ? `<div class="leftover"><span>📦</span><span class="grow"><b>Haltbar, wandert in den Vorrat</b><div class="tiny muted">${haltbar.map((r) => `${esc(Z[r.id].n)} ${L.menge(r.id, r.rest)}`).join(" · ")}</div></span></div>` : ""}
    </div>`;
  }

  // ---------- Ansicht: Rezepte ----------
  const FILTER = [
    ["alle", "Alle"],
    ["wunsch", "⭐ Wunschliste"],
    ["top", "★ Top bewertet"],
    ["abend", "Abendessen"],
    ["mittag", "Mittag"],
    ["fruehstueck", "Frühstück"],
    ["vegetarisch", "Vegetarisch"],
    ["schnell", "≤ 25 Min."],
    ["ofen", "Ofen/Airfryer"],
    ["neu", "Mal was Neues"],
    ["angebot", "🏷️ Im Angebot"],
  ];
  function rezeptFilter(r) {
    const f = ui.filter;
    if (f !== "gesperrt" && S.gesperrt.includes(r.id)) return false;
    if (ui.zutatFilter && !r.z.some((z) => z[0] === ui.zutatFilter)) return false;
    if (ui.suche) {
      const q = ui.suche.toLowerCase();
      const treffer = r.n.toLowerCase().includes(q) || r.tags.some((t) => t.includes(q)) || r.z.some((z) => Z[z[0]].n.toLowerCase().includes(q));
      if (!treffer) return false;
    }
    switch (f) {
      case "wunsch": return S.wuensche.includes(r.id);
      case "top": return (S.bewertungen[r.id] || 0) >= 4;
      case "gesperrt": return S.gesperrt.includes(r.id);
      case "abend": case "mittag": case "fruehstueck": return r.m.includes(f);
      case "vegetarisch": return r.tags.includes("vegetarisch") || r.tags.includes("vegan");
      case "schnell": return r.t <= 25;
      case "ofen": return !!r.geraet;
      case "neu": return r.tags.includes("neu");
      case "angebot": return r.z.some((z) => !Z[z[0]].vorrat && L.angeboteFuerZutat(z[0], S).length);
      default: return true;
    }
  }
  function rezeptKarte(r) {
    const aus = S.einstellungen.ausgeschlossen;
    const konflikt = L.kernKonflikte(r, aus);
    const ohne = r.z.filter((z) => z[2] === "opt" && aus.includes(z[0]));
    const angebot = r.z.some((z) => !Z[z[0]].vorrat && L.angeboteFuerZutat(z[0], S).length);
    const mahl = r.m.map((m) => L.SLOT_NAME[m]).join(" · ");
    return `<button class="rcard ${konflikt.length ? "dim" : ""}" data-a="rezept" data-id="${r.id}">
      <span class="em">${r.e}</span>
      <span class="grow"><div class="t">${esc(r.n)}${kcalTag(kcalVon(r))}</div>
        <div class="meta">${r.t} Min. · ${mahl}${r.geraet ? ` · ${r.geraet === "ofen" ? "Ofen" : "Airfryer"}` : ""}</div>
        <div class="chips">
          ${S.wuensche.includes(r.id) ? `<span class="badge accent">⭐ Wunsch</span>` : ""}
          ${S.bewertungen[r.id] ? `<span class="badge accent">${"★".repeat(S.bewertungen[r.id])}</span>` : ""}
          ${S.gesperrt.includes(r.id) ? `<span class="badge warn">🚫 ausgeblendet</span>` : ""}
          ${angebot ? `<span class="badge offer">🏷️ Angebot</span>` : ""}
          ${r.fz ? `<span class="badge">🧊 einfrierbar</span>` : ""}
          ${konflikt.length ? `<span class="badge warn">enthält ${esc(konflikt.map((id) => Z[id].n).join(", "))}</span>` : ""}
          ${ohne.length ? `<span class="badge green">ohne ${esc(ohne.map((z) => Z[z[0]].n).join(", "))}</span>` : ""}
        </div>
      </span></button>`;
  }
  function rezeptListeHtml() {
    const liste = window.REZEPTE.filter(rezeptFilter);
    if (!liste.length) return `<p class="muted center" style="padding:30px 0">Keine passenden Rezepte gefunden.</p>`;
    return `<div class="rgrid">${liste.map(rezeptKarte).join("")}</div>`;
  }
  function viewRezepte() {
    return `<input class="search" type="search" placeholder="Suchen: Gericht oder Zutat, z. B. Hack" value="${esc(ui.suche)}" data-input="suche" aria-label="Rezepte durchsuchen">
      <div class="chips scroll" style="margin-top:10px">
        ${ui.zutatFilter ? `<button class="chip on" data-a="zutatFilterWeg">mit ${esc(Z[ui.zutatFilter].n)} <span class="x">✕</span></button>` : ""}
        ${FILTER.map(([id, n]) => `<button class="chip ${ui.filter === id ? "on" : ""}" data-a="filter" data-id="${id}">${n}${id === "wunsch" && S.wuensche.length ? ` (${S.wuensche.length})` : ""}</button>`).join("")}
        ${S.gesperrt.length ? `<button class="chip ${ui.filter === "gesperrt" ? "on" : ""}" data-a="filter" data-id="gesperrt">🚫 Ausgeblendet (${S.gesperrt.length})</button>` : ""}
      </div>
      <div id="rlist">${rezeptListeHtml()}</div>`;
  }

  // ---------- Ansicht: Einkauf ----------
  function viewEinkauf() {
    if (!S.plan) {
      return `<div class="card hero"><div class="big">🛒</div><h2>Noch keine Einkaufsliste</h2><p>Erstelle zuerst einen Wochenplan. Die Liste entsteht dann automatisch, gerundet auf echte Packungsgrößen.</p>
        <button class="btn primary" data-a="planNeu">✨ Plan vorschlagen</button></div>`;
    }
    const liste = L.einkaufsliste(S.plan, S);
    const v = L.marktVergleich(S.plan, S);
    const e = S.einstellungen;
    let html = "";

    if (!liste.kaufen.length) {
      html += `<div class="card hero"><div class="big">🎉</div><h2>Alles da!</h2><p>Für deinen Plan musst du nichts einkaufen.</p></div>`;
    } else {
      const best = v.einzel[0];
      const max = Math.max(...v.einzel.map((x) => x.summe));
      const gleich = v.einzel.filter((x) => x.summe - best.summe < 0.3 && x.markt !== best.markt).map((x) => marktName(x.markt));
      html += `<div class="card"><div class="reco">`;
      if (v.lohntKombi) {
        const zweit = v.kombi.maerkte[1];
        const dort = liste.kaufen.filter((x) => v.kombi.zuordnung[x.id] === zweit);
        html += `<div class="small muted">Empfehlung</div>
          <div class="big">${marktName(v.kombi.maerkte[0])} + ${marktName(zweit)}</div>
          <div>ca. <b>${L.euro(v.kombi.summe)}</b>, spart ${L.euro(v.kombi.ersparnis)} gegenüber nur ${marktName(best.markt)}</div>
          <div class="small" style="margin-top:6px">Bei ${marktName(zweit)}: ${dort.map((x) => esc(Z[x.id].n)).join(", ")}</div>`;
      } else {
        html += `<div class="small muted">Empfehlung</div>
          <div class="big">${marktName(best.markt)}</div>
          <div>ca. <b>${L.euro(best.summe)}</b> für ${plural(liste.kaufen.length, "Artikel", "Artikel")}${gleich.length ? ` · ${gleich.join(", ")} etwa gleich günstig` : ""}</div>`;
        if (best.angebote.length) html += `<div class="small" style="margin-top:6px">🏷️ Angebote: ${best.angebote.map((a) => esc(Z[a.id].n)).join(", ")}</div>`;
      }
      html += `</div>`;
      if (e.budget) {
        const summe = v.lohntKombi ? v.kombi.summe : best.summe;
        const ok = summe <= e.budget;
        html += `<div class="note ${ok ? "green" : ""} small" style="margin-top:10px">${ok ? "✓" : "⚠️"} Budget ${L.euro(e.budget)}: geschätzt ${L.euro(summe)}${ok ? `, ${L.euro(e.budget - summe)} Luft` : `, ${L.euro(summe - e.budget)} drüber. Tipp: „Neu vorschlagen“ achtet bei gesetztem Budget stärker auf den Preis.`}</div>`;
      }
      html += `<h3>Preisvergleich</h3>
        ${v.einzel.map((x, i) => `<div class="mbar ${i === 0 ? "best" : ""}"><span class="name"><span class="mdot" style="background:${marktFarbe(x.markt)}"></span>${marktName(x.markt)}</span>
          <span class="bar"><i style="width:${Math.max(8, (x.summe / max) * 100)}%"></i></span><span class="val">${L.euro(x.summe)}</span></div>`).join("")}
        <p class="tiny muted" style="margin:8px 0 0">Richtpreise geschätzt${window.ANGEBOTE?.stand ? ` · Angebote Stand ${fmtDatum(window.ANGEBOTE.stand)}` : ", noch keine Wochenangebote eingetragen."}</p>
      </div>`;

      const ansicht = v.lohntKombi ? ui.einkaufAnsicht : "abteilung";
      if (v.lohntKombi) {
        html += `<div class="chips" style="margin:6px 0"><button class="chip ${ansicht === "abteilung" ? "on" : ""}" data-a="einkaufAnsicht" data-id="abteilung">Nach Abteilung</button><button class="chip ${ansicht === "markt" ? "on" : ""}" data-a="einkaufAnsicht" data-id="markt">Nach Markt</button></div>`;
      }
      const marktVon = (id) => (v.lohntKombi ? v.kombi.zuordnung[id] : best.markt);
      const gruppen = [];
      if (ansicht === "markt") {
        for (const m of v.kombi.maerkte) gruppen.push({ titel: `${marktName(m)}`, items: liste.kaufen.filter((x) => marktVon(x.id) === m) });
      } else {
        for (const k of window.KATEGORIEN) {
          const items = liste.kaufen.filter((x) => Z[x.id].cat === k.id);
          if (items.length) gruppen.push({ titel: `${k.icon} ${k.name}`, items });
        }
      }
      const erledigt = liste.kaufen.filter((x) => S.abgehakt[x.id]).length;
      html += `<div class="card">
        <div class="row between"><b>${erledigt}/${liste.kaufen.length} erledigt</b>
          <span class="row"><button class="btn sm" data-a="teilen">📤 Teilen</button>${erledigt ? `<button class="btn sm ghost" data-a="abhakenReset">Zurücksetzen</button>` : ""}</span></div>
        ${gruppen.map((g) => `<div class="cat-h">${g.titel}</div><ul class="list">${g.items.map((x) => einkaufZeile(x, marktVon(x.id), v.lohntKombi)).join("")}</ul>`).join("")}
        <p class="tiny muted" style="margin:12px 0 0">Tippe auf ⋯, wenn du etwas schon zuhause hast. Es verschwindet dann von der Liste.</p>
      </div>`;
    }

    if (liste.habeIch.length) {
      html += `<div class="card flat"><details><summary>🏠 Schon zuhause (${liste.habeIch.length})</summary><ul class="list" style="margin-top:8px">
        ${liste.habeIch.map((x) => `<li><span class="grow"><span class="n">${esc(Z[x.id].n)}</span><div class="tiny muted">${L.menge(x.id, x.bedarf)} für ${esc(rezeptNamen(x.rezepte))}${x.ausVorrat ? " · aus deinem Vorrat" : ""}</div></span>
          ${x.ausVorrat ? "" : `<button class="btn sm ghost" data-a="habeIch" data-id="${x.id}">Doch kaufen</button>`}</li>`).join("")}
      </ul></details></div>`;
    }
    if (liste.ausVorrat.length) {
      html += `<div class="card flat"><details><summary>🧂 Aus dem Basis-Vorrat (${liste.ausVorrat.length})</summary>
        <p class="small muted">${liste.ausVorrat.map((x) => esc(Z[x.id].n)).join(", ")}</p>
        <p class="tiny muted">Etwas davon ist leer? Unter Einstellungen → Basis-Vorrat abwählen, dann kommt es auf die Liste.</p></details></div>`;
    }
    return html;
  }
  function einkaufZeile(x, markt, zeigeMarkt) {
    const z = Z[x.id];
    const p = L.preis(x.id, markt);
    const teile = [`für ${rezeptNamen(x.rezepte)}`];
    if (x.vorhanden > 0.01) teile.push(`${L.menge(x.id, x.vorhanden)} schon da`);
    if (x.rest > 0.01) teile.push(`Rest ${L.menge(x.id, x.rest)}`);
    const done = !!S.abgehakt[x.id];
    return `<li class="${done ? "done" : ""}">
      <button class="check ${done ? "on" : ""}" data-a="abhaken" data-id="${x.id}" aria-label="${esc(z.n)} abhaken">✓</button>
      <span class="grow" data-a="abhaken" data-id="${x.id}"><span class="n">${x.packungen}× ${esc(z.n)}</span>
        <div class="tiny muted">${esc(z.pl)} · ${esc(teile.join(" · "))}</div>
        ${p.angebot ? `<span class="badge offer">🏷️ ${marktName(markt)}: ${L.euro(p.preis)} statt ${L.euro(p.normal)}</span>` : ""}
        ${zeigeMarkt && !p.angebot ? `<span class="badge">${marktName(markt)}</span>` : ""}</span>
      <span class="m">${L.euro(p.preis * x.packungen)}</span>
      <button class="iconbtn" style="width:34px;height:34px;font-size:16px" data-a="habeIch" data-id="${x.id}" aria-label="Habe ich schon">⋯</button>
    </li>`;
  }

  // ---------- Ansicht: Angebote ----------
  function viewAngebote() {
    const A = window.ANGEBOTE || { liste: [] };
    const ms = S.einstellungen.maerkte;
    const liste = (A.liste || []).filter((a) => ms.includes(a.markt) && Z[a.zutat]);
    let html = "";
    if (!liste.length) {
      html += `<div class="card hero"><div class="big">🏷️</div><h2>Noch keine Angebote</h2>
        <p>Die Wochenangebote für Edeka, Rewe, Lidl, Aldi Süd und Penny in Wipperfürth trägt Claude für dich ein.</p>
        <div class="note small" style="text-align:left">Sag in Claude Code einfach: <b>„Aktualisiere die Angebote für Restlos“</b>. Claude recherchiert die aktuellen Prospekte und aktualisiert die App.</div></div>`;
      return html;
    }
    const imPlan = S.plan ? new Set(Object.keys(L.bedarf(S.plan, S).b)) : new Set();
    html += `<div class="card flat small">${A.hinweis ? esc(A.hinweis) + " " : ""}<span class="muted">Stand ${fmtDatum(A.stand)} · Angebote können regional abweichen.</span></div>`;
    for (const m of window.MAERKTE.filter((m) => ms.includes(m.id))) {
      const items = liste.filter((a) => a.markt === m.id);
      if (!items.length) continue;
      html += `<div class="card"><h2><span class="mdot" style="background:${m.farbe}"></span>${m.n}</h2><ul class="list">
        ${items.map((a) => {
          const anz = window.REZEPTE.filter((r) => r.z.some((z) => z[0] === a.zutat)).length;
          const normal = L.preis(a.zutat, m.id).normal;
          return `<li data-a="zutatRezepte" data-id="${a.zutat}" style="cursor:pointer"><span class="grow"><span class="n">${esc(Z[a.zutat].n)}</span>
            ${imPlan.has(a.zutat) ? ` <span class="badge green">im Plan</span>` : ""}
            <div class="tiny muted">${esc(a.text || "")}${a.bis ? ` · bis ${fmtDatum(a.bis)}` : ""}</div>
            <div class="tiny" style="color:var(--primary)">${anz} passende${anz === 1 ? "s Rezept" : " Rezepte"} ›</div></span>
            <span class="m"><b style="color:var(--offer)">${L.euro(a.preis)}</b><div class="tiny muted" style="text-decoration:line-through">${L.euro(normal)}</div></span></li>`;
        }).join("")}
      </ul></div>`;
    }
    return html;
  }

  // ---------- Ansicht: Einstellungen ----------
  function viewMehr() {
    const e = S.einstellungen;
    const zut = Object.entries(Z).filter(([, z]) => !z.vorrat).sort((a, b) => a[1].n.localeCompare(b[1].n));
    const vorratZut = Object.entries(Z).filter(([, z]) => z.vorrat);
    const vorrat = Object.entries(S.vorrat).filter(([id, m]) => Z[id] && m > 0);
    return `
    <div class="card"><h2>🗓️ Planung</h2>
      <div class="field"><label for="f-start">Plan startet am</label><input id="f-start" class="input" type="date" value="${e.start}" data-change="start"></div>
      <div class="field"><label for="f-tage">Tage pro Plan</label><select id="f-tage" class="input" data-change="tage">${[3, 4, 5, 6, 7, 8, 9, 10, 14].map((n) => `<option ${n === e.tage ? "selected" : ""}>${n}</option>`).join("")}</select></div>
      <div class="field"><span class="lbl">Portionen pro Kochen<span class="hint">2 = einmal frisch, einmal als Rest am nächsten Tag. Mehr Portionen = seltener kochen.</span></span>
        <span class="stepper"><button data-a="portionenStd" data-delta="-1" aria-label="weniger">−</button><span>${e.portionen}</span><button data-a="portionenStd" data-delta="1" aria-label="mehr">+</button></span></div>
      <h3>Welche Mahlzeiten planen?</h3>
      <div class="daygrid"><span></span>${L.TAGE.map((t) => `<span class="h">${t}</span>`).join("")}
        ${L.SLOTS.map((s) => `<span class="l">${L.SLOT_ICON[s]} ${L.SLOT_NAME[s]}</span>${e.mahlzeiten[s].map((on, i) => `<button class="dtog ${on ? "on" : ""}" data-a="mahlzeit" data-s="${s}" data-i="${i}" aria-label="${L.SLOT_NAME[s]} ${L.TAGE[i]}">${on ? "✓" : ""}</button>`).join("")}`).join("")}
      </div>
      <p class="tiny muted">Änderungen gelten ab dem nächsten „Plan vorschlagen“.</p>
    </div>

    <div class="card"><h2>🚫 Mag ich nicht</h2>
      <p class="small muted" style="margin-top:0">Diese Zutaten kommen nie auf die Einkaufsliste. Gerichte, in denen sie nur eine Nebenrolle spielen, bleiben im Angebot, nur eben ohne. Fisch ist gar nicht erst in der Sammlung.</p>
      <div class="chips">${e.ausgeschlossen.map((id) => `<button class="chip on" data-a="ausschlussWeg" data-id="${id}">${esc(Z[id].n)} <span class="x">✕</span></button>`).join("") || `<span class="muted small">Noch nichts eingetragen</span>`}</div>
      <div class="row" style="margin-top:10px"><select class="input grow" data-change="ausschlussNeu" aria-label="Zutat ausschließen"><option value="">+ Zutat hinzufügen …</option>
        ${zut.filter(([id]) => !e.ausgeschlossen.includes(id)).map(([id, z]) => `<option value="${id}">${esc(z.n)}</option>`).join("")}</select></div>
    </div>

    <div class="card"><h2>🧂 Basis-Vorrat</h2>
      <p class="small muted" style="margin-top:0">Hast du immer da, deshalb kommt es nicht auf die Liste. Ist etwas leer, tippe es an.</p>
      <div class="chips">${vorratZut.map(([id, z]) => `<button class="chip ${e.vorratFehlt.includes(id) ? "" : "on"}" data-a="vorratToggle" data-id="${id}">${esc(z.n)}</button>`).join("")}</div>
    </div>

    <div class="card"><h2>📦 Reste & Vorrat zuhause</h2>
      <p class="small muted" style="margin-top:0">Was du noch hast, zum Beispiel halbe Packungen. Der Planer verbraucht das zuerst.</p>
      ${vorrat.length ? `<ul class="list">${vorrat.map(([id, m]) => `<li><span class="grow n">${esc(Z[id].n)}</span><span class="m">${L.menge(id, m)}</span><button class="iconbtn" style="width:34px;height:34px;font-size:14px" data-a="vorratWeg" data-id="${id}" aria-label="entfernen">✕</button></li>`).join("")}</ul>` : `<p class="muted small">Leer.</p>`}
      <div class="row" style="margin-top:10px">
        <select class="input grow" id="v-zutat" aria-label="Zutat"><option value="">Zutat …</option>${zut.map(([id, z]) => `<option value="${id}">${esc(z.n)} (${z.u})</option>`).join("")}</select>
        <input class="input" id="v-menge" type="number" inputmode="decimal" placeholder="Menge" style="width:90px" aria-label="Menge">
        <button class="btn sm primary" data-a="vorratNeu">+</button>
      </div>
      ${S.gefroren.length ? `<h3>🧊 Fertige Portionen im Tiefkühler</h3><ul class="list">${S.gefroren.map((g, i) => `<li><span class="grow n">${g.portionen}× ${esc(REZ[g.rid]?.n || "")}</span><button class="iconbtn" style="width:34px;height:34px;font-size:14px" data-a="gefrorenWeg" data-i="${i}" aria-label="entfernen">✕</button></li>`).join("")}</ul>` : ""}
    </div>

    <div class="card"><h2>🛒 Supermärkte</h2>
      ${window.MAERKTE.map((m) => `<div class="field"><span class="lbl"><span class="mdot" style="background:${m.farbe}"></span>${m.n}</span><button class="switch ${e.maerkte.includes(m.id) ? "on" : ""}" data-a="marktToggle" data-id="${m.id}" aria-label="${m.n}"></button></div>`).join("")}
      <div class="field"><label for="f-kombi">Zweiten Markt empfehlen ab<span class="hint">Ersparnis, ab der sich ein zweiter Laden lohnt</span></label>
        <select id="f-kombi" class="input" data-change="kombiAb">${[2, 3, 5, 8, 999].map((n) => `<option value="${n}" ${n === e.kombiAb ? "selected" : ""}>${n === 999 ? "nie" : n + " €"}</option>`).join("")}</select></div>
      <div class="field"><label for="f-budget">Wochenbudget (optional)<span class="hint">leer lassen = kein Limit</span></label>
        <input id="f-budget" class="input" type="number" inputmode="decimal" min="0" step="5" placeholder="z. B. 40" style="width:110px" value="${e.budget ?? ""}" data-change="budget"></div>
    </div>

    <div class="card"><h2>🎨 Darstellung & Daten</h2>
      <div class="field"><label for="f-theme">Design</label><select id="f-theme" class="input" data-change="theme">${[["auto", "wie System"], ["light", "hell"], ["dark", "dunkel"]].map(([v, n]) => `<option value="${v}" ${v === e.theme ? "selected" : ""}>${n}</option>`).join("")}</select></div>
      <p class="small muted">Alle Daten liegen nur auf diesem Gerät. Es gibt kein Konto, keine Kosten und keine Weitergabe.</p>
      <div class="btns"><button class="btn" data-a="export">⬇️ Sichern</button><label class="btn" style="cursor:pointer">⬆️ Wiederherstellen<input type="file" accept="application/json" data-change="import" hidden></label></div>
      <button class="btn danger block" style="margin-top:8px" data-a="reset">Alles zurücksetzen</button>
    </div>
    <p class="center tiny muted">Restlos · ${window.REZEPTE.length} Rezepte · ${Object.keys(Z).length} Zutaten</p>`;
  }

  // ---------- Sheets ----------
  function oeffneSheet(s) {
    ui.sheet = s;
    ui.sheetSuche = "";
    renderSheet(true);
  }
  function schliesseSheet() {
    ui.sheet = null;
    renderSheet();
  }
  function renderSheet(neu = false) {
    const root = document.getElementById("sheet-root");
    if (!ui.sheet) { root.innerHTML = ""; document.body.style.overflow = ""; return; }
    const alt = root.querySelector(".sheet");
    const scroll = !neu && alt ? alt.scrollTop : 0;
    const inhalt = { slot: sheetSlot, rezept: sheetRezept, einplanen: sheetEinplanen, bestaetigen: sheetBestaetigen }[ui.sheet.typ]();
    if (!ui.sheet) { root.innerHTML = ""; document.body.style.overflow = ""; return; }
    root.innerHTML = `<div class="sheet-bg" data-a="sheetZu"></div><div class="sheet" role="dialog" aria-modal="true">${inhalt}</div>`;
    root.querySelector(".sheet").scrollTop = scroll;
    document.body.style.overflow = "hidden";
  }
  const sheetKopf = (titel, sub = "") => `<div class="sheet-head"><span class="grip"></span><h2>${titel}${sub ? `<div class="small muted" style="font-weight:500;margin-top:2px">${sub}</div>` : ""}</h2><button class="iconbtn" data-a="sheetZu" aria-label="Schließen">✕</button></div>`;

  function sheetSlot() {
    const key = ui.sheet.key;
    const p = S.plan;
    const m = p.mahlzeiten[key];
    if (!m) { ui.sheet = null; return ""; }
    const { d, s } = slotTeile(key);
    let html = sheetKopf(`${L.SLOT_ICON[s]} ${L.SLOT_NAME[s]}`, L.datumKurz(slotIso(key)));

    if (m.art === "koch" && REZ[p.kochen[m.id].rid]) {
      const k = p.kochen[m.id];
      const r = REZ[k.rid];
      const info = L.portionenInfo(p, m.id);
      const restSlots = referenzen(m.id).filter(([kk, mm]) => mm.art === "rest").map(([kk]) => slotLabel(kk));
      html += `<div class="card"><div class="row"><span style="font-size:38px">${r.e}</span><div class="grow"><b style="font-size:17px">${esc(r.n)}</b>${kcalTag(kcalVon(r, k.portionen, k.weg))}
          <div class="small muted">${r.t} Min.${restSlots.length ? ` · Rest: ${esc(restSlots.join(", "))}` : ""}</div></div></div>
        ${s !== "fruehstueck" ? `<div class="row between" style="margin-top:12px"><span class="small">${info.uebrig > 0 ? `<span class="badge accent">${info.uebrig} Portion übrig → einfrieren</span>` : "Portionen"}</span>
          <span class="stepper"><button data-a="portion" data-id="${m.id}" data-delta="-1" aria-label="weniger">−</button><span>${plural(k.portionen, "Portion", "Portionen")}</span><button data-a="portion" data-id="${m.id}" data-delta="1" aria-label="mehr">+</button></span></div>` : ""}
        <div class="btns" style="margin-top:12px"><button class="btn primary" data-a="rezept" data-id="${r.id}" data-koch="${m.id}">📖 Rezept & Zutaten</button></div>
      </div>`;
    } else if (m.art === "rest") {
      const k = p.kochen[m.id];
      html += `<div class="card"><div class="row"><span style="font-size:34px">↩️</span><div class="grow"><b>Rest: ${esc(REZ[k.rid]?.n || "")}</b><div class="small muted">gekocht ${slotLabel(k.key)}</div></div>
        <button class="btn sm" data-a="rezept" data-id="${k.rid}" data-koch="${m.id}">Rezept</button></div></div>`;
    } else if (m.art === "tk") {
      html += `<div class="card"><b>🧊 ${esc(REZ[m.rid]?.n || "")}</b><div class="small muted">Portion aus dem Tiefkühler: am Vorabend in den Kühlschrank legen.</div></div>`;
    } else if (m.art === "frei") {
      html += `<div class="card flat"><b>🚶 Frei / auswärts</b><div class="small muted">Für diese Mahlzeit wird nichts eingekauft.</div></div>`;
    }

    // Alternativen: Rest, Tiefkühler, frei
    const quellen = s === "fruehstueck" ? [] : L.kochListe(p).filter((k) => {
      if (!k.rid || k.typ === "fruehstueck" || k.id === m.id) return false;
      const kd = slotTeile(k.key).d;
      return L.slotOrder(k.key) < L.slotOrder(key) && d - kd <= 2;
    });
    html += `<div class="btns">
      ${m.art !== "frei" ? `<button class="btn sm" data-a="setFrei" data-key="${key}">🚶 Frei / auswärts</button>` : ""}
      ${quellen.filter((k) => !(m.art === "rest" && m.id === k.id)).map((k) => `<button class="btn sm" data-a="setRest" data-key="${key}" data-id="${k.id}">↩️ Rest: ${esc(REZ[k.rid].n)}</button>`).join("")}
      ${s !== "fruehstueck" ? S.gefroren.map((g, i) => `<button class="btn sm" data-a="setTk" data-key="${key}" data-i="${i}">🧊 ${esc(REZ[g.rid]?.n || "")} (${g.portionen})</button>`).join("") : ""}
    </div>`;

    html += `<h3 style="margin:18px 0 4px">${m.art === "koch" && p.kochen[m.id].rid ? "Anderes Gericht" : "Gericht wählen"}</h3>
      <p class="tiny muted" style="margin:0 0 6px">Sortiert danach, wie gut es zu den Resten der Vortage passt.</p>
      <input class="search" type="search" placeholder="Suchen …" data-input="sheetSuche" aria-label="Gericht suchen">
      <div id="suglist">${vorschlagListe()}</div>`;
    return html;
  }

  function vorschlagListe() {
    const key = ui.sheet.key;
    const p = S.plan;
    const m = p.mahlzeiten[key];
    const { s } = slotTeile(key);
    let plan = p, kid = m.id;
    if (m.art !== "koch") {
      plan = JSON.parse(JSON.stringify(p));
      kid = "__tmp";
      plan.kochen[kid] = { rid: null, portionen: 1, typ: s, key, weg: [] };
      plan.mahlzeiten[key] = { art: "koch", id: kid };
    }
    let liste = L.vorschlaege(plan, S, kid, s);
    const q = ui.sheetSuche.toLowerCase();
    if (q) liste = liste.filter((x) => x.r.n.toLowerCase().includes(q) || x.r.z.some((z) => Z[z[0]].n.toLowerCase().includes(q)));
    else liste = liste.filter((x) => !x.gesperrt).slice(0, 14);
    const aktuell = m.art === "koch" ? p.kochen[m.id].rid : null;
    return liste.map((x) => {
      const genutzt = x.genutzt.filter((g) => !Z[g.id].vorrat).sort((a, b) => (L.verderblich(b.id) ? 1 : 0) - (L.verderblich(a.id) ? 1 : 0)).slice(0, 3);
      return `<button class="sug ${x.r.id === aktuell ? "cur" : ""}" data-a="setRezept" data-key="${key}" data-id="${x.r.id}">
        <span class="em">${x.r.e}</span><span class="grow"><div class="t">${esc(x.r.n)}${kcalTag(kcalVon(x.r))} ${S.wuensche.includes(x.r.id) ? "⭐" : ""}</div>
        ${genutzt.length ? `<div class="why">♻️ nutzt Rest: ${genutzt.map((g) => `${esc(Z[g.id].n)} ${L.menge(g.id, g.menge)}`).join(", ")}</div>` : ""}
        <div class="cost">${x.kosten > 0.01 ? `neu einkaufen ca. ${L.euro(x.kosten)}` : "alles schon da"} · ${x.r.t} Min.${x.imPlan ? " · schon im Plan" : ""}${x.gesperrt ? " · 🚫 ausgeblendet" : ""}${S.bewertungen[x.r.id] ? ` · ${"★".repeat(S.bewertungen[x.r.id])}` : ""}${x.konflikt.length ? ` · ⚠️ enthält ${esc(x.konflikt.map((id) => Z[id].n).join(", "))}` : ""}</div></span>
        ${x.r.id === aktuell ? `<span class="badge green">aktuell</span>` : ""}</button>`;
    }).join("") || `<p class="muted small">Nichts gefunden.</p>`;
  }

  function sheetRezept() {
    const r = REZ[ui.sheet.rid];
    const kid = ui.sheet.koch;
    const k = kid && S.plan ? S.plan.kochen[kid] : null;
    const aus = S.einstellungen.ausgeschlossen;
    const portionen = k ? k.portionen : ui.portionen || r.s;
    const konflikt = L.kernKonflikte(r, aus);
    const zs = L.zutatenFuer(r, portionen, k?.weg || [], aus);
    const gut = L.passtGutZu(r, S);
    const tags = [`⏱ ${r.t} Min.`, r.geraet === "ofen" ? "Ofen" : r.geraet === "airfryer" ? "Airfryer" : null, r.fz ? "🧊 einfrierbar" : null].filter(Boolean);

    let html = sheetKopf(`${r.e} ${esc(r.n)}`, tags.join(" · "));
    if (konflikt.length) html += `<div class="note small">⚠️ Enthält ${esc(konflikt.map((id) => Z[id].n).join(", "))} als Hauptzutat. Wird deshalb nicht automatisch vorgeschlagen.</div>`;

    html += `<div class="card"><div class="row between"><h2 style="margin:0">Zutaten</h2>
        <span class="stepper">${k
          ? `<button data-a="portion" data-id="${kid}" data-delta="-1">−</button><span>${plural(portionen, "Portion", "Portionen")}</span><button data-a="portion" data-id="${kid}" data-delta="1">+</button>`
          : `<button data-a="portionAnsicht" data-delta="-1">−</button><span>${plural(portionen, "Portion", "Portionen")}</span><button data-a="portionAnsicht" data-delta="1">+</button>`}</span></div>
      <ul class="list" style="margin-top:6px">
        ${zs.map((z) => {
          const zi = Z[z.id];
          const ang = !zi.vorrat && L.angeboteFuerZutat(z.id, S)[0];
          const gesperrt = aus.includes(z.id);
          return `<li class="${z.aktiv ? "" : "off"}"><span class="grow"><span class="n">${esc(zi.n)}</span>
            ${z.opt ? ` <span class="badge">optional</span>` : ""}${zi.vorrat ? ` <span class="badge">Vorrat</span>` : ""}${ang ? ` <span class="badge offer">🏷️ ${marktName(ang.m)}</span>` : ""}
            ${z.grund ? `<div class="tiny muted">${z.grund}</div>` : ""}</span>
            <span class="m">${L.menge(z.id, z.menge)}</span>
            ${k && !gesperrt ? `<button class="switch ${z.aktiv ? "on" : ""}" data-a="zutatWeg" data-koch="${kid}" data-id="${z.id}" aria-label="${esc(zi.n)} verwenden"></button>` : ""}</li>`;
        }).join("")}
      </ul>
      <p class="tiny muted" style="margin:8px 0 0">${k ? "Schalter aus = Zutat weglassen, sie verschwindet von der Einkaufsliste." : "Zutaten weglassen kannst du, sobald das Gericht im Plan ist. Dauerhafte Abneigungen stellst du unter Einstellungen ein."}</p>
    </div>
    ${naehrwertKarte(L.naehrwerte(r, portionen, k?.weg || [], aus), !!k?.weg?.length || zs.some((z) => z.grund === "mag ich nicht"))}
    <div class="card"><h2>Zubereitung</h2><ol class="steps">${r.st.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
      ${r.tipp ? `<div class="note green small">💡 ${esc(r.tipp)}</div>` : ""}</div>`;

    if (gut.length) {
      html += `<div class="card"><h2>♻️ Passt gut dazu</h2><p class="small muted" style="margin-top:0">Diese Gerichte brauchen auf, was von den Packungen übrig bleibt.</p>
        ${gut.map((g) => `<button class="sug" data-a="rezept" data-id="${g.r.id}"><span class="em">${g.r.e}</span><span class="grow"><div class="t">${esc(g.r.n)}${kcalTag(kcalVon(g.r))}</div>
          <div class="why">teilt: ${g.geteilt.map((id) => esc(Z[id].n)).join(", ")}</div></span></button>`).join("")}</div>`;
    }
    const w = S.wuensche.includes(r.id);
    const sterne = S.bewertungen[r.id] || 0;
    const gesperrt = S.gesperrt.includes(r.id);
    html += `<div class="card"><div class="row between"><h2 style="margin:0">Wie schmeckt's dir?</h2>
        <span class="sterne" role="group" aria-label="Bewertung">${[1, 2, 3, 4, 5].map((n) => `<button class="stern ${n <= sterne ? "on" : ""}" data-a="bewerten" data-id="${r.id}" data-n="${n}" aria-label="${n} Sterne">★</button>`).join("")}</span></div>
      <p class="tiny muted" style="margin:6px 0 10px">${sterne ? ["", "Kommt kaum noch vor.", "Wird seltener vorgeschlagen.", "Neutral.", "Wird öfter vorgeschlagen.", "Lieblingsgericht, kommt oft dran."][sterne] : "Gut bewertete Gerichte schlägt der Planer öfter vor, schlecht bewertete seltener."}</p>
      <button class="btn sm ${gesperrt ? "primary" : "danger"}" data-a="sperren" data-id="${r.id}">${gesperrt ? "↩️ Wieder vorschlagen" : "🚫 Nie mehr vorschlagen"}</button></div>`;
    html += `<div class="btns" style="margin-bottom:8px">
      <button class="btn ${w ? "primary" : ""}" data-a="wunsch" data-id="${r.id}">${w ? "⭐ Auf der Wunschliste" : "☆ Will ich essen"}</button>
      ${S.plan ? `<button class="btn" data-a="einplanen" data-id="${r.id}">🗓️ In den Plan</button>` : ""}
    </div>`;
    return html;
  }

  function naehrwertKarte(n, angepasst) {
    const g = (x) => `${x.toLocaleString("de-DE", { maximumFractionDigits: x < 10 ? 1 : 0 })} g`;
    // Energieanteile der Makronährstoffe (Eiweiß/KH 4 kcal/g, Fett 9 kcal/g)
    const e = n.eiweiss * 4, kh = n.kh * 4, f = n.fett * 9, sum = e + kh + f || 1;
    const pct = (x) => Math.round((x / sum) * 100);
    return `<div class="card"><h2>Nährwerte pro Portion</h2>
      <div class="nw-grid">
        <div class="nw-tile"><b>${Math.round(n.kcal / 10) * 10}</b><span>kcal</span></div>
        <div class="nw-tile"><b>${Math.round(n.eiweiss)} g</b><span>Eiweiß</span></div>
        <div class="nw-tile"><b>${Math.round(n.kh)} g</b><span>Kohlenhydrate</span></div>
        <div class="nw-tile"><b>${Math.round(n.fett)} g</b><span>Fett</span></div>
      </div>
      <div class="nw-bar" aria-hidden="true"><i style="width:${pct(e)}%;background:var(--primary)"></i><i style="width:${pct(kh)}%;background:var(--accent)"></i><i style="width:${pct(f)}%;background:#d4a72c"></i></div>
      <div class="tiny muted row wrap" style="gap:12px;margin:6px 0 4px"><span><span class="mdot" style="background:var(--primary)"></span>Eiweiß ${pct(e)} %</span><span><span class="mdot" style="background:var(--accent)"></span>Kohlenhydrate ${pct(kh)} %</span><span><span class="mdot" style="background:#d4a72c"></span>Fett ${pct(f)} %</span></div>
      <ul class="list" style="margin-top:6px">
        <li><span class="grow">Brennwert</span><span class="m">${Math.round(n.kcal)} kcal / ${Math.round(n.kcal * 4.184)} kJ</span></li>
        <li><span class="grow">Eiweiß</span><span class="m">${g(n.eiweiss)}</span></li>
        <li><span class="grow">Kohlenhydrate</span><span class="m">${g(n.kh)}</span></li>
        <li><span class="grow muted">davon Zucker</span><span class="m">${g(n.zucker)}</span></li>
        <li><span class="grow">Fett</span><span class="m">${g(n.fett)}</span></li>
        <li><span class="grow muted">davon gesättigte Fettsäuren</span><span class="m">${g(n.ges)}</span></li>
        <li><span class="grow">Ballaststoffe</span><span class="m">${g(n.bal)}</span></li>
        <li><span class="grow">Salz</span><span class="m">${g(n.salz)}</span></li>
      </ul>
      <p class="tiny muted" style="margin:8px 0 0">Richtwerte, berechnet aus Durchschnittswerten der Zutaten${angepasst ? ". Weggelassene Zutaten sind schon herausgerechnet" : ""}.</p>
    </div>`;
  }

  function sheetEinplanen() {
    const r = REZ[ui.sheet.rid];
    const p = S.plan;
    let html = sheetKopf(`${r.e} Einplanen`, `Wann gibt es ${esc(r.n)}?`);
    for (let d = 0; d < p.tage; d++) {
      const keys = L.SLOTS.filter((s) => r.m.includes(s)).map((s) => `${d}-${s}`).filter((k) => p.mahlzeiten[k]);
      if (!keys.length) continue;
      html += `<div class="cat-h">${L.datumKurz(L.plusTage(p.start, d))}</div>`;
      html += keys.map((k) => {
        const m = p.mahlzeiten[k];
        const aktuell = m.art === "koch" ? REZ[p.kochen[m.id].rid]?.n || "leer" : m.art === "rest" ? `Rest: ${REZ[p.kochen[m.id].rid]?.n}` : m.art === "tk" ? "Tiefkühler" : "frei";
        return `<button class="sug" data-a="einplanenHier" data-key="${k}" data-id="${r.id}"><span class="em">${L.SLOT_ICON[slotTeile(k).s]}</span><span class="grow"><div class="t">${L.SLOT_NAME[slotTeile(k).s]}</div><div class="cost">jetzt: ${esc(aktuell)}</div></span></button>`;
      }).join("");
    }
    return html;
  }

  function sheetBestaetigen() {
    const b = ui.sheet;
    return sheetKopf(b.titel) + `<p>${b.text}</p><div class="btns"><button class="btn ${b.gefahr ? "danger" : "primary"}" data-a="bestaetigt">${b.ok}</button><button class="btn" data-a="sheetZu">Abbrechen</button></div>`;
  }
  function frage(titel, text, ok, fn, gefahr = false) {
    oeffneSheet({ typ: "bestaetigen", titel, text, ok, fn, gefahr });
  }

  // ---------- Aktionen ----------
  const A = {
    tab: (ds) => {
      ui.tab = ds.id;
      try { sessionStorage.setItem("restlos-tab", ui.tab); } catch (e) { /* egal */ }
      render();
      window.scrollTo(0, 0);
    },
    planNeu: () => {
      const vorhanden = !!S.plan;
      aendern(() => { if (vorhanden) S.zuletzt = [...new Set(L.kochListe(S.plan).map((k) => k.rid).filter(Boolean))]; neuPlanen(); }, vorhanden ? "Neuer Vorschlag erstellt" : "Plan erstellt ✨");
      if (ui.tab !== "plan") A.tab({ id: "plan" });
    },
    planLeer: () => aendern(() => { S.plan = L.leererPlan(S); S.abgehakt = {}; }, "Leerer Plan – tippe auf eine Mahlzeit"),
    planFuellen: () => aendern(() => L.fuelle(S.plan, S, true), "Lücken gefüllt"),
    planLoeschen: () => frage("Plan löschen?", "Der aktuelle Wochenplan und die Einkaufsliste werden verworfen.", "Löschen", () => { S.plan = null; S.abgehakt = {}; }, true),
    wocheAbschliessen: () => frage("Woche abschließen?", "Haltbare und einfrierbare Reste werden in deinen Vorrat übernommen, übrige Portionen in den Tiefkühler. Danach kannst du die nächste Woche planen.", "Abschließen", wocheAbschliessen),
    bestaetigt: () => { const fn = ui.sheet.fn; ui.sheet = null; aendern(fn); },
    slot: (ds) => oeffneSheet({ typ: "slot", key: ds.key }),
    sheetZu: () => schliesseSheet(),
    setRezept: (ds) => { aendern(() => setzeRezept(ds.key, ds.id), `${REZ[ds.id].n} eingeplant`); schliesseSheet(); },
    setRest: (ds) => { aendern(() => setzeRest(ds.key, ds.id), "Als Rest eingeplant"); schliesseSheet(); },
    setFrei: (ds) => { aendern(() => setzeFrei(ds.key)); schliesseSheet(); },
    setTk: (ds) => { aendern(() => setzeTk(ds.key, Number(ds.i)), "Portion aus dem Tiefkühler eingeplant"); schliesseSheet(); },
    portion: (ds) => aendern(() => {
      const k = S.plan.kochen[ds.id];
      const info = L.portionenInfo(S.plan, ds.id);
      k.portionen = Math.min(8, Math.max(Math.max(1, info.gegessen), k.portionen + Number(ds.delta)));
    }),
    portionAnsicht: (ds) => { ui.portionen = Math.min(8, Math.max(1, (ui.portionen || REZ[ui.sheet.rid].s) + Number(ds.delta))); renderSheet(); },
    rezept: (ds) => { ui.portionen = null; oeffneSheet({ typ: "rezept", rid: ds.id, koch: ds.koch || null }); },
    zutatWeg: (ds) => aendern(() => {
      const k = S.plan.kochen[ds.koch];
      k.weg = k.weg.includes(ds.id) ? k.weg.filter((x) => x !== ds.id) : [...k.weg, ds.id];
    }),
    wunsch: (ds) => aendern(() => {
      S.wuensche = S.wuensche.includes(ds.id) ? S.wuensche.filter((x) => x !== ds.id) : [...S.wuensche, ds.id];
    }, S.wuensche.includes(ds.id) ? "Von der Wunschliste entfernt" : "⭐ Kommt in den nächsten Plan"),
    bewerten: (ds) => {
      const n = Number(ds.n);
      const neu = S.bewertungen[ds.id] === n ? 0 : n;
      aendern(() => { if (neu) S.bewertungen[ds.id] = neu; else delete S.bewertungen[ds.id]; },
        neu === 1 ? "Tipp: Mit „Nie mehr vorschlagen“ verschwindet es ganz" : neu ? `${"★".repeat(neu)} gespeichert` : "Bewertung entfernt");
    },
    sperren: (ds) => {
      const war = S.gesperrt.includes(ds.id);
      aendern(() => {
        S.gesperrt = war ? S.gesperrt.filter((x) => x !== ds.id) : [...S.gesperrt, ds.id];
        if (!war) S.wuensche = S.wuensche.filter((x) => x !== ds.id);
      }, war ? `${REZ[ds.id].n} wird wieder vorgeschlagen` : `${REZ[ds.id].n} wird nicht mehr vorgeschlagen`);
    },
    einplanen: (ds) => oeffneSheet({ typ: "einplanen", rid: ds.id }),
    einplanenHier: (ds) => { aendern(() => setzeRezept(ds.key, ds.id), "Eingeplant"); schliesseSheet(); },
    filter: (ds) => { ui.filter = ds.id; render(); },
    zutatFilterWeg: () => { ui.zutatFilter = null; render(); },
    zutatRezepte: (ds) => { ui.zutatFilter = ds.id; ui.filter = "alle"; ui.suche = ""; A.tab({ id: "rezepte" }); },
    abhaken: (ds) => aendern(() => { if (S.abgehakt[ds.id]) delete S.abgehakt[ds.id]; else S.abgehakt[ds.id] = true; }),
    abhakenReset: () => aendern(() => { S.abgehakt = {}; }),
    habeIch: (ds) => aendern(() => { if (S.habeIch[ds.id]) delete S.habeIch[ds.id]; else S.habeIch[ds.id] = true; }, S.habeIch[ds.id] ? "Wieder auf der Liste" : `${Z[ds.id].n}: schon zuhause`),
    einkaufAnsicht: (ds) => { ui.einkaufAnsicht = ds.id; render(); },
    teilen: async () => {
      const liste = L.einkaufsliste(S.plan, S);
      const v = L.marktVergleich(S.plan, S);
      const markt = (id) => (v.lohntKombi ? v.kombi.zuordnung[id] : v.einzel[0]?.markt);
      const kopf = v.lohntKombi ? `${marktName(v.kombi.maerkte[0])} + ${marktName(v.kombi.maerkte[1])}` : marktName(v.einzel[0]?.markt);
      const zeilen = liste.kaufen.filter((x) => !S.abgehakt[x.id]).map((x) => `☐ ${x.packungen}× ${Z[x.id].n} (${Z[x.id].pl})${v.lohntKombi ? ` – ${marktName(markt(x.id))}` : ""}`);
      const text = `Einkaufsliste – ${kopf}\n\n${zeilen.join("\n")}`;
      try {
        if (navigator.share) await navigator.share({ title: "Einkaufsliste", text });
        else { await navigator.clipboard.writeText(text); toast("Liste kopiert"); }
      } catch (e) { /* abgebrochen */ }
    },
    portionenStd: (ds) => aendern(() => { S.einstellungen.portionen = Math.min(6, Math.max(1, S.einstellungen.portionen + Number(ds.delta))); }),
    mahlzeit: (ds) => aendern(() => { const a = S.einstellungen.mahlzeiten[ds.s]; a[Number(ds.i)] = !a[Number(ds.i)]; }),
    ausschlussWeg: (ds) => aendern(() => { S.einstellungen.ausgeschlossen = S.einstellungen.ausgeschlossen.filter((x) => x !== ds.id); }),
    vorratToggle: (ds) => aendern(() => {
      const f = S.einstellungen.vorratFehlt;
      S.einstellungen.vorratFehlt = f.includes(ds.id) ? f.filter((x) => x !== ds.id) : [...f, ds.id];
    }, S.einstellungen.vorratFehlt.includes(ds.id) ? `${Z[ds.id].n}: vorrätig` : `${Z[ds.id].n} kommt auf die Liste`),
    vorratNeu: () => {
      const id = document.getElementById("v-zutat").value;
      const m = parseFloat(String(document.getElementById("v-menge").value).replace(",", "."));
      if (!id || !(m > 0)) { toast("Zutat und Menge angeben"); return; }
      aendern(() => { S.vorrat[id] = (S.vorrat[id] || 0) + m; }, `${Z[id].n} im Vorrat`);
    },
    vorratWeg: (ds) => aendern(() => { delete S.vorrat[ds.id]; }),
    gefrorenWeg: (ds) => aendern(() => { S.gefroren.splice(Number(ds.i), 1); }),
    marktToggle: (ds) => {
      const ms = S.einstellungen.maerkte;
      if (ms.includes(ds.id) && ms.length === 1) { toast("Mindestens ein Markt muss aktiv sein"); return; }
      aendern(() => { S.einstellungen.maerkte = ms.includes(ds.id) ? ms.filter((x) => x !== ds.id) : [...ms, ds.id]; });
    },
    export: () => {
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `restlos-sicherung-${heute()}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    },
    reset: () => frage("Alles zurücksetzen?", "Plan, Einstellungen, Wunschliste und Vorrat werden gelöscht.", "Zurücksetzen", () => { S = standard(); anwendenTheme(); }, true),
  };

  const C = {
    start: (v) => { if (v) S.einstellungen.start = v; },
    tage: (v) => { S.einstellungen.tage = Number(v); },
    ausschlussNeu: (v) => { if (v && !S.einstellungen.ausgeschlossen.includes(v)) S.einstellungen.ausgeschlossen.push(v); },
    kombiAb: (v) => { S.einstellungen.kombiAb = Number(v); },
    budget: (v) => { const n = parseFloat(String(v).replace(",", ".")); S.einstellungen.budget = n > 0 ? n : null; },
    theme: (v) => { S.einstellungen.theme = v; anwendenTheme(); },
  };

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-a]");
    if (!el) return;
    const fn = A[el.dataset.a];
    if (fn) { e.preventDefault(); fn(el.dataset, el); }
  });
  document.addEventListener("change", (e) => {
    const el = e.target.closest("[data-change]");
    if (!el) return;
    const art = el.dataset.change;
    if (art === "import") {
      const f = el.files[0];
      if (!f) return;
      f.text().then((t) => {
        try {
          const d = JSON.parse(t);
          if (!d.einstellungen) throw new Error();
          S = { ...standard(), ...d };
          speichern(); anwendenTheme(); render(); toast("Wiederhergestellt");
        } catch (err) { toast("Datei konnte nicht gelesen werden"); }
      });
      return;
    }
    if (C[art]) aendern(() => C[art](el.value));
  });
  document.addEventListener("input", (e) => {
    const el = e.target.closest("[data-input]");
    if (!el) return;
    if (el.dataset.input === "suche") {
      ui.suche = el.value;
      document.getElementById("rlist").innerHTML = rezeptListeHtml();
    } else if (el.dataset.input === "sheetSuche") {
      ui.sheetSuche = el.value;
      document.getElementById("suglist").innerHTML = vorschlagListe();
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && ui.sheet) schliesseSheet(); });

  anwendenTheme();
  render();
})();
