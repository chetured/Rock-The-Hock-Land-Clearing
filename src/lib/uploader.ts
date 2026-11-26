// Sends estimate photos and videos to /api/upload in 4 MB pieces, so a long
// phone video goes through no matter how big it is. Photos are shrunk on the
// phone first so they send fast on a weak signal.

export type UploadSlot = 'terrain' | 'brush' | 'items' | 'walkthrough';

export type UploadItem = {
  key: string;
  file: File;
  slot: UploadSlot;
  preview?: string;
  progress: number; // 0..1
  status: 'uploading' | 'done' | 'error';
  id?: string;
  error?: string;
};

const MAX_PHOTO_SIDE = 2400;

// Shrink a big photo to at most 2400 px on its long side. Anything the browser
// can't draw (or a photo that's already small) is sent as is.
export async function preparePhoto(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.size < 1.5 * 1024 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_PHOTO_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

async function call(url: string, init: RequestInit, tries = 4): Promise<Response> {
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, init);
      if (res.ok || (res.status >= 400 && res.status < 500 && res.status !== 408 && res.status !== 429)) return res;
      last = new Error(`HTTP ${res.status}`);
    } catch (e) {
      last = e;
    }
    await new Promise((r) => setTimeout(r, 1000 * 2 ** i)); // 1s, 2s, 4s, 8s
  }
  throw last;
}

// Upload one file; calls onProgress with 0..1 and resolves with the file id.
export async function uploadFile(
  file: File,
  slot: UploadSlot,
  onProgress: (p: number) => void,
): Promise<string> {
  const type = file.type || (/\.(mov|mp4|m4v|3gp|webm)$/i.test(file.name) ? 'video/mp4' : 'image/jpeg');
  const startRes = await call('/api/upload?op=start', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: file.name, type, size: file.size, slot }),
  });
  const start = await startRes.json();
  if (!startRes.ok) throw new Error(start.error || 'Upload could not start');
  const { id, chunkSize } = start as { id: string; chunkSize: number };

  const total = Math.ceil(file.size / chunkSize);
  let sent = 0;
  let next = 0;
  // Two pieces in flight at a time keeps phones busy without flooding them.
  const worker = async () => {
    while (next < total) {
      const n = next++;
      const piece = file.slice(n * chunkSize, Math.min(file.size, (n + 1) * chunkSize));
      const res = await call(`/api/upload?op=chunk&id=${id}&n=${n}`, { method: 'PUT', body: piece });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Upload failed');
      sent++;
      onProgress(sent / total);
    }
  };
  await Promise.all([worker(), worker()]);

  const fin = await call(`/api/upload?op=finish&id=${id}`, { method: 'POST' });
  if (!fin.ok) throw new Error((await fin.json().catch(() => ({}))).error || 'Upload did not finish');
  return id;
}
