//Declare information and assets of the app
const cacheName = "Yes/No_v1"
const staticAssets = [
    "./index.html",
    "./scripts.js",
    "./style.css"
]
self.addEventListener('install', async event => {
    console.log('install event')
    const cache = await caches.open(cacheName)
    await cache.addAll(staticAssets)
});

//Fetch instructions for when offline
self.addEventListener('fetch', event => {
    console.log('fetch event')
    const req = event.request;
    event.respondWith(cacheFirst(req))
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(req)
    return cachedResponse || fetch(req)
}