// Netzwerk zuerst (damit neue Angebote sofort ankommen), offline aus dem Cache.
const CACHE = "restlos-v3";
const DATEIEN = [
  "./", "index.html", "css/style.css", "js/logik.js", "js/app.js",
  "data/zutaten.js", "data/sortiment.js", "data/rezepte.js", "data/maerkte.js", "data/angebote.js",
  "manifest.webmanifest", "icons/icon.svg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const kopie = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, kopie));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
