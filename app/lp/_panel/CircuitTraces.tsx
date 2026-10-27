'use client';

import { motion } from 'framer-motion';
import { useStill } from './useStill';

// Background life for wide screens (xl+, where the side margins are real): a
// few hairline circuit traces in the margins, ending in small solder points,
// with a short orange pulse of "current" travelling along some of them every
// few seconds. Kept to the edges so it never sits behind text. Hidden below
// xl; still for reduced motion. Place inside a `relative isolate
// overflow-hidden` section.

const TRACES = [
  { d: 'M -20 110 H 40 Q 60 110 60 130 V 330 Q 60 350 80 350 H 90', end: [90, 350], pulse: { delay: 0.5, every: 7 } },
  { d: 'M -20 640 H 30 Q 50 640 50 620 V 480', end: [50, 480], pulse: null },
  { d: 'M 1460 200 H 1400 Q 1380 200 1380 220 V 470 Q 1380 490 1360 490 H 1350', end: [1350, 490], pulse: { delay: 2.8, every: 8 } },
  { d: 'M 1460 690 H 1420 Q 1400 690 1400 670 V 580', end: [1400, 580], pulse: null },
] as const;

export function CircuitTraces() {
  const still = useStill();
  return (
    <svg
      className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full xl:block"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
    >
      {TRACES.map(({ d, end, pulse }) => (
        <g key={d}>
          <path d={d} stroke="#0A1322" strokeOpacity={0.09} strokeWidth={1.5} strokeLinecap="round" />
          <circle cx={end[0]} cy={end[1]} r={3.5} fill="#F4F6F9" stroke="#0A1322" strokeOpacity={0.18} strokeWidth={1.5} />
          {pulse && !still ? (
            <motion.path
              d={d}
              pathLength={1}
              stroke="#E8590C"
              strokeOpacity={0.7}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="0.07 0.93"
              initial={{ strokeDashoffset: 0.07 }}
              animate={{ strokeDashoffset: -1 }}
              transition={{ delay: pulse.delay, duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: pulse.every }}
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}
