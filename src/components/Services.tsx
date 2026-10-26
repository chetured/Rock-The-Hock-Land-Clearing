import {
  Trees,
  Home,
  Scissors,
  Fence,
  Footprints,
  Route,
  FenceIcon,
  Ruler,
  Droplets,
  Truck,
} from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const ICONS = [
  Trees,
  Home,
  Scissors,
  Fence,
  Footprints,
  Route,
  FenceIcon,
  Ruler,
  Droplets,
  Truck,
];

export default function Services() {
  return (
    <section id="services" className="section-pad bg-cream">
      <div className="container-tight">
        <div className="text-center">
          <span className="eyebrow">What we do</span>
          <h2 className="text-3xl sm:text-4xl">Services</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/75">
            One machine, ten jobs. Pick what you need and we’ll quote it free.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i] ?? Trees;
            return (
              <article
                key={s.id}
                className="flex flex-col rounded-xl border-2 border-forest/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <Icon className="h-9 w-9 text-forest" />
                <h3 className="mt-4 text-lg normal-case">{s.label}</h3>
                <p className="mt-2 flex-1 text-sm text-charcoal/70">{s.blurb}</p>
                <a
                  href="#quote"
                  data-service={s.label}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-orange hover:text-orange-dark"
                >
                  Get a quote for this →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
