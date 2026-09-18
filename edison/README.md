# Portafolio Profesional — Edison Vidal Ospina Corredor

![React](https://img.shields.io/badge/React-19.3.0-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![React Doctor](https://img.shields.io/badge/React_Doctor-100%2F100-00D8FF?logo=react&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-54%20passed%20(100%25)-brightgreen?logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.x%20(Flat%20Config)-4B32C3?logo=eslint&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2.3-7952B3?logo=bootstrap&logoColor=white)

Plataforma web profesional y portafolio interactivo de **Edison Vidal Ospina Corredor**, Senior Frontend Engineer y UI Architect con más de 18 años de trayectoria liderando la conceptualización, arquitectura y modernización de plataformas corporativas de misión crítica.

---

## 🚀 Características Principales

* **Saludo contextual dinámico:** Calcula en tiempo real el saludo (*Buenos Días / Buenas Tardes / Buenas Noches*) y adapta la ambientación visual según la hora local.
* **Estado en tiempo real (`HomeStatus`):**
  * **Reloj local (`LocalClock`):** Sincronizado dinámicamente con la zona horaria del visitante mediante la API nativa `Intl.DateTimeFormat`.
  * **Clima en vivo (`WeatherCard`):** Consulta meteorológica en tiempo real mediante Open-Meteo y geolocalización con degradación elegante (*graceful degradation*).
* **Galería interactiva de proyectos:** Carrusel touch responsivo implementado con `Swiper` y navegación optimizada con botones accesibles (`aria-label`).
* **SEO & Datos Estructurados:** Integración de Schema.org en formato JSON-LD (`StructuredData`) optimizado para indexación en motores de búsqueda (Google) y redes profesionales.
* **Calidad de código y testing integral:** Suite de 54 pruebas unitarias con Jest + Testing Library y doble anillo de calidad con ESLint 9 + React Doctor (Puntaje 100/100).
* **Skill de Protección Continua:** Protocolo de seguridad integrado en el repositorio para evitar regresiones o daños en futuras modificaciones.

---

## 🛠️ Stack Tecnológico

### Core & Framework
* **[React 19.3](https://react.dev/):** Biblioteca para interfaces reactivas con soporte nativo de acciones, `ref` estándar y alto rendimiento.
* **[Vite 8](https://vitejs.dev/):** Entorno de desarrollo ultrarrápido y empaquetador para producción basado en Rollup y ES Modules.

### UI & Estilos
* **Bootstrap 5.2 & React-Bootstrap 2.10:** Sistema de rejilla responsiva y componentes UI accesibles.
* **Swiper 12.1:** Carruseles táctiles para presentación fluida del portafolio.
* **FontAwesome:** Iconografía vectorial interactiva.

### Servicios & Datos
* **Open-Meteo API:** Consulta meteorológica en tiempo real (gratuita y sin dependencias de API keys).
* **Nominatim OpenStreetMap:** Geocodificación inversa para resolución de ciudades.

### Calidad & Testing
* **ESLint 9 (Flat Config):** Validación sintáctica, estándares de ECMAScript y reglas de React Hooks.
* **React Doctor (Million.js):** Diagnóstico de salud con puntaje **100/100** en accesibilidad (WCAG), rendimiento y estándares de React 19.
* **Jest 30 + Babel:** Test runner y compilador para pruebas unitarias con cobertura > 84%.
* **@testing-library/react (v16) & @testing-library/dom (v10):** Pruebas unitarias orientadas al comportamiento del usuario final.

---

## 📂 Arquitectura del Proyecto

El código fuente sigue una **arquitectura modular y desacoplada** con estricta separación de responsabilidades:
* **🖼️ Capa de Presentación (JSX puro):** Componentes visuales semánticos, limpios y libres de estilos en línea (`style={{ ... }}`).
* **🧠 Capa de Lógica / Estado (Hooks & Servicios):** Encapsulación de extracción de datos, filtrado y normalización (`useProfile.js`, `contact.service.js`).
* **🎨 Capa de Estilos (CSS Modular):** Hojas de estilo dedicadas e independientes por sección en `src/assets/style/` (`profile.css`, `work.css`, etc.).
* **✨ Clean Code:** Nomenclatura descriptiva y legible; prohibidas variables de una sola letra (`i`, `raw`, etc.) o bucles imperativos opacos.

```text
edison/
├── __mocks__/                  # Mocks estáticos de Jest (CSS e imágenes)
├── public/                     # Activos estáticos públicos
├── src/
│   ├── assets/                 # Estilos CSS modulares, imágenes y fuentes web
│   │   └── style/              # profile.css, work.css, contact.css, layout.css, etc.
│   ├── components/             # Componentes React organizados por dominio
│   │   ├── contact/            # Formulario de contacto y testimonios
│   │   ├── estudies/           # Educación y certificaciones
│   │   ├── footer/             # Pie de página y enlaces sociales
│   │   ├── header/             # Encabezado, navegación, portada, reloj y clima
│   │   ├── profile/            # Perfil profesional (Profile.jsx, useProfile.js, Skills.jsx)
│   │   ├── proyects/           # Portafolio interactivo de proyectos
│   │   ├── seo/                # Inyección de Structured Data (JSON-LD)
│   │   └── work/               # Experiencia laboral y trayectoria
│   ├── data/                   # Información centralizada del portafolio (Info.jsx)
│   ├── interfaces/             # Definiciones de tipos y contratos (JSDoc)
│   ├── models/                 # Modelos de datos y factory functions inmutables
│   ├── services/               # Servicios desacoplados de geolocalización y clima
│   ├── App.jsx                 # Componente raíz de la aplicación
│   ├── main.jsx                # Punto de entrada de React en el DOM
│   └── setupTests.js           # Configuración global para pruebas con jest-dom
├── .gitignore
├── babel.config.cjs            # Configuración de Babel para Jest
├── doctor.config.json          # Reglas y exclusiones para React Doctor
├── eslint.config.js            # Configuración modular (Flat Config) de ESLint 9
├── jest.config.cjs             # Configuración del entorno de pruebas unitarias
├── package.json
└── vite.config.js              # Configuración de Vite
```

---

## 📋 Requisitos Previos

* **Node.js:** Versión `>= 18.0.0` (recomendada versión LTS).
* **npm:** Versión `>= 9.0.0`.

---

## ⚙️ Instalación y Puesta en Marcha

1. **Instalar dependencias:**
   ```powershell
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```powershell
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:5173`.

3. **Ejecutar la suite de pruebas unitarias:**
   ```powershell
   npm test
   ```

4. **Generar el empaquetado de producción:**
   ```powershell
   npm run build
   ```

---

## 🧪 Scripts Disponibles

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con Hot Module Replacement (HMR). |
| `npm run build` | Compila y optimiza el proyecto para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el empaquetado de producción generado. |
| `npm test` | Ejecuta la suite de 54 pruebas unitarias con Jest. |
| `npm run test:watch` | Ejecuta las pruebas en modo interactivo y reacciona a cambios de código. |
| `npm run test:coverage` | Genera un reporte detallado con el porcentaje de cobertura de código (>84%). |
| `npm run lint` | Analiza el código con ESLint para detectar errores de sintaxis o variables huérfanas. |
| `npm run lint:fix` | Aplica correcciones automáticas de formato y reglas de ESLint. |
| `npm run doctor` | Ejecuta el diagnóstico de salud de React Doctor (Puntaje 100/100). |
| `npm run doctor:verbose` | Muestra el reporte extendido de cada regla evaluada por React Doctor. |
| **`npm run check`** | **Modo estricto**: Ejecuta ESLint y React Doctor secuencialmente sin modificar código. |
| **`npm run check:fix`** | **Modo productivo**: Corrige con ESLint y luego audita con React Doctor. |

---

## 🛡️ Control de Calidad y Deuda Técnica

El proyecto implementa una arquitectura de calidad en dos capas sincronizadas:

1. **ESLint 9:** Se encarga de la consistencia sintáctica, el ciclo de vida de los Hooks (`eslint-plugin-react-hooks`) y la eliminación de código muerto (`no-unused-vars`).
2. **React Doctor:** Audita la accesibilidad WCAG (etiquetas `alt`, atributos de formularios), seguridad en enlaces (`rel="noreferrer"`) y patrones de rendimiento en componentes (Puntaje 100/100).
3. **Alineación garantizada:** Mediante [doctor.config.json](./doctor.config.json) y [eslint.config.js](./eslint.config.js) se garantiza que ninguna regla entre en conflicto de ordenamiento o sobreescritura con la otra.

---

## 👤 Autor

* **Edison Vidal Ospina Corredor**
* **Rol:** Senior Frontend Engineer & UI Architect | Technical Lead
* **LinkedIn:** [linkedin.com/in/edison-ospina](https://www.linkedin.com/in/edison-ospina)
* **Sitio Web:** [edisonospina.netlify.app](https://edisonospina.netlify.app)
