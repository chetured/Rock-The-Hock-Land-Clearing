// Fills dist/index.html with the server-rendered page after `vite build`.
import { readFile, writeFile, rm } from 'node:fs/promises';

const htmlPath = new URL('../dist/index.html', import.meta.url);
const { render } = await import('../dist-ssr/entry-server.js');

const html = await readFile(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('prerender: #root marker not found in dist/index.html');

await writeFile(htmlPath, html.replace(marker, `<div id="root">${render()}</div>`));
await rm(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true });
console.log('prerender: wrote dist/index.html');
