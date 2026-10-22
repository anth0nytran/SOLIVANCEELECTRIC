import type { ReactNode } from 'react';

// Marks a slot waiting on real content from the client. Deliberately obvious so
// nothing ships with a guessed price, promise or term.
export function Pending({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-[0.9rem] text-slate-400">
      Coming soon: {children}
    </p>
  );
}
