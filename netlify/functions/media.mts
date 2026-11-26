// Serves files sent with the estimate form (see upload.mts).
//   GET /api/media/:id           the photo or video, with Range support so
//                                phones and browsers can play and seek video
//   GET /estimate-files/:id      one page with everything a customer sent:
//                                tiers, notes, map links, photos and videos
import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';
import type { Manifest } from './upload.mts';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const MAX_RESPONSE = 4 * 1024 * 1024;

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

type MediaItem = { id: string; name: string; type: string; slot: string };
type Submission = {
  services?: string[];
  terrainTier?: string;
  brushTier?: string;
  items?: string[];
  size?: string;
  description?: string;
  town?: string;
  mapsUrl?: string;
  earthUrl?: string;
  howSoon?: string;
  media?: MediaItem[];
  received?: string;
};

const SLOT_TITLES: Record<string, string> = {
  terrain: 'Steepest part of the property',
  brush: 'Brush density',
  items: 'Trees and other items',
  walkthrough: 'Walk-through video and other photos',
};

async function serveFile(id: string, req: Request) {
  const store = getStore({ name: 'estimate-uploads', consistency: 'strong' });
  const m = (await store.get(`${id}/manifest`, { type: 'json' })) as Manifest | null;
  if (!m || !m.done) return new Response('Not found', { status: 404 });

  // Work out which bytes to send. Without a Range header a small file goes out
  // whole; a big one starts with its first piece and the player asks for more.
  let start = 0;
  let end = m.size - 1;
  const range = req.headers.get('range');
  const match = range && /bytes=(\d*)-(\d*)/.exec(range);
  if (match) {
    if (match[1] === '' && match[2]) {
      start = Math.max(0, m.size - Number(match[2]));
    } else {
      start = Number(match[1] || 0);
      if (match[2]) end = Math.min(Number(match[2]), m.size - 1);
    }
    if (start >= m.size) return new Response(null, { status: 416, headers: { 'content-range': `bytes */${m.size}` } });
  }
  const partial = !!match || m.size > MAX_RESPONSE;
  end = Math.min(end, start + MAX_RESPONSE - 1);

  const parts: Uint8Array[] = [];
  for (let n = Math.floor(start / m.chunkSize); n * m.chunkSize <= end; n++) {
    const buf = (await store.get(`${id}/c/${String(n).padStart(5, '0')}`, { type: 'arrayBuffer' })) as ArrayBuffer | null;
    if (!buf) return new Response('Missing piece', { status: 500 });
    const base = n * m.chunkSize;
    parts.push(new Uint8Array(buf).subarray(Math.max(0, start - base), Math.min(buf.byteLength, end - base + 1)));
  }
  const body = new Uint8Array(parts.reduce((t, p) => t + p.byteLength, 0));
  let o = 0;
  for (const p of parts) {
    body.set(p, o);
    o += p.byteLength;
  }
  const headers: Record<string, string> = {
    'content-type': m.type,
    'accept-ranges': 'bytes',
    'content-length': String(body.byteLength),
    'content-disposition': `inline; filename="${m.name.replace(/[^\w.-]+/g, '_')}"`,
    'cache-control': 'private, max-age=86400',
    'x-robots-tag': 'noindex',
  };
  if (partial) headers['content-range'] = `bytes ${start}-${end}/${m.size}`;
  return new Response(body, { status: partial ? 206 : 200, headers });
}

async function servePage(id: string) {
  const store = getStore({ name: 'estimate-uploads', consistency: 'strong' });
  const s = (await store.get(`submissions/${id}`, { type: 'json' })) as Submission | null;
  if (!s) return new Response('Not found', { status: 404 });
  const rows: [string, string | undefined][] = [
    ['Work', s.services?.join(', ')],
    ['Size', s.size],
    ['Terrain', s.terrainTier],
    ['Brush density', s.brushTier],
    ['Other items', s.items?.join(', ')],
    ['How soon', s.howSoon],
    ['Town', s.town],
  ];
  const media = s.media ?? [];
  const slots = [...new Set(media.map((m) => m.slot))];
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Estimate request files | Rock The Hock</title>
<style>body{font:16px/1.5 system-ui,sans-serif;margin:0;background:#f7f3ea;color:#222}main{max-width:900px;margin:0 auto;padding:20px}
h1{color:#1f3a2b;margin:0 0 4px}h2{color:#1f3a2b;margin:28px 0 8px;font-size:1.2rem}table{border-collapse:collapse;width:100%;background:#fff}
td{border-bottom:1px solid #e5e0d3;padding:8px 10px;vertical-align:top}td:first-child{font-weight:700;width:34%}
.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}figure{margin:0;background:#fff;border-radius:10px;overflow:hidden}
img,video{width:100%;display:block;background:#000;max-height:420px;object-fit:contain}figcaption{padding:6px 10px;font-size:13px;color:#555}
a.btn{display:inline-block;background:#f26b1d;color:#fff;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:700;margin:4px 6px 4px 0}
.note{background:#fff;padding:12px;border-radius:10px;white-space:pre-wrap}</style></head><body><main>
<h1>Estimate request</h1><p>Received ${esc(s.received ? new Date(s.received).toLocaleString('en-US', { timeZone: 'America/New_York' }) : '')}</p>
${s.mapsUrl ? `<a class="btn" href="${esc(s.mapsUrl)}" target="_blank" rel="noopener">Open in Google Maps</a>` : ''}${s.earthUrl ? `<a class="btn" href="${esc(s.earthUrl)}" target="_blank" rel="noopener">Open in Google Earth</a>` : ''}
<table>${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table>
${s.description ? `<h2>Project description</h2><div class="note">${esc(s.description)}</div>` : ''}
${slots.map((slot) => `<h2>${esc(SLOT_TITLES[slot] || slot)}</h2><div class="grid">${media.filter((m) => m.slot === slot).map((m) => {
    const src = `/api/media/${esc(m.id)}`;
    const el = m.type.startsWith('video/') ? `<video controls playsinline preload="metadata" src="${src}"></video>` : `<a href="${src}" target="_blank"><img loading="lazy" src="${src}" alt=""></a>`;
    return `<figure>${el}<figcaption>${esc(m.name)} · <a href="${src}" download>download</a></figcaption></figure>`;
  }).join('')}</div>`).join('')}
${media.length ? '' : '<p>No photos or videos were sent with this request.</p>'}
</main></body></html>`;
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' } });
}

export default async (req: Request, context: Context) => {
  const id = context.params.id || '';
  if (!UUID.test(id)) return new Response('Not found', { status: 404 });
  return new URL(req.url).pathname.startsWith('/estimate-files/') ? servePage(id) : serveFile(id, req);
};

export const config: Config = { path: ['/api/media/:id', '/estimate-files/:id'] };
