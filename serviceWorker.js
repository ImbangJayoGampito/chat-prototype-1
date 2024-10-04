const chatApp = "chat-app-v1"

const assets = ["/",
  "/index.html",
  "/basic_lib.js"
  , "/chat.html",
  '/icon-32.png',
  '/icon-144.png',
  '/icon-192.png',
  '/icon-512.png',
  , "/chat.js",
  "/contact.html",
  "/header.js"
  ,
  "/index.html",
  "/index.js",
  "/app.js",
  "/manifest.json",
  "/styles.css",
  "/thanks.html"]

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })(),
  );
});
const cacheName = "MyPWAOk";


self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })(),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        }),
      );
    }),
  );
});
