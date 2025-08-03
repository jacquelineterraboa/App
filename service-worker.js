const CACHE_NAME = 'da-roca-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/beneficios.html',
  '/nossos-itens.html',
  '/App/entrar.html',
  '/App/cadastro-cliente.html',
  '/App/cadastro-fornecedores.html',
  '/escolher-cadastro.html',
  '/style.css', // certifique-se de que o nome esteja certo
  '/icons/icon-192x192.png', // ícone PWA
  '/icons/icon-512x512.png', // ícone PWA grande
];

// Instala o SW e faz cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o novo SW e remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Intercepta requisições e responde com cache se possível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      // Retorna uma página offline customizada se desejar
    })
  );
});
