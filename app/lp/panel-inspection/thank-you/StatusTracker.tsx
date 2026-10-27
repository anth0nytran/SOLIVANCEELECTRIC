'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';

// "Your inspection" status card. Done steps are green and solid, the current
// step is raised and live, upcoming steps are grey with a dashed line.
// One orchestrated entrance: steps fade in in order, the progress bar fills,
// the green line draws down to the current step, then that step lifts in.

export type TrackStep = { title: string; detail: string };

const EASE = [0.22, 1, 0.36, 1] as const;

export function StatusTracker({ steps, current }: { steps: TrackStep[]; current: number }) {
  const still = useReducedMotion();
  const t = (delay: number, duration = 0.5) => (still ? { duration: 0 } : { delay, duration, ease: EASE });
  const lineDone = 0.35 + steps.length * 0.08; // after the rows are in

  return (
    <div className="rounded-2xl border border-[#E3E7EC] bg-[#F7F8FA] p-5 sm:p-7">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[1.05rem] font-semibold">Your inspection</h2>
        <p className="text-sm text-[#5A6B7F]">
          Step {current + 1} of {steps.length}
        </p>
      </div>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#E3E7EC]" aria-hidden>
        <motion.div
          className="h-full rounded-full bg-[#1F7A4D]"
          initial={{ width: still ? `${((current + 0.5) / steps.length) * 100}%` : '0%' }}
          animate={{ width: `${((current + 0.5) / steps.length) * 100}%` }}
          transition={t(0.25, 0.9)}
        />
      </div>

      <ol className="mt-5">
        {steps.map((s, i) => {
          const done = i < current;
          const now = i === current;
          return (
            <motion.li
              key={s.title}
              aria-current={now ? 'step' : undefined}
              className="relative -mx-3 rounded-xl px-3 py-3"
              initial={still ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.15 + i * 0.08, 0.45)}
            >
              {/* The current step's raised card fades in under the row once the line reaches it. */}
              {now ? (
                <motion.span
                  className="absolute inset-0 rounded-xl bg-white shadow-[0_10px_28px_-14px_rgba(10,19,34,0.35)] ring-1 ring-[#E8590C]/35"
                  initial={still ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={t(lineDone + 0.35, 0.45)}
                  aria-hidden
                />
              ) : null}

              {/* Connector to the next step: solid green once passed (drawn down), dashed grey ahead. */}
              {i < steps.length - 1 ? (
                done ? (
                  <motion.span
                    className="absolute left-[27px] top-[44px] h-[calc(100%-32px)] w-0.5 origin-top bg-[#1F7A4D]"
                    initial={still ? false : { scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={t(lineDone, 0.45)}
                    aria-hidden
                  />
                ) : (
                  <span className="absolute left-[27px] top-[44px] h-[calc(100%-32px)] border-l-2 border-dashed border-[#CDD4DC]" aria-hidden />
                )
              ) : null}

              <div className="relative flex gap-4">
                {/* Dot and title share one 32px row, so the dot is centred on the title. */}
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                  {now && !still ? (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[#E8590C]/25"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                      transition={{ delay: lineDone + 0.6, duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      done ? 'bg-[#1F7A4D] text-white' : now ? 'bg-[#E8590C] text-white' : 'border-2 border-[#D5DBE2] bg-[#F7F8FA] text-[#A3ADBA]'
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : i + 1}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex min-h-8 flex-wrap items-center gap-x-2 gap-y-1">
                    <p className={`font-semibold leading-tight ${done || now ? 'text-[#0A1322]' : 'text-[#9AA5B4]'}`}>{s.title}</p>
                    {done ? <span className="text-[0.78rem] font-semibold text-[#1F7A4D]">Done</span> : null}
                    {now ? (
                      <span className="rounded-full bg-[#FDEEE5] px-2 py-0.5 text-[0.75rem] font-semibold leading-none text-[#C2470A]">In progress</span>
                    ) : null}
                  </div>
                  <p className={`mt-0.5 text-[0.93rem] leading-relaxed ${now ? 'text-[#4A5568]' : done ? 'text-[#5A6B7F]' : 'text-[#A3ADBA]'}`}>
                    {s.detail}
                  </p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
