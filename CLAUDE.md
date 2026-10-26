# Restlos – Essensplanung für Single-Haushalte

Statische PWA ohne Build-Schritt und ohne Abhängigkeiten (auf dem Mac gibt es kein node/npm). Reines HTML/CSS/JS, Daten als JS-Dateien mit `window.*`-Globals, damit alles auch per `file://` und offline läuft. Zustand liegt in `localStorage` (`restlos-v1`).

- `data/zutaten.js` – Zutaten mit Packungsgröße, Richtpreis (Discounter), Haltbarkeit nach Öffnen, einfrierbar, Basis-Vorrat, Nährwerte je 100 g (`nw`) und Gramm pro Stück (`g`). Neue Zutaten brauchen beides, sonst fehlen sie in der Nährwertberechnung
- `data/rezepte.js` – Rezepte (keine Fischgerichte – der Nutzer mag keinen Fisch). `opt` = weglassbare Zutat, `aufw: false` = nicht als Rest geeignet
- `data/maerkte.js` – Märkte in 51688 Wipperfürth + Preisfaktoren je Abteilung
- `data/angebote.js` – Wochenangebote (wird wöchentlich gepflegt, s. u.)
- `js/logik.js` – Mengen, Einkaufsliste, Marktvergleich, Planer (Kühlschrank-Simulation + gierige Auswahl + lokale Suche)
- `js/app.js` – UI, Event-Delegation über `data-a` / `data-change` / `data-input`

Lokal testen: `python3 -m http.server 8766 --bind 127.0.0.1` im Projektordner.

## Wöchentliche Angebote aktualisieren („aktualisiere die Angebote“)

Angebotswoche ist Mo–Sa. Ab Freitag stehen meist die Angebote der Folgewoche online.

Quellen, die funktioniert haben:
1. **Aldi Süd**: WebFetch auf `https://www.aldi-sued.de/angebote` und `https://www.aldi-sued.de/produkte/wochenangebote/frischeprodukte-im-angebot/k/1588161427299187`
2. **Penny**: `https://www.penny.de/angebote` im eingebauten Browser öffnen (Cookies: „Nur notwendige erlauben“), runterscrollen und per JS die Produktkarten der Links `a[href^="/angebote/"]` auslesen (Kategorien obst-und-gemuese, kuehlregal, milprima, fleisch-und-wurst, weitere-angebote, top-angebote). Preise ohne App verwenden.
3. **Edeka / Lidl / Rewe**: Die Seiten werden per JavaScript geladen, Rewe braucht außerdem eine Marktauswahl. Vergleichsseite marktguru nach Zutat abfragen, z. B. `https://www.marktguru.de/c/hackfleisch` oder `/c/paprika`. Edeka-Region für Wipperfürth: Rhein-Ruhr.

Regeln fürs Eintragen:
- Nur Zutaten, die es in `zutaten.js` gibt. `preis` wird auf die Standardpackung der Zutat umgerechnet.
- XXL-Packs und deutlich größere Packungen weglassen, weil sie für 1 Person zu Resten führen. Lose Ware auf die Standardmenge umrechnen.
- Nur übernehmen, was wirklich günstiger als der Richtpreis ist. Ist ein Richtpreis offensichtlich veraltet, in `zutaten.js` anpassen.
- `stand`, `von`, `bis` und `hinweis` (Quellen und Lücken) setzen. Für Angebote, die erst später in der Woche starten, `von` angeben.
- Danach veröffentlichen (siehe Hosting), damit die Handy-App die neuen Daten bekommt.
