const CACHE_NAME = '112-asistan-v2'; // Versiyonu v2 yaptık
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './img/logo.jpg',
  './sound/beep.mp3',
  './sound/wheezing.mp3',
  './sound/ronkus.mp3',
  './sound/stridor.mp3'
];

// Dosyaları hafızaya al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// İnternet yoksa hafızadan getir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});