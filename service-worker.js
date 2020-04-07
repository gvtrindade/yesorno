//Declare information and assets of the app
const cacheName = "2"
const staticAssets = [
    "./index.html",
    "./scripts.js",
    "./style.css"
]
self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName)
    await cache.addAll(staticAssets)
});

//Fetch instructions for when offline
self.addEventListener('fetch', event => {
    const req = event.request;

    if (/.*(json)$/.test(req.url)) {
        event.respondWith(networkFirst(req));
    } else {
        event.respondWith(cacheFirst(req));
    }
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    // Return true if you want to remove this cache,
                    // but remember that caches are shared across
                    // the whole origin
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(req)
    return cachedResponse || networkFirst(req)
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cachedResponse = await cache.match(req);
        return cachedResponse;
    }
}