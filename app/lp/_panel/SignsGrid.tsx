'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CalendarClock, Flame, Lightbulb, ShieldAlert, FileWarning, Zap } from 'lucide-react';

// The six warning signs: a light two-column list (no boxes) with a small icon
// each. They fade up in order the first time the list scrolls into view.

const SIGNS: { icon: typeof Zap; title: string; detail: string }[] = [
  { icon: Zap, title: 'Breakers keep tripping', detail: 'Especially when the AC and dryer run at the same time.' },
  { icon: Lightbulb, title: 'Lights dim or flicker', detail: 'When something big kicks on, like the AC or a microwave.' },
  { icon: Flame, title: 'Warm, buzzing or burning smell', detail: 'Any heat, sound or smell from the panel. Call right away.' },
  { icon: ShieldAlert, title: 'A problem brand', detail: 'Federal Pacific, Zinsco, or a brand you can’t find.' },
  { icon: FileWarning, title: 'Flagged by insurance or a buyer', detail: 'An insurer or a buyer’s inspector wrote it up.' },
  { icon: CalendarClock, title: 'The original panel', detail: 'Still the one from when the house was built.' },
];

export function SignsGrid() {
  const still = useReducedMotion();
  return (
    <ul className="grid border-t border-[#E4E0D7] sm:grid-cols-2 sm:gap-x-10">
      {SIGNS.map(({ icon: Icon, title, detail }, i) => (
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
