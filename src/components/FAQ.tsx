import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad bg-white">
      <div className="container-tight max-w-3xl">
        <div className="text-center">
          <span className="eyebrow">Good questions</span>
          <h2 className="text-3xl sm:text-4xl">FAQ</h2>
        </div>
        <div className="mt-10 divide-y-2 divide-forest/10 rounded-xl border-2 border-forest/10 bg-cream">
          {FAQ_ITEMS.map((item, i) => {
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
                      className={`h-5 w-5 shrink-0 text-orange transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
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
        <div className="mt-10 text-center">
          <a href="#quote" className="btn-primary">
            Get my free quote
          </a>
        </div>
      </div>
    </section>
  );
}
