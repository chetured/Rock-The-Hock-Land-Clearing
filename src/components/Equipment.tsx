import { Check, Truck } from 'lucide-react';
import {
  EQUIPMENT,
  EQUIPMENT_HAULING,
  EQUIPMENT_MAIN,
  type EquipmentItem,
} from '@/lib/constants';

function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-forest-light/40">
      {item.image ? (
        <div className={`aspect-[4/3] w-full ${item.contain ? 'bg-white' : ''}`}>
          <img
            src={item.image}
            alt={`${item.label}, owned and run by Rock The Hock`}
            loading="lazy"
            className={`h-full w-full ${item.contain ? 'object-contain p-4' : 'object-cover'}`}
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-forest-light/60">
          <Truck className="h-16 w-16 text-orange" />
        </div>
      )}
      <div className="p-6 pt-4">
        <h3 className="text-lg normal-case">{item.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{item.blurb}</p>
      </div>
    </article>
  );
}

export default function Equipment() {
  return (
    <section id="equipment" className="section-pad bg-forest text-white">
      <div className="container-tight">
        <div className="text-center">
          <span className="eyebrow text-orange-light">What we bring to your job</span>
          <h2 className="text-3xl sm:text-4xl">Our equipment</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            We own every machine we run. No rented equipment, no rental markup and no waiting on someone else&rsquo;s
            schedule. It shows up on our own truck and trailer, ready to work.
          </p>
        </div>

        <article className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 bg-forest-light/40 lg:grid-cols-2">
          <img
            src={EQUIPMENT_MAIN.image}
            alt="Rock The Hock's Cat 289D3 compact track loader"
            loading="lazy"
            className="aspect-[4/3] h-full w-full object-cover"
          />
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <span className="eyebrow text-orange-light">The main machine</span>
            <h3 className="text-2xl sm:text-3xl">{EQUIPMENT_MAIN.label}</h3>
            <p className="mt-4 leading-relaxed text-white/80">{EQUIPMENT_MAIN.blurb}</p>
            <ul className="mt-6 space-y-3">
              {EQUIPMENT_MAIN.specs.map((s) => (
                <li key={s} className="flex items-start gap-3 text-white/90">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <h3 className="mt-16 text-center text-2xl sm:text-3xl">Attachments</h3>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EQUIPMENT.map((e) => (
            <EquipmentCard key={e.label} item={e} />
          ))}
        </div>

        <h3 className="mt-16 text-center text-2xl sm:text-3xl">Trucks &amp; trailer</h3>
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-2">
          {EQUIPMENT_HAULING.map((e) => (
            <EquipmentCard key={e.label} item={e} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#quote" className="btn-primary">
            Get my free quote
          </a>
        </div>
      </div>
    </section>
  );
}
