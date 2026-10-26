import { HelpCircle, Plus } from 'lucide-react';
import {
  DAMAGE_WAIVER_PCT,
  DEPOSIT,
  DELIVERY_BASE_EACH_WAY,
  ENGINE_HOURS_PER_DAY,
  CANCEL_FREE_HOURS,
  usd,
} from '@/lib/rentals';

type Row = {
  vendor: string;
  phone?: string;
  machine: string;
  r4hr: string;
  rDay: string;
  rWeek: string;
  r4Week: string;
  notes: string;
  highlight?: boolean;
};

const MACHINE_ROWS: Row[] = [
  {
    vendor: 'Rock The Hock (Logan)',
    machine: 'Cat 289D3 CTL (large frame, high flow)',
    r4hr: usd(295),
    rDay: usd(375),
    rWeek: usd(1125),
    r4Week: usd(3150),
    notes: `Delivery ${usd(DELIVERY_BASE_EACH_WAY)} each way within 25 mi`,
    highlight: true,
  },
  {
    vendor: 'Slaymaker Rentals (Logan)',
    phone: '888-392-4708',
    machine: 'Bobcat T595 track loader (smaller frame)',
    r4hr: usd(295),
    rDay: usd(395),
    rWeek: usd(1165),
    r4Week: usd(2995),
    notes: '10% damage waiver, fuel extra, 8 hr/day single shift',
  },
  {
    vendor: 'Hocking Hills Rental Center (Logan)',
    phone: '(740) 216-1473',
    machine: 'John Deere 325G / 317 skid steer',
    r4hr: 'n/a',
    rDay: usd(350),
    rWeek: usd(1050),
    r4Week: usd(3150),
    notes: 'Pickup in store',
  },
  {
    vendor: 'Sunbelt Rentals (Hilliard branch)',
    phone: '866-246-1984',
    machine: '2,100-2,800 lb track skid steer',
    r4hr: usd(380),
    rDay: usd(550),
    rWeek: usd(1895),
    r4Week: 'not listed',
    notes: 'Online rate; delivery extra',
  },
  {
    vendor: 'United Rentals (quoted to Logan, OH)',
    phone: '614-335-5356',
    machine: '3,400-4,100 lb compact track loader',
    r4hr: 'n/a',
    rDay: usd(688),
    rWeek: usd(1864),
    r4Week: usd(4255),
    notes: 'Delivery to Logan quoted at $854 round trip plus 2% environmental fee',
  },
  {
    vendor: 'Ohio CAT / Cat Rental Store',
    machine: 'Cat compact track loaders',
    r4hr: 'Call for quote',
    rDay: '',
    rWeek: '',
    r4Week: '',
    notes: 'Rates vary by branch',
  },
];

const ATTACHMENT_ROWS: Row[] = [
  {
    vendor: 'Rock The Hock — brush cutter',
    machine: 'Top Cat HDRC 72-inch',
    r4hr: usd(125),
    rDay: usd(175),
    rWeek: usd(525),
    r4Week: '',
    notes: 'Requires 289D3 or mulching package',
    highlight: true,
  },
  {
    vendor: 'Sunbelt — brush cutter',
    machine: '4-ft brush cutter',
    r4hr: usd(165),
    rDay: usd(240),
    rWeek: usd(645),
    r4Week: '',
    notes: '',
  },
  {
    vendor: 'Rock The Hock — auger',
    machine: 'Raytree RMA42 skid steer auger',
    r4hr: usd(75),
    rDay: usd(100),
    rWeek: usd(300),
    r4Week: '',
    notes: 'Requires 289D3 or mulching package',
    highlight: true,
  },
  {
    vendor: 'Sunbelt — auger',
    machine: 'Skid steer auger',
    r4hr: usd(90),
    rDay: usd(135),
    rWeek: usd(350),
    r4Week: '',
    notes: '',
  },
];

const MULCHER_NOTE =
  'Columbus-area market typically $800-$1,450/day and $3,100-$5,100/week for a high-flow loader plus mulcher. Ours: $795/day, $2,950/week.';

