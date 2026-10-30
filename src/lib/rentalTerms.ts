// Rental agreement, damage waiver, insurance and release terms shown on the
// rentals section. DRAFT: have an Ohio attorney review before relying on it.
import { BUSINESS } from '@/lib/constants';
import { CANCEL_FREE_HOURS, CANCEL_FEE, DAMAGE_WAIVER_PCT, DEPOSIT } from '@/lib/rentals';

export type TermsSection = {
  id: string;
  title: string;
  // Who this section applies to, shown as a tag.
  appliesTo: string;
  paragraphs?: string[];
  bullets?: string[];
};

const pct = `${Math.round(DAMAGE_WAIVER_PCT * 100)}%`;

export const RENTAL_TERMS: TermsSection[] = [
  {
    id: 'who-can-rent',
    title: 'Who can rent',
    appliesTo: 'All rentals',
    bullets: [
      'The renter must be 21 or older and show a valid driver’s license at pickup.',
      'A credit or debit card is required for the refundable deposit (a card hold, released when the rental comes back in the same condition).',
      'The renter signs our rental agreement at pickup. Golf cart and side-by-side renters also sign a release of liability, and so does every driver and rider.',
      'Businesses renting heavy equipment provide a certificate of insurance (see Insurance requirements).',
    ],
  },
  {
    id: 'rental-agreement',
    title: 'Rental agreement: the key terms',
    appliesTo: 'All rentals',
    bullets: [
      'The rental runs from pickup (or delivery) to return. Late returns are billed at the daily rate for each extra day.',
      'Return it clean, fueled to the level it left at, and in the same condition. Refueling, cleaning and repairs beyond normal wear are billed at return.',
      'Only the renter and the drivers or operators named on the agreement may use the equipment. No subrenting or lending.',
      'No use under the influence of alcohol, drugs or any medication that affects driving or operating.',
      'Never exceed the machine’s rated load, slope or flow limits. Follow the operator’s manual and our safety walk-through.',
      'Before digging, augering or driving posts, call Ohio811 (dial 811) at least 48 hours ahead so buried lines are marked. Damage to buried utilities is the renter’s responsibility.',
      'The renter is responsible for loss, theft and damage while the equipment is in their care. Report any accident, injury or damage to us right away, and report theft to the police within 24 hours.',
      `Cancel more than ${CANCEL_FREE_HOURS} hours before pickup at no charge. Later cancellations cost ${CANCEL_FEE}.`,
      `Deposit: $${DEPOSIT} for heavy equipment, $250 for a golf cart and $1,000 for the Segway Villain. The largest deposit in your order applies.`,
    ],
  },
  {
    id: 'damage-waiver',
    title: `Damage waiver (${pct} of rent)`,
    appliesTo: 'All rentals',
    paragraphs: [
      `The damage waiver is not insurance. For ${pct} of the rent, we waive our right to charge you for accidental damage to the rented equipment beyond your deposit. It is required on golf carts and the Segway Villain. On heavy equipment you can decline it if you provide proof of insurance that covers rented equipment.`,
    ],
    bullets: [
      'Not covered: damage from misuse, abuse, overloading or ignoring the operator’s manual; anyone driving under the influence or anyone not named on the agreement; rollovers from reckless driving; driving on public roads; damage while towing or hauling it yourself; theft when the keys were left in it or it was left unsecured.',
      'Not covered: normal wear items billed at cost, such as mulcher teeth, cutter blades, tires punctured by stumps or stakes, and lost keys.',
      'The waiver covers the equipment only. It does not cover injuries, damage to other people’s property, or anything else you are liable for.',
    ],
  },
  {
    id: 'insurance',
    title: 'Insurance requirements',
    appliesTo: 'Offsite and business rentals',
    bullets: [
      `Heavy equipment without the damage waiver: a certificate of insurance for rented or leased equipment (inland marine) at full replacement value, naming ${BUSINESS.legalName} as loss payee.`,
      `Contractors and businesses: general liability of at least $1,000,000 per occurrence, naming ${BUSINESS.legalName} as additional insured.`,
      'Segway Villain taken offsite: proof of liability insurance of at least $300,000 that covers you operating a rented side-by-side on your property (a homeowners, farm or powersports policy; check with your agent, many homeowners policies exclude off-road vehicles away from home). The damage waiver is also required.',
      'Golf carts at events or private property: proof of the host’s liability insurance (homeowners, farm or event policy).',
      `Email the certificate to ${BUSINESS.email} before pickup. No proof, no rental.`,
    ],
  },
  {
    id: 'drivers-riders',
    title: 'Golf cart and side-by-side rules',
    appliesTo: 'Golf carts and Segway Villain',
    bullets: [
      'Drivers must be 21 or older with a valid driver’s license and be named on the agreement.',
      'Private property and event grounds only. These vehicles are not street legal: no public roads, road shoulders or crossings.',
      'Never carry more people than there are seats. Passengers must be able to sit with their feet flat on the floor and hold the grab handle.',
      'Segway Villain: helmets and eye protection for everyone (we provide them), seat belts fastened, doors or nets closed, hands and feet inside.',
      'No riding after dark, in storms, on frozen ponds or across slopes steeper than the operator’s manual allows.',
      'Onsite riding stays on the course we show you. Our staff can end a ride at any time for unsafe driving, without a refund.',
    ],
  },
  {
    id: 'release',
    title: 'Release of liability and assumption of risk',
    appliesTo: 'Golf carts and Segway Villain',
    paragraphs: [
      'Every driver and rider signs this release at pickup. A parent or guardian signs for any rider under 18.',
      `I understand that riding in or driving a golf cart or off-road side-by-side has inherent risks, including rollovers, collisions, ejection, uneven ground, hidden obstacles, weather and the actions of other drivers, and that these can cause serious injury or death. I choose to take part and I accept these risks.`,
      `To the fullest extent Ohio law allows, I release ${BUSINESS.legalName} (doing business as ${BUSINESS.name}), its owners, employees and landowners from any claim for injury, death or property damage that arises from my use of the rented vehicle, including claims based on their ordinary negligence. This release does not cover gross negligence or willful misconduct.`,
      `I agree to follow the rules above, to be responsible for the people I allow to ride, and to indemnify ${BUSINESS.legalName} against claims made by them or by others because of my use of the vehicle.`,
      'I confirm I am not under the influence of alcohol or drugs, I have no medical condition that makes riding unsafe for me, and I have read and understood this release before signing.',
    ],
  },
];
