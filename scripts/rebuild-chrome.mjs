#!/usr/bin/env node
/**
 * FluentPath — Rebuild Chrome
 *
 * Regenera el "chrome" común (head, navbar, footer y scripts) de TODAS las
 * páginas HTML a partir de las plantillas canónicas en /partials.
 *
 * Uso:
 *   node scripts/rebuild-chrome.mjs            # regenera todo
 *   node scripts/rebuild-chrome.mjs --dry-run  # solo muestra qué cambia
 *
 * Cómo escalar:
 *  - Nueva página: crea tu HTML con <main> único y ejecuta este script.
 *  - Cambiar navbar/footer/head: edita el partial y vuelve a ejecutarlo.
 *  - El script autodetecta la profundidad (rutas relativas) y la sección activa.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PARTIALS = path.join(ROOT, "partials");
const DRY_RUN = process.argv.includes("--dry-run");

const readP = (name) => fs.readFileSync(path.join(PARTIALS, name), "utf8");
const HEAD_TPL = readP("head.html");
const NAV_TPL = readP("nav.html");
const FOOTER_FULL_TPL = readP("footer.html");
const FOOTER_MODULE_TPL = readP("footer-module.html");
const TAIL_TPL = readP("tail.html");

const MODULES = [
  { dir: "tiempos-verbales", label: "Tiempos verbales" },
  { dir: "vocabulario-esencial", label: "Vocabulario esencial" },
  { dir: "conversacion", label: "Conversación" },
  { dir: "pronunciacion", label: "Pronunciación" },
];

const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules" || e.name === "partials" || e.name === "scripts") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) htmlFiles.push(p);
  }
})(ROOT);
htmlFiles.sort();

const interp = (tpl, vars) =>
  Object.entries(vars).reduce((acc, [k, v]) => acc.split(`{${k}}`).join(String(v)), tpl);

const usedTokens = new Set();
const collectUsed = (tpl) => {
  const re = /\{([A-Z_]+)\}/g;
  let m;
  while ((m = re.exec(tpl))) usedTokens.add(m[1]);
};

let changedCount = 0;

for (const file of htmlFiles) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const depth = rel.split("/").filter((s) => s !== undefined && s !== "").length - 1;
  const rootPrefix = "../".repeat(depth);

  const html = fs.readFileSync(file, "utf8");
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [null, ""])[1].trim();
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [null, ""])[1];

  // ---- Tipo de página ----
  let type, mod = null;
  if (rel === "ruta.html" || rel === "metodo.html") type = "root";
  else if (rel === "modulos/index.html") type = "hub";
  else if (/^modulos\/[^/]+\/index\.html$/.test(rel)) { type = "module-hub"; mod = rel.split("/")[1]; }
  else if (/^modulos\/[^/]+\/[^/]+\.html$/.test(rel)) { type = "lesson"; mod = rel.split("/")[1]; }
  else type = "home"; // index.html y cualquier otra página raíz

  // ---- Navbar: sección activa ----
  const act = { ACTIVE_INICIO: "", ACTIVE_RUTA: "", ACTIVE_METODO: "", ACTIVE_MODULOS: "" };
  if (type === "home") act.ACTIVE_INICIO = " active";
  else if (rel === "ruta.html") act.ACTIVE_RUTA = " active";
  else if (rel === "metodo.html") act.ACTIVE_METODO = " active";
  else if (type === "hub") act.ACTIVE_MODULOS = " active";

  // ---- Navbar: item del módulo actual ----
  const moduleInfo = MODULES.find((m) => m.dir === mod);
  let moduleItem = "";
  if ((type === "module-hub" || type === "lesson") && moduleInfo) {
    moduleItem = `\n            <li class="nav-item"><a class="nav-link nav-link-anim active" href="${rootPrefix}modulos/${mod}/index.html">${moduleInfo.label}</a></li>`;
  }

  // ---- Navbar: CTA ----
  let ctaHref, ctaText;
  if (type === "hub") { ctaHref = "#modulos"; ctaText = "Comenzar"; }
  else if (type === "module-hub" || type === "lesson") { ctaHref = `${rootPrefix}modulos/index.html`; ctaText = "Ver todos los módulos"; }
  else { ctaHref = `${rootPrefix}modulos/index.html`; ctaText = "Explorar módulos"; }

  const scrolled = type === "home" ? "" : " scrolled";

  const newHead = interp(HEAD_TPL, { DESC: desc, TITLE: title, ROOT: rootPrefix });
  const newNav = interp(NAV_TPL, {
    ...act,
    SCROLLED: scrolled,
    MODULE_ITEM: moduleItem,
    CTA_HREF: ctaHref,
    CTA_TEXT: ctaText,
    ROOT: rootPrefix,
  });

  // ---- Footer ----
  let newFooter;
  if (type === "module-hub" || type === "lesson") {
    const others = MODULES
      .filter((m) => m.dir !== mod)
      .map((m) => `            <li><a href="${rootPrefix}modulos/${m.dir}/index.html">${m.label}</a></li>`)
      .join("\n");
    newFooter = interp(FOOTER_MODULE_TPL, { ROOT: rootPrefix, MOD: mod, OTHER_MODULES: others });
  } else {
    newFooter = interp(FOOTER_FULL_TPL, { ROOT: rootPrefix });
  }

  const newTail = interp(TAIL_TPL, { ROOT: rootPrefix });

  // ---- Ensamblado (punto fijo: 2ª pasada = sin cambios) ----
  const out = html
    .replace(/<head[\s\S]*?<\/head>/i, newHead)
    .replace(
      /[^\S\r\n]*(?:<!--\s*=====\s*NAVBAR\s*=====\s*-->\r?\n)?[^\S\r\n]*<header>[\s\S]*?<\/header>/s,
      newNav
    )
    .replace(
      /[^\S\r\n]*(?:<!--\s*=====\s*FOOTER\s*=====\s*-->\r?\n)?[^\S\r\n]*<footer class="footer[\s\S]*?<\/footer>/s,
      newFooter
    )
    // Bloque final (back-to-top + scripts) como una sola región
    .replace(
      /[^\S\r\n]*(?:<!--\s*(?:Back to top|Bootstrap JS Bundle|Main JS)\s*-->|<script src="[^"]*(?:bootstrap\.bundle|js\/main\.js)[^"]*"><\/script>|<button class="back-to-top[^\r\n]*)[\s\S]*?<\/body>/,
      `${newTail}\n</body>`
    )
    // Limpieza cosmética (idempotente)
    .replace(/^[ \t]+(\r?\n)/gm, "$1")
    .replace(/(^[ \t]*\r?\n){3,}/gm, "\n\n")
    .replace(/[ \t]+(\r?\n)/gm, "$1");

  for (const tpl of [newHead, newNav, newFooter, newTail]) collectUsed(tpl);

  const changed = out !== html;
  if (changed) {
    changedCount++;
    if (DRY_RUN) {
      console.log(`~ ${rel}`);
    } else {
      fs.writeFileSync(file, out, "utf8");
      console.log(`actualizado  ${rel}`);
    }
  } else {
    console.log(`sin cambios  ${rel}`);
  }
}

if (usedTokens.size) {
  console.warn("\nTokens sin sustituir (revisar plantilla):", [...usedTokens]);
}

console.log(`\n${DRY_RUN ? "Simulación" : "Compilación"} completada: ${changedCount} página(s) modificada(s) de ${htmlFiles.length}.`);