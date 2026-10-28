'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2, Phone, X } from 'lucide-react';
import { siteConfig } from '../../config';
import { newSubmissionId, readAttribution } from '../../lib/tracking';
import { TIMELINES } from '../../lib/panelOptions';
import { CallLink } from './CallLink';
import { GoogleG, Stars } from './Badges';
import { PANEL_FORM, type LeadFormConfig } from './formConfig';

// The hero shows step 1 inline. Tapping an answer — or any "#form" CTA on the
// page — opens the whole form full screen so the visitor only sees the next
// question. The X closes it without losing answers.

const SUB_KEY = 'slv_lp_submission';
const STEPS = 3;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// US area codes never start with 1, so a leading 1 (or +1) is the country code.
// Drop it before capping at 10 digits; otherwise "1 281…" kept the 1 and cut
// off the last digit of the real number.
const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '').replace(/^1/, '').slice(0, 10);
  if (d.length <= 3) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const optionCls = (active: boolean) =>
  `flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left text-[1rem] font-medium leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0E2240] ${
    active ? 'border-[#0E2240] bg-[#0E2240] text-white' : 'border-[#CBD2DA] bg-white text-[#0E2240] hover:border-[#0E2240]'
  }`;
const inputCls =
  'w-full rounded-lg border border-[#CBD2DA] bg-white px-4 py-3.5 text-base text-[#0E2240] outline-none placeholder:text-[#7D8A99] focus:border-[#0E2240] focus:ring-2 focus:ring-[#0E2240]/15';
const questionCls = 'font-[family-name:var(--font-app-display)] text-[1.5rem] font-bold leading-tight text-[#0E2240] sm:text-[1.9rem]';
const labelCls = 'mb-1.5 block text-[0.9rem] font-semibold text-[#0E2240]';
// Phones: the Back/Next row sticks to the bottom (clear of the iPhone home bar)
// so the next tap is always on screen. Larger screens: it sits under the fields.
const actionBarCls =
  'sticky bottom-0 -mx-5 flex gap-2 border-t border-[#E3E6EA] bg-white px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:border-0 sm:p-0';

