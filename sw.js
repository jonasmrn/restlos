// Netzwerk zuerst (damit neue Angebote und Updates sofort ankommen), offline aus dem Cache.
// GitHub Pages erlaubt 10 Minuten HTTP-Cache – deshalb immer beim Server nachfragen („no-cache“ = mit ETag prüfen).
const CACHE = "restlos-v5";
const DATEIEN = [
  "./", "index.html", "css/style.css", "js/logik.js", "js/app.js",
  "data/zutaten.js", "data/sortiment.js", "data/rezepte.js", "data/maerkte.js", "data/angebote.js",
  "manifest.webmanifest", "icons/icon.svg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(DATEIEN.map((u) => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // Seitenaufrufe (mode "navigate") lassen sich nicht mit neuen Optionen kopieren, daher über die URL
  const frisch = e.request.mode === "navigate" ? new Request(e.request.url, { cache: "no-cache", credentials: "same-origin" }) : new Request(e.request, { cache: "no-cache" });
  e.respondWith(
    fetch(frisch)
      .then((res) => {
        const kopie = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, kopie));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
