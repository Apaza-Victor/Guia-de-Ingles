<p align="center">
  <img src="https://img.shields.io/badge/%F0%9F%9A%80_FluentPath-0b1020?style=for-the-badge" alt="FluentPath" width="260">
  <h1 align="center">De Cero a Experto en Inglés</h1>
  <p align="center">Guía web moderna, responsive e interactiva para dominar el inglés paso a paso. Construida con HTML5, Bootstrap 5, CSS3 personalizado y JavaScript vanilla.</p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Bootstrap%205-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5">
  <img src="https://img.shields.io/badge/Bootstrap%20Icons-563d7c?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap Icons">
  <img src="https://img.shields.io/badge/JavaScript%20(ES6%2B)-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript ES6+">
  <img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages">
</p>

<p align="center">
  <a href="https://apaza-victor.github.io/Guia-de-Ingles/" target="_blank">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fapaza-victor.github.io%2FGuia-de-Ingles%2F&style=for-the-badge&label=%F0%9F%8C%90%20Web%20desplegada&logo=github&logoColor=white" alt="Estado de la web">
  </a>
  <a href="https://apaza-victor.github.io/Guia-de-Ingles/" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%9A%80%20Ver%20la%20web%20en%20vivo-6C5CE7?style=for-the-badge" alt="Ver la web en vivo">
  </a>
</p>

<p align="center">
  🌐 <a href="https://apaza-victor.github.io/Guia-de-Ingles/" target="_blank"><b>https://apaza-victor.github.io/Guia-de-Ingles/</b></a>
</p>

---

## ✨ Características

- 🖥️ Hero a pantalla completa con malla de fondo, mock de progreso animado y chips flotantes.
- 🌙 / ☀️ **Modo oscuro y claro** con toggler incluido en todas las páginas (recuerda tu preferencia).
- 🧭 Secciones del header como **páginas independientes**: Inicio, Ruta de Aprendizaje, Método y Módulos.
- 🔎 **Módulos con filtrado dinámico** (Gramática, Vocabulario, Conversación, Pronunciación) y carrusel de demostración.
- 📚 Cada lección incluye teoría, ejemplos traducidos (EN/ES), tablas, tips, errores comunes y **mini quiz interactivo**.
- 📱 100% responsive y accesible.

## 🗺️ Ruta de aprendizaje

| Nivel | Etapa | Contenido clave |
| :---: | :--- | :--- |
| 1 | 🥚 Principiante | Sonidos, vocabulario esencial y primeras frases |
| 2 | ➡️ Intermedio | Tiempos verbales, phrasal verbs y conversación cotidiana |
| 3 | 🚀 Avanzado | Entrevistas, condicionales y expresiones idiomáticas |
| 4 | 🏆 Experto | Fonética fina y fluidez nivel C1/C2 |

## 📁 Estructura del proyecto

```
├── index.html                    # Inicio (hero + CTA + footer)
├── ruta.html                     # Ruta de aprendizaje independiente
├── metodo.html                   # Método independiente
├── css/
│   ├── style.css                 # Tema con variables (dark/light), gradientes, glassmorphism
│   └── course.css                # Estilos de módulos y lecciones
├── js/
│   └── main.js                   # Tema, navbar, reveal, filtros, quiz, validación
├── partials/                     # Plantillas canónicas del "chrome" (head, navbar, footers, scripts)
│   ├── head.html                 # <head> con {TITLE}, {DESC}, {ROOT}
│   ├── nav.html                  # Navbar con {ACTIVE_*}, {MODULE_ITEM}, {CTA_*}
│   ├── footer.html               # Footer completo (inicio, ruta, método, hub)
│   ├── footer-module.html        # Footer de módulos/lecciones con {MOD}, {OTHER_MODULES}
│   └── tail.html                 # Back-to-top + Bootstrap JS + main.js con {ROOT}
├── scripts/
│   └── rebuild-chrome.mjs        # Reconstruye head/nav/footer/tail en todas las páginas
├── modulos/
│   ├── index.html                # Hub con filtros y carrusel
│   ├── tiempos-verbales/         # Gramática: presente, pasado, present perfect, condicionales
│   ├── vocabulario-esencial/     # 1,000 palabras + phrasal verbs
│   ├── conversacion/             # Presentaciones, entrevistas, slang
│   └── pronunciacion/            # Fonética y sonidos difíciles
├── .nojekyll                     # Compatibilidad con GitHub Pages
└── .gitignore
```

### 🧩 Sistema de plantillas (chrome canónico)

El `head`, la `navbar`, el `footer` y los scripts son **idénticos en todas las páginas** y se mantienen desde los partials en `partials/`. Para regenerarlos:

```bash
node scripts/rebuild-chrome.mjs          # reconstruye las 19 páginas
node scripts/rebuild-chrome.mjs --dry-run # simula sin escribir
```

El script autodetecta cada página (inicio, ruta, método, hub, hub de módulo o lección) para:

- Calcular la **ruta relativa** correcta (`{ROOT}` = `./`, `../`, `../../`).
- Marcar el **enlace activo** de la navbar (`{ACTIVE_*}`) y añadir el **item del módulo actual** (`{MODULE_ITEM}`).
- Elegir el **CTA** (`{CTA_HREF}` / `{CTA_TEXT}`) y el **footer** según el tipo de página.
- Inyectar en todas el botón *volver arriba* y los scripts (Bootstrap + `main.js`).

**Flujo de trabajo al escalar:**

1. Edita solo el partial (p. ej. `partials/nav.html`).
2. Lanza `node scripts/rebuild-chrome.mjs`.
3. Si añades una página nueva, crea el HTML con su `<main>` y vuelve a ejecutarlo.

> Idempotente: ejecutarlo dos veces seguidas no modifica nada («sin cambios»).

## 🚀 Despliegue en GitHub Pages (en vivo)

La web ya está publicada y funcionando en:

> **🔗 https://apaza-victor.github.io/Guia-de-Ingles/**

Para activarlo en un repositorio nuevo:

1. Sube el proyecto a GitHub (`git push -u origin main`).
2. Ve a **Settings → Pages**.
3. En *Build and deployment / Source* elige **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)` → **Save**.
5. Espera unos minutos y visita `https://TU-USUARIO.github.io/Guia-de-Ingles/`.

> El archivo `.nojekyll` incluido garantiza que GitHub Pages publique los archivos correctamente.

## 🛠️ Stack y librerías

- **Bootstrap 5** — componentes y sistema de rejilla (CDN).
- **Bootstrap Icons** — la librería de iconos de toda la interfaz.
- **Google Fonts** — tipografías *Poppins* e *Inter*.
- **JavaScript vanilla (ES6+)** — sin frameworks.

## 👤 Autor

[Víctor Hugo Apaza](https://github.com/Apaza-Victor) — proyecto desarrollado en [Guia-de-Ingles](https://github.com/Apaza-Victor/Guia-de-Ingles).

---

Si este proyecto te es útil, deja una ⭐ para apoyar el desarrollo.