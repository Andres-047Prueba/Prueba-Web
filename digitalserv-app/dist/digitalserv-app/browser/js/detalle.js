function iconoCategoria(cat) {
  return { "Educación":"📚","Tecnología":"💻","Turismo":"🗺️","Comercio":"🛒" }[cat] || "⭐";
}

function actualizarBtnFav(id) {
  const b = document.getElementById('btn-favorito');
  if (!b) return;
  if (db_esFavorito(id)) { b.textContent='❤ Guardado'; b.className='btn btn--verde'; }
  else                   { b.textContent='♡ Favoritos'; b.className='btn btn--acento'; }
}

function actualizarBtnInscripcion(id) {
  const b = document.getElementById('btn-inscripcion');
  if (!b) return;
  if (db_estaInscrito(id)) { b.textContent='✅ Inscrito – Cancelar'; b.className='btn btn--contorno'; }
  else                      { b.textContent='🎓 Inscribirme';         b.className='btn btn--primario'; }
}

function toggleFavorito(id)     { db_toggleFavorito(id); actualizarBtnFav(id); }

function toggleInscripcion(id) {
  if (db_estaInscrito(id)) {
    if (confirm('¿Cancelar tu inscripción?')) db_cancelarInscripcion(id);
  } else {
    db_inscribirse(id);
    const a = document.getElementById('alerta-inscripcion');
    if (a) { a.classList.add('visible'); setTimeout(() => a.classList.remove('visible'), 5000); }
  }
  actualizarBtnInscripcion(id);
}

document.addEventListener('DOMContentLoaded', function () {
  const id = parseInt(new URLSearchParams(window.location.search).get('id'));
  const s  = db_buscarServicio(id);
  if (!s) { document.getElementById('panel-detalle').innerHTML='<p style="padding:40px;color:var(--c-gris3)">Servicio no encontrado.</p>'; return; }
  document.getElementById('breadcrumb-nombre').textContent = s.nombre;

  document.getElementById('panel-detalle').innerHTML = `
    <div class="detalle__imagen" style="background-color:${s.colorFondo};">
      <span>${iconoCategoria(s.categoria)}</span>
      <div class="detalle__badge">${s.categoria}</div>
    </div>
    <div class="detalle__info">
      <h1 class="detalle__nombre">${s.nombre}</h1>
      <p class="detalle__desc-corta">${s.descripcion}</p>
      <div class="detalle__valoracion">
        <span class="detalle__estrellas">★★★★★</span>
        <span class="detalle__puntaje">${s.valoracion}</span>
        <span class="detalle__resenas">(reseñas verificadas)</span>
      </div>
      <div class="detalle__fichas">
        <div class="ficha"><p class="ficha__etiqueta">📅 Duración</p><p class="ficha__valor">${s.duracion}</p></div>
        <div class="ficha"><p class="ficha__etiqueta">👨‍🏫 Instructor</p><p class="ficha__valor">${s.instructor}</p></div>
        <div class="ficha"><p class="ficha__etiqueta">🎓 Nivel</p><p class="ficha__valor">${s.nivel}</p></div>
        <div class="ficha"><p class="ficha__etiqueta">💰 Precio</p><p class="ficha__valor">${s.precio}</p></div>
      </div>
      <p class="detalle__descripcion-larga">${s.descripcionLarga}</p>
      <div class="detalle__botones">
        <button id="btn-inscripcion" class="btn btn--primario" onclick="toggleInscripcion(${s.id})">🎓 Inscribirme</button>
        <button id="btn-favorito"   class="btn btn--acento"   onclick="toggleFavorito(${s.id})">♡ Favoritos</button>
        <a href="contacto.html?servicio=${encodeURIComponent(s.nombre)}" class="btn btn--contorno">✉ Contactar</a>
      </div>
      <div class="alerta-exito" id="alerta-inscripcion">
        ✅ &nbsp; ¡Inscrito en <strong>${s.nombre}</strong>!
        &nbsp;<a href="mis-clases.html" style="color:#1A8A4A;text-decoration:underline;">Ver Mis Clases →</a>
      </div>
    </div>`;

  actualizarBtnFav(id);
  actualizarBtnInscripcion(id);

  const todos = db_obtenerServicios();
  const rel = todos.filter(x => x.categoria===s.categoria && x.id!==s.id).slice(0,3);
  const cont = document.getElementById('contenedor-relacionados');
  cont.innerHTML = rel.length
    ? rel.map(r => `<div class="tarjeta">
        <div class="tarjeta__imagen" style="background-color:${r.colorFondo};">${iconoCategoria(r.categoria)}</div>
        <div class="tarjeta__cuerpo">
          <span class="tarjeta__categoria">${r.categoria}</span>
          <h3 class="tarjeta__nombre">${r.nombre}</h3>
          <p class="tarjeta__descripcion">${r.descripcion}</p>
        </div>
        <div class="tarjeta__pie"><a href="detalle.html?id=${r.id}" class="btn btn--primario btn--bloque">Ver Detalle →</a></div>
      </div>`).join('')
    : '<p style="color:var(--c-gris3)">No hay servicios relacionados.</p>';
});
