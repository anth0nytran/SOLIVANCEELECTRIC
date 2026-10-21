'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { newSubmissionId, readAttribution } from '../../lib/tracking';
import { CONCERNS, TIMELINES } from '../../lib/panelOptions';

const SUB_KEY = 'slv_lp_submission';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 10);
  if (d.length <= 3) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export function PanelLeadForm({ id = 'form' }: { id?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [concern, setConcern] = useState('');
  const [timeline, setTimeline] = useState('');
  const [decisionMaker, setDecisionMaker] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [error, setError] = useState('');
  const [startedAt] = useState(() => Date.now().toString());
  const sending = useRef(false);

  // One ID per logical submission. Kept in sessionStorage only so a retry after
  // a refresh mid-send reuses it — the server lock, not this, is the real guard.
  const submissionId = () => {
    let sid = '';
    try {
      sid = sessionStorage.getItem(SUB_KEY) || '';
    } catch {}
    if (!sid) {
      sid = newSubmissionId();
      try {
        sessionStorage.setItem(SUB_KEY, sid);
      } catch {}
    }
    return sid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus('sending');
    setError('');

    const fd = new FormData(e.currentTarget);
    const sid = submissionId();
    const payload = {
      submissionId: sid,
      concern,
      timeline,
      decisionMaker,
      name: String(fd.get('name') || ''),
      phone,
      email: String(fd.get('email') || ''),
      address: String(fd.get('address') || ''),
      zipCode: String(fd.get('zipCode') || ''),
      smsConsent: fd.get('smsConsent') === 'on',
      company_url: String(fd.get('company_url') || ''),
      _ts: startedAt,
      page: window.location.origin + window.location.pathname,
      ...readAttribution(),
    };

    // Same ID on every retry: if the first request actually landed, the server
    // returns the stored receipt instead of creating a second lead.
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const res = await fetch('/api/panel-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => null)) as { ok?: boolean; retry?: boolean; error?: string } | null;
        if (res.ok && data?.ok) {
          try {
            sessionStorage.removeItem(SUB_KEY);
          } catch {}
          router.push(`/lp/panel-inspection/thank-you?sid=${sid}`);
          return;
        }
        if (res.status === 409 && data?.retry) {
          await sleep(1500 * (attempt + 1));
          continue;
        }
        setError(data?.error || 'Something went wrong. Please try again.');
        break;
      } catch {
        await sleep(1000 * 2 ** attempt); // network blip / timeout: retry same ID
      }
    }
    setError((prev) => prev || 'Connection problem. Please try again or call us.');
    setStatus('error');
    sending.current = false;
  };

  const optionCls = (active: boolean) =>
    `w-full rounded-md border px-3.5 py-3 text-left text-[0.95rem] font-medium leading-snug sm:px-4 sm:py-3.5 sm:text-[1rem] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0E2240] ${
      active ? 'border-[#0E2240] bg-[#0E2240] text-white' : 'border-[#CBD2DA] bg-white text-[#0E2240] hover:border-[#0E2240]'
    }`;
  const inputCls =
    'w-full rounded-md border border-[#CBD2DA] bg-white px-3.5 py-3 text-base text-[#0E2240] outline-none placeholder:text-[#7D8A99] focus:border-[#0E2240] focus:ring-2 focus:ring-[#0E2240]/15';
  const legendCls = 'mb-4 font-[family-name:var(--font-app-display)] text-[1.2rem] font-bold leading-snug text-[#0E2240] sm:text-[1.3rem]';

  return (
    <div id={id} className="scroll-mt-4 rounded-xl border border-[#D5DAE0] bg-white p-4 shadow-[0_20px_50px_-24px_rgba(14,34,64,0.35)] sm:p-7">
      <div className="mb-5">
        <div className="flex items-baseline justify-between text-sm text-[#5A6B7F]">
          <span className="font-semibold text-[#0E2240]">No-cost panel inspection</span>
          <span>Step {step + 1} of 3</span>
        </div>
        <div className="mt-2.5 h-1 w-full rounded-full bg-[#E3E6EA]">
          <div className="h-1 rounded-full bg-[#0E2240] transition-[width] duration-300" style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <fieldset>
            <legend className={legendCls}>What&apos;s going on with your panel?</legend>
            <div className="grid gap-2">
              {CONCERNS.map((c) => (
                <button key={c} type="button" className={optionCls(concern === c)} onClick={() => { setConcern(c); setStep(1); }}>
                  {c}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className={legendCls}>How soon do you want it checked?</legend>
            <div className="grid gap-2">
              {TIMELINES.map((t) => (
                <button key={t} type="button" className={optionCls(timeline === t)} onClick={() => setTimeline(t)}>
                  {t}
                </button>
              ))}
            </div>
            <p className="mb-2.5 mt-6 font-semibold text-[#0E2240]">Do you own the home?</p>
            <div className="grid grid-cols-2 gap-2">
              {['Yes', 'No'].map((v) => (
                <button key={v} type="button" className={optionCls(decisionMaker === v)} onClick={() => setDecisionMaker(v)}>
                  {v}
                </button>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <button type="button" onClick={() => setStep(0)} className="rounded-md border border-[#CBD2DA] px-4 py-3 text-[#5A6B7F]" aria-label="Back">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={!timeline || !decisionMaker}
                onClick={() => setStep(2)}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#0E2240] px-4 py-3.5 font-semibold text-white disabled:opacity-35"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </fieldset>
        )}

        {/* Step 3 stays mounted-hidden until reached so the browser keeps typed values. */}
        <fieldset className={step === 2 ? 'grid gap-3' : 'hidden'}>
          <legend className={legendCls}>Where should we send the electrician?</legend>
          <input name="name" required={step === 2} autoComplete="name" placeholder="Full name" className={inputCls} aria-label="Full name" />
          <input
            name="phone"
            required={step === 2}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Mobile phone"
            aria-label="Mobile phone"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            className={inputCls}
          />
          <input name="address" required={step === 2} autoComplete="street-address" placeholder="Street address" className={inputCls} aria-label="Street address" />
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-2">
            <input
              name="zipCode"
              required={step === 2}
              inputMode="numeric"
              pattern="\d{5}"
              maxLength={5}
              autoComplete="postal-code"
              placeholder="ZIP"
              aria-label="ZIP code"
              className={inputCls}
            />
            <input name="email" type="email" autoComplete="email" placeholder="Email (optional)" aria-label="Email (optional)" className={inputCls} />
          </div>
          {/* Honeypot: hidden from people, filled by bots. */}
          <input name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
          <label className="flex items-start gap-2 text-[0.72rem] leading-snug text-[#6B7A8C]">
            <input type="checkbox" name="smsConsent" className="mt-0.5" />
            <span>
              Optional: text me about my request. I agree to receive texts from Solivance Electric LLC about my quote and appointment. Msg
              frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of service.
              See <a href="/privacy" target="_blank" rel="noopener" className="underline">Privacy</a> &amp; <a href="/terms" target="_blank" rel="noopener" className="underline">Terms</a>.
            </span>
          </label>
          {error ? <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
          <div className="flex gap-2">
            <button type="button" onClick={() => setStep(1)} className="rounded-md border border-[#CBD2DA] px-4 py-3 text-[#5A6B7F]" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#E8590C] px-3 py-3.5 text-[1rem] font-bold text-white hover:bg-[#CF4E0A] disabled:opacity-70 sm:px-4 sm:py-4 sm:text-[1.05rem]"
            >
              {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {status === 'sending' ? 'Sending…' : 'Schedule my inspection'}
            </button>
          </div>
          <p className="text-center text-sm text-[#5A6B7F]">No cost and no obligation. We&apos;ll call to set a time.</p>
        </fieldset>
      </form>
    </div>
  );
}
