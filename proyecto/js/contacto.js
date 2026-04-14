/*
  Responsabilidades:
  - Prellenar el asunto si viene el parámetro ?servicio=X en la URL
  - Validar cada campo del formulario
  - Mostrar mensajes de error individuales
  - Mostrar confirmación de envío exitoso
*/


/* Muestra mensaje de error de un campo  */

function mostrarError(idCampo, idError) {
  document.getElementById(idCampo).classList.add('campo-error');
  document.getElementById(idError).classList.add('visible');
}


/* Quita el mensaje de error de un campo  */
function quitarError(idCampo, idError) {
  document.getElementById(idCampo).classList.remove('campo-error');
  document.getElementById(idError).classList.remove('visible');
}

/* Valida el formulario completo  */
function validarFormulario() {

  let formularioValido = true; 

  /* Valida nombre  */
  const nombre = document.getElementById('nombre').value.trim();
  if (nombre === '') {
    mostrarError('nombre', 'error-nombre');
    formularioValido = false;
  } else {
    quitarError('nombre', 'error-nombre');
  }

  /*  Valida correo  */
  const correo = document.getElementById('correo').value.trim();
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correo === '' || !regexCorreo.test(correo)) {
    mostrarError('correo', 'error-correo');
    formularioValido = false;
  } else {
    quitarError('correo', 'error-correo');
  }

  /*  Validar asunto  */
  const asunto = document.getElementById('asunto').value.trim();
  if (asunto === '') {
    mostrarError('asunto', 'error-asunto');
    formularioValido = false;
  } else {
    quitarError('asunto', 'error-asunto');
  }

  /*  Valida mensaje  */
  const mensaje = document.getElementById('mensaje').value.trim();
  if (mensaje === '') {
    mostrarError('mensaje', 'error-mensaje');
    formularioValido = false;
  } else {
    quitarError('mensaje', 'error-mensaje');
  }

  /*  Valida checkbox de términos  */
  const terminos = document.getElementById('terminos').checked;
  if (!terminos) {
    document.getElementById('error-terminos').classList.add('visible');
    formularioValido = false;
  } else {
    document.getElementById('error-terminos').classList.remove('visible');
  }

  return formularioValido;
}

/* Inicio */
document.addEventListener('DOMContentLoaded', function () {

  /* Prellena  el asunto desde URL  */

  const params = new URLSearchParams(window.location.search);
  const servicio = params.get('servicio');

  if (servicio) {
    document.getElementById('asunto').value = 'Consulta sobre: ' + servicio;
  }

  /* Validación en tiempo real  */

  document.getElementById('nombre').addEventListener('blur', function () {
    if (this.value.trim() === '') {
      mostrarError('nombre', 'error-nombre');
    } else {
      quitarError('nombre', 'error-nombre');
    }
  });

  document.getElementById('correo').addEventListener('blur', function () {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() === '' || !regex.test(this.value.trim())) {
      mostrarError('correo', 'error-correo');
    } else {
      quitarError('correo', 'error-correo');
    }
  });

  document.getElementById('asunto').addEventListener('blur', function () {
    if (this.value.trim() === '') {
      mostrarError('asunto', 'error-asunto');
    } else {
      quitarError('asunto', 'error-asunto');
    }
  });

  document.getElementById('mensaje').addEventListener('blur', function () {
    if (this.value.trim() === '') {
      mostrarError('mensaje', 'error-mensaje');
    } else {
      quitarError('mensaje', 'error-mensaje');
    }
  });

  /*  envío del formulario  */
  document.getElementById('formulario-contacto').addEventListener('submit', function (evento) {

    evento.preventDefault();

    /* Valida todos los campos */
    const esValido = validarFormulario();

    if (esValido) {
      /* muestra el mensaje de confirmación */
      const confirmacion = document.getElementById('confirmacion');
      confirmacion.classList.add('visible');

      /* Limpia el formulario */
      this.reset();

      /* Oculta la confirmación después de 5 segundos */
      setTimeout(function () {
        confirmacion.classList.remove('visible');
      }, 5000);

      confirmacion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

});
