'use client';

// Tap-first quote quiz used by every site form (home hero, home footer, /contact, /financing).
// Step 1 sits inline in the card. The first tap opens the rest full-screen over the page,
// like the generator ad funnel, so phones get one question per screen with big targets.
// Sends the same fields the old form did to /api/lead (name, phone, email, address,
// service, urgency, timeWindow, message, financing, sms_consent), minus the preferred
// date: we call to set the day.

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  ArrowLeft, ArrowRight, BatteryCharging, Building2, CalendarDays, Caravan, Home, Plug, ShieldCheck, ShoppingCart, Wrench, Car, CheckCircle2, ChevronRight, Clock,
  Lamp, Lock, Phone, Shield, Sun, Sunset, Timer, X, Zap,
} from 'lucide-react';
import { siteConfig } from '../config';
import { trackMarketingEvent } from './MarketingAnalytics';

type Step = 'service' | 'urgency' | 'window' | 'contact' | 'done';
const STEPS: Step[] = ['service', 'urgency', 'window', 'contact'];

// Every service the site offers, as a tile. Values are the exact site service labels so the
// CRM "Service Needed" mapping keeps working (unmapped values land as "Other").
const SERVICE_TILES: { value: string; label: string; sub: string; icon: typeof Zap }[] = [
  { value: 'Panel Upgrades', label: 'Panel upgrade', sub: 'Old box, tripping breakers', icon: Zap },
  { value: 'Generator Installs', label: 'Generator install', sub: 'Whole-home standby', icon: BatteryCharging },
  { value: 'Briggs & Stratton Generator Sales', label: 'Buy a generator', sub: 'Briggs & Stratton dealer', icon: ShoppingCart },
  { value: 'EV Chargers', label: 'EV charger', sub: 'Level 2 or DC fast', icon: Car },
  { value: 'Parking Lot Lighting', label: 'Parking lot lighting', sub: 'Poles, LED retrofits', icon: Lamp },
  { value: 'Soffit Lighting', label: 'Soffit lighting', sub: 'Exterior & landscape', icon: Sun },
  { value: 'New Commercial Warehouses', label: 'Commercial build-out', sub: 'Warehouses & retail centers', icon: Building2 },
  { value: 'New Home Builds (Single & Multi-Family)', label: 'New home build', sub: 'Single & multi-family', icon: Home },
  { value: 'RV Park Pedestals', label: 'RV park pedestals', sub: 'New or repair', icon: Caravan },
  { value: 'Mobile Home Connections', label: 'Mobile home hookup', sub: 'Power connection', icon: Plug },
  { value: 'Solivance Care Plan', label: 'Maintenance plan', sub: 'Yearly safety checks', icon: ShieldCheck },
  { value: 'Other / Not sure', label: 'Something else', sub: 'Repairs, not sure', icon: Wrench },
];

// Values match options on the CRM Urgency dropdown ("Within 30 days" added 2026-11-13).
const URGENCY = [
  { value: 'ASAP', label: 'As soon as possible', sub: 'Next available crew', icon: Timer },
  { value: 'This week', label: 'This week', sub: 'Pick a day when we call', icon: Clock },
  { value: 'Within 30 days', label: 'Within 30 days', sub: 'Planning ahead this month', icon: CalendarDays },
];
const WINDOWS = [
  { value: 'Morning (8am–12pm)', label: 'Morning', sub: '8am – 12pm', icon: Sun },
  { value: 'Afternoon (12pm–5pm)', label: 'Afternoon', sub: '12pm – 5pm', icon: Sunset },
  { value: 'After hours (5pm–8pm)', label: 'Evening', sub: '5pm – 8pm', icon: Clock },
  { value: 'Flexible', label: 'Flexible', sub: 'Any time works', icon: CheckCircle2 },
];

const QUESTION: Record<Exclude<Step, 'done'>, { title: string; sub: string }> = {
  service: { title: 'What do you need done?', sub: 'Tap one. A licensed electrician reviews every request.' },
  urgency: { title: 'How soon do you need it?', sub: 'We are booking visits this week. Spots fill fast.' },
  window: { title: 'What time of day works best?', sub: 'We will call you to lock in the exact day.' },
  contact: { title: 'Where should we send the electrician?', sub: 'Last step. We call you right back to set your day.' },
};

