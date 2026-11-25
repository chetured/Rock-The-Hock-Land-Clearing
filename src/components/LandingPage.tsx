import { useState } from 'react';
import { Check, ChevronDown, MapPin, Phone, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import QuoteForm from '@/components/QuoteForm';
import Rentals from '@/components/Rentals';
import Footer from '@/components/Footer';
import { BUSINESS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { PHOTOS_BASE } from '@/lib/photos';
import {
  LOCATION_PAGES,
  RENTAL_PAGES,
  SERVICE_PAGES,
  pageH1,
  pageUrl,
  type LandingPage as Page,
} from '@/lib/pages';

function PageFaq({ faqs }: { faqs: Page['faqs'] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-6 divide-y-2 divide-forest/10 rounded-xl border-2 border-forest/10 bg-cream">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-lg uppercase tracking-tight text-forest"
              >
                {item.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-orange transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            {/* Answers stay in the HTML when collapsed so search engines and AI tools can read them. */}
            <div
              className={`grid overflow-hidden px-5 transition-all ${
                isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
              }`}
            >
              <p className="min-h-0 text-charcoal/80">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LinkList({ title, pages, current }: { title: string; pages: Page[]; current: string }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {pages
          .filter((p) => p.slug !== current)
          .map((p) => (
            <li key={p.slug}>
              <a
                href={pageUrl(p)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-charcoal shadow-sm hover:text-orange"
              >
                {p.kind === 'location' && <MapPin className="h-4 w-4 text-orange" />}
                {p.navLabel}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default function LandingPage({ page }: { page: Page }) {
  const section = page.kind === 'service' ? 'Services' : page.kind === 'rental' ? 'Rentals' : 'Service areas';
  const ctaHref = page.kind === 'rental' ? '#rentals' : '#quote';
  return (
    <>
      <Header />
      <main>
        <section className="bg-forest px-4 pb-14 pt-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-wide text-white/60">
              <a href="/" className="hover:text-white">
                Home
              </a>{' '}
              / <span>{section}</span> / <span className="text-white/90">{page.navLabel}</span>
            </nav>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{pageH1(page)}</h1>
            <p className="mt-5 max-w-3xl text-lg text-white/85">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={ctaHref} className="btn-primary">
                {page.kind === 'rental' ? 'Build my rental quote' : 'Get my free quote'}
              </a>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                onClick={() => trackEvent('call_click', { location: `page_${page.slug}` })}
                className="inline-flex items-center gap-2 rounded-md border-2 border-white/40 px-5 py-3 font-bold uppercase tracking-wide text-white hover:bg-white/10"
              >
                <Phone className="h-5 w-5" /> {BUSINESS.phone}
              </a>
              <a
                href={`sms:${BUSINESS.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-md border-2 border-white/40 px-5 py-3 font-bold uppercase tracking-wide text-white hover:bg-white/10"
              >
                <MessageSquare className="h-5 w-5" /> Text photos
              </a>
            </div>
          </div>
        </section>

        <article className="section-pad bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-0">
            {page.photos && page.photos.length > 0 && (
              <div className="mb-10 grid gap-4 sm:grid-cols-2">
                {page.photos.map((ph) => (
                  <figure key={ph.file} className="overflow-hidden rounded-xl bg-cream">
                    <img
                      src={`${PHOTOS_BASE}${ph.file}`}
                      alt={ph.alt}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    {ph.caption && <figcaption className="px-3 py-2 text-sm text-charcoal/70">{ph.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
            {page.sections.map((s) => (
              <section key={s.heading} className="mb-10">
                <h2 className="text-2xl sm:text-3xl">{s.heading}</h2>
                {s.paragraphs.map((para) => (
                  <p key={para.slice(0, 40)} className="mt-4 text-charcoal/80">
                    {para}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-charcoal/85">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="mb-4">
              <h2 className="text-2xl sm:text-3xl">Questions we get</h2>
              <PageFaq faqs={page.faqs} />
            </section>
          </div>
        </article>

        {page.kind === 'rental' ? <Rentals /> : <QuoteForm presetService={page.presetService} />}

        <section className="section-pad bg-cream">
          <div className="container-tight grid gap-10 lg:grid-cols-3">
            <LinkList title="Our services" pages={SERVICE_PAGES} current={page.slug} />
            <LinkList title="Equipment rental" pages={RENTAL_PAGES} current={page.slug} />
            <LinkList title="Areas we serve" pages={LOCATION_PAGES} current={page.slug} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
