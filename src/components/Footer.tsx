import { TreePine, Phone, Mail, MapPin } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { LOCATION_PAGES, SERVICE_PAGES, pageUrl } from '@/lib/pages';

const QUICK = [
  { label: 'Home', href: '/' },
  { label: 'Hauling', href: '/#hauling' },
  { label: 'Our equipment', href: '/#equipment' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Get an estimate now', href: '#quote' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal px-4 pb-20 pt-14 text-white/80 sm:px-6 md:pb-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-white">
              <TreePine className="h-7 w-7 text-orange" />
              <span className="font-heading text-lg font-bold uppercase">Rock The Hock</span>
            </div>
            <p className="mt-3 text-sm">Land clearing done right, by one owner who answers the phone.</p>
            <p className="mt-3 text-sm">Serving Hocking County and southeast Ohio.</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Quick links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {QUICK.map((q) => (
                <li key={q.href}>
                  <a href={q.href} className="hover:text-white">
                    {q.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-orange" /> {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={`sms:${BUSINESS.phoneRaw}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-orange" /> Text {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 text-orange" /> {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange" /> {BUSINESS.city}, {BUSINESS.region}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Ready to start?</h3>
            <p className="mt-3 text-sm">Free estimates. Call, text, or request a quote online.</p>
            <a href="#quote" className="btn-primary mt-4 w-full !text-sm">
              Get an estimate now
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
          {[
            { title: 'Services', pages: SERVICE_PAGES },
            { title: 'Areas we serve', pages: LOCATION_PAGES },
          ].map((g) => (
            <div key={g.title}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-white">{g.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {g.pages.map((p) => (
                  <li key={p.slug}>
                    <a href={pageUrl(p)} className="hover:text-white">
                      {p.navLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* License / insurance placeholder — uncomment and fill in when ready:
        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          [LICENSE #] · [INSURANCE CARRIER & POLICY] · RTH Group LLC
        </p>
        */}
        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {year} {BUSINESS.legalName}. All rights reserved.
        </p>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-white/50">
          A{' '}
          <span
            className="font-serif font-semibold tracking-tight"
            style={{ color: '#9E2A2B' }}
          >
            Red Brick Ranch
          </span>{' '}
          company · Logan, Ohio
        </p>
      </div>
    </footer>
  );
}
