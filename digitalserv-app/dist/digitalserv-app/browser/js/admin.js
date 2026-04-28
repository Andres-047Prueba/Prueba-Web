function colorFondo(cat) {
  return { "Educación":"#D6E4FF","Tecnología":"#D4F5E9","Turismo":"#FFE8CC","Comercio":"#FFD6D6" }[cat] || "#E8ECF0";
}

function crearFila(s) {
  return `<tr id="fila-${s.id}">
    <td>${s.id}</td>
    <td>${s.nombre}</td>
    <td><span class="badge-tabla">${s.categoria}</span></td>
    <td>${s.precio}</td>
    <td>
      <button class="btn btn--acento" style="padding:6px 16px;font-size:0.82rem;" onclick="eliminar(${s.id})">
        🗑 Eliminar
      </button>
    </td>
  </tr>`;
}

function renderizarTabla() {
  const todos = db_obtenerServicios();
  document.getElementById('tabla-cuerpo').innerHTML = todos.map(crearFila).join('');
  const cont = document.getElementById('contador-servicios');
  if (cont) cont.textContent = todos.length + ' servicios en total';
}

function eliminar(id) {
  if (!confirm('¿Eliminar este servicio?')) return;
  db_eliminarServicio(id);
  renderizarTabla();
}

document.addEventListener('DOMContentLoaded', function () {
  renderizarTabla();

  document.getElementById('formulario-admin').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre      = document.getElementById('admin-nombre').value.trim();
    const categoria   = document.getElementById('admin-categoria').value;
    const descripcion = document.getElementById('admin-descripcion').value.trim();
    const precio      = document.getElementById('admin-precio').value.trim();
    const instructor  = document.getElementById('admin-instructor').value.trim();
    const duracion    = document.getElementById('admin-duracion').value.trim();

    /* Validaciones */
    let error = false;
    [['admin-nombre','error-admin-nombre', nombre],
     ['admin-categoria','error-admin-categoria', categoria],
     ['admin-descripcion','error-admin-descripcion', descripcion],
     ['admin-precio','error-admin-precio', precio]
    ].forEach(([campo, errId, val]) => {
      const errEl = document.getElementById(errId);
      if (!val) { errEl.classList.add('visible'); error = true; }
      else        errEl.classList.remove('visible');
    });

    if (error) return;

    db_agregarServicio({
      id: db_siguienteId(), nombre, categoria, descripcion,
      descripcionLarga: descripcion,
      precio,
      duracion:    duracion   || 'Por definir',
      instructor:  instructor || 'Por definir',
      nivel:       'Todos los niveles',
      valoracion:  '5.0',
      imagen:      '',
      colorFondo:  colorFondo(categoria)
    });

    renderizarTabla();
    this.reset();

    const c = document.getElementById('confirm-admin');
    c.classList.add('visible');
    setTimeout(() => c.classList.remove('visible'), 3000);
  });
});
