import { MapPin, MessageSquare } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function ServiceArea() {
  return (
    <section id="service-area" className="section-pad bg-cream">
      <div className="container-tight">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Where we work</span>
            <h2 className="text-3xl sm:text-4xl">Service area</h2>
            <p className="mt-3 text-charcoal/75">
              Based in Logan, Ohio. We clear land across Hocking County and the surrounding region.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {BUSINESS.serviceArea.map((town) => (
                <li
                  key={town}
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-charcoal shadow-sm"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-orange" />
                  {town}
                </li>
              ))}
            </ul>
            <a
              href={`sms:${BUSINESS.phoneRaw}`}
              className="btn-dark mt-8"
            >
              <MessageSquare className="h-5 w-5" />
              Not sure if we cover you? Text us your address
            </a>
          </div>

          {/* Static service-area graphic — no API key needed.
              REAL MAP: swap this SVG illustration for a styled map screenshot or
              a static map image export of Hocking County + surroundings. */}
          <div className="relative">
            <svg
              viewBox="0 0 400 300"
              className="w-full rounded-xl border-2 border-forest/10 bg-white shadow-sm"
              role="img"
              aria-label="Approximate service area around Hocking County, Ohio"
            >
              <rect x="0" y="0" width="400" height="300" fill="#F7F4EE" />
              {/* Stylized counties */}
              <path
                d="M150 90 L210 80 L240 120 L230 170 L190 200 L140 180 L120 130 Z"
                fill="#2E5740"
                opacity="0.85"
              />
              <path d="M80 70 L150 90 L120 130 L70 120 Z" fill="#1F3A2B" opacity="0.5" />
              <path d="M240 120 L320 110 L330 170 L230 170 Z" fill="#1F3A2B" opacity="0.5" />
              <path d="M140 180 L190 200 L180 250 L120 240 Z" fill="#1F3A2B" opacity="0.5" />
              <path d="M230 170 L330 170 L320 230 L210 240 L180 250 L190 200 Z" fill="#1F3A2B" opacity="0.5" />
              <path d="M70 120 L120 130 L120 240 L60 220 Z" fill="#1F3A2B" opacity="0.35" />
              {/* Logan marker */}
              <circle cx="180" cy="150" r="7" fill="#F26B1D" />
              <circle cx="180" cy="150" r="13" fill="#F26B1D" opacity="0.25" />
              <text
                x="192"
                y="154"
                fontFamily="Oswald, sans-serif"
                fontSize="14"
                fill="#222"
                fontWeight="700"
              >
                Logan
              </text>
              <text
                x="200"
                y="285"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="11"
                fill="#222"
                opacity="0.6"
              >
                Hocking County &amp; Southeast Ohio
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
