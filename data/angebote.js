// Wochenangebote – wird von Claude wöchentlich recherchiert und aktualisiert.
// preis = Angebotspreis umgerechnet auf die Standardpackung der Zutat (siehe zutaten.js)
// text  = Originalangebot aus dem Prospekt
// Nur Angebote mit ähnlicher Packungsgröße werden übernommen (keine XXL-Packs, die für 1 Person zu groß sind).

window.ANGEBOTE = {
  stand: "2026-10-26",
  von: "2026-10-26",
  bis: "2026-10-31",
  hinweis: "KW 44. Quellen: aldi-sued.de, penny.de, marktguru.de (Edeka). Für Lidl und Rewe waren diese Woche keine passenden Lebensmittel-Angebote abrufbar.",
  liste: [
    // ---------- Aldi Süd (aldi-sued.de, Mo 26.10. – Sa 31.10.) ----------
    { markt: "aldi", zutat: "apfel", preis: 1.69, text: "Äpfel Elstar, 1 kg" },
    { markt: "aldi", zutat: "lauch", preis: 0.59, text: "Porree/Lauch, Stück" },
    { markt: "aldi", zutat: "aubergine", preis: 0.59, text: "Aubergine, Stück" },
    { markt: "aldi", zutat: "suesskartoffel", preis: 0.75, text: "Süßkartoffeln lose, 1,49 €/kg" },
    { markt: "aldi", zutat: "gulasch", preis: 6.69, text: "Rindergulasch 500 g, 6,69 € statt 7,79 €" },

    // ---------- Penny (penny.de, Mo 26.10. – Sa 31.10., Preise ohne App) ----------
    { markt: "penny", zutat: "butter", preis: 1.39, text: "Meggle Feine Butter 250 g, 1,39 € statt 2,79 €" },
    { markt: "penny", zutat: "haehnchen", preis: 3.69, text: "Mühlenhof Hähnchen-Innenbrustfilet 400 g, 3,69 € (mit App 3,33 €)" },
    { markt: "penny", zutat: "schwein", preis: 3.99, text: "Mühlenhof Schweinefilet ca. 500 g, 3,99 €; in Streifen schneiden" },
    { markt: "penny", zutat: "joghurt", preis: 0.79, text: "Milprima Naturjoghurt 500 g" },
    { markt: "penny", zutat: "champignons", preis: 0.99, text: "Weiße Champignons 250 g" },

    // ---------- Edeka (marktguru.de, Mi 28.10. – Sa 31.10.) ----------
    { markt: "edeka", zutat: "paprika", preis: 1.49, text: "Gut & Günstig Paprika rot 500 g (ca. 3 Stk), ab Mi 28.10.", von: "2026-10-28" },
  ],
};
