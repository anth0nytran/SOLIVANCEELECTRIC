'use client';

import { motion } from 'framer-motion';
import { useStill } from './useStill';
import { CalendarClock, Flame, Lightbulb, LightbulbOff, MessageSquareWarning, Moon, ShieldAlert, FileWarning, Sun, TriangleAlert, Zap } from 'lucide-react';

// The six warning signs: a light two-column list (no boxes) with a small icon
// each. They fade up in order the first time the list scrolls into view.

type Sign = { icon: typeof Zap; title: string; detail: string };

// Lists live here, not in the pages: icons are components and can't be passed
// from a server page into this client component.
const PANEL_SIGNS: Sign[] = [
  { icon: Zap, title: 'Breakers trip', detail: 'Often when the AC and dryer run at once.' },
  { icon: Lightbulb, title: 'Lights flicker', detail: 'They dim when something big kicks on.' },
  { icon: Flame, title: 'Heat, buzzing or a smell', detail: 'From the panel itself. Call right away.' },
  { icon: ShieldAlert, title: 'A problem brand', detail: 'Federal Pacific, Zinsco, or one you can’t find.' },
  { icon: FileWarning, title: 'Flagged by an inspector', detail: 'Your insurer or a buyer’s inspector wrote it up.' },
  { icon: CalendarClock, title: 'The original panel', detail: 'Still the one the house was built with.' },
];

const LIGHTING_SIGNS: Sign[] = [
  { icon: LightbulbOff, title: 'Lights out', detail: 'One fixture or a whole row gone dark.' },
  { icon: Zap, title: 'Lights cycling on and off', detail: 'Usually a failing ballast, driver or lamp.' },
  { icon: Sun, title: 'On during the day', detail: 'Or off at night. Often the photocell or timer.' },
  { icon: TriangleAlert, title: 'A damaged or leaning pole', detail: 'Hit by a vehicle, rusted at the base, or loose.' },
  { icon: Moon, title: 'Dim, orange old lights', detail: 'Aging metal-halide or sodium fixtures.' },
  { icon: MessageSquareWarning, title: 'Tenant or customer complaints', detail: 'Dark corners, entrances or drive lanes.' },
];

const SETS = { panel: PANEL_SIGNS, lighting: LIGHTING_SIGNS };

export function SignsGrid({ variant = 'panel' }: { variant?: keyof typeof SETS }) {
  const items = SETS[variant];
  const still = useStill();
  return (
    <ul className="grid border-t border-[#E4E0D7] sm:grid-cols-2 sm:gap-x-10">
      {items.map(({ icon: Icon, title, detail }, i) => (
        <motion.li
          key={title}
          className="flex gap-3.5 border-b border-[#E4E0D7] py-4"
          initial={still ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={still ? { duration: 0 } : { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FDEEE5] text-[#E8590C]">
            <Icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </span>
          <div>
            <p className="font-semibold leading-snug text-[#0A1322]">{title}</p>
            <p className="mt-0.5 text-[0.9rem] leading-relaxed text-[#5A6B7F]">{detail}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
