import { useState } from 'react';
import { Check, CheckCircle2, ChevronDown, FlameKindling, MapPin, MessageSquare, Phone, TreePine } from 'lucide-react';
import Header from '@/components/Header';
import QuoteForm from '@/components/QuoteForm';
import Equipment from '@/components/Equipment';
import Footer from '@/components/Footer';
import { BUSINESS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { PHOTOS_BASE, SHARE_PHOTO } from '@/lib/photos';
import {
  LOCATION_PAGES,
  SERVICE_PAGES,
  pageH1,
  pageUrl,
  type LandingPage as Page,
  type PagePhoto,
  type PageSection,
} from '@/lib/pages';

// Same look as the homepage: photo hero, roomy alternating sections, centered
// headings, card grids and the homepage FAQ accordion.

const TRUST = [
  { icon: CheckCircle2, label: 'Free estimates' },
  { icon: MapPin, label: 'Locally owned in Logan, OH' },
  { icon: TreePine, label: 'We own our Cat equipment' },
  { icon: FlameKindling, label: 'No burn piles' },
];

function PageFaq({ faqs }: { faqs: Page['faqs'] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-10 divide-y-2 divide-forest/10 rounded-xl border-2 border-forest/10 bg-cream">
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
              <p className="min-h-0 leading-relaxed text-charcoal/80">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Bullets({ items, onCream }: { items: string[]; onCream: boolean }) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {items.map((b) => (
        <li
          key={b}
          className={`flex items-start gap-3 rounded-xl border-2 border-forest/10 p-5 shadow-sm ${
            onCream ? 'bg-white' : 'bg-cream'
          }`}
        >
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
          <span className="font-semibold text-charcoal/90">{b}</span>
        </li>
      ))}
    </ul>
  );
}

function ContentSection({ s, index, photo }: { s: PageSection; index: number; photo?: PagePhoto }) {
  const onCream = index % 2 === 1;
  const bg = onCream ? 'bg-cream' : 'bg-white';
  const body = (
    <>
      {s.paragraphs.map((para) => (
        <p key={para.slice(0, 40)} className="mt-5 text-lg leading-relaxed text-charcoal/80">
          {para}
        </p>
      ))}
    </>
  );

  if (photo) {
    // Text beside a job photo, alternating sides.
    const photoFirst = index % 2 === 1;
    return (
      <section className={`section-pad ${bg}`}>
        <div className="container-tight">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <figure className={`overflow-hidden rounded-xl shadow-sm ${photoFirst ? 'lg:order-first' : 'lg:order-last'}`}>
              <img
                src={`${PHOTOS_BASE}${photo.file}`}
                alt={photo.alt}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
              {photo.caption && (
                <figcaption className="bg-white px-4 py-3 text-sm text-charcoal/70">{photo.caption}</figcaption>
              )}
            </figure>
            <div>
              <h2 className="text-3xl sm:text-4xl">{s.heading}</h2>
              {body}
            </div>
          </div>
          {s.bullets && <Bullets items={s.bullets} onCream={onCream} />}
        </div>
      </section>
    );
  }

  return (
    <section className={`section-pad ${bg}`}>
      <div className="container-tight max-w-3xl">
        <h2 className="text-center text-3xl sm:text-4xl">{s.heading}</h2>
        {body}
        {s.bullets && <Bullets items={s.bullets} onCream={onCream} />}
      </div>
    </section>
  );
}

function LinkCards({ title, eyebrow, pages, current }: { title: string; eyebrow: string; pages: Page[]; current: string }) {
  return (
    <div>
      <div className="text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="text-2xl sm:text-3xl">{title}</h2>
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {pages
          .filter((p) => p.slug !== current)
          .map((p) => (
            <li key={p.slug}>
              <a
                href={pageUrl(p)}
                className="flex h-full items-center gap-2 rounded-xl border-2 border-forest/10 bg-white px-4 py-3 font-semibold text-charcoal shadow-sm transition-colors hover:border-orange hover:text-orange"
              >
                {p.kind === 'location' ? (
                  <MapPin className="h-4 w-4 shrink-0 text-orange" />
                ) : (
                  <TreePine className="h-4 w-4 shrink-0 text-orange" />
                )}
                {p.navLabel}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default function LandingPage({ page }: { page: Page }) {
  const section = page.kind === 'location' ? 'Service areas' : 'Services';
  const photos = page.photos ?? [];
  const heroPhoto = photos[0] ?? SHARE_PHOTO;
  // First two content sections sit beside the page's job photos.
  const photoFor = (i: number) => (i < 2 ? photos[i] : undefined);

  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden">
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(22,39,29,0.82), rgba(22,39,29,0.9)), url('${PHOTOS_BASE}${heroPhoto.file}')`,
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-6xl px-4 py-20 text-center text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold uppercase tracking-wide text-white/60">
              <a href="/" className="hover:text-white">
                Home
              </a>{' '}
              / <span>{section}</span> / <span className="text-white/90">{page.navLabel}</span>
            </nav>
            <span className="eyebrow text-orange-light">{page.area}</span>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              {pageH1(page)}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{page.intro}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#quote" className="btn-primary w-full text-lg sm:w-auto">
                Get my free quote
              </a>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                onClick={() => trackEvent('call_click', { location: `page_${page.slug}` })}
                className="btn-secondary w-full text-lg sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                Call {BUSINESS.phone}
              </a>
              <a href={`sms:${BUSINESS.phoneRaw}`} className="btn-secondary w-full text-lg sm:w-auto">
                <MessageSquare className="h-5 w-5" />
                Text photos
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
        </section>

        {page.sections.map((s, i) => (
          <ContentSection key={s.heading} s={s} index={i} photo={photoFor(i)} />
        ))}

        <Equipment />

        <section className="section-pad bg-white">
          <div className="container-tight max-w-3xl">
            <div className="text-center">
              <span className="eyebrow">Good questions</span>
              <h2 className="text-3xl sm:text-4xl">Questions we get</h2>
            </div>
            <PageFaq faqs={page.faqs} />
            <div className="mt-10 text-center">
              <a href="#quote" className="btn-primary">
                Get my free quote
              </a>
            </div>
          </div>
        </section>

        <QuoteForm presetService={page.presetService} />

        <section className="section-pad border-t-2 border-forest/10 bg-cream">
          <div className="container-tight grid gap-14 lg:grid-cols-2">
            <LinkCards eyebrow="What we do" title="Our services" pages={SERVICE_PAGES} current={page.slug} />
            <LinkCards eyebrow="Where we work" title="Areas we serve" pages={LOCATION_PAGES} current={page.slug} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
