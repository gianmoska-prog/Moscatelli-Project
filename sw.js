/* Patch 6: HQ cache version bumped for no-PIN noir-command rebuild. */
const CACHE_VERSION = 'moscatelli-hq-noir-command-final-20260603-i';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './lang/en.json',
  './lang/it.json',
  './lang/pt.json',
  './manifest.webmanifest',
  './assets/icons/favicon-16.png',
  './assets/icons/favicon-32.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/monogram-veil.webp',
  './assets/icons/icon-192-launch-mark.png',
  './assets/icons/icon-512-launch-mark.png',
  './assets/icons/icon-192-launch-mark-maskable.png',
  './assets/icons/icon-512-launch-mark-maskable.png',
  './assets/images/atlas-bianco-avorio.webp',
  './assets/images/atlas-terra-bruna.webp',
  './assets/images/packaging-bianco-avorio.webp',
  './assets/images/ritual-oxblood.webp',
  './assets/images/link-moscatelli.webp',
  './assets/images/link-mrhg.webp',
  './assets/images/link-finance.webp',
  './assets/images/link-pitch.webp',
  './assets/images/link-storyboard.webp',
  './assets/images/link-coming-soon.webp'
];
const GOOGLE_FONT_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);
const SHELL_SUFFIXES = ['/', '/index.html', '/style.css', '/script.js', '/manifest.webmanifest'];

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

function isShellAsset(url) {
  return SHELL_SUFFIXES.some(suffix => url.pathname === suffix || url.pathname.endsWith(suffix));
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if (GOOGLE_FONT_HOSTS.has(url.hostname)) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(cache =>
        cache.match(event.request).then(cached =>
          cached || fetch(event.request).then(response => {
            if (response && response.ok) cache.put(event.request, response.clone());
            return response;
          })
        )
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  if (isShellAsset(url)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request, { ignoreSearch: true }).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
