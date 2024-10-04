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
  "/header.js",
  "/images/vert_app.png",
  "/images/PWA_Logo.png"
  ,
  "/index.html",
  "/index.js",
  "/app.js",
  "/manifest.json",
  "/styles.css",
  , "/offline.html"
  "/thanks.html"]

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
  // First try to get the resource from the cache.
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackUrl: "/fallback.html",
    }),
  );
});
window.addEventListener('offline', () => {
  window.location.href = "/offline.html";
  console.log("you're offline!!!!")
});

window.addEventListener('online', () => {
  window.location.href = "/index.html";
  console.log("you are online!")
});