import type { LandingPage } from './types';

// Rental pages. These show the rental quote builder instead of the clearing
// quote form. Prices shown on the page come from src/lib/rentals.ts.

export const RENTAL_PAGES: LandingPage[] = [
  {
    kind: 'rental',
    slug: 'skid-steer-rental',
    navLabel: 'Skid steer rental',
    service: 'Skid Steer Rental',
    area: 'Logan, OH',
    description:
      'Skid steer and compact track loader rental in Logan, OH: Cat 289D3 high-flow with bucket, by the 4 hours, day, week or month. Delivery available. (614) 379-2170.',
    intro:
      'Rent our Cat 289D3 compact track loader in Logan by the half day, day, week or four weeks. It is a high-flow, enclosed-cab machine with heat and A/C, and the Cat smooth bucket is always included. Add attachments, pick it up or have us deliver it on our tilt trailer.',
    serviceType: 'Skid steer rental',
    sections: [
      {
        heading: 'The machine',
        paragraphs: [
          'The Cat 289D3 is a compact track loader, the tracked version of a skid steer. It uses the same quick-attach plate and runs the same attachments, but rubber tracks spread its weight, so it works on soft, wet and sloped ground where a wheeled skid steer would rut or slide. That matters in Hocking County, where most yards and lots are anything but flat and dry.',
        ],
        bullets: [
          'High-flow hydraulics for mulchers and other high-demand attachments',
          'Enclosed cab with heat and A/C',
          'Cat smooth bucket included with every rental',
          'Low ground pressure rubber tracks',
        ],
      },
      {
        heading: 'Rates and terms',
        paragraphs: [
          'Current rates for 4 hours, a day, a week and four weeks are in the rental quote builder below, along with the damage waiver, deposit and tax. Build your quote, pick dates and send it, and we call to confirm availability, usually the same day. Renters sign our rental agreement at pickup. On heavy equipment you can decline the damage waiver if you show proof of insurance that covers rented equipment.',
        ],
      },
      {
        heading: 'Attachments',
        paragraphs: [
          'Add a 72-inch brush cutter, a hydraulic auger, a 78-inch power rake, a hydraulic post driver or pallet forks. Or rent the full forestry mulching package with the Raytree 72-inch drum mulcher. Every attachment is priced separately in the builder.',
        ],
      },
      {
        heading: 'Pickup or delivery',
        paragraphs: [
          'Pick up in Logan with a trailer rated for the machine, or we deliver it on our tilt trailer. Delivery within about 25 miles of Logan is a flat charge each way, with a per-mile charge beyond that.',
        ],
      },
      {
        heading: 'Not sure you want to run it yourself?',
        paragraphs: [
          'If the job is bigger than you expected, or the ground is steep, we can do it for you with our own operator. Many people find that clearing with an operator costs about the same as renting once you count their own time and the learning curve. Ask for both prices and compare.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to rent a skid steer in Logan, Ohio?',
        a: 'Our Cat 289D3 track loader rents by the 4 hours, day, week or four weeks, with the bucket included. Current prices, the damage waiver, deposit and tax are all in the rental quote builder on this page.',
      },
      {
        q: 'Is a compact track loader the same as a skid steer?',
        a: 'It uses the same attachments and controls, but runs on rubber tracks instead of wheels. That gives better traction and less ground damage on soft or sloped ground.',
      },
      {
        q: 'Do you deliver the skid steer?',
        a: 'Yes, on our tilt trailer. Within about 25 miles of Logan it is a flat charge each way; farther is priced by the mile.',
      },
      {
        q: 'What do I need to rent?',
        a: 'A valid driver\'s license, a signed rental agreement, the deposit, and either the damage waiver or proof of insurance that covers rented equipment.',
      },
    ],
  },
  {
    kind: 'rental',
    slug: 'forestry-mulcher-rental',
    navLabel: 'Forestry mulcher rental',
    service: 'Forestry Mulcher Rental',
    area: 'Logan, OH',
    description:
      'Forestry mulcher rental in Logan, OH: Raytree 72-inch high-flow drum mulcher on a Cat 289D3 track loader, by the day, week or month. (614) 379-2170.',
    intro:
      'Most forestry mulchers need 30 to 45 gallons a minute of high-flow hydraulics, which rules out most rental skid steers. Our package solves that: the Raytree RMDM72SS 72-inch drum mulcher comes mounted on our high-flow Cat 289D3, ready to clear brush and saplings in one pass.',
    serviceType: 'Forestry mulcher rental',
    sections: [
      {
        heading: 'What you get',
        paragraphs: [],
        bullets: [
          'Cat 289D3 compact track loader with high-flow hydraulics and enclosed cab',
          'Raytree RMDM72SS 72-inch drum mulcher with hydraulic deflector door',
          'Cat smooth bucket included',
          'Day, week and four-week rates',
        ],
      },
      {
        heading: 'Who rents a mulcher',
        paragraphs: [
          'Landowners with a lot of brush and the time to run it themselves, hunting clubs opening plots and lanes, and contractors who need a second mulcher for a big job. If you have run a skid steer before, a mulcher is not hard to learn, but it is a powerful machine that throws debris, so we go over safe operation at pickup.',
        ],
      },
      {
        heading: 'Rates and terms',
        paragraphs: [
          'Current day, week and four-week rates, the damage waiver, deposit and tax are in the rental quote builder below. The mulcher package is not offered by the half day.',
        ],
      },
      {
        heading: 'Or have us mulch it',
        paragraphs: [
          'For steep ground, big trees, tight deadlines or if you just want it done, our forestry mulching service puts an experienced operator on the same machine. Ask for both prices.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to rent a forestry mulcher?',
        a: 'Our mulcher package rents by the day, week or four weeks. Current prices are in the rental quote builder on this page.',
      },
      {
        q: 'Can I put your mulcher on my own skid steer?',
        a: 'The mulcher rents only as a package on our Cat 289D3, because it needs 30 to 45 GPM high-flow hydraulics that most skid steers do not have.',
      },
      {
        q: 'What size trees can the rental mulcher handle?',
        a: 'Brush and saplings, and trees up to about 6 to 8 inches at the base. Bigger trees slow it down a lot and are better cut down first.',
      },
    ],
  },
  {
    kind: 'rental',
    slug: 'skid-steer-attachment-rental',
    navLabel: 'Attachment rental',
    service: 'Skid Steer Attachment Rental',
    area: 'Logan, OH',
    description:
      'Skid steer attachment rental in Logan, OH: brush cutter, auger, power rake, post driver and pallet forks. Standard quick-attach. (614) 379-2170.',
    intro:
      'Already have a skid steer or track loader? Rent the attachment you need from us in Logan. Every attachment uses the standard universal quick-attach plate, and you can rent them with our Cat 289D3 too.',
    serviceType: 'Skid steer attachment rental',
    sections: [
      {
        heading: 'Attachments for rent',
        paragraphs: [],
        bullets: [
          'Top Cat HDRC 72-inch heavy-duty brush cutter for brush, saplings and overgrown fields',
          'Raytree RMA42 hydraulic auger for fence posts, footers and tree planting',
          'Raytree RMSC78 78-inch power rake for grading, leveling and seed bed prep',
          'GIYI GY-D680 hydraulic post driver for T-posts and wood posts',
          'Pallet fork frame and forks for pallets, stone, fence rolls and lumber',
        ],
      },
      {
        heading: 'Check your machine first',
        paragraphs: [
          'Make sure your skid steer has a universal quick-attach and the right hydraulic couplers, and that its standard flow is enough for the attachment. Tell us the make and model when you request a quote and we will confirm the fit.',
        ],
      },
      {
        heading: 'Rates',
        paragraphs: [
          'Every attachment has 4-hour, day, week and four-week rates in the rental quote builder below.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Will your attachments fit my skid steer?',
        a: 'They use the standard universal quick-attach plate. Tell us your make and model and we will confirm the hydraulic fit.',
      },
      {
        q: 'Can I rent an attachment by the half day?',
        a: 'Yes, most attachments have a 4-hour rate. See the quote builder on this page.',
      },
    ],
  },
  {
    kind: 'rental',
    slug: 'golf-cart-rental',
    navLabel: 'Golf cart rental',
    service: 'Golf Cart Rental',
    area: 'Logan, OH',
    description:
      'Golf cart rental in Logan, OH for weddings, events, campgrounds and farms: Yamaha Drive2 electric with rear seat. Delivery available. (614) 379-2170.',
    intro:
      'Rent a Yamaha Drive2 electric golf cart in Logan for a wedding, a family reunion, a campground stay, a farm event or a big property. We deliver and pick up, or you can tow it yourself.',
    serviceType: 'Golf cart rental',
    sections: [
      {
        heading: 'The cart',
        paragraphs: [
          'A Yamaha Drive2 AC electric cart with a rear flip seat, so it carries passengers or gear. Quiet, no fuel smell, and easy for any licensed adult to drive.',
        ],
      },
      {
        heading: 'Good for',
        paragraphs: [],
        bullets: [
          'Weddings and venues in the Hocking Hills',
          'Family reunions and graduation parties',
          'Campgrounds and cabin stays on private property',
          'Farm events, auctions and large properties',
        ],
      },
      {
        heading: 'Terms',
        paragraphs: [
          'Day rate only. For private property and event grounds; carts are not street legal. Drivers must be 21 or older with a valid driver\'s license, and renters and drivers sign a release. The damage waiver is required. The deposit, waiver and current rate are in the quote builder below.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to rent a golf cart in Logan, Ohio?',
        a: 'Golf carts rent by the day. The current rate, deposit and required damage waiver are in the rental quote builder on this page.',
      },
      {
        q: 'Can you deliver the golf cart to a wedding venue?',
        a: 'Yes. We deliver and pick up around Logan and the Hocking Hills, or you can tow it yourself.',
      },
      {
        q: 'Can I drive the cart on the road?',
        a: 'No. The carts are for private property and event grounds only.',
      },
    ],
  },
];
