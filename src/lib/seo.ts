// Per-URL <head> data and JSON-LD, used at build time by scripts/prerender.mjs.
import { BUSINESS, FAQ_ITEMS } from '@/lib/constants';
import { PHOTOS_BASE, SHARE_PHOTO } from '@/lib/photos';
import { ALL_PAGES, findPage, pageH1, pageTitle, pageUrl, type Faq } from '@/lib/pages';

export const SITE = 'https://www.rthllc.com';
const BUSINESS_ID = `${SITE}/#business`;

export type Head = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  image: string;
  jsonLd: object[];
};

function faqSchema(faqs: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export const ROUTES: string[] = ['/', ...ALL_PAGES.map(pageUrl)];

export function headFor(path: string): Head {
  const page = findPage(path);
  if (!page) {
    return {
      path: '/',
      title: 'Land Clearing & Forestry Mulching in Logan, OH | Rock The Hock',
      description:
        'Land clearing services, forestry mulching, brush clearing, gravel driveways and septic installs in Logan, the Hocking Hills and southeast Ohio. Free estimates: (614) 379-2170.',
      canonical: `${SITE}/`,
      image: `${SITE}${PHOTOS_BASE}${SHARE_PHOTO.file}`,
      jsonLd: [faqSchema(FAQ_ITEMS)],
    };
  }

  const url = `${SITE}${pageUrl(page)}`;
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: pageH1(page), item: url },
    ],
  };
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageH1(page),
    serviceType: page.serviceType ?? `${page.service} (${page.area})`,
    description: page.description,
    url,
    image: (page.photos ?? []).map((ph) => `${SITE}${PHOTOS_BASE}${ph.file}`),
    provider: {
      '@id': BUSINESS_ID,
      '@type': 'HomeAndConstructionBusiness',
      name: BUSINESS.name,
      telephone: '+16143792170',
      url: `${SITE}/`,
      address: { '@type': 'PostalAddress', addressLocality: 'Logan', addressRegion: 'OH', addressCountry: 'US' },
      geo: { '@type': 'GeoCoordinates', latitude: 39.5401, longitude: -82.4071 },
    },
    areaServed: page.areaName
      ? { '@type': 'Place', name: page.areaName }
      : page.kind === 'rental'
      ? { '@type': 'City', name: 'Logan, Ohio' }
      : [
          { '@type': 'AdministrativeArea', name: 'Hocking County, Ohio' },
          { '@type': 'AdministrativeArea', name: 'Fairfield County, Ohio' },
          { '@type': 'AdministrativeArea', name: 'Athens County, Ohio' },
          { '@type': 'AdministrativeArea', name: 'Vinton County, Ohio' },
          { '@type': 'AdministrativeArea', name: 'Perry County, Ohio' },
          { '@type': 'AdministrativeArea', name: 'Pickaway County, Ohio' },
        ],
  };
  return {
    path: pageUrl(page),
    title: pageTitle(page),
    description: page.description,
    canonical: url,
    image: `${SITE}${PHOTOS_BASE}${(page.photos?.[0] ?? SHARE_PHOTO).file}`,
    jsonLd: [service, crumbs, faqSchema(page.faqs)],
  };
}

// Sitemap and llms.txt are generated from the same page list at build time.
export function sitemapXml(today: string): string {
  const urls = ROUTES.map(
    (r) =>
      `  <url>\n    <loc>${SITE}${r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function llmsTxt(): string {
  const line = (p: (typeof ALL_PAGES)[number]) => `- [${pageH1(p)}](${SITE}${pageUrl(p)}): ${p.description}`;
  const group = (kind: string) => ALL_PAGES.filter((p) => p.kind === kind).map(line).join('\n');
  return `# ${BUSINESS.name}

> Owner-operated land clearing and forestry mulching contractor based in Logan, Ohio (Hocking County). Serves the Hocking Hills, Hocking County and southeast Ohio: Fairfield, Athens, Vinton, Perry and Pickaway counties. Free on-site estimates. Phone and text ${BUSINESS.phone}. Email ${BUSINESS.email}. Website ${SITE}/

Legal name: ${BUSINESS.legalName}. A Red Brick Ranch company.

## How quotes work
Send photos and rough acreage through the website form, or call or text. Every clearing job gets a terrain rating (tier 1 to 3) and a brush density rating (tier 1 to 3). Written quotes list fuel surcharge and equipment delivery as separate line items. Ground too steep to work safely is left out of the measured area. Land clearing and forestry mulching in Hocking County typically prices between about $1,200 and $5,000 per acre, plus equipment delivery and fuel as separate lines. The 72-inch drum mulcher handles trees up to about 6 to 8 inches at the base.

## Equipment
Cat 289D3 compact track loader (high flow), Raytree RMDM72SS 72-inch drum mulcher, Top Cat HDRC 72-inch brush cutter, Raytree RMSC78 power rake, Raytree RMA42 auger, GIYI GY-D680 post driver, International 4700 dump truck, Ford F-350 flatbed, tilt trailer.

## Services
${group('service')}

## Areas served
${group('location')}
`;
}
