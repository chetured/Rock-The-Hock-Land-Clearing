// Urgent alerts for every "Get an estimate now" request, sent from the server
// so no private address, phone number or key is ever in the public site code.
//
//   POST /api/notify   {..lead details..}  -> {notion, sms}
//
// 1. Adds a row to the "RTH Leads" Notion database (Status New, Source Website form).
// 2. Texts an URGENT alert to each number in ALERT_SMS_TO through Twilio.
//
// Each part only runs once its settings are added in Netlify
// (Project configuration > Environment variables):
//   NOTION_TOKEN          Notion internal integration secret (share RTH Leads with it)
//   NOTION_LEADS_DB       optional, defaults to the RTH Leads database
//   TWILIO_ACCOUNT_SID    Twilio account SID
//   TWILIO_AUTH_TOKEN     Twilio auth token
//   TWILIO_FROM           the Twilio number texts come from, like +16145550100
//   ALERT_SMS_TO          numbers to alert, comma separated, like +16143792170,+1614...
import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';

const RTH_LEADS_DB = 'b4cf92dc7128447c842b62f4542e70bd';
const MAX_PER_HOUR = 6; // per visitor, so a bot can't run up the text bill

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  preferredContact?: string;
  services?: string[];
  size?: string;
  terrainTier?: string;
  brushTier?: string;
  items?: string[];
  hauling?: string;
  description?: string;
  address?: string;
  town?: string;
  access?: string;
  howSoon?: string;
  referral?: string;
  mapsUrl?: string;
  earthUrl?: string;
  filesPage?: string;
  fileCount?: number;
  failedUploads?: number;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const list = (v: unknown) => (Array.isArray(v) ? v.map((x) => str(x, 120)).filter(Boolean).slice(0, 20) : []);
const tierNo = (t: string) => t.match(/Tier (\d)/)?.[1] ?? '';

function clean(raw: Record<string, unknown>): Lead {
  return {
    name: str(raw.name, 120),
    phone: str(raw.phone, 40),
    email: str(raw.email, 200),
    preferredContact: str(raw.preferredContact, 20),
    services: list(raw.services),
    size: str(raw.size, 60),
    terrainTier: str(raw.terrainTier, 80),
    brushTier: str(raw.brushTier, 80),
    items: list(raw.items),
    hauling: str(raw.hauling, 300),
    description: str(raw.description, 4000),
    address: str(raw.address, 300),
    town: str(raw.town, 120),
    access: str(raw.access, 500),
    howSoon: str(raw.howSoon, 60),
    referral: str(raw.referral, 60),
    mapsUrl: str(raw.mapsUrl, 600),
    earthUrl: str(raw.earthUrl, 600),
    filesPage: str(raw.filesPage, 300),
    fileCount: Number(raw.fileCount) || 0,
    failedUploads: Number(raw.failedUploads) || 0,
  };
}

// The closest RTH Leads "Service" options for what they picked on the site.
function notionServices(services: string[]): string[] {
  const out = new Set<string>();
  for (const s of services) {
    const l = s.toLowerCase();
    if (l.includes('mulch')) out.add('Forestry mulching');
    else if (/driveway|grading|power rake|seed bed/.test(l)) out.add('Grading / driveway');
    else if (/septic|post/.test(l)) out.add('Excavation');
    else if (/haul|gravel|topsoil|fill dirt/.test(l)) out.add('Hauling');
    else out.add('Land clearing');
  }
  return [...out];
}

const text = (content: string) =>
  content
    ? { rich_text: [{ type: 'text', text: { content: content.slice(0, 2000) } }] }
    : { rich_text: [] };

