'use client';

import { useLang } from './LanguageToggle';

// Hand-set line break for English headings. In Spanish it becomes a space:
// Google translates each side of a <br> on its own, which garbles the sentence,
// and the longer Spanish text balances better without a forced break.
export function LineBreak({ className }: { className?: string }) {
  return useLang() === 'es' ? ' ' : <br className={className} />;
}
