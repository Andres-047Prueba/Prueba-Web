/* 
  Responsabilidades:
  - Leer el id del servicio desde la URL (?id=X)
  - Mostrar la información completa del servicio
  - Gestionar el botón de favoritos
  - Mostrar servicios relacionados de la misma categoría
*/



function obtenerIcono(categoria) {
  const iconos = {
    "Educación":  "📚",
    "Tecnología": "💻",
    "Turismo":    "🗺️",
    "Comercio":   "🛒"
  };
  return iconos[categoria] || "⭐";
}


/* Comprueba si un servicio está en favoritos  */
function esFavorito(id) {
  const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  return favoritos.includes(id);
}


/* Guarda o quita de favoritos  */
function toggleFavorito(id) {

  /* Lee el arreglo de favoritos actual */
  let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

  if (esFavorito(id)) {
    favoritos = favoritos.filter(function (favId) { return favId !== id; });
  } else {
    favoritos.push(id);
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  actualizarBotonFavorito(id);
}


/*  Actualiza apariencia del botón de favorito  */
function actualizarBotonFavorito(id) {
  const btn = document.getElementById('btn-favorito');
  if (!btn) return;

  if (esFavorito(id)) {
    btn.textContent = ' Guardado';
    btn.classList.remove('btn--acento');
    btn.classList.add('btn--verde');
  } else {
    btn.textContent = ' Agregar a Favoritos';
    btn.classList.remove('btn--verde');
    btn.classList.add('btn--acento');
  }
}


/* Crea tarjeta simple para servicios relacionados  */
function crearTarjetaRelacionada(servicio) {
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


/*  Inicio*/
document.addEventListener('DOMContentLoaded', function () {

  /*  Paso 1: Lee el parámetro ?id=X de la URL  */

  const params = new URLSearchParams(window.location.search);
  const idServicio = parseInt(params.get('id')); 
  /* Paso 2: Busca el servicio en el arreglo de datos  */
  const servicio = servicios.find(function (s) { return s.id === idServicio; });
  if (!servicio) {
    document.getElementById('panel-detalle').innerHTML =
      '<p style="padding:40px; color: var(--color-gris3);">Servicio no encontrado.</p>';
    return;
  }

  /* Paso 3: Actualiza el breadcrumb con el nombre  */
  document.getElementById('breadcrumb-nombre').textContent = servicio.nombre;

  /* Paso 4: Renderiza el panel de detalle  */
  const panel = document.getElementById('panel-detalle');

  panel.innerHTML = `
    <!-- Imagen -->
    <div class="detalle__imagen" style="background-color: ${servicio.colorFondo};">
      <span style="font-size:5rem;">${obtenerIcono(servicio.categoria)}</span>
      <div class="detalle__badge">${servicio.categoria}</div>
    </div>

    <!-- Información -->
    <div class="detalle__info">

      <h1 class="detalle__nombre">${servicio.nombre}</h1>
      <p class="detalle__desc-corta">${servicio.descripcion}</p>

      <!-- Valoración -->
      <div class="detalle__valoracion">
        <span class="detalle__estrellas">★★★★★</span>
        <span class="detalle__puntaje">${servicio.valoracion}</span>
        <span class="detalle__resenas">(reseñas verificadas)</span>
      </div>

      <!-- Fichas de datos clave -->
      <div class="detalle__fichas">
        <div class="ficha">
          <p class="ficha__etiqueta">📅 Duración</p>
          <p class="ficha__valor">${servicio.duracion}</p>
        </div>
        <div class="ficha">
          <p class="ficha__etiqueta">👨‍🏫 Instructor</p>
          <p class="ficha__valor">${servicio.instructor}</p>
        </div>
        <div class="ficha">
          <p class="ficha__etiqueta">🎓 Nivel</p>
          <p class="ficha__valor">${servicio.nivel}</p>
        </div>
        <div class="ficha">
          <p class="ficha__etiqueta">💰 Precio</p>
          <p class="ficha__valor">${servicio.precio}</p>
        </div>
      </div>

      <!-- Descripción completa -->
      <p class="detalle__descripcion-larga">${servicio.descripcionLarga}</p>

      <!-- Botones de acción -->
      <div class="detalle__botones">
        <!-- id="btn-favorito" para que JS lo pueda actualizar -->
        <button
          id="btn-favorito"
          class="btn btn--acento"
          onclick="toggleFavorito(${servicio.id})"
        >
          ♡ Agregar a Favoritos
        </button>

        <!-- Pasa el nombre del servicio como parámetro a contacto.html -->
        <a
          href="contacto.html?servicio=${encodeURIComponent(servicio.nombre)}"
          class="btn btn--primario"
        >
          ✉ Contactar
        </a>
      </div>

    </div>
  `;

  /* Paso 5:Actualiza el estado del botón de favoritos  */
  actualizarBotonFavorito(servicio.id);

  /*Paso 6: Carga servicios relacionados */
  const relacionados = servicios
    .filter(function (s) {
      return s.categoria === servicio.categoria && s.id !== servicio.id;
    })
    .slice(0, 3);

  const contenedorRelacionados = document.getElementById('contenedor-relacionados');

  if (relacionados.length === 0) {
    contenedorRelacionados.innerHTML = '<p style="color:var(--color-gris3);">No hay servicios relacionados.</p>';
  } else {
    relacionados.forEach(function (rel) {
      contenedorRelacionados.insertAdjacentHTML('beforeend', crearTarjetaRelacionada(rel));
    });
  }

});
