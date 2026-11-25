// Real RTH job photos. The build (scripts/fetch-photos.mjs) copies each source
// photo from our Supabase bucket into dist/photos/ under a descriptive file name,
// so pages serve /photos/<descriptive-name>.jpg from rthllc.com.
import type { PagePhoto } from '@/content/types';

export const PHOTOS_BASE = '/photos/';
export const PHOTO_SOURCE_BASE =
  'https://afwiyqhgtptuzsxwoysn.supabase.co/storage/v1/object/public/quote-photos/site/';

export const PHOTOS = {
  laneRaking: {
    source: 'hero-mulching.jpg',
    file: 'cat-289d3-track-loader-raytree-attachment-gravel-lane-ohio.jpg',
    alt: 'Cat 289D3 compact track loader with a blue Raytree attachment working a gravel lane beside a mowed field',
  },
  logDecking: {
    source: 'work-log-clearing.jpg',
    file: 'land-clearing-logs-decked-cat-track-loader-ohio.jpg',
    alt: 'Cat track loader next to logs decked at the edge of a newly cleared lane through the woods',
  },
  laneThroughTrees: {
    source: 'work-trail-1.jpg',
    file: 'cleared-lane-through-trees-cat-track-loader.jpg',
    alt: 'Freshly cleared gravel lane through a tree line with the Cat track loader at the far end',
  },
  laneToBridge: {
    source: 'work-trail-2.jpg',
    file: 'cleared-access-lane-to-bridge-southeast-ohio.jpg',
    alt: 'Cleared access lane leading to a small bridge, with brush cut back on both sides',
  },
  overgrownField: {
    source: 'work-field-mulching.jpg',
    file: 'overgrown-field-brush-clearing-rolling-hills-ohio.jpg',
    alt: 'Track loader working in a tall, overgrown field on rolling hill ground',
  },
  forksStone: {
    source: 'work-farm-clearing.jpg',
    file: 'cat-289d3-pallet-forks-moving-stone-farm-ohio.jpg',
    alt: 'Cat 289D3 with pallet forks moving a large stone block along a gravel farm drive past white outbuildings',
  },
  drivewayGrading: {
    source: 'work-driveway.jpg',
    file: 'gravel-driveway-grading-track-loader-ohio.jpg',
    alt: 'Track loader with a blue Raytree attachment grading a gravel driveway that curves through a lawn',
  },
  hillsideDrive: {
    source: 'work-pines.jpg',
    file: 'gravel-drive-along-wooded-hillside-power-rake.jpg',
    alt: 'Gravel drive running along a wooded hillside, with the track loader and attachment in the foreground',
  },
  hillsidePasture: {
    source: 'work-hillside.jpg',
    file: 'hillside-pasture-brush-clearing-cat-track-loader.jpg',
    alt: 'Cat track loader with a bucket clearing overgrowth on a hillside pasture',
  },
  cat289d3: {
    source: 'cat-289d3.jpg',
    file: 'cat-289d3-compact-track-loader-logan-ohio.jpg',
    alt: 'Front view of Rock The Hock's Cat 289D3 compact track loader in Logan, Ohio',
  },
  mulcherPackage: {
    source: 'mulching-package.jpg',
    file: 'cat-289d3-raytree-attachment-forestry-mulching-package.jpg',
    alt: 'Cat 289D3 track loader with a blue Raytree attachment on a gravel lane next to a mowed field',
  },
} satisfies Record<string, PagePhoto & { source: string }>;

export const SHARE_PHOTO = PHOTOS.laneRaking;
