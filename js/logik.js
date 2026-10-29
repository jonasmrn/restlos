// Kernlogik: Mengen, Einkaufsliste, Preise, Marktvergleich und automatischer Wochenplaner.
// Keine DOM-Zugriffe – alles reine Funktionen auf dem App-Zustand.

window.L = (() => {
  const Z = window.ZUTATEN;
  const REZ = Object.fromEntries(window.REZEPTE.map((r) => [r.id, r]));
  const SLOTS = ["fruehstueck", "mittag", "abend"];
  const SLOT_NAME = { fruehstueck: "Frühstück", mittag: "Mittag", abend: "Abend" };
  const SLOT_ICON = { fruehstueck: "☕", mittag: "🥪", abend: "🍽️" };
  const TAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const EPS = 1e-6;

  // ---------- Datum ----------
  const isoDatum = (d) => {
    const x = new Date(d);
    return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
  };
  const ausIso = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const plusTage = (iso, n) => {
    const d = ausIso(iso);
    d.setDate(d.getDate() + n);
    return isoDatum(d);
  };
  const wochentag = (iso) => (ausIso(iso).getDay() + 6) % 7; // 0 = Montag
  const datumKurz = (iso) => {
    const d = ausIso(iso);
    return `${TAGE[wochentag(iso)]} ${d.getDate()}.${d.getMonth() + 1}.`;
  };

  // ---------- Formatierung ----------
  const BRUCH = { 0.25: "¼", 0.5: "½", 0.75: "¾", 0.33: "⅓", 0.67: "⅔" };
  function zahl(x) {
    const ganz = Math.floor(x + EPS);
    const rest = Math.round((x - ganz) * 100) / 100;
    if (rest < 0.05) return String(ganz);
    const b = BRUCH[rest];
    if (b) return ganz ? `${ganz}${b}` : b;
    return x.toLocaleString("de-DE", { maximumFractionDigits: 1 });
  }
  function menge(id, m) {
    const z = Z[id];
    if (z.u === "g" || z.u === "ml") {
      const r = m >= 100 ? Math.round(m / 5) * 5 : Math.round(m);
      if (r >= 1000) return `${(r / 1000).toLocaleString("de-DE", { maximumFractionDigits: 2 })} ${z.u === "g" ? "kg" : "l"}`;
      return `${r} ${z.u}`;
    }
    const mehrzahl = { Zehe: "Zehen", Stange: "Stangen", Prise: "Prisen" };
    return `${zahl(m)} ${m > 1 + EPS ? mehrzahl[z.u] || z.u : z.u}`;
  }
  const euro = (x) => x.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

  // ---------- Zutaten eines Kochvorgangs ----------
  // Liefert alle Zutaten mit skalierter Menge und ob sie aktiv (gekauft/verwendet) sind.
  function zutatenFuer(r, portionen, weg = [], ausgeschlossen = []) {
    const f = portionen / r.s;
    return r.z.map(([id, q, opt]) => {
      let grund = null;
      if (ausgeschlossen.includes(id)) grund = "mag ich nicht";
      else if (weg.includes(id)) grund = "weggelassen";
      return { id, menge: q * f, opt: opt === "opt", aktiv: !grund, grund };
    });
  }
  // Nährwerte pro Portion – nur aus Zutaten, die tatsächlich verwendet werden
  const NW_FELDER = ["kcal", "eiweiss", "kh", "zucker", "fett", "ges", "bal", "salz"];
  function naehrwerte(r, portionen = r.s, weg = [], ausgeschlossen = []) {
    const summe = NW_FELDER.map(() => 0);
    for (const z of zutatenFuer(r, portionen, weg, ausgeschlossen)) {
      const zi = Z[z.id];
      if (!z.aktiv || !zi.nw) continue;
      const gramm = zi.u === "g" || zi.u === "ml" ? z.menge : z.menge * (zi.g || 0);
      zi.nw.forEach((v, i) => { summe[i] += (v * gramm) / 100; });
    }
    return Object.fromEntries(NW_FELDER.map((f, i) => [f, summe[i] / portionen]));
  }

  // Pflicht-Zutaten, die auf der Abneigungsliste stehen
  const kernKonflikte = (r, ausgeschlossen) => r.z.filter((z) => z[2] !== "opt" && ausgeschlossen.includes(z[0])).map((z) => z[0]);

  const istVorrat = (id, st) => !!Z[id].vorrat && !st.einstellungen.vorratFehlt.includes(id);
  const verderblich = (id) => !Z[id].tk && Z[id].sh <= 7;

  // ---------- Preise ----------
  function angebotFuer(id, markt) {
    const A = window.ANGEBOTE;
    if (!A || !A.liste) return null;
    const heute = isoDatum(new Date());
    return A.liste.find((a) => a.zutat === id && a.markt === markt && (!a.bis && !A.bis ? true : (a.bis || A.bis) >= heute)) || null;
  }
  function richtpreis(id, markt) {
    const M = window.MAERKTE.find((m) => m.id === markt);
    const f = M.f[Z[id].cat] ?? M.f.standard;
    return Z[id].pr * f;
  }
  function preis(id, markt) {
    const normal = richtpreis(id, markt);
    const a = angebotFuer(id, markt);
    if (a && a.preis < normal) return { preis: a.preis, normal, angebot: a };
    return { preis: normal, normal, angebot: null };
  }
  // günstigster Preis über die aktiven Märkte (für die Planung)
  function bestpreis(id, st) {
    let best = null;
    for (const m of st.einstellungen.maerkte) {
      const p = preis(id, m);
      if (!best || p.preis < best.preis) best = { ...p, markt: m };
    }
    return best || { preis: Z[id].pr, normal: Z[id].pr, angebot: null };
  }
  function angeboteFuerZutat(id, st) {
    return st.einstellungen.maerkte.map((m) => ({ m, p: preis(id, m) })).filter((x) => x.p.angebot);
  }

  // ---------- Kosten eines Gerichts ----------
  // Anteil der Packungspreise für die verwendeten Mengen (ohne Basis-Vorrat), mit aktuellen Angeboten
  function rezeptPreis(r, st, portionen = r.s, weg = []) {
    let preis = 0, normal = 0;
    for (const z of zutatenFuer(r, portionen, weg, st.einstellungen.ausgeschlossen)) {
      if (!z.aktiv || istVorrat(z.id, st)) continue;
      const bp = bestpreis(z.id, st);
      const anteil = z.menge / Z[z.id].p;
      preis += anteil * bp.preis;
      normal += anteil * bp.normal;
    }
    return { preis, normal, proPortion: preis / portionen, angebot: normal - preis > 0.05 };
  }

  // fisch | fleisch | vegetarisch | vegan – aus allen Zutaten (auch optionalen) abgeleitet
  function ernaehrung(r) {
    const ids = r.z.map((z) => z[0]);
    if (ids.some((id) => Z[id].fisch)) return "fisch";
    if (ids.some((id) => Z[id].cat === "fleisch")) return "fleisch";
    return ids.some((id) => Z[id].tier) ? "vegetarisch" : "vegan";
  }

  // ---------- Plan-Grundgerüst ----------
  // Auswahl = welche Mahlzeiten geplant werden: { start, tage, keys: ["0-mittag", …], portionen }
  const VORBEI = { fruehstueck: 10, mittag: 14, abend: 21 };
  // Für heute nur Mahlzeiten planen, die noch nicht vorbei sind
  const istVorbei = (iso, s) => iso === isoDatum(new Date()) && new Date().getHours() >= VORBEI[s];

  // Vorauswahl aus den Einstellungen (Mahlzeiten je Wochentag)
  function standardAuswahl(st, start, tage) {
    const e = st.einstellungen;
    const keys = [];
    for (let d = 0; d < tage; d++) {
      const wd = wochentag(plusTage(start, d));
      for (const s of SLOTS) if (e.mahlzeiten[s][wd]) keys.push(`${d}-${s}`);
    }
    return { start, tage, keys, portionen: e.portionen };
  }

  function slotsListe(st, a) {
    const keys = new Set(a.keys);
    const out = [];
    for (let d = 0; d < a.tage; d++) {
      const iso = plusTage(a.start, d);
      for (const s of SLOTS) {
        if (!keys.has(`${d}-${s}`) || istVorbei(iso, s)) continue;
        out.push({ d, s, key: `${d}-${s}`, iso });
      }
    }
    return out;
  }
  const slotOrder = (key) => {
    const [d, s] = key.split("-");
    return Number(d) * 3 + SLOTS.indexOf(s);
  };

  let uidZaehler = 0;
  const uid = () => `k${Date.now().toString(36)}${(uidZaehler++).toString(36)}`;

  // Legt fest, wann gekocht wird und welche Mahlzeiten Reste sind.
  function erstelleGeruest(st, a) {
    const P = a.portionen || st.einstellungen.portionen;
    const slots = slotsListe(st, a);
    const mahlzeiten = {};
    const kochen = {};
    for (const sl of slots) {
      if (mahlzeiten[sl.key]) continue;
      const id = uid();
      if (sl.s === "fruehstueck") {
        mahlzeiten[sl.key] = { art: "koch", id };
        kochen[id] = { rid: null, portionen: 1, typ: "fruehstueck", key: sl.key, weg: [] };
        continue;
      }
      mahlzeiten[sl.key] = { art: "koch", id };
      kochen[id] = { rid: null, portionen: P, typ: sl.s, key: sl.key, weg: [] };
      let offen = P - 1;
      const tage = new Set([sl.d]);
      for (const c of slots) {
        if (offen <= 0) break;
        if (c.s === "fruehstueck" || mahlzeiten[c.key] || c.d <= sl.d || c.d > sl.d + 2 || tage.has(c.d)) continue;
        mahlzeiten[c.key] = { art: "rest", id };
        tage.add(c.d);
        offen--;
      }
      // Am Planende: nur so viel kochen, wie auch gegessen wird
      if (offen > 0) kochen[id].portionen = P - offen;
    }
    return { mahlzeiten, kochen };
  }

  // Wie viele Portionen eines Kochvorgangs gegessen bzw. übrig sind
  function portionenInfo(plan, id) {
    const k = plan.kochen[id];
    const gegessen = Object.values(plan.mahlzeiten).filter((m) => m.id === id && (m.art === "koch" || m.art === "rest")).length;
    return { gesamt: k.portionen, gegessen, uebrig: k.portionen - gegessen };
  }

  // Kochvorgänge in zeitlicher Reihenfolge
  const kochListe = (plan) =>
    Object.entries(plan.kochen)
      .map(([id, k]) => ({ id, ...k }))
      .sort((a, b) => slotOrder(a.key) - slotOrder(b.key));

  // ---------- Bedarf & Einkaufsliste ----------
  function bedarf(plan, st) {
    const aus = st.einstellungen.ausgeschlossen;
    const b = {};
    const wofuer = {};
    for (const k of kochListe(plan)) {
      if (!k.rid || !REZ[k.rid]) continue;
      for (const z of zutatenFuer(REZ[k.rid], k.portionen, k.weg, aus)) {
        if (!z.aktiv) continue;
        b[z.id] = (b[z.id] || 0) + z.menge;
        (wofuer[z.id] ||= []).push(k.rid);
      }
    }
    return { b, wofuer };
  }

  function einkaufsliste(plan, st) {
    const { b, wofuer } = bedarf(plan, st);
    const kaufen = [], ausVorrat = [], habeIch = [];
    for (const [id, n] of Object.entries(b)) {
      const z = Z[id];
      const rezepte = [...new Set(wofuer[id])];
      if (istVorrat(id, st)) { ausVorrat.push({ id, bedarf: n, rezepte }); continue; }
      if (st.habeIch[id]) { habeIch.push({ id, bedarf: n, rezepte }); continue; }
      const da = st.vorrat[id] || 0;
      const netto = Math.max(0, n - da);
      const packungen = netto > EPS ? Math.ceil(netto / z.p - EPS) : 0;
      const rest = da + packungen * z.p - n;
      const eintrag = { id, bedarf: n, vorhanden: Math.min(da, n), packungen, rest, rezepte };
      if (packungen > 0) kaufen.push(eintrag);
      else habeIch.push({ ...eintrag, ausVorrat: true });
    }
    const ordnung = Object.fromEntries(window.KATEGORIEN.map((k, i) => [k.id, i]));
    const sort = (a, b) => ordnung[Z[a.id].cat] - ordnung[Z[b.id].cat] || Z[a.id].n.localeCompare(Z[b.id].n);
    kaufen.sort(sort); ausVorrat.sort(sort); habeIch.sort(sort);
    return { kaufen, ausVorrat, habeIch };
  }

  // Gemeinsame Einkaufsliste: Zutaten aus dem Plan plus selbst hinzugefügte Artikel
  function gesamtListe(st) {
    const basis = st.plan ? einkaufsliste(st.plan, st) : { kaufen: [], ausVorrat: [], habeIch: [] };
    const map = new Map(basis.kaufen.map((e) => [e.id, { ...e, ausPlan: e.packungen, manuell: 0 }]));
    for (const [id, n] of Object.entries(st.liste || {})) {
      if (!Z[id] || !(n > 0)) continue;
      const e = map.get(id);
      if (e) { e.manuell = n; e.packungen += n; }
      else map.set(id, { id, bedarf: 0, vorhanden: 0, packungen: n, rest: 0, rezepte: [], ausPlan: 0, manuell: n });
    }
    const kaufen = [...map.values()].sort(sortiereNachAbteilung);
    return { ...basis, kaufen, frei: (st.freitext || []).filter((f) => f.anzahl > 0) };
  }
  function sortiereNachAbteilung(a, b) {
    const ordnung = Object.fromEntries(window.KATEGORIEN.map((k, i) => [k.id, i]));
    return ordnung[Z[a.id].cat] - ordnung[Z[b.id].cat] || Z[a.id].n.localeCompare(Z[b.id].n);
  }

  // Suche im Sortiment (Name und Suchbegriffe, Umlaute egal)
  const normal = (t) => String(t || "").toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");
  function suche(q) {
    const n = normal(q).trim();
    if (!n) return [];
    const treffer = [];
    for (const [id, z] of Object.entries(Z)) {
      const name = normal(z.n);
      const worte = name.split(/[^a-z0-9]+/);
      let rang = -1;
      if (name.startsWith(n)) rang = 0;
      else if (worte.some((w) => w.startsWith(n))) rang = 1;
      else if (name.includes(n)) rang = 2;
      else if (normal(z.s).split(" ").some((w) => w && w.startsWith(n))) rang = 3;
      if (rang >= 0) treffer.push({ id, rang });
    }
    return treffer.sort((a, b) => a.rang - b.rang || Z[a.id].n.length - Z[b.id].n.length).map((t) => t.id);
  }

  // Was nach dem Plan übrig bleibt (aus gekauften Packungen und Vorrat)
  function reste(plan, st) {
    const { kaufen } = einkaufsliste(plan, st);
    return kaufen
      .filter((e) => e.rest > EPS)
      .map((e) => {
        const z = Z[e.id];
        const anteil = e.rest / (e.packungen * z.p || 1);
        let status = "haltbar";
        if (z.tk) status = "tk";
        else if (z.sh <= 7 && z.fz) status = "einfrieren";
        else if (z.sh <= 7) status = "verderblich";
        return { id: e.id, rest: e.rest, status, wert: (e.rest / z.p) * z.pr, anteil };
      })
      .sort((a, b) => ["verderblich", "einfrieren", "haltbar", "tk"].indexOf(a.status) - ["verderblich", "einfrieren", "haltbar", "tk"].indexOf(b.status) || b.wert - a.wert);
  }

  // ---------- Marktvergleich ----------
  // Vergleicht die Märkte für eine Liste von Einträgen {id, packungen}
  function marktVergleich(kaufen, st) {
    const ms = st.einstellungen.maerkte;
    const einzel = ms
      .map((m) => {
        let summe = 0;
        const angebote = [];
        for (const e of kaufen) {
          const p = preis(e.id, m);
          summe += p.preis * e.packungen;
          if (p.angebot) angebote.push({ id: e.id, ersparnis: (p.normal - p.preis) * e.packungen });
        }
        return { markt: m, summe, angebote };
      })
      .sort((a, b) => a.summe - b.summe);

    let kombi = null;
    for (let i = 0; i < ms.length; i++)
      for (let j = i + 1; j < ms.length; j++) {
        let summe = 0;
        const zuordnung = {};
        for (const e of kaufen) {
          const a = preis(e.id, ms[i]).preis, b2 = preis(e.id, ms[j]).preis;
          zuordnung[e.id] = a <= b2 ? ms[i] : ms[j];
          summe += Math.min(a, b2) * e.packungen;
        }
        if (!kombi || summe < kombi.summe) kombi = { maerkte: [ms[i], ms[j]], summe, zuordnung };
      }
    if (kombi && einzel.length) {
      kombi.ersparnis = einzel[0].summe - kombi.summe;
      // Hauptmarkt zuerst nennen
      const anz = (m) => Object.values(kombi.zuordnung).filter((x) => x === m).length;
      kombi.maerkte.sort((a, b) => anz(b) - anz(a));
      if (Object.values(kombi.zuordnung).every((m) => m === kombi.maerkte[0])) kombi = null;
    }
    const lohntKombi = kombi && kombi.ersparnis >= st.einstellungen.kombiAb;
    return { einzel, kombi, lohntKombi };
  }

  // ---------- Automatischer Planer ----------
  // Bewertet einen ganzen Plan, indem der Kühlschrank Tag für Tag simuliert wird:
  // Lose mit Menge und Verfallstag. Was verdirbt oder übrig bleibt, zählt als Abfall.
  function neuesLager(st) {
    const lager = {};
    for (const [id, m] of Object.entries(st.vorrat)) {
      if (!Z[id] || m <= EPS) continue;
      lager[id] = [{ menge: m, verfall: Z[id].fz || Z[id].tk ? Infinity : Z[id].sh, fz: !!(Z[id].fz || Z[id].tk) }];
    }
    return lager;
  }
  const kopieLager = (l) => Object.fromEntries(Object.entries(l).map(([k, v]) => [k, v.map((x) => ({ ...x }))]));

  const aktiveZutaten = (r, k, st) =>
    zutatenFuer(r, k.portionen, k.weg || [], st.einstellungen.ausgeschlossen).filter((z) => z.aktiv && !istVorrat(z.id, st) && !st.habeIch[z.id]);

  // Verbraucht die Zutaten eines Kochvorgangs aus dem Lager, kauft den Rest in ganzen Packungen.
  function koche(r, k, d, lager, st) {
    let kosten = 0, ersparnis = 0;
    const genutzt = [], neu = [];
    for (const z of aktiveZutaten(r, k, st)) {
      const zi = Z[z.id];
      let bedarf = z.menge;
      const lose = (lager[z.id] || []).filter((x) => x.menge > EPS && (x.fz || x.verfall >= d)).sort((a, b) => a.verfall - b.verfall);
      let ausLager = 0;
      for (const los of lose) {
        if (bedarf <= EPS) break;
        const n = Math.min(los.menge, bedarf);
        los.menge -= n;
        bedarf -= n;
        ausLager += n;
      }
      if (ausLager > EPS) genutzt.push({ id: z.id, menge: ausLager });
      if (bedarf > EPS) {
        const packs = Math.ceil(bedarf / zi.p - EPS);
        const bp = bestpreis(z.id, st);
        kosten += packs * bp.preis;
        ersparnis += (bp.normal - bp.preis) * packs;
        neu.push({ id: z.id, packs });
        const rest = packs * zi.p - bedarf;
        if (rest > EPS) (lager[z.id] ||= []).push({ menge: rest, verfall: zi.tk ? Infinity : d + zi.sh, fz: !!(zi.fz || zi.tk) });
      }
    }
    return { kosten, ersparnis, genutzt, neu };
  }

  // Abfallwert der Lose, die am Ende übrig sind
  function abfallWert(lager, letzterTag, teil) {
    let summe = 0;
    for (const [id, lose] of Object.entries(lager)) {
      const zi = Z[id];
      for (const los of lose) {
        if (los.menge <= EPS) continue;
        const wert = (los.menge / zi.p) * zi.pr;
        let g;
        if (zi.tk) g = 0.02;
        else if (zi.fz) g = teil ? 0.08 : 0.25;
        else if (los.verfall < letzterTag) g = 1;
        else if (zi.sh <= 7) g = teil ? 0.35 : 0.9;
        else if (zi.sh <= 21) g = teil ? 0.08 : 0.3;
        else g = 0.03;
        summe += wert * g;
      }
    }
    return summe;
  }

  const tagVon = (key) => Number(key.split("-")[0]);

  function simuliere(plan, st, teil = false, liste = kochListe(plan)) {
    const lager = neuesLager(st);
    let kosten = 0, ersparnis = 0, letzter = 0;
    for (const k of liste) {
      const rid = plan.kochen[k.id].rid;
      if (!rid || !REZ[rid]) continue;
      const d = tagVon(k.key);
      letzter = d;
      const e = koche(REZ[rid], plan.kochen[k.id], d, lager, st);
      kosten += e.kosten;
      ersparnis += e.ersparnis;
    }
    return { kosten, ersparnis, abfall: abfallWert(lager, teil ? letzter : plan.tage, teil) };
  }

  function proteinGruppe(r) {
    const pflicht = r.z.filter((z) => z[2] !== "opt").map((z) => z[0]);
    if (pflicht.some((i) => i === "hack" || i === "rinderhack")) return "hack";
    if (pflicht.includes("haehnchen")) return "gefluegel";
    if (pflicht.some((i) => i === "schwein" || i === "gulasch")) return "schwein_rind";
    if (pflicht.some((i) => i === "speck" || i === "bratwurst" || i === "kochschinken")) return "wurst";
    if (pflicht.some((i) => Z[i].fisch)) return "fisch";
    return "veggie";
  }
  const VIELFALT_TAGS = ["pasta", "curry", "suppe", "wraps", "salat", "auflauf", "bowl"];

  // Gesamtbewertung eines Plans – kleiner ist besser
  function ziel(plan, st, ctx = {}, liste = kochListe(plan)) {
    const sim = simuliere(plan, st, ctx.teil, liste);
    const e = st.einstellungen;
    let s = sim.kosten * (e.budget ? 1.0 : 0.45) + sim.abfall * 1.6 - sim.ersparnis * 0.3;
    const zaehler = {};
    const gesehen = {};
    const fruehTag = {};
    let vorher = null, n = 0;
    for (const k of liste) {
      const kk = plan.kochen[k.id];
      const r = REZ[kk.rid];
      if (!r) continue;
      const d = tagVon(k.key);
      if (kk.typ === "fruehstueck") {
        if (fruehTag[r.id] !== undefined) s += d - fruehTag[r.id] <= 2 ? 2.5 : 0.6;
        if (gesehen[r.id]) s += 4;
        fruehTag[r.id] = d;
      } else {
        n++;
        if (gesehen[r.id]) s += 30;
        if (fruehTag[r.id] !== undefined) s += 4;
        gesehen[r.id] = true;
        const g = proteinGruppe(r);
        zaehler[g] = (zaehler[g] || 0) + 1;
        if (vorher) s += VIELFALT_TAGS.filter((t) => r.tags.includes(t) && vorher.tags.includes(t)).length * 1.2;
        vorher = r;
        const resteAnzahl = portionenInfo(plan, k.id).gegessen - 1;
        if (r.aufw === false && resteAnzahl > 0) s += 5 * resteAnzahl;
      }
      if (st.wuensche.includes(r.id)) s -= 6;
      const sterne = (st.bewertungen || {})[r.id];
      if (sterne) s -= (sterne - 3) * 1.2;
      if ((st.gesperrt || []).includes(r.id)) s += 100;
      if ((st.zuletzt || []).includes(r.id)) s += 2;
      if (kernKonflikte(r, e.ausgeschlossen).length) s += 50;
      if (ctx.rauschen) s -= ctx.rauschen[r.id] || 0;
    }
    const maxG = Math.max(2, Math.ceil(n / 3));
    for (const c of Object.values(zaehler)) if (c > maxG) s += (c - maxG) * 2;
    return s;
  }

  function passtZuSlot(r, typ) {
    return r.m.includes(typ);
  }

  function kandidaten(typ, st) {
    const aus = st.einstellungen.ausgeschlossen;
    const gesperrt = st.gesperrt || [];
    return window.REZEPTE.filter((r) => passtZuSlot(r, typ) && kernKonflikte(r, aus).length === 0 && !gesperrt.includes(r.id));
  }

  // Lager-Zustand vor einem bestimmten Kochvorgang (für manuelle Vorschläge)
  function lagerVor(plan, st, bisKey) {
    const lager = neuesLager(st);
    for (const k of kochListe(plan)) {
      if (slotOrder(k.key) >= slotOrder(bisKey)) break;
      if (!k.rid || !REZ[k.rid]) continue;
      koche(REZ[k.rid], k, tagVon(k.key), lager, st);
    }
    return lager;
  }

  // Vorschläge für einen Kochvorgang – sortiert danach, wie gut sie in den Gesamtplan passen
  function vorschlaege(plan, st, kochId, typ) {
    const k = plan.kochen[kochId];
    const d = tagVon(k.key);
    const lager = lagerVor(plan, st, k.key);
    const liste = kochListe(plan);
    const alt = k.rid;
    const imPlan = new Set(Object.entries(plan.kochen).filter(([id]) => id !== kochId).map(([, x]) => x.rid));
    const out = window.REZEPTE.filter((r) => passtZuSlot(r, typ)).map((r) => {
      const info = koche(r, { ...k, weg: [] }, d, kopieLager(lager), st);
      k.rid = r.id;
      const score = ziel(plan, st, {}, liste);
      return { r, ...info, konflikt: kernKonflikte(r, st.einstellungen.ausgeschlossen), imPlan: imPlan.has(r.id), gesperrt: (st.gesperrt || []).includes(r.id), score };
    });
    k.rid = alt;
    return out.sort((a, b) => a.score - b.score);
  }

  // Füllt alle (oder nur leere) Kochvorgänge: erst gierig, dann lokale Verbesserung
  function fuelle(plan, st, nurLeere = false) {
    const liste = kochListe(plan);
    const offen = liste.filter((k) => !nurLeere || !plan.kochen[k.id].rid || !REZ[plan.kochen[k.id].rid]);
    for (const k of offen) plan.kochen[k.id].rid = null;
    const rauschen = Object.fromEntries(window.REZEPTE.map((r) => [r.id, Math.random() * 1.5]));
    const pools = {};
    const pool = (typ) => (pools[typ] ||= kandidaten(typ, st));
    const wunsch = (id) => st.wuensche.includes(id);
    const imPlan = (id) => Object.values(plan.kochen).some((x) => x.rid === id);

    offen.forEach((k, i) => {
      const kk = plan.kochen[k.id];
      const offeneWuensche = st.wuensche.filter((w) => REZ[w] && !imPlan(w) && passtZuSlot(REZ[w], kk.typ));
      const restTermine = offen.slice(i).filter((x) => offeneWuensche.some((w) => passtZuSlot(REZ[w], plan.kochen[x.id].typ))).length;
      let kand = offeneWuensche.length && restTermine <= offeneWuensche.length ? offeneWuensche.map((w) => REZ[w]) : pool(kk.typ);
      if (!kand.length) kand = window.REZEPTE.filter((r) => passtZuSlot(r, kk.typ));
      let best = null, bestS = Infinity;
      for (const r of kand) {
        kk.rid = r.id;
        const s = ziel(plan, st, { teil: true, rauschen }, liste);
        if (s < bestS) { bestS = s; best = r.id; }
      }
      kk.rid = best;
    });

    // Lokale Suche: einzelne Gerichte tauschen und Reihenfolge vertauschen
    const ctx = { rauschen };
    let aktuell = ziel(plan, st, ctx, liste);
    for (let pass = 0; pass < 3; pass++) {
      let besser = false;
      for (const k of offen) {
        const kk = plan.kochen[k.id];
        const alt = kk.rid;
        if (!alt || (wunsch(alt) && Object.values(plan.kochen).filter((x) => x.rid === alt).length === 1)) continue;
        let bestR = alt;
        for (const r of pool(kk.typ)) {
          if (r.id === alt) continue;
          kk.rid = r.id;
          const s = ziel(plan, st, ctx, liste);
          if (s < aktuell - 0.01) { aktuell = s; bestR = r.id; besser = true; }
        }
        kk.rid = bestR;
      }
      for (let i = 0; i < offen.length; i++)
        for (let j = i + 1; j < offen.length; j++) {
          const a = plan.kochen[offen[i].id], b = plan.kochen[offen[j].id];
          if (!a.rid || !b.rid) continue;
          if (a.typ !== b.typ && !(passtZuSlot(REZ[a.rid], b.typ) && passtZuSlot(REZ[b.rid], a.typ))) continue;
          [a.rid, b.rid] = [b.rid, a.rid];
          const s = ziel(plan, st, ctx, liste);
          if (s < aktuell - 0.01) { aktuell = s; besser = true; }
          else [a.rid, b.rid] = [b.rid, a.rid];
        }
      if (!besser) break;
    }
    for (const k of offen) plan.kochen[k.id].weg = [];
    return plan;
  }

  function leererPlan(st, a) {
    return { start: a.start, tage: a.tage, auswahl: a, ...erstelleGeruest(st, a), erstellt: new Date().toISOString() };
  }
  const neuerPlan = (st, a) => fuelle(leererPlan(st, a), st);

  // Rezepte, die gut mit einem Rezept kombinierbar sind (teilen angebrochene Packungen)
  function passtGutZu(r, st, n = 4) {
    const aus = st.einstellungen.ausgeschlossen;
    const meine = zutatenFuer(r, 2, [], aus).filter((z) => z.aktiv && !Z[z.id].vorrat);
    const resteVon = {};
    for (const z of meine) {
      const zi = Z[z.id];
      const rest = Math.ceil(z.menge / zi.p - EPS) * zi.p - z.menge;
      if (rest > EPS && zi.sh <= 21 && !zi.tk) resteVon[z.id] = rest;
    }
    return window.REZEPTE.filter((x) => x.id !== r.id && kernKonflikte(x, aus).length === 0 && !(st.gesperrt || []).includes(x.id) && !x.m.every((m) => m === "fruehstueck"))
      .map((x) => {
        let wert = 0;
        const geteilt = [];
        for (const z of zutatenFuer(x, 2, [], aus)) {
          if (!z.aktiv || !resteVon[z.id]) continue;
          const n2 = Math.min(z.menge, resteVon[z.id]);
          wert += (n2 / Z[z.id].p) * Z[z.id].pr * (verderblich(z.id) ? 1.5 : 1);
          geteilt.push(z.id);
        }
        return { r: x, wert, geteilt };
      })
      .filter((x) => x.wert > 0.3)
      .sort((a, b) => b.wert - a.wert)
      .slice(0, n);
  }

  function planKosten(plan, st) {
    const v = marktVergleich(einkaufsliste(plan, st).kaufen, st);
    if (!v.einzel.length) return null;
    return v.lohntKombi ? v.kombi.summe : v.einzel[0].summe;
  }

  return {
    Z, REZ, SLOTS, SLOT_NAME, SLOT_ICON, TAGE,
    isoDatum, ausIso, plusTage, wochentag, datumKurz,
    zahl, menge, euro,
    zutatenFuer, naehrwerte, kernKonflikte, istVorrat, verderblich,
    preis, bestpreis, angebotFuer, angeboteFuerZutat,
    rezeptPreis, ernaehrung, istVorbei, standardAuswahl,
    slotsListe, slotOrder, erstelleGeruest, portionenInfo, kochListe, uid,
    bedarf, einkaufsliste, gesamtListe, suche, normal, reste, marktVergleich, planKosten,
    neuerPlan, leererPlan, fuelle, vorschlaege, passtGutZu, kandidaten, simuliere, ziel, proteinGruppe,
  };
})();
