/* 
  Responsabilidades:
  - Mostrar todos los servicios en una tabla
  - Crear nuevos servicios (Crear del CRUD)
  - Eliminar servicios (Eliminar del CRUD)
*/


/*
  Creamos una copia del arreglo "servicios" para poder
  modificarla (agregar/eliminar) sin afectar los datos
  originales del archivo datos.js.
*/
let listaAdmin = [...servicios];

/* Generar una fila de la tabla  */

function crearFila(servicio) {
  return `
    <tr id="fila-${servicio.id}">
      <td>${servicio.id}</td>
      <td>${servicio.nombre}</td>
      <td><span class="badge-tabla">${servicio.categoria}</span></td>
      <td>${servicio.precio}</td>
      <td>
        <button
          class="btn btn--acento"
          style="padding:6px 16px; font-size:0.82rem;"
          onclick="eliminarServicio(${servicio.id})"
        >
          Eliminar
        </button>
      </td>
    </tr>
  `;
}

/* Renderiza la tabla completa  */
function renderizarTabla() {
  const cuerpo = document.getElementById('tabla-cuerpo');
  cuerpo.innerHTML = listaAdmin.map(crearFila).join('');
}

/*  Elimina un servicio  */
function eliminarServicio(id) {

  const confirmado = confirm('¿Estás seguro de que quieres eliminar este servicio?');

  if (confirmado) {
    listaAdmin = listaAdmin.filter(function (s) { return s.id !== id; });
    renderizarTabla();
  }
}

/* Obtiene el próximo id disponible  */
function siguienteId() {
  if (listaAdmin.length === 0) return 1;
  const ids = listaAdmin.map(function (s) { return s.id; });
  return Math.max(...ids) + 1;
}

function colorDeFondo(categoria) {
  const colores = {
    "Educación":  "#D6E4FF",
    "Tecnología": "#D4F5E9",
    "Turismo":    "#FFE8CC",
    "Comercio":   "#FFD6D6"
  };
  return colores[categoria] || "#E8ECF0";
}


/*  Inicio*/
document.addEventListener('DOMContentLoaded', function () {

  /* Muestra los servicios en la tabla al cargar */
  renderizarTabla();

  /* envia el formulario de crear servicio  */
  document.getElementById('formulario-admin').addEventListener('submit', function (evento) {

    evento.preventDefault();

    /* Lee los valores de cada campo */
    const nombre      = document.getElementById('admin-nombre').value.trim();
    const categoria   = document.getElementById('admin-categoria').value;
    const descripcion = document.getElementById('admin-descripcion').value.trim();
    const precio      = document.getElementById('admin-precio').value.trim();
    const instructor  = document.getElementById('admin-instructor').value.trim();
    const duracion    = document.getElementById('admin-duracion').value.trim();

    /*  Validaciones simples  */
    let hayError = false;

    if (nombre === '') {
      document.getElementById('error-admin-nombre').classList.add('visible');
      hayError = true;
    } else {
      document.getElementById('error-admin-nombre').classList.remove('visible');
    }

    if (categoria === '') {
      document.getElementById('error-admin-categoria').classList.add('visible');
      hayError = true;
    } else {
      document.getElementById('error-admin-categoria').classList.remove('visible');
    }

    if (descripcion === '') {
      document.getElementById('error-admin-descripcion').classList.add('visible');
      hayError = true;
    } else {
      document.getElementById('error-admin-descripcion').classList.remove('visible');
    }

    if (precio === '') {
      document.getElementById('error-admin-precio').classList.add('visible');
      hayError = true;
    } else {
      document.getElementById('error-admin-precio').classList.remove('visible');
    }

    /* Si hay errores, no continua */
    if (hayError) return;

    /* Crea el objeto del nuevo servicio  */
    const nuevoServicio = {
      id:               siguienteId(),
      nombre:           nombre,
      categoria:        categoria,
      descripcion:      descripcion,
      descripcionLarga: descripcion, 
      precio:           precio,
      duracion:         duracion || 'Por definir',
      instructor:       instructor || 'Por definir',
      nivel:            'Todos los niveles',
      valoracion:       '5.0',
      imagen:           '',
      colorFondo:       colorDeFondo(categoria)
    };

    /* Agrega el arreglo  */
    listaAdmin.push(nuevoServicio);

    /* Actualiza la tabla  */
    renderizarTabla();

    /* Limpia el formulario  */
    this.reset();

    /* Muestra confirmación  */
    const confirmacion = document.getElementById('confirm-admin');
    confirmacion.classList.add('visible');

    setTimeout(function () {
      confirmacion.classList.remove('visible');
    }, 3000);

  });

});
