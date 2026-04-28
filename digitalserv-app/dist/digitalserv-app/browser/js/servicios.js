let categoriaActiva = "Todos", textoBusqueda = "", paginaActual = 1;
const itemsPorPagina = 8;

function iconoCategoria(cat) {
  return { "Educación":"📚","Tecnología":"💻","Turismo":"🗺️","Comercio":"🛒" }[cat] || "⭐";
}

function filtrar() {
  return db_obtenerServicios().filter(s => {
    const cat = categoriaActiva === "Todos" || s.categoria === categoriaActiva;
    const txt = s.nombre.toLowerCase().includes(textoBusqueda) || s.descripcion.toLowerCase().includes(textoBusqueda);
    return cat && txt;
  });
}

function crearTarjeta(s) {
  return `<div class="tarjeta">
    <div class="tarjeta__imagen" style="background-color:${s.colorFondo};">${iconoCategoria(s.categoria)}</div>
    <div class="tarjeta__cuerpo">
      <span class="tarjeta__categoria">${s.categoria}</span>
      <h3 class="tarjeta__nombre">${s.nombre}</h3>
      <p class="tarjeta__descripcion">${s.descripcion}</p>
    </div>
    <div class="tarjeta__pie">
      <a href="detalle.html?id=${s.id}" class="btn btn--primario btn--bloque">Ver Detalle &rarr;</a>
    </div>
  </div>`;
}

function renderizar() {
  const filtrados = filtrar();
  const cont = document.getElementById('contenedor-servicios');
  const sinR = document.getElementById('sin-resultados');
  if (!filtrados.length) { cont.innerHTML=''; sinR.style.display='block'; document.getElementById('paginacion').innerHTML=''; return; }
  sinR.style.display = 'none';
  const inicio = (paginaActual-1)*itemsPorPagina;
  cont.innerHTML = filtrados.slice(inicio, inicio+itemsPorPagina).map(crearTarjeta).join('');
  renderPag(filtrados.length);
}

function renderPag(total) {
  const tp = Math.ceil(total/itemsPorPagina);
  const c = document.getElementById('paginacion');
  if (tp<=1) { c.innerHTML=''; return; }
  let h = `<button class="paginacion__btn" onclick="cambiarPag(${paginaActual-1})" ${paginaActual===1?'disabled':''}>&#8249;</button>`;
  for (let i=1; i<=tp; i++) h += `<button class="paginacion__btn ${i===paginaActual?'activo':''}" onclick="cambiarPag(${i})">${i}</button>`;
  h += `<button class="paginacion__btn" onclick="cambiarPag(${paginaActual+1})" ${paginaActual===tp?'disabled':''}>&#8250;</button>`;
  c.innerHTML = h;
}

function cambiarPag(p) { paginaActual=p; renderizar(); window.scrollTo({top:0,behavior:'smooth'}); }

function limpiarFiltros() {
  categoriaActiva="Todos"; textoBusqueda=""; paginaActual=1;
  document.getElementById('busqueda').value='';
  document.querySelectorAll('.chip').forEach(c => { c.classList.remove('activo'); if(c.dataset.categoria==='Todos') c.classList.add('activo'); });
  renderizar();
}

document.addEventListener('DOMContentLoaded', function () {
  renderizar();
  document.getElementById('busqueda').addEventListener('input', function() { textoBusqueda=this.value.toLowerCase(); paginaActual=1; renderizar(); });
  document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', function() {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('activo'));
    this.classList.add('activo');
    categoriaActiva=this.dataset.categoria; paginaActual=1; renderizar();
  }));
});
