// Rezeptsammlung – eigene Formulierungen, angelehnt an klassische Gerichte.
// m  = passende Mahlzeiten (fruehstueck, mittag, abend), s = Grundportionen
// t  = Zeit in Minuten, z = Zutaten [id, Menge, "opt" = weglassbar]
// geraet = "ofen" | "airfryer" (optional), fz = Gericht lässt sich portionsweise einfrieren
// aufw: false = schmeckt nur frisch, eignet sich nicht als Rest für den nächsten Tag

window.REZEPTE = [
  // =================== HACKFLEISCH ===================
  {
    id: "bolognese", n: "Spaghetti Bolognese", e: "🍝", m: ["mittag", "abend"], s: 2, t: 45, fz: true,
    tags: ["italienisch", "pasta", "klassiker", "fleisch"],
    z: [["hack", 250], ["zwiebel", 1], ["karotte", 1], ["knoblauch", 2], ["gehackte_tomaten", 400], ["tomatenmark", 20], ["spaghetti", 200], ["parmesan", 30, "opt"], ["oregano", 1], ["oel", 1], ["salz", 2], ["pfeffer", 2]],
    st: [
      "Zwiebel, Karotte und Knoblauch sehr fein würfeln.",
      "Hack in Öl krümelig und kräftig anbraten, dann das Gemüse 3 Min. mitbraten.",
      "Tomatenmark kurz anrösten, gehackte Tomaten und einen Schuss Wasser dazu, mit Oregano, Salz und Pfeffer würzen.",
      "Mindestens 20 Min. leise köcheln lassen – je länger, desto besser.",
      "Spaghetti bissfest kochen und mit der Sauce und geriebenem Parmesan servieren.",
    ],
  },
  {
    id: "chili", n: "Chili con Carne", e: "🌶️", m: ["mittag", "abend"], s: 2, t: 40, fz: true,
    tags: ["mexikanisch", "eintopf", "fleisch", "scharf"],
    z: [["hack", 250], ["zwiebel", 1], ["paprika", 1], ["knoblauch", 2], ["kidneybohnen", 125], ["mais", 140], ["gehackte_tomaten", 400], ["tomatenmark", 20], ["reis", 150], ["schmand", 60, "opt"], ["kreuzkuemmel", 1], ["paprikapulver", 1], ["chiliflocken", 0.5], ["oel", 1], ["salz", 2]],
    st: [
      "Reis nach Packungsanweisung kochen.",
      "Zwiebel, Knoblauch und Paprika würfeln. Hack in Öl kräftig anbraten.",
      "Gemüse dazu, mit Kreuzkümmel, Paprikapulver und Chili würzen, Tomatenmark kurz mitrösten.",
      "Tomaten, abgetropfte Bohnen und Mais zugeben, 20 Min. köcheln lassen.",
      "Mit Salz abschmecken und mit Reis und einem Klecks Schmand servieren.",
    ],
    tipp: "Übrige Bohnen und Mais passen perfekt in Quesadillas oder eine Burrito-Bowl.",
  },
  {
    id: "gefuellte_paprika", n: "Gefüllte Paprika aus dem Ofen", e: "🫑", m: ["abend"], s: 2, t: 55, geraet: "ofen",
    tags: ["ofen", "fleisch", "klassiker"],
    z: [["hack", 250], ["paprika", 2], ["reis", 60], ["zwiebel", 1], ["knoblauch", 1], ["passierte_tomaten", 250], ["gouda", 50], ["paprikapulver", 1], ["salz", 2], ["pfeffer", 1]],
    st: [
      "Reis 10 Min. vorkochen. Ofen auf 200 °C vorheizen.",
      "Hack mit gewürfelter Zwiebel, Knoblauch, Reis, Paprikapulver, Salz und Pfeffer verkneten.",
      "Paprika halbieren, entkernen und mit der Masse füllen.",
      "Passierte Tomaten in eine Auflaufform geben, Paprika hineinsetzen, mit Käse bestreuen.",
      "Ca. 35 Min. backen, bis der Käse goldbraun ist.",
    ],
  },
  {
    id: "hack_burrito", n: "Hack-Burritos", e: "🌯", m: ["mittag", "abend"], s: 2, t: 25,
    tags: ["mexikanisch", "wraps", "fleisch", "schnell"],
    z: [["hack", 250], ["wraps", 4], ["kidneybohnen", 125], ["mais", 70], ["paprika", 1], ["zwiebel", 1], ["schmand", 100], ["gouda", 60], ["romanasalat", 0.5, "opt"], ["kreuzkuemmel", 1], ["paprikapulver", 1], ["oel", 1]],
    st: [
      "Zwiebel und Paprika würfeln, Hack in Öl anbraten, Gemüse dazugeben.",
      "Bohnen und Mais untermischen, mit Kreuzkümmel, Paprikapulver und Salz würzen.",
      "Wraps kurz in der trockenen Pfanne erwärmen.",
      "Mit Schmand bestreichen, Füllung, Käse und Salat darauf und fest einrollen.",
    ],
  },
  {
    id: "lasagne", n: "Lasagne", e: "🧀", m: ["mittag", "abend"], s: 2, t: 75, geraet: "ofen", fz: true,
    tags: ["italienisch", "ofen", "fleisch", "klassiker"],
    z: [["hack", 250], ["zwiebel", 1], ["karotte", 1], ["knoblauch", 1], ["passierte_tomaten", 500], ["tomatenmark", 20], ["lasagneplatten", 125], ["milch", 300], ["butter", 30], ["mehl", 30], ["gouda", 80], ["oregano", 1], ["salz", 2]],
    st: [
      "Bolognese-Sauce aus Hack, Zwiebel, Karotte, Knoblauch, Tomatenmark und passierten Tomaten 15 Min. köcheln.",
      "Für die Béchamel Butter schmelzen, Mehl einrühren, nach und nach Milch zugießen und aufkochen, salzen.",
      "In einer kleinen Form abwechselnd Sauce, Platten und Béchamel schichten, mit Béchamel und Käse abschließen.",
      "Bei 180 °C ca. 40 Min. backen. 5 Min. ruhen lassen.",
    ],
    tipp: "Eine Portion lässt sich hervorragend einfrieren.",
  },
  {
    id: "frikadellen", n: "Frikadellen mit Kartoffelpüree", e: "🥔", m: ["mittag", "abend"], s: 2, t: 40,
    tags: ["deutsch", "klassiker", "fleisch"],
    z: [["hack", 250], ["eier", 1], ["toastbrot", 40], ["zwiebel", 1], ["senf", 1], ["kartoffeln", 600], ["milch", 150], ["butter", 30], ["salz", 2], ["pfeffer", 1], ["oel", 2]],
    st: [
      "Kartoffeln schälen, würfeln und in Salzwasser 20 Min. weich kochen.",
      "Toast in Wasser einweichen und ausdrücken. Mit Hack, Ei, fein gewürfelter Zwiebel, Senf, Salz und Pfeffer verkneten.",
      "4 Frikadellen formen und in Öl von beiden Seiten je 5–6 Min. braten.",
      "Kartoffeln abgießen, mit warmer Milch und Butter zu Püree stampfen, salzen.",
    ],
  },
  {
    id: "cheeseburger_pasta", n: "Cheeseburger-Nudelpfanne", e: "🍔", m: ["mittag", "abend"], s: 2, t: 25,
    tags: ["pasta", "fleisch", "schnell", "one-pot"],
    z: [["hack", 250], ["penne", 200], ["zwiebel", 1], ["passierte_tomaten", 250], ["milch", 150], ["gouda", 80], ["senf", 1], ["paprikapulver", 1], ["salz", 2], ["oel", 1]],
    st: [
      "Hack mit gewürfelter Zwiebel in einem großen Topf anbraten, mit Paprikapulver würzen.",
      "Passierte Tomaten, Milch, 300 ml Wasser, Senf und die rohen Nudeln dazugeben.",
      "Zugedeckt ca. 12 Min. köcheln, gelegentlich umrühren, bis die Nudeln gar sind.",
      "Käse unterrühren, schmelzen lassen und abschmecken.",
    ],
  },
  {
    id: "burger", n: "Burger mit Süßkartoffel-Pommes", e: "🍔", m: ["abend"], aufw: false, s: 2, t: 35, geraet: "airfryer",
    tags: ["amerikanisch", "fleisch", "airfryer"],
    z: [["rinderhack", 250], ["burgerbroetchen", 2], ["tomate", 1], ["romanasalat", 0.5], ["zwiebel", 0.5], ["gouda", 40], ["suesskartoffel", 400], ["oel", 2], ["salz", 2], ["pfeffer", 1]],
    st: [
      "Süßkartoffeln in Stifte schneiden, mit Öl und Salz mischen und im Airfryer bei 200 °C ca. 18 Min. garen (zwischendurch schütteln).",
      "Rinderhack nur mit Salz und Pfeffer würzen, zu 2 flachen Patties formen.",
      "Patties in heißer Pfanne je 3–4 Min. braten, zum Schluss Käse darauf schmelzen.",
      "Brötchen anrösten und mit Salat, Tomate, Zwiebelringen und Patty belegen.",
    ],
  },
  {
    id: "rinderhack_bowl", n: "Koreanische Rinderhack-Bowl", e: "🍚", m: ["mittag", "abend"], s: 2, t: 25,
    tags: ["asiatisch", "fleisch", "schnell", "neu"],
    z: [["rinderhack", 250], ["reis", 150], ["knoblauch", 2], ["ingwer", 10], ["sojasauce", 40], ["honig", 2], ["fruehlingszwiebel", 2], ["gurke", 0.5], ["karotte", 1], ["chiliflocken", 0.5], ["oel", 1]],
    st: [
      "Reis kochen. Gurke in Scheiben, Karotte in feine Streifen schneiden.",
      "Rinderhack krümelig anbraten, Knoblauch und Ingwer fein gerieben dazu.",
      "Mit Sojasauce, Honig und Chili ablöschen und 2 Min. einkochen.",
      "Reis mit Hack, Gemüse und Frühlingszwiebelringen in Schalen anrichten.",
    ],
  },

  // =================== HÄHNCHEN ===================
  {
    id: "haehnchen_curry", n: "Rotes Hähnchen-Curry", e: "🍛", m: ["mittag", "abend"], s: 2, t: 30, fz: true,
    tags: ["asiatisch", "curry", "gefluegel"],
    z: [["haehnchen", 200], ["kokosmilch", 400], ["currypaste", 30], ["paprika", 1], ["zucchini", 1, "opt"], ["fruehlingszwiebel", 2], ["ingwer", 10], ["reis", 150], ["limette", 1, "opt"], ["sojasauce", 15], ["oel", 1]],
    st: [
      "Reis kochen. Hähnchen in Streifen, Paprika und Zucchini in Stücke schneiden.",
      "Currypaste mit geriebenem Ingwer in Öl 1 Min. anrösten.",
      "Hähnchen kurz mitbraten, mit Kokosmilch ablöschen.",
      "Gemüse zugeben und 10 Min. köcheln. Mit Sojasauce und Limettensaft abschmecken.",
      "Mit Reis und Frühlingszwiebeln servieren.",
    ],
  },
  {
    id: "caesar_wrap", n: "Hähnchen-Caesar-Wraps", e: "🌯", m: ["mittag", "abend"], s: 2, t: 20,
    tags: ["wraps", "gefluegel", "schnell", "mitnehmen"],
    z: [["haehnchen", 200], ["wraps", 4], ["romanasalat", 1], ["kirschtomaten", 125], ["parmesan", 20], ["joghurt", 100], ["senf", 1], ["zitrone", 0.5], ["knoblauch", 1], ["oel", 1], ["salz", 1]],
    st: [
      "Hähnchen salzen, in Öl 5–6 Min. pro Seite braten, kurz ruhen lassen und in Streifen schneiden.",
      "Dressing aus Joghurt, Senf, Zitronensaft, geriebenem Knoblauch und etwas Parmesan rühren.",
      "Salat in Streifen schneiden, Tomaten halbieren.",
      "Wraps mit Dressing bestreichen, belegen, mit Parmesan bestreuen und einrollen.",
    ],
    tipp: "Ideal zum Mitnehmen – Dressing separat transportieren.",
  },
  {
    id: "haehnchen_reispfanne", n: "Asiatische Hähnchen-Gemüse-Pfanne", e: "🥢", m: ["mittag", "abend"], s: 2, t: 25,
    tags: ["asiatisch", "gefluegel", "schnell"],
    z: [["haehnchen", 200], ["reis", 150], ["paprika", 1], ["brokkoli", 0.5], ["fruehlingszwiebel", 3], ["sojasauce", 40], ["ingwer", 10], ["knoblauch", 2], ["honig", 1], ["oel", 1]],
    st: [
      "Reis kochen. Hähnchen in Würfel, Paprika in Streifen, Brokkoli in kleine Röschen schneiden.",
      "Hähnchen in einer heißen Pfanne scharf anbraten und herausnehmen.",
      "Gemüse mit Ingwer und Knoblauch 4–5 Min. pfannenrühren.",
      "Hähnchen zurück, mit Sojasauce und Honig glasieren, Frühlingszwiebeln darüber.",
    ],
  },
  {
    id: "ofen_haehnchen", n: "Ofen-Hähnchen mit Kartoffeln & Gemüse", e: "🍗", m: ["abend"], s: 2, t: 50, geraet: "ofen",
    tags: ["ofen", "gefluegel", "blech"],
    z: [["haehnchen", 200], ["kartoffeln", 500], ["zucchini", 1], ["paprika", 1], ["zwiebel", 1], ["feta", 100, "opt"], ["paprikapulver", 1], ["oregano", 1], ["oel", 3], ["salz", 2]],
    st: [
      "Ofen auf 200 °C vorheizen. Kartoffeln in Spalten schneiden, mit Öl, Salz und Paprikapulver aufs Blech, 15 Min. vorbacken.",
      "Zucchini, Paprika und Zwiebel grob schneiden, Hähnchen in große Stücke schneiden und würzen.",
      "Alles zu den Kartoffeln geben und weitere 20–25 Min. backen.",
      "Optional zerbröselten Feta in den letzten 5 Min. darübergeben.",
    ],
  },
  {
    id: "haehnchen_rahm_pasta", n: "Hähnchen-Rahm-Pasta mit Champignons", e: "🍝", m: ["mittag", "abend"], s: 2, t: 25,
    tags: ["pasta", "gefluegel", "cremig"],
    z: [["haehnchen", 200], ["penne", 200], ["sahne", 200], ["champignons", 250, "opt"], ["spinat", 60, "opt"], ["zwiebel", 1], ["knoblauch", 1], ["parmesan", 20, "opt"], ["bruehe", 1], ["oel", 1], ["salz", 1]],
    st: [
      "Nudeln kochen. Hähnchen in Streifen, Champignons in Scheiben, Zwiebel in Würfel schneiden.",
      "Hähnchen anbraten und herausnehmen, dann Pilze und Zwiebel goldbraun braten.",
      "Mit Sahne und etwas Brühe ablöschen, 3 Min. einkochen, Spinat zusammenfallen lassen.",
      "Hähnchen und Nudeln unterheben, mit Parmesan servieren.",
    ],
    tipp: "Ohne Pilze? Einfach weglassen und dafür mehr Spinat oder Erbsen nehmen.",
  },
  {
    id: "satay", n: "Hähnchen-Satay mit Erdnusssauce", e: "🥜", m: ["mittag", "abend"], s: 2, t: 30,
    tags: ["asiatisch", "gefluegel", "neu"],
    z: [["haehnchen", 200], ["erdnussbutter", 60], ["kokosmilch", 200], ["sojasauce", 30], ["limette", 1], ["reis", 150], ["gurke", 1], ["currypulver", 1], ["honig", 1], ["chiliflocken", 0.5], ["oel", 1]],
    st: [
      "Reis kochen. Hähnchen in Streifen schneiden und mit Currypulver, 1 EL Sojasauce und Öl marinieren.",
      "Für die Sauce Erdnussbutter, Kokosmilch, restliche Sojasauce, Honig, Chili und Limettensaft unter Rühren erhitzen.",
      "Hähnchen in einer heißen Pfanne (oder Airfryer, 12 Min. bei 200 °C) garen.",
      "Mit Reis, Gurkenscheiben und viel Sauce servieren.",
    ],
  },
  {
    id: "burrito_bowl", n: "Chicken-Burrito-Bowl", e: "🥑", m: ["mittag", "abend"], s: 2, t: 25,
    tags: ["mexikanisch", "gefluegel", "bowl", "mitnehmen"],
    z: [["haehnchen", 200], ["reis", 150], ["kidneybohnen", 125], ["mais", 140], ["avocado", 1], ["kirschtomaten", 125], ["limette", 1], ["schmand", 80], ["kreuzkuemmel", 1], ["paprikapulver", 1], ["oel", 1], ["salz", 1]],
    st: [
      "Reis kochen und mit etwas Limettensaft und Salz würzen.",
      "Hähnchen mit Kreuzkümmel, Paprika und Salz würzen, braten und in Streifen schneiden.",
      "Bohnen und Mais kurz in der Pfanne erwärmen, Avocado und Tomaten schneiden.",
      "Alles in Schalen anrichten, mit Schmand und Limette servieren.",
    ],
  },
  {
    id: "haehnchen_pesto", n: "Pesto-Hähnchen mit Ofentomaten & Gnocchi", e: "🌿", m: ["abend"], s: 2, t: 30, geraet: "ofen",
    tags: ["italienisch", "gefluegel", "ofen", "blech"],
    z: [["haehnchen", 200], ["gnocchi", 500], ["kirschtomaten", 250], ["pesto", 80], ["mozzarella", 125, "opt"], ["oel", 2], ["salz", 1]],
    st: [
      "Ofen auf 220 °C vorheizen.",
      "Gnocchi, Tomaten und Hähnchenwürfel mit Öl und der Hälfte des Pestos auf einem Blech mischen.",
      "20 Min. backen, dann Mozzarella zerzupft darauf verteilen und 5 Min. weiterbacken.",
      "Mit restlichem Pesto beträufeln.",
    ],
  },

  // =================== SCHWEIN / RIND / WURST ===================
  {
    id: "gyros", n: "Gyros-Pfanne mit Tzatziki & Reis", e: "🇬🇷", m: ["mittag", "abend"], s: 2, t: 30,
    tags: ["griechisch", "fleisch"],
    z: [["schwein", 250], ["zwiebel", 1], ["joghurt", 200], ["gurke", 0.5], ["knoblauch", 2], ["reis", 150], ["paprikapulver", 1], ["oregano", 1], ["kreuzkuemmel", 0.5], ["oel", 2], ["salz", 2]],
    st: [
      "Fleisch mit Öl, Paprika, Oregano, Kreuzkümmel, Salz und 1 Knoblauchzehe 15 Min. marinieren. Reis kochen.",
      "Gurke reiben, gut ausdrücken, mit Joghurt, 1 Knoblauchzehe und Salz zu Tzatziki verrühren.",
      "Fleisch mit Zwiebelstreifen in einer sehr heißen Pfanne knusprig braten.",
      "Mit Reis und Tzatziki servieren.",
    ],
  },
  {
    id: "geschnetzeltes", n: "Rahmgeschnetzeltes mit Bandnudeln", e: "🍲", m: ["abend"], s: 2, t: 30,
    tags: ["deutsch", "fleisch", "cremig", "klassiker"],
    z: [["schwein", 250], ["champignons", 250, "opt"], ["zwiebel", 1], ["sahne", 200], ["penne", 200], ["petersilie", 0.5, "opt"], ["bruehe", 1], ["mehl", 10], ["senf", 1], ["oel", 1], ["salz", 1]],
    st: [
      "Nudeln kochen. Fleisch mit Mehl bestäuben und portionsweise scharf anbraten, herausnehmen.",
      "Zwiebel und Champignons im Bratfett anbraten.",
      "Mit Sahne und 100 ml Brühe ablöschen, Senf einrühren, 5 Min. einkochen.",
      "Fleisch zurückgeben, abschmecken, mit Petersilie und Nudeln servieren.",
    ],
  },
  {
    id: "schwein_suesssauer", n: "Schwein süß-sauer", e: "🍍", m: ["abend"], s: 2, t: 30,
    tags: ["asiatisch", "fleisch", "neu"],
    z: [["schwein", 250], ["paprika", 1], ["zwiebel", 1], ["karotte", 1], ["reis", 150], ["tomatenmark", 30], ["sojasauce", 30], ["essig", 2], ["zucker", 20], ["mehl", 15], ["oel", 2]],
    st: [
      "Reis kochen. Fleisch mit Mehl und etwas Sojasauce mischen.",
      "Fleisch in Öl knusprig braten, herausnehmen.",
      "Paprika, Zwiebel und Karotte in Stücken 4 Min. braten.",
      "Tomatenmark, Essig, Zucker, Sojasauce und 100 ml Wasser verrühren, dazugeben und eindicken lassen.",
      "Fleisch untermischen und mit Reis servieren.",
    ],
  },
  {
    id: "gulasch", n: "Rindergulasch mit Kartoffeln", e: "🥘", m: ["mittag", "abend"], s: 4, t: 120, fz: true,
    tags: ["deutsch", "fleisch", "schmoren", "vorkochen"],
    z: [["gulasch", 500], ["zwiebel", 3], ["paprika", 1], ["tomatenmark", 40], ["paprikapulver", 3], ["kartoffeln", 800], ["bruehe", 2], ["oel", 2], ["salz", 2], ["pfeffer", 1]],
    st: [
      "Fleisch portionsweise in Öl kräftig anbraten, herausnehmen.",
      "Viele Zwiebeln langsam goldbraun braten, Tomatenmark und Paprikapulver kurz mitrösten.",
      "Fleisch zurück, mit 500 ml Brühe aufgießen und zugedeckt 90 Min. schmoren.",
      "Paprikawürfel 15 Min. vor Schluss zugeben. Dazu Salzkartoffeln.",
    ],
    tipp: "Schmorgerichte lohnen sich in größerer Menge – Reste portionsweise einfrieren.",
  },
  {
    id: "carbonara", n: "Spaghetti Carbonara", e: "🥓", m: ["mittag", "abend"], aufw: false, s: 2, t: 20,
    tags: ["italienisch", "pasta", "schnell", "fleisch"],
    z: [["speck", 100], ["spaghetti", 200], ["eier", 2], ["parmesan", 40], ["pfeffer", 3], ["salz", 1]],
    st: [
      "Spaghetti in Salzwasser kochen.",
      "Speck ohne Öl knusprig auslassen, Pfanne vom Herd nehmen.",
      "Eier mit geriebenem Parmesan und viel Pfeffer verquirlen.",
      "Nudeln mit etwas Kochwasser in die Speckpfanne geben, Eimischung schnell unterrühren – nicht mehr erhitzen, sonst stockt das Ei.",
    ],
  },
  {
    id: "flammkuchen", n: "Flammkuchen Elsässer Art", e: "🔥", m: ["abend"], aufw: false, s: 2, t: 25, geraet: "ofen",
    tags: ["ofen", "fleisch", "schnell"],
    z: [["flammkuchenteig", 1], ["schmand", 150], ["speck", 100], ["zwiebel", 1], ["fruehlingszwiebel", 2, "opt"], ["salz", 1], ["pfeffer", 1]],
    st: [
      "Ofen auf 230 °C vorheizen (Ober-/Unterhitze).",
      "Teig auf dem Blech ausrollen, mit gewürztem Schmand bestreichen.",
      "Zwiebel in hauchdünne Ringe schneiden, mit Speck darauf verteilen.",
      "10–12 Min. knusprig backen, mit Frühlingszwiebeln bestreuen.",
    ],
  },
  {
    id: "currywurst", n: "Currywurst mit Pommes", e: "🌭", m: ["mittag", "abend"], s: 2, t: 30, geraet: "airfryer",
    tags: ["deutsch", "fleisch", "airfryer"],
    z: [["bratwurst", 2], ["kartoffeln", 500], ["passierte_tomaten", 150], ["tomatenmark", 20], ["currypulver", 2], ["zucker", 10], ["essig", 1], ["zwiebel", 0.5], ["oel", 2], ["salz", 2]],
    st: [
      "Kartoffeln in Stifte schneiden, mit Öl und Salz mischen und im Airfryer 20–25 Min. bei 200 °C garen.",
      "Zwiebel fein würfeln und anschwitzen, Tomatenmark und Currypulver kurz anrösten.",
      "Passierte Tomaten, Zucker und Essig zugeben, 10 Min. einkochen.",
      "Bratwürste braten, in Scheiben schneiden und mit Sauce und Currypulver servieren.",
    ],
  },
  {
    id: "bratwurst_ofen", n: "Bratwurst mit Ofenkartoffeln & Zwiebeln", e: "🥔", m: ["abend"], s: 2, t: 45, geraet: "ofen",
    tags: ["deutsch", "fleisch", "ofen", "blech"],
    z: [["bratwurst", 2], ["kartoffeln", 500], ["zwiebel", 2], ["karotte", 2], ["senf", 2], ["paprikapulver", 1], ["oel", 2], ["salz", 2]],
    st: [
      "Ofen auf 200 °C vorheizen. Kartoffeln vierteln, Karotten und Zwiebeln grob schneiden.",
      "Alles mit Öl, Salz und Paprika auf dem Blech mischen, 20 Min. backen.",
      "Bratwürste dazulegen und weitere 20 Min. backen, einmal wenden.",
      "Mit Senf servieren.",
    ],
  },
  {
    id: "kartoffelsuppe", n: "Kartoffelsuppe mit Speck", e: "🥣", m: ["mittag", "abend"], s: 2, t: 35, fz: true,
    tags: ["deutsch", "suppe", "vorkochen"],
    z: [["kartoffeln", 500], ["karotte", 2], ["lauch", 1], ["zwiebel", 1], ["speck", 100, "opt"], ["sahne", 50, "opt"], ["bruehe", 2], ["petersilie", 0.5, "opt"], ["salz", 1], ["pfeffer", 1]],
    st: [
      "Speck knusprig auslassen und herausnehmen.",
      "Zwiebel, Lauch, Karotten und Kartoffeln würfeln und im Speckfett andünsten.",
      "Mit 800 ml Brühe aufgießen und 20 Min. köcheln.",
      "Etwa die Hälfte pürieren, Sahne einrühren, mit Speck und Petersilie servieren.",
    ],
  },
  {
    id: "schinken_toast", n: "Überbackene Schinken-Käse-Toasts", e: "🥪", m: ["mittag", "abend"], aufw: false, s: 2, t: 15, geraet: "airfryer",
    tags: ["schnell", "fleisch", "airfryer"],
    z: [["toastbrot", 140], ["kochschinken", 100], ["gouda", 60], ["tomate", 1], ["butter", 15], ["romanasalat", 0.5, "opt"]],
    st: [
      "Toasts dünn mit Butter bestreichen.",
      "Mit Schinken, Tomatenscheiben und Käse belegen.",
      "Im Airfryer bei 180 °C ca. 6 Min. (oder im Ofen bei 220 °C 8 Min.) überbacken.",
      "Mit etwas Salat servieren.",
    ],
  },
  {
    id: "brokkoli_auflauf", n: "Brokkoli-Schinken-Nudelauflauf", e: "🥦", m: ["mittag", "abend"], s: 2, t: 40, geraet: "ofen", fz: true,
    tags: ["ofen", "auflauf", "fleisch"],
    z: [["penne", 200], ["brokkoli", 1], ["kochschinken", 100], ["sahne", 200], ["eier", 1], ["gouda", 80], ["bruehe", 1], ["salz", 1], ["pfeffer", 1]],
    st: [
      "Ofen auf 200 °C vorheizen. Nudeln kochen, Brokkoli-Röschen die letzten 3 Min. mitgaren.",
      "Schinken würfeln. Sahne mit Ei, Brühpulver und Pfeffer verquirlen.",
      "Nudeln, Brokkoli und Schinken in eine Form geben, Sahne darübergießen, mit Käse bestreuen.",
      "20 Min. goldbraun backen.",
    ],
  },
  {
    id: "nudelsalat", n: "Nudelsalat (leicht)", e: "🥗", m: ["mittag"], s: 2, t: 20,
    tags: ["salat", "mitnehmen", "vorkochen"],
    z: [["penne", 150], ["kochschinken", 100], ["tk_erbsen", 100], ["paprika", 1], ["mais", 70], ["joghurt", 120], ["schmand", 60], ["senf", 1], ["essig", 1], ["salz", 1], ["pfeffer", 1]],
    st: [
      "Nudeln kochen, Erbsen die letzte Minute mitkochen, abgießen und kalt abschrecken.",
      "Schinken und Paprika würfeln.",
      "Joghurt, Schmand, Senf, Essig, Salz und Pfeffer verrühren.",
      "Alles mischen und mindestens 30 Min. durchziehen lassen.",
    ],
    tipp: "Hält sich 2 Tage im Kühlschrank – perfekt fürs Mittagessen.",
  },
  {
    id: "fried_rice", n: "Gebratener Reis mit Ei", e: "🍳", m: ["mittag", "abend"], s: 2, t: 20,
    tags: ["asiatisch", "resteverwertung", "schnell"],
    z: [["reis", 150], ["eier", 2], ["tk_erbsen", 100], ["karotte", 1], ["fruehlingszwiebel", 2], ["kochschinken", 60, "opt"], ["sojasauce", 30], ["knoblauch", 1], ["oel", 2]],
    st: [
      "Am besten Reis vom Vortag verwenden – sonst Reis kochen und gut auskühlen lassen.",
      "Karotte fein würfeln, mit Knoblauch und Erbsen in heißem Öl 3 Min. braten.",
      "Reis dazu und unter Rühren anrösten, dann an den Rand schieben und Eier in der Mitte stocken lassen.",
      "Alles vermengen, Schinken und Sojasauce dazu, mit Frühlingszwiebeln servieren.",
    ],
  },

  // =================== VEGETARISCH ===================
  {
    id: "feta_pasta", n: "Ofen-Feta-Pasta", e: "🍅", m: ["mittag", "abend"], s: 2, t: 35, geraet: "ofen",
    tags: ["italienisch", "pasta", "vegetarisch", "ofen"],
    z: [["feta", 200], ["kirschtomaten", 250], ["knoblauch", 2], ["penne", 200], ["spinat", 60, "opt"], ["basilikum", 0.5, "opt"], ["oel", 3], ["oregano", 1], ["chiliflocken", 0.5]],
    st: [
      "Ofen auf 200 °C vorheizen.",
      "Feta in die Mitte einer Form legen, Tomaten und Knoblauch drumherum, mit Öl, Oregano und Chili beträufeln.",
      "25 Min. backen. Währenddessen Nudeln kochen.",
      "Feta und Tomaten zerdrücken, Spinat und Nudeln unterrühren, mit Basilikum servieren.",
    ],
  },
  {
    id: "shakshuka", n: "Shakshuka", e: "🍳", m: ["fruehstueck", "mittag", "abend"], aufw: false, s: 2, t: 25,
    tags: ["orientalisch", "vegetarisch", "eier"],
    z: [["eier", 4], ["gehackte_tomaten", 400], ["paprika", 1], ["zwiebel", 1], ["knoblauch", 2], ["feta", 60, "opt"], ["baguette", 1], ["kreuzkuemmel", 1], ["paprikapulver", 1], ["oel", 1], ["salz", 1]],
    st: [
      "Zwiebel, Paprika und Knoblauch in Öl 5 Min. weich dünsten, Gewürze kurz mitrösten.",
      "Tomaten zugeben und 8 Min. einköcheln lassen, salzen.",
      "4 Mulden formen, Eier hineinschlagen, zugedeckt 6–8 Min. stocken lassen.",
      "Mit Feta bestreuen und mit aufgebackenem Baguette servieren.",
    ],
  },
  {
    id: "bauernsalat", n: "Griechischer Bauernsalat mit Brot", e: "🥗", m: ["mittag", "abend"], s: 2, t: 15,
    tags: ["griechisch", "salat", "vegetarisch", "schnell"],
    z: [["gurke", 1], ["tomate", 3], ["paprika", 1], ["zwiebel", 0.5], ["feta", 150], ["vollkornbrot", 150], ["oregano", 1], ["oel", 3], ["essig", 1], ["salz", 1]],
    st: [
      "Gurke, Tomaten und Paprika in mundgerechte Stücke schneiden, Zwiebel in Ringe.",
      "Mit Öl, Essig, Oregano und Salz anmachen.",
      "Feta grob darüberbröseln und mit Brot servieren.",
    ],
  },
  {
    id: "couscous_salat", n: "Couscous-Salat mit Kichererbsen", e: "🥙", m: ["mittag"], s: 2, t: 20,
    tags: ["orientalisch", "salat", "vegetarisch", "mitnehmen", "vorkochen"],
    z: [["couscous", 120], ["kichererbsen", 120], ["paprika", 1], ["gurke", 0.5], ["kirschtomaten", 125], ["feta", 100], ["zitrone", 1], ["petersilie", 0.5, "opt"], ["kreuzkuemmel", 0.5], ["oel", 3], ["salz", 1]],
    st: [
      "Couscous mit gleicher Menge kochendem Salzwasser übergießen, 5 Min. quellen lassen, auflockern.",
      "Gemüse würfeln, Kichererbsen abspülen.",
      "Dressing aus Zitronensaft, Öl, Kreuzkümmel und Salz anrühren.",
      "Alles mischen, Feta und Petersilie darüber.",
    ],
    tipp: "Hält 2–3 Tage im Kühlschrank.",
  },
  {
    id: "halloumi_bowl", n: "Halloumi-Couscous-Bowl", e: "🧀", m: ["mittag", "abend"], s: 2, t: 25, geraet: "airfryer",
    tags: ["orientalisch", "vegetarisch", "bowl", "airfryer", "neu"],
    z: [["halloumi", 225], ["couscous", 150], ["zucchini", 1], ["paprika", 1], ["joghurt", 120], ["zitrone", 0.5], ["knoblauch", 1], ["oel", 2], ["salz", 1]],
    st: [
      "Zucchini und Paprika würfeln, mit Öl und Salz im Airfryer bei 200 °C 12 Min. rösten.",
      "Couscous mit kochendem Salzwasser quellen lassen.",
      "Halloumi in Scheiben in der Pfanne von beiden Seiten goldbraun braten.",
      "Joghurt mit Zitrone und Knoblauch verrühren und alles in Schalen anrichten.",
    ],
  },
  {
    id: "ratatouille", n: "Ratatouille mit Baguette", e: "🍆", m: ["mittag", "abend"], s: 2, t: 45, fz: true,
    tags: ["französisch", "vegetarisch", "vegan", "vorkochen"],
    z: [["zucchini", 1], ["aubergine", 1], ["paprika", 1], ["zwiebel", 1], ["knoblauch", 2], ["gehackte_tomaten", 400], ["baguette", 1], ["oregano", 1], ["oel", 3], ["salz", 2]],
    st: [
      "Aubergine, Zucchini, Paprika und Zwiebel in Würfel schneiden.",
      "Aubergine in reichlich Öl anbraten, dann das übrige Gemüse und Knoblauch dazugeben.",
      "Tomaten und Kräuter zugeben, 25 Min. sanft schmoren lassen.",
      "Mit Salz abschmecken, dazu aufgebackenes Baguette.",
    ],
  },
  {
    id: "gnocchi_pfanne", n: "Gnocchi-Pfanne mit Spinat & Mozzarella", e: "🥟", m: ["mittag", "abend"], s: 2, t: 20,
    tags: ["italienisch", "vegetarisch", "schnell"],
    z: [["gnocchi", 500], ["kirschtomaten", 250], ["spinat", 125], ["mozzarella", 125], ["knoblauch", 2], ["oel", 2], ["salz", 1], ["pfeffer", 1]],
    st: [
      "Gnocchi direkt aus der Packung in Öl 6–8 Min. knusprig braten.",
      "Knoblauch und halbierte Tomaten zugeben, 3 Min. mitbraten.",
      "Spinat unterheben und zusammenfallen lassen.",
      "Mozzarella in Stücken darauf verteilen, Deckel drauf, kurz schmelzen lassen.",
    ],
  },
  {
    id: "rote_linsen_dal", n: "Rotes Linsen-Dal", e: "🍲", m: ["mittag", "abend"], s: 2, t: 30, fz: true,
    tags: ["indisch", "vegetarisch", "vegan", "curry", "vorkochen"],
    z: [["rote_linsen", 150], ["kokosmilch", 200], ["gehackte_tomaten", 200], ["zwiebel", 1], ["knoblauch", 2], ["ingwer", 10], ["spinat", 60, "opt"], ["reis", 120], ["currypulver", 2], ["kreuzkuemmel", 1], ["oel", 1], ["salz", 1]],
    st: [
      "Reis kochen. Zwiebel, Knoblauch und Ingwer fein hacken und in Öl andünsten.",
      "Gewürze 1 Min. mitrösten, Linsen, Tomaten, Kokosmilch und 300 ml Wasser dazu.",
      "15–20 Min. köcheln, bis die Linsen zerfallen. Spinat unterrühren.",
      "Mit Salz und Zitronen- oder Limettensaft abschmecken.",
    ],
  },
  {
    id: "suesskartoffel_curry", n: "Süßkartoffel-Kichererbsen-Curry", e: "🍠", m: ["mittag", "abend"], s: 2, t: 35, fz: true,
    tags: ["indisch", "vegetarisch", "vegan", "curry"],
    z: [["suesskartoffel", 400], ["kichererbsen", 240], ["kokosmilch", 400], ["currypaste", 30], ["zwiebel", 1], ["tk_spinat", 150], ["reis", 120], ["limette", 1, "opt"], ["oel", 1], ["salz", 1]],
    st: [
      "Reis kochen. Süßkartoffel in Würfel schneiden, Zwiebel hacken.",
      "Zwiebel und Currypaste in Öl anrösten, Süßkartoffel kurz mitbraten.",
      "Mit Kokosmilch und 100 ml Wasser ablöschen, 15 Min. köcheln.",
      "Kichererbsen und Spinat zugeben, 5 Min. weiterköcheln, mit Limette abschmecken.",
    ],
  },
  {
    id: "ofengemuese", n: "Ofengemüse mit Kichererbsen & Joghurt-Dip", e: "🥕", m: ["mittag", "abend"], s: 2, t: 40, geraet: "ofen",
    tags: ["orientalisch", "vegetarisch", "ofen", "blech"],
    z: [["suesskartoffel", 400], ["paprika", 1], ["zucchini", 1], ["zwiebel", 1], ["kichererbsen", 240], ["joghurt", 150], ["zitrone", 0.5], ["knoblauch", 1], ["kreuzkuemmel", 1], ["paprikapulver", 1], ["oel", 3], ["salz", 2]],
    st: [
      "Ofen auf 210 °C vorheizen. Gemüse in mundgerechte Stücke schneiden.",
      "Mit abgetropften Kichererbsen, Öl, Gewürzen und Salz aufs Blech geben.",
      "30 Min. rösten, einmal wenden.",
      "Joghurt mit Zitrone, Knoblauch und Salz verrühren und dazu servieren.",
    ],
  },
  {
    id: "pesto_pasta", n: "Pesto-Pasta mit Tomaten & Mozzarella", e: "🌿", m: ["mittag", "abend"], s: 2, t: 15,
    tags: ["italienisch", "pasta", "vegetarisch", "schnell"],
    z: [["spaghetti", 200], ["pesto", 95], ["kirschtomaten", 250], ["mozzarella", 125], ["rucola", 50, "opt"], ["salz", 1]],
    st: [
      "Spaghetti in Salzwasser kochen, 1 Tasse Kochwasser aufheben.",
      "Tomaten halbieren, Mozzarella in Stücke zupfen.",
      "Nudeln mit Pesto und etwas Kochwasser vermengen.",
      "Tomaten, Mozzarella und Rucola unterheben.",
    ],
  },
  {
    id: "caprese_sandwich", n: "Caprese-Baguette", e: "🥖", m: ["mittag"], aufw: false, s: 2, t: 15,
    tags: ["italienisch", "vegetarisch", "mitnehmen", "schnell"],
    z: [["baguette", 1], ["mozzarella", 125], ["tomate", 2], ["pesto", 40], ["rucola", 40, "opt"], ["salz", 1]],
    st: [
      "Baguette aufbacken, abkühlen lassen und längs aufschneiden.",
      "Mit Pesto bestreichen.",
      "Mit Tomaten- und Mozzarellascheiben und Rucola belegen, leicht salzen.",
    ],
  },
  {
    id: "quesadillas", n: "Bohnen-Käse-Quesadillas", e: "🫓", m: ["mittag", "abend"], aufw: false, s: 2, t: 20,
    tags: ["mexikanisch", "vegetarisch", "resteverwertung", "schnell"],
    z: [["wraps", 4], ["gouda", 100], ["kidneybohnen", 125], ["mais", 70], ["paprika", 1], ["fruehlingszwiebel", 2, "opt"], ["schmand", 80], ["kreuzkuemmel", 0.5], ["paprikapulver", 0.5]],
    st: [
      "Bohnen leicht zerdrücken und mit Mais, gewürfelter Paprika und Gewürzen mischen.",
      "Füllung und Käse auf eine Hälfte jedes Wraps geben, zuklappen.",
      "In der trockenen Pfanne von jeder Seite 2–3 Min. knusprig braten.",
      "In Ecken schneiden und mit Schmand dippen.",
    ],
  },
  {
    id: "tomatensuppe", n: "Tomatensuppe mit Grilled Cheese", e: "🍅", m: ["mittag", "abend"], s: 2, t: 25,
    tags: ["suppe", "vegetarisch", "schnell"],
    z: [["passierte_tomaten", 500], ["zwiebel", 1], ["knoblauch", 1], ["sahne", 50], ["toastbrot", 140], ["gouda", 60], ["butter", 15], ["bruehe", 1], ["zucker", 5], ["oregano", 1], ["oel", 1]],
    st: [
      "Zwiebel und Knoblauch in Öl andünsten.",
      "Passierte Tomaten, 200 ml Brühe, Zucker und Oregano dazu, 10 Min. köcheln, Sahne einrühren.",
      "Toasts außen mit Butter bestreichen, mit Käse füllen und in der Pfanne goldbraun braten.",
      "Suppe pürieren und mit den Käse-Toasts servieren.",
    ],
  },
  {
    id: "minestrone", n: "Minestrone", e: "🥣", m: ["mittag", "abend"], s: 2, t: 35, fz: true,
    tags: ["italienisch", "suppe", "vegetarisch", "vorkochen"],
    z: [["karotte", 1], ["zucchini", 1], ["lauch", 0.5], ["zwiebel", 1], ["kidneybohnen", 125], ["gehackte_tomaten", 400], ["penne", 60], ["parmesan", 20, "opt"], ["bruehe", 2], ["oregano", 1], ["oel", 1]],
    st: [
      "Gemüse klein würfeln und in Öl andünsten.",
      "Tomaten und 600 ml Brühe dazugeben, 15 Min. köcheln.",
      "Nudeln und Bohnen zugeben und garen, bis die Nudeln weich sind.",
      "Mit Parmesan servieren.",
    ],
  },
  {
    id: "pilzrisotto", n: "Pilzrisotto", e: "🍄", m: ["abend"], s: 2, t: 35,
    tags: ["italienisch", "vegetarisch", "cremig"],
    z: [["risottoreis", 160], ["champignons", 250], ["zwiebel", 1], ["knoblauch", 1], ["parmesan", 40], ["butter", 20], ["bruehe", 2], ["petersilie", 0.5, "opt"], ["oel", 1]],
    st: [
      "800 ml Brühe heiß halten. Pilze in Scheiben anbraten und beiseitestellen.",
      "Zwiebel und Knoblauch anschwitzen, Reis glasig dünsten.",
      "Nach und nach Brühe angießen und unter Rühren ca. 18 Min. garen.",
      "Pilze, Butter und Parmesan unterrühren, kurz ruhen lassen.",
    ],
  },
  {
    id: "brokkoli_gratin", n: "Kartoffel-Brokkoli-Gratin", e: "🥦", m: ["abend"], s: 2, t: 55, geraet: "ofen",
    tags: ["ofen", "vegetarisch", "auflauf"],
    z: [["kartoffeln", 500], ["brokkoli", 1], ["sahne", 200], ["milch", 100], ["gouda", 80], ["knoblauch", 1], ["salz", 2], ["pfeffer", 1]],
    st: [
      "Ofen auf 190 °C vorheizen. Kartoffeln in dünne Scheiben schneiden, Brokkoli in kleine Röschen.",
      "Sahne und Milch mit Knoblauch, Salz und Pfeffer würzen.",
      "Alles in eine Form schichten, mit der Sahne übergießen.",
      "Mit Käse bestreuen und 40 Min. backen.",
    ],
  },
  {
    id: "mie_nudeln", n: "Mie-Nudeln mit Gemüse & Ei", e: "🍜", m: ["mittag", "abend"], s: 2, t: 20,
    tags: ["asiatisch", "vegetarisch", "schnell"],
    z: [["mienudeln", 125], ["karotte", 1], ["paprika", 1], ["fruehlingszwiebel", 3], ["eier", 2], ["sojasauce", 40], ["ingwer", 10], ["knoblauch", 1], ["oel", 2]],
    st: [
      "Nudeln nach Packung garen und abgießen.",
      "Gemüse in feine Streifen schneiden und mit Ingwer und Knoblauch in heißem Öl 3 Min. braten.",
      "Gemüse zur Seite schieben, Eier hineinschlagen und verrühren.",
      "Nudeln und Sojasauce dazugeben und alles kräftig durchschwenken.",
    ],
  },
  {
    id: "tofu_erdnuss", n: "Knuspriger Tofu mit Erdnuss-Brokkoli", e: "🥜", m: ["mittag", "abend"], s: 2, t: 30, geraet: "airfryer",
    tags: ["asiatisch", "vegetarisch", "vegan", "airfryer", "neu"],
    z: [["tofu", 200], ["brokkoli", 1], ["reis", 150], ["erdnussbutter", 40], ["sojasauce", 40], ["limette", 0.5], ["honig", 1], ["knoblauch", 1], ["mehl", 10], ["oel", 2]],
    st: [
      "Reis kochen. Tofu gut ausdrücken, würfeln, mit Öl, Sojasauce und Mehl mischen.",
      "Im Airfryer bei 200 °C 15 Min. knusprig garen.",
      "Brokkoli-Röschen 4 Min. dämpfen oder kochen.",
      "Erdnussbutter, Sojasauce, Limette, Honig, Knoblauch und etwas Wasser zu einer Sauce rühren und alles mischen.",
    ],
  },
  {
    id: "pfannkuchen", n: "Pfannkuchen mit Apfel", e: "🥞", m: ["fruehstueck", "mittag", "abend"], aufw: false, s: 2, t: 25,
    tags: ["süß", "vegetarisch", "klassiker"],
    z: [["eier", 2], ["milch", 250], ["mehl", 125], ["apfel", 1, "opt"], ["zucker", 15], ["butter", 15], ["salz", 0.5]],
    st: [
      "Mehl, Milch, Eier, Zucker und Salz zu einem glatten Teig verrühren, 10 Min. ruhen lassen.",
      "Apfel in dünne Scheiben schneiden.",
      "Etwas Butter in der Pfanne erhitzen, Teig dünn eingießen, Apfelscheiben darauflegen.",
      "Von beiden Seiten goldbraun backen, mit Zucker bestreuen.",
    ],
  },
  {
    id: "spinat_feta_wraps", n: "Spinat-Feta-Wraps aus dem Ofen", e: "🌯", m: ["mittag", "abend"], s: 2, t: 25, geraet: "ofen",
    tags: ["vegetarisch", "wraps", "ofen", "resteverwertung"],
    z: [["wraps", 4], ["tk_spinat", 200], ["feta", 100], ["frischkaese", 100], ["knoblauch", 1], ["gouda", 40], ["salz", 1], ["pfeffer", 1]],
    st: [
      "Ofen auf 200 °C vorheizen. Spinat auftauen und gut ausdrücken.",
      "Mit Feta, Frischkäse, Knoblauch, Salz und Pfeffer verrühren.",
      "Auf die Wraps streichen, einrollen und nebeneinander in eine Form legen.",
      "Mit Käse bestreuen und 15 Min. backen.",
    ],
  },

  // =================== FRÜHSTÜCK ===================
  {
    id: "overnight_oats", n: "Overnight Oats mit Beeren", e: "🫐", m: ["fruehstueck"], s: 1, t: 5,
    tags: ["frühstück", "süß", "vorbereiten", "mitnehmen"],
    z: [["haferflocken", 50], ["milch", 120], ["joghurt", 60], ["tk_beeren", 60], ["honig", 1]],
    st: [
      "Haferflocken mit Milch und Joghurt in einem Glas verrühren.",
      "Gefrorene Beeren darauf geben und mit Honig süßen.",
      "Über Nacht in den Kühlschrank stellen – morgens fertig.",
    ],
  },
  {
    id: "ruehrei_brot", n: "Rührei auf Vollkornbrot", e: "🍳", m: ["fruehstueck"], s: 1, t: 10,
    tags: ["frühstück", "eier", "schnell"],
    z: [["eier", 2], ["vollkornbrot", 80], ["butter", 10], ["fruehlingszwiebel", 1, "opt"], ["kirschtomaten", 60, "opt"], ["salz", 1], ["pfeffer", 1]],
    st: [
      "Eier mit Salz und Pfeffer verquirlen.",
      "In Butter bei mittlerer Hitze langsam stocken lassen und dabei schieben.",
      "Auf Brot mit Frühlingszwiebeln und Tomaten servieren.",
    ],
  },
  {
    id: "muesli_joghurt", n: "Müsli mit Joghurt & Apfel", e: "🥣", m: ["fruehstueck"], s: 1, t: 5,
    tags: ["frühstück", "schnell"],
    z: [["muesli", 60], ["joghurt", 150], ["apfel", 1]],
    st: ["Apfel klein schneiden.", "Mit Müsli und Joghurt in einer Schale mischen."],
  },
  {
    id: "quark_beeren", n: "Beeren-Quark mit Haferflocken", e: "🍓", m: ["fruehstueck"], s: 1, t: 5,
    tags: ["frühstück", "proteinreich", "schnell"],
    z: [["quark", 150], ["tk_beeren", 80], ["haferflocken", 25], ["milch", 30], ["honig", 1]],
    st: ["Quark mit einem Schuss Milch cremig rühren.", "Aufgetaute Beeren, Haferflocken und Honig darübergeben."],
  },
  {
    id: "broetchen_frischkaese", n: "Brötchen mit Frischkäse & Gurke", e: "🥯", m: ["fruehstueck"], s: 1, t: 15,
    tags: ["frühstück", "mitnehmen"],
    z: [["broetchen", 2], ["frischkaese", 40], ["gurke", 0.25], ["kochschinken", 40, "opt"], ["salz", 0.5]],
    st: ["Brötchen aufbacken.", "Mit Frischkäse bestreichen und mit Gurkenscheiben und Schinken belegen."],
  },
  {
    id: "bananen_pancakes", n: "Bananen-Hafer-Pancakes", e: "🍌", m: ["fruehstueck"], s: 1, t: 15,
    tags: ["frühstück", "süß"],
    z: [["banane", 1], ["eier", 2], ["haferflocken", 40], ["tk_beeren", 50, "opt"], ["butter", 5]],
    st: [
      "Banane zerdrücken, mit Eiern und Haferflocken verrühren.",
      "Kleine Pancakes in etwas Butter von beiden Seiten je 2 Min. backen.",
      "Mit Beeren servieren.",
    ],
  },
  {
    id: "avocado_toast", n: "Avocado-Toast mit Ei", e: "🥑", m: ["fruehstueck"], s: 1, t: 10,
    tags: ["frühstück", "eier"],
    z: [["vollkornbrot", 80], ["avocado", 0.5], ["eier", 1], ["zitrone", 0.25, "opt"], ["chiliflocken", 0.25], ["salz", 1]],
    st: [
      "Ei 7 Min. kochen oder als Spiegelei braten.",
      "Avocado mit Zitronensaft und Salz zerdrücken, aufs geröstete Brot streichen.",
      "Ei darauf, mit Chiliflocken bestreuen.",
    ],
  },
  {
    id: "bananenbrot_porridge", n: "Warmes Bananen-Porridge", e: "🥣", m: ["fruehstueck"], s: 1, t: 10,
    tags: ["frühstück", "süß", "warm"],
    z: [["haferflocken", 50], ["milch", 200], ["banane", 1], ["erdnussbutter", 15, "opt"], ["honig", 1]],
    st: [
      "Haferflocken mit Milch aufkochen und 3–4 Min. unter Rühren köcheln.",
      "Halbe Banane hineinzerdrücken, die andere Hälfte in Scheiben obendrauf.",
      "Mit Erdnussbutter und Honig toppen.",
    ],
  },
];
