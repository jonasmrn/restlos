// Wochenangebote – wird von Claude wöchentlich recherchiert und aktualisiert.
// preis = Angebotspreis umgerechnet auf die Standardpackung der Zutat (siehe zutaten.js)
// text  = Originalangebot aus dem Prospekt
// Nur Angebote mit ähnlicher Packungsgröße werden übernommen (keine XXL-Packs, die für 1 Person zu groß sind).

window.ANGEBOTE = {
  stand: "2026-11-11",
  von: "2026-11-09",
  bis: "2026-11-14",
  hinweis: "KW 46. Quellen: aldi-sued.de, penny.de, marktguru.de (Lidl, Rewe). Für Edeka gab es auf marktguru nur Großhändler-Angebote (Foodservice), keine für Endkunden. Rewe-Preise können je nach Markt abweichen.",
  liste: [
    // ---------- Aldi Süd (aldi-sued.de, Mo 9.11. – Sa 14.11.) ----------
    { markt: "aldi", zutat: "paprika", preis: 1.79, text: "Spitzpaprika rot 500 g (ca. 3 Stk)" },
    { markt: "aldi", zutat: "zwiebel", preis: 0.93, text: "Speisezwiebeln gelb 1,5 kg, 1,39 €" },
    { markt: "aldi", zutat: "suesskartoffel", preis: 0.70, text: "Süßkartoffeln lose, 1,39 €/kg" },
    { markt: "aldi", zutat: "avocado", preis: 0.89, text: "Avocado, Stück" },
    { markt: "aldi", zutat: "mango", preis: 1.19, text: "Mango, Stück" },
    { markt: "aldi", zutat: "rotkohl", preis: 0.88, text: "Rotkohl lose, 0,88 €/kg (1 Kopf ca. 1 kg)" },
    { markt: "aldi", zutat: "orangensaft", preis: 1.29, text: "Orangensaft 1 l, zzgl. 0,25 € Pfand" },
    { markt: "aldi", zutat: "lachs", preis: 3.74, text: "Norwegisches Lachsfilet 300 g, 4,49 € statt 5,79 € (frisch, nicht TK: schnell verbrauchen oder einfrieren)" },
    { markt: "aldi", zutat: "haehnchen", preis: 3.79, text: "Hähnchen-Geschnetzeltes 400 g, 3,79 € statt 4,99 €" },
    { markt: "aldi", zutat: "haehnchenschenkel", preis: 4.39, text: "Hähnchen-Unterkeule 1 kg, 4,39 € statt 5,59 €" },
    { markt: "aldi", zutat: "putenbrust", preis: 4.59, text: "Puten-Ministeaks 400 g, 4,59 € statt 5,59 €" },
    { markt: "aldi", zutat: "bratwurst", preis: 1.79, text: "Schweine-Bratwurst 600 g (6 Stk), 2,69 € statt 3,49 €" },
    { markt: "aldi", zutat: "nackensteaks", preis: 3.59, text: "Schweine-Nackensteak mariniert 600 g, 3,59 € statt 4,49 €" },
    { markt: "aldi", zutat: "butter", preis: 1.15, text: "Deutsche Markenbutter 250 g, 1,15 € statt 1,19 €" },
    { markt: "aldi", zutat: "fruchtjoghurt", preis: 0.39, text: "Sahnejoghurt Bratapfel 140 g, ab Fr 13.11.", von: "2026-11-13" },

    // ---------- Penny (penny.de, Mo 9.11. – Sa 14.11., Preise ohne App) ----------
    { markt: "penny", zutat: "schwein", preis: 3.79, text: "Mühlenhof Schweine-Geschnetzeltes 500 g, 3,79 € (mit App 2,99 €)" },
    { markt: "penny", zutat: "milch", preis: 0.99, text: "Bärenmarke Frischmilch 1 l" },
    { markt: "penny", zutat: "rucola", preis: 0.69, text: "Rucola 125 g, 0,69 € statt 0,89 €" },
    { markt: "penny", zutat: "fruchtjoghurt", preis: 0.39, text: "Müller Joghurt mit der Ecke 150 g, 0,39 € (mit App 0,29 €)" },
    { markt: "penny", zutat: "margarine", preis: 1.32, text: "Lätta Halbfettmargarine 450 g, 1,19 €" },
    { markt: "penny", zutat: "salami", preis: 0.93, text: "Mühlenhof Delikatess Edelsalami 150 g, 1,39 € (mit App 0,99 €)" },
    { markt: "penny", zutat: "schokolade", preis: 0.89, text: "Alpia Schokolade 100 g" },
    { markt: "penny", zutat: "kakaopulver", preis: 1.99, text: "Kaba Das Original 400 g" },
    { markt: "penny", zutat: "gruentee", preis: 0.89, text: "Mayfair Grüner Tee 43,75 g (25 Beutel)" },
    { markt: "penny", zutat: "zahnpasta", preis: 0.33, text: "Todaydent Zahncreme Kräuter 125 ml, 0,55 €" },
    // ab Donnerstag
    { markt: "penny", zutat: "rosenkohl", preis: 0.74, text: "Rosenkohl 750 g, 1,11 €, ab Do 12.11.", von: "2026-11-12" },

    // ---------- Lidl (marktguru.de, 8.11. – 14.11.) ----------
    { markt: "lidl", zutat: "paprika", preis: 1.44, text: "Rote Paprika lose, 2,99 €/kg (3 Stk ca. 480 g)" },
    { markt: "lidl", zutat: "rosenkohl", preis: 0.74, text: "Rosenkohl 750 g, 1,11 €" },
    { markt: "lidl", zutat: "ingwer", preis: 0.20, text: "Bio-Ingwer lose, 0,39 €/100 g" },

    // ---------- Rewe (marktguru.de, 8.11. – 14.11.) ----------
    { markt: "rewe", zutat: "mandarinen", preis: 1.89, text: "ja! Clementinen 1-kg-Netz" },
    { markt: "rewe", zutat: "fruchtjoghurt", preis: 0.39, text: "Müller Joghurt mit der Ecke 150 g" },
  ],
};
