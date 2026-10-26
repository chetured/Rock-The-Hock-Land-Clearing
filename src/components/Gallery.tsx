import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PHOTO_BASE } from '@/lib/constants';

const PHOTOS: { name: string; caption: string }[] = [
  { name: 'work-log-clearing', caption: 'Lot clearing and log decking' },
  { name: 'work-trail-1', caption: 'New trail cut through the woods' },
  { name: 'work-trail-2', caption: 'Mulched trail, ready to walk' },
  { name: 'work-field-mulching', caption: 'Overgrown field mulched down' },
  { name: 'work-farm-clearing', caption: 'Farm fence line and brush cleared' },
  { name: 'work-driveway', caption: 'Driveway access cleared' },
  { name: 'work-pines', caption: 'Pine stand underbrush removed' },
  { name: 'work-hillside', caption: 'Hillside brush clearing' },
];

function imgUrl(name: string): string {
  return `${PHOTO_BASE}${name}.jpg`;
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    [],
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % PHOTOS.length)),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, prev, next]);

  return (
    <section id="gallery" className="section-pad bg-white">
      <div className="container-tight">
        <div className="text-center">
          <span className="eyebrow">Recent work</span>
          <h2 className="text-3xl sm:text-4xl">Recent work</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/75">
            Real jobs from around Hocking County. Photos by our crew.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {PHOTOS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setLightbox(i)}
              className="group overflow-hidden rounded-xl border-2 border-forest/10 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <img
                src={imgUrl(p.name)}
                alt={p.caption}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
              />
              <p className="px-3 py-2 text-center text-xs font-semibold text-charcoal/80 sm:text-sm">
                {p.caption}
              </p>
            </button>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#quote" className="btn-primary">
            Get my free quote
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-4"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={imgUrl(PHOTOS[lightbox].name)}
              alt={PHOTOS[lightbox].caption}
              className="max-h-[85vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm font-semibold text-white/90">
              {PHOTOS[lightbox].caption}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </section>
  );
}
