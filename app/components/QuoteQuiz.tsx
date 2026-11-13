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
  ArrowLeft, ArrowRight, BadgeCheck, Camera, HelpCircle, MessageSquare, Users, Wallet, BatteryCharging, Star, Building2, CalendarDays, Caravan, Home, Plug, ShieldCheck, ShoppingCart, Wrench, Car, CheckCircle2, ChevronRight, Clock,
  Lamp, Phone, Sun, Sunset, Timer, X, Zap,
} from 'lucide-react';
import { siteConfig } from '../config';
import { trackMarketingEvent } from './MarketingAnalytics';
import { reviews } from '../reviews';

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
  'group flex w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-3.5 py-3 text-left transition-colors hover:border-[var(--onestop-navy-deep)] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--onestop-navy-deep)] sm:gap-4 sm:px-4';
const optionOn = 'border-[var(--onestop-navy-deep)] bg-slate-50 ring-1 ring-[var(--onestop-navy-deep)]';
const field =
  'block h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-[1rem] text-[#0A1322] outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--onestop-navy-deep)] focus:ring-4 focus:ring-[var(--onestop-navy-deep)]/10';
const fieldLabel = 'sr-only sm:not-sr-only sm:mb-1 sm:block sm:text-[0.8rem] sm:font-semibold sm:text-[#0A1322]';
const cta =
  'inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-6 text-[0.92rem] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#e55f15] disabled:opacity-60';

// US area codes never start with 0 or 1, so a leading 1 / +1 is always the country code. Drop it.
const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '').replace(/^1/, '').slice(0, 10);
  if (!d.length) return '';
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

// tight = 2-up grid on phones: smaller icon, no subtitle/chevron until desktop.
function Choice({ on, icon: Icon, label, sub, onClick, tight = false }: { on?: boolean; icon: typeof Zap; label: string; sub: string; onClick: () => void; tight?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`${option} ${on ? optionOn : ''} ${tight ? 'gap-2.5 px-2.5 py-2.5 lg:gap-3 lg:px-3.5 lg:py-3' : ''}`}>
      <span className={`flex shrink-0 items-center justify-center rounded-md bg-[var(--onestop-navy-deep)]/[0.06] text-[var(--onestop-navy-deep)] ${tight ? 'h-8 w-8 lg:h-10 lg:w-10' : 'h-10 w-10'}`}>
        <Icon className={tight ? 'h-4 w-4 lg:h-5 lg:w-5' : 'h-5 w-5'} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block font-semibold leading-tight text-[#0A1322] ${tight ? 'text-[0.84rem] lg:truncate lg:text-[0.95rem]' : 'text-[0.98rem]'}`}>{label}</span>
        <span className={`mt-0.5 text-[0.8rem] leading-snug text-slate-500 ${tight ? 'hidden lg:block lg:truncate' : 'block'}`}>{sub}</span>
      </span>
      <ChevronRight className={`h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 ${tight ? 'hidden' : ''}`} aria-hidden />
    </button>
  );
}

// Real Google reviews (app/reviews.ts): panel job on time, 5-minute response, showed up + fair price.
const PROOF = ['tonya-n', 'gabriella-o', 'zno-z']
  .map((id) => reviews.find((r) => r.id === id))
  .filter(Boolean) as (typeof reviews)[number][];

function Stars({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-[var(--onestop-gold)]" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`${className} fill-current`} aria-hidden />)}
    </span>
  );
}

// Quiet trust line under every popup step: credentials + one real Google review (app/reviews.ts).
// Muted on purpose so the eye stays on the question and the white answer panel.
function Proof({ index, compact = false }: { index: number; compact?: boolean }) {
  const r = PROOF[index % PROOF.length];
  const dot = <span className="text-white/30" aria-hidden>·</span>;
  return (
    <div className="mt-4 text-center lg:mt-5">
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[0.76rem] text-white/80">
        <span className="flex items-center gap-1.5"><Stars className="h-3 w-3" /><span className="font-semibold text-white">{siteConfig.rating.toFixed(1)}</span> on Google ({siteConfig.reviewCount})</span>
        {dot}
        <span className="flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5 text-[var(--onestop-gold)]" aria-hidden />{siteConfig.license.label}</span>
        {dot}
        <span>Permit pulled</span>
        <span className="hidden sm:contents">{dot}<span>{siteConfig.yearsInBusiness}+ yrs in Houston</span></span>
      </div>
      {r && (
        <figure className={`mx-auto mt-2.5 max-w-[600px] max-lg:[@media(max-height:780px)]:hidden ${compact ? "max-sm:hidden" : ""}`}>
          <blockquote className="line-clamp-2 text-[0.82rem] italic leading-snug text-white/70">&ldquo;{r.quote}&rdquo;</blockquote>
          <figcaption className="mt-1 flex items-center justify-center gap-1 text-[0.72rem] text-white/55">
            {r.author} · <BadgeCheck className="h-3 w-3 text-emerald-400" aria-hidden /> Google review
          </figcaption>
        </figure>
      )}
    </div>
  );
}

