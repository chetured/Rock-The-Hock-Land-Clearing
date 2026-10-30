import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  X,
  Loader2,
  Phone,
  PartyPopper,
} from 'lucide-react';
import { BUSINESS, FORM_ENDPOINT, SERVICES } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/lib/analytics';

type FormState = {
  services: string[];
  approxSize: string;
  vegetation: string;
  addressOrRoad: string;
  townCounty: string;
  howSoon: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  siteWalkDate: string;
  siteWalkTime: string;
  referral: string;
  // honeypot
  company: string;
};

const SIZES = ['Under 1 acre', '1 to 3 acres', '3 to 10 acres', '10+ acres', 'Not sure'];
const VEG = [
  'Light brush and weeds',
  'Thick brush and small trees under 4 in',
  'Trees 4 to 8 in',
  'Mixed or not sure',
];
const HOW_SOON = ['ASAP', 'Within 2 weeks', 'Within a month', 'Just planning'];
const CONTACT = ['Call', 'Text', 'Email'];
const TIME = ['Morning', 'Afternoon'];
const REFERRAL = ['Google', 'Facebook', 'Nextdoor', 'Saw our truck/sign', 'Friend or neighbor', 'Other'];

const initialState: FormState = {
  services: [],
  approxSize: '',
  vegetation: '',
  addressOrRoad: '',
  townCounty: '',
  howSoon: '',
  notes: '',
  name: '',
  phone: '',
  email: '',
  preferredContact: 'Text',
  siteWalkDate: '',
  siteWalkTime: '',
  referral: '',
  company: '',
};

