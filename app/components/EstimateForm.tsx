'use client';

import { QuoteQuiz } from './QuoteQuiz';
import { FormFinancingTag } from './FinancingBanner';

// Site-wide quote form (/contact, /financing). Now the tap-first QuoteQuiz.
// initialService preselects the service, e.g. a care plan picked on /care-plans.
// initialMessage prefills the notes, e.g. the generator model picked on /generators.
export function EstimateForm({ initialService = '', initialMessage = '', defaultFinancing = false }: { variant?: 'light' | 'dark'; initialService?: string; initialMessage?: string; defaultFinancing?: boolean }) {
  return (
    <div className="grid gap-3">
      <FormFinancingTag />
      <QuoteQuiz location={defaultFinancing ? 'financing' : 'contact'} initialService={initialService} initialMessage={initialMessage} defaultFinancing={defaultFinancing} />
    </div>
  );
}
