const CACHE = 'box00-v15';
const FILES = ['./box00-orcamento-v15.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Sempre tenta rede primeiro — se falhar usa cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
