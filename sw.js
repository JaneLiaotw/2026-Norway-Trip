const CACHE_NAME = 'norway-trip-v1';
// 這裡列出所有要在有網路時先偷偷下載到手機裡的檔案
const urlsToCache = [
  '/2026-Norway-Trip/',
  '/2026-Norway-Trip/index.html',
  '/2026-Norway-Trip/culture.html',
  '/2026-Norway-Trip/guide.html',
  '/2026-Norway-Trip/language.html',
  '/2026-Norway-Trip/style.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 安裝時，把檔案塞進快取
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 網頁抓取資料時，先檢查手機裡有沒有存檔（斷網時的救星）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取裡有，就直接給快取的檔案；如果沒有，再去網路抓
        return response || fetch(event.request);
      })
  );
});
