import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Loader2,
  LocateFixed,
  MapPin,
  PartyPopper,
  Upload,
  Video,
  X,
} from 'lucide-react';
import {
  BUSINESS,
  FORM_ENDPOINT,
  HAULING_AMOUNTS,
  HAULING_MATERIALS,
  HAULING_SERVICE_IDS,
  SERVICES,
} from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/lib/analytics';
import { preparePhoto, uploadFile, type UploadItem, type UploadSlot } from '@/lib/uploader';
import { BrushArt, TerrainArt } from '@/components/TierArt';

// "Get an estimate now": a step-by-step estimate request built for phones first.
// The customer picks the work, rates their terrain and brush on our Tier 1/2/3
// scale with a photo of each, flags trees and other items, walks the property
// on video, and drops a pin or address so we can look it up on Google Maps and
// Earth. Photos and videos upload in the background while they keep going.

const TERRAIN_TIERS = [
  {
    tier: 1 as const,
    title: 'Tier 1: Flat to gentle',
    text: 'Flat or gently rolling, firm ground. You could drive a pickup across it.',
  },
  {
    tier: 2 as const,
    title: 'Tier 2: Moderate',
    text: 'Some hills you notice walking up, a few rocks, ditches, gullies or soft spots.',
  },
  {
    tier: 3 as const,
    title: 'Tier 3: Steep or rough',
    text: 'Steep banks or hillsides, lots of rock, or wet, muddy ground.',
  },
];

const BRUSH_TIERS = [
  {
    tier: 1 as const,
    title: 'Tier 1: Light',
    text: 'Grass, weeds and light brush. Little underbrush, no big trees. You can walk through it easily.',
  },
  {
    tier: 2 as const,
    title: 'Tier 2: Moderate',
    text: 'Thick brush, briars and saplings up to about 4 inches. Hard to walk through in places.',
  },
  {
    tier: 3 as const,
    title: 'Tier 3: Heavy',
    text: 'Dense brush and trees 4 to 8 inches thick. You can barely walk through it.',
  },
];

const ITEMS = [
  'Trees over 8 inches to remove',
  'Trees we should keep',
  'Stumps',
  'Large rocks',
  'Old fence or wire',
  'Junk, trash or debris',
  'Sheds or old buildings',
  'Creek, pond or wet area',
  'Power lines or utilities',
];

const SIZES = ['Under 1 acre', '1 to 3 acres', '3 to 10 acres', '10+ acres', 'Not sure'];
const HOW_SOON = ['ASAP', 'Within 2 weeks', 'Within a month', 'Just planning'];
const CONTACT = ['Call', 'Text', 'Email'];
const REFERRAL = ['Google', 'Facebook', 'Nextdoor', 'Saw our truck/sign', 'Friend or neighbor', 'Other'];
const HAULING_LABELS: string[] = SERVICES.filter((s) =>
  (HAULING_SERVICE_IDS as readonly string[]).includes(s.id),
).map((s) => s.label);

type FormState = {
  services: string[];
  approxSize: string;
  haulMaterial: string;
  haulAmount: string;
  terrainTier: number;
  brushTier: number;
  items: string[];
  description: string;
  street: string;
  town: string;
  zip: string;
  access: string;
  howSoon: string;
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  referral: string;
  company: string; // honeypot
};

const initialState: FormState = {
  services: [],
  approxSize: '',
  haulMaterial: '',
  haulAmount: '',
  terrainTier: 0,
  brushTier: 0,
  items: [],
  description: '',
  street: '',
  town: '',
  zip: '',
  access: '',
  howSoon: '',
  name: '',
  phone: '',
  email: '',
  preferredContact: 'Text',
  referral: '',
  company: '',
};

type StepId = 'work' | 'terrain' | 'brush' | 'items' | 'walk' | 'where' | 'contact';
const STEP_TITLES: Record<StepId, string> = {
  work: 'What do you need?',
  terrain: 'Rate your terrain',
  brush: 'Rate your brush',
  items: 'Trees and other items',
  walk: 'Walk your property',
  where: 'Where is it?',
  contact: 'How do we reach you?',
};

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

