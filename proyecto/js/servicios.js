/* 
  Responsabilidades:
  - Mostrar todas las tarjetas de servicios
  - Filtrar por categoría 
  - Filtrar por texto en tiempo real 
  - Paginación
*/


/*  VARIABLES DE ESTADO  */
/* Estas variables guardan el estado actual de los filtros y la paginación. Se actualizan cuando el usuario interactúa*/
let categoriaActiva  = "Todos";   /* Categoría seleccionada */
let textoBusqueda    = "";        /* Texto escrito en el buscador */
let paginaActual     = 1;         /* Página que se muestra */
const itemsPorPagina = 8;         /* Cuántas tarjetas mostrar por página */


/*  FUNCIÓN: da ícono según la categoría  */
function obtenerIcono(categoria) {
  const iconos = {
    "Educación":  "📚",
    "Tecnología": "💻",
    "Turismo":    "🗺️",
    "Comercio":   "🛒"
  };
  return iconos[categoria] || "⭐";
}


/*  FUNCIÓN: Filtrar servicios  */
/* Aplica los filtros activos sobre el "servicios" y devuelve solo los que cumplen todas las condiciones*/
function filtrarServicios() {

  return servicios.filter(function (servicio) {

    /* Condición 1: categoría coincide*/
    const coincideCategoria =
      categoriaActiva === "Todos" ||
      servicio.categoria === categoriaActiva;

    /* Condición 2: el texto buscado aparece en el nombre o descripción */
    /* toLowerCase() convierte a minúsculas para que no distinga mayúsculas */
    const textoMinusculas = textoBusqueda.toLowerCase();
    const coincideTexto =
      servicio.nombre.toLowerCase().includes(textoMinusculas) ||
      servicio.descripcion.toLowerCase().includes(textoMinusculas);

    /* Solo retorna el servicio si cumple AMBAS condiciones */
    return coincideCategoria && coincideTexto;
  });
}


/*  Crea HTML de una tarjeta  */
function crearTarjeta(servicio) {
  return `
    <div class="tarjeta">
      <div class="tarjeta__imagen" style="background-color: ${servicio.colorFondo};">
        ${obtenerIcono(servicio.categoria)}
      </div>
      <div class="tarjeta__cuerpo">
        <span class="tarjeta__categoria">${servicio.categoria}</span>
        <h3 class="tarjeta__nombre">${servicio.nombre}</h3>
        <p class="tarjeta__descripcion">${servicio.descripcion}</p>
      </div>
      <div class="tarjeta__pie">
        <a href="detalle.html?id=${servicio.id}" class="btn btn--primario btn--bloque">
          Ver Detalle &rarr;
        </a>
      </div>
    </div>
  `;
}

function renderizar() {

  const serviciosFiltrados = filtrarServicios();
  const contenedor = document.getElementById('contenedor-servicios');
  const sinResultados = document.getElementById('sin-resultados');

  /* Si no hay resultados, mostrar el mensaje y ocultar el grid */
  if (serviciosFiltrados.length === 0) {
    contenedor.innerHTML = '';
    sinResultados.style.display = 'block';
    document.getElementById('paginacion').innerHTML = '';
    return;
  }

  sinResultados.style.display = 'none';

  /* Calcula qué servicios corresponden a la página actual */
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const fin    = inicio + itemsPorPagina;
  const paginados = serviciosFiltrados.slice(inicio, fin);

  /* Genera y muestra las tarjetas */
  contenedor.innerHTML = paginados.map(crearTarjeta).join('');

  /* Genera paginación */
  renderizarPaginacion(serviciosFiltrados.length);
}


/*  Genera botones de paginación  */
function renderizarPaginacion(totalItems) {

  const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
  const contenedor   = document.getElementById('paginacion');

  if (totalPaginas <= 1) {
    contenedor.innerHTML = '';
    return;
  }

  let html = '';

  /* Botón anterior */
  html += `<button class="paginacion__btn" onclick="cambiarPagina(${paginaActual - 1})"
            ${paginaActual === 1 ? 'disabled' : ''}>&#8249;</button>`;

  /* Botones de número de página */
  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button class="paginacion__btn ${i === paginaActual ? 'activo' : ''}"
              onclick="cambiarPagina(${i})">${i}</button>`;
  }

  /* Botón siguiente */
  html += `<button class="paginacion__btn" onclick="cambiarPagina(${paginaActual + 1})"
            ${paginaActual === totalPaginas ? 'disabled' : ''}>&#8250;</button>`;

  contenedor.innerHTML = html;
}


/* Cambia de página  */
function cambiarPagina(pagina) {
  paginaActual = pagina;
  renderizar();
  /* Desplaza la vista hacia arriba  */
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* Limpia todos los filtros  */
function limpiarFiltros() {
  categoriaActiva = "Todos";
  textoBusqueda   = "";
  paginaActual    = 1;

  /* Resetear el campo de búsqueda  */
  document.getElementById('busqueda').value = '';

  /* Marcar el chip "Todos" como activo */
  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.classList.remove('activo');
    if (chip.dataset.categoria === 'Todos') chip.classList.add('activo');
  });

  renderizar();
}


/* ── Se ejecuta cuando el DOM está listo  */
document.addEventListener('DOMContentLoaded', function () {

  /* Renderizar las tarjetas al cargar */
  renderizar();

  /* Evento búsqueda en tiempo real  */
  document.getElementById('busqueda').addEventListener('input', function () {
    textoBusqueda = this.value;   
    paginaActual  = 1;            /* regresa a la primera página */
    renderizar();
  });

  /*  Evento clic en chips de categoría  */
  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {

      /* Quitar clase activa de todos los chips */
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('activo'));

      /* Poner clase activa solo en el que se hizo clic */
      this.classList.add('activo');

      /* Actualizar la categoría activa con el atributo data-categoria */
      categoriaActiva = this.dataset.categoria;
      paginaActual    = 1;
      renderizar();
    });
  });

});
