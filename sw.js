const CACHE_VERSION = 'moscatelli-studio-v25';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-192-maskable.png',
  './assets/icons/icon-512-maskable.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/favicon-32.png',
  './assets/icons/favicon-16.png',
  './assets/icons/monogram-veil.png',
  './assets/images/atlas-bianco-avorio.webp',
  './assets/images/atlas-terra-bruna.webp',
  './assets/images/packaging-bianco-avorio.webp',
  './assets/images/ritual-oxblood.webp',
  './assets/images/label-study.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

const NETWORK_FIRST_PATHS = new Set([
  './',
  '/Moscatelli-Project/',
  '/Moscatelli-Project/index.html',
  '/Moscatelli-Project/style.css',
  '/Moscatelli-Project/script.js',
  '/Moscatelli-Project/manifest.webmanifest',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.webmanifest'
]);

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isShellAsset = NETWORK_FIRST_PATHS.has(url.pathname) || url.pathname.endsWith('/index.html');

  if (isShellAsset) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const clone = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
