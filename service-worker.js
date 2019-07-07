let cacheName = 'lista-frs v0';
//arquivos para habilitatr o offline
let filesToCache = [
    './',
    'index.html',
    'style.css',
    'colors.css',
    'main.js',
    'js/array.observe.polyfill.js',
    'js/object.observe.polyfill.js'
];

self.addEventListener('install', function(e){
    console.log('[ServiceWorker] Installer');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e){
    console.log('[ServicWorker] Activate');
    e.waitUntil(
        //callback não tem ;
        caches.keys().then(function (keyList){
            return Promise.all(keyList.map(function(key){
                if(key !== cacheName){
                    console.log('[ServicWorker] Remove old cache');
                    return caches.delete(key);
                }
            }));
        })
    );
});
//pesquisar url e ver se bate, se bater vai siconizar
self.addEventListener('fetch', function(e){
    console.log('[ServicWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response){
            return response || fetch(e.request);
        })
    );
});