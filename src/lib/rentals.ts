// Equipment rental data and pricing engine — single source of truth for the
// rental quote builder. Edit prices and policy constants here.

export type RentalCategory = 'Machine' | 'Attachment' | 'Package' | 'Recreation';

export type RentalItem = {
  id: string;
  name: string;
  category: RentalCategory;
  blurb: string;
  rate4hr: number | null;
  rateDay: number;
  rateWeek: number;
  rate4Week: number;
  requiresMachine: boolean;
  notes?: string;
  image?: string;
  imageExt?: string;
  imageContain?: boolean;
  badge?: string;
  specs?: string[];
  includesBucket?: boolean;
  // Priced by the day only: the card hides the 4hr/week/4wk columns.
  dayRateOnly?: boolean;
  // Golf carts and side-by-sides: needs the release of liability, a licensed
  // adult driver, and the damage waiver (it can't be declined).
  recreational?: boolean;
  // Card hold for this item; the quote uses the largest one in the cart.
  deposit?: number;
};

export const RENTAL_ITEMS: RentalItem[] = [
  {
    id: 'cat-289d3',
    name: 'Cat 289D3 compact track loader',
    category: 'Machine',
    blurb: 'High flow, enclosed cab with heat and A/C. Smooth bucket included.',
    rate4hr: 295,
    rateDay: 375,
    rateWeek: 1125,
    rate4Week: 3150,
    requiresMachine: false,
    notes: 'Low ground pressure tracks for soft and sloped ground.',
    image: 'cat-289d3',
    includesBucket: true,
  },
  {
    id: 'mulcher-package',
    name: 'Forestry mulching package: Cat 289D3 plus Raytree RMDM72SS 72-inch drum mulcher',
    category: 'Package',
    blurb: 'Raytree RMDM72SS drum mulcher on our high-flow Cat 289D3. Turns brush and saplings into mulch in one pass.',
    rate4hr: null,
    rateDay: 795,
    rateWeek: 2950,
    rate4Week: 8400,
    requiresMachine: false,
    notes:
      'Daily minimum. Includes a 15-minute safety walk-through. Teeth wear and broken teeth beyond normal use billed at cost.',
    image: 'rental-drum-mulcher',
    imageExt: 'webp',
    imageContain: true,
    badge: 'High flow 30-45 GPM',
    specs: ['72-inch cut', '30-45 GPM high flow', '2,028 lb', 'Hydraulic deflector door'],
    includesBucket: true,
  },
  {
    id: 'brush-cutter',
    name: 'Top Cat HDRC 72-inch heavy-duty brush cutter',
    category: 'Attachment',
    blurb: 'Open-front rotary cutter for brush, saplings and overgrown fields.',
    rate4hr: 125,
    rateDay: 175,
    rateWeek: 525,
    rate4Week: 1450,
    requiresMachine: true,
    image: 'rental-brush-cutter',
  },
  {
    id: 'pallet-forks',
    name: 'Pallet fork frame and forks',
    category: 'Attachment',
    blurb: 'Move pallets, stone, fence rolls and lumber. Adjustable forks on a quick-attach frame.',
    rate4hr: 45,
    rateDay: 60,
    rateWeek: 180,
    rate4Week: 500,
    requiresMachine: true,
    image: 'rental-pallet-forks',
    imageExt: 'webp',
    imageContain: true,
  },
  {
    id: 'auger',
    name: 'Raytree RMA42 skid steer auger',
    category: 'Attachment',
    blurb: 'Hydraulic auger for fence posts, footers and tree planting. Ask about bit sizes.',
    rate4hr: 75,
    rateDay: 100,
    rateWeek: 300,
    rate4Week: 850,
    requiresMachine: true,
    image: 'rental-auger',
  },
  {
    id: 'power-rake',
    name: 'Raytree RMSC78 78-inch power rake',
    category: 'Attachment',
    blurb: 'Grades, levels and preps seed beds; angles left or right.',
    rate4hr: 110,
    rateDay: 150,
    rateWeek: 450,
    rate4Week: 1250,
    requiresMachine: true,
    image: 'rental-power-rake',
  },
  {
    id: 'post-driver',
    name: 'GIYI GY-D680 hydraulic post driver',
    category: 'Attachment',
    blurb: 'Drives T-posts and wood posts fast, no ladder or hand driver.',
    rate4hr: 110,
    rateDay: 150,
    rateWeek: 450,
    rate4Week: 1250,
    requiresMachine: true,
    image: 'rental-post-driver',
  },
  {
    id: 'golf-cart',
    name: 'Yamaha Drive2 electric golf cart',
    category: 'Recreation',
    blurb: 'For weddings, events, campgrounds, farms and big properties. Delivered and picked up, or tow it yourself.',
    rate4hr: null,
    rateDay: 250,
    rateWeek: 250 * 7,
    rate4Week: 250 * 28,
    requiresMachine: false,
    dayRateOnly: true,
    recreational: true,
    deposit: 250,
    image: 'rental-golf-cart',
    imageExt: 'png',
    imageContain: true,
    specs: ['Electric', 'Rear flip seat'],
    notes: 'Private property and event grounds only. Not street legal. Driver 21+ with a valid driver\u2019s license.',
  },
  {
    id: 'segway-villain',
    name: 'Segway Villain SX10 W 72-inch side-by-side: onsite riding',
    category: 'Recreation',
    blurb: 'Ride the 72-inch Segway Villain sport side-by-side on our property near Logan. Onsite riding only. Helmets and eye protection provided.',
    rate4hr: null,
    rateDay: 500,
    rateWeek: 500 * 7,
    rate4Week: 500 * 28,
    requiresMachine: false,
    dayRateOnly: true,
    recreational: true,
    deposit: 1000,
    image: 'rental-segway-villain-72',
    imageExt: 'png',
    imageContain: true,
    badge: 'Onsite riding only',
    notes: 'Driver 21+ with a valid driver\u2019s license. Every rider signs the release before riding. Short safety briefing first.',
  },
];

// The Cat bucket always ships with the 289D3 (and the mulching package) at no charge.
export const BUCKET = {
  name: 'Cat smooth bucket',
  image: 'cat-bucket.webp',
  blurb: 'Always included with the Cat 289D3 and the mulching package. No charge, nothing to add.',
};

export function quoteIncludesBucket(quote: { items: { itemId: string }[] }): boolean {
  return quote.items.some((q) => RENTAL_ITEMS.find((i) => i.id === q.itemId)?.includesBucket);
}

function cartItems(cart: string[]): RentalItem[] {
  return cart.map((id) => RENTAL_ITEMS.find((i) => i.id === id)).filter((i): i is RentalItem => !!i);
}

export function cartHasRecreational(cart: string[]): boolean {
  return cartItems(cart).some((i) => i.recreational);
}

export function cartHasEquipment(cart: string[]): boolean {
  return cartItems(cart).some((i) => !i.recreational);
}

// Policy constants — shown in the quote summary and the "questions to ask" list.
export const DAMAGE_WAIVER_PCT = 0.1;
export const SALES_TAX_PCT = 0.0725;
export const DEPOSIT = 500;
export const DELIVERY_BASE_EACH_WAY = 150;
export const DELIVERY_PER_MILE_BEYOND = 4;
export const DELIVERY_FREE_RADIUS = 25;
export const ENGINE_HOURS_PER_DAY = 8;
export const ENGINE_HOURS_PER_WEEK = 40;
export const ENGINE_HOURS_PER_4_WEEK = 160;
export const FUEL_REFUEL_FEE = 25;
export const FUEL_PER_GALLON = 6.5;
export const CANCEL_FREE_HOURS = 48;
export const CANCEL_FEE = 'one day\u2019s rent';

