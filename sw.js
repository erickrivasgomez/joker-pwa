var url = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=racist,sexist'
let cache = []

//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_PWA';

const urlsToCache = [
  './',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
  'https://code.jquery.com/jquery-3.4.1.slim.min.js',
  'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
  './style.css',
  './app.js',
  './index.html',
  './images/icons/icon.svg',
  'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=racist,sexist'
]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Url del cache
  var data_Url = '/Programming?blacklistFlags=racist,sexist';

  if (e.request.url.indexOf(data_Url) === 0) {
    //Manejador de datos 
    e.respondWith(
      fetch(e.request)
        .then(function (response) {
          return caches.open(CACHE_NAME).then(function (cache) {
            cache.put(e.request.url, response.clone());
            console.log(response + 'Cloning');
            return response;
          });
        })
    );
  } else {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
      caches.match(e.request)
        .then(res => {
          return res || fetch(e.request)
        })
    )
  }
})
