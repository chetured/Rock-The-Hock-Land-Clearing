import { Camera, FileText, TreePine } from 'lucide-react';

const STEPS = [
  {
    icon: Camera,
    title: 'Send photos or a quick description',
    blurb: 'Snap a few pics of the overgrowth and tell us roughly how big. No need to be exact.',
  },
  {
    icon: FileText,
    title: 'Free on-site walk and a fixed written quote',
    blurb: 'The owner walks the property and sends a clear, written quote by text or email.',
  },
  {
    icon: TreePine,
    title: 'We show up and clear it',
    blurb: 'On the scheduled day we bring the Cat and the mulcher and get your land back.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad bg-forest text-white">
      <div className="container-tight text-center">
        <span className="eyebrow text-orange-light">Simple process</span>
        <h2 className="text-3xl sm:text-4xl">How it works</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/75">Three steps from overgrown to open.</p>

        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, blurb }, i) => (
            <li
              key={title}
              className="relative rounded-xl border border-white/10 bg-forest-light/40 p-6 text-left"
            >
              <span className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                {i + 1}
              </span>
              <Icon className="h-8 w-8 text-orange" />
              <h3 className="mt-4 text-xl normal-case">{title}</h3>
              <p className="mt-2 text-sm text-white/75">{blurb}</p>
            </li>
          ))}
        </ol>

        <a href="#quote" className="btn-primary mt-10">
          Start step 1
        </a>
      </div>
    </section>
  );
}
