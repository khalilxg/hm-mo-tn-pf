// Minimal service worker for مرشد القانوني التونسي.
// Its only job right now is to satisfy PWA "installability" requirements
// (a controlling service worker with a fetch handler) without changing how
// the site loads. It intentionally does NOT cache anything, so users always
// get the freshest content — this can be extended later for offline support.

const SW_VERSION = "v1"

self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", (event) => {
  // Pass-through network fetch — no caching yet.
  event.respondWith(fetch(event.request))
})