// Approximate miles from Logan, OH 43138 — used for delivery estimates.
export const TOWN_MILES: Record<string, number> = {
  Logan: 0,
  Nelsonville: 13,
  Laurelville: 15,
  Rockbridge: 8,
  'Sugar Grove': 18,
  Lancaster: 20,
  Athens: 26,
  McArthur: 22,
  'New Lexington': 30,
  Circleville: 30,
  'Southeast Columbus area': 40,
};

// Pricing engine -----------------------------------------------------------

export type ItemBreakdown = {
  itemId: string;
  name: string;
  blocks: { label: string; qty: number; cost: number }[];
  cost: number;
};

export type QuoteResult = {
  items: ItemBreakdown[];
  subtotal: number;
  waiver: number;
  delivery: number;
  tax: number;
  total: number;
  deposit: number;
};

/**
 * Compute the cheapest combination of 4-week, week, and day (or 4-hour for
 * same-day half-day) blocks that covers the rental length. When the cost of
 * the smaller blocks exceeds the next block up, the larger block is used
 * instead (cap days at the week rate, cap weeks at the 4-week rate).
 */
export function computeItemCost(
  item: RentalItem,
  days: number,
  halfDay: boolean,
): { label: string; qty: number; cost: number }[] {
  // Same-day half-day: use the 4-hour rate if available.
  if (halfDay && days <= 1) {
    if (item.rate4hr != null) {
      return [{ label: '4 hours', qty: 1, cost: item.rate4hr }];
    }
    return [{ label: '1 day', qty: 1, cost: item.rateDay }];
  }

  const d = Math.max(days, 1);
  if (item.dayRateOnly) {
    return [{ label: 'day', qty: d, cost: d * item.rateDay }];
  }
  const blocks: { label: string; qty: number; cost: number }[] = [];

  let remaining = d;
  // 4-week blocks
  const w4 = Math.floor(remaining / 28);
  if (w4 > 0) {
    blocks.push({ label: '4-week', qty: w4, cost: w4 * item.rate4Week });
    remaining -= w4 * 28;
  }
  // Weeks — but cap: if remaining weeks cost more than one 4-week block, bump up.
  let weeks = Math.floor(remaining / 7);
  if (weeks > 0 && weeks * item.rateWeek > item.rate4Week) {
    weeks = 0;
    // push an extra 4-week block instead
    blocks.push({ label: '4-week', qty: 1, cost: item.rate4Week });
    remaining -= 28;
    if (remaining < 0) remaining = 0;
  }
  if (weeks > 0) {
    blocks.push({ label: 'week', qty: weeks, cost: weeks * item.rateWeek });
    remaining -= weeks * 7;
  }
  // Days — cap: if remaining days cost more than one week, bump up.
  let dayCount = remaining;
  if (dayCount > 0 && dayCount * item.rateDay > item.rateWeek) {
    dayCount = 0;
    blocks.push({ label: 'week', qty: 1, cost: item.rateWeek });
  }
  if (dayCount > 0) {
    blocks.push({ label: 'day', qty: dayCount, cost: dayCount * item.rateDay });
  }

  return blocks;
}

export function formatBlocks(blocks: { label: string; qty: number }[]): string {
  return blocks.map((b) => `${b.qty} ${b.label}${b.qty > 1 ? 's' : ''}`).join(' + ');
}

export function computeDelivery(miles: number): number {
  const eachWay = DELIVERY_BASE_EACH_WAY + Math.max(0, miles - DELIVERY_FREE_RADIUS) * DELIVERY_PER_MILE_BEYOND;
  return eachWay * 2;
}

