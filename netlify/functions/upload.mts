// Takes estimate photos and videos from the website in small pieces, so a long
// phone video of the property can be sent no matter how big it is. Each file is
// kept in Netlify Blobs as numbered chunks plus a small manifest.
//
//   POST /api/upload?op=start            {name, type, size, slot}  -> {id}
//   PUT  /api/upload?op=chunk&id=&n=     raw bytes (<= 4 MB)       -> {ok}
//   POST /api/upload?op=finish&id=       {chunks}                  -> {id, url}
//   POST /api/upload?op=submission       {..estimate details..}    -> {id, url}
//
// Files are read back through /api/media/:id (see media.mts). Ids are random
// UUIDs, so a file can only be opened by someone who has its link.
import { getStore } from '@netlify/blobs';
import type { Config } from '@netlify/functions';

const MAX_FILE = 2 * 1024 * 1024 * 1024; // 2 GB
const MAX_CHUNK = 4 * 1024 * 1024; // 4 MB
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export type Manifest = {
  name: string;
  type: string;
  size: number;
  slot: string;
  created: string;
  chunks?: number;
  chunkSize: number;
  done?: boolean;
};

export default async (req: Request) => {
  const url = new URL(req.url);
  const op = url.searchParams.get('op');
  const store = getStore({ name: 'estimate-uploads', consistency: 'strong' });

  if (op === 'start' && req.method === 'POST') {
    const { name, type, size, slot } = (await req.json().catch(() => ({}))) as Partial<Manifest>;
    if (typeof size !== 'number' || size <= 0 || size > MAX_FILE) return json({ error: 'File too large' }, 413);
    if (typeof type !== 'string' || !/^(image|video)\//.test(type)) return json({ error: 'Photos and videos only' }, 415);
    const id = crypto.randomUUID();
    const manifest: Manifest = {
      name: String(name || 'file').slice(0, 120),
      type,
      size,
      slot: String(slot || 'other').slice(0, 40),
      created: new Date().toISOString(),
      chunkSize: MAX_CHUNK,
    };
    await store.setJSON(`${id}/manifest`, manifest);
    return json({ id, chunkSize: MAX_CHUNK });
  }

  if (op === 'chunk' && req.method === 'PUT') {
    const id = url.searchParams.get('id') || '';
    const n = Number(url.searchParams.get('n'));
    if (!UUID.test(id) || !Number.isInteger(n) || n < 0) return json({ error: 'Bad request' }, 400);
    const manifest = (await store.get(`${id}/manifest`, { type: 'json' })) as Manifest | null;
    if (!manifest || manifest.done) return json({ error: 'Unknown upload' }, 404);
    if (n * manifest.chunkSize >= manifest.size) return json({ error: 'Chunk out of range' }, 400);
    const body = await req.arrayBuffer();
    if (body.byteLength === 0 || body.byteLength > MAX_CHUNK) return json({ error: 'Bad chunk size' }, 400);
    await store.set(`${id}/c/${String(n).padStart(5, '0')}`, body);
    return json({ ok: true });
  }

  if (op === 'finish' && req.method === 'POST') {
    const id = url.searchParams.get('id') || '';
    if (!UUID.test(id)) return json({ error: 'Bad request' }, 400);
    const manifest = (await store.get(`${id}/manifest`, { type: 'json' })) as Manifest | null;
    if (!manifest) return json({ error: 'Unknown upload' }, 404);
    const expected = Math.ceil(manifest.size / manifest.chunkSize);
    const { blobs } = await store.list({ prefix: `${id}/c/` });
    if (blobs.length !== expected) return json({ error: `Missing pieces (${blobs.length}/${expected})` }, 409);
    await store.setJSON(`${id}/manifest`, { ...manifest, chunks: expected, done: true });
    return json({ id, url: `/api/media/${id}` });
  }

  if (op === 'submission' && req.method === 'POST') {
    const text = await req.text();
    if (text.length > 100_000) return json({ error: 'Too large' }, 413);
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      return json({ error: 'Bad JSON' }, 400);
    }
    const id = crypto.randomUUID();
    await store.setJSON(`submissions/${id}`, { ...(data as object), received: new Date().toISOString() });
    return json({ id, url: `/estimate-files/${id}` });
  }

  return json({ error: 'Not found' }, 404);
};

export const config: Config = { path: '/api/upload' };