async function addToNotion(lead: Lead, received: Date): Promise<string> {
  const token = process.env.NOTION_TOKEN;
  if (!token) return 'off';
  const followUp = new Date(received.getTime() + 24 * 3600 * 1000);
  const message = [
    lead.services?.join(', '),
    lead.size && `Size: ${lead.size}`,
    lead.terrainTier && `Terrain ${lead.terrainTier}`,
    lead.brushTier && `Brush ${lead.brushTier}`,
    lead.items?.length ? `Other items: ${lead.items.join(', ')}` : '',
    lead.hauling,
    lead.howSoon && `How soon: ${lead.howSoon}`,
    lead.preferredContact && `Prefers: ${lead.preferredContact}`,
    lead.description,
  ]
    .filter(Boolean)
    .join('\n');
  const notes = [
    'URGENT: new estimate from the website.',
    lead.filesPage && `Photos and videos (${lead.fileCount ?? 0}): ${lead.filesPage}`,
    lead.failedUploads ? `${lead.failedUploads} file(s) did not upload; ask them to text them.` : '',
    lead.mapsUrl && `Google Maps: ${lead.mapsUrl}`,
    lead.earthUrl && `Google Earth: ${lead.earthUrl}`,
    lead.access && `Access/gate: ${lead.access}`,
    lead.referral && `Heard about us: ${lead.referral}`,
  ]
    .filter(Boolean)
    .join('\n');

  const properties: Record<string, unknown> = {
    Name: { title: [{ type: 'text', text: { content: lead.name || 'Website estimate' } }] },
    Status: { status: { name: 'New' } },
    Source: { select: { name: 'Website form' } },
    Service: { multi_select: notionServices(lead.services ?? []).map((name) => ({ name })) },
    'Job location': text(lead.address || lead.town || ''),
    Message: text(message),
    Notes: text(notes),
    Received: { date: { start: received.toISOString() } },
    'Next follow-up': { date: { start: followUp.toISOString().slice(0, 10) } },
  };
  if (lead.phone) properties.Phone = { phone_number: lead.phone };
  if (lead.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) properties.Email = { email: lead.email };

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      'notion-version': '2022-06-28',
    },
    body: JSON.stringify({ parent: { database_id: process.env.NOTION_LEADS_DB || RTH_LEADS_DB }, properties }),
  });
  if (!res.ok) {
    console.error('Notion row failed', res.status, (await res.text()).slice(0, 500));
    return 'failed';
  }
  return 'ok';
}

async function sendTexts(lead: Lead): Promise<string> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const auth = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const to = (process.env.ALERT_SMS_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!sid || !auth || !from || !to.length) return 'off';

  const tiers = [lead.terrainTier && `Terrain T${tierNo(lead.terrainTier)}`, lead.brushTier && `Brush T${tierNo(lead.brushTier)}`]
    .filter(Boolean)
    .join(', ');
  const body = [
    'URGENT - new RTH estimate',
    `${lead.name || 'Someone'} ${lead.phone || ''}`.trim(),
    [lead.town, lead.size].filter(Boolean).join(', '),
    lead.services?.join(', ').slice(0, 160),
    tiers,
    lead.howSoon && `How soon: ${lead.howSoon}`,
    lead.filesPage && `Photos/video: ${lead.filesPage}`,
    lead.mapsUrl && `Map: ${lead.mapsUrl}`,
  ]
    .filter(Boolean)
    .join('\n')
    .slice(0, 1200);

  const results = await Promise.all(
    to.map(async (number) => {
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
        method: 'POST',
        headers: {
          authorization: `Basic ${btoa(`${sid}:${auth}`)}`,
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ To: number, From: from, Body: body }),
      });
      if (!res.ok) console.error('Text alert failed', res.status, (await res.text()).slice(0, 500));
      return res.ok;
    }),
  );
  return results.every(Boolean) ? 'ok' : results.some(Boolean) ? 'partial' : 'failed';
}

// A few alerts per visitor per hour is plenty for a real customer.
async function overLimit(context: Context): Promise<boolean> {
  try {
    const store = getStore({ name: 'estimate-alerts', consistency: 'strong' });
    const ip = context.ip || 'unknown';
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
    const key = `rate/${new Date().toISOString().slice(0, 13)}/${[...new Uint8Array(digest)]
      .slice(0, 12)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')}`;
    const count = Number((await store.get(key)) || 0);
    if (count >= MAX_PER_HOUR) return true;
    await store.set(key, String(count + 1));
  } catch (err) {
    console.error('Rate check failed', err);
  }
  return false;
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'Not found' }, 404);
  const raw = await req.text();
  if (raw.length > 50_000) return json({ error: 'Too large' }, 413);
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ error: 'Bad JSON' }, 400);
  }
  if (str(data.company)) return json({ notion: 'skipped', sms: 'skipped' }); // honeypot
  const lead = clean(data);
  if (!lead.name || !lead.phone) return json({ error: 'Name and phone are required' }, 400);
  if (await overLimit(context)) return json({ error: 'Too many requests' }, 429);

  const received = new Date();
  const [notion, sms] = await Promise.all([
    addToNotion(lead, received).catch((e) => (console.error('Notion error', e), 'failed')),
    sendTexts(lead).catch((e) => (console.error('Text error', e), 'failed')),
  ]);
  return json({ notion, sms });
};

export const config: Config = { path: '/api/notify' };
