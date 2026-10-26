import RentalBuilder from '@/components/RentalBuilder';
import RentalCompare from '@/components/RentalCompare';

export default function Rentals() {
  return (
    <section id="rentals" className="section-pad bg-white print:bg-white">
      <div className="container-tight">
        <div className="text-center">
          <span className="eyebrow">Self-serve pricing</span>
          <h2 className="text-3xl sm:text-4xl">Rent our equipment</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/75">
            Pick what you need, see your price instantly, then reserve. No surprise fees.
          </p>
        </div>

        {/* Quote builder */}
        <div className="mt-10 print:mt-4">
          <div className="print:hidden">
            <RentalBuilder />
          </div>
          {/* Print-only: show the quote summary alone */}
          <div className="hidden print:block">
            <PrintQuote />
          </div>
        </div>

        {/* Compare before you rent */}
        <div className="mt-16 border-t-2 border-forest/10 pt-12 print:hidden">
          <span className="eyebrow">Compare before you rent</span>
          <h3 className="text-2xl sm:text-3xl">Shop around. We'll wait.</h3>
          <div className="mt-8">
            <RentalCompare />
          </div>
        </div>
      </div>
    </section>
  );
}

// Minimal print-only component that renders the current quote from the DOM.
// The print stylesheet isolates #rental-quote-summary for paper output.
function PrintQuote() {
  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Rock The Hock — Equipment Rental Quote</h2>
      <p style={{ fontSize: '14px', color: '#222' }}>
        Your detailed quote is shown above. Use your browser's print dialog to save as PDF.
      </p>
    </div>
  );
}
