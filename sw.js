self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("notepad").then((cache) => {
            cache.addAll(['https://tino-indexdb-noteapp.herokuapp.com/index.html']);
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