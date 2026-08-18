/**
 * Post-build pre-rendering.
 *
 * A Vite SPA ships an empty `<div id="root">` — search engines and social/AI
 * crawlers that don't execute JavaScript see no content. This script boots the
 * built `dist/` in a real headless Chrome, waits for React to render, and writes
 * the fully-rendered HTML back to disk so the *initial* response already
 * contains the page. The client bundle then hydrates it.
 *
 * Only static, non-API routes are pre-rendered. API-driven pages (project
 * details, articles, the projects listing) are intentionally skipped — they'd
 * bake in a loading/error state at build time. They keep working as before via
 * client-side rendering.
 *
 * This step is deliberately NON-FATAL: if Chrome can't launch in the build
 * environment, we log and exit 0 so the deploy still ships (just without the
 * pre-rendered HTML) instead of breaking a live site.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 45678;

// Static, non-API routes only. Add a route here only if it renders meaningful
// content without a backend request.
const ROUTES = ["/", "/services"];

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".map": "application/json",
};

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.warn("[prerender] dist/index.html not found — did the build run? Skipping.");
    return;
  }

  // Minimal static server for dist/, with SPA fallback to index.html.
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const filePath = join(DIST, urlPath);
      if (existsSync(filePath) && (await stat(filePath)).isFile()) {
        const data = await readFile(filePath);
        res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
        res.end(data);
        return;
      }
      const html = await readFile(join(DIST, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch {
      res.writeHead(500);
      res.end("error");
    }
  });
  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });
      // Ensure React has mounted actual content into #root.
      await page.waitForSelector("#root > *", { timeout: 30000 });

      // framer-motion `whileInView` reveals render their wrapper with an inline
      // `opacity: 0` initial state until scrolled into view. Baking that into
      // the static HTML would leave whole sections invisible to no-JS visitors
      // and discounted by crawlers. Since the client boots with a fresh render
      // (see main.tsx), we can safely force these wrappers to their final
      // visible state in the snapshot. Only inline-styled elements are touched;
      // permanent decorative fades use Tailwind classes, not inline opacity.
      await page.evaluate(() => {
        document.querySelectorAll("[style]").forEach((el) => {
          const style = el.getAttribute("style") || "";
          if (/opacity:\s*0(\D|$)/.test(style)) {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
        });
      });

      const html = await page.evaluate(
        () => "<!doctype html>\n" + document.documentElement.outerHTML,
      );

      const outDir = route === "/" ? DIST : join(DIST, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, "index.html"), html);
      console.log(`[prerender] ${route} -> ${join(outDir, "index.html").replace(DIST, "dist")}`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.warn("[prerender] Skipped due to error (deploy continues with client-side rendering):");
  console.warn(err?.message || err);
  // Non-fatal: never fail the build over pre-rendering.
  process.exit(0);
});
