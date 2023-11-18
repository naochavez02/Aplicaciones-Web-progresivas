//Asignar nombre y versión de la cache
const CACHE_NAME='V1_cache_NaomiChavezPWA';

//ficheros a cachear en la aplicación
var urlsToCache=[
    './',
    './css/logo.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.jpg',
    './img/favicon-512.jpg',
    './img/favicon-384.png',
    './img/favicon-256.jpg',
    './img/favicon-192.jpg',
    './img/favicon-128.jpg',
    './img/favicon-96.jpg',
    './img/favicon-64.jpg',
    './img/favicon-32.jpg',
    './img/favicon-16.jpg',
];

//Evento install
//Instalación del service worker y guarda en cache los recursos
self.addEventListener('install',e=>{
    e.waitUntill(
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(urlsToCache)
            .then(()=>{
                self.skipWaiting();
            });
        })
        .catch(err=>console.log('No se ha registrado el cache', err))
    );
});

//Evento activate
//que la app funcione sin conexion
self.addEventListener('activate',e=>{
    const cacheWhiteList=[CACHE_NAME];

        e.waitUntill(
            caches.keys()
            .then(cacheNames=>{
                return Promise.all(
                cacheNames.map(cacheName=>{
                    if(cacheWhiteList.indexOf(cacheName)==-1){
                        //Borrar elementos que se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(()=>{
            //activar cache
            self.clients.claim();
        })
    );
});


//Evento fetch
self.addEventListener('fecth',e=>{
    e.respondWith(
        caches.match(e.request).then(res=>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});
