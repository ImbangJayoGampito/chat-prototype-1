const chatApp = "chat-app-v1";
const assets = [
  "/index.html",
  "/images/PWA_Logo.png",
  "/images/vert_app.png",
  "/about.html",
  "/app.js",
  "/basic_lib.js",
  "/header.js",
  "/index.js",
  "/styles.css",
  "/thanks.html",
  "/not_online.html"
];

self.addEventListener("install", async installEvent => {
  installEvent.waitUntil(
    caches.open(chatApp)
      .then(cache => cache.addAll(assets))
      .then(() => self.skipWaiting())
  );
});
const UrlToExclude = [
  '/contact.html',
  '/chat.html'
];
function networkFirstUrl(url) {
  const urlPath = url.split('?')[0];
  return UrlToExclude.some(path => urlPath.endsWith(path));
}

self.addEventListener('fetch', event => {
  if (networkFirstUrl(event.request.url)) {
    event.respondWith(
      fetch(event.request).then(response => {
        let cloned = response.clone()
        if (response.ok) {
          caches.open(chatApp).then(cache => cache.put(event.request, cloned));
        }
        return response;
      }).catch(() => {
        return caches.match("/not_online.html");
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(response => {
            let cloned = response.clone()
            if (response.ok) {
              caches.open(chatApp).then(cache => cache.put(event.request, cloned));
            }
            return response;
          }).catch(() => {
            return caches.match("/not_online.html");
          });
        }
      })
    );
  }
});