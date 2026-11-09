// Caché sin conexión. Sube VERSION al cambiar archivos para forzar la actualización.
const VERSION = "orden-v1";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // La página: primero la red (para ver cambios), y si no hay conexión, la copia guardada.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((r) => { const copia = r.clone(); caches.open(VERSION).then((c) => c.put("./index.html", copia)); return r; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Resto (iconos, fuentes de Google): primero la caché, y se guarda lo nuevo.
  if (url.origin === location.origin || url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com")) {
    e.respondWith(
      caches.match(req).then((guardado) =>
        guardado ||
        fetch(req).then((r) => {
          if (r.ok || r.type === "opaque") { const copia = r.clone(); caches.open(VERSION).then((c) => c.put(req, copia)); }
          return r;
        })
      )
    );
  }
});
