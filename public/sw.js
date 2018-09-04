self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("notepad").then((cache) => {
            cache.addAll(['/index.html']);
        })
    );
    console.log("aaa");
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});