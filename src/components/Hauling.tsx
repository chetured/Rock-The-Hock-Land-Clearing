import { Truck, Check } from 'lucide-react';
import { HAULING_RATES } from '@/lib/constants';

const WHAT_WE_HAUL = [
  'Driveway gravel, #57, #304 and crusher run',
  'Topsoil, fill dirt and mulch',
  'Brush, stumps and land clearing debris',
  'Spoil dirt, rock and broken concrete',
  'Skid steers, tractors, mowers and small equipment',
  'Lumber, fence supplies and pallets on the flatbed',
];

export default function Hauling() {
  return (
    <section id="hauling" className="section-pad bg-white">
      <div className="container-tight">
        <div className="text-center">
          <span className="eyebrow">Our own trucks</span>
          <h2 className="text-3xl sm:text-4xl">Hauling and dump truck service</h2>
          <p className="mx-auto mt-3 max-w-2xl text-charcoal/75">
            We run our own dump truck, flatbed and tilt trailer, so we can bring in the stone, haul
            off the debris and move the machine without waiting on anyone else.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HAULING_RATES.map((r) => (
            <article
              key={r.id}
              className="flex flex-col rounded-xl border-2 border-forest/10 bg-cream p-6 shadow-sm"
            >
              <Truck className="h-8 w-8 text-forest" />
              <h3 className="mt-4 text-lg normal-case">{r.title}</h3>
              <p className="mt-1 font-heading text-2xl uppercase text-orange">{r.price}</p>
              <p className="mt-2 flex-1 text-sm text-charcoal/70">{r.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-8 rounded-2xl border-2 border-forest/10 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="text-xl normal-case">What we haul</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {WHAT_WE_HAUL.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm text-charcoal/70">
              Prices are starting points. Your quote depends on the material, how far it goes and how
              easy the drop spot is to reach. We need a firm, clear path for a loaded truck.
            </p>
            <a
              href="#quote"
              data-service="Gravel, topsoil and fill dirt delivery"
              className="btn-primary mt-5 self-start"
            >
              Get a hauling quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