export function computeQuote(params: {
  cart: string[];
  items: RentalItem[];
  days: number;
  halfDay: boolean;
  waiver: boolean;
  delivery: boolean;
  miles: number;
}): QuoteResult {
  const { cart, items, days, halfDay, waiver, delivery, miles } = params;

  const itemBreakdowns: ItemBreakdown[] = [];
  let subtotal = 0;

  for (const id of cart) {
    const item = items.find((i) => i.id === id);
    if (!item) continue;
    const blocks = computeItemCost(item, days, halfDay);
    const cost = blocks.reduce((sum, b) => sum + b.cost, 0);
    subtotal += cost;
    itemBreakdowns.push({
      itemId: id,
      name: item.name,
      blocks,
      cost,
    });
  }

  // Recreational vehicles always carry the damage waiver.
  const waiverAmount = waiver || cartHasRecreational(cart) ? subtotal * DAMAGE_WAIVER_PCT : 0;
  const deposit = Math.max(0, ...cartItems(cart).map((i) => i.deposit ?? DEPOSIT));
  const deliveryCost = delivery ? computeDelivery(miles) : 0;
  const tax = (subtotal + waiverAmount + deliveryCost) * SALES_TAX_PCT;
  const total = subtotal + waiverAmount + deliveryCost + tax;

  return {
    items: itemBreakdowns,
    subtotal,
    waiver: waiverAmount,
    delivery: deliveryCost,
    tax,
    total,
    deposit,
  };
}

// Days between two YYYY-MM-DD dates (inclusive — same day = 1 day rental).
export function rentalDays(pickup: string, returnDate: string): number {
  if (!pickup || !returnDate) return 0;
  const p = new Date(pickup + 'T00:00:00');
  const r = new Date(returnDate + 'T00:00:00');
  const diff = Math.round((r.getTime() - p.getTime()) / 86400000);
  return Math.max(diff, 0);
}

export function usd(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function buildPlainTextQuote(params: {
  quote: QuoteResult;
  pickup: string;
  returnDate: string;
  halfDay: boolean;
  delivery: boolean;
  miles: number;
  town?: string;
}): string {
  const { quote, pickup, returnDate, halfDay, delivery, miles, town } = params;
  const lines: string[] = [];
  lines.push('ROCK THE HOCK — EQUIPMENT RENTAL QUOTE');
  lines.push('=========================================');
  lines.push(`Dates: ${pickup}${returnDate ? ' to ' + returnDate : ''}${halfDay ? ' (half day — 4 hours)' : ''}`);
  if (delivery) lines.push(`Delivery: ${town ? town + ' (' + miles + ' mi)' : miles + ' miles from Logan'}`);
  else lines.push('Pickup: Logan, OH');
  lines.push('');
  lines.push('EQUIPMENT');
  for (const item of quote.items) {
    lines.push(`  ${item.name}`);
    lines.push(`    ${formatBlocks(item.blocks)} — ${usd(item.cost)}`);
  }
  if (quoteIncludesBucket(quote)) {
    lines.push(`  ${BUCKET.name}`);
    lines.push(`    Included with the skid steer — ${usd(0)}`);
  }
  lines.push('');
  lines.push(`Rental subtotal:     ${usd(quote.subtotal)}`);
  if (quote.waiver > 0) lines.push(`Damage waiver (10%): ${usd(quote.waiver)}`);
  if (quote.delivery > 0) lines.push(`Delivery:            ${usd(quote.delivery)}`);
  lines.push(`Sales tax (7.25%):   ${usd(quote.tax)}`);
  lines.push(`Estimated total:     ${usd(quote.total)}`);
  lines.push(`Refundable deposit:  ${usd(quote.deposit)} (card hold, released on return)`);
  lines.push('');
  lines.push('Estimate. Fuel, extra engine hours and damage are billed at return. Quote valid 30 days.');
  lines.push('Signed rental agreement required at pickup. Golf carts and side-by-sides also need a signed');
  lines.push('release of liability from every driver and rider.');
  lines.push(`Call (614) 379-2170 to confirm availability.`);
  return lines.join('\n');
}
