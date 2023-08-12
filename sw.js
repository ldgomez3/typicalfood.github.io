const STATIC_CACHE = "static-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./html/Contacto.html",
  "./html/indexhome.html",
  "./css/styles.css",
  "./css/styles1.css",
  "./css/stylesIndex.css",
  "./js/main.js",
  "./js/scripts.js",
  "./img/cazuela.jpeg",
  "./img/ceviche.jpg",
  "./img/churrasco.jpg",
  "./img/comida.png",
  "./img/encebollado.jpg",
  "./img/fanesca.jpg",
  "./img/fondo.JPEG",
  "./img/hornado.jpg",
  "./img/logo.png",
  "./img/pescado.jpeg",
  "./img/tipico.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== STATIC_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          // Clonar la respuesta antes de agregarla al caché
          const responseClone = response.clone();

          caches.open(STATIC_CACHE)
            .then((cache) => cache.put(event.request, responseClone));
        }

        return response;
      })
      .catch(() => {
        return caches.match(event.request)
          .then((cachedResponse) => cachedResponse || fetch(event.request));
      })
  );
});
