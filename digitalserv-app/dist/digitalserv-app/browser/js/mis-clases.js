function iconoCategoria(cat) {
  return { "Educación":"📚","Tecnología":"💻","Turismo":"🗺️","Comercio":"🛒" }[cat] || "⭐";
}

function crearResumen(clases) {
  const cats = new Set(clases.map(c => c.categoria));
  let total = 0;
  clases.forEach(c => { const n = parseInt(c.precio.replace(/[^0-9]/g,'')); if (!isNaN(n)) total+=n; });
  return `
    <div class="resumen__item"><div class="resumen__icono">📋</div><div><div class="resumen__valor">${clases.length}</div><div class="resumen__etiqueta">Clases inscritas</div></div></div>
    <div class="resumen__item"><div class="resumen__icono">🏷️</div><div><div class="resumen__valor">${cats.size}</div><div class="resumen__etiqueta">Categorías distintas</div></div></div>
    <div class="resumen__item"><div class="resumen__icono">💰</div><div><div class="resumen__valor">$${total.toLocaleString('es-CO')}</div><div class="resumen__etiqueta">Inversión total (COP)</div></div></div>`;
}

function crearCard(s) {
  return `<div class="clase-card" id="clase-${s.id}">
    <div class="clase-card__icono" style="background-color:${s.colorFondo};">${iconoCategoria(s.categoria)}</div>
    <div class="clase-card__info">
      <span class="clase-card__categoria">${s.categoria}</span>
      <h3 class="clase-card__nombre">${s.nombre}</h3>
      <p class="clase-card__desc">${s.descripcion}</p>
      <div class="clase-card__detalles">
        <span>📅 ${s.duracion}</span>
        <span>👨‍🏫 ${s.instructor}</span>
        <span>🎓 ${s.nivel}</span>
      </div>
    </div>
    <div class="clase-card__lateral">
      <span class="badge-inscrito">✅ Inscrito</span>
      <div class="clase-card__precio-valor">${s.precio}</div>
      <div style="display:flex;gap:10px;">
        <a href="detalle.html?id=${s.id}" class="btn btn--primario">Ver detalle</a>
        <button class="btn btn--acento" onclick="cancelar(${s.id})">Cancelar</button>
      </div>
    </div>
  </div>`;
}

function renderizar() {
  const clases   = db_obtenerClasesInscritas();
  const lista    = document.getElementById('lista-clases');
  const resumen  = document.getElementById('resumen-clases');
  const vacio    = document.getElementById('estado-vacio');
  const subtitulo= document.getElementById('subtitulo-clases');

  if (!clases.length) {
    lista.innerHTML=''; resumen.style.display='none'; vacio.style.display='block';
    subtitulo.textContent='Aún no tienes clases inscritas'; return;
  }
  vacio.style.display='none'; resumen.style.display='grid';
  subtitulo.textContent = clases.length + ' clase(s) inscrita(s)';
  resumen.innerHTML = crearResumen(clases);
  lista.innerHTML   = clases.map(crearCard).join('');
}

function cancelar(id) {
  if (!confirm('¿Cancelar tu inscripción en esta clase?')) return;
  db_cancelarInscripcion(id);
  const card = document.getElementById('clase-'+id);
  if (card) { card.style.transition='opacity .3s,transform .3s'; card.style.opacity='0'; card.style.transform='translateX(20px)'; setTimeout(renderizar,300); }
}

document.addEventListener('DOMContentLoaded', renderizar);