// Accepts US phone formats like (614) 379-2170, 614-379-2170, 6143792170.
function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function QuoteForm({ presetService }: { presetService?: string }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [form, setForm] = useState<FormState>(() =>
    presetService ? { ...initialState, services: [presetService] } : initialState,
  );
  const fileRef = useRef<HTMLInputElement>(null);

  // When a service card's "Get a quote for this" link is clicked after the form
  // has mounted, preselect that service and jump to step 1 so the visitor sees it.
  useEffect(() => {
    if (!presetService) return;
    setForm((f) =>
      f.services.includes(presetService)
        ? f
        : { ...f, services: [presetService] },
    );
    setStep(1);
  }, [presetService]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleService(label: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(label)
        ? f.services.filter((s) => s !== label)
        : [...f.services, label],
    }));
  }

  function onFiles(files: FileList | null) {
    if (!files) return;
    const next = [...photos];
    for (const f of Array.from(files)) {
      if (next.length >= 5) break;
      next.push(f);
    }
    setPhotos(next.slice(0, 5));
  }

  function removePhoto(idx: number) {
    setPhotos(photos.filter((_, i) => i !== idx));
  }

  function stepValid(): boolean {
    if (step === 1) return form.services.length > 0 && !!form.approxSize && !!form.vegetation;
    if (step === 2) return !!form.townCounty.trim() && !!form.howSoon;
    if (step === 3)
      return !!form.name.trim() && isValidPhone(form.phone) && !!form.preferredContact;
    return false;
  }

  function next() {
    if (!stepValid()) return;
    setError('');
    setStep((s) => Math.min(3, s + 1));
  }
  function back() {
    setError('');
    setStep((s) => Math.max(1, s - 1));
  }

  async function uploadPhotos(): Promise<string[]> {
    if (!supabase || photos.length === 0) return [];
    const urls: string[] = [];
    for (let i = 0; i < photos.length; i++) {
      const file = photos[i];
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('quote-photos')
        .upload(path, file, { contentType: file.type || 'image/jpeg' });
      if (upErr) {
        console.error('Photo upload failed:', upErr.message);
        continue;
      }
      const { data } = supabase.storage.from('quote-photos').getPublicUrl(path);
      if (data?.publicUrl) urls.push(data.publicUrl);
    }
    return urls;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stepValid()) {
      setError('Please complete the required fields.');
      return;
    }
    // Honeypot: bots fill this; humans never see it.
    if (form.company) {
      setStatus('success');
      return;
    }
    setStatus('submitting');
    setError('');

    // Upload photos first (best effort). If this fails, we still submit the
    // rest of the request without photo links.
    let photoUrls: string[] = [];
    try {
      photoUrls = await uploadPhotos();
    } catch {
      photoUrls = [];
    }

    // Save to the database first, then email via Formspree. The two are
    // independent: a failure in one must not stop the other. Show success if
    // either one succeeded; show the error only if both fail.
    let dbSaved = false;
    let emailSent = false;

    // 1) Database insert.
    if (supabase) {
      try {
        const { error: dbError } = await supabase.from('quote_requests').insert({
          services: form.services,
          approx_size: form.approxSize,
          vegetation: form.vegetation,
          address_or_road: form.addressOrRoad,
          town_county: form.townCounty,
          how_soon: form.howSoon,
          notes: form.notes,
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          preferred_contact: form.preferredContact,
          site_walk_date: form.siteWalkDate || null,
          site_walk_time: form.siteWalkTime || null,
          referral_source: form.referral || null,
          photo_urls: photoUrls,
        });
        if (dbError) {
          console.error('Supabase insert failed:', dbError.message);
        } else {
          dbSaved = true;
        }
      } catch (err) {
        console.error('Supabase insert threw:', err);
      }
    }

    // 2) Email via Formspree (JSON, no file attachments — free plan).
    try {
      const body: Record<string, string> = {
        services: form.services.join(', '),
        approx_size: form.approxSize,
        vegetation: form.vegetation,
        address_or_road: form.addressOrRoad,
        town_county: form.townCounty,
        how_soon: form.howSoon,
        notes: form.notes,
        name: form.name,
        phone: form.phone,
        email: form.email,
        preferred_contact: form.preferredContact,
        site_walk_date: form.siteWalkDate,
        site_walk_time: form.siteWalkTime,
        referral: form.referral,
        photo_links: photoUrls.join('\n'),
        _subject: `New quote request from ${form.name} — Rock The Hock`,
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
      console.error('Formspree send failed:', err);
    }

    if (!dbSaved && !emailSent) {
      setError(
        `We couldn’t send your request right now. Please call ${BUSINESS.phone} and we’ll get you on the schedule.`,
      );
      setStatus('error');
      return;
    }

    trackEvent('quote_submitted', { services: form.services.join(',') });
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <section id="quote" className="section-pad bg-cream">
        <div className="container-tight rounded-2xl border-2 border-forest/10 bg-white p-8 text-center shadow-sm sm:p-12">
          <PartyPopper className="mx-auto h-12 w-12 text-orange" />
          <h2 className="mt-4 text-3xl sm:text-4xl">Got it.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-charcoal/80">
            We'll call or text you within one business day to set up your free estimate. Need it
            sooner? Call{' '}
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="font-bold text-forest underline underline-offset-2"
            >
              {BUSINESS.phone}
            </a>
            .
          </p>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-primary mt-6">
            <Phone className="h-5 w-5" /> Call us now
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="section-pad bg-cream">
      <div className="container-tight">
        <div className="mb-6 text-center">
          <span className="eyebrow">Free, no-obligation</span>
          <h2 className="text-3xl sm:text-4xl">Get your free quote</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/75">
            Three quick steps. We call or text you back within one business day.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mb-8 max-w-xl">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-1 items-center">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                    step >= n
                      ? 'border-orange bg-orange text-white'
                      : 'border-charcoal/25 bg-white text-charcoal/40'
                  }`}
                  aria-hidden="true"
                >
                  {step > n ? <Check className="h-5 w-5" /> : n}
                </div>
                {n < 3 && (
                  <div
                    className={`h-1 flex-1 ${step > n ? 'bg-orange' : 'bg-charcoal/15'}`}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs font-bold uppercase tracking-wide">
            <span className={step >= 1 ? 'text-forest' : 'text-charcoal/40'}>What do you need?</span>
            <span className={step >= 2 ? 'text-forest' : 'text-charcoal/40'}>Where is it?</span>
            <span className={step >= 3 ? 'text-forest' : 'text-charcoal/40'}>Reach you</span>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto max-w-2xl rounded-2xl border-2 border-forest/10 bg-white p-6 shadow-sm sm:p-8"
          noValidate
        >
          {/* Honeypot — visually hidden, off-screen, ignored by humans */}
          <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
            <label htmlFor="company">Company (leave blank)</label>
            <input
              id="company"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
            />
          </div>

          {step === 1 && (
            <fieldset className="space-y-6">
              <legend className="sr-only">What do you need?</legend>
              <div>
                <p className="mb-2 font-heading text-xl uppercase">What do you need?</p>
                <p className="mb-3 text-sm text-charcoal/60">Pick all that apply.</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SERVICES.map((s) => {
                    const checked = form.services.includes(s.label);
                    return (
                      <label
                        key={s.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 text-sm transition-colors ${
                          checked
                            ? 'border-orange bg-orange/5'
                            : 'border-charcoal/15 hover:border-forest/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 h-5 w-5 shrink-0 accent-orange"
                          checked={checked}
                          onChange={() => toggleService(s.label)}
                        />
                        <span className="font-semibold">{s.label}</span>
                      </label>
                    );
                  })}
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 text-sm transition-colors ${
                      form.services.includes('Not sure')
                        ? 'border-orange bg-orange/5'
                        : 'border-charcoal/15 hover:border-forest/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 h-5 w-5 shrink-0 accent-orange"
                      checked={form.services.includes('Not sure')}
                      onChange={() => toggleService('Not sure')}
                    />
                    <span className="font-semibold">Not sure</span>
                  </label>
                </div>
              </div>

              <ChoiceGroup
                label="Approximate size"
                name="approxSize"
                options={SIZES}
                value={form.approxSize}
                onChange={(v) => update('approxSize', v)}
              />
              <ChoiceGroup
                label="What is growing there?"
                name="vegetation"
                options={VEG}
                value={form.vegetation}
                onChange={(v) => update('vegetation', v)}
              />
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="space-y-6">
              <legend className="sr-only">Where is it?</legend>
              <p className="font-heading text-xl uppercase">Where is it?</p>

              <Field label="Property address or nearest road" htmlFor="addressOrRoad" optional>
                <input
                  id="addressOrRoad"
                  type="text"
                  className="form-input"
                  value={form.addressOrRoad}
                  onChange={(e) => update('addressOrRoad', e.target.value)}
                  placeholder="e.g. 1234 St Rt 664, or just the nearest road"
                />
              </Field>

              <Field label="Town / county" htmlFor="townCounty" required>
                <input
                  id="townCounty"
                  type="text"
                  className="form-input"
                  value={form.townCounty}
                  onChange={(e) => update('townCounty', e.target.value)}
                  placeholder="e.g. Logan, Hocking County"
                />
              </Field>

              <ChoiceGroup
                label="How soon?"
                name="howSoon"
                options={HOW_SOON}
                value={form.howSoon}
                onChange={(v) => update('howSoon', v)}
              />

              <Field label="Photos (up to 5)" htmlFor="photos" optional>
                <input
                  ref={fileRef}
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => onFiles(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-md border-2 border-forest/30 px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
                >
                  <Upload className="h-4 w-4" /> Choose photos
                </button>
                {photos.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {photos.map((p, i) => (
                      <li
                        key={`${p.name}-${i}`}
                        className="flex items-center justify-between rounded bg-charcoal/5 px-3 py-2 text-sm"
                      >
                        <span className="truncate">{p.name}</span>
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded text-charcoal/60 hover:bg-charcoal/10"
                          aria-label={`Remove ${p.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Field>

              <Field label="Notes (optional)" htmlFor="notes" optional>
                <textarea
                  id="notes"
                  rows={3}
                  className="form-input"
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  placeholder="Anything else we should know? Slopes, wet ground, access, etc."
                />
              </Field>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset className="space-y-6">
              <legend className="sr-only">How do we reach you?</legend>
              <p className="font-heading text-xl uppercase">How do we reach you?</p>

              <Field label="Your name" htmlFor="name" required>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  autoComplete="name"
                />
              </Field>

              <Field label="Mobile phone" htmlFor="phone" required>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="(614) 379-2170"
                  autoComplete="tel"
                  aria-invalid={form.phone.length > 0 && !isValidPhone(form.phone)}
                />
                {form.phone.length > 0 && !isValidPhone(form.phone) && (
                  <p className="mt-1 text-sm text-red-600">Enter a valid 10-digit phone number.</p>
                )}
              </Field>

              <Field label="Email" htmlFor="email" optional>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  autoComplete="email"
                />
              </Field>

              <ChoiceGroup
                label="Preferred contact"
                name="preferredContact"
                options={CONTACT}
                value={form.preferredContact}
                onChange={(v) => update('preferredContact', v)}
              />

              <div>
                <p className="mb-2 font-heading text-lg uppercase">
                  Want a free site walk? <span className="font-sans text-sm normal-case text-charcoal/60">Optional</span>
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Preferred day" htmlFor="siteWalkDate" optional inline>
                    <input
                      id="siteWalkDate"
                      type="date"
                      className="form-input"
                      value={form.siteWalkDate}
                      onChange={(e) => update('siteWalkDate', e.target.value)}
                    />
                  </Field>
                  <ChoiceGroup
                    label="Time of day"
                    name="siteWalkTime"
                    options={TIME}
                    value={form.siteWalkTime}
                    onChange={(v) => update('siteWalkTime', v)}
                    inline
                  />
                </div>
              </div>

              <ChoiceGroup
                label="How did you hear about us?"
                name="referral"
                options={REFERRAL}
                value={form.referral}
                onChange={(v) => update('referral', v)}
              />
            </fieldset>
          )}

          {error && (
            <p role="alert" className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={back}
                className="inline-flex items-center gap-2 rounded-md border-2 border-charcoal/25 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-charcoal hover:bg-charcoal/5"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <span />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                disabled={!stepValid()}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                  </>
                ) : (
                  <>Send my free quote request</>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 2px solid rgba(34,34,34,0.18);
          background: #fff;
          padding: 0.625rem 0.75rem;
          font-size: 1rem;
          color: #222;
        }
        .form-input:focus {
          outline: none;
          border-color: #F26B1D;
          box-shadow: 0 0 0 3px rgba(242,107,29,0.2);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  inline,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  inline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={inline ? '' : ''}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-bold text-charcoal">
        {label}
        {required && <span className="text-orange"> *</span>}
        {optional && <span className="ml-1 text-xs font-medium text-charcoal/50">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function ChoiceGroup({
  label,
  name,
  options,
  value,
  onChange,
  inline,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  inline?: boolean;
}) {
  return (
    <div role="group" aria-label={label}>
      <p className="mb-2 text-sm font-bold text-charcoal">{label}</p>
      <div className={`flex flex-wrap gap-2 ${inline ? '' : ''}`}>
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                checked
                  ? 'border-orange bg-orange text-white'
                  : 'border-charcoal/20 bg-white text-charcoal hover:border-forest/40'
              }`}
            >
              <input
                type="radio"
                name={name}
                className="sr-only"
                checked={checked}
                onChange={() => onChange(opt)}
              />
              {opt}
            </label>
          );
        })}
      </div>
    </div>
  );
}
