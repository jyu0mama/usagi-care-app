// areruko 用 Service Worker（PWAインストール条件を満たすための最小構成）
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => new Response('', { status: 504 })));
});
