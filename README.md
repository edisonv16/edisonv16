# Portafolio Profesional — Edison Vidal Ospina Corredor

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0.0-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?logo=eslint&logoColor=white)
![React Doctor](https://img.shields.io/badge/React_Doctor-0.9.x-00D8FF?logo=react&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-30.x-C21325?logo=jest&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2.3-7952B3?logo=bootstrap&logoColor=white)

Plataforma web profesional y portafolio interactivo de **Edison Vidal Ospina Corredor**, Senior Frontend Engineer y UI Architect con más de 18 años de trayectoria (desde 2008) liderando la conceptualización, arquitectura y modernización de plataformas corporativas de misión crítica.

> **Ubicación del código fuente:** El proyecto de React reside en la carpeta [`edison/`](./edison/).

---

## 🚀 Características Principales

* **Saludo contextual dinámico:** Calcula en tiempo real el saludo (*Buenos Días / Buenas Tardes / Buenas Noches*) y adapta la ambientación visual según la hora local.
* **Estado en tiempo real (`HomeStatus`):**
  * **Reloj local (`LocalClock`):** Sincronizado dinámicamente con la zona horaria del visitante mediante la API nativa `Intl.DateTimeFormat`.
  * **Clima en vivo (`WeatherCard`):** Consulta meteorológica en tiempo real mediante Open-Meteo y geolocalización con degradación elegante (*graceful degradation*).
* **Galería interactiva de proyectos:** Carrusel touch responsivo implementado con `Swiper` y efectos de cubierta (*Coverflow*).
* **SEO & Datos Estructurados:** Integración de Schema.org en formato JSON-LD (`StructuredData`) optimizado para indexación en motores de búsqueda (Google) y redes profesionales.
* **Calidad de código y testing integral:** Suite de pruebas unitarias con Jest + Testing Library y doble anillo de calidad con ESLint 9 + React Doctor.

---

## 🛠️ Stack Tecnológico

### Core & Framework
* **[React 18.2](https://react.dev/):** Biblioteca para interfaces reactivas con renderizado concurrente.
* **[Vite 8.0](https://vitejs.dev/):** Entorno de desarrollo rápido y empaquetador para producción basado en Rollup y ES Modules.

### UI & Estilos
* **Bootstrap 5.2 & React-Bootstrap 2.7:** Sistema de rejilla responsiva y componentes UI.
* **Swiper 12.1:** Carruseles táctiles para presentación de portafolios.
* **FontAwesome:** Iconografía vectorial interactiva.

### Servicios & Datos
* **Open-Meteo API:** Consulta meteorológica en tiempo real (gratuita y sin dependencias de API keys).
* **Nominatim OpenStreetMap:** Geocodificación inversa para resolución de ciudades.

### Calidad & Testing
* **ESLint 9 (Flat Config):** Validación sintáctica, estándares de ECMAScript y reglas de React Hooks.
* **React Doctor (Million.js):** Diagnóstico de salud, accesibilidad (a11y), rendimiento y anti-patrones en React.
* **Jest 30 + Babel:** Test runner y compilador para pruebas unitarias.
* **@testing-library/react & @testing-library/jest-dom:** Pruebas unitarias orientadas al comportamiento del usuario final.

---

## 📂 Arquitectura del Proyecto

```text
edisonv16/
├── edison/                     # Aplicación React + Vite
│   ├── __mocks__/              # Mocks estáticos de Jest (CSS e imágenes)
│   ├── public/                 # Activos estáticos públicos
│   ├── src/
│   │   ├── assets/             # Estilos CSS, imágenes y fuentes web
│   │   ├── components/         # Componentes React organizados por dominio
│   │   │   ├── contact/        # Formulario de contacto y microformatos
│   │   │   ├── estudies/       # Sección de educación y certificaciones
│   │   │   ├── footer/         # Pie de página y enlaces sociales
│   │   │   ├── header/         # Encabezado, navegación, portada, reloj y clima
│   │   │   ├── profile/        # Perfil profesional y matriz de habilidades
│   │   │   ├── proyects/       # Portafolio interactivo de proyectos
│   │   │   ├── seo/            # Inyección de Structured Data (JSON-LD)
│   │   │   └── work/           # Experiencia laboral y trayectoria
│   │   ├── data/               # Información centralizada del portafolio (Info.jsx)
│   │   ├── interfaces/         # Definiciones de tipos y contratos (JSDoc)
│   │   ├── models/             # Modelos de datos y factory functions inmutables
│   │   ├── services/           # Servicios desacoplados de geolocalización y clima
│   │   ├── App.jsx             # Componente raíz de la aplicación
│   │   ├── main.jsx            # Punto de entrada de React en el DOM
│   │   └── setupTests.js       # Configuración global para pruebas con jest-dom
│   ├── babel.config.cjs        # Configuración de Babel para Jest
│   ├── doctor.config.json      # Reglas y exclusiones para React Doctor
│   ├── eslint.config.js        # Configuración modular (Flat Config) de ESLint 9
│   ├── jest.config.cjs         # Configuración del entorno de pruebas unitarias
│   ├── package.json
│   └── vite.config.js          # Configuración de Vite
└── README.md
```

---

## ⚙️ Instalación y Puesta en Marcha

1. **Acceder a la carpeta del proyecto:**
   ```powershell
   cd edison
   ```

2. **Instalar dependencias:**
   ```powershell
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```powershell
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:5173`.

4. **Ejecutar pruebas unitarias:**
   ```powershell
   npm test
   ```

5. **Verificación de calidad (ESLint + React Doctor):**
   ```powershell
   npm run check
   ```

---

## 🧪 Scripts Disponibles

Desde la carpeta `edison/`:

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con Hot Module Replacement (HMR). |
| `npm run build` | Compila y optimiza el proyecto para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el empaquetado de producción generado. |
| `npm test` | Ejecuta la suite de pruebas unitarias con Jest. |
| `npm run test:watch` | Ejecuta las pruebas en modo interactivo y reacciona a cambios de código. |
| `npm run test:coverage` | Genera un reporte detallado con el porcentaje de cobertura de código. |
| `npm run lint` | Analiza el código con ESLint para detectar errores de sintaxis o variables huérfanas. |
| `npm run lint:fix` | Aplica correcciones automáticas de formato y reglas de ESLint. |
| `npm run doctor` | Ejecuta el diagnóstico de salud de React Doctor (accesibilidad, bugs y rendimiento). |
| `npm run doctor:verbose` | Muestra el reporte extendido de cada regla evaluada por React Doctor. |
| **`npm run check`** | **Modo estricto**: Ejecuta ESLint y React Doctor secuencialmente sin modificar código. |
| **`npm run check:fix`** | **Modo productivo**: Corrige con ESLint y luego audita con React Doctor. |

---

## 👤 Autor

* **Edison Vidal Ospina Corredor**
* **Rol:** Senior Frontend Engineer & UI Architect | Technical Lead
* **LinkedIn:** [linkedin.com/in/edison-ospina](https://www.linkedin.com/in/edison-ospina)
* **Sitio Web:** [edisonospina.netlify.app](https://edisonospina.netlify.app)
