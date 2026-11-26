// Puts the Rock The Hock decals onto the equipment photos at build time.
// Each decal is warped into a four-corner spot on the photo (so it follows the
// panel's perspective) and shaded by the light falling on that panel, then the
// branded photo is written to dist/photos/equipment/. Runs after `vite build`.
// On Netlify a failed download fails the build; locally it only warns.
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const PHOTO_BASE = 'https://afwiyqhgtptuzsxwoysn.supabase.co/storage/v1/object/public/quote-photos/site/';
const DECALS = new URL('./decals/', import.meta.url);
const OUT = new URL('../dist/photos/equipment/', import.meta.url);

// Corners are photo pixels, clockwise from the decal's top-left.
// exposure: brightness of the decal's whites relative to a sunlit panel.
export const JOBS = [
  {
    source: 'dump-truck-1.webp',
    out: 'international-4700-dump-truck.jpg',
    decals: [{ art: 'door-4700.png', quad: [[440, 123], [528, 119], [528, 173], [440, 171]], exposure: 'surface' }],
  },
  {
    source: 'cat-289d3.jpg',
    out: 'cat-289d3-compact-track-loader.jpg',
    // Also replace the plain copy fetch-photos.mjs made for the job photo pages.
    alsoAs: '../cat-289d3-compact-track-loader-logan-ohio.jpg',
    decals: [{ art: 'skid-steer-22x7.png', quad: [[437, 533], [555, 533], [555, 571], [437, 571]], exposure: 'surface' }],
  },
  {
    source: 'rental-brush-cutter.jpg',
    out: 'brush-cutter.jpg',
    decals: [{ art: 'skid-steer-22x7.png', quad: [[326, 322], [392, 229], [422, 249], [356, 343]], exposure: 'surface' }],
  },
  {
    source: 'rental-drum-mulcher.webp',
    out: 'drum-mulcher.jpg',
    decals: [{ art: 'crest.png', quad: [[468, 266], [501, 258], [502, 300], [469, 309]], exposure: 0.95 }],
  },
  {
    source: 'rental-power-rake.jpg',
    out: 'power-rake.jpg',
    decals: [{ art: 'crest.png', quad: [[485, 185], [526, 182], [526, 232], [485, 234]], exposure: 0.9 }],
  },
  {
    source: 'rental-auger.jpg',
    out: 'auger.jpg',
    decals: [{ art: 'crest.png', quad: [[323, 262], [361, 260], [361, 306], [323, 309]], exposure: 0.9 }],
  },
  {
    source: 'rental-post-driver.jpg',
    out: 'post-driver.jpg',
    decals: [{ art: 'crest.png', quad: [[228, 284], [258, 268], [270, 300], [240, 315]], exposure: 'surface' }],
  },
  {
    source: 'rental-pallet-forks.webp',
    out: 'pallet-forks.jpg',
    decals: [{ art: 'skid-steer-22x7.png', quad: [[270, 191], [330, 189], [330, 206], [270, 208]], exposure: 'surface' }],
  },
];

// ---- geometry --------------------------------------------------------------

// Homography that maps (x, y) -> (u, v) for four point pairs.
function homography(from, to) {
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = from[i];
    const [u, v] = to[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  }
  // Gaussian elimination with partial pivoting.
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    [b[c], b[p]] = [b[p], b[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
      b[r] -= f * b[c];
    }
  }
  const h = b.map((v, i) => v / A[i][i]);
  return (x, y) => {
    const w = h[6] * x + h[7] * y + 1;
    return [(h[0] * x + h[1] * y + h[2]) / w, (h[3] * x + h[4] * y + h[5]) / w];
  };
}

function insideQuad(q, x, y) {
  let sign = 0;
  for (let i = 0; i < 4; i++) {
    const [ax, ay] = q[i];
    const [bx, by] = q[(i + 1) % 4];
    const cross = (bx - ax) * (y - ay) - (by - ay) * (x - ax);
    if (cross !== 0) {
      const s = Math.sign(cross);
      if (sign && s !== sign) return false;
      sign = s;
    }
  }
  return true;
}

const lum = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];

// ---- compositing -----------------------------------------------------------

