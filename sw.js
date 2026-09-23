// Offline cache for the Medical Claim Assistant (used only when hosted over http/https)
// Bump CACHE on every redeploy so installed phones pick up the new index.html.
const CACHE = "claim-app-v2";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()).catch(()=>{}));
});
self.addEventListener("activate", e => {
  // remove any older cache versions, then take control of open pages
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(resp => {
      // runtime-cache successful responses (app shell + CDN libraries + OCR assets)
      try { const cp = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } catch (_) {}
      return resp;
    }).catch(() => caches.match("./index.html")))
  );
});
