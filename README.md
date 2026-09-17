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
- 🧭 Secciones del header como **páginas independientes**: Inicio, Ruta de Aprendizaje, Método, Módulos, Recursos y Mi progreso.
- 🎓 **6 niveles CEFR (A1–C2)** con hubs por nivel y filtrado dual por nivel + área (Gramática, Vocabulario, Conversación, Pronunciación).
- 🔊 **Audio automático** (SpeechSynthesis): botón de escuchar en cada ejemplo en inglés y en cada palabra de las secciones de vocabulario.
- 📚 **44 lecciones** con teoría, ejemplos traducidos (EN/ES), tablas, tips, errores comunes, **vocabulario EN→ES con audio** y **mini quiz interactivo** (6 ejercicios por lección).
- 📊 **Test de nivel** (24 preguntas según el MCER) con recomendación inmediata de nivel.
- ✅ **Progreso personal** guardado en `localStorage`: marca lecciones como completadas, racha de estudio y progreso por nivel.
- 📖 **Sección Recursos**: verbos irregulares, phrasal verbs, idioms y alfabeto fonético (IPA) con audio.
- 📱 100% responsive y accesible.

## 🗺️ Ruta de aprendizaje

Mare: la ruta sigue el **Marco Común Europeo**: A1 → A2 → B1 → B2 → C1 → C2.

| Nivel | Etapa | Contenido clave | Lecciones |
| :---: | :--- | :--- | :---: |
| A1 | 🥚 Principiante | Saludos, presentaciones, presente simple, preguntas, números y fonética | 11 |
| A2 | 🍳 Básico | Pasado simple, futuro (will/going to), compras y sonidos difíciles | 8 |
| B1 | ➡️ Intermedio | Present perfect, presente continuo, phrasal verbs y recomendaciones | 9 |
| B2 | 🚀 Intermedio alto | Condicionales, voz pasiva, estilo indirecto, falsos cognados y entrevistas | 10 |
| C1 | 🏆 Avanzado | Slang nativo y expresiones idiomáticas | 4 |
| C2 | 🥇 Experto | Matices avanzados y fluidez total | 2 |

## 📁 Estructura del proyecto

```
├── index.html                    # Inicio (hero + CTA + footer)
├── ruta.html                     # Ruta de aprendizaje independiente
├── metodo.html                   # Método independiente
├── test-de-nivel.html            # Test de nivel MCER (24 preguntas)
├── mi-progreso.html              # Panel de progreso (localStorage)
├── contacto.html                 # Contacto
├── terminos.html                 # Términos, privacidad y cookies
├── 404.html                      # Página no encontrada
├── robots.txt                    # SEO / indexación
├── sitemap.xml                   # Sitemap de todas las páginas
├── og-image.svg                  # Imagen para compartir en redes (Open Graph)
├── css/
│   ├── style.css                 # Tema con variables (dark/light), gradientes, glassmorphism
│   └── course.css                # Estilos de módulos y lecciones
├── js/
│   └── main.js                   # Tema, navbar, reveal, filtros, quiz, audio, progreso, test
├── partials/                     # Plantillas canónicas del "chrome" (head, navbar, footers, scripts)
│   ├── head.html                 # <head> con {TITLE}, {DESC}, {ROOT} y metadatos Open Graph
│   ├── nav.html                  # Navbar con {ACTIVE_*}, {MODULE_ITEM}, {CTA_*}
│   ├── footer.html               # Footer completo (inicio, ruta, método, hub, recursos, progreso)
│   ├── footer-module.html        # Footer de módulos/lecciones con {MOD}, {OTHER_MODULES}
│   └── tail.html                 # Back-to-top + Bootstrap JS + main.js con {ROOT}
├── scripts/
│   └── rebuild-chrome.mjs        # Reconstruye head/nav/footer/tail en todas las páginas
├── modulos/
│   ├── index.html                # Hub con filtrado dual (nivel + área) y carrusel
│   ├── a1…c2/                    # Niveles CEFR: cada carpeta con su index (hub de nivel)
│   │   ├── index.html            # Hub del nivel con el listado de lecciones
│   │   └── *.html                # Lecciones (44 en total) con teoría, audio y vocab
├── recursos/
│   ├── index.html                # Hub de recursos de consulta
│   ├── verbos-irregulares.html   # Verbos irregulares con audio
│   ├── phrasal-verbs.html        # Phrasal verbs con audio
│   ├── idioms.html               # Idioms y modismos con audio
│   └── alfabeto-fonetico.html    # Alfabeto fonético IPA con audio
├── .nojekyll                     # Compatibilidad con GitHub Pages
└── .gitignore
```

> Tras cambiar el listado de niveles o crear lecciones nuevas, regenera el chrome:

```bash
node scripts/rebuild-chrome.mjs          # reconstruye las 64 páginas
node scripts/rebuild-chrome.mjs --dry-run # simula sin escribir
```

### 🧩 Sistema de plantillas (chrome canónico)

El `head`, la `navbar`, el `footer` y los scripts son **idénticos en todas las páginas** y se mantienen desde los partials en `partials/`. Para regenerarlos:

```bash
node scripts/rebuild-chrome.mjs          # reconstruye las 64 páginas
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