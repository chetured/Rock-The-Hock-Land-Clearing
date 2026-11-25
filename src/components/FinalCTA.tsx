import { Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export default function FinalCTA() {
  return (
    <section className="bg-orange px-4 py-16 text-center text-white sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl text-white sm:text-5xl">Ready to get your land back?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
          Free on-site estimates across Hocking County and southeast Ohio. We call you back
          within one business day.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#quote" className="inline-flex items-center justify-center gap-2 rounded-md bg-forest px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-forest-dark">
            Get my free quote
          </a>
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            onClick={() => trackEvent('call_click', { location: 'final_cta' })}
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-orange-dark"
          >
            <Phone className="h-5 w-5" /> {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
