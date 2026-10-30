import { Phone, MessageSquare, CheckCircle2, MapPin, TreePine, FlameKindling, Truck } from 'lucide-react';
import { BUSINESS, PHOTO_BASE } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

const TRUST = [
  { icon: CheckCircle2, label: 'Free estimates' },
  { icon: MapPin, label: 'Locally owned in Logan, OH' },
  { icon: TreePine, label: 'Modern Cat equipment' },
  { icon: FlameKindling, label: 'No burn piles' },
];

function fireCall() {
  trackEvent('call_click', { location: 'hero' });
}

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Background: dark green overlay on a forestry mulcher in the woods.
          REAL JOB PHOTO: replace the inline background image below with a photo
          of the Cat 289D3 + drum mulcher working in Hocking County woods. */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            `linear-gradient(rgba(22,39,29,0.82), rgba(22,39,29,0.9)), url('${PHOTO_BASE}hero-mulching.jpg')`,
        }}
        aria-hidden="true"
      />
      <img
        src={`${PHOTO_BASE}hero-mulching.jpg`}
        alt=""
        className="sr-only"
        // React 18 only passes the lowercase attribute through to the DOM.
        {...{ fetchpriority: 'high' }}
      />
      <div className="mx-auto max-w-6xl px-4 py-20 text-center text-white sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <span className="eyebrow text-orange-light">Overgrown land? We clear it.</span>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          Land clearing &amp; forestry mulching in Logan, Ohio
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85 sm:text-xl">
          Lot clearing, brush removal, driveways and septic installs across Hocking County and southeast Ohio.
          Free on-site estimates.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#quote" className="btn-primary w-full text-lg sm:w-auto">
            Get my free quote
          </a>
          <a
            href="#rentals"
            className="btn-secondary w-full text-lg sm:w-auto"
          >
            <Truck className="h-5 w-5" />
            Rent our equipment
          </a>
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            onClick={fireCall}
            className="btn-secondary w-full text-lg sm:w-auto"
          >
            <Phone className="h-5 w-5" />
            Call or text {BUSINESS.phone}
          </a>
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-3 text-left text-sm font-semibold text-white/90 sm:grid-cols-4">
          {TRUST.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="h-5 w-5 shrink-0 text-orange" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Text quick-link anchor target used by the bottom bar */}
      <a
        href={`sms:${BUSINESS.phoneRaw}`}
        className="sr-only"
        aria-label={`Text ${BUSINESS.phone}`}
      >
        Text
      </a>
      <a
        href={`sms:${BUSINESS.phoneRaw}`}
        className="sr-only"
        aria-label={`Text ${BUSINESS.phone}`}
      >
        <MessageSquare />
      </a>
    </section>
  );
}