const NEXT_STEPS = [
  { title: 'Reply to our text', body: 'Your visit isn’t booked until you reply. After hours? We text first thing in the morning.' },
  { title: 'We lock in your day', body: 'Pick a day and time that works. We may give you a quick call too.' },
  { title: 'Free visit + fixed price', body: 'A licensed electrician checks it and hands you one written price.' },
];
// Permit frame: what we do vs. what to ask anyone else. No claims about other contractors.
const COMPARE = [
  { q: 'City permit pulled', us: 'Every job that needs one' },
  { q: 'City inspection', us: 'Scheduled by us' },
  { q: 'Fails inspection?', us: 'Re-inspection on us' },
  { q: 'Texas license', us: siteConfig.license.label },
];
const PREP = [
  { icon: Camera, title: 'Snap your panel', body: 'Send a photo when you reply to our text.' },
  { icon: Users, title: 'Have the decision-makers there', body: 'Get answers and a price on the spot.' },
  { icon: Wallet, title: 'Ask about financing', body: 'Monthly payments through Synchrony.' },
];

function ThankYou({ first }: { first: string }) {
  const review = reviews.find((r) => r.id === 'zno-z');
  const card = 'rounded-xl bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]';
  const eyebrow = 'text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--onestop-red)]';
  return (
    <div role="status">
      {/* Headline */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 lg:[@media(max-height:760px)]:hidden bg-emerald-500/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-emerald-300">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
          Request received
        </span>
        <h2 className="mt-3 text-[1.55rem] font-bold leading-tight tracking-[-0.025em] text-white sm:text-[1.95rem] lg:text-[2.3rem]">
          Almost done{first ? `, ${first}` : ''}. Check your texts.
        </h2>
        <p className="mx-auto mt-1.5 max-w-xl text-[0.92rem] text-white/75 lg:text-[1rem]">
          <span className="font-semibold text-white">You&rsquo;re not booked yet.</span> We&rsquo;re texting you now. Reply to lock in your time.
        </p>
      </div>

      {/* Timeline */}
      <div className={`${card} mt-5 p-4 sm:p-5 lg:mt-5 lg:px-7 lg:py-5`}>
        <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-6">
          <span aria-hidden className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-200 lg:left-[16.6%] lg:right-[16.6%] lg:top-[15px] lg:bottom-auto lg:h-px lg:w-auto" />
          {NEXT_STEPS.map((st, i) => (
            <li key={st.title} className="relative flex gap-3 lg:flex-col lg:items-center lg:text-center">
              <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-bold ring-4 ring-white ${i === 0 ? 'bg-[var(--onestop-red)] text-white' : 'bg-slate-100 text-slate-500'}`}>
                {i === 0 ? <MessageSquare className="h-4 w-4" aria-hidden /> : i + 1}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 lg:justify-center">
                  <span className="text-[0.95rem] font-semibold leading-tight text-[#0A1322]">{st.title}</span>
                  {i === 0 && <span className="rounded-full bg-[var(--onestop-red)]/10 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-[var(--onestop-red)]">Now</span>}
                </span>
                <span className="mt-1 block text-[0.8rem] leading-snug text-slate-600">{st.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-3 grid gap-3 lg:mt-4 lg:grid-cols-[1.25fr_1fr] lg:gap-4">
        {/* Permit frame */}
        <div className={`${card} p-4 sm:p-5`}>
          <p className={eyebrow}>Before you compare quotes</p>
          <p className="mt-1.5 text-[0.98rem] font-semibold leading-snug text-[#0A1322]">The #1 reason a quote looks cheaper: <span className="text-[var(--onestop-red)]">no permit.</span></p>
          <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-[1fr_1.3fr] bg-slate-50 px-3 py-2 sm:grid-cols-[1fr_1.15fr_0.9fr] text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
              <span />
              <span className="text-[var(--onestop-navy-deep)]">Solivance</span>
              <span className="hidden sm:block">Ask anyone else</span>
            </div>
            {COMPARE.map((r) => (
              <div key={r.q} className="grid grid-cols-[1fr_1.3fr] items-center sm:grid-cols-[1fr_1.15fr_0.9fr] border-t border-slate-100 px-3 py-2 text-[0.8rem]">
                <span className="font-medium text-slate-700">{r.q}</span>
                <span className="flex items-center gap-1.5 font-semibold text-[#0A1322]"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />{r.us}</span>
                <span className="hidden items-center gap-1.5 text-slate-500 sm:flex"><HelpCircle className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />Ask</span>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[0.76rem] leading-snug text-slate-500"><span className="font-semibold text-slate-700 sm:hidden">Ask any other electrician the same 4 things. </span>Unpermitted work can come back on you when you sell your home or file an insurance claim. Then you pay twice.</p>
        </div>

        {/* Prep checklist */}
        <div className={`${card} flex flex-col p-4 sm:p-5`}>
          <p className={eyebrow}>Save time on your visit</p>
          <ul className="mt-3 grid gap-3 lg:mb-4">
            {PREP.map((it) => (
              <li key={it.title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--onestop-navy-deep)]/[0.06] text-[var(--onestop-navy-deep)]">
                  <it.icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <span>
                  <span className="block text-[0.9rem] font-semibold leading-tight text-[#0A1322]">{it.title}</span>
                  <span className="mt-0.5 block text-[0.78rem] leading-snug text-slate-600">{it.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <a href={`tel:${siteConfig.cleanPhone}`} className="mt-4 inline-flex min-h-12 w-full lg:mt-auto items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-5 text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#e55f15]">
            <Phone className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">Can&rsquo;t wait?</span> Call {siteConfig.phone}
          </a>
        </div>
      </div>

      {review && (
        <figure className="mx-auto mt-4 max-w-[620px] text-center lg:mt-5 lg:[@media(max-height:840px)]:hidden">
          <blockquote className="line-clamp-2 text-[0.8rem] italic leading-snug text-white/70">&ldquo;{review.quote}&rdquo;</blockquote>
          <figcaption className="mt-1 flex items-center justify-center gap-1 text-[0.72rem] text-white/55">
            {review.author} · <BadgeCheck className="h-3 w-3 text-emerald-400" aria-hidden /> Google review
          </figcaption>
        </figure>
      )}
    </div>
  );
}

function ServiceStep({ service, pick, compact = false }: { service: string; pick: (v: string) => void; compact?: boolean }) {
  if (compact) {
    return (
      <div className="grid gap-2 min-[420px]:grid-cols-2">
        {SERVICE_TILES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => pick(t.value)}
            className="group flex h-11 w-full items-center gap-2.5 rounded-md border border-slate-200 bg-white pl-2.5 pr-3 text-left transition-colors hover:border-[var(--onestop-navy-deep)] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--onestop-navy-deep)]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[var(--onestop-navy-deep)]/[0.06] text-[var(--onestop-navy-deep)] transition-colors group-hover:bg-[var(--onestop-red)] group-hover:text-white">
              <t.icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1 truncate text-[0.86rem] font-semibold text-[#0A1322]">{t.label}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-[var(--onestop-red)]" aria-hidden />
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-3 xl:grid-cols-4">
      {SERVICE_TILES.map((t) => (
        <Choice tight key={t.value} on={service === t.value} icon={t.icon} label={t.label} sub={t.sub} onClick={() => pick(t.value)} />
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
  const [firstName, setFirstName] = useState('');
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
      setFirstName(String(fd.get('name') || '').trim().split(/\s+/)[0] || '');
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
      <h3 className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-[var(--onestop-navy-deep)]">Almost done. Check your texts.</h3>
      <p className="mx-auto mt-2 max-w-sm text-[0.95rem] leading-relaxed text-slate-600">
        You&rsquo;re not booked yet. We&rsquo;re texting you now. Reply to lock in your time.
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
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-slate-100 pt-3 text-[0.74rem] text-slate-600">
        <span className="flex items-center gap-1.5"><Stars className="h-3 w-3" /><span className="font-semibold text-slate-800">{siteConfig.rating.toFixed(1)}</span> on Google</span>
        <span className="text-slate-300" aria-hidden>|</span>
        <span>{siteConfig.license.label}</span>
        <span className="text-slate-300" aria-hidden>|</span>
        <span>Permit pulled</span>
        <span className="hidden text-slate-300 sm:inline" aria-hidden>|</span>
        <span className="hidden sm:inline">Free quote</span>
      </div>
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
      <div className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-md">
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

      <div className={`relative mx-auto flex min-h-[calc(100dvh-61px)] w-full flex-col px-4 pb-8 pt-4 sm:px-6 sm:pt-8 lg:justify-center ${step === 'contact' ? 'lg:py-4 lg:[@media(max-height:760px)]:py-2' : 'lg:py-8'} ${step === 'service' || done ? 'max-w-[1120px]' : step === 'contact' ? 'max-w-[700px]' : 'max-w-[980px]'}`}>
        {done ? (
          <ThankYou first={firstName} />
        ) : (
          <div className={step === 'contact' ? 'mx-auto w-full max-w-[620px]' : ''}>
            <div className="text-center">
              <h2 className="text-[1.45rem] font-bold leading-[1.15] tracking-[-0.025em] text-balance text-white sm:text-[1.8rem] lg:text-[2.35rem] lg:leading-[1.08]">
                {QUESTION[step].title}
              </h2>
              <p className="mt-1 text-[0.9rem] text-white/75 lg:mt-2 lg:text-[1rem]">{QUESTION[step].sub}</p>
            </div>

            {/* The one bright thing on screen: the answers */}
            <div className="mt-4 rounded-xl bg-white p-2.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] sm:p-3 lg:mt-6 lg:p-4">
              {step === 'service' && <ServiceStep service={service} pick={pickService} />}

              {step === 'urgency' && (
                <>
                  <div className="grid gap-2 sm:gap-2.5 lg:grid-cols-3">
                    {URGENCY.map((u) => (
                      <Choice key={u.value} on={urgency === u.value} icon={u.icon} label={u.label} sub={u.sub} onClick={() => { setUrgency(u.value); go('window'); }} />
                    ))}
                  </div>
                  <a href={`tel:${siteConfig.cleanPhone}`} className="mt-2.5 flex items-center justify-center gap-2 border-t border-slate-100 pt-2.5 text-[0.8rem] text-slate-600 hover:text-[var(--onestop-red)]">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--onestop-red)]" aria-hidden />
                    <span><span className="font-semibold text-slate-800">Power out or burning smell?</span> Call {siteConfig.phone}, 24/7.</span>
                  </a>
                </>
              )}

              {step === 'window' && (
                <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5">
                  {WINDOWS.map((w) => (
                    <Choice key={w.value} on={timeWindow === w.value} icon={w.icon} label={w.label} sub={w.sub} onClick={() => { setTimeWindow(w.value); go('contact'); }} />
                  ))}
                </div>
              )}

              {step === 'contact' && (
                <form onSubmit={submit} className="grid gap-2.5 p-1 sm:p-1.5">
                  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  {initialMessage && <input type="hidden" name="message" value={initialMessage} />}
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <label className="block">
                      <span className={fieldLabel}>Full name</span>
                      <input required name="name" type="text" autoComplete="name" placeholder="Full name" pattern="[A-Za-z\s\-']{2,50}" title="Letters, spaces and hyphens only" className={field} />
                    </label>
                    <label className="block">
                      <span className={fieldLabel}>Mobile phone</span>
                      <span className="relative block">
                        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-2 pl-3.5 text-[1rem] font-medium text-slate-500">+1<span className="h-5 w-px bg-slate-200" /></span>
                        <input required name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Mobile phone" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" title="10-digit US phone number" className={`${field} pl-12`} />
                      </span>
                    </label>
                    <label className="block">
                      <span className={fieldLabel}>Email</span>
                      <input required name="email" type="email" autoComplete="email" placeholder="Email" className={field} />
                    </label>
                    <label className="block">
                      <span className={fieldLabel}>Service address</span>
                      <input required name="address" type="text" autoComplete="street-address" placeholder="Service address" className={field} />
                    </label>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-md bg-slate-50 px-3 py-2">
                    <input type="checkbox" name="financing" value="yes" defaultChecked={defaultFinancing} className="h-4 w-4 shrink-0 rounded-sm border-slate-300" />
                    <span className="text-[0.8rem] leading-snug text-slate-700"><span className="font-semibold">Ask me about financing</span> <span className="text-slate-500">· Synchrony, subject to approval</span></span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-md bg-slate-50 px-3 py-2">
                    <input type="checkbox" name="sms_consent" value="yes" className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-slate-300" />
                    <span className="text-[0.66rem] leading-[1.4] text-slate-600">
                      <span className="font-semibold text-slate-700">Text me about my quote (optional).</span> I agree to texts from Solivance Electric LLC about my request and scheduling, 1–5 msgs per request. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Not a condition of service.
                    </span>
                  </label>
                  <button type="submit" disabled={sending} className={cta}>
                    {sending ? 'Sending…' : <>Get my free quote <ArrowRight className="h-4 w-4" aria-hidden /></>}
                  </button>
                  {error && <div role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-[0.85rem] font-medium text-rose-800">{error}</div>}
                  <p className="text-center text-[0.64rem] leading-[1.4] text-slate-500">
                    By submitting you confirm you&rsquo;re 18+ and agree to our <a href="/terms" className="underline">Terms</a> &amp; <a href="/privacy" className="underline">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>

            <Proof index={stepNo - 1} compact={step === 'contact'} />
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
