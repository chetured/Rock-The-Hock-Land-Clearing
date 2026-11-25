// Landing pages: every service, rental and town gets its own prerendered URL
// (scripts/prerender.mjs) with a "Service in Area | Rock The Hock" title.
import type { LandingPage } from '@/content/types';
import { CLEARING_SERVICES } from '@/content/services-clearing';
import { SITE_SERVICES } from '@/content/services-site';
import { RENTAL_PAGES as RENTAL_LIST } from '@/content/rentals';
import { TOWN_PAGES } from '@/content/towns';
import { PHOTOS } from '@/lib/photos';

export type { LandingPage, Faq, PageSection, PagePhoto } from '@/content/types';

type PhotoKey = keyof typeof PHOTOS;
const PAGE_PHOTOS: Record<string, PhotoKey[]> = {
  'land-clearing': ['logDecking', 'laneThroughTrees'],
  'forestry-mulching': ['mulcherPackage', 'hillsidePasture'],
  'brush-clearing': ['overgrownField', 'hillsidePasture'],
  'lot-clearing': ['logDecking', 'laneToBridge'],
  'fence-line-clearing': ['forksStone', 'overgrownField'],
  'food-plot-trail-clearing': ['laneThroughTrees', 'overgrownField'],
  'gravel-driveways': ['drivewayGrading', 'hillsideDrive'],
  'septic-tank-installation': ['forksStone', 'drivewayGrading'],
  'gravel-delivery-hauling': ['hillsideDrive', 'forksStone'],
  'post-hole-digging': ['forksStone', 'cat289d3'],
  'skid-steer-rental': ['cat289d3', 'forksStone'],
  'forestry-mulcher-rental': ['mulcherPackage', 'laneRaking'],
  'skid-steer-attachment-rental': ['drivewayGrading', 'forksStone'],
  'logan-oh': ['laneRaking', 'logDecking'],
  'hocking-hills': ['laneThroughTrees', 'hillsideDrive'],
  'rockbridge-oh': ['laneToBridge', 'overgrownField'],
  'laurelville-oh': ['hillsidePasture', 'forksStone'],
  'sugar-grove-oh': ['overgrownField', 'laneThroughTrees'],
  'nelsonville-oh': ['hillsidePasture', 'logDecking'],
  'lancaster-oh': ['drivewayGrading', 'overgrownField'],
  'athens-oh': ['hillsideDrive', 'hillsidePasture'],
  'mcarthur-oh': ['laneThroughTrees', 'laneToBridge'],
};
const withPhotos = (pages: LandingPage[]) =>
  pages.map((p) => ({ ...p, photos: p.photos ?? (PAGE_PHOTOS[p.slug] ?? []).map((k) => PHOTOS[k]) }));

export const SERVICE_PAGES: LandingPage[] = withPhotos([...CLEARING_SERVICES, ...SITE_SERVICES]);
export const RENTAL_PAGES: LandingPage[] = withPhotos(RENTAL_LIST);
export const LOCATION_PAGES: LandingPage[] = withPhotos(TOWN_PAGES);
// Rental pages are hidden for now (Shay, 2026-11-25): kept in content but not built or linked.
export const ALL_PAGES: LandingPage[] = [...SERVICE_PAGES, ...LOCATION_PAGES];

export const pageH1 = (p: LandingPage) => `${p.service} in ${p.area}`;
export const pageTitle = (p: LandingPage) => `${pageH1(p)} | Rock The Hock`;

export function findPage(path: string): LandingPage | undefined {
  const slug = path.replace(/^\/+|\/+$/g, '');
  return ALL_PAGES.find((p) => p.slug === slug);
}

export const pageUrl = (p: LandingPage) => `/${p.slug}/`;
