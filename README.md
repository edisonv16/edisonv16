# Portafolio Profesional — Edison Vidal Ospina Corredor

![React](https://img.shields.io/badge/React-19.3.0-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![React Doctor](https://img.shields.io/badge/React_Doctor-100%2F100-00D8FF?logo=react&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-54%20passed%20(100%25)-brightgreen?logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.x%20(Flat%20Config)-4B32C3?logo=eslint&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2.3-7952B3?logo=bootstrap&logoColor=white)

Plataforma web profesional y portafolio interactivo de **Edison Vidal Ospina Corredor**, Senior Frontend Engineer y UI Architect con más de 18 años de trayectoria liderando la conceptualización, arquitectura y modernización de plataformas corporativas de misión crítica.

> 📍 **Ubicación del código fuente:** El proyecto de React reside en la carpeta [`edison/`](./edison/).

---

## 🚀 Características Principales

* **Saludo contextual dinámico:** Calcula en tiempo real el saludo (*Buenos Días / Buenas Tardes / Buenas Noches*) y adapta la ambientación visual según la hora local.
* **Estado en tiempo real (`HomeStatus`):**
  * **Reloj local (`LocalClock`):** Sincronizado dinámicamente con la zona horaria del visitante mediante la API nativa `Intl.DateTimeFormat`.
  * **Clima en vivo (`WeatherCard`):** Consulta meteorológica en tiempo real mediante Open-Meteo y geolocalización con degradación elegante (*graceful degradation*).
* **Galería interactiva de proyectos:** Carrusel touch responsivo implementado con `Swiper` y navegación optimizada con botones accesibles (`aria-label`).
* **SEO & Datos Estructurados:** Integración de Schema.org en formato JSON-LD (`StructuredData`) optimizado para indexación en motores de búsqueda (Google) y redes profesionales.
* **Calidad de código y testing integral:** Suite de 54 pruebas unitarias con Jest + Testing Library y doble anillo de calidad con ESLint 9 + React Doctor (Puntaje 100/100).
* **Agente IA y Skill de Seguridad:** Configuración de skill personalizada [`.agents/skills/edison-portfolio-guard/`](./.agents/skills/edison-portfolio-guard/SKILL.md) para garantizar que cualquier desarrollo futuro respete los estándares arquitectónicos sin romper funcionalidades.

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
* **Open-Meteo API:** Consulta meteorológica en tiempo real (gratuita, sin API keys).
* **Nominatim OpenStreetMap:** Geocodificación inversa para resolución automática de ciudades.

### Calidad & Testing
* **Jest 30 + Babel:** Test runner y compilador para pruebas unitarias con cobertura superior al 84%.
* **@testing-library/react (v16) & @testing-library/dom (v10):** Pruebas unitarias orientadas al comportamiento real del usuario.
* **React Doctor (Million.js):** Puntuación perfecta **100/100** auditando accesibilidad (WCAG), rendimiento y estándares de React 19.
* **ESLint 9 (Flat Config):** Validación sintáctica, estándares ECMAScript y reglas de ciclo de vida de React Hooks.

---

## 📂 Arquitectura del Proyecto

```text
edisonv16/
├── .agents/skills/edison-portfolio-guard/ # Skill personalizada para agentes IA
├── edison/                     # Aplicación React 19 + Vite 8
│   ├── __mocks__/              # Mocks estáticos de Jest (CSS e imágenes)
│   ├── public/                 # Activos estáticos públicos
│   ├── src/
│   │   ├── assets/             # Estilos CSS, imágenes y fuentes web
│   │   ├── components/         # Componentes React organizados por dominio
│   │   │   ├── contact/        # Formulario de contacto y testimonios
│   │   │   ├── estudies/       # Educación y certificaciones
│   │   │   ├── footer/         # Pie de página y enlaces sociales
│   │   │   ├── header/         # Encabezado, reloj y clima
│   │   │   ├── profile/        # Perfil profesional y matriz de habilidades
│   │   │   ├── proyects/       # Portafolio interactivo de proyectos
│   │   │   ├── seo/            # Inyección de Structured Data (JSON-LD)
│   │   │   └── work/           # Experiencia laboral y trayectoria
│   │   ├── data/               # Información centralizada del portafolio (Info.jsx)
│   │   ├── interfaces/         # Definiciones de tipos y contratos (JSDoc)
│   │   ├── models/             # Modelos de datos inmutables
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
   La aplicación estará disponible en `http://localhost:5173`.

4. **Ejecutar la suite de pruebas unitarias (54 tests):**
   ```powershell
   npm test
   ```

5. **Auditoría de calidad y salud (ESLint + React Doctor):**
   ```powershell
   npm run check
   ```

---

## 🧪 Scripts Disponibles

Todos los comandos se ejecutan desde la carpeta `edison/`:

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con Hot Module Replacement (HMR). |
| `npm run build` | Compila y optimiza el proyecto para producción en `dist/`. |
| `npm run preview` | Previsualiza localmente el build generado. |
| `npm test` | Ejecuta las 54 pruebas unitarias con Jest. |
| `npm run test:watch` | Ejecuta las pruebas en modo interactivo mientras se edita código. |
| `npm run test:coverage` | Genera reporte de cobertura de código (>84%). |
| `npm run lint` | Analiza el código con ESLint 9. |
| `npm run lint:fix` | Aplica correcciones automáticas de sintaxis con ESLint. |
| `npm run doctor` | Ejecuta el análisis de salud con React Doctor (Puntaje 100/100). |
| **`npm run check`** | **Control de Calidad Estricto**: Ejecuta ESLint + React Doctor consecutivamente. |
| **`npm run check:fix`** | **Modo Productivo**: Corrige con ESLint y luego valida con React Doctor. |

---

## 🛡️ Skill de Seguridad del Proyecto

Para mantener la máxima estabilidad y que ninguna modificación futura degrade el sistema, este repositorio incluye la skill **`edison-portfolio-guard`** en [`.agents/skills/edison-portfolio-guard/SKILL.md`](./.agents/skills/edison-portfolio-guard/SKILL.md).

Esta directriz establece:
1. **Ejecución obligatoria de `npm test`:** Las 54 pruebas deben pasar al 100%.
2. **Preservación del puntaje 100 en React Doctor:** Verificación de accesibilidad, seguridad de enlaces y mejores prácticas de React 19.
3. **Validación de compilación:** `npm run build` sin errores.

---

## 👤 Autor

* **Edison Vidal Ospina Corredor**
* **Rol:** Senior Frontend Engineer & UI Architect | Technical Lead
* **LinkedIn:** [linkedin.com/in/edison-ospina](https://www.linkedin.com/in/edison-ospina)
* **Sitio Web:** [edisonospina.netlify.app](https://edisonospina.netlify.app)
