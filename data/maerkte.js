// Supermärkte in 51688 Wipperfürth und grobe Preisfaktoren gegenüber dem Discounter-Richtpreis.
// Eigenmarken (ja!, Gut & Günstig) liegen bei Rewe/Edeka meist auf Discounter-Niveau,
// bei Fleisch und frischem Obst/Gemüse sind Vollsortimenter im Schnitt etwas teurer.
// Die Faktoren sind Schätzungen – entscheidend für die Empfehlung sind oft die Wochenangebote.

window.MAERKTE = [
  { id: "aldi",  n: "Aldi Süd", farbe: "#00b4dc", f: { standard: 1.00 } },
  { id: "lidl",  n: "Lidl",     farbe: "#0050aa", f: { standard: 1.00 } },
  { id: "penny", n: "Penny",    farbe: "#cd1414", f: { standard: 1.01 } },
  { id: "rewe",  n: "Rewe",     farbe: "#cc071e", f: { standard: 1.05, fleisch: 1.15, gemuese: 1.12, kuehl: 1.06 } },
  { id: "edeka", n: "Edeka",    farbe: "#1a3d8f", f: { standard: 1.07, fleisch: 1.18, gemuese: 1.12, kuehl: 1.08 } },
];
