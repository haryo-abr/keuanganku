const CACHE_NAME = 'keuanganku-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Biarkan request API Google Apps Script langsung lewat jaringan
  if (e.request.url.includes('script.google.com')) return;
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});