// Writes every route to static HTML after `vite build`, so crawlers and link
// previews get real content and deep links return 200 on GitHub Pages.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist/spa");

const escapeHtml = (text) =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function head(seo, canonical, siteName) {
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    seo.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    seo.noindex ? "" : `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const app = await vite.ssrLoadModule("/client/entry-server.tsx");
  const template = await readFile(path.join(outDir, "index.html"), "utf8");

  if (!template.includes('<div id="root"></div>') || !/<title>[^<]*<\/title>/.test(template)) {
    throw new Error("dist/spa/index.html no longer has the markers the prerender replaces");
  }

  const page = (route, file) => {
    const seo = app.getSeo(route);
    const url = route === "/" ? "/" : `${route}/`;
    const html = template
      .replace(/<title>[^<]*<\/title>\s*<meta name="description"[^>]*>/, head(seo, app.canonicalUrl(route), app.SITE_NAME))
      .replace('<div id="root"></div>', `<div id="root">${app.render(url)}</div>`);
    if (!html.includes("og:title")) throw new Error(`head tags were not injected for ${route}`);
    return { file, html };
  };

  const routes = app.getPrerenderRoutes();
  const pages = [
    ...routes.map((route) => page(route, route === "/" ? "index.html" : `${route.slice(1)}/index.html`)),
    // Unknown URLs: GitHub Pages serves this file with a 404 status.
    page("/404", "404.html"),
  ];

  for (const { file, html } of pages) {
    const target = path.join(outDir, file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, html);
  }

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...app.getSitemapRoutes().map((route) => `  <url><loc>${app.canonicalUrl(route)}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
  await writeFile(path.join(outDir, "sitemap.xml"), sitemap);

  console.log(`prerendered ${pages.length} pages and sitemap.xml (${app.getSitemapRoutes().length} URLs)`);
} finally {
  await vite.close();
}
