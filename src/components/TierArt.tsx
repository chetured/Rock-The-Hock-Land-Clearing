// Simple drawings that show customers what each terrain and brush tier looks
// like. Swap in real job photos later if we get a good example of each tier.

const SKY = '#e8f1ee';
const GROUND = '#8a6a43';
const GRASS = '#6f9a3c';
const ROCK = '#9b9b94';
const TREE = '#1f3a2b';
const SHRUB = '#3f6b35';
const WATER = '#6aa6c8';

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 160 90" role="img" aria-label={label} className="h-auto w-full rounded-md">
      <rect width="160" height="90" fill={SKY} />
      {children}
    </svg>
  );
}

const Loader = ({ x, y, r = 0 }: { x: number; y: number; r?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x="-11" y="-9" width="16" height="8" rx="1.5" fill="#f5c400" />
    <rect x="-8" y="-15" width="8" height="7" rx="1" fill="#f5c400" stroke="#222" strokeWidth="0.8" />
    <rect x="-13" y="-1.5" width="20" height="3.5" rx="1.7" fill="#222" />
  </g>
);

export function TerrainArt({ tier }: { tier: 1 | 2 | 3 }) {
  if (tier === 1)
    return (
      <Frame label="Tier 1 terrain: flat or gently rolling, firm ground">
        <path d="M0 62 Q80 58 160 62 V90 H0Z" fill={GROUND} />
        <path d="M0 62 Q80 58 160 62" stroke={GRASS} strokeWidth="4" fill="none" />
        <Loader x={78} y={58} />
      </Frame>
    );
  if (tier === 2)
    return (
      <Frame label="Tier 2 terrain: moderate slopes, some rocks, gullies or wet spots">
        <path d="M0 74 L60 64 L160 36 V90 H0Z" fill={GROUND} />
        <path d="M0 74 L60 64 L160 36" stroke={GRASS} strokeWidth="4" fill="none" />
        <ellipse cx="38" cy="70" rx="7" ry="4" fill={ROCK} />
        <ellipse cx="122" cy="48" rx="6" ry="3.5" fill={ROCK} />
        <path d="M90 58 q6 6 12 -1" stroke={WATER} strokeWidth="3" fill="none" />
        <Loader x={78} y={56} r={-15} />
      </Frame>
    );
  return (
    <Frame label="Tier 3 terrain: steep, rocky or wet ground">
      <path d="M0 86 L50 76 L120 22 L160 14 V90 H0Z" fill={GROUND} />
      <path d="M0 86 L50 76 L120 22 L160 14" stroke={GRASS} strokeWidth="4" fill="none" />
      <ellipse cx="70" cy="60" rx="8" ry="5" fill={ROCK} />
      <ellipse cx="104" cy="36" rx="9" ry="5" fill={ROCK} />
      <ellipse cx="136" cy="20" rx="6" ry="3.5" fill={ROCK} />
      <path d="M8 84 q14 -5 28 -1" stroke={WATER} strokeWidth="3.5" fill="none" />
      <Loader x={88} y={52} r={-37} />
    </Frame>
  );
}

const Tree = ({ x, h }: { x: number; h: number }) => (
  <g>
    <rect x={x - 1.2} y={66 - h * 0.3} width="2.4" height={h * 0.3} fill="#5b4126" />
    <path d={`M${x} ${66 - h} L${x + h * 0.28} ${66 - h * 0.25} L${x - h * 0.28} ${66 - h * 0.25}Z`} fill={TREE} />
  </g>
);
const Shrub = ({ x, r }: { x: number; r: number }) => <circle cx={x} cy={66 - r * 0.6} r={r} fill={SHRUB} />;

export function BrushArt({ tier }: { tier: 1 | 2 | 3 }) {
  const ground = <path d="M0 66 H160 V90 H0Z" fill={GROUND} />;
  if (tier === 1)
    return (
      <Frame label="Tier 1 brush: grass, weeds and light brush, little underbrush">
        {ground}
        <path d="M0 66 H160" stroke={GRASS} strokeWidth="5" />
        {[14, 30, 52, 96, 128, 146].map((x) => (
          <path key={x} d={`M${x} 66 l-2 -7 M${x} 66 l0 -9 M${x} 66 l2 -7`} stroke={GRASS} strokeWidth="1.4" />
        ))}
        <Shrub x={70} r={6} />
        <Shrub x={112} r={5} />
      </Frame>
    );
  if (tier === 2)
    return (
      <Frame label="Tier 2 brush: thick brush and saplings up to 4 inches">
        {ground}
        {[10, 26, 44, 62, 84, 102, 122, 140, 154].map((x, i) => (
          <Shrub key={x} x={x} r={7 + (i % 3) * 2} />
        ))}
        {[34, 74, 112, 146].map((x) => (
          <Tree key={x} x={x} h={30} />
        ))}
      </Frame>
    );
  return (
    <Frame label="Tier 3 brush: dense brush and trees 4 to 8 inches">
      {ground}
      {[6, 20, 36, 52, 68, 84, 100, 116, 132, 148].map((x, i) => (
        <Shrub key={x} x={x} r={9 + (i % 2) * 3} />
      ))}
      {[14, 40, 62, 90, 118, 142].map((x, i) => (
        <Tree key={x} x={x} h={48 + (i % 3) * 8} />
      ))}
    </Frame>
  );
}
