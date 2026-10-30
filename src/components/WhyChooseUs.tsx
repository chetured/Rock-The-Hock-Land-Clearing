import { FlameKindling, Feather, Phone, FileText, Users } from 'lucide-react';

const REASONS = [
  {
    icon: FlameKindling,
    title: 'No burn piles or hauling',
    blurb: 'Forestry mulching grinds it all into mulch right where it stands. Nothing to burn, nothing to truck away.',
  },
  {
    icon: Feather,
    title: 'Light enough for soft ground and slopes',
    blurb: 'Our Cat track loader has low ground pressure, so it works on wet soil and hillsides without tearing up the land.',
  },
  {
    icon: Phone,
    title: 'One owner who answers the phone',
    blurb: 'Call or text and you talk to the owner. No call centers, no runaround.',
  },
  {
    icon: FileText,
    title: 'Clear written quotes',
    blurb: 'You get a fixed, written quote after the site walk. No surprises, no mystery fees.',
  },
  {
    icon: Users,
    title: 'Part of the Red Brick Ranch family',
    blurb: 'A family-run business in Logan for local land, events and rentals. One team you already trust.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="section-pad bg-cream">
      <div className="container-tight">
        <div className="text-center">
          <span className="eyebrow">Why Rock The Hock</span>
          <h2 className="text-3xl sm:text-4xl">Why choose us</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, blurb }) => (
            <article
              key={title}
              className="rounded-xl border-2 border-forest/10 bg-white p-6 shadow-sm"
            >
              <Icon className="h-9 w-9 text-orange" />
              <h3 className="mt-4 text-lg normal-case">{title}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{blurb}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#quote" className="btn-primary">
            Get my free quote
          </a>
        </div>
      </div>
    </section>
  );
}
