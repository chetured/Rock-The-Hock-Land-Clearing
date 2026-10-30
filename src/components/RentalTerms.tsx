import { useEffect } from 'react';
import { FileText } from 'lucide-react';
import { RENTAL_TERMS } from '@/lib/rentalTerms';

// Rental agreement, damage waiver, insurance and release terms. Each section
// is collapsible so the list stays short; the reservation form links here.
export default function RentalTerms() {
  // Open the section a #terms-... link points at.
  useEffect(() => {
    function openFromHash() {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el instanceof HTMLDetailsElement) el.open = true;
    }
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return (
    <div id="rental-terms" className="scroll-mt-24">
      <span className="eyebrow">Before you rent</span>
      <h3 className="text-2xl sm:text-3xl">Rental terms, waivers and insurance</h3>
      <p className="mt-3 max-w-2xl text-charcoal/75">
        The short version: renter 21+ with a driver&rsquo;s license, a card for the deposit, and a signed agreement at
        pickup. Golf carts and the Segway Villain also need a signed release from every rider. Business rentals of heavy
        equipment need proof of insurance.
      </p>
      <div className="mt-6 space-y-3">
        {RENTAL_TERMS.map((section) => (
          <details
            key={section.id}
            id={`terms-${section.id}`}
            className="group rounded-xl border-2 border-forest/10 bg-white p-4 shadow-sm open:border-forest/30"
          >
            <summary className="flex cursor-pointer list-none flex-wrap items-start gap-x-3 gap-y-1">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
              <span className="min-w-0 flex-1 font-semibold text-charcoal">{section.title}</span>
              <span className="ml-8 rounded-full bg-forest/8 sm:ml-0 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-forest">
                {section.appliesTo}
              </span>
            </summary>
            <div className="mt-3 space-y-2 pl-8 text-sm text-charcoal/80">
              {section.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc space-y-1.5 pl-5">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
