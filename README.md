# FluentPath — De Cero a Experto en Inglés

Guía web moderna y responsive para aprender inglés desde cero hasta nivel experto (C2). Construida con HTML5, Bootstrap 5, CSS3 personalizado y JavaScript vanilla (ES6+). Múltiples páginas HTML independientes unidas entre sí por rutas.

## Despliegue en GitHub Pages

#### 1. Crear repositorio en GitHub
Crea un repositorio nuevo en GitHub (por ejemplo `Guia-de-Ingles`).

#### 2. Subir el proyecto
```bash
git init
git add .
git commit -m "Guía de inglés: landing + módulos de aprendizaje"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/Guia-de-Ingles.git
git push -u origin main
```

#### 3. Activar GitHub Pages
1. En el repositorio ve a **Settings → Pages**.
2. En **Build and deployment / Source** selecciona **Deploy from a branch**.
3. Elige la rama `main` y la carpeta `/ (root)`.
4. Guarda. Tu web quedará publicada en: `https://TU-USUARIO.github.io/Guia-de-Ingles/`

> El archivo `.nojekyll` incluido garantiza que GitHub Pages publique los archivos correctamente.

## Vista local

Abre `index.html` directamente en el navegador, o si quieres un servidor local:

```bash
python -m http.server 8080
```
y visita `http://localhost:8080`.

## Estructura
```
├── index.html                  # Landing principal (hero a pantalla completa, malla de fondo)
├── css/
│   ├── style.css               # Tema principal: variables, gradientes, glassmorphism
│   └── course.css              # Estilos de páginas de módulos y lecciones
├── js/
│   └── main.js                 # Navbar, contadores, reveal, filtros, quiz, validación
├── modulos/
│   ├── index.html              # Hub de todos los módulos
│   ├── tiempos-verbales/       # Gramática: presente, pasado, present perfect, condicionales
│   ├── vocabulario-esencial/   # 1,000 palabras + phrasal verbs
│   ├── conversacion/           # Presentaciones, entrevistas, slang
│   └── pronunciacion/          # Fonética y sonidos difíciles
├── .nojekyll                   # Compatibilidad con GitHub Pages
└── .gitignore
```

## Secciones del home
- Hero a pantalla completa con malla de fondo, mock de progreso animado y chips flotantes
- Contadores animados (estudiantes, lecciones, niveles, satisfacción)
- Ruta de aprendizaje: Principiante → Intermedio → Avanzado → Experto
- Método con 4 pilares (vocabulario, gramática, pronunciación, conversación)
- Módulos interactivos con filtrado dinámico y carrusel de demostración
- CTA + footer con newsletter

## Contenido educativo
Cada módulo contiene su propia carpeta con `index.html` (subsecciones) y lecciones HTML independientes con:
- Teoría breve con ejemplos traducidos (EN/ES)
- Tablas de vocabulario y estructuras
- Tips y errores comunes
- Mini quiz interactivo
- Navegación anterior / siguiente entre lecciones