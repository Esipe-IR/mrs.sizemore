var CACHE_NAME = 'mrs_sizemore_cache';
var urlsToCache = [
    '/',
    '/static/css/main.85d41f9e.css',
    '/static/js/main.1641bcbd.js',
    '/img/ripple.svg',
    '/css/style.css',
    '/res/favicon.ico',
    '/res/favicon-16x16.png',
    '/res/favicon-32x32.png',
    '/res/favicon-96x96.png',
    '/res/android-icon-36x36.png',
    '/res/android-icon-48x48.png',
    '/res/android-icon-72x72.png',
    '/res/android-icon-96x96.png',
    '/res/android-icon-144x144.png',
    '/res/android-icon-192x192.png',
    '/res/apple-icon-57x57.png',
    '/res/apple-icon-60x60.png',
    '/res/apple-icon-72x72.png',
    '/res/apple-icon-76x76.png',
    '/res/apple-icon-114x114.png',
    '/res/apple-icon-120x120.png',
    '/res/apple-icon-144x144.png',
    '/res/apple-icon-152x152.png',
    '/res/apple-icon-180x180.png',
    '/res/apple-icon-precomposed.png',
    '/res/apple-icon.png',
    '/res/ms-icon-70x70.png',
    '/res/ms-icon-144x144.png',
    '/res/ms-icon-150x150.png',
    '/res/ms-icon-310x310.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }

            var fetchRequest = event.request.clone();

            return fetch(fetchRequest)
            .then(function(response) {
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                .then(function(cache) {
                    cache.put(event.request, responseToCache);
                })

                return response;
            })
        })
    );
});

