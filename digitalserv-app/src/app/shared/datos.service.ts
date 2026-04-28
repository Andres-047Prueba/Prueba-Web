// ============================================================
// datos.service.ts
// Servicio central de datos. Se inyecta en todos los componentes
// que necesiten leer o escribir información.
//
// @Injectable({ providedIn: 'root' }) significa que Angular crea
// UNA SOLA instancia de este servicio para toda la aplicación.
// ============================================================
import { Injectable } from '@angular/core';

// Interfaz: define la "forma" exacta que debe tener un objeto Servicio
export interface Servicio {
  id             : number;
  nombre         : string;
  categoria      : string;
  descripcion    : string;
  descripcionLarga: string;
  precio         : string;
  duracion       : string;
  instructor     : string;
  nivel          : string;
  valoracion     : string;
  colorFondo     : string;
}

@Injectable({ providedIn: 'root' })
export class DatosService {

  // Datos base — 8 servicios por defecto
  private serviciosBase: Servicio[] = [
    { id:1, nombre:'Cursos Online',     categoria:'Educación',  colorFondo:'#D6E4FF',
      descripcion:'Aprende a tu ritmo con expertos en distintas áreas.',
      descripcionLarga:'Accede a cientos de cursos con profesionales certificados. Incluye certificados al finalizar.',
      precio:'$49.000 COP',  duracion:'Flexible',   instructor:'Varios expertos', nivel:'Todos los niveles',  valoracion:'4.8' },
    { id:2, nombre:'Dev Bootcamp',      categoria:'Tecnología', colorFondo:'#D4F5E9',
      descripcion:'Desarrolla apps web modernas con las tecnologías más demandadas.',
      descripcionLarga:'Bootcamp intensivo de 12 semanas. Proyectos reales, mentoría personalizada y certificado.',
      precio:'$199.000 COP', duracion:'12 semanas', instructor:'Carlos Ruiz',    nivel:'Intermedio',          valoracion:'4.9' },
    { id:3, nombre:'City Tours',        categoria:'Turismo',    colorFondo:'#FFE8CC',
      descripcion:'Explora la ciudad con guías expertos y vive experiencias únicas.',
      descripcionLarga:'Tours privados y grupales. Transporte incluido, guías bilingües y visitas históricas.',
      precio:'$89.000 COP',  duracion:'1 día',      instructor:'Ana Gómez',     nivel:'Para todos',           valoracion:'4.7' },
    { id:4, nombre:'E-Commerce',        categoria:'Comercio',   colorFondo:'#FFD6D6',
      descripcion:'Vende tus productos online y llega a miles de clientes.',
      descripcionLarga:'Tienda virtual desde cero: diseño, pagos, estrategia de ventas y soporte técnico.',
      precio:'$120.000 COP', duracion:'1 mes',      instructor:'Equipo Digital', nivel:'Básico',              valoracion:'4.6' },
    { id:5, nombre:'Diseño UX',         categoria:'Tecnología', colorFondo:'#E8D6FF',
      descripcion:'Crea interfaces digitales atractivas centradas en el usuario.',
      descripcionLarga:'Wireframes, prototipos y flujos de navegación usando Figma.',
      precio:'$159.000 COP', duracion:'8 semanas',  instructor:'Laura Pérez',   nivel:'Básico-Intermedio',    valoracion:'4.8' },
    { id:6, nombre:'Data Science',      categoria:'Educación',  colorFondo:'#D6F5FF',
      descripcion:'Analiza datos y genera información valiosa para tus decisiones.',
      descripcionLarga:'Python con Pandas, NumPy y Matplotlib. Proyecto final con datos reales.',
      precio:'$180.000 COP', duracion:'10 semanas', instructor:'Jhon Martínez', nivel:'Intermedio',           valoracion:'4.9' },
    { id:7, nombre:'Fotografía',        categoria:'Turismo',    colorFondo:'#FFF0D6',
      descripcion:'Captura momentos especiales con técnica profesional.',
      descripcionLarga:'Composición, iluminación y edición en locaciones turísticas. Equipo prestado.',
      precio:'$95.000 COP',  duracion:'2 días',     instructor:'Sofía López',   nivel:'Todos los niveles',    valoracion:'4.7' },
    { id:8, nombre:'Marketing Digital', categoria:'Comercio',   colorFondo:'#D6FFE8',
      descripcion:'Impulsa tu marca en redes sociales y alcanza más clientes.',
      descripcionLarga:'Gestión de redes, publicidad pagada y posicionamiento en Google.',
      precio:'$110.000 COP', duracion:'6 semanas',  instructor:'Diego Torres',  nivel:'Básico',               valoracion:'4.5' },
  ];

  // ── SERVICIOS ──────────────────────────────────────────────
  obtenerServicios(): Servicio[] {
    const guardados = localStorage.getItem('ds_servicios');
    if (guardados) return JSON.parse(guardados);
    localStorage.setItem('ds_servicios', JSON.stringify(this.serviciosBase));
    return this.serviciosBase;
  }

  agregarServicio(s: Servicio): void {
    const todos = this.obtenerServicios();
    todos.push(s);
    localStorage.setItem('ds_servicios', JSON.stringify(todos));
  }

  eliminarServicio(id: number): void {
    const filtrados = this.obtenerServicios().filter(s => s.id !== id);
    localStorage.setItem('ds_servicios', JSON.stringify(filtrados));
  }

  buscarServicio(id: number): Servicio | undefined {
    return this.obtenerServicios().find(s => s.id === id);
  }

  siguienteId(): number {
    const ids = this.obtenerServicios().map(s => s.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  // ── INSCRIPCIONES ──────────────────────────────────────────
  obtenerInscripciones(): number[] {
    return JSON.parse(localStorage.getItem('ds_inscripciones') || '[]');
  }

  estaInscrito(id: number): boolean {
    return this.obtenerInscripciones().includes(id);
  }

  inscribirse(id: number): void {
    if (!this.estaInscrito(id)) {
      const lista = this.obtenerInscripciones();
      lista.push(id);
      localStorage.setItem('ds_inscripciones', JSON.stringify(lista));
    }
  }

  cancelarInscripcion(id: number): void {
    const lista = this.obtenerInscripciones().filter(i => i !== id);
    localStorage.setItem('ds_inscripciones', JSON.stringify(lista));
  }

  obtenerClasesInscritas(): Servicio[] {
    const ids = this.obtenerInscripciones();
    return this.obtenerServicios().filter(s => ids.includes(s.id));
  }

  // ── FAVORITOS ──────────────────────────────────────────────
  obtenerFavoritos(): number[] {
    return JSON.parse(localStorage.getItem('ds_favoritos') || '[]');
  }

  esFavorito(id: number): boolean {
    return this.obtenerFavoritos().includes(id);
  }

  toggleFavorito(id: number): void {
    let favs = this.obtenerFavoritos();
    favs = this.esFavorito(id) ? favs.filter(f => f !== id) : [...favs, id];
    localStorage.setItem('ds_favoritos', JSON.stringify(favs));
  }

  limpiarFavoritos(): void {
    localStorage.removeItem('ds_favoritos');
  }

  colorCategoria(categoria: string): string {
    const colores: { [key: string]: string } = {
      'Educación': '#D6E4FF', 'Tecnología': '#D4F5E9',
      'Turismo':   '#FFE8CC', 'Comercio':   '#FFD6D6'
    };
    return colores[categoria] || '#E8ECF0';
  }
}