// Desktop-only side panel in the full-screen form: what they get, one real
// review, and the phone number for people who'd rather talk.
const TrustPanel = ({ trust }: { trust: LeadFormConfig['trust'] }) => (
  <aside className="hidden w-[40%] max-w-[560px] shrink-0 flex-col justify-between bg-[#0A1322] p-12 text-white lg:flex xl:p-16">
    <div>
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#FF7A2F]">{trust.kicker}</p>
      <p className="mt-4 text-[2.2rem] font-bold leading-[1.1] tracking-[-0.025em]">{trust.headline}</p>
      <ul className="mt-9 space-y-4">
        {trust.promises.map((p) => (
          <li key={p} className="flex items-start gap-3 text-[1.02rem] text-white/85">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#4ADE80]" strokeWidth={2.5} aria-hidden />
            {p}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <figure className="rounded-xl bg-white/[0.06] p-6">
        <Stars className="h-4 w-4" />
        <blockquote className="mt-3 text-[1.15rem] font-semibold leading-snug">&ldquo;{trust.quote}&rdquo;</blockquote>
        <figcaption className="mt-4 flex items-center gap-2 text-sm text-white/60">
          {trust.source === 'Google' ? (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
              <GoogleG className="h-3.5 w-3.5" />
            </span>
          ) : null}
          {trust.author} · {trust.source} review
        </figcaption>
      </figure>
      <p className="mt-8 text-sm text-white/55">Prefer to talk?</p>
      <CallLink location="form_panel" className="mt-1 inline-flex items-center gap-2 text-[1.4rem] font-bold hover:text-[#FF7A2F]">
        <Phone className="h-5 w-5" aria-hidden /> {siteConfig.phone}
      </CallLink>
    </div>
  </aside>
);

// The picked answer shows a check, so after going Back it's clear what's chosen.
const OptionLabel = ({ text, active }: { text: string; active: boolean }) => (
  <>
    <span>{text}</span>
    {active ? <Check className="h-5 w-5 shrink-0" strokeWidth={3} aria-hidden /> : null}
  </>
);

export function PanelLeadForm({ id = 'form', config = PANEL_FORM }: { id?: string; config?: LeadFormConfig }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [concern, setConcern] = useState('');
  const [timeline, setTimeline] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [lightCount, setLightCount] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [contact, setContact] = useState({
    name: '',
    email: '',
    address: '',
    zipCode: '',
    description: '',
    company: '',
  });
  const [phone, setPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [error, setError] = useState('');
  const [startedAt] = useState(() => Date.now().toString());
  const sending = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const openAt = useCallback((s: number) => {
    setStep(s);
    setOpen(true);
  }, []);

  // Every "#form" link on the page opens the full-screen form instead of scrolling.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest(`a[href="#${id}"]`);
      if (!a) return;
      e.preventDefault();
      openAt(concern ? Math.max(step, 1) : 0);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [id, concern, step, openAt]);

  // Lock page scroll, close on Escape, and move focus into the dialog.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pickConcern = (c: string) => {
    setConcern(c);
    openAt(1);
  };

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

    const sid = submissionId();
    const payload = {
      offer: config.offer,
      submissionId: sid,
      concern,
      timeline,
      propertyType,
      lightCount,
      preferredDate,
      ...contact,
      phone,
      smsConsent,
      company_url: honeypot.current?.value || '',
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
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => null)) as {
          ok?: boolean;
          retry?: boolean;
          error?: string;
        } | null;
        if (res.ok && data?.ok) {
          try {
            sessionStorage.removeItem(SUB_KEY);
          } catch {}
          router.push(`${config.thankYouPath}?sid=${sid}`);
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

  const field = (key: keyof typeof contact) => ({
    value: contact[key],
    onChange: (e: { target: { value: string } }) => setContact((c) => ({ ...c, [key]: e.target.value })),
  });

  const concernButtons = (wide = false) => (
    <div className={`grid gap-2 ${wide ? 'xl:grid-cols-2' : ''}`}>
      {config.concerns.map((c) => (
        <button key={c} type="button" aria-pressed={concern === c} className={optionCls(concern === c)} onClick={() => pickConcern(c)}>
          <OptionLabel text={c} active={concern === c} />
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Inline teaser in the hero: question 1 only. */}
      <div id={id} className="scroll-mt-4 rounded-xl border border-[#D5DAE0] bg-white p-4 shadow-[0_20px_50px_-24px_rgba(14,34,64,0.35)] sm:p-7">
        <p className="text-sm font-semibold text-[#0E2240]">{config.teaserKicker}</p>
        <p className="mb-4 mt-2 font-[family-name:var(--font-app-display)] text-[1.2rem] font-bold leading-snug text-[#0E2240] sm:text-[1.3rem]">
          {config.concernQuestion}
        </p>
        {concernButtons()}
        {concern ? (
          <button
            type="button"
            onClick={() => openAt(Math.max(step, 1))}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#E8590C] px-4 py-4 font-bold text-white hover:bg-[#CF4E0A]"
          >
            Continue <ArrowRight className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={config.offerName}
            className="fixed inset-0 z-[100] flex bg-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <TrustPanel trust={config.trust} />
            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
              <div className="sticky top-0 z-10 border-b border-[#E3E6EA] bg-white">
                <div className="mx-auto flex w-full max-w-2xl items-center gap-4 px-5 py-4 lg:px-10">
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between text-sm text-[#5A6B7F]">
                      <span className="hidden font-semibold text-[#0E2240] min-[360px]:inline">{config.offerName}</span>
                      <span className="whitespace-nowrap">
                        Step {step + 1} of {STEPS}
                      </span>
                    </div>
                    <div className="mt-2 h-1 w-full rounded-full bg-[#E3E6EA]">
                      <div
                        className="h-1 rounded-full bg-[#E8590C] transition-[width] duration-300"
                        style={{ width: `${((step + 1) / STEPS) * 100}%` }}
                      />
                    </div>
                  </div>
                  <button
                    ref={closeBtn}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#0E2240] hover:bg-[#F1F3F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0E2240]"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-2xl flex-1 px-5 pb-0 pt-7 sm:pb-10 sm:pt-10 lg:flex lg:flex-col lg:justify-center lg:px-10"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.18 }}
                  >
                    {step === 0 && (
                      <fieldset>
                        <legend className={`${questionCls} mb-5`}>{config.concernQuestion}</legend>
                        {concernButtons(true)}
                        <div className={`mt-8 ${actionBarCls}`}>
                          <button
                            type="button"
                            disabled={!concern}
                            onClick={() => setStep(1)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0E2240] px-4 py-4 font-semibold text-white disabled:opacity-35"
                          >
                            Next <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </fieldset>
                    )}

                    {step === 1 && (
                      <fieldset>
                        <legend className={`${questionCls} mb-5`}>How soon do you need it done?</legend>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {TIMELINES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              aria-pressed={timeline === t}
                              className={optionCls(timeline === t)}
                              onClick={() => setTimeline(t)}
                            >
                              <OptionLabel text={t} active={timeline === t} />
                            </button>
                          ))}
                        </div>

                        <p className="mb-2.5 mt-7 font-semibold text-[#0E2240]">{config.roleQuestion}</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {config.roles.map(({ label }) => (
                            <button
                              key={label}
                              type="button"
                              aria-pressed={propertyType === label}
                              className={optionCls(propertyType === label)}
                              onClick={() => setPropertyType(label)}
                            >
                              <OptionLabel text={label} active={propertyType === label} />
                            </button>
                          ))}
                        </div>

                        {config.counts ? (
                          <>
                            <p className="mb-2.5 mt-7 font-semibold text-[#0E2240]">{config.countQuestion}</p>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                              {config.counts.map((c) => (
                                <button key={c} type="button" aria-pressed={lightCount === c} className={optionCls(lightCount === c)} onClick={() => setLightCount(c)}>
                                  <OptionLabel text={c} active={lightCount === c} />
                                </button>
                              ))}
                            </div>
                          </>
                        ) : null}

                        <label className="mt-7 block">
                          <span className={labelCls}>
                            Pick a day that works <span className="font-normal text-[#6B7A8C]">(optional)</span>
                          </span>
                          <input
                            type="date"
                            min={today()}
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className={inputCls}
                          />
                        </label>

                        <div className={`mt-8 ${actionBarCls}`}>
                          <button
                            type="button"
                            onClick={() => setStep(0)}
                            className="rounded-lg border border-[#CBD2DA] px-4 py-3.5 text-[#5A6B7F]"
                            aria-label="Back"
                          >
                            <ArrowLeft className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            disabled={!timeline || !propertyType || (!!config.counts && !lightCount)}
                            onClick={() => setStep(2)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0E2240] px-4 py-4 font-semibold text-white disabled:opacity-35"
                          >
                            Next <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </fieldset>
                    )}

                    {step === 2 && (
                      <fieldset className="grid gap-4">
                        <legend className={`${questionCls} mb-1`}>Where should we send the electrician?</legend>
                        <label>
                          <span className={labelCls}>Full name</span>
                          <input name="name" required autoComplete="name" className={inputCls} {...field('name')} />
                        </label>
                        {config.askCompany ? (
                          <label>
                            <span className={labelCls}>
                              Company or property name <span className="font-normal text-[#6B7A8C]">(optional)</span>
                            </span>
                            <input name="company" autoComplete="organization" className={inputCls} {...field('company')} />
                          </label>
                        ) : null}
                        <label>
                          <span className={labelCls}>Mobile phone</span>
                          <input
                            name="phone"
                            required
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="(713) 555-0123"
                            value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))}
                            className={inputCls}
                          />
                          <span className="mt-1 block text-[0.8rem] text-[#6B7A8C]">So the electrician can call you to set a time.</span>
                        </label>
                        <label>
                          <span className={labelCls}>Email</span>
                          <input name="email" required type="email" autoComplete="email" className={inputCls} {...field('email')} />
                        </label>
                        <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,1.3fr)] gap-2">
                          <label>
                            <span className={labelCls}>{config.addressLabel}</span>
                            <input name="address" required autoComplete="street-address" className={inputCls} {...field('address')} />
                          </label>
                          <label>
                            <span className={labelCls}>ZIP</span>
                            <input
                              name="zipCode"
                              required
                              inputMode="numeric"
                              pattern="\d{5}"
                              maxLength={5}
                              autoComplete="postal-code"
                              className={inputCls}
                              {...field('zipCode')}
                            />
                          </label>
                        </div>
                        <label>
                          <span className={labelCls}>
                            Tell us what&apos;s going on <span className="font-normal text-[#6B7A8C]">(optional)</span>
                          </span>
                          <textarea
                            name="description"
                            rows={3}
                            maxLength={1000}
                            placeholder={config.descriptionPlaceholder}
                            className={`${inputCls} resize-y`}
                            {...field('description')}
                          />
                        </label>
                        {/* Honeypot: hidden from people, filled by bots. */}
                        <input
                          ref={honeypot}
                          name="company_url"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                          className="absolute -left-[9999px] h-0 w-0 opacity-0"
                        />
                        <label className="flex items-start gap-2 text-[0.72rem] leading-snug text-[#6B7A8C]">
                          <input type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} className="mt-0.5" />
                          <span>
                            Optional: text me about my request. I agree to receive texts from Solivance Electric LLC about my quote and appointment.
                            Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of
                            service. See{' '}
                            <a href="/privacy" target="_blank" rel="noopener" className="underline">
                              Privacy
                            </a>{' '}
                            &amp;{' '}
                            <a href="/terms" target="_blank" rel="noopener" className="underline">
                              Terms
                            </a>
                            .
                          </span>
                        </label>
                        {error ? (
                          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                            {error}
                          </p>
                        ) : null}
                        <p className="text-center text-sm text-[#5A6B7F]">No cost and no obligation. We&apos;ll call to set a time.</p>
                        <div className={actionBarCls}>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="rounded-lg border border-[#CBD2DA] px-4 py-3.5 text-[#5A6B7F]"
                            aria-label="Back"
                          >
                            <ArrowLeft className="h-5 w-5" />
                          </button>
                          <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#E8590C] px-4 py-4 text-[1.05rem] font-bold text-white hover:bg-[#CF4E0A] disabled:opacity-70"
                          >
                            {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                            {status === 'sending' ? 'Sending…' : config.submitLabel}
                          </button>
                        </div>
                      </fieldset>
                    )}
                  </motion.div>
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
