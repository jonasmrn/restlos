// Zutaten-Stammdaten
// n  = Name, cat = Abteilung, u = Einheit, p = Packungsgröße (in u), pl = Packungs-Beschreibung
// pr = Richtpreis pro Packung beim Discounter in € (geschätzt, Stand Herbst 2026)
// sh = Haltbarkeit nach dem Öffnen in Tagen, fz = einfrierbar, vorrat = Basis-Vorrat (kommt nicht auf die Liste)
// nw = Nährwerte je 100 g/ml (Durchschnittswerte): [kcal, Eiweiß, Kohlenhydrate, davon Zucker, Fett, davon gesättigt, Ballaststoffe, Salz]
// g  = Gramm pro Einheit (essbarer Anteil) bei Zutaten, die nicht in g/ml gezählt werden

window.KATEGORIEN = [
  { id: "gemuese", name: "Obst & Gemüse", icon: "🥕" },
  { id: "brot", name: "Brot & Backwaren", icon: "🍞" },
  { id: "kuehl", name: "Kühlregal", icon: "🧀" },
  { id: "fleisch", name: "Fleisch & Wurst", icon: "🥩" },
  { id: "tk", name: "Tiefkühl", icon: "🧊" },
  { id: "trocken", name: "Nudeln, Reis & Co.", icon: "🍝" },
  { id: "fruehstueck", name: "Frühstück & Aufstriche", icon: "🍯" },
  { id: "konserven", name: "Konserven & Saucen", icon: "🥫" },
  { id: "suesses", name: "Süßes & Snacks", icon: "🍫" },
  { id: "getraenke", name: "Getränke", icon: "🥤" },
  { id: "vorrat", name: "Gewürze & Basics", icon: "🧂" },
  { id: "drogerie", name: "Drogerie & Haushalt", icon: "🧻" },
];

