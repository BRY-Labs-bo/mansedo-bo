import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3020";
const OUT = process.env.OUT_DIR ?? "d:/01 Desarrollo/05 Proyectos/27 Gaming/03-products/01-webpage/screenshots";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const routes = [
  { name: "home", path: "/" },
  { name: "blog-list", path: "/blog" },
  { name: "politica", path: "/politica-de-privacidad" },
  { name: "admin-login", path: "/admin/login" },
];

const viewports = [
  { label: "390",  width: 390,  height: 844 },   // móvil
  { label: "768",  width: 768,  height: 1024 },  // tablet
  { label: "1440", width: 1440, height: 900 },   // escritorio
];

await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
});

const errors = [];

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    locale: "es-BO",
  });

  // Capturar errores de consola por página
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push({ vp: vp.label, url: page.url(), msg: msg.text() });
  });
  page.on("pageerror", (err) => {
    errors.push({ vp: vp.label, url: page.url(), msg: `pageerror: ${err.message}` });
  });

  for (const r of routes) {
    const url = BASE + r.path;
    console.log(`[${vp.label}] ${url}`);
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    // Deshabilitar animaciones/transiciones para consistencia
    await page.addStyleTag({ content: "*{transition:none!important;animation:none!important;caret-color:transparent!important}" });
    const file = path.join(OUT, `${r.name}-${vp.label}.png`);
    await page.screenshot({ path: file, fullPage: true });
  }
  await context.close();
}

await browser.close();

console.log("\n== console errors ==");
if (errors.length === 0) console.log("(ninguno)");
else for (const e of errors) console.log(`[${e.vp}] ${e.url}\n  ${e.msg}`);
