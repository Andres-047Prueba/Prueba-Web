const testimonios = [
  { iniciales:"MG", nombre:"María G.",  texto:'"Encontré el curso perfecto. La plataforma es muy intuitiva y los instructores son excelentes."' },
  { iniciales:"CR", nombre:"Carlos R.", texto:'"El Dev Bootcamp cambió mi vida profesional. Los servicios son de altísima calidad."' },
  { iniciales:"LM", nombre:"Luisa M.", texto:'"Increíble variedad de servicios. Desde el primer día me sentí muy acompañada."' }
];

function iconoCategoria(cat) {
  return { "Educación":"📚","Tecnología":"💻","Turismo":"🗺️","Comercio":"🛒" }[cat] || "⭐";
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

function crearTestimonio(t) {
  return `<div class="testimonio-card">
    <div class="testimonio-card__cabeza">
      <div class="testimonio-card__avatar">${t.iniciales}</div>
      <div>
        <p class="testimonio-card__nombre">${t.nombre}</p>
        <p class="testimonio-card__estrellas">★★★★★</p>
      </div>
    </div>
    <p class="testimonio-card__texto">${t.texto}</p>
  </div>`;
}

document.addEventListener('DOMContentLoaded', function () {
  const destacados = db_obtenerServicios().slice(0, 4);
  document.getElementById('contenedor-destacados').innerHTML = destacados.map(crearTarjeta).join('');
  document.getElementById('contenedor-testimonios').innerHTML = testimonios.map(crearTestimonio).join('');
});
