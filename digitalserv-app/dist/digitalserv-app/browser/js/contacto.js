function mostrarError(campo, errorId) {
  document.getElementById(campo).classList.add('campo-error');
  document.getElementById(errorId).classList.add('visible');
}
function quitarError(campo, errorId) {
  document.getElementById(campo).classList.remove('campo-error');
  document.getElementById(errorId).classList.remove('visible');
}

function validar() {
  let ok = true;
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nombre = document.getElementById('nombre').value.trim();
  if (!nombre)                              { mostrarError('nombre','error-nombre'); ok=false; } else quitarError('nombre','error-nombre');

  const correo = document.getElementById('correo').value.trim();
  if (!regexMail.test(correo))             { mostrarError('correo','error-correo'); ok=false; } else quitarError('correo','error-correo');

  const asunto = document.getElementById('asunto').value.trim();
  if (!asunto)                              { mostrarError('asunto','error-asunto'); ok=false; } else quitarError('asunto','error-asunto');

  const mensaje = document.getElementById('mensaje').value.trim();
  if (!mensaje)                             { mostrarError('mensaje','error-mensaje'); ok=false; } else quitarError('mensaje','error-mensaje');

  const terminos = document.getElementById('terminos').checked;
  if (!terminos) { document.getElementById('error-terminos').classList.add('visible'); ok=false; }
  else             document.getElementById('error-terminos').classList.remove('visible');

  return ok;
}

document.addEventListener('DOMContentLoaded', function () {
  const sv = new URLSearchParams(window.location.search).get('servicio');
  if (sv) document.getElementById('asunto').value = 'Consulta sobre: ' + sv;

  ['nombre','correo','asunto','mensaje'].forEach(id => {
    document.getElementById(id).addEventListener('blur', function() {
      if (!this.value.trim()) mostrarError(id,'error-'+id); else quitarError(id,'error-'+id);
    });
  });

  document.getElementById('formulario-contacto').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validar()) return;
    const c = document.getElementById('confirmacion');
    c.classList.add('visible');
    this.reset();
    setTimeout(() => c.classList.remove('visible'), 5000);
    c.scrollIntoView({ behavior:'smooth', block:'center' });
  });
});
