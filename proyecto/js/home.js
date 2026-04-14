/* 
  Responsabilidades:
  - Mostrar los primeros 4 servicios como "destacados"
  - Renderizar los testimonios
*/

/*  Testimonios */
/* información de cada testimonio */
const testimonios = [
  {
    iniciales: "MG",
    nombre: "María G.",
    texto: '"Encontré el curso perfecto para avanzar en mi carrera. La plataforma es muy intuitiva y los instructores son excelentes."'
  },
  {
    iniciales: "CR",
    nombre: "Carlos R.",
    texto: '"Los servicios son de altísima calidad. El Dev Bootcamp cambió mi vida profesional por completo. Muy recomendado."'
  },
  {
    iniciales: "LM",
    nombre: "Luisa M.",
    texto: '"Increíble variedad de servicios. Desde el primer día me sentí acompañada. La atención al cliente es excepcional."'
  }
];

/*  Genera tarjeta de servicio  */
/*
  Esta función recibe un objeto "servicio" y devuelve
  el código HTML de la tarjeta como texto y luego ese texto se inserta en el DOM con innerHTML.
*/
function crearTarjeta(servicio) {
  return `
    <div class="tarjeta">
      <!-- Imagen con color de fondo según categoría -->
      <div class="tarjeta__imagen" style="background-color: ${servicio.colorFondo};">
        ${obtenerIcono(servicio.categoria)}
      </div>

      <div class="tarjeta__cuerpo">
        <span class="tarjeta__categoria">${servicio.categoria}</span>
        <h3 class="tarjeta__nombre">${servicio.nombre}</h3>
        <p class="tarjeta__descripcion">${servicio.descripcion}</p>
      </div>

      <div class="tarjeta__pie">
        <!-- Al hacer clic, va a detalle.html y pasa el id por URL -->
        <a href="detalle.html?id=${servicio.id}" class="btn btn--primario btn--bloque">
          Ver Detalle &rarr;
        </a>
      </div>
    </div>
  `;
}

/*  Devuelve el ícono según la categoría  */
function obtenerIcono(categoria) {
  const iconos = {
    "Educación":  "📚",
    "Tecnología": "💻",
    "Turismo":    "🗺️",
    "Comercio":   "🛒"
  };
  /* Si no encuentra la categoría, muestra una estrella por defecto */
  return iconos[categoria] || "⭐";
}

/*  Genera la tarjeta de testimonio  */
function crearTestimonio(testimonio) {
  return `
    <div class="testimonio-card">
      <div class="testimonio-card__cabeza">
        <div class="testimonio-card__avatar">${testimonio.iniciales}</div>
        <div>
          <p class="testimonio-card__nombre">${testimonio.nombre}</p>
          <p class="testimonio-card__estrellas">★★★★★</p>
        </div>
      </div>
      <p class="testimonio-card__texto">${testimonio.texto}</p>
    </div>
  `;
}

/*
  document.addEventListener('DOMContentLoaded', ...) asegura
  que el HTML ya esté listo antes de manipular el DOM.
*/
document.addEventListener('DOMContentLoaded', function () {

  /* Tomamos solo los primeros 4 servicios */
  const destacados = servicios.slice(0, 4);

  /* Busca el contenedor donde irán las tarjetas */
  const contenedorDestacados = document.getElementById('contenedor-destacados');

  /* Recorre cada servicio y lo convertimos en tarjeta HTML */
  destacados.forEach(function (servicio) {
    /* insertAdjacentHTML agrega HTML sin borrar lo que ya hay */
    contenedorDestacados.insertAdjacentHTML('beforeend', crearTarjeta(servicio));
  });

  /* lo mismo con los testimonios */
  const contenedorTestimonios = document.getElementById('contenedor-testimonios');

  testimonios.forEach(function (testimonio) {
    contenedorTestimonios.insertAdjacentHTML('beforeend', crearTestimonio(testimonio));
  });

});
