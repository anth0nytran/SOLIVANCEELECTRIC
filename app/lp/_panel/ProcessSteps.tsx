'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, ClipboardCheck, FileText, Wrench, Zap } from 'lucide-react';

// The panel job in four steps. Everything starts greyed out; when the row
// scrolls into view the steps light up slowly, one at a time: the icon pops
// in on a springy bounce with a dashed ring swirling once around it, the line
// draws on to the next step, and the card fills in from grey. Step 4 ends
// green: the city inspector's sign-off.

const STEPS: { icon: typeof Zap; title: string; detail: string }[] = [
  { icon: ClipboardCheck, title: 'Inspection', detail: 'A licensed electrician checks your panel in person. No cost, no obligation.' },
  { icon: FileText, title: 'Written quote', detail: 'Itemized and in writing before any work starts. If your panel is fine, we tell you that.' },
  { icon: Wrench, title: 'Permit and install', detail: 'We file the permit, coordinate the power shut-off with the utility, and install your new panel to code.' },
  { icon: BadgeCheck, title: 'City inspection', detail: 'An inspector signs off and leaves the green tag on your panel. That’s your proof it passed.' },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const START = 0.3; // seconds after scroll-in before step 1
const STEP_GAP = 0.95; // seconds between steps lighting up
const SPRING = { type: 'spring', stiffness: 320, damping: 12, mass: 0.8 } as const;

export function ProcessSteps() {
  const still = useReducedMotion();
  const at = (i: number) => START + i * STEP_GAP;
  const t = (delay: number, duration = 0.5) => (still ? { duration: 0 } : { delay, duration, ease: EASE });

  return (
    <motion.ol
      className="relative grid gap-0 lg:grid-cols-4 lg:gap-6"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -120px 0px' }}
    >
      {/* Desktop: one segment per gap between icons, each drawn as the previous step finishes. */}
      {STEPS.slice(0, -1).map((s, i) => (
        <span
          key={s.title}
          className="absolute top-6 hidden h-0.5 bg-[#D5DBE2] lg:block"
          style={{ left: `calc(${(i + 0.5) * 25}% + 28px)`, width: 'calc(25% - 56px)' }}
          aria-hidden
        >
          <motion.span
            className="absolute inset-0 origin-left bg-[#E8590C]"
            variants={{ hidden: { scaleX: still ? 1 : 0 }, shown: { scaleX: 1 } }}
            transition={t(at(i) + 0.35, STEP_GAP - 0.35)}
          />
        </span>
      ))}

      {STEPS.map(({ icon: Icon, title, detail }, i) => {
        const last = i === STEPS.length - 1;
        const color = last ? '#1F7A4D' : '#E8590C';
        return (
          <li key={title} className="relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center">
            {/* Phones: segment from this icon down to the next one. */}
            {!last ? (
              <span className="absolute bottom-0 left-[23px] top-12 w-0.5 bg-[#D5DBE2] lg:hidden" aria-hidden>
                <motion.span
                  className="absolute inset-0 origin-top bg-[#E8590C]"
                  variants={{ hidden: { scaleY: still ? 1 : 0 }, shown: { scaleY: 1 } }}
                  transition={t(at(i) + 0.35, STEP_GAP - 0.35)}
                />
              </span>
            ) : null}

            <span className="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center">
              {/* Swirl: a dashed ring that spins once around the icon as it lights up. */}
              {still ? null : (
                <motion.span
                  className="absolute -inset-2 rounded-full border-2 border-dashed"
                  style={{ borderColor: color }}
                  variants={{ hidden: { opacity: 0, rotate: -90, scale: 0.7 }, shown: { opacity: [0, 1, 0], rotate: 270, scale: [0.7, 1.05, 1.15] } }}
                  transition={{ delay: at(i), duration: 1.1, ease: 'easeOut' }}
                  aria-hidden
                />
              )}
              <motion.span
                className="relative flex h-12 w-12 items-center justify-center rounded-full border-2"
                variants={{
                  hidden: still ? {} : { backgroundColor: '#F1F3F6', borderColor: '#D5DBE2', color: '#A3ADBA', scale: 0.85 },
                  shown: { backgroundColor: color, borderColor: color, color: '#FFFFFF', scale: 1 },
                }}
                transition={still ? { duration: 0 } : { delay: at(i), backgroundColor: { delay: at(i), duration: 0.3 }, scale: { delay: at(i), ...SPRING } }}
              >
                <motion.span
                  className="flex"
                  variants={{ hidden: still ? {} : { rotate: -25 }, shown: { rotate: 0 } }}
                  transition={still ? { duration: 0 } : { delay: at(i), ...SPRING }}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </motion.span>
              </motion.span>
            </span>

            {/* Card: greyed out until its step lights up. */}
            <motion.div
              className="min-w-0 flex-1 rounded-xl bg-white p-5 shadow-[0_1px_2px_rgba(10,19,34,0.06)] ring-1 ring-[#E3E7EC] lg:mt-5 lg:w-full lg:flex-none"
              variants={{
                hidden: still ? {} : { opacity: 0.4, filter: 'grayscale(1)', y: 8 },
                shown: { opacity: 1, filter: 'grayscale(0)', y: 0 },
              }}
              transition={t(at(i) + 0.1, 0.6)}
            >
              <p className="text-sm font-semibold" style={{ color }}>
                Step {i + 1}
              </p>
              <p className="mt-1 text-[1.1rem] font-bold leading-snug text-[#0A1322]">{title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#4A5568]">{detail}</p>
            </motion.div>
          </li>
        );
      })}
    </motion.ol>
  );
}