// photo / art: { data: Uint8Array RGBA, width, height }
export function applyDecal(photo, art, quad, { exposure = 'surface' } = {}) {
  const { data: P, width: W, height: H } = photo;
  const { data: D, width: dw, height: dh } = art;
  const toArt = homography(quad, [[0, 0], [dw, 0], [dw, dh], [0, dh]]);

  const xs = quad.map((p) => p[0]);
  const ys = quad.map((p) => p[1]);
  const x0 = Math.max(0, Math.floor(Math.min(...xs)) - 1);
  const x1 = Math.min(W - 1, Math.ceil(Math.max(...xs)) + 1);
  const y0 = Math.max(0, Math.floor(Math.min(...ys)) - 1);
  const y1 = Math.min(H - 1, Math.ceil(Math.max(...ys)) + 1);

  // Light on the panel: fit a plane to the brighter half of the surface pixels,
  // so lettering, dirt and shadows under the decal don't print through.
  const samples = [];
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++) if (insideQuad(quad, x + 0.5, y + 0.5)) samples.push([x, y, lum(P, (y * W + x) * 4)]);
  const sorted = samples.map((s) => s[2]).sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)] || 128;
  const bright = samples.filter((s) => s[2] >= median);
  // Least squares L = a*x + b*y + c.
  let sxx = 0, sxy = 0, syy = 0, sx = 0, sy = 0, n = 0, sxl = 0, syl = 0, sl = 0;
  for (const [x, y, l] of bright) {
    sxx += x * x; sxy += x * y; syy += y * y; sx += x; sy += y; n++;
    sxl += x * l; syl += y * l; sl += l;
  }
  const M = [[sxx, sxy, sx], [sxy, syy, sy], [sx, sy, n]];
  const r = [sxl, syl, sl];
  const det = (m) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  const dM = det(M);
  const solve = (k) => det(M.map((row, i) => row.map((v, j) => (j === k ? r[i] : v)))) / dM;
  const [pa, pb, pc] = Math.abs(dM) > 1e-6 ? [solve(0), solve(1), solve(2)] : [0, 0, sl / Math.max(n, 1)];
  const meanBright = sl / Math.max(n, 1);
  const light = (x, y) => Math.min(1.12, Math.max(0.7, (pa * x + pb * y + pc) / meanBright));

  // How bright the decal's whites should be. 'surface': match the panel's own
  // brightest paint (a white door or a yellow panel tells us the exposure).
  let gain = typeof exposure === 'number' ? exposure : 1;
  if (exposure === 'surface') {
    const hi = sorted[Math.floor(sorted.length * 0.85)] || 200;
    // Assume the paint is about as bright as the decal's own background.
    gain = Math.min(1, Math.max(0.55, hi / 235));
  }

  // Supersample 4x4 per pixel for clean edges.
  const S = 4;
  const sample = (u, v) => {
    if (u < 0 || v < 0 || u > dw - 1 || v > dh - 1) return null;
    const ix = Math.floor(u), iy = Math.floor(v);
    const fx = u - ix, fy = v - iy;
    const jx = Math.min(ix + 1, dw - 1), jy = Math.min(iy + 1, dh - 1);
    const out = [0, 0, 0, 0];
    const w = [(1 - fx) * (1 - fy), fx * (1 - fy), (1 - fx) * fy, fx * fy];
    const idx = [(iy * dw + ix) * 4, (iy * dw + jx) * 4, (jy * dw + ix) * 4, (jy * dw + jx) * 4];
    for (let k = 0; k < 4; k++) {
      const a = D[idx[k] + 3] / 255;
      out[0] += w[k] * D[idx[k]] * a;
      out[1] += w[k] * D[idx[k] + 1] * a;
      out[2] += w[k] * D[idx[k] + 2] * a;
      out[3] += w[k] * a;
    }
    return out; // premultiplied
  };

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < S; sy++)
        for (let sx = 0; sx < S; sx++) {
          const px = x + (sx + 0.5) / S;
          const py = y + (sy + 0.5) / S;
          if (!insideQuad(quad, px, py)) continue;
          const [u, v] = toArt(px, py);
          const s = sample(u, v);
          if (!s) continue;
          r += s[0]; g += s[1]; b += s[2]; a += s[3];
        }
      if (a === 0) continue;
      const cov = a / (S * S);
      const k = (gain * light(x + 0.5, y + 0.5)) / a; // un-premultiply and shade
      const i = (y * W + x) * 4;
      // Keep a little of the panel's grain so the vinyl doesn't look pasted on.
      const grain = (lum(P, i) - median) * 0.06;
      for (const [c, val] of [[0, r], [1, g], [2, b]]) {
        const dec = Math.min(255, Math.max(0, val * k + grain));
        P[i + c] = Math.round(P[i + c] * (1 - cov) + dec * cov);
      }
    }
  }
}

async function loadArt(file, quad) {
  // Pre-shrink the art to about twice the spot's size so it doesn't alias.
  const w = Math.max(...quad.map((p) => p[0])) - Math.min(...quad.map((p) => p[0]));
  const h = Math.max(...quad.map((p) => p[1])) - Math.min(...quad.map((p) => p[1]));
  const side = Math.ceil(Math.hypot(w, h) * 2);
  const { data, info } = await sharp(new URL(file, DECALS).pathname)
    .ensureAlpha()
    .resize(side, side, { fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

export async function brand(buffer, job) {
  const { data, info } = await sharp(buffer).flatten({ background: '#ffffff' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const photo = { data, width: info.width, height: info.height };
  for (const d of job.decals) applyDecal(photo, await loadArt(d.art, d.quad), d.quad, d);
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await mkdir(OUT, { recursive: true });
  let failed = 0;
  for (const job of JOBS) {
    try {
      const res = await fetch(PHOTO_BASE + job.source);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const branded = await brand(Buffer.from(await res.arrayBuffer()), job);
      await writeFile(new URL(job.out, OUT), branded);
      if (job.alsoAs) await writeFile(new URL(job.alsoAs, OUT), branded);
    } catch (e) {
      failed++;
      console.warn(`brand-photos: ${job.source} failed: ${e.message}`);
    }
  }
  console.log(`brand-photos: ${JOBS.length - failed}/${JOBS.length} equipment photos branded`);
  if (failed && process.env.NETLIFY) process.exit(1);
}
