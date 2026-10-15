import { mkdir, readFile, writeFile } from "node:fs/promises";
import { render, routeMetadata } from "../.site-ssr/entry-server.js";

const template = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const escape = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const base = "https://www.neuralvansh.online";
for (const [path, metadata] of Object.entries(routeMetadata)) {
  const canonical = `${base}${path === "/" ? "" : path}`;
  let html = template
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escape(metadata.title)}</title>`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/,
      `<meta name="description" content="${escape(metadata.description)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?\s*>/,
      `<meta property="og:title" content="${escape(metadata.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?\s*>/,
      `<meta property="og:description" content="${escape(metadata.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?\s*>/,
      `<meta property="og:url" content="${canonical}" />`,
    );
  if (path === "/404")
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex" /></head>',
    );
  const file =
    path === "/404"
      ? new URL("../dist/404.html", import.meta.url)
      : new URL(
          `../dist${path === "/" ? "/index" : path}.html`,
          import.meta.url,
        );
  await mkdir(new URL(".", file), { recursive: true });
  await writeFile(file, html);
  console.log(`Prerendered ${path}`);
}