const option =
  'group flex w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-3.5 py-3.5 text-left transition-colors hover:border-[var(--onestop-navy-deep)] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--onestop-navy-deep)] sm:gap-4 sm:px-4';
const optionOn = 'border-[var(--onestop-navy-deep)] bg-slate-50 ring-1 ring-[var(--onestop-navy-deep)]';
const field =
  'block h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-[1rem] text-[#0A1322] outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--onestop-navy-deep)] focus:ring-4 focus:ring-[var(--onestop-navy-deep)]/10';
const fieldLabel = 'mb-1.5 block text-[0.85rem] font-semibold text-[#0A1322]';
const cta =
  'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-6 text-[0.92rem] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#e55f15] disabled:opacity-60';

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 10);
  if (!d.length) return '';
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

function Choice({ on, icon: Icon, label, sub, onClick }: { on?: boolean; icon: typeof Zap; label: string; sub: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`${option} ${on ? optionOn : ''}`}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--onestop-navy-deep)]/[0.06] text-[var(--onestop-navy-deep)]">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.98rem] font-semibold leading-tight text-[#0A1322]">{label}</span>
        <span className="mt-0.5 block text-[0.8rem] leading-snug text-slate-500">{sub}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </button>
  );
}

function ServiceStep({ service, pick, compact = false }: { service: string; pick: (v: string) => void; compact?: boolean }) {
  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3">
        {SERVICE_TILES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => pick(t.value)}
            className="group flex min-h-[52px] items-center gap-2 rounded-md border border-slate-200 bg-white p-2 text-left min-[420px]:min-h-[84px] min-[420px]:flex-col min-[420px]:items-start min-[420px]:justify-between min-[420px]:p-2.5 transition-colors hover:border-[var(--onestop-navy-deep)] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--onestop-navy-deep)] sm:p-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--onestop-navy-deep)]/[0.06] text-[var(--onestop-navy-deep)] transition-colors group-hover:bg-[var(--onestop-red)] group-hover:text-white min-[420px]:h-8 min-[420px]:w-8">
              <t.icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-[0.82rem] font-semibold leading-tight text-[#0A1322] sm:text-[0.86rem]">{t.label}</span>
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICE_TILES.map((t) => (
        <Choice key={t.value} on={service === t.value} icon={t.icon} label={t.label} sub={t.sub} onClick={() => pick(t.value)} />
      ))}
    </div>
  );
}

