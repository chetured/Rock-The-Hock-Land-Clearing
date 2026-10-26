import { Cog } from 'lucide-react';
import { EQUIPMENT, PHOTO_BASE } from '@/lib/constants';

type EquipmentImage = { src: string; contain?: boolean };

const EQUIPMENT_IMAGES: Record<string, EquipmentImage> = {
  'Cat 289D3 compact track loader': { src: 'cat-289d3.jpg' },
  'Raytree RMDM72SS 72-inch drum mulcher': { src: 'rental-drum-mulcher.webp', contain: true },
  'Top Cat HDRC 72-inch brush cutter': { src: 'rental-brush-cutter.jpg' },
  'Raytree RMA42 auger, Raytree RMSC78 78-inch power rake, GIYI GY-D680 post driver and pallet forks': { src: 'rental-power-rake.jpg' },
};

export default function Equipment() {
  return (
    <section id="equipment" className="section-pad bg-forest text-white">
      <div className="container-tight">
        <div className="text-center">
          <span className="eyebrow text-orange-light">Built for southeast Ohio terrain</span>
          <h2 className="text-3xl sm:text-4xl">Our equipment</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPMENT.map((e) => {
            const img = EQUIPMENT_IMAGES[e.label];
            return (
              <article
                key={e.label}
                className="overflow-hidden rounded-xl border border-white/10 bg-forest-light/40"
              >
                {img ? (
                  <div className={`aspect-[4/3] w-full ${img.contain ? 'bg-white' : ''}`}>
                    <img
                      src={`${PHOTO_BASE}${img.src}`}
                      alt={e.label}
                      loading="lazy"
                      className={`h-full w-full ${img.contain ? 'object-contain' : 'object-cover'}`}
                    />
                  </div>
                ) : (
                  <div className="p-6">
                    <Cog className="h-9 w-9 text-orange" />
                  </div>
                )}
                <div className="p-6 pt-4">
                  <h3 className="text-lg normal-case">{e.label}</h3>
                  <p className="mt-2 text-sm text-white/75">{e.blurb}</p>
                </div>
              </article>
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
