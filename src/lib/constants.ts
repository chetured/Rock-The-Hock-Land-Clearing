// Business information — single source of truth across the site.
export const BUSINESS = {
  name: 'Rock The Hock Land Clearing',
  legalName: 'RTH Group LLC',
  owner: 'Shay Reddy',
  sisterCompany: 'Red Brick Ranch',
  phone: '(614) 379-2170',
  phoneRaw: '6143792170',
  email: 'shay@rthllc.com',
  city: 'Logan',
  region: 'OH',
  county: 'Hocking County',
  serviceArea: [
    'Logan',
    'Nelsonville',
    'Laurelville',
    'Rockbridge',
    'Sugar Grove',
    'Lancaster',
    'Athens',
    'McArthur',
    'New Lexington',
    'Circleville',
    'Southeast Columbus area',
  ],
} as const;

// PASTE YOUR FORMSPREE ENDPOINT ID HERE. Get it from https://formspree.io.
// It looks like "https://formspree.io/f/abcdwxyz" — paste the full URL.
export const FORM_ENDPOINT = 'https://formspree.io/f/xvkkkrnj';

// Base URL for owner's real job photos stored in Supabase storage.
// Every image URL is built as PHOTO_BASE + name + '.jpg'.
export const PHOTO_BASE =
  'https://afwiyqhgtptuzsxwoysn.supabase.co/storage/v1/object/public/quote-photos/site/';

// Google Analytics measurement ID. Replace with your real ID (e.g. G-XXXXXXX).
export const GA_MEASUREMENT_ID = 'G-R3CFMSQF04';

export const SERVICES = [
  {
    id: 'forestry-mulching',
    label: 'Forestry mulching',
    blurb:
      'Grind brush, saplings and small trees into mulch in place. No burn piles, no hauling, soil stays protected.',
  },
  {
    id: 'lot-homesite-clearing',
    label: 'Lot and homesite clearing',
    blurb: 'Open up a building site, cabin pad or camper spot.',
  },
  {
    id: 'overgrowth-brush-cutting',
    label: 'Overgrowth and brush cutting',
    blurb: 'Reclaim fields, pastures and overgrown acreage.',
  },
  {
    id: 'fence-property-line-clearing',
    label: 'Fence line and property line clearing',
    blurb: 'Clear fence and property lines clean and fast.',
  },
  {
    id: 'trails-hunting-lanes-food-plots',
    label: 'Trails, hunting lanes and food plot prep',
    blurb: 'Cut trails, shooting lanes and prep food plots.',
  },
  {
    id: 'driveway-cut-ins-gravel',
    label: 'Driveway cut-ins and gravel driveway construction',
    blurb: 'Cut in new driveways and build gravel drives.',
  },
  {
    id: 'post-holes-fence-driving',
    label: 'Post holes and fence post driving',
    blurb: 'Auger post holes and drive fence posts.',
  },
  {
    id: 'grading-seed-bed-power-rake',
    label: 'Grading and seed bed prep with a power rake',
    blurb: 'Power-rake and prep a clean seed bed for grass.',
  },
  {
    id: 'septic-tank-installation',
    label: 'Septic tank installation',
    blurb:
      'New and replacement septic tank installs, including excavation and backfill. We walk the site and quote it with you.',
  },
  {
    id: 'gravel-delivery',
    label: 'Gravel delivery',
    blurb: 'Gravel and stone delivered and spread for driveways, pads and parking areas.',
  },
] as const;

export const EQUIPMENT = [
  {
    label: 'Cat 289D3 compact track loader',
    blurb: 'Low ground pressure — works on soft and sloped ground.',
  },
  {
    label: 'Raytree RMDM72SS 72-inch drum mulcher',
    blurb: 'Grinds brush and small trees into mulch in place. Requires 30-45 GPM high flow.',
  },
  {
    label: 'Top Cat HDRC 72-inch brush cutter',
    blurb: 'Cuts thick brush, field edges and overgrowth.',
  },
  {
    label: 'Raytree RMA42 auger, Raytree RMSC78 78-inch power rake, GIYI GY-D680 post driver and pallet forks',
    blurb: 'Four attachments for posts, grading, lifting and prep.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: 'How much does land clearing cost?',
    a: 'Every property is different, so we price each job after a free look. Send photos and the rough acreage and we\u2019ll get back to you fast.',
  },
  {
    q: 'What is forestry mulching?',
    a: 'One machine cuts and grinds brush and small trees into mulch right where they stand. No burn piles and no hauling, and the mulch protects the soil from erosion.',
  },
  {
    q: 'Do I need to be home for the estimate?',
    a: 'No. Just tell us where the property lines are or mark them, and we\u2019ll send the quote by text or email.',
  },
  {
    q: 'How big a tree can you handle?',
    a: 'Our mulcher handles brush and small to medium trees. Bigger trees we will look at during the site walk.',
  },
  {
    q: 'How soon can you start?',
    a: 'Usually within a few weeks, depending on weather and the schedule. Ask when you request a quote.',
  },
  {
    q: 'What happens to the stumps?',
    a: 'Mulching takes stumps down to about ground level. Let us know if you need them fully removed for building.',
  },
] as const;