const QUESTIONS = [
  {
    q: 'Is the damage waiver extra, and what percent?',
    a: `Yes — ${Math.round(DAMAGE_WAIVER_PCT * 100)}% of rent. You can decline it with proof of inland marine / equipment insurance.`,
  },
  {
    q: 'Is delivery included, and what does it cost each way?',
    a: `Delivery is ${usd(DELIVERY_BASE_EACH_WAY)} each way within 25 miles of Logan, plus $4/mile beyond. Pickup in Logan is free.`,
  },
  {
    q: 'How many engine hours per day are included?',
    a: `${ENGINE_HOURS_PER_DAY} engine hours per day, 40 per week, 160 per 4 weeks. Extra hours billed pro-rata.`,
  },
  { q: 'Is fuel included?', a: 'Machine goes out full — return full or pay $6.50/gal plus a $25 refuel fee.' },
  { q: 'Are environmental or service fees added?', a: 'No. Sales tax only — no environmental, service, or hidden fees.' },
  { q: 'Is the bucket or bit included?', a: 'Yes, the Cat bucket comes with every 289D3 rental.' },
  { q: 'What is the deposit?', a: `${usd(DEPOSIT)} card hold, released on return.` },
  {
    q: "What's the cancellation policy?",
    a: `Free up to ${CANCEL_FREE_HOURS} hours before pickup. Inside ${CANCEL_FREE_HOURS} hours, a fee of one day's rent.`,
  },
  { q: 'Is the machine high flow (needed for a mulcher)?', a: 'Yes, our 289D3 runs the Raytree mulcher at 30-45 GPM high flow.' },
];

const RENTAL_FAQ = [
  {
    q: 'Who can rent?',
    a: 'You must be 18 or older with a valid driver\u2019s license and a credit card for the deposit.',
  },
  {
    q: 'Do I need experience?',
    a: 'No \u2014 we do a walk-through with you. Mulcher renters must watch a 15-minute safety briefing.',
  },
  {
    q: "What's the damage waiver?",
    a: `It\u2019s ${Math.round(DAMAGE_WAIVER_PCT * 100)}% of the rental cost and covers accidental damage. You can decline it with proof of your own equipment insurance.`,
  },
  {
    q: 'What if it rains or the machine breaks down?',
    a: 'Call us within 30 minutes. No charge for downtime we cause.',
  },
  {
    q: 'Can I tow it myself?',
    a: 'The 289D3 weighs about 10,000 lb plus trailer. Most pickups can\u2019t tow it safely, so we recommend delivery.',
  },
];

