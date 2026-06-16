self.addEventListener('install', e=>{
  e.waitUntil(caches.open('promos-v1').then(c=>c.addAll(['./','promos.html'])));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
function comercioPuedePublicar(comercioId){
  const promos = JSON.parse(localStorage.getItem('promos_'+comercioId) || '[]');
  const promosActivas = promos.filter(p => new Date(p.fecha) > new Date(Date.now() - 30*24*60*60*1000));
  
  if(promosActivas.length < 4){
    return {ok: true, restantes: 4 - promosActivas.length};
  }
  return {ok: false, restantes: 0};
}

function registrarPromo(comercioId, nombrePromo){
  const promos = JSON.parse(localStorage.getItem('promos_'+comercioId) || '[]');
  promos.push({nombre: nombrePromo, fecha: new Date().toISOString()});
  localStorage.setItem('promos_'+comercioId, JSON.stringify(promos));
}
