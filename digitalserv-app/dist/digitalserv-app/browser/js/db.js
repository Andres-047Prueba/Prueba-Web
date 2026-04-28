function db_obtenerServicios() {
  const g = localStorage.getItem('ds_servicios');
  if (g) return JSON.parse(g);
  localStorage.setItem('ds_servicios', JSON.stringify(servicios));
  return servicios;
}
function db_guardarServicios(arr) { localStorage.setItem('ds_servicios', JSON.stringify(arr)); }
function db_agregarServicio(s)    { const a = db_obtenerServicios(); a.push(s); db_guardarServicios(a); }
function db_eliminarServicio(id)  { db_guardarServicios(db_obtenerServicios().filter(s => s.id !== id)); }
function db_buscarServicio(id)    { return db_obtenerServicios().find(s => s.id === id); }
function db_siguienteId()         { const ids = db_obtenerServicios().map(s => s.id); return ids.length ? Math.max(...ids)+1 : 1; }


function db_obtenerInscripciones()  { return JSON.parse(localStorage.getItem('ds_inscripciones') || '[]'); }
function db_guardarInscripciones(a) { localStorage.setItem('ds_inscripciones', JSON.stringify(a)); }
function db_estaInscrito(id)        { return db_obtenerInscripciones().includes(id); }
function db_inscribirse(id)         { if (!db_estaInscrito(id)) { const a = db_obtenerInscripciones(); a.push(id); db_guardarInscripciones(a); } }
function db_cancelarInscripcion(id) { db_guardarInscripciones(db_obtenerInscripciones().filter(i => i !== id)); }
function db_obtenerClasesInscritas(){ const ids = db_obtenerInscripciones(); return db_obtenerServicios().filter(s => ids.includes(s.id)); }


function db_obtenerFavoritos()  { return JSON.parse(localStorage.getItem('ds_favoritos') || '[]'); }
function db_esFavorito(id)      { return db_obtenerFavoritos().includes(id); }
function db_toggleFavorito(id)  {
  let f = db_obtenerFavoritos();
  f = db_esFavorito(id) ? f.filter(x => x !== id) : [...f, id];
  localStorage.setItem('ds_favoritos', JSON.stringify(f));
}
function db_limpiarFavoritos()  { localStorage.removeItem('ds_favoritos'); }