export function QuoteQuiz({
  location,
  initialService = '',
  initialMessage = '',
  defaultFinancing = false,
}: {
  location: string;
  initialService?: string;
  initialMessage?: string;
  defaultFinancing?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('service');
  const [service, setService] = useState(initialService);
  const [urgency, setUrgency] = useState('');
  const [timeWindow, setTimeWindow] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [ts] = useState(() => Date.now().toString());
  const box = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // Lock the page behind the full-screen quiz.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    box.current?.scrollTo({ top: 0 });
  }, [step]);

  const go = (s: Step) => {
    setError('');
    setStep(s);
    setOpen(true);
    if (!started.current) {
      started.current = true;
      trackMarketingEvent('Lead Form Start', { form: location });
    }
  };
  const pickService = (v: string) => { setService(v); go('urgency'); };
  const start = () => go(service ? 'urgency' : 'service');
  const back = () => {
    const i = STEPS.indexOf(step);
    if (i <= 0) setOpen(false);
    else setStep(STEPS[i - 1]);
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set('service', service);
    fd.set('urgency', urgency);
    fd.set('timeWindow', timeWindow);
    fd.set('_ts', ts);
    fd.set('page', window.location.href);
    if (fd.get('financing') === 'yes') {
      const msg = String(fd.get('message') || '').trim();
      const line = 'Financing: wants Synchrony monthly payment options';
      fd.set('message', msg ? `${msg}\n${line}` : line);
    }
    if (String(fd.get('website') || '').trim()) { setStep('done'); return; }
    setSending(true);
    trackMarketingEvent('Lead Form Submit', { form: location, service });
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        trackMarketingEvent('Lead Form Error', { form: location, service });
        setError(data?.error || `Something went wrong. Please call ${siteConfig.phone}.`);
        return;
      }
      trackMarketingEvent('Lead Form Success', { form: location, service });
      setStep('done');
    } catch {
      trackMarketingEvent('Lead Form Error', { form: location, service });
      setError(`Something went wrong. Please call ${siteConfig.phone}.`);
    } finally {
      setSending(false);
    }
  }

  const done = step === 'done';
  const stepNo = done ? STEPS.length : STEPS.indexOf(step) + 1;

  const success: ReactNode = (
    <div role="status" className="text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
        <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden />
      </div>
      <h3 className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-[var(--onestop-navy-deep)]">You&rsquo;re on the list.</h3>
      <p className="mx-auto mt-2 max-w-sm text-[0.95rem] leading-relaxed text-slate-600">
        Keep your phone nearby. We&rsquo;ll call you to lock in your day. If you miss us, reply to our text with a good time.
      </p>
      <a href={`tel:${siteConfig.cleanPhone}`} className={`${cta} mt-5`}>
        <Phone className="h-4 w-4" aria-hidden /> Call now · {siteConfig.phone}
      </a>
    </div>
  );

  // Inline card: step 1 tiles (or the finished state). Everything else happens full-screen.
  const inline = done ? success : (
    <div>
      <div className="mb-3 flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
        <span>{QUESTION.service.title}</span>
        <span className="text-[var(--onestop-red)]">Step 1 of {STEPS.length}</span>
      </div>
      {service && SERVICE_TILES.every((t) => t.value !== service) ? (
        <div className="grid gap-2.5">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-[0.92rem] font-semibold text-[#0A1322]">{service}</div>
          <button type="button" onClick={start} className={cta}>Continue <ArrowRight className="h-4 w-4" aria-hidden /></button>
        </div>
      ) : (
        <ServiceStep compact service={service} pick={pickService} />
      )}
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
        <Lock className="h-3 w-3" aria-hidden /> Free quote · No obligation<span className="hidden sm:inline"> · 4 quick steps</span>
      </p>
    </div>
  );

  const overlay = open && typeof document !== 'undefined' && createPortal(
    <div ref={box} role="dialog" aria-modal="true" aria-label="Free quote" className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain bg-[var(--onestop-navy-deep)]">
      {/* Houston skyline behind the quiz, same treatment as the ad landing pages */}
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <Image src="/photos_new/cta-houston-night.jpg" alt="" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>
      {/* Top bar: brand + progress + exit */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {!done ? (
            <button type="button" onClick={back} className="inline-flex h-10 items-center gap-1.5 rounded-md px-2 text-[0.85rem] font-semibold text-white/85 hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back
            </button>
          ) : <span />}
          <span className="font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-[var(--onestop-gold)]">
            {done ? 'Request sent' : `Step ${stepNo} of ${STEPS.length}`}
          </span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="h-1 w-full bg-white/10">
          <div className="h-1 bg-[var(--onestop-red)] transition-[width] duration-300" style={{ width: `${(stepNo / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <div className={`relative mx-auto flex min-h-[calc(100dvh-60px)] w-full flex-col px-4 pb-16 pt-6 sm:px-6 sm:pt-10 lg:justify-center lg:py-14 ${step === 'service' || step === 'urgency' ? 'max-w-[980px]' : step === 'contact' ? 'max-w-[760px]' : 'max-w-[820px]'}`}>
        {done ? (
          <div className="mx-auto w-full max-w-[560px] rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">{success}</div>
        ) : (
          <div>
          <div className="lg:text-center">
            <div className="mb-3 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.22em] text-white/75 lg:justify-center">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" /> Solivance Electric · Houston <span className="hidden h-px w-6 bg-[var(--onestop-gold)] lg:inline-block" />
            </div>
            <h2 className="text-[1.6rem] font-bold leading-[1.15] tracking-[-0.025em] text-balance text-white sm:text-[1.9rem] lg:text-[2.5rem] lg:leading-[1.08]">
              {QUESTION[step].title}
            </h2>
            <p className="mt-1.5 text-[0.95rem] text-white/80 lg:mt-3 lg:text-[1.05rem]">{QUESTION[step].sub}</p>
          </div>

            <div className="mt-5 lg:mt-9">
              {step === 'service' && <ServiceStep service={service} pick={pickService} />}

              {step === 'urgency' && (
                <div className="grid gap-2.5 lg:grid-cols-3">
                  {URGENCY.map((u) => (
                    <Choice key={u.value} on={urgency === u.value} icon={u.icon} label={u.label} sub={u.sub} onClick={() => { setUrgency(u.value); go('window'); }} />
                  ))}
                  <a href={`tel:${siteConfig.cleanPhone}`} className="mt-1 flex items-center gap-2.5 rounded-md border border-[var(--onestop-red)]/30 bg-rose-50 px-3.5 py-3 text-[0.85rem] text-slate-700 hover:bg-rose-100 lg:col-span-3 lg:justify-center">
                    <Phone className="h-4 w-4 shrink-0 text-[var(--onestop-red)]" aria-hidden />
                    <span><span className="font-bold text-[var(--onestop-red)]">Power out or burning smell?</span> Call {siteConfig.phone} now, 24/7.</span>
                  </a>
                </div>
              )}

              {step === 'window' && (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {WINDOWS.map((w) => (
                    <Choice key={w.value} on={timeWindow === w.value} icon={w.icon} label={w.label} sub={w.sub} onClick={() => { setTimeWindow(w.value); go('contact'); }} />
                  ))}
                </div>
              )}

              {step === 'contact' && (
                <form onSubmit={submit} className="grid gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] sm:p-7">
                  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <div className="flex flex-wrap gap-1.5 text-[0.75rem] font-semibold text-[var(--onestop-navy-deep)]">
                    {[service, urgency, timeWindow].map((v) => (
                      <span key={v} className="rounded-full bg-slate-100 px-2.5 py-1">{v}</span>
                    ))}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={fieldLabel}>Full name</span>
                    <input required name="name" type="text" autoComplete="name" placeholder="John Doe" pattern="[A-Za-z\s\-']{2,50}" title="Letters, spaces and hyphens only" className={field} />
                  </label>
                  <label className="block">
                    <span className={fieldLabel}>Mobile phone</span>
                    <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(832) 555-0123" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" title="10-digit phone number" className={field} />
                  </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={fieldLabel}>Email</span>
                    <input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
                  </label>
                  <label className="block">
                    <span className={fieldLabel}>Service address</span>
                    <input required name="address" type="text" autoComplete="street-address" placeholder="123 Main St, Houston" className={field} />
                  </label>
                  </div>
                  <label className="block">
                    <span className={fieldLabel}>Anything we should know? <span className="font-normal text-slate-500">(optional)</span></span>
                    <textarea name="message" rows={2} maxLength={5000} defaultValue={initialMessage} placeholder="Panel age, what's tripping, gate code…" className={`${field} h-auto resize-none py-3`} />
                  </label>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5">
                    <input type="checkbox" name="financing" value="yes" defaultChecked={defaultFinancing} className="h-4 w-4 shrink-0 rounded-sm border-slate-300" />
                    <span className="text-[0.82rem] leading-snug text-slate-700"><span className="font-bold">Ask me about financing.</span> Monthly payments through Synchrony, subject to credit approval.</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5">
                    <input type="checkbox" name="sms_consent" value="yes" className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-slate-300" />
                    <span className="text-[0.68rem] leading-[1.45] text-slate-600">
                      <span className="font-bold text-slate-700">SMS consent (optional).</span> I agree to receive text messages from Solivance Electric LLC about my quote, scheduling, and appointment follow-up. Msg frequency varies (1–5 msgs per request). Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of service. See <a href="/privacy" className="underline">Privacy Policy</a> &amp; <a href="/terms" className="underline">Terms</a>.
                    </span>
                  </label>
                  <button type="submit" disabled={sending} className={cta}>
                    {sending ? 'Sending…' : <>Get my free quote <ArrowRight className="h-4 w-4" aria-hidden /></>}
                  </button>
                  {error && <div role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-[0.85rem] font-medium text-rose-800">{error}</div>}
                  <p className="text-center text-[0.68rem] leading-[1.4] text-slate-500">
                    By submitting, you confirm you are at least 18 and agree to our <a href="/terms" className="underline">Terms</a> &amp; <a href="/privacy" className="underline">Privacy Policy</a>.
                  </p>
                </form>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/75">
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[var(--onestop-gold)]" aria-hidden /> Licensed &amp; insured</span>
                <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-[var(--onestop-gold)]" aria-hidden /> Free quote</span>
                <span>{siteConfig.yearsInBusiness}+ yrs in Houston</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );

  return (
    <>
      {inline}
      {overlay}
    </>
  );
}