const tierLabel = (list: typeof TERRAIN_TIERS, n: number) => list.find((t) => t.tier === n)?.title ?? '';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function QuoteForm({ presetService }: { presetService?: string }) {
  const [form, setForm] = useState<FormState>(() =>
    presetService ? { ...initialState, services: [presetService] } : initialState,
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!presetService) return;
    setForm((f) => (f.services.includes(presetService) ? f : { ...f, services: [presetService] }));
    setStepIndex(0);
  }, [presetService]);

  const onlyHauling = form.services.length > 0 && form.services.every((s) => HAULING_LABELS.includes(s));
  const hasHauling = form.services.some((s) => HAULING_LABELS.includes(s));
  const steps: StepId[] = onlyHauling
    ? ['work', 'walk', 'where', 'contact']
    : ['work', 'terrain', 'brush', 'items', 'walk', 'where', 'contact'];
  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const isLast = stepIndex >= steps.length - 1;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function toggle(key: 'services' | 'items', value: string) {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((s) => s !== value) : [...f[key], value],
    }));
  }

  // ---- uploads ------------------------------------------------------------
  function patchUpload(key: string, patch: Partial<UploadItem>) {
    setUploads((list) => list.map((u) => (u.key === key ? { ...u, ...patch } : u)));
  }
  async function startUpload(item: UploadItem) {
    try {
      const file = await preparePhoto(item.file);
      const id = await uploadFile(file, item.slot, (p) => patchUpload(item.key, { progress: p }));
      patchUpload(item.key, { id, status: 'done', progress: 1 });
    } catch (e) {
      patchUpload(item.key, { status: 'error', error: e instanceof Error ? e.message : 'Upload failed' });
    }
  }
  function addFiles(slot: UploadSlot, files: FileList | null) {
    if (!files) return;
    const added: UploadItem[] = Array.from(files)
      .slice(0, 20)
      .map((file) => ({
        key: `${slot}-${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
        file,
        slot,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        progress: 0,
        status: 'uploading',
      }));
    setUploads((list) => [...list, ...added]);
    added.forEach(startUpload);
    trackEvent('estimate_upload', { slot, count: String(added.length) });
  }
  function removeUpload(key: string) {
    setUploads((list) => list.filter((u) => u.key !== key));
  }
  function retryUpload(item: UploadItem) {
    patchUpload(item.key, { status: 'uploading', progress: 0, error: undefined });
    startUpload(item);
  }
  const pending = uploads.filter((u) => u.status === 'uploading');
  const uploadsRef = useRef(uploads);
  uploadsRef.current = uploads;

  // ---- location -----------------------------------------------------------
  function useMyLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: +pos.coords.latitude.toFixed(6), lng: +pos.coords.longitude.toFixed(6) });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 15000 },
    );
  }
  const addressText = [form.street, form.town, 'OH', form.zip].filter((s) => s.trim()).join(', ');
  const mapQuery = coords ? `${coords.lat},${coords.lng}` : form.street.trim() || form.zip.trim() ? addressText : '';
  const mapsUrl = mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}` : '';
  const earthUrl = mapQuery ? `https://earth.google.com/web/search/${encodeURIComponent(mapQuery)}` : '';
  const [mapPreview, setMapPreview] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setMapPreview(mapQuery), 800);
    return () => clearTimeout(t);
  }, [mapQuery]);

  // ---- navigation ---------------------------------------------------------
  function stepValid(id: StepId = step): boolean {
    switch (id) {
      case 'work':
        return form.services.length > 0 && (onlyHauling ? !!form.haulMaterial : !!form.approxSize);
      case 'terrain':
        return form.terrainTier > 0;
      case 'brush':
        return form.brushTier > 0;
      case 'where':
        return !!form.town.trim() && !!form.howSoon;
      case 'contact':
        return !!form.name.trim() && isValidPhone(form.phone);
      default:
        return true;
    }
  }
  function go(delta: number) {
    if (delta > 0 && !stepValid()) {
      setError(step === 'terrain' || step === 'brush' ? 'Pick the tier that looks most like your land.' : 'Please fill in the required fields.');
      return;
    }
    setError('');
    setStepIndex((i) => Math.max(0, Math.min(steps.length - 1, i + delta)));
    // Bring the top of the form back into view on phones.
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    if (delta > 0) trackEvent('estimate_step', { step });
  }

  // ---- submit -------------------------------------------------------------
  async function waitForUploads(): Promise<UploadItem[]> {
    // Wait until nothing is still sending, then use the latest list.
    while (uploadsRef.current.some((u) => u.status === 'uploading')) {
      await new Promise((r) => setTimeout(r, 500));
    }
    return uploadsRef.current;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLast) return go(1);
    if (!stepValid()) {
      setError('Please add your name and a mobile number we can reach.');
      return;
    }
    if (form.company) {
      setStatus('success');
      return;
    }
    setStatus('submitting');
    setError('');

    const finalUploads = await waitForUploads();
    const done = finalUploads.filter((u) => u.status === 'done' && u.id);
    const origin = window.location.origin;
    const media = done.map((u) => ({ id: u.id!, name: u.file.name, type: u.file.type || 'video/mp4', slot: u.slot }));
    const terrain = form.terrainTier ? tierLabel(TERRAIN_TIERS, form.terrainTier) : '';
    const brush = form.brushTier ? tierLabel(BRUSH_TIERS, form.brushTier) : '';
    const hauling = hasHauling ? `Hauling: ${form.haulMaterial || 'not given'}; amount: ${form.haulAmount || 'not given'}` : '';

    // One page with everything they sent (no name or phone on it).
    let filesPage = '';
    try {
      const res = await fetch('/api/upload?op=submission', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          services: form.services,
          size: form.approxSize,
          terrainTier: terrain,
          brushTier: brush,
          items: form.items,
          description: [hauling, form.description].filter(Boolean).join('\n\n'),
          town: form.town,
          howSoon: form.howSoon,
          mapsUrl,
          earthUrl,
          media,
        }),
      });
      if (res.ok) filesPage = origin + (await res.json()).url;
    } catch {
      filesPage = '';
    }
    const mediaLinks = media.map((m) => `${origin}/api/media/${m.id}`);
    const failed = finalUploads.filter((u) => u.status === 'error').length;

    const summary = [
      terrain && `Terrain: ${terrain}`,
      brush && `Brush: ${brush}`,
      form.items.length && `Other items: ${form.items.join(', ')}`,
      hauling,
      form.access && `Access/gate: ${form.access}`,
      mapsUrl && `Google Maps: ${mapsUrl}`,
      earthUrl && `Google Earth: ${earthUrl}`,
      filesPage && `Photos and videos: ${filesPage}`,
      failed && `${failed} file(s) did not upload; ask them to text them.`,
      form.description && `\n${form.description}`,
    ]
      .filter(Boolean)
      .join('\n');

    let dbSaved = false;
    let emailSent = false;
    if (supabase) {
      try {
        const { error: dbError } = await supabase.from('quote_requests').insert({
          services: form.services,
          approx_size: form.approxSize,
          vegetation: brush,
          address_or_road: [form.street, form.zip].filter(Boolean).join(', '),
          town_county: form.town,
          how_soon: form.howSoon,
          notes: summary,
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          preferred_contact: form.preferredContact,
          referral_source: form.referral || null,
          photo_urls: filesPage ? [filesPage, ...mediaLinks] : mediaLinks,
        });
        if (dbError) console.error('Supabase insert failed:', dbError.message);
        else dbSaved = true;
      } catch (err) {
        console.error('Supabase insert threw:', err);
      }
    }

    try {
      const body: Record<string, string> = {
        services: form.services.join(', '),
        approx_size: form.approxSize,
        terrain_tier: terrain,
        brush_tier: brush,
        other_items: form.items.join(', '),
        hauling_material: hasHauling ? form.haulMaterial : '',
        hauling_amount: hasHauling ? form.haulAmount : '',
        description: form.description,
        address: addressText,
        gps: coords ? `${coords.lat}, ${coords.lng}` : '',
        google_maps: mapsUrl,
        google_earth: earthUrl,
        access_notes: form.access,
        how_soon: form.howSoon,
        name: form.name,
        phone: form.phone,
        email: form.email,
        preferred_contact: form.preferredContact,
        referral: form.referral,
        photos_and_videos_page: filesPage,
        photo_links: mediaLinks.join('\n'),
        uploads_failed: failed ? String(failed) : '',
        _subject: `URGENT: New estimate request from ${form.name} (${form.town}) - Rock The Hock`,
        priority: 'URGENT - new estimate, reply within 1 business day',
      };
      if (form.email) body._replyto = form.email;
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Form backend returned ${res.status}`);
      emailSent = true;
    } catch (err) {
      console.error('Form send failed:', err);
    }

    // Server-side alerts: Notion lead row and URGENT text messages.
    let alerted = false;
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          preferredContact: form.preferredContact,
          services: form.services,
          size: form.approxSize,
          terrainTier: terrain,
          brushTier: brush,
          items: form.items,
          hauling,
          description: form.description,
          address: addressText,
          town: form.town,
          access: form.access,
          howSoon: form.howSoon,
          referral: form.referral,
          mapsUrl,
          earthUrl,
          filesPage,
          fileCount: media.length,
          failedUploads: failed,
        }),
      });
      const result = res.ok ? await res.json() : {};
      alerted = result.notion === 'ok' || result.sms === 'ok' || result.sms === 'partial';
    } catch (err) {
      console.error('Alert send failed:', err);
    }

    if (!dbSaved && !emailSent && !alerted) {
      setError(`We couldn't send your request right now. Please call or text ${BUSINESS.phone} and we'll get you on the schedule.`);
      setStatus('error');
      return;
    }
    trackEvent('quote_submitted', { services: form.services.join(','), files: String(media.length) });
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <section id="quote" className="section-pad bg-cream">
        <div className="container-tight rounded-2xl border-2 border-forest/10 bg-white p-8 text-center shadow-sm sm:p-12">
          <PartyPopper className="mx-auto h-12 w-12 text-orange" />
          <h2 className="mt-4 text-3xl sm:text-4xl">Got it. Thank you!</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-charcoal/80">
            We'll look over your photos and the property on the map, then call or text you within one
            business day with your estimate or to set up a quick site walk. Need it sooner? Call{' '}
            <a href={`tel:${BUSINESS.phoneRaw}`} className="font-bold text-forest underline underline-offset-2">
              {BUSINESS.phone}
            </a>
            .
          </p>
        </div>
      </section>
    );
  }

  const stepNo = stepIndex + 1;
  return (
    <section id="quote" className="section-pad scroll-mt-16 bg-cream">
      <div className="container-tight" ref={topRef}>
        <div className="mb-6 text-center">
          <span className="eyebrow">Free, no-obligation</span>
          <h2 className="text-3xl sm:text-4xl">Get an estimate now</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/75">
            Show us your land from your phone. Rate the ground and the brush, add a few photos or a quick
            walk-through video, and we'll get back to you within one business day.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mx-auto max-w-2xl rounded-2xl border-2 border-forest/10 bg-white p-4 shadow-sm sm:p-8"
        >
          <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
            <label htmlFor="company">Company (leave blank)</label>
            <input
              id="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
            />
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-charcoal/60">
              <span>
                Step {stepNo} of {steps.length}
              </span>
              {pending.length > 0 && (
                <span className="flex items-center gap-1 normal-case text-forest">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending {pending.length} file{pending.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-charcoal/10">
              <div
                className="h-full rounded-full bg-orange transition-all"
                style={{ width: `${(stepNo / steps.length) * 100}%` }}
              />
            </div>
            <h3 className="mt-4 text-2xl normal-case sm:text-3xl">{STEP_TITLES[step]}</h3>
          </div>

          {step === 'work' && (
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm text-charcoal/70">Pick everything that applies.</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[...SERVICES.map((s) => s.label), 'Not sure'].map((label) => {
                    const checked = form.services.includes(label);
                    return (
                      <label
                        key={label}
                        className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-[15px] transition-colors ${
                          checked ? 'border-orange bg-orange/5' : 'border-charcoal/15 hover:border-forest/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-5 w-5 shrink-0 accent-orange"
                          checked={checked}
                          onChange={() => toggle('services', label)}
                        />
                        <span className="font-semibold">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              {hasHauling && (
                <>
                  <Chips label="What are we hauling?" options={HAULING_MATERIALS} value={form.haulMaterial} onChange={(v) => update('haulMaterial', v)} />
                  <Chips label="About how much?" options={HAULING_AMOUNTS} value={form.haulAmount} onChange={(v) => update('haulAmount', v)} />
                </>
              )}
              {!onlyHauling && (
                <Chips label="About how big is the area?" options={SIZES} value={form.approxSize} onChange={(v) => update('approxSize', v)} />
              )}
            </div>
          )}

          {step === 'terrain' && (
            <div className="space-y-6">
              <p className="text-charcoal/75">
                Walk to the <strong>steepest part</strong> of the area you want cleared. Which picture looks most like it?
              </p>
              <TierPicker
                tiers={TERRAIN_TIERS}
                value={form.terrainTier}
                onChange={(v) => update('terrainTier', v)}
                art={(t) => <TerrainArt tier={t} />}
              />
              <UploadBox
                slot="terrain"
                title="Photo of the steepest part"
                hint="Stand at the bottom and shoot uphill, or from the side so we can see the slope."
                uploads={uploads}
                onAdd={addFiles}
                onRemove={removeUpload}
                onRetry={retryUpload}
              />
            </div>
          )}

          {step === 'brush' && (
            <div className="space-y-6">
              <p className="text-charcoal/75">How thick is what's growing there? Pick the closest match.</p>
              <TierPicker
                tiers={BRUSH_TIERS}
                value={form.brushTier}
                onChange={(v) => update('brushTier', v)}
                art={(t) => <BrushArt tier={t} />}
              />
              <UploadBox
                slot="brush"
                title="Photo that shows the brush"
                hint="Step back a few feet and take a photo of the thickest part."
                uploads={uploads}
                onAdd={addFiles}
                onRemove={removeUpload}
                onRetry={retryUpload}
              />
            </div>
          )}

          {step === 'items' && (
            <div className="space-y-6">
              <p className="text-charcoal/75">
                Is there anything else we should know about? Check each one and add a photo of it.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {ITEMS.map((item) => {
                  const checked = form.items.includes(item);
                  return (
                    <label
                      key={item}
                      className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-2 text-[15px] transition-colors ${
                        checked ? 'border-orange bg-orange/5' : 'border-charcoal/15 hover:border-forest/40'
                      }`}
                    >
                      <input type="checkbox" className="h-5 w-5 shrink-0 accent-orange" checked={checked} onChange={() => toggle('items', item)} />
                      <span className="font-semibold">{item}</span>
                    </label>
                  );
                })}
              </div>
              <UploadBox
                slot="items"
                title="Photos of trees and other items"
                hint="Big trees: stand back so we can see the whole tree. Trees you want to keep: we'll work around them."
                uploads={uploads}
                onAdd={addFiles}
                onRemove={removeUpload}
                onRetry={retryUpload}
              />
            </div>
          )}

          {step === 'walk' && (
            <div className="space-y-6">
              <div className="rounded-xl bg-forest p-4 text-white sm:p-5">
                <p className="font-heading text-lg uppercase tracking-wide text-orange-light">Walk it and talk</p>
                <p className="mt-1 text-white/85">
                  Take a slow 1 to 3 minute video while you walk the area and tell us what you want done. It
                  helps us give you a real number without a trip out.
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-white/85">
                  {[
                    'Start where the work begins and walk to where it ends',
                    'Show what you want gone and what you want to keep',
                    'Point out steep spots, soft or wet ground, and big trees',
                    'Show where a truck and trailer can get in',
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <UploadBox
                slot="walkthrough"
                title="Walk-through video and any other photos"
                hint="Any length is fine. Long videos keep sending while you finish the form."
                uploads={uploads}
                onAdd={addFiles}
                onRemove={removeUpload}
                onRetry={retryUpload}
                record
              />
              <Field label="Describe your project" htmlFor="description" optional>
                <textarea
                  id="description"
                  rows={5}
                  className="form-input"
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="What do you want it to look like when we're done? Building site, pasture, trails, a view? Anything we should know about access, gates or timing?"
                />
                <p className="mt-1 text-xs text-charcoal/55">Tip: tap the microphone on your phone's keyboard to talk instead of type.</p>
              </Field>
            </div>
          )}

          {step === 'where' && (
            <div className="space-y-5">
              <p className="text-charcoal/75">
                We look up every property on Google Maps and Google Earth before we call you, so we can see the
                land and the way in.
              </p>
              <button
                type="button"
                onClick={useMyLocation}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-forest bg-forest/5 px-4 py-3.5 font-bold text-forest"
              >
                {locating ? <Loader2 className="h-5 w-5 animate-spin" /> : <LocateFixed className="h-5 w-5" />}
                {coords ? 'Location added. Tap to update' : "I'm on the property: use my location"}
              </button>
              <Field label="Street address or road" htmlFor="street">
                <input id="street" className="form-input" autoComplete="street-address" value={form.street} onChange={(e) => update('street', e.target.value)} placeholder="12345 State Route 93" />
              </Field>
              <div className="grid grid-cols-[1fr_8rem] gap-3">
                <Field label="Town or county" htmlFor="town" required>
                  <input id="town" className="form-input" autoComplete="address-level2" value={form.town} onChange={(e) => update('town', e.target.value)} placeholder="Logan" />
                </Field>
                <Field label="ZIP" htmlFor="zip">
                  <input id="zip" className="form-input" inputMode="numeric" autoComplete="postal-code" maxLength={5} value={form.zip} onChange={(e) => update('zip', e.target.value.replace(/\D/g, ''))} placeholder="43138" />
                </Field>
              </div>
              {mapPreview && (
                <div className="overflow-hidden rounded-xl border-2 border-forest/10">
                  <iframe
                    title="Map of the property"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapPreview)}&t=k&z=17&output=embed`}
                    className="h-56 w-full sm:h-72"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <p className="flex items-center gap-1.5 bg-cream px-3 py-2 text-xs text-charcoal/70">
                    <MapPin className="h-4 w-4 text-orange" /> Is this the right spot? If not, fix the address above.
                  </p>
                </div>
              )}
              <Field label="Gate code, driveway or access notes" htmlFor="access" optional>
                <input id="access" className="form-input" value={form.access} onChange={(e) => update('access', e.target.value)} placeholder="Second gravel drive past the red barn" />
              </Field>
              <Chips label="How soon do you need it done?" options={HOW_SOON} value={form.howSoon} onChange={(v) => update('howSoon', v)} required />
            </div>
          )}

          {step === 'contact' && (
            <div className="space-y-5">
              <Field label="Your name" htmlFor="name" required>
                <input id="name" className="form-input" autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} />
              </Field>
              <Field label="Mobile phone" htmlFor="phone" required>
                <input id="phone" type="tel" inputMode="tel" className="form-input" autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(740) 555-0123" />
              </Field>
              <Field label="Email" htmlFor="email" optional>
                <input id="email" type="email" inputMode="email" className="form-input" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
              </Field>
              <Chips label="Best way to reach you" options={CONTACT} value={form.preferredContact} onChange={(v) => update('preferredContact', v)} />
              <Chips label="How did you hear about us?" options={REFERRAL} value={form.referral} onChange={(v) => update('referral', v)} />
              {pending.length > 0 && (
                <p className="rounded-lg bg-cream p-3 text-sm text-charcoal/75">
                  Your photos and videos are still sending. You can press the button now; we'll finish sending
                  them first. Keep this page open until you see "Got it".
                </p>
              )}
            </div>
          )}

          {error && (
            <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <div className="sticky bottom-[64px] z-10 -mx-4 mt-8 flex items-center gap-3 border-t border-charcoal/10 bg-white/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex items-center gap-2 rounded-md border-2 border-charcoal/25 px-4 py-3 text-sm font-bold uppercase tracking-wide text-charcoal hover:bg-charcoal/5"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
            {isLast ? (
              <button type="submit" disabled={status === 'submitting'} className="btn-primary flex-1 disabled:opacity-60 sm:ml-auto sm:flex-none">
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {pending.length ? `Sending files (${pending.length} left)` : 'Sending...'}
                  </>
                ) : (
                  'Send my estimate request'
                )}
              </button>
            ) : (
              <button type="button" onClick={() => go(1)} className="btn-primary flex-1 sm:ml-auto sm:flex-none">
                Next <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="mt-4 text-center text-sm text-charcoal/60">
            Rather talk? Call or text{' '}
            <a href={`tel:${BUSINESS.phoneRaw}`} className="font-bold text-forest">
              {BUSINESS.phone}
            </a>
          </p>
        </form>
      </div>

      <style>{`
        .form-input { width: 100%; border-radius: 0.6rem; border: 2px solid rgba(34,34,34,0.18); background: #fff; padding: 0.7rem 0.8rem; font-size: 16px; color: #222; }
        .form-input:focus { outline: none; border-color: #F26B1D; box-shadow: 0 0 0 3px rgba(242,107,29,0.2); }
      `}</style>
    </section>
  );
}

function TierPicker({
  tiers,
  value,
  onChange,
  art,
}: {
  tiers: { tier: 1 | 2 | 3; title: string; text: string }[];
  value: number;
  onChange: (v: number) => void;
  art: (t: 1 | 2 | 3) => React.ReactNode;
}) {
  return (
    <div role="radiogroup" className="grid gap-3 sm:grid-cols-3">
      {tiers.map((t) => {
        const checked = value === t.tier;
        return (
          <label
            key={t.tier}
            className={`relative flex cursor-pointer gap-3 rounded-xl border-2 p-3 transition-colors sm:flex-col ${
              checked ? 'border-orange bg-orange/5 ring-2 ring-orange/30' : 'border-charcoal/15 hover:border-forest/40'
            }`}
          >
            <input type="radio" className="sr-only" checked={checked} onChange={() => onChange(t.tier)} />
            <div className="w-32 shrink-0 sm:w-full">{art(t.tier)}</div>
            <div>
              <p className="font-heading text-lg uppercase leading-tight text-forest">{t.title}</p>
              <p className="mt-1 text-sm leading-snug text-charcoal/75">{t.text}</p>
            </div>
            {checked && (
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange text-white">
                <Check className="h-4 w-4" />
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}

function UploadBox({
  slot,
  title,
  hint,
  uploads,
  onAdd,
  onRemove,
  onRetry,
  record,
}: {
  slot: UploadSlot;
  title: string;
  hint: string;
  uploads: UploadItem[];
  onAdd: (slot: UploadSlot, files: FileList | null) => void;
  onRemove: (key: string) => void;
  onRetry: (item: UploadItem) => void;
  record?: boolean;
}) {
  const pickRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);
  const mine = uploads.filter((u) => u.slot === slot);
  return (
    <div className="rounded-xl border-2 border-dashed border-forest/30 bg-cream/60 p-4">
      <p className="font-bold text-charcoal">{title}</p>
      <p className="mt-0.5 text-sm text-charcoal/65">{hint}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => camRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-lg bg-orange px-4 py-3.5 font-bold text-white shadow-sm"
        >
          {record ? <Video className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
          {record ? 'Record a video now' : 'Take a photo now'}
        </button>
        <button
          type="button"
          onClick={() => pickRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-forest bg-white px-4 py-3 font-bold text-forest"
        >
          <Upload className="h-5 w-5" /> Choose from phone
        </button>
      </div>
      <input
        ref={camRef}
        type="file"
        accept={record ? 'video/*' : 'image/*'}
        capture="environment"
        className="hidden"
        onChange={(e) => {
          onAdd(slot, e.target.files);
          e.target.value = '';
        }}
      />
      <input
        ref={pickRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(e) => {
          onAdd(slot, e.target.files);
          e.target.value = '';
        }}
      />
      {mine.length > 0 && (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {mine.map((u) => (
            <li key={u.key} className="relative aspect-square overflow-hidden rounded-lg bg-charcoal/10">
              {u.preview ? (
                <img src={u.preview} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-forest text-white">
                  <Video className="h-6 w-6" />
                  <span className="px-1 text-center text-[10px] leading-tight">{Math.round(u.file.size / 1048576)} MB</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/30">
                <div
                  className={`h-full ${u.status === 'error' ? 'bg-red-500' : u.status === 'done' ? 'bg-green-500' : 'bg-orange'}`}
                  style={{ width: `${Math.max(4, u.progress * 100)}%` }}
                />
              </div>
              {u.status === 'done' && (
                <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
              {u.status === 'error' && (
                <button type="button" onClick={() => onRetry(u)} className="absolute inset-0 flex items-center justify-center bg-black/55 text-xs font-bold text-white">
                  Tap to retry
                </button>
              )}
              <button
                type="button"
                onClick={() => onRemove(u.key)}
                aria-label="Remove"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-bold text-charcoal">
        {label}
        {required && <span className="text-orange"> *</span>}
        {optional && <span className="ml-1 text-xs font-medium text-charcoal/50">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function Chips({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <p className="mb-2 text-sm font-bold text-charcoal">
        {label}
        {required && <span className="text-orange"> *</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={`cursor-pointer rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                checked ? 'border-orange bg-orange text-white' : 'border-charcoal/20 bg-white text-charcoal hover:border-forest/40'
              }`}
            >
              <input type="radio" className="sr-only" checked={checked} onChange={() => onChange(opt)} />
              {opt}
            </label>
          );
        })}
      </div>
    </div>
  );
}
