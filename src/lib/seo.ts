// Per-URL <head> data and JSON-LD, used at build time by scripts/prerender.mjs.
import { BUSINESS, FAQ_ITEMS } from '@/lib/constants';
import { ALL_PAGES, findPage, pageUrl, type Faq } from '@/lib/pages';

export const SITE = 'https://www.rthllc.com';
const BUSINESS_ID = `${SITE}/#business`;

export type Head = {
  path: string;
  title: string;
  description: string;
  canonical: string;
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
      jsonLd: [faqSchema(FAQ_ITEMS)],
    };
  }

  const url = `${SITE}${pageUrl(page)}`;
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: page.navLabel, item: url },
    ],
  };
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.h1,
    serviceType: page.serviceType ?? 'Land clearing and forestry mulching',
    description: page.description,
    url,
    provider: { '@id': BUSINESS_ID, '@type': 'HomeAndConstructionBusiness', name: BUSINESS.name, telephone: '+16143792170' },
    areaServed: page.areaName
      ? { '@type': 'Place', name: page.areaName }
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
    title: page.title,
    description: page.description,
    canonical: url,
    jsonLd: [service, crumbs, faqSchema(page.faqs)],
  };
}
