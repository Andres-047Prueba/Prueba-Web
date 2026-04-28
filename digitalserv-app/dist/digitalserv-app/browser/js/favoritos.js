function iconoCategoria(cat) {
  return { "Educación":"📚","Tecnología":"💻","Turismo":"🗺️","Comercio":"🛒" }[cat] || "⭐";
}

function crearCard(s) {
  return `<div class="fav-card" id="card-${s.id}">
    <div class="fav-card__imagen" style="background-color:${s.colorFondo};">${iconoCategoria(s.categoria)}</div>
    <div class="fav-card__info">
      <span class="fav-card__categoria">${s.categoria}</span>
      <h3 class="fav-card__nombre">${s.nombre}</h3>
      <p class="fav-card__desc">${s.descripcion}</p>
      <p class="fav-card__estrellas">★★★★★ ${s.valoracion}</p>
    </div>
    <div class="fav-card__precio">
      <p class="fav-card__precio-valor">${s.precio}</p>
      <p class="fav-card__precio-nota">por sesión</p>
    </div>
    <div class="fav-card__acciones">
      <a href="detalle.html?id=${s.id}" class="btn btn--primario">Ver Detalle</a>
      <button class="btn btn--acento" onclick="eliminar(${s.id})">🗑 Quitar</button>
    </div>
  </div>`;
}

function renderizar() {
  const ids   = db_obtenerFavoritos();
  const lista = document.getElementById('lista-favoritos');
  const vacio = document.getElementById('estado-vacio');
  const btnL  = document.getElementById('btn-limpiar');
  const cont  = document.getElementById('contador-favoritos');

  if (!ids.length) {
    lista.innerHTML=''; vacio.style.display='block'; btnL.style.display='none';
    cont.textContent='No tienes servicios guardados'; return;
  }
  vacio.style.display='none'; btnL.style.display='inline-flex';
  cont.textContent = ids.length + ' servicio(s) guardado(s)';
  const favs = db_obtenerServicios().filter(s => ids.includes(s.id));
  lista.innerHTML = favs.map(crearCard).join('');
}

function eliminar(id) {
  db_toggleFavorito(id);
  const card = document.getElementById('card-'+id);
  if (card) { card.style.transition='opacity .3s,transform .3s'; card.style.opacity='0'; card.style.transform='translateX(20px)'; setTimeout(renderizar, 300); }
}

function limpiarTodos() {
  if (confirm('¿Eliminar todos tus favoritos?')) { db_limpiarFavoritos(); renderizar(); }
}

document.addEventListener('DOMContentLoaded', renderizar);
