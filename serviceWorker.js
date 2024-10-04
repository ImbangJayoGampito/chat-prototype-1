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

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(chatApp).then(cache => {
            cache.addAll(assets)
        })
    )
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })

