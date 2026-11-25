import { Fragment, useMemo, useState, type FormEvent } from 'react';
import {
  Truck,
  Wrench,
  Package,
  Plus,
  Check,
  Calendar,
  MapPin,
  Shield,
  Loader2,
  Phone,
  PartyPopper,
  Copy,
  Printer,
  Trash2,
} from 'lucide-react';
import { BUSINESS, FORM_ENDPOINT, PHOTO_BASE } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/lib/analytics';
import {
  RENTAL_ITEMS,
  TOWN_MILES,
  computeQuote,
  computeDelivery,
  rentalDays,
  formatBlocks,
  usd,
  buildPlainTextQuote,
  BUCKET,
  quoteIncludesBucket,
  type QuoteResult,
} from '@/lib/rentals';

const CATEGORY_ICON = {
  Machine: Truck,
  Attachment: Wrench,
  Package: Package,
} as const;

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

type ReservationForm = {
  name: string;
  phone: string;
  email: string;
  company: string;
  address: string;
  hasInsurance: string;
  wantsOperator: boolean;
  notes: string;
};

const initialRes: ReservationForm = {
  name: '',
  phone: '',
  email: '',
  company: '',
  address: '',
  hasInsurance: '',
  wantsOperator: false,
  notes: '',
};

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

export default function RentalBuilder() {
  const [cart, setCart] = useState<string[]>([]);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [halfDay, setHalfDay] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'deliver'>('pickup');
  const [town, setTown] = useState('Logan');
  const [miles, setMiles] = useState(0);
  const [waiver, setWaiver] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [resForm, setResForm] = useState<ReservationForm>(initialRes);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const days = useMemo(() => rentalDays(pickupDate, returnDate), [pickupDate, returnDate]);
  const sameDay = !!(pickupDate && returnDate && days <= 0);
  const effectiveDays = sameDay ? 1 : days;

  const quote: QuoteResult = useMemo(
    () =>
      computeQuote({
        cart,
        items: RENTAL_ITEMS,
        days: effectiveDays,
        halfDay: sameDay && halfDay,
        waiver,
        delivery: deliveryMode === 'deliver',
        miles,
      }),
    [cart, effectiveDays, sameDay, halfDay, waiver, deliveryMode, miles],
  );

  const hasMachine = cart.includes('cat-289d3') || cart.includes('mulcher-package');

  function toggleItem(id: string) {
    setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  }

  function addMachine() {
    if (!cart.includes('cat-289d3')) setCart((c) => [...c, 'cat-289d3']);
  }

  function handleTownChange(t: string) {
    setTown(t);
    setMiles(TOWN_MILES[t] ?? 0);
  }

  function updateRes<K extends keyof ReservationForm>(key: K, value: ReservationForm[K]) {
    setResForm((f) => ({ ...f, [key]: value }));
  }

  const plainText = useMemo(
    () =>
      buildPlainTextQuote({
        quote,
        pickup: pickupDate,
        returnDate,
        halfDay: sameDay && halfDay,
        delivery: deliveryMode === 'deliver',
        miles,
        town,
      }),
    [quote, pickupDate, returnDate, sameDay, halfDay, deliveryMode, miles, town],
  );

  function copyQuote() {
    navigator.clipboard?.writeText(plainText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function printQuote() {
    window.print();
  }

  function reserveClicked() {
    setShowForm(true);
    requestAnimationFrame(() => {
      document.getElementById('rental-reservation')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  async function onReserve(e: FormEvent) {
    e.preventDefault();
    if (!resForm.name.trim() || !isValidPhone(resForm.phone)) {
      setError('Please enter your name and a valid phone number.');
      return;
    }
    if (deliveryMode === 'deliver' && !resForm.address.trim()) {
      setError('Please enter the delivery address.');
      return;
    }
    setStatus('submitting');
    setError('');

    const itemsJson = quote.items.map((i) => ({
      id: i.itemId,
      name: i.name,
      breakdown: formatBlocks(i.blocks),
      cost: i.cost,
    }));

    let dbSaved = false;
    let emailSent = false;

    // 1) Database insert
    if (supabase) {
      try {
        const { error: dbError } = await supabase.from('rental_requests').insert({
          name: resForm.name,
          phone: resForm.phone,
          email: resForm.email || null,
          company: resForm.company || null,
          delivery: deliveryMode === 'deliver',
          address: resForm.address || null,
          has_insurance: resForm.hasInsurance === 'yes',
          wants_operator: resForm.wantsOperator,
          notes: resForm.notes || null,
          items: itemsJson,
          pickup_date: pickupDate || null,
          return_date: returnDate || null,
          half_day: sameDay && halfDay,
          delivery_miles: deliveryMode === 'deliver' ? miles : null,
          damage_waiver: waiver,
          subtotal: quote.subtotal,
          waiver_amount: quote.waiver,
          delivery_cost: quote.delivery,
          tax: quote.tax,
          total: quote.total,
          deposit: quote.deposit,
        });
        if (dbError) {
          console.error('Supabase rental insert failed:', dbError.message);
        } else {
          dbSaved = true;
        }
      } catch (err) {
        console.error('Supabase rental insert threw:', err);
      }
    }

    // 2) Email via Formspree
    try {
      const body: Record<string, string> = {
        type: 'RENTAL REQUEST',
        name: resForm.name,
        phone: resForm.phone,
        email: resForm.email,
        company: resForm.company,
        delivery: deliveryMode === 'deliver' ? `Yes — ${town} (${miles} mi)` : 'Pickup in Logan',
        address: resForm.address,
        has_insurance: resForm.hasInsurance,
        wants_operator: resForm.wantsOperator ? 'Yes' : 'No',
        notes: resForm.notes,
        pickup_date: pickupDate,
        return_date: returnDate,
        half_day: sameDay && halfDay ? 'Yes' : 'No',
        quote: plainText,
        _subject: `New RENTAL request from ${resForm.name} — Rock The Hock`,
      };
      if (resForm.email) body._replyto = resForm.email;

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Form backend returned ${res.status}`);
      emailSent = true;
    } catch (err) {
      console.error('Formspree rental send failed:', err);
    }

    if (!dbSaved && !emailSent) {
      setError(
        `We couldn't send your reservation right now. Please call ${BUSINESS.phone} and we'll get you set up.`,
      );
      setStatus('error');
      return;
    }

    trackEvent('rental_request_submitted', { items: cart.join(',') });
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border-2 border-forest/10 bg-white p-8 text-center shadow-sm sm:p-12">
        <PartyPopper className="mx-auto h-12 w-12 text-orange" />
        <h3 className="mt-4 text-2xl sm:text-3xl">Got it.</h3>
        <p className="mx-auto mt-4 max-w-xl text-lg text-charcoal/80">
          We'll call to confirm availability, usually same day. Need it sooner? Call{' '}
          <a href={`tel:${BUSINESS.phoneRaw}`} className="font-bold text-forest underline underline-offset-2">
            {BUSINESS.phone}
          </a>
          .
        </p>
        <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-primary mt-6">
          <Phone className="h-5 w-5" /> Call us now
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* LEFT: equipment + details */}
        <div className="space-y-6">
          {/* Equipment cards */}
          <div>
            <h3 className="text-xl normal-case">Equipment</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {RENTAL_ITEMS.map((item) => {
                const Icon = CATEGORY_ICON[item.category];
                const inCart = cart.includes(item.id);
                const needsMachine = item.requiresMachine && !hasMachine;
                return (
                  <Fragment key={item.id}>
                  <article
                    className={`flex flex-col overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-all ${
                      inCart ? 'border-orange' : 'border-forest/10 hover:border-forest/30'
                    }`}
                  >
                    {item.image && (
                      <div className={`aspect-[4/3] w-full ${item.imageContain ? 'bg-white' : ''}`}>
                        <img
                          src={`${PHOTO_BASE}${item.image}.${item.imageExt ?? 'jpg'}`}
                          alt={item.name}
                          loading="lazy"
                          className={`h-full w-full ${item.imageContain ? 'object-contain' : 'object-cover'}`}
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      {!item.image && <Icon className="h-8 w-8 shrink-0 text-forest" />}
                      <span className="ml-auto rounded-full bg-forest/8 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-forest">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="mt-3 text-base normal-case">{item.name}</h4>
                    {item.badge && (
                      <span className="mt-2 inline-block rounded bg-orange/12 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-orange-dark">
                        {item.badge}
                      </span>
                    )}
                    <p className="mt-1 flex-1 text-sm text-charcoal/70">{item.blurb}</p>
                    {item.specs && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {item.specs.map((s) => (
                          <li key={s} className="rounded bg-forest/8 px-2 py-0.5 text-xs font-medium text-forest">
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.includesBucket && (
                      <div className="mt-3 flex items-center gap-3 rounded-lg bg-forest/6 p-2.5">
                        <img
                          src={`${PHOTO_BASE}cat-bucket.webp`}
                          alt="Cat smooth bucket"
                          loading="lazy"
                          className="h-16 w-16 shrink-0 rounded bg-white object-contain"
                        />
                        <span className="text-xs font-semibold text-forest">
                          Cat smooth bucket included at no charge
                        </span>
                      </div>
                    )}

                    <div className="mt-3 grid grid-cols-4 gap-1 text-center text-xs">
                      <div>
                        <div className="font-bold text-charcoal">{item.rate4hr ? usd(item.rate4hr) : '—'}</div>
                        <div className="text-charcoal/50">4hr</div>
                      </div>
                      <div>
                        <div className="font-bold text-charcoal">{usd(item.rateDay)}</div>
                        <div className="text-charcoal/50">day</div>
                      </div>
                      <div>
                        <div className="font-bold text-charcoal">{usd(item.rateWeek)}</div>
                        <div className="text-charcoal/50">week</div>
                      </div>
                      <div>
                        <div className="font-bold text-charcoal">{usd(item.rate4Week)}</div>
                        <div className="text-charcoal/50">4wk</div>
                      </div>
                    </div>

                    {item.notes && <p className="mt-3 text-xs text-charcoal/60">{item.notes}</p>}

                    {needsMachine && (
                      <div className="mt-3 rounded-lg bg-orange/8 p-3 text-xs">
                        <p className="text-charcoal/80">
                          Attachments need the Cat 289D3 or mulching package in your cart.
                        </p>
                        <button
                          type="button"
                          onClick={addMachine}
                          className="mt-2 inline-flex items-center gap-1 font-bold uppercase tracking-wide text-orange hover:text-orange-dark"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add the Cat 289D3
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`mt-4 inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                        inCart
                          ? 'bg-forest text-white hover:bg-forest-dark'
                          : 'border-2 border-forest text-forest hover:bg-forest hover:text-white'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="h-4 w-4" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" /> Add
                        </>
                      )}
                    </button>
                    </div>
                  </article>
                  {item.id === 'mulcher-package' && (
                    <article
                      className={`flex flex-col overflow-hidden rounded-xl border-2 bg-white shadow-sm ${
                        hasMachine ? 'border-forest' : 'border-forest/10'
                      }`}
                    >
                      <div className="aspect-[4/3] w-full bg-white">
                        <img
                          src={`${PHOTO_BASE}${BUCKET.image}`}
                          alt={BUCKET.name}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-3">
                          <span className="ml-auto rounded-full bg-forest/8 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-forest">
                            Included
                          </span>
                        </div>
                        <h4 className="mt-3 text-base normal-case">{BUCKET.name}</h4>
                        <span className="mt-2 inline-block self-start rounded bg-orange/12 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-orange-dark">
                          Always included with the skid steer
                        </span>
                        <p className="mt-1 flex-1 text-sm text-charcoal/70">{BUCKET.blurb}</p>
                        <div className="mt-3 text-center text-xs">
                          <div className="font-bold text-charcoal">{usd(0)}</div>
                          <div className="text-charcoal/50">every rental</div>
                        </div>
                        <div
                          className={`mt-4 inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide ${
                            hasMachine ? 'bg-forest text-white' : 'border-2 border-forest/20 text-forest/60'
                          }`}
                        >
                          <Check className="h-4 w-4" />
                          {hasMachine ? 'Included in your quote' : 'Comes with the Cat 289D3'}
                        </div>
                      </div>
                    </article>
                  )}
                  </Fragment>
                );
              })}
            </div>
          </div>

          {/* Rental details */}
          <div className="rounded-xl border-2 border-forest/10 bg-white p-5 shadow-sm">
            <h3 className="text-xl normal-case">Rental details</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-charcoal">
                  <Calendar className="h-4 w-4 text-forest" /> Pickup date
                </span>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="form-input mt-1.5"
                />
              </label>
              <label className="block">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-charcoal">
                  <Calendar className="h-4 w-4 text-forest" /> Return date
                </span>
                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate || undefined}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="form-input mt-1.5"
                />
              </label>
            </div>

            {sameDay && (
              <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-forest/15 p-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-orange"
                  checked={halfDay}
                  onChange={(e) => setHalfDay(e.target.checked)}
                />
                <span className="text-sm font-semibold">Half day (4 hours)</span>
              </label>
            )}

            {effectiveDays > 0 && (
              <p className="mt-3 text-sm text-charcoal/70">
                Rental length: <span className="font-bold text-forest">{sameDay && halfDay ? '4 hours' : `${effectiveDays} day${effectiveDays > 1 ? 's' : ''}`}</span>
              </p>
            )}

            {/* Delivery */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-charcoal">Pickup or delivery</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <label
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 text-sm transition-colors ${
                    deliveryMode === 'pickup' ? 'border-orange bg-orange/5' : 'border-charcoal/15'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMode"
                    className="accent-orange"
                    checked={deliveryMode === 'pickup'}
                    onChange={() => setDeliveryMode('pickup')}
                  />
                  <MapPin className="h-4 w-4 text-forest" /> I'll pick up in Logan
                </label>
                <label
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 text-sm transition-colors ${
                    deliveryMode === 'deliver' ? 'border-orange bg-orange/5' : 'border-charcoal/15'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMode"
                    className="accent-orange"
                    checked={deliveryMode === 'deliver'}
                    onChange={() => setDeliveryMode('deliver')}
                  />
                  <Truck className="h-4 w-4 text-forest" /> Deliver to my site
                </label>
              </div>

              {deliveryMode === 'deliver' && (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-charcoal">Town</span>
                    <select
                      value={town}
                      onChange={(e) => handleTownChange(e.target.value)}
                      className="form-input mt-1.5"
                    >
                      {Object.keys(TOWN_MILES).map((t) => (
                        <option key={t} value={t}>
                          {t} ({TOWN_MILES[t]} mi)
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-charcoal">Miles from Logan</span>
                    <input
                      type="number"
                      min={0}
                      value={miles}
                      onChange={(e) => setMiles(Number(e.target.value))}
                      className="form-input mt-1.5"
                    />
                  </label>
                  <p className="text-xs text-charcoal/60 sm:col-span-2">
                    Delivery: {usd(computeDelivery(miles))} round trip (within 25 mi: {usd(300)}, plus {usd(4)}/mi beyond)
                  </p>
                </div>
              )}
            </div>

            {/* Damage waiver */}
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border-2 border-forest/15 p-3">
              <input
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 accent-orange"
                checked={waiver}
                onChange={(e) => setWaiver(e.target.checked)}
              />
              <span className="text-sm">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Shield className="h-4 w-4 text-forest" /> Damage waiver (10%)
                </span>
                <span className="mt-0.5 block text-charcoal/70">
                  Covers accidental damage. Decline with proof of inland marine / equipment insurance.
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* RIGHT: sticky quote summary */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div id="rental-quote-summary" className="rounded-2xl border-2 border-forest/10 bg-white p-5 shadow-sm print:border-2 print:border-forest">
            <h3 className="text-xl normal-case">Your quote</h3>

            {cart.length === 0 ? (
              <p className="mt-4 text-sm text-charcoal/60">
                Add equipment to see your price instantly.
              </p>
            ) : (
              <>
                <div className="mt-4 space-y-3">
                  {quote.items.map((item) => (
                    <div key={item.itemId} className="flex items-start justify-between gap-2 border-b border-charcoal/10 pb-2">
                      <div className="text-sm">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-xs text-charcoal/60">{formatBlocks(item.blocks)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{usd(item.cost)}</span>
                        <button
                          type="button"
                          onClick={() => toggleItem(item.itemId)}
                          className="text-charcoal/40 hover:text-orange"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {quoteIncludesBucket(quote) && (
                    <div className="flex items-start justify-between gap-2 border-b border-charcoal/10 pb-2">
                      <div className="text-sm">
                        <div className="font-semibold">{BUCKET.name}</div>
                        <div className="text-xs text-charcoal/60">Included with the skid steer</div>
                      </div>
                      <span className="mr-6 text-sm font-bold">{usd(0)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-1.5 text-sm">
                  <Row label="Rental subtotal" value={usd(quote.subtotal)} />
                  {quote.waiver > 0 && <Row label="Damage waiver (10%)" value={usd(quote.waiver)} />}
                  {quote.delivery > 0 && <Row label="Delivery" value={usd(quote.delivery)} />}
                  <Row label="Sales tax (7.25%)" value={usd(quote.tax)} />
                  <div className="mt-2 flex justify-between border-t-2 border-forest/20 pt-2 text-lg font-bold text-forest">
                    <span>Estimated total</span>
                    <span>{usd(quote.total)}</span>
                  </div>
                  <p className="text-xs text-charcoal/60">
                    Refundable deposit: {usd(quote.deposit)} (card hold, released on return)
                  </p>
                </div>

                <p className="mt-3 text-xs text-charcoal/60">
                  Estimate. Fuel, extra engine hours and damage are billed at return. Quote valid 30 days.
                </p>

                {/* Action buttons */}
                <div className="mt-4 space-y-2">
                  <button type="button" onClick={reserveClicked} className="btn-primary w-full !text-sm">
                    Reserve this rental
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={copyQuote}
                      className="inline-flex items-center justify-center gap-1.5 rounded-md border-2 border-forest/30 px-3 py-2 text-xs font-bold uppercase tracking-wide text-forest transition-colors hover:bg-forest hover:text-white"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? 'Copied!' : 'Copy quote'}
                    </button>
                    <button
                      type="button"
                      onClick={printQuote}
                      className="inline-flex items-center justify-center gap-1.5 rounded-md border-2 border-forest/30 px-3 py-2 text-xs font-bold uppercase tracking-wide text-forest transition-colors hover:bg-forest hover:text-white"
                    >
                      <Printer className="h-3.5 w-3.5" /> Print / PDF
                    </button>
                  </div>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-forest/30 px-3 py-2 text-xs font-bold uppercase tracking-wide text-forest transition-colors hover:bg-forest hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5" /> Call {BUSINESS.phone}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reservation form */}
      {showForm && (
        <div id="rental-reservation" className="mt-8 rounded-2xl border-2 border-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-xl normal-case">Reserve this rental</h3>
          <p className="mt-1 text-sm text-charcoal/70">
            Fill this out and We'll call to confirm availability. No payment now — the deposit is a card hold at pickup.
          </p>
          {error && (
            <p className="mt-4 rounded-lg bg-orange/10 p-3 text-sm font-semibold text-orange-dark">{error}</p>
          )}
          <form onSubmit={onReserve} className="mt-4 grid gap-4 sm:grid-cols-2" noValidate>
            <Field label="Name" required>
              <input
                type="text"
                className="form-input"
                value={resForm.name}
                onChange={(e) => updateRes('name', e.target.value)}
              />
            </Field>
            <Field label="Phone" required>
              <input
                type="tel"
                className="form-input"
                value={resForm.phone}
                onChange={(e) => updateRes('phone', e.target.value)}
                placeholder="(614) 379-2170"
              />
            </Field>
            <Field label="Email" optional>
              <input
                type="email"
                className="form-input"
                value={resForm.email}
                onChange={(e) => updateRes('email', e.target.value)}
              />
            </Field>
            <Field label="Company" optional>
              <input
                type="text"
                className="form-input"
                value={resForm.company}
                onChange={(e) => updateRes('company', e.target.value)}
              />
            </Field>
            {deliveryMode === 'deliver' && (
              <div className="sm:col-span-2">
                <Field label="Delivery address" required>
                  <input
                    type="text"
                    className="form-input"
                    value={resForm.address}
                    onChange={(e) => updateRes('address', e.target.value)}
                    placeholder="Street address, city, OH"
                  />
                </Field>
              </div>
            )}
            <div>
              <span className="text-sm font-semibold text-charcoal">Do you have equipment insurance?</span>
              <div className="mt-2 flex gap-3">
                {['Yes', 'No'].map((opt) => (
                  <label
                    key={opt}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm transition-colors ${
                      resForm.hasInsurance === opt.toLowerCase() ? 'border-orange bg-orange/5' : 'border-charcoal/15'
                    }`}
                  >
                    <input
                      type="radio"
                      name="insurance"
                      className="accent-orange"
                      checked={resForm.hasInsurance === opt.toLowerCase()}
                      onChange={() => updateRes('hasInsurance', opt.toLowerCase())}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <label className="flex cursor-pointer items-center gap-3 self-end rounded-lg border-2 border-forest/15 p-3">
              <input
                type="checkbox"
                className="h-5 w-5 accent-orange"
                checked={resForm.wantsOperator}
                onChange={(e) => updateRes('wantsOperator', e.target.checked)}
              />
              <span className="text-sm font-semibold">Want an operator instead? We can run it for you</span>
            </label>
            <div className="sm:col-span-2">
              <Field label="Notes" optional>
                <textarea
                  rows={3}
                  className="form-input"
                  value={resForm.notes}
                  onChange={(e) => updateRes('notes', e.target.value)}
                  placeholder="Anything we should know about the site or job"
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                  </>
                ) : (
                  'Send reservation request'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-charcoal/80">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-charcoal">
        {label}
        {required && <span className="text-orange"> *</span>}
        {optional && <span className="text-charcoal/40"> (optional)</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
