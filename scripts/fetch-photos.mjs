// Copies the job photos listed in src/lib/photos.ts into dist/photos/ under
// their descriptive file names. Runs after `vite build`. On Netlify a failed
// download fails the build; locally (no network) it only warns.
import { mkdir, writeFile, readFile } from 'node:fs/promises';

const src = await readFile(new URL('../src/lib/photos.ts', import.meta.url), 'utf8');
const base = src.match(/PHOTO_SOURCE_BASE =\s*'([^']+)'/)[1];
const pairs = [...src.matchAll(/source: '([^']+)',\s*file: '([^']+)'/g)].map((m) => [m[1], m[2]]);
const out = new URL('../dist/photos/', import.meta.url);
await mkdir(out, { recursive: true });

let failed = 0;
for (const [source, file] of pairs) {
  try {
    const res = await fetch(base + source);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(new URL(file, out), Buffer.from(await res.arrayBuffer()));
  } catch (e) {
    failed++;
    console.warn(`fetch-photos: ${source} -> ${file} failed: ${e.message}`);
  }
}
console.log(`fetch-photos: ${pairs.length - failed}/${pairs.length} photos copied`);
if (failed && process.env.NETLIFY) process.exit(1);
