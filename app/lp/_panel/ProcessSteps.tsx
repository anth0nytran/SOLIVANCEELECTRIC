'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, ClipboardCheck, FileText, Wrench, Zap } from 'lucide-react';

// The panel job in four steps. When the row scrolls into view, a line draws
// through it (across on desktop, down on phones) and each step lights up in
// order. The last step ends green: the city inspector's sign-off.

const STEPS: { icon: typeof Zap; title: string; detail: string }[] = [
  { icon: ClipboardCheck, title: 'Inspection', detail: 'A licensed electrician checks your panel in person. No cost, no obligation.' },
  { icon: FileText, title: 'Written quote', detail: 'Itemized and in writing before any work starts. If your panel is fine, we tell you that.' },
  { icon: Wrench, title: 'Permit and install', detail: 'We file the permit, coordinate the power shut-off with the utility, and install your new panel to code.' },
  { icon: BadgeCheck, title: 'City inspection', detail: 'An inspector signs off and leaves the green tag on your panel. That’s your proof it passed.' },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_GAP = 0.28; // seconds between steps lighting up

export function ProcessSteps() {
  const still = useReducedMotion();
  const t = (delay: number, duration = 0.5) => (still ? { duration: 0 } : { delay, duration, ease: EASE });
  const inView = { once: true, margin: '0px 0px -80px 0px' } as const;

  return (
    <motion.ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-6" initial="hidden" whileInView="shown" viewport={inView}>
      {/* Desktop line across the icons: grey track, then a drawn orange line. Phones draw one segment per step (below). */}
      <span className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 bg-[#D5DBE2] lg:block" aria-hidden />
      <motion.span
        className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 origin-left bg-[#E8590C] lg:block"
        variants={{ hidden: { scaleX: still ? 1 : 0 }, shown: { scaleX: 1 } }}
        transition={t(0.1, STEP_GAP * STEPS.length)}
        aria-hidden
      />

      {STEPS.map(({ icon: Icon, title, detail }, i) => {
        const last = i === STEPS.length - 1;
        const at = 0.1 + i * STEP_GAP;
        return (
          <li key={title} className="relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center">
            {/* Phones: segment from this icon down to the next one, so the line ends at the last step. */}
            {!last ? (
              <>
                <span className="absolute bottom-0 left-[23px] top-12 w-0.5 bg-[#D5DBE2] lg:hidden" aria-hidden />
                <motion.span
                  className="absolute bottom-0 left-[23px] top-12 w-0.5 origin-top bg-[#E8590C] lg:hidden"
                  variants={{ hidden: { scaleY: still ? 1 : 0 }, shown: { scaleY: 1 } }}
                  transition={t(at + 0.1, STEP_GAP)}
                  aria-hidden
                />
              </>
            ) : null}
            {/* Icon node: starts as a grey ring, lights up as the line reaches it. */}
            <motion.span
              className="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2"
              variants={{
                hidden: still ? {} : { backgroundColor: '#FFFFFF', borderColor: '#D5DBE2', color: '#A3ADBA', scale: 0.9 },
                shown: {
                  backgroundColor: last ? '#1F7A4D' : '#E8590C',
                  borderColor: last ? '#1F7A4D' : '#E8590C',
                  color: '#FFFFFF',
                  scale: 1,
                },
              }}
              transition={t(at, 0.35)}
            >
              <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </motion.span>

            <motion.div
              className="min-w-0 flex-1 rounded-xl bg-white p-5 shadow-[0_1px_2px_rgba(10,19,34,0.06)] ring-1 ring-[#E3E7EC] lg:mt-5 lg:w-full lg:flex-none"
              variants={{ hidden: still ? {} : { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
              transition={t(at + 0.08, 0.45)}
            >
              <p className="text-sm font-semibold text-[#5A6B7F]">Step {i + 1}</p>
              <p className="mt-1 text-[1.1rem] font-bold leading-snug text-[#0A1322]">{title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#4A5568]">{detail}</p>
            </motion.div>
          </li>
        );
      })}
    </motion.ol>
  );
}
