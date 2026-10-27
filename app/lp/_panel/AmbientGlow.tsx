'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Subtle background life for wide screens: a faint dot grid with two soft
// glows (Solivance orange and navy) drifting slowly. Hidden on phones; static
// for reduced-motion users. Place inside a `relative isolate overflow-hidden` section.

export function AmbientGlow() {
  const still = useReducedMotion();
  const drift = (x: number[], y: number[], duration: number) =>
    still ? {} : { animate: { x, y }, transition: { duration, repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut' as const } };

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(rgba(10,19,34,0.18) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
        }}
      />
      <motion.div
        className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#E8590C]/[0.10] blur-[90px]"
        {...drift([0, -60, 20], [0, 40, -20], 18)}
      />
      <motion.div
        className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-[#1E3A6B]/[0.10] blur-[90px]"
        {...drift([0, 50, -30], [0, -30, 20], 22)}
      />
    </div>
  );
}
