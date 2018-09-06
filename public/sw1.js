var cacheName = 'notepad-v1';

// Step 1 - Call Install Event
self.addEventListener("install", (e) => {
    console.log('Service Worker: Installed');
});

// Step 2 - Call Activate Event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.filter(cache => {
                        if(cache !== cacheName) {
                            console.log('Service Worker: Clearing Old Cache');
                            caches.delete(cache);
                        }
                    })
                );
            })
    );
});

// Step 3 - Handle Fetch Event: cache relevant resources based on the different requests the user makes
self.addEventListener("fetch", (e) => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                // Make a clone of the response obtained from server
                var resClone = res.clone();
                // Open cache and cache the resources
                caches
                    .open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resClone);
                        console.log("Serivce Worker: Resources Cached");
                    });
                return res;
            })
            .catch((err) => caches.match(e.request).then(res => res))
    );
});