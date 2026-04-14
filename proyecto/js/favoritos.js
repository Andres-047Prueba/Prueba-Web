/* 
  Responsabilidades:
  - Leer los ids guardados en localStorage
  - Buscar esos servicios en el arreglo de datos
  - Renderizar las tarjetas horizontales
  - Eliminar un favorito individual
  - Limpiar todos los favoritos
*/

/* ícono según categoría  */
function obtenerIcono(categoria) {
  const iconos = {
    "Educación":  "📚",
    "Tecnología": "💻",
    "Turismo":    "🗺️",
    "Comercio":   "🛒"
  };
  return iconos[categoria] || "⭐";
}


/* Lee favoritos del localStorage  */
function leerFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos') || '[]');
}


/* Crea HTML de una card horizontal de favorito  */
function crearCardFavorito(servicio) {
  return `
    <div class="fav-card" id="card-${servicio.id}">

      <!-- Imagen / ícono -->
      <div class="fav-card__imagen" style="background-color: ${servicio.colorFondo};">
        ${obtenerIcono(servicio.categoria)}
      </div>

      <!-- Información -->
      <div class="fav-card__info">
        <span class="fav-card__categoria">${servicio.categoria}</span>
        <h3 class="fav-card__nombre">${servicio.nombre}</h3>
        <p class="fav-card__desc">${servicio.descripcion}</p>
        <p class="fav-card__estrellas">★★★★★ ${servicio.valoracion}</p>
      </div>

      <!-- Precio -->
      <div class="fav-card__precio">
        <p class="fav-card__precio-valor">${servicio.precio}</p>
        <p class="fav-card__precio-nota">por sesión</p>
      </div>

      <!-- Botones -->
      <div class="fav-card__acciones">
        <a href="detalle.html?id=${servicio.id}" class="btn btn--primario">
          Ver Detalle
        </a>
        <button
          class="btn btn--acento"
          onclick="eliminarFavorito(${servicio.id})"
        >
          Quitar
        </button>
      </div>

    </div>
  `;
}


/*  Renderiza la lista de favoritos  */
function renderizarFavoritos() {

  const idsGuardados = leerFavoritos();
  const lista        = document.getElementById('lista-favoritos');
  const estadoVacio  = document.getElementById('estado-vacio');
  const btnLimpiar   = document.getElementById('btn-limpiar');
  const contador     = document.getElementById('contador-favoritos');

  /* Si no hay favoritos muestra un estado vacío */
  if (idsGuardados.length === 0) {
    lista.innerHTML          = '';
    estadoVacio.style.display = 'block';
    btnLimpiar.style.display  = 'none';
    contador.textContent      = 'No tienes servicios guardados';
    return;
  }

  estadoVacio.style.display = 'none';
  btnLimpiar.style.display  = 'inline-block';

  /* Actualiza el contador en el encabezado */
  contador.textContent = idsGuardados.length + ' servicio(s) guardado(s)';

  const serviciosFavoritos = servicios.filter(function (s) {
    return idsGuardados.includes(s.id);
  });
  /* Genera el HTML de todas las cards y pone en el DOM */
  lista.innerHTML = serviciosFavoritos.map(crearCardFavorito).join('');
}


/*  Elimina un favorito individual  */

function eliminarFavorito(id) {

  /* Lee el arreglo actual */
  let favoritos = leerFavoritos();

  /* conserva todos menos el que se quiere eliminar */
  favoritos = favoritos.filter(function (favId) { return favId !== id; });

  /* Guarda el arreglo actualizado */
  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  const card = document.getElementById('card-' + id);
  if (card) {
    card.style.transition = 'opacity 0.3s, transform 0.3s';
    card.style.opacity    = '0';
    card.style.transform  = 'translateX(20px)';
    setTimeout(function () {
      renderizarFavoritos(); 
    }, 300);
  }
}


/* : Elimina todos los favoritos  */
function limpiarTodos() {
  const confirmado = confirm('¿Estás seguro de que quieres eliminar todos tus favoritos?');
  if (confirmado) {
    localStorage.removeItem('favoritos');
    renderizarFavoritos();
  }
}

/*  Inicio  */
document.addEventListener('DOMContentLoaded', function () {
  renderizarFavoritos();
});
