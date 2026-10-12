const CACHE = 'attendance-v1', fbcp = 'https://www.gstatic.com/firebasejs/10.11.0/firebase-', sacp = './Self_Attendance_';
const FILES = ['./', './index.html', `${sacp}Design.css`, `${sacp}Working.js`, `${sacp}Logo_Icon.png`, './Manifest.json',
    `${fbcp}app-compat.js`, `${fbcp}auth-compat.js`, `${fbcp}firestore-compat.js`];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => fetch(f, { cache: 'reload' })
    .then(r => { if (!r.ok) throw new Error(f); return c.put(f, r); }))))
    .then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(names => Promise.all(names.filter(n => n !== CACHE)
    .map(n => caches.delete(n))))
    .then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
    const req = e.request;
    const url = new URL(req.url);
    if (req.method !== 'GET') return;
    const isGstatic = url.hostname === 'www.gstatic.com';
    if (url.origin !== location.origin && !isGstatic) return;
    if (isGstatic) return e.respondWith(caches.match(req).then(c => c || fetch(req)));
    e.respondWith(fetch(req, { cache: 'no-cache' })
        .then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; })
        .catch(() => caches.match(req).then(c => c || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
});