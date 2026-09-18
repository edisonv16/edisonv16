---
name: edison-portfolio-guard
description: >-
  Use this skill when developing, refactoring, fixing bugs, or adding features to
  Edison Vidal Ospina's portfolio project (edisonv16 / edison). Enforces React 19
  standards, preserves the 54 passing unit tests, guarantees 100/100 React Doctor score,
  and prevents architectural or breaking regressions.
---

# Edison Portfolio Guard — Guía y Protocolo de Seguridad

Este skill proporciona las directrices operativas, estándares arquitectónicos y protocolos de verificación para el proyecto del portafolio profesional de **Edison Vidal Ospina Corredor** (`edisonv16`). Su objetivo principal es asegurar la máxima calidad del código y **garantizar que ningún cambio rompa funcionalidades existentes**.

---

## 🏛️ Contexto y Estructura del Repositorio

El repositorio tiene una estructura donde la raíz del control de versiones (Git) y la aplicación frontend están separadas:

* **Raíz de Git:** `edisonv16/` (donde reside `.git/` y la documentación general).
* **Aplicación Frontend:** `edisonv16/edison/` (proyecto React 19 + Vite 8).

> [!IMPORTANT]
> **REGLA DE ORO DE TERMINAL:**
> Cualquier comando de Node / npm (`npm test`, `npm run dev`, `npm run build`, `npm run check`) **DEBE ejecutarse dentro del subdirectorio `edison/`**.
> ```powershell
> cd edison
> npm test
> ```

---

## 🛡️ Protocolo de Seguridad ("No Romper Nada")

Para evitar regresiones o degradación del proyecto, cualquier agente o desarrollador DEBE respetar los siguientes principios no negociables:

### 1. Integridad de Pruebas Unitarias (54 Tests)
* El proyecto cuenta con **9 suites y 54 pruebas unitarias** que cubren utilidades, servicios, modelos y componentes clave.
* **Cobertura mínima:** Mantener una cobertura superior al 80% en líneas y declaraciones.
* **Obligatorio:** Antes de dar por terminada cualquier tarea, ejecutar `npm test` y verificar que las 54 pruebas (o más, si se agregaron nuevas) pasen al 100% con 0 fallos.
* Si se modifica un componente o servicio existente, los tests asociados deben actualizarse en consecuencia sin eliminar casos de prueba críticos.

### 2. Puntuación 100/100 en React Doctor
* El proyecto tiene una puntuación perfecta de **100/100** en [React Doctor](https://www.react.doctor/).
* **Reglas a respetar:**
  * Accesibilidad (a11y): Todas las imágenes `<img>` deben incluir atributo `alt` descriptivo. Los botones interactivos deben tener `aria-label`.
  * Seguridad: Enlaces externos `<a>` con `target="_blank"` deben incluir `rel="noreferrer"`.
  * Rendimiento: Evitar cálculos pesados innecesarios dentro del cuerpo de renderizado.
* Ejecutar siempre `npm run doctor` para verificar que el score se mantenga en 100.

### 3. Estándares React 19
El proyecto se ejecuta sobre **React 19.3**:
* **`ref` como prop estándar:** No utilizar `forwardRef(...)` para nuevos componentes; pasar `ref` directamente como propiedad.
* **Prohibido `defaultProps` en componentes funcionales:** Utilizar parámetros por defecto de JavaScript ES6:
  ```jsx
  // CORRECTO:
  const MiComponente = ({ titulo = 'Por defecto' }) => <h3>{titulo}</h3>;
  
  // INCORRECTO (Eliminado en React 19):
  MiComponente.defaultProps = { titulo: 'Por defecto' };
  ```
* **Nuevos hooks disponibles:** Aprovechar `useActionState`, `useOptimistic` y `use()` para optimizaciones y promesas cuando corresponda.
* **Raíz de React:** Mantener `ReactDOM.createRoot` en [`src/main.jsx`](./edison/src/main.jsx).

### 4. Mocks de Jest y Recursos Estáticos
* La configuración de Jest en [`jest.config.cjs`](./edison/jest.config.cjs) redirige estilos e imágenes hacia `__mocks__/styleMock.cjs` y `__mocks__/fileMock.cjs`.
* Al importar nuevos formatos de archivo o estilos de librerías externas (como Swiper o Bootstrap), asegurarse de que los mocks no colapsen en las pruebas unitarias.
* La dependencia `@testing-library/dom` debe permanecer explícita en `devDependencies` para garantizar la compatibilidad con `@testing-library/react@16`.

### 5. Centralización de Datos
* La información personal, proyectos, experiencia laboral y educación **no debe quemarse directamente en los componentes**.
* Debe residir en sus respectivos archivos de datos en `src/data/`:
  * [`src/data/Info.jsx`](./edison/src/data/Info.jsx)
  * [`src/data/InfoPortafolio.jsx`](./edison/src/data/InfoPortafolio.jsx)
  * [`src/data/InfoWork.jsx`](./edison/src/data/InfoWork.jsx)

---

## 🔄 Runbook de Verificación Obligatorio

Antes de confirmar cualquier cambio en Git o entregar el trabajo, ejecutar secuencialmente este checklist dentro de `edison/`:

```powershell
# 1. Ejecutar pruebas unitarias (deben pasar todas)
npm test

# 2. Ejecutar auditoría doble: ESLint 9 + React Doctor 100/100
npm run check

# 3. Validar compilación de producción con Vite
npm run build
```

Si los tres comandos finalizan con código `0`:
* ✅ El código es seguro.
* ✅ No hay regresiones funcionales ni de rendimiento.
* ✅ El empaquetado de producción está intacto.

---

## 🧰 Comandos de Referencia Rápida

| Comando | Función |
| :--- | :--- |
| `npm run dev` | Servidor de desarrollo local en `http://localhost:5173`. |
| `npm test` | Ejecución única de la suite de Jest. |
| `npm run test:watch` | Modo observador para desarrollo TDD. |
| `npm run test:coverage` | Genera reporte de cobertura en `coverage/`. |
| `npm run doctor` | Análisis de salud y buenas prácticas con React Doctor. |
| `npm run lint` | Análisis estático con ESLint (Flat Config). |
| `npm run check` | Pipeline completo de calidad (Lint + Doctor). |
| `npm run build` | Compilación optimizada para producción (`dist/`). |