window.ZUTATEN = {
  // ---------- Obst & Gemüse ----------
  zwiebel:          { n: "Zwiebeln", cat: "gemuese", u: "Stk", p: 8, pl: "Netz 1 kg (ca. 8 Stk)", pr: 1.29, sh: 30, nw: [40, 1.1, 9.3, 4.2, 0.1, 0, 1.7, 0], g: 80 },
  knoblauch:        { n: "Knoblauch", cat: "gemuese", u: "Zehe", p: 10, pl: "1 Knolle (ca. 10 Zehen)", pr: 0.59, sh: 30, nw: [149, 6.4, 33, 1, 0.5, 0.1, 2.1, 0], g: 4 },
  karotte:          { n: "Karotten", cat: "gemuese", u: "Stk", p: 10, pl: "Beutel 1 kg (ca. 10 Stk)", pr: 0.99, sh: 14, nw: [41, 0.9, 9.6, 4.7, 0.2, 0, 2.8, 0.2], g: 80 },
  paprika:          { n: "Paprika", cat: "gemuese", u: "Stk", p: 3, pl: "3er-Pack", pr: 1.99, sh: 7, nw: [31, 1, 6, 4.2, 0.3, 0, 2.1, 0], g: 160 },
  tomate:           { n: "Tomaten", cat: "gemuese", u: "Stk", p: 6, pl: "Schale 500 g (ca. 6 Stk)", pr: 1.69, sh: 6, nw: [18, 0.9, 3.9, 2.6, 0.2, 0, 1.2, 0], g: 85 },
  kirschtomaten:    { n: "Kirschtomaten", cat: "gemuese", u: "g", p: 250, pl: "Schale 250 g", pr: 1.19, sh: 5, nw: [20, 1, 3.9, 2.7, 0.2, 0, 1.2, 0] },
  gurke:            { n: "Salatgurke", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.69, sh: 5, nw: [15, 0.7, 3.6, 1.7, 0.1, 0, 0.5, 0], g: 400 },
  zucchini:         { n: "Zucchini", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk (ca. 250 g)", pr: 0.79, sh: 6, nw: [17, 1.2, 3.1, 2.5, 0.3, 0.1, 1, 0], g: 250 },
  aubergine:        { n: "Aubergine", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.99, sh: 6, nw: [25, 1, 5.9, 3.5, 0.2, 0, 3, 0], g: 300 },
  brokkoli:         { n: "Brokkoli", cat: "gemuese", u: "Stk", p: 1, pl: "1 Kopf (ca. 500 g)", pr: 1.49, sh: 4, nw: [34, 2.8, 6.6, 1.7, 0.4, 0, 2.6, 0.1], g: 400 },
  champignons:      { n: "Champignons", cat: "gemuese", u: "g", p: 250, pl: "Schale 250 g", pr: 1.39, sh: 3, nw: [22, 3.1, 3.3, 2, 0.3, 0, 1, 0] },
  spinat:           { n: "Babyspinat", cat: "gemuese", u: "g", p: 125, pl: "Beutel 125 g", pr: 1.29, sh: 2, nw: [23, 2.9, 3.6, 0.4, 0.4, 0.1, 2.2, 0.2] },
  romanasalat:      { n: "Romanasalat-Herzen", cat: "gemuese", u: "Stk", p: 2, pl: "2er-Pack", pr: 1.29, sh: 5, nw: [17, 1.2, 3.3, 1.2, 0.3, 0, 2.1, 0], g: 150 },
  rucola:           { n: "Rucola", cat: "gemuese", u: "g", p: 125, pl: "Schale 125 g", pr: 1.19, sh: 2, nw: [25, 2.6, 3.7, 2, 0.7, 0.1, 1.6, 0.1] },
  lauch:            { n: "Lauch", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stange", pr: 0.79, sh: 7, nw: [31, 1.5, 6, 3, 0.3, 0, 2.2, 0], g: 200 },
  fruehlingszwiebel:{ n: "Frühlingszwiebeln", cat: "gemuese", u: "Stange", p: 6, pl: "1 Bund (ca. 6 Stangen)", pr: 0.69, sh: 5 },
  kartoffeln:       { n: "Kartoffeln (festkochend)", cat: "gemuese", u: "g", p: 1500, pl: "Beutel 1,5 kg", pr: 1.99, sh: 21, nw: [77, 2, 17, 0.8, 0.1, 0, 2.2, 0] },
  suesskartoffel:   { n: "Süßkartoffeln", cat: "gemuese", u: "g", p: 500, pl: "ca. 500 g", pr: 1.49, sh: 14, nw: [86, 1.6, 20, 4.2, 0.1, 0, 3, 0.1] },
  ingwer:           { n: "Ingwer", cat: "gemuese", u: "g", p: 50, pl: "Stück ca. 50 g", pr: 0.39, sh: 21, fz: true, nw: [80, 1.8, 18, 1.7, 0.8, 0.2, 2, 0] },
  limette:          { n: "Limette", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.39, sh: 14, nw: [30, 0.7, 10.5, 1.7, 0.2, 0, 2.8, 0], g: 40 },
  zitrone:          { n: "Zitrone", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.45, sh: 14, nw: [29, 1.1, 9.3, 2.5, 0.3, 0, 2.8, 0], g: 50 },
  avocado:          { n: "Avocado", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.99, sh: 2, nw: [160, 2, 8.5, 0.7, 14.7, 2.1, 6.7, 0], g: 150 },
  petersilie:       { n: "Petersilie", cat: "gemuese", u: "Bund", p: 1, pl: "1 Bund", pr: 0.79, sh: 5, fz: true, nw: [36, 3, 6.3, 0.9, 0.8, 0.1, 3.3, 0.1], g: 30 },
  basilikum:        { n: "Basilikum", cat: "gemuese", u: "Topf", p: 1, pl: "1 Topf", pr: 1.69, sh: 10, nw: [23, 3.2, 2.7, 0.3, 0.6, 0, 1.6, 0], g: 20 },
  banane:           { n: "Bananen", cat: "gemuese", u: "Stk", p: 5, pl: "Bund ca. 1 kg (5 Stk)", pr: 1.29, sh: 5, fz: true, nw: [89, 1.1, 22.8, 12.2, 0.3, 0.1, 2.6, 0], g: 120 },
  apfel:            { n: "Äpfel", cat: "gemuese", u: "Stk", p: 6, pl: "Beutel 1 kg (ca. 6 Stk)", pr: 1.99, sh: 21, nw: [52, 0.3, 13.8, 10.4, 0.2, 0, 2.4, 0], g: 150 },

  // ---------- Brot & Backwaren ----------
  toastbrot:        { n: "Toastbrot", cat: "brot", u: "g", p: 500, pl: "Packung 500 g", pr: 1.19, sh: 7, fz: true, nw: [265, 8, 48, 5, 3.5, 0.7, 3, 1.2] },
  vollkornbrot:     { n: "Vollkornbrot", cat: "brot", u: "g", p: 500, pl: "Packung 500 g", pr: 1.29, sh: 6, fz: true, nw: [220, 7, 40, 3, 1.5, 0.3, 8, 1.1] },
  broetchen:        { n: "Aufback-Brötchen", cat: "brot", u: "Stk", p: 6, pl: "6er-Pack", pr: 0.99, sh: 30, fz: true, nw: [260, 8.5, 52, 2, 1.5, 0.3, 3, 1.3], g: 60 },
  baguette:         { n: "Aufback-Baguette", cat: "brot", u: "Stk", p: 2, pl: "2er-Pack", pr: 0.99, sh: 30, fz: true, nw: [260, 8.5, 52, 2, 1.5, 0.3, 2.5, 1.3], g: 150 },
  burgerbroetchen:  { n: "Burger-Brötchen", cat: "brot", u: "Stk", p: 4, pl: "4er-Pack", pr: 1.29, sh: 5, fz: true, nw: [280, 9, 49, 6, 5, 1, 2.5, 1.1], g: 75 },
  wraps:            { n: "Weizen-Tortillas (Wraps)", cat: "brot", u: "Stk", p: 6, pl: "6er-Pack", pr: 1.39, sh: 7, fz: true, nw: [310, 8.5, 51, 3, 7.5, 3, 2.5, 1.2], g: 62 },

  // ---------- Kühlregal ----------
  milch:            { n: "Milch", cat: "kuehl", u: "ml", p: 1000, pl: "1 l", pr: 1.05, sh: 4, nw: [64, 3.3, 4.8, 4.8, 3.5, 2.3, 0, 0.1] },
  sahne:            { n: "Schlagsahne", cat: "kuehl", u: "ml", p: 200, pl: "Becher 200 ml", pr: 0.99, sh: 3, fz: true, nw: [292, 2.4, 3.2, 3.2, 30, 20, 0, 0.1] },
  schmand:          { n: "Schmand", cat: "kuehl", u: "g", p: 200, pl: "Becher 200 g", pr: 0.79, sh: 4, nw: [240, 2.6, 3.6, 3.6, 24, 16, 0, 0.1] },
  frischkaese:      { n: "Frischkäse", cat: "kuehl", u: "g", p: 200, pl: "Packung 200 g", pr: 1.09, sh: 5, nw: [250, 5.5, 3, 3, 24, 16, 0, 0.8] },
  feta:             { n: "Feta / Hirtenkäse", cat: "kuehl", u: "g", p: 200, pl: "Packung 200 g", pr: 1.49, sh: 4, nw: [264, 14, 1, 1, 21, 15, 0, 2.6] },
  mozzarella:       { n: "Mozzarella", cat: "kuehl", u: "g", p: 125, pl: "Kugel 125 g", pr: 0.79, sh: 2, nw: [240, 18, 1, 1, 18.5, 12.5, 0, 0.5] },
  gouda:            { n: "Gouda gerieben", cat: "kuehl", u: "g", p: 200, pl: "Beutel 200 g", pr: 1.99, sh: 7, fz: true, nw: [356, 24, 0, 0, 28, 19, 0, 1.8] },
  parmesan:         { n: "Hartkäse (Parmesan/Grana)", cat: "kuehl", u: "g", p: 100, pl: "Stück 100 g", pr: 1.79, sh: 21, nw: [392, 33, 0, 0, 28, 18, 0, 1.6] },
  halloumi:         { n: "Halloumi", cat: "kuehl", u: "g", p: 225, pl: "Packung 225 g", pr: 2.29, sh: 5, nw: [321, 22, 2, 1.3, 25, 17, 0, 2.7] },
  butter:           { n: "Butter", cat: "kuehl", u: "g", p: 250, pl: "250 g", pr: 2.19, sh: 30, fz: true, nw: [741, 0.7, 0.6, 0.6, 82, 55, 0, 0] },
  eier:             { n: "Eier", cat: "kuehl", u: "Stk", p: 6, pl: "6er-Pack", pr: 1.79, sh: 21, nw: [137, 12.6, 0.7, 0.7, 9.5, 2.7, 0, 0.4], g: 55 },
  joghurt:          { n: "Naturjoghurt", cat: "kuehl", u: "g", p: 500, pl: "Becher 500 g", pr: 0.89, sh: 5, nw: [66, 3.8, 4.7, 4.7, 3.6, 2.4, 0, 0.1] },
  quark:            { n: "Magerquark", cat: "kuehl", u: "g", p: 500, pl: "Becher 500 g", pr: 1.29, sh: 5, nw: [67, 12, 4, 4, 0.3, 0.2, 0, 0.1] },
  gnocchi:          { n: "Gnocchi", cat: "kuehl", u: "g", p: 500, pl: "Packung 500 g", pr: 1.29, sh: 3, nw: [155, 3.5, 33, 0.5, 0.6, 0.1, 2, 1.1] },
  flammkuchenteig:  { n: "Flammkuchenteig", cat: "kuehl", u: "Stk", p: 1, pl: "1 Rolle", pr: 1.29, sh: 1, nw: [290, 7, 46, 2.5, 8.5, 3.5, 2, 1.2], g: 260 },
  tofu:             { n: "Tofu natur", cat: "kuehl", u: "g", p: 200, pl: "Packung 200 g", pr: 1.49, sh: 3, nw: [120, 13, 1.5, 0.5, 7, 1, 1, 0] },

  // ---------- Fleisch & Wurst ----------
  hack:             { n: "Hackfleisch gemischt", cat: "fleisch", u: "g", p: 500, pl: "Packung 500 g", pr: 4.29, sh: 1, fz: true, nw: [230, 19, 0, 0, 17, 7, 0, 0.2] },
  rinderhack:       { n: "Rinderhackfleisch", cat: "fleisch", u: "g", p: 500, pl: "Packung 500 g", pr: 5.49, sh: 1, fz: true, nw: [200, 20, 0, 0, 13, 5.5, 0, 0.2] },
  haehnchen:        { n: "Hähnchenbrustfilet", cat: "fleisch", u: "g", p: 400, pl: "Packung 400 g", pr: 4.99, sh: 1, fz: true, nw: [106, 23.5, 0, 0, 1.2, 0.3, 0, 0.1] },
  schwein:          { n: "Schweine-Geschnetzeltes", cat: "fleisch", u: "g", p: 500, pl: "Packung 500 g", pr: 4.49, sh: 1, fz: true, nw: [140, 21, 0, 0, 6, 2.2, 0, 0.1] },
  gulasch:          { n: "Rindergulasch", cat: "fleisch", u: "g", p: 500, pl: "Packung 500 g", pr: 7.49, sh: 1, fz: true, nw: [140, 21, 0, 0, 6, 2.5, 0, 0.1] },
  speck:            { n: "Speckwürfel", cat: "fleisch", u: "g", p: 200, pl: "2 × 100 g", pr: 1.79, sh: 5, fz: true, nw: [300, 15, 0.5, 0.5, 27, 10, 0, 3.5] },
  kochschinken:     { n: "Kochschinken", cat: "fleisch", u: "g", p: 200, pl: "Packung 200 g", pr: 1.89, sh: 3, nw: [110, 19, 1, 1, 3.5, 1.2, 0, 2.3] },
  bratwurst:        { n: "Bratwurst", cat: "fleisch", u: "Stk", p: 4, pl: "4er-Pack", pr: 2.99, sh: 2, fz: true, nw: [280, 14, 0.5, 0.5, 25, 9, 0, 1.7], g: 100 },

  // ---------- Tiefkühl ----------
  tk_erbsen:        { n: "Erbsen (TK)", cat: "tk", u: "g", p: 450, pl: "Beutel 450 g", pr: 0.99, sh: 120, tk: true, nw: [81, 5.4, 14.5, 5.7, 0.4, 0.1, 5.1, 0] },
  tk_spinat:        { n: "Blattspinat (TK)", cat: "tk", u: "g", p: 450, pl: "Packung 450 g", pr: 1.19, sh: 120, tk: true, nw: [23, 2.9, 3.6, 0.4, 0.4, 0.1, 2.2, 0.2] },
  tk_beeren:        { n: "Beerenmischung (TK)", cat: "tk", u: "g", p: 500, pl: "Beutel 500 g", pr: 2.49, sh: 120, tk: true, nw: [45, 1, 8.5, 6, 0.4, 0, 5, 0] },

  // ---------- Nudeln, Reis & Co. ----------
  spaghetti:        { n: "Spaghetti", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 0.89, sh: 365, nw: [355, 12.5, 71, 3.5, 1.5, 0.3, 3, 0] },
  penne:            { n: "Penne / kurze Nudeln", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 0.89, sh: 365, nw: [355, 12.5, 71, 3.5, 1.5, 0.3, 3, 0] },
  lasagneplatten:   { n: "Lasagneplatten", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 1.29, sh: 365, nw: [355, 12.5, 71, 3.5, 1.5, 0.3, 3, 0] },
  mienudeln:        { n: "Mie-Nudeln", cat: "trocken", u: "g", p: 250, pl: "Packung 250 g", pr: 1.19, sh: 365, nw: [370, 12, 72, 2.5, 2.5, 0.5, 3, 0.3] },
  reis:             { n: "Reis (Basmati/Langkorn)", cat: "trocken", u: "g", p: 1000, pl: "Packung 1 kg", pr: 1.89, sh: 365, nw: [350, 7.5, 78, 0.2, 0.6, 0.2, 1.3, 0] },
  risottoreis:      { n: "Risottoreis", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 1.49, sh: 365, nw: [350, 7, 78, 0.3, 0.6, 0.2, 1, 0] },
  couscous:         { n: "Couscous", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 1.29, sh: 365, nw: [355, 12, 72, 1, 1.5, 0.3, 4, 0] },
  rote_linsen:      { n: "Rote Linsen", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 1.49, sh: 365, nw: [340, 25, 50, 2, 1.5, 0.2, 11, 0] },
  haferflocken:     { n: "Haferflocken", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 0.69, sh: 180, nw: [372, 13.5, 58.7, 0.7, 7, 1.3, 10, 0] },
  muesli:           { n: "Müsli", cat: "trocken", u: "g", p: 750, pl: "Packung 750 g", pr: 1.99, sh: 90, nw: [370, 9, 63, 15, 7, 1.5, 8, 0.1] },
  erdnussbutter:    { n: "Erdnussbutter", cat: "trocken", u: "g", p: 350, pl: "Glas 350 g", pr: 1.99, sh: 90, nw: [600, 25, 15, 6, 50, 9, 6, 0.8] },

  // ---------- Konserven & Saucen ----------
  gehackte_tomaten: { n: "Gehackte Tomaten", cat: "konserven", u: "g", p: 400, pl: "Dose 400 g", pr: 0.65, sh: 3, fz: true, nw: [22, 1.2, 3.5, 3.2, 0.2, 0, 1, 0.1] },
  passierte_tomaten:{ n: "Passierte Tomaten", cat: "konserven", u: "g", p: 500, pl: "Packung 500 g", pr: 0.69, sh: 3, fz: true },
  tomatenmark:      { n: "Tomatenmark", cat: "konserven", u: "g", p: 200, pl: "Tube 200 g", pr: 0.99, sh: 60, nw: [85, 4.5, 14, 12, 0.4, 0.1, 4, 0.2] },
  kidneybohnen:     { n: "Kidneybohnen", cat: "konserven", u: "g", p: 250, pl: "Dose (250 g abgetropft)", pr: 0.69, sh: 3, fz: true, nw: [115, 8, 15, 1, 0.6, 0.1, 7, 0.6] },
  kichererbsen:     { n: "Kichererbsen", cat: "konserven", u: "g", p: 240, pl: "Dose (240 g abgetropft)", pr: 0.79, sh: 3, fz: true, nw: [125, 7, 17, 0.5, 2.5, 0.3, 6, 0.6] },
  mais:             { n: "Mais", cat: "konserven", u: "g", p: 285, pl: "Dose (285 g abgetropft)", pr: 0.79, sh: 3, fz: true, nw: [85, 2.8, 15, 5, 1.2, 0.2, 2.5, 0.5] },
  kokosmilch:       { n: "Kokosmilch", cat: "konserven", u: "ml", p: 400, pl: "Dose 400 ml", pr: 1.29, sh: 3, fz: true, nw: [180, 1.8, 3, 2, 18, 16, 0, 0.05] },
  currypaste:       { n: "Rote Currypaste", cat: "konserven", u: "g", p: 110, pl: "Glas 110 g", pr: 1.99, sh: 30, nw: [110, 2, 11, 6, 6, 1, 4, 8] },
  pesto:            { n: "Pesto Genovese", cat: "konserven", u: "g", p: 190, pl: "Glas 190 g", pr: 1.49, sh: 7, fz: true, nw: [480, 5, 6, 3, 48, 7, 2.5, 2.3] },
  sojasauce:        { n: "Sojasauce", cat: "konserven", u: "ml", p: 250, pl: "Flasche 250 ml", pr: 1.29, sh: 365, nw: [55, 8, 5, 1, 0, 0, 0, 16] },

  // ---------- Basis-Vorrat (standardmäßig vorhanden) ----------
  oel:              { n: "Öl", cat: "vorrat", u: "EL", p: 60, pl: "Flasche", pr: 2.49, sh: 365, vorrat: true, nw: [884, 0, 0, 0, 100, 12, 0, 0], g: 10 },
  salz:             { n: "Salz", cat: "vorrat", u: "Prise", p: 500, pl: "Packung", pr: 0.39, sh: 999, vorrat: true, nw: [0, 0, 0, 0, 0, 0, 0, 100], g: 0.4 },
  pfeffer:          { n: "Pfeffer", cat: "vorrat", u: "Prise", p: 200, pl: "Streuer", pr: 1.29, sh: 999, vorrat: true, nw: [250, 10, 64, 0.6, 3, 1, 25, 0], g: 0.1 },
  mehl:             { n: "Mehl", cat: "vorrat", u: "g", p: 1000, pl: "1 kg", pr: 0.69, sh: 365, vorrat: true, nw: [340, 10, 71, 0.5, 1, 0.2, 4, 0] },
  zucker:           { n: "Zucker", cat: "vorrat", u: "g", p: 1000, pl: "1 kg", pr: 0.99, sh: 999, vorrat: true, nw: [400, 0, 100, 100, 0, 0, 0, 0] },
  bruehe:           { n: "Gemüsebrühe (Pulver)", cat: "vorrat", u: "TL", p: 50, pl: "Glas", pr: 1.49, sh: 365, vorrat: true, nw: [230, 8, 25, 10, 10, 4, 1, 55], g: 5 },
  paprikapulver:    { n: "Paprikapulver", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.89, sh: 365, vorrat: true, nw: [290, 14, 54, 10, 13, 2, 35, 0.1], g: 2.5 },
  currypulver:      { n: "Currypulver", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.89, sh: 365, vorrat: true, nw: [325, 13, 56, 3, 14, 2, 33, 0.1], g: 2.5 },
  kreuzkuemmel:     { n: "Kreuzkümmel", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.99, sh: 365, vorrat: true, nw: [375, 18, 44, 2, 22, 1.5, 10, 0.4], g: 2.5 },
  oregano:          { n: "Oregano", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.89, sh: 365, vorrat: true, nw: [265, 9, 69, 4, 4, 1.5, 43, 0], g: 1 },
  chiliflocken:     { n: "Chiliflocken", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.99, sh: 365, vorrat: true, nw: [280, 12, 50, 10, 14, 2.5, 27, 0.1], g: 1 },
  senf:             { n: "Senf", cat: "vorrat", u: "TL", p: 40, pl: "Tube", pr: 0.79, sh: 180, vorrat: true, nw: [90, 6, 5, 3, 5, 0.3, 3, 3.5], g: 5 },
  honig:            { n: "Honig", cat: "vorrat", u: "TL", p: 50, pl: "Glas", pr: 2.49, sh: 999, vorrat: true, nw: [304, 0.3, 82, 82, 0, 0, 0, 0], g: 7 },
  essig:            { n: "Essig", cat: "vorrat", u: "EL", p: 50, pl: "Flasche", pr: 0.69, sh: 999, vorrat: true, nw: [18, 0, 0.6, 0.6, 0, 0, 0, 0], g: 15 },
};
