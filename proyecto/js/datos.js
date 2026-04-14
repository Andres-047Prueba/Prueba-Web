/* 
  datos.js
  Archivo de datos: contiene el arreglo de servicios
  que se usa en todas las páginas del proyecto.
  Actúa como base de datos local (simulando un JSON).
*/

const servicios = [
  {
    id: 1,
    nombre: "Cursos Online",
    categoria: "Educación",
    descripcion: "Aprende a tu ritmo con expertos en distintas áreas del conocimiento.",
    descripcionLarga: "Accede a cientos de cursos en línea dictados por profesionales certificados. Aprende programación, diseño, idiomas, negocios y mucho más desde la comodidad de tu hogar. Incluye certificados al finalizar cada curso.",
    precio: "$49.000 COP",
    duracion: "Flexible",
    instructor: "Varios expertos",
    nivel: "Todos los niveles",
    valoracion: "4.8",
    imagen: "img/educacion.png",
    colorFondo: "#D6E4FF"
  },
  {
    id: 2,
    nombre: "Dev Bootcamp",
    categoria: "Tecnología",
    descripcion: "Desarrolla aplicaciones web modernas con las tecnologías más demandadas.",
    descripcionLarga: "Bootcamp intensivo de desarrollo web donde aprenderás HTML, CSS, JavaScript y más. El programa incluye proyectos reales, mentoría personalizada y acompañamiento hasta conseguir empleo. Duración de 12 semanas.",
    precio: "$199.000 COP",
    duracion: "12 semanas",
    instructor: "Carlos Ruiz",
    nivel: "Intermedio",
    valoracion: "4.9",
    imagen: "img/tecnologia.png",
    colorFondo: "#D4F5E9"
  },
  {
    id: 3,
    nombre: "City Tours",
    categoria: "Turismo",
    descripcion: "Explora la ciudad con guías expertos y vive experiencias únicas.",
    descripcionLarga: "Recorre los lugares más emblemáticos de la ciudad con guías certificados. Ofrecemos tours privados y grupales, transporte incluido, guías bilingües y visitas a sitios históricos, gastronómicos y culturales.",
    precio: "$89.000 COP",
    duracion: "1 día",
    instructor: "Ana Gómez",
    nivel: "Para todos",
    valoracion: "4.7",
    imagen: "img/turismo.png",
    colorFondo: "#FFE8CC"
  },
  {
    id: 4,
    nombre: "E-Commerce",
    categoria: "Comercio",
    descripcion: "Vende tus productos online y llega a miles de clientes digitales.",
    descripcionLarga: "Configuramos y gestionamos tu tienda virtual desde cero. Incluye diseño de tienda, integración de pagos, estrategia de ventas y soporte técnico permanente. Aumenta tus ventas sin salir de casa.",
    precio: "$120.000 COP",
    duracion: "1 mes",
    instructor: "Equipo Digital",
    nivel: "Básico",
    valoracion: "4.6",
    imagen: "img/comercio.png",
    colorFondo: "#FFD6D6"
  },
  {
    id: 5,
    nombre: "Diseño UX",
    categoria: "Tecnología",
    descripcion: "Crea interfaces digitales atractivas centradas en el usuario.",
    descripcionLarga: "Aprende los fundamentos del diseño de experiencia de usuario. Crearás wireframes, prototipos y flujos de navegación usando herramientas como Figma. Ideal para diseñadores y desarrolladores.",
    precio: "$159.000 COP",
    duracion: "8 semanas",
    instructor: "Laura Pérez",
    nivel: "Básico - Intermedio",
    valoracion: "4.8",
    imagen: "img/ux.png",
    colorFondo: "#E8D6FF"
  },
  {
    id: 6,
    nombre: "Data Science",
    categoria: "Educación",
    descripcion: "Analiza datos y genera información valiosa para la toma de decisiones.",
    descripcionLarga: "Curso completo de ciencia de datos con Python. Aprenderás a limpiar, analizar y visualizar datos usando bibliotecas como Pandas, NumPy y Matplotlib. Incluye proyecto final con datos reales.",
    precio: "$180.000 COP",
    duracion: "10 semanas",
    instructor: "Jhon Martínez",
    nivel: "Intermedio",
    valoracion: "4.9",
    imagen: "img/data.png",
    colorFondo: "#D6F5FF"
  },
  {
    id: 7,
    nombre: "Fotografía",
    categoria: "Turismo",
    descripcion: "Captura momentos especiales con técnica profesional en locaciones únicas.",
    descripcionLarga: "Recorre lugares turísticos mientras aprendes fotografía profesional. Un instructor te guiará en composición, iluminación y edición. Incluye equipo básico prestado y galería digital de tus fotos.",
    precio: "$95.000 COP",
    duracion: "2 días",
    instructor: "Sofía López",
    nivel: "Todos los niveles",
    valoracion: "4.7",
    imagen: "img/foto.png",
    colorFondo: "#FFF0D6"
  },
  {
    id: 8,
    nombre: "Marketing Digital",
    categoria: "Comercio",
    descripcion: "Impulsa tu marca en redes sociales y alcanza más clientes.",
    descripcionLarga: "Aprende a gestionar redes sociales, crear campañas de publicidad pagada y posicionar tu marca en Google. Incluye estrategias reales, plantillas y acceso a herramientas premium durante el curso.",
    precio: "$110.000 COP",
    duracion: "6 semanas",
    instructor: "Diego Torres",
    nivel: "Básico",
    valoracion: "4.5",
    imagen: "img/marketing.png",
    colorFondo: "#D6FFE8"
  }
];