export default function RentalCompare() {
  return (
    <div className="space-y-10">
      {/* Machine comparison */}
      <div>
        <h3 className="text-2xl normal-case">Track loader rates</h3>
        <p className="mt-2 max-w-2xl text-sm text-charcoal/70">
          We want you to compare. Here's what other rental yards near Logan charged for similar machines when we checked
          on Oct 26, 2026. Call them, then call us.
        </p>

        {/* Desktop table */}
        <div className="mt-6 hidden overflow-x-auto rounded-xl border-2 border-forest/10 lg:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-forest text-white">
              <tr>
                <th className="px-4 py-3 font-heading uppercase">Vendor</th>
                <th className="px-4 py-3 font-heading uppercase">Machine</th>
                <th className="px-4 py-3 text-right font-heading uppercase">4hr</th>
                <th className="px-4 py-3 text-right font-heading uppercase">Day</th>
                <th className="px-4 py-3 text-right font-heading uppercase">Week</th>
                <th className="px-4 py-3 text-right font-heading uppercase">4wk</th>
                <th className="px-4 py-3 font-heading uppercase">Notes</th>
              </tr>
            </thead>
            <tbody>
              {MACHINE_ROWS.map((r) => (
                <tr
                  key={r.vendor}
                  className={`border-t border-charcoal/10 ${r.highlight ? 'bg-orange/5 font-semibold' : ''}`}
                >
                  <td className="px-4 py-3">
                    {r.vendor}
                    {r.phone && <div className="text-xs font-normal text-charcoal/60">{r.phone}</div>}
                  </td>
                  <td className="px-4 py-3">{r.machine}</td>
                  <td className="px-4 py-3 text-right">{r.r4hr}</td>
                  <td className="px-4 py-3 text-right">{r.rDay}</td>
                  <td className="px-4 py-3 text-right">{r.rWeek}</td>
                  <td className="px-4 py-3 text-right">{r.r4Week}</td>
                  <td className="px-4 py-3 text-xs text-charcoal/70">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-4 space-y-3 lg:hidden">
          {MACHINE_ROWS.map((r) => (
            <div
              key={r.vendor}
              className={`rounded-xl border-2 p-4 ${r.highlight ? 'border-orange bg-orange/5' : 'border-forest/10 bg-white'}`}
            >
              <div className="font-semibold">{r.vendor}</div>
              {r.phone && <div className="text-xs text-charcoal/60">{r.phone}</div>}
              <div className="mt-1 text-sm text-charcoal/80">{r.machine}</div>
              <div className="mt-3 grid grid-cols-4 gap-1 text-center text-xs">
                <div>
                  <div className="font-bold">{r.r4hr}</div>
                  <div className="text-charcoal/50">4hr</div>
                </div>
                <div>
                  <div className="font-bold">{r.rDay}</div>
                  <div className="text-charcoal/50">day</div>
                </div>
                <div>
                  <div className="font-bold">{r.rWeek}</div>
                  <div className="text-charcoal/50">wk</div>
                </div>
                <div>
                  <div className="font-bold">{r.r4Week || '—'}</div>
                  <div className="text-charcoal/50">4wk</div>
                </div>
              </div>
              {r.notes && <p className="mt-2 text-xs text-charcoal/60">{r.notes}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Attachment comparison */}
      <div>
        <h3 className="text-xl normal-case">Attachment rates</h3>
        <div className="mt-4 hidden overflow-x-auto rounded-xl border-2 border-forest/10 md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-forest text-white">
              <tr>
                <th className="px-4 py-3 font-heading uppercase">Vendor</th>
                <th className="px-4 py-3 font-heading uppercase">Attachment</th>
                <th className="px-4 py-3 text-right font-heading uppercase">4hr</th>
                <th className="px-4 py-3 text-right font-heading uppercase">Day</th>
                <th className="px-4 py-3 text-right font-heading uppercase">Week</th>
              </tr>
            </thead>
            <tbody>
              {ATTACHMENT_ROWS.map((r, i) => (
                <tr
                  key={i}
                  className={`border-t border-charcoal/10 ${r.highlight ? 'bg-orange/5 font-semibold' : ''}`}
                >
                  <td className="px-4 py-3">{r.vendor}</td>
                  <td className="px-4 py-3">{r.machine}</td>
                  <td className="px-4 py-3 text-right">{r.r4hr}</td>
                  <td className="px-4 py-3 text-right">{r.rDay}</td>
                  <td className="px-4 py-3 text-right">{r.rWeek}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 space-y-3 md:hidden">
          {ATTACHMENT_ROWS.map((r, i) => (
            <div
              key={i}
              className={`rounded-xl border-2 p-4 ${r.highlight ? 'border-orange bg-orange/5' : 'border-forest/10 bg-white'}`}
            >
              <div className="font-semibold">{r.vendor}</div>
              <div className="text-sm text-charcoal/80">{r.machine}</div>
              <div className="mt-2 grid grid-cols-3 gap-1 text-center text-xs">
                <div>
                  <div className="font-bold">{r.r4hr}</div>
                  <div className="text-charcoal/50">4hr</div>
                </div>
                <div>
                  <div className="font-bold">{r.rDay}</div>
                  <div className="text-charcoal/50">day</div>
                </div>
                <div>
                  <div className="font-bold">{r.rWeek}</div>
                  <div className="text-charcoal/50">wk</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-forest/5 p-4 text-sm text-charcoal/80">
          <span className="font-semibold">Forestry mulcher packages: </span>
          {MULCHER_NOTE}
        </div>
      </div>

      {/* Questions checklist */}
      <div>
        <h3 className="text-xl normal-case">Questions to ask when you call around</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {QUESTIONS.map((item) => (
            <div key={item.q} className="rounded-lg border-2 border-forest/10 bg-white p-4">
              <p className="flex items-start gap-2 text-sm font-semibold text-charcoal">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                {item.q}
              </p>
              <p className="mt-1.5 pl-6 text-xs text-charcoal/70">
                <span className="font-bold text-forest">Our answer: </span>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rental FAQ */}
      <div>
        <h3 className="text-xl normal-case">Rental FAQ</h3>
        <div className="mt-4 space-y-2">
          {RENTAL_FAQ.map((item) => (
            <details key={item.q} className="group rounded-lg border-2 border-forest/10 bg-white p-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-charcoal">
                {item.q}
                <span className="text-forest transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-2 text-sm text-charcoal/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <p className="text-xs text-charcoal/50">
        Competitor prices are from their public websites or written quotes on Oct 26, 2026 and can change. Always confirm
        with them directly.
      </p>
    </div>
  );
}
