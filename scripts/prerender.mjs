// Writes one prerendered HTML file per route after `vite build`:
// dist/index.html for "/" and dist/<slug>/index.html for each landing page,
// each with its own title, meta description, canonical URL and JSON-LD.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const { render, ROUTES, headFor } = await import('../dist-ssr/entry-server.js');

const template = await readFile(new URL('index.html', dist), 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error('prerender: #root marker not found in dist/index.html');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function swap(html, re, value, label) {
  if (!re.test(html)) throw new Error(`prerender: ${label} not found in template`);
  return html.replace(re, value);
}

for (const route of ROUTES) {
  const head = headFor(route);
  let html = template;
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`, 'title');
  html = swap(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(head.description)}$2`, 'description');
  html = swap(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(head.title)}$2`, 'og:title');
  html = swap(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(head.description)}$2`, 'og:description');
  html = swap(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${head.canonical}$2`, 'og:url');
  html = swap(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(head.title)}$2`, 'twitter:title');
  html = swap(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${esc(head.description)}$2`, 'twitter:description');
  html = swap(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${head.canonical}$2`, 'canonical');
  const ld = head.jsonLd
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
  html = html.replace('</head>', `    ${ld}\n  </head>`);
  html = html.replace(marker, `<div id="root">${render(route)}</div>`);

  const out = route === '/' ? new URL('index.html', dist) : new URL(`.${route}index.html`, dist);
  if (route !== '/') await mkdir(new URL(`.${route}`, dist), { recursive: true });
  await writeFile(out, html);
  console.log(`prerender: wrote ${route}`);
}
await rm(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true });
