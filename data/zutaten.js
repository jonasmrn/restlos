// Zutaten-Stammdaten
// n  = Name, cat = Abteilung, u = Einheit, p = Packungsgröße (in u), pl = Packungs-Beschreibung
// pr = Richtpreis pro Packung beim Discounter in € (geschätzt, Stand Herbst 2026)
// sh = Haltbarkeit nach dem Öffnen in Tagen, fz = einfrierbar, vorrat = Basis-Vorrat (kommt nicht auf die Liste)

window.KATEGORIEN = [
  { id: "gemuese", name: "Obst & Gemüse", icon: "🥕" },
  { id: "brot", name: "Brot & Backwaren", icon: "🍞" },
  { id: "kuehl", name: "Kühlregal", icon: "🧀" },
  { id: "fleisch", name: "Fleisch & Wurst", icon: "🥩" },
  { id: "tk", name: "Tiefkühl", icon: "🧊" },
  { id: "trocken", name: "Nudeln, Reis & Co.", icon: "🍝" },
  { id: "konserven", name: "Konserven & Saucen", icon: "🥫" },
  { id: "vorrat", name: "Gewürze & Basics", icon: "🧂" },
];

window.ZUTATEN = {
  // ---------- Obst & Gemüse ----------
  zwiebel:          { n: "Zwiebeln", cat: "gemuese", u: "Stk", p: 8, pl: "Netz 1 kg (ca. 8 Stk)", pr: 1.29, sh: 30 },
  knoblauch:        { n: "Knoblauch", cat: "gemuese", u: "Zehe", p: 10, pl: "1 Knolle (ca. 10 Zehen)", pr: 0.59, sh: 30 },
  karotte:          { n: "Karotten", cat: "gemuese", u: "Stk", p: 10, pl: "Beutel 1 kg (ca. 10 Stk)", pr: 0.99, sh: 14 },
  paprika:          { n: "Paprika", cat: "gemuese", u: "Stk", p: 3, pl: "3er-Pack", pr: 1.99, sh: 7 },
  tomate:           { n: "Tomaten", cat: "gemuese", u: "Stk", p: 6, pl: "Schale 500 g (ca. 6 Stk)", pr: 1.69, sh: 6 },
  kirschtomaten:    { n: "Kirschtomaten", cat: "gemuese", u: "g", p: 250, pl: "Schale 250 g", pr: 1.19, sh: 5 },
  gurke:            { n: "Salatgurke", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.69, sh: 5 },
  zucchini:         { n: "Zucchini", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk (ca. 250 g)", pr: 0.79, sh: 6 },
  aubergine:        { n: "Aubergine", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.99, sh: 6 },
  brokkoli:         { n: "Brokkoli", cat: "gemuese", u: "Stk", p: 1, pl: "1 Kopf (ca. 500 g)", pr: 1.49, sh: 4 },
  champignons:      { n: "Champignons", cat: "gemuese", u: "g", p: 250, pl: "Schale 250 g", pr: 1.39, sh: 3 },
  spinat:           { n: "Babyspinat", cat: "gemuese", u: "g", p: 125, pl: "Beutel 125 g", pr: 1.29, sh: 2 },
  romanasalat:      { n: "Romanasalat-Herzen", cat: "gemuese", u: "Stk", p: 2, pl: "2er-Pack", pr: 1.29, sh: 5 },
  rucola:           { n: "Rucola", cat: "gemuese", u: "g", p: 125, pl: "Schale 125 g", pr: 1.19, sh: 2 },
  lauch:            { n: "Lauch", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stange", pr: 0.79, sh: 7 },
  fruehlingszwiebel:{ n: "Frühlingszwiebeln", cat: "gemuese", u: "Stange", p: 6, pl: "1 Bund (ca. 6 Stangen)", pr: 0.69, sh: 5 },
  kartoffeln:       { n: "Kartoffeln (festkochend)", cat: "gemuese", u: "g", p: 1500, pl: "Beutel 1,5 kg", pr: 1.99, sh: 21 },
  suesskartoffel:   { n: "Süßkartoffeln", cat: "gemuese", u: "g", p: 500, pl: "ca. 500 g", pr: 1.49, sh: 14 },
  ingwer:           { n: "Ingwer", cat: "gemuese", u: "g", p: 50, pl: "Stück ca. 50 g", pr: 0.39, sh: 21, fz: true },
  limette:          { n: "Limette", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.39, sh: 14 },
  zitrone:          { n: "Zitrone", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.45, sh: 14 },
  avocado:          { n: "Avocado", cat: "gemuese", u: "Stk", p: 1, pl: "1 Stk", pr: 0.99, sh: 2 },
  petersilie:       { n: "Petersilie", cat: "gemuese", u: "Bund", p: 1, pl: "1 Bund", pr: 0.79, sh: 5, fz: true },
  basilikum:        { n: "Basilikum", cat: "gemuese", u: "Topf", p: 1, pl: "1 Topf", pr: 1.69, sh: 10 },
  banane:           { n: "Bananen", cat: "gemuese", u: "Stk", p: 5, pl: "Bund ca. 1 kg (5 Stk)", pr: 1.29, sh: 5, fz: true },
  apfel:            { n: "Äpfel", cat: "gemuese", u: "Stk", p: 6, pl: "Beutel 1 kg (ca. 6 Stk)", pr: 1.99, sh: 21 },

  // ---------- Brot & Backwaren ----------
  toastbrot:        { n: "Toastbrot", cat: "brot", u: "g", p: 500, pl: "Packung 500 g", pr: 1.19, sh: 7, fz: true },
  vollkornbrot:     { n: "Vollkornbrot", cat: "brot", u: "g", p: 500, pl: "Packung 500 g", pr: 1.29, sh: 6, fz: true },
  broetchen:        { n: "Aufback-Brötchen", cat: "brot", u: "Stk", p: 6, pl: "6er-Pack", pr: 0.99, sh: 30, fz: true },
  baguette:         { n: "Aufback-Baguette", cat: "brot", u: "Stk", p: 2, pl: "2er-Pack", pr: 0.99, sh: 30, fz: true },
  burgerbroetchen:  { n: "Burger-Brötchen", cat: "brot", u: "Stk", p: 4, pl: "4er-Pack", pr: 1.29, sh: 5, fz: true },
  wraps:            { n: "Weizen-Tortillas (Wraps)", cat: "brot", u: "Stk", p: 6, pl: "6er-Pack", pr: 1.39, sh: 7, fz: true },

  // ---------- Kühlregal ----------
  milch:            { n: "Milch", cat: "kuehl", u: "ml", p: 1000, pl: "1 l", pr: 1.05, sh: 4 },
  sahne:            { n: "Schlagsahne", cat: "kuehl", u: "ml", p: 200, pl: "Becher 200 ml", pr: 0.99, sh: 3, fz: true },
  schmand:          { n: "Schmand", cat: "kuehl", u: "g", p: 200, pl: "Becher 200 g", pr: 0.79, sh: 4 },
  frischkaese:      { n: "Frischkäse", cat: "kuehl", u: "g", p: 200, pl: "Packung 200 g", pr: 1.09, sh: 5 },
  feta:             { n: "Feta / Hirtenkäse", cat: "kuehl", u: "g", p: 200, pl: "Packung 200 g", pr: 1.49, sh: 4 },
  mozzarella:       { n: "Mozzarella", cat: "kuehl", u: "g", p: 125, pl: "Kugel 125 g", pr: 0.79, sh: 2 },
  gouda:            { n: "Gouda gerieben", cat: "kuehl", u: "g", p: 200, pl: "Beutel 200 g", pr: 1.99, sh: 7, fz: true },
  parmesan:         { n: "Hartkäse (Parmesan/Grana)", cat: "kuehl", u: "g", p: 100, pl: "Stück 100 g", pr: 1.79, sh: 21 },
  halloumi:         { n: "Halloumi", cat: "kuehl", u: "g", p: 225, pl: "Packung 225 g", pr: 2.29, sh: 5 },
  butter:           { n: "Butter", cat: "kuehl", u: "g", p: 250, pl: "250 g", pr: 2.19, sh: 30, fz: true },
  eier:             { n: "Eier", cat: "kuehl", u: "Stk", p: 6, pl: "6er-Pack", pr: 1.79, sh: 21 },
  joghurt:          { n: "Naturjoghurt", cat: "kuehl", u: "g", p: 500, pl: "Becher 500 g", pr: 0.89, sh: 5 },
  quark:            { n: "Magerquark", cat: "kuehl", u: "g", p: 500, pl: "Becher 500 g", pr: 1.29, sh: 5 },
  gnocchi:          { n: "Gnocchi", cat: "kuehl", u: "g", p: 500, pl: "Packung 500 g", pr: 1.29, sh: 3 },
  flammkuchenteig:  { n: "Flammkuchenteig", cat: "kuehl", u: "Stk", p: 1, pl: "1 Rolle", pr: 1.29, sh: 1 },
  tofu:             { n: "Tofu natur", cat: "kuehl", u: "g", p: 200, pl: "Packung 200 g", pr: 1.49, sh: 3 },

  // ---------- Fleisch & Wurst ----------
  hack:             { n: "Hackfleisch gemischt", cat: "fleisch", u: "g", p: 500, pl: "Packung 500 g", pr: 4.29, sh: 1, fz: true },
  rinderhack:       { n: "Rinderhackfleisch", cat: "fleisch", u: "g", p: 500, pl: "Packung 500 g", pr: 5.49, sh: 1, fz: true },
  haehnchen:        { n: "Hähnchenbrustfilet", cat: "fleisch", u: "g", p: 400, pl: "Packung 400 g", pr: 4.99, sh: 1, fz: true },
  schwein:          { n: "Schweine-Geschnetzeltes", cat: "fleisch", u: "g", p: 500, pl: "Packung 500 g", pr: 4.49, sh: 1, fz: true },
  gulasch:          { n: "Rindergulasch", cat: "fleisch", u: "g", p: 500, pl: "Packung 500 g", pr: 7.49, sh: 1, fz: true },
  speck:            { n: "Speckwürfel", cat: "fleisch", u: "g", p: 200, pl: "2 × 100 g", pr: 1.79, sh: 5, fz: true },
  kochschinken:     { n: "Kochschinken", cat: "fleisch", u: "g", p: 200, pl: "Packung 200 g", pr: 1.89, sh: 3 },
  bratwurst:        { n: "Bratwurst", cat: "fleisch", u: "Stk", p: 4, pl: "4er-Pack", pr: 2.99, sh: 2, fz: true },

  // ---------- Tiefkühl ----------
  tk_erbsen:        { n: "Erbsen (TK)", cat: "tk", u: "g", p: 450, pl: "Beutel 450 g", pr: 0.99, sh: 120, tk: true },
  tk_spinat:        { n: "Blattspinat (TK)", cat: "tk", u: "g", p: 450, pl: "Packung 450 g", pr: 1.19, sh: 120, tk: true },
  tk_beeren:        { n: "Beerenmischung (TK)", cat: "tk", u: "g", p: 500, pl: "Beutel 500 g", pr: 2.49, sh: 120, tk: true },

  // ---------- Nudeln, Reis & Co. ----------
  spaghetti:        { n: "Spaghetti", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 0.89, sh: 365 },
  penne:            { n: "Penne / kurze Nudeln", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 0.89, sh: 365 },
  lasagneplatten:   { n: "Lasagneplatten", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 1.29, sh: 365 },
  mienudeln:        { n: "Mie-Nudeln", cat: "trocken", u: "g", p: 250, pl: "Packung 250 g", pr: 1.19, sh: 365 },
  reis:             { n: "Reis (Basmati/Langkorn)", cat: "trocken", u: "g", p: 1000, pl: "Packung 1 kg", pr: 1.89, sh: 365 },
  risottoreis:      { n: "Risottoreis", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 1.49, sh: 365 },
  couscous:         { n: "Couscous", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 1.29, sh: 365 },
  rote_linsen:      { n: "Rote Linsen", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 1.49, sh: 365 },
  haferflocken:     { n: "Haferflocken", cat: "trocken", u: "g", p: 500, pl: "Packung 500 g", pr: 0.69, sh: 180 },
  muesli:           { n: "Müsli", cat: "trocken", u: "g", p: 750, pl: "Packung 750 g", pr: 1.99, sh: 90 },
  erdnussbutter:    { n: "Erdnussbutter", cat: "trocken", u: "g", p: 350, pl: "Glas 350 g", pr: 1.99, sh: 90 },

  // ---------- Konserven & Saucen ----------
  gehackte_tomaten: { n: "Gehackte Tomaten", cat: "konserven", u: "g", p: 400, pl: "Dose 400 g", pr: 0.65, sh: 3, fz: true },
  passierte_tomaten:{ n: "Passierte Tomaten", cat: "konserven", u: "g", p: 500, pl: "Packung 500 g", pr: 0.69, sh: 3, fz: true },
  tomatenmark:      { n: "Tomatenmark", cat: "konserven", u: "g", p: 200, pl: "Tube 200 g", pr: 0.99, sh: 60 },
  kidneybohnen:     { n: "Kidneybohnen", cat: "konserven", u: "g", p: 250, pl: "Dose (250 g abgetropft)", pr: 0.69, sh: 3, fz: true },
  kichererbsen:     { n: "Kichererbsen", cat: "konserven", u: "g", p: 240, pl: "Dose (240 g abgetropft)", pr: 0.79, sh: 3, fz: true },
  mais:             { n: "Mais", cat: "konserven", u: "g", p: 285, pl: "Dose (285 g abgetropft)", pr: 0.79, sh: 3, fz: true },
  kokosmilch:       { n: "Kokosmilch", cat: "konserven", u: "ml", p: 400, pl: "Dose 400 ml", pr: 1.29, sh: 3, fz: true },
  currypaste:       { n: "Rote Currypaste", cat: "konserven", u: "g", p: 110, pl: "Glas 110 g", pr: 1.99, sh: 30 },
  pesto:            { n: "Pesto Genovese", cat: "konserven", u: "g", p: 190, pl: "Glas 190 g", pr: 1.49, sh: 7, fz: true },
  sojasauce:        { n: "Sojasauce", cat: "konserven", u: "ml", p: 250, pl: "Flasche 250 ml", pr: 1.29, sh: 365 },

  // ---------- Basis-Vorrat (standardmäßig vorhanden) ----------
  oel:              { n: "Öl", cat: "vorrat", u: "EL", p: 60, pl: "Flasche", pr: 2.49, sh: 365, vorrat: true },
  salz:             { n: "Salz", cat: "vorrat", u: "Prise", p: 500, pl: "Packung", pr: 0.39, sh: 999, vorrat: true },
  pfeffer:          { n: "Pfeffer", cat: "vorrat", u: "Prise", p: 200, pl: "Streuer", pr: 1.29, sh: 999, vorrat: true },
  mehl:             { n: "Mehl", cat: "vorrat", u: "g", p: 1000, pl: "1 kg", pr: 0.69, sh: 365, vorrat: true },
  zucker:           { n: "Zucker", cat: "vorrat", u: "g", p: 1000, pl: "1 kg", pr: 0.99, sh: 999, vorrat: true },
  bruehe:           { n: "Gemüsebrühe (Pulver)", cat: "vorrat", u: "TL", p: 50, pl: "Glas", pr: 1.49, sh: 365, vorrat: true },
  paprikapulver:    { n: "Paprikapulver", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.89, sh: 365, vorrat: true },
  currypulver:      { n: "Currypulver", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.89, sh: 365, vorrat: true },
  kreuzkuemmel:     { n: "Kreuzkümmel", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.99, sh: 365, vorrat: true },
  oregano:          { n: "Oregano", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.89, sh: 365, vorrat: true },
  chiliflocken:     { n: "Chiliflocken", cat: "vorrat", u: "TL", p: 30, pl: "Streuer", pr: 0.99, sh: 365, vorrat: true },
  senf:             { n: "Senf", cat: "vorrat", u: "TL", p: 40, pl: "Tube", pr: 0.79, sh: 180, vorrat: true },
  honig:            { n: "Honig", cat: "vorrat", u: "TL", p: 50, pl: "Glas", pr: 2.49, sh: 999, vorrat: true },
  essig:            { n: "Essig", cat: "vorrat", u: "EL", p: 50, pl: "Flasche", pr: 0.69, sh: 999, vorrat: true },
};
