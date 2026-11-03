// Wochenangebote – wird von Claude wöchentlich recherchiert und aktualisiert.
// preis = Angebotspreis umgerechnet auf die Standardpackung der Zutat (siehe zutaten.js)
// text  = Originalangebot aus dem Prospekt
// Nur Angebote mit ähnlicher Packungsgröße werden übernommen (keine XXL-Packs, die für 1 Person zu groß sind).

window.ANGEBOTE = {
  stand: "2026-11-03",
  von: "2026-11-02",
  bis: "2026-11-07",
  hinweis: "KW 45. Quellen: aldi-sued.de, penny.de, marktguru.de (Lidl, Rewe). Für Edeka waren diese Woche keine aktuellen Einzelangebote abrufbar. Rewe-Preise können je nach Markt abweichen.",
  liste: [
    // ---------- Aldi Süd (aldi-sued.de, Mo 2.11. – Sa 7.11.) ----------
    { markt: "aldi", zutat: "apfel", preis: 1.39, text: "Äpfel süß-säuerlich 1 kg, 1,39 € statt 1,59 €" },
    { markt: "aldi", zutat: "lauch", preis: 0.45, text: "Porree/Lauch, Stück, 0,45 € statt 0,59 €" },
    { markt: "aldi", zutat: "zucchini", preis: 0.32, text: "Zucchini lose, 1,29 €/kg" },
    { markt: "aldi", zutat: "mandarinen", preis: 1.49, text: "Clementinen 1 kg" },
    { markt: "aldi", zutat: "rinderhack", preis: 4.59, text: "Hackfleisch vom Rind 500 g, 4,59 € statt 5,79 €" },
    { markt: "aldi", zutat: "bratwurst", preis: 2.29, text: "Schweine-Bratwurst 400 g, 2,29 € statt 2,79 €" },
    { markt: "aldi", zutat: "schweineschnitzel", preis: 3.74, text: "Schweine-Schnitzel 400 g, 2,99 € statt 3,75 €" },
    { markt: "aldi", zutat: "butter", preis: 1.15, text: "Deutsche Markenbutter 250 g, 1,15 € statt 1,19 €" },

    // ---------- Penny (penny.de, Mo 2.11. – Sa 7.11., Preise ohne App) ----------
    { markt: "penny", zutat: "paprika", preis: 1.69, text: "Paprika-Mix 500 g (ca. 3 Stk)" },
    { markt: "penny", zutat: "gulasch", preis: 6.99, text: "Mühlenhof Frisches Rinder-Gulasch 500 g" },
    { markt: "penny", zutat: "mango", preis: 0.79, text: "Mango, Stück" },
    { markt: "penny", zutat: "granatapfel", preis: 0.89, text: "Granatapfel, Stück" },
    { markt: "penny", zutat: "blaetterteig", preis: 0.95, text: "Penny Ready Frischer Blätterteig 275 g" },
    { markt: "penny", zutat: "salatmix", preis: 0.74, text: "Penny Ready Blattsalat-Mix 200 g, 0,99 € (mit App 0,79 €)" },
    { markt: "penny", zutat: "weisswein", preis: 2.49, text: "Fruchtig und ach wie süß Weißwein 0,75 l, 2,49 € (mit App 1,99 €)" },
    { markt: "penny", zutat: "bier_6er", preis: 3.95, text: "Warsteiner Pils 6 × 0,5 l, 3,95 € zzgl. Pfand" },
    // ab Donnerstag
    { markt: "penny", zutat: "avocado", preis: 0.89, text: "Avocado angereift, Stück, ab Do 5.11.", von: "2026-11-05" },
    { markt: "penny", zutat: "energydrink", preis: 0.88, text: "Rockstar Energy Drink 0,5 l, 0,88 € zzgl. Pfand, ab Do 5.11.", von: "2026-11-05" },

    // ---------- Lidl (marktguru.de, 1.11. – 7.11.) ----------
    { markt: "lidl", zutat: "rinderhack", preis: 4.49, text: "Metzgerfrisch Rinderhackfleisch 500 g" },
    { markt: "lidl", zutat: "h_milch", preis: 0.89, text: "Milbona laktosefreie H-Vollmilch 1 l, 0,89 € statt 1,19 €" },
    { markt: "lidl", zutat: "fruchtjoghurt", preis: 0.39, text: "Ehrmann Almighurt 150 g" },

    // ---------- Rewe (marktguru.de, 1.11. – 7.11.) ----------
    { markt: "rewe", zutat: "milch", preis: 0.99, text: "Bärenmarke Die Frische Milch 1 l" },
    { markt: "rewe", zutat: "haehnchen", preis: 5.16, text: "Hähnchenbrustfilet 1,29 €/100 g, nur in Märkten mit Geflügeltheke" },
    { markt: "rewe", zutat: "schwein", preis: 4.40, text: "Schweine-Nacken 0,88 €/100 g; in Streifen schneiden" },
  ],
};
