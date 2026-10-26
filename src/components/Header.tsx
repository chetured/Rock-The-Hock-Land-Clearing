import { useEffect, useState } from 'react';
import { Menu, X, Phone, MessageSquare, TreePine } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Rent equipment', href: '#rentals' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Service area', href: '#service-area' },
  { label: 'FAQ', href: '#faq' },
];

function fireCall() {
  trackEvent('call_click', { location: 'header' });
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors ${
          scrolled ? 'bg-forest text-white shadow-md' : 'bg-forest/95 text-white'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2 text-white">
            <TreePine className="h-7 w-7 text-orange" strokeWidth={2.2} />
            <span className="font-heading text-lg font-bold uppercase leading-none tracking-tight sm:text-xl">
              Rock The Hock
              <span className="mt-0.5 block text-[11px] font-sans font-medium normal-case tracking-wide text-white/70">
                Land Clearing
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              onClick={fireCall}
              className="inline-flex items-center gap-2 rounded-md border-2 border-white/40 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </a>
            <a href="#quote" className="btn-primary !px-5 !py-2.5 !text-sm">
              Free quote
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-white/10 bg-forest px-4 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-base font-semibold uppercase tracking-wide text-white/90 hover:bg-forest-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 px-3 text-xs font-medium normal-case tracking-wide text-white/55">
              by Red Brick Ranch
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                onClick={fireCall}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border-2 border-white/40 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
              <a href="#quote" onClick={() => setOpen(false)} className="btn-primary flex-1">
                Free quote
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Mobile sticky bottom bar — always visible on phones */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-white/10 bg-forest text-white shadow-[0_-4px_12px_rgba(0,0,0,0.2)] md:hidden">
        <a
          href={`tel:${BUSINESS.phoneRaw}`}
          onClick={fireCall}
          className="flex flex-col items-center gap-1 py-2.5 text-xs font-bold uppercase tracking-wide"
        >
          <Phone className="h-5 w-5" /> Call
        </a>
        <a
          href={`sms:${BUSINESS.phoneRaw}`}
          className="flex flex-col items-center gap-1 border-x border-white/10 py-2.5 text-xs font-bold uppercase tracking-wide"
        >
          <MessageSquare className="h-5 w-5" /> Text
        </a>
        <a
          href="#quote"
          className="flex flex-col items-center gap-1 bg-orange py-2.5 text-xs font-bold uppercase tracking-wide"
        >
          <TreePine className="h-5 w-5" /> Quote
        </a>
      </div>
    </>
  );
}
