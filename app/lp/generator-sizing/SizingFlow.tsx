'use client';

// Generator sizing lead magnet: /lp/generator-sizing (no site nav, one job).
//   1. What do you want running?   2. How many AC units?
//   3. "Your size is ready" (blurred teaser) + trustworthy form  -> lead created, Josh alerted
//   4. Result: big size range, matching models, then ONE action: book the free site walk.
// Leaving: the X asks first; on desktop, moving to leave before the lead is in shows one
// gentle prompt. The browser Back button is never hijacked.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  FileCheck2,
  Home,
  Lightbulb,
  Lock,
  Phone,
  ShieldCheck,
  X,
  Zap,
} from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { products, formatUsd } from '../../generators/products';
import { AllModels, ModelDetail, PickCards, byId } from './ModelViews';
import { GoogleG, Stars } from '../_panel/Badges';
import { captureAttribution, newSubmissionId, pushDataLayer, readAttribution } from '../../lib/tracking';
import {
  AC_COUNTS,
  BIG_LOADS,
  FUELS,
  GOALS,
  HOME_SIZES,
  TIMELINES,
  estimate,
  type AcCount,
  type BigLoad,
  type EstimatorAnswers,
  type Fuel,
  type Goal,
  type HomeSize,
} from '../../generators/estimator';

type View = 'goal' | 'ac' | 'contact' | 'result';
type ServerResult = { tier: string; range: string; headline: string; explanation: string; modelIds: string[]; topPickId?: string; checkOnSite: string[] };

const wrap = 'mx-auto w-full max-w-[640px] px-4 sm:px-6';
// Phones/tablets: one centered column. Desktop: wide two-column layouts.
const shell = 'mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8';
const page = 'mx-auto w-full max-w-[680px] px-4 sm:px-6 lg:max-w-[1160px] lg:px-8';
const option =
  'group flex w-full items-center gap-3 rounded-2xl border border-[#E3E6EA] bg-white px-3.5 py-3.5 text-left sm:gap-4 sm:px-4 sm:py-4 shadow-[0_1px_2px_rgba(10,19,34,0.06)] transition-all hover:border-[#E8590C] hover:shadow-[0_6px_18px_-8px_rgba(232,89,12,0.45)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A1322]';
const chip = (on: boolean) =>
  `min-h-11 rounded-xl border px-3.5 py-2 text-[0.92rem] font-medium transition-colors ${
    on ? 'border-[#0A1322] bg-[#0A1322] text-white' : 'border-[#DDE1E6] bg-white text-[#0A1322] hover:border-[#9AA5B1]'
  }`;
const label = 'mb-1.5 block text-[0.88rem] font-semibold text-[#0A1322]';
const field =
  'block h-12 w-full rounded-xl border border-[#CDD3DA] bg-white px-4 text-[1rem] text-[#0A1322] outline-none transition-colors placeholder:text-[#9AA5B1] focus:border-[#0A1322] focus:ring-4 focus:ring-[#0A1322]/10';
const cta =
  'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#E8590C] px-6 text-[1.05rem] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(232,89,12,0.7)] transition-colors hover:bg-[#CF4E0A] disabled:opacity-60';
const eyebrow = 'text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#B23F07]';
const WINDOWS = ['Morning (8am–12pm)', 'Afternoon (12pm–5pm)'] as const;
const windowParts = (w: string) => { const m = w.match(/^(\w+) \((.*)\)$/); return m ? [m[1], m[2]] : [w, '']; };
const GOAL_ICON = { essentials: Lightbulb, whole: Home } as const;

// Proof: real Google reviews only. Yeny's is the outage/generator story.
const review = (id: string) => reviews.find((r) => r.id === id);
const PROOF = ['yeny-v', 'tonya-n', 'zno-z'].map(review).filter(Boolean) as NonNullable<ReturnType<typeof review>>[];
const excerpt = (q: string, n = 170) => (q.length <= n ? q : `${q.slice(0, q.lastIndexOf(' ', n))}…`);

// Next 10 working days (Mon–Sat), starting tomorrow, Houston time.
function nextDays(): { ymd: string; dow: string; mon: string; dom: string }[] {
  const out: { ymd: string; dow: string; mon: string; dom: string }[] = [];
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  for (let i = 1; out.length < 10 && i < 20; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    if (d.getDay() === 0) continue;
    out.push({
      ymd: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      dow: d.toLocaleDateString('en-US', { weekday: 'short' }),
      mon: d.toLocaleDateString('en-US', { month: 'short' }),
      dom: String(d.getDate()),
    });
  }
  return out;
}

function Logo() {
  // The logo file has wide transparent margins; crop them in a fixed-height box.
  return (
    <div className="flex h-11 items-center overflow-hidden">
      <Image src="/logo/logo_horzontial.PNG" alt="Solivance Electric LLC" width={6144} height={4096} priority className="h-[96px] w-auto max-w-none" sizes="150px" />
    </div>
  );
}

function TrustRow({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem] ${dark ? 'text-white/75' : 'justify-center text-[#4A5A6C]'}`}>
      <span className="flex items-center gap-1.5"><GoogleG className="h-4 w-4" /> {siteConfig.rating.toFixed(1)} Google rating</span>
      <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#1F7A4D]" /> Licensed {siteConfig.license.label}</span>
      <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#1F7A4D]" /> Briggs &amp; Stratton dealer</span>
    </div>
  );
}

/**
 * variant 'lp'   — paid landing page: own header, leave prompt, no site menu.
 * variant 'site' — public, indexable calculator inside the normal site (header/footer from the layout).
 * Both accept ?goal=whole|essentials&ac=0|1|2|3+|unsure to skip answered questions (blog sizer links).
 */
export function SizingFlow({
  variant = 'lp',
  onExit,
  initial,
  scrollEl,
}: {
  variant?: 'lp' | 'site';
  /** Pop-out mode: "Leave anyway" closes the overlay instead of leaving the page. */
  onExit?: () => void;
  /** Answers handed in by whatever opened the pop-out (overrides the URL). */
  initial?: { goal?: string; ac?: string };
  /** Pop-out mode: the overlay's scroll container (window is locked behind it). */
  scrollEl?: () => HTMLElement | null;
} = {}) {
  const isLp = variant === 'lp';
  const [view, setView] = useState<View>('goal');
  const [goal, setGoal] = useState<Goal>();
  const [ac, setAc] = useState<AcCount>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [sms, setSms] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ServerResult>();
  const [homeSize, setHomeSize] = useState<HomeSize>();
  const [loads, setLoads] = useState<BigLoad[]>([]);
  const [noLoads, setNoLoads] = useState(false);
  const [fuel, setFuel] = useState<Fuel>();
  const [timeline, setTimeline] = useState<string>();
  const [day, setDay] = useState<string>();
  const [timeWindow, setTimeWindow] = useState<string>();
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookSaved, setBookSaved] = useState(true);
  const [exitPrompt, setExitPrompt] = useState(false);
  const [days, setDays] = useState<ReturnType<typeof nextDays>>([]);
  // In-funnel browsing: a generator's detail screen, or the full list. Never leaves the page.
  const [panel, setPanel] = useState<{ kind: 'detail'; id: string } | { kind: 'all' } | null>(null);
  const [viewed, setViewed] = useState<string[]>([]);
  const [interest, setInterest] = useState<string>();

  const submissionId = useRef('');
  const openedAt = useRef(0);
  const leadDone = useRef(false);
  const exitShown = useRef(false);
  const scheduleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    submissionId.current = newSubmissionId();
    // Answers carried in from a blog sizer box or a link: skip straight to the next step.
    const q = new URLSearchParams(window.location.search);
    const g = GOALS.find((x) => x.id === (initial?.goal ?? q.get('goal')))?.id;
    const c = AC_COUNTS.find((x) => x.id === (initial?.ac ?? q.get('ac')))?.id;
    if (g) {
      setGoal(g);
      setView(c ? 'contact' : 'ac');
      if (c) setAc(c);
    }
    openedAt.current = Date.now();
    captureAttribution();
    setDays(nextDays());
    pushDataLayer({ event: 'generator_sizing_view' });
  }, []);

  useEffect(() => {
    if (!isLp) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 0 || exitShown.current || leadDone.current) return;
      exitShown.current = true;
      setExitPrompt(true);
    };
    document.addEventListener('mouseleave', onLeave);
    return () => document.removeEventListener('mouseleave', onLeave);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    scrollEl?.()?.scrollTo({ top: 0 });
  }, [view, panel]);

  const answers = (): EstimatorAnswers => ({ goal: goal!, ac: ac!, homeSize, loads: noLoads ? [] : loads.length ? loads : undefined, fuel, timeline });

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (sending || leadDone.current) return;
    setError('');
    setSending(true);
    const body = {
      step: 'lead',
      submissionId: submissionId.current,
      answers: answers(),
      name,
      phone,
      zipCode: zip,
      smsConsent: sms,
      company_url: honeypot,
      _ts: String(openedAt.current),
      page: window.location.href.split('?')[0],
      testKey: new URLSearchParams(window.location.search).get('test') || undefined,
      ...readAttribution(),
    };
    try {
      for (let attempt = 0; attempt < 4; attempt++) {
        const res = await fetch('/api/generator-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        const json = (await res.json().catch(() => ({}))) as { ok?: boolean; retry?: boolean; error?: string; conversionEligible?: boolean; result?: ServerResult };
        if (json.retry) {
          await new Promise((r) => setTimeout(r, 1500));
          continue;
        }
        if (!json.ok || !json.result) {
          setError(json.error || `Something went wrong. Please call ${siteConfig.phone}.`);
          return;
        }
        leadDone.current = true;
        setResult(json.result);
        setView('result');
        if (json.conversionEligible) pushDataLayer({ event: 'generator_lead_success', transaction_id: submissionId.current, lead_tier: json.result.tier });
        return;
      }
      setError(`That's taking too long. Please call ${siteConfig.phone}.`);
    } catch {
      setError(`Couldn't connect. Please call ${siteConfig.phone}.`);
    } finally {
      setSending(false);
    }
  }

  async function requestSiteWalk() {
    if (booking || !day) return;
    setBooking(true);
    try {
      const res = await fetch('/api/generator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 'details', submissionId: submissionId.current, answers: answers(), preferredDay: day, timeWindow, interest, viewed }),
      });
      const json = (await res.json().catch(() => ({}))) as { result?: ServerResult; siteWalk?: boolean; saved?: boolean };
      if (json.result) setResult(json.result);
      // If the day didn't reach our CRM, don't pretend it did: ask them to call.
      setBookSaved(!!json.siteWalk);
      setBooked(true);
      if (json.siteWalk) pushDataLayer({ event: 'generator_sitewalk_request', transaction_id: submissionId.current });
    } catch {
      setBookSaved(false);
      setBooked(true);
    } finally {
      setBooking(false);
    }
  }

  const toSchedule = () => scheduleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const openModel = (id: string) => {
    setPanel({ kind: 'detail', id });
    setViewed((v) => (v.includes(id) ? v : [...v, id]));
    pushDataLayer({ event: 'generator_model_view', model: id });
  };
  const openAll = () => {
    setPanel({ kind: 'all' });
    pushDataLayer({ event: 'generator_all_models_view' });
  };
  // Every "book" button: remember what they liked, go back to results, land on the booking card.
  const bookFor = (id?: string) => {
    if (id) setInterest(id);
    setPanel(null);
    setTimeout(toSchedule, 60);
  };
  const toggleLoad = (id: BigLoad) => {
    setNoLoads(false);
    setLoads((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  const live = goal && ac ? estimate(answers()) : undefined;
  const range = live && result ? live.range : result?.range;
  const modelIds = live && result ? live.models.map((m) => m.model) : result?.modelIds || [];
  const models = modelIds.map((id) => products.find((p) => p.model === id)).filter(Boolean) as typeof products;
  const pickId = live && result ? live.topPick?.model : result?.topPickId;
  const pick = byId(pickId);
  const stepNo = view === 'goal' ? 1 : view === 'ac' ? 2 : 3;
  const picked = days.find((d) => d.ymd === day);
  const dayLabel = picked ? `${picked.dow}, ${picked.mon} ${picked.dom}` : '';
  const first = name.trim().split(/\s+/)[0];
  // "18–26 kW on natural gas" -> big "18–26 kW" + small "on natural gas"
  const m = (range || '').match(/^(.*?kW)(.*)$/);
  const rangeNum = m ? m[1] : range;
  const rangeRest = m ? m[2].trim() : '';

  const quizCard = (
            <div className="rounded-3xl bg-white p-4 text-[#0A1322] min-[400px]:p-5 shadow-[0_20px_50px_-20px_rgba(10,19,34,0.35)] sm:p-8 lg:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]">
              {view === 'goal' && (
                <>
                  <h2 className="text-[1.2rem] font-semibold leading-snug sm:text-[1.35rem]">What do you want running when the power goes out?</h2>
                  <div className="mt-4 grid gap-3">
                    {GOALS.map((g) => {
                      const Icon = GOAL_ICON[g.id];
                      return (
                        <button key={g.id} type="button" className={option} onClick={() => { setGoal(g.id); setView('ac'); pushDataLayer({ event: 'generator_sizing_start' }); }}>
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF1E8] text-[#C2410C] sm:h-11 sm:w-11"><Icon className="h-5 w-5" /></span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[1.02rem] font-semibold">{g.label}</span>
                            <span className="block text-[0.88rem] text-[#5A6B7F]">{g.hint}</span>
                          </span>
                          <ArrowRight className="h-5 w-5 shrink-0 text-[#9AA5B1] transition-transform group-hover:translate-x-0.5 group-hover:text-[#E8590C]" />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {view === 'ac' && (
                <>
                  <h2 className="text-[1.2rem] font-semibold leading-snug sm:text-[1.35rem]">How many AC units does your home have?</h2>
                  <p className="mt-1 text-[0.92rem] text-[#5A6B7F]">Count the big boxes outside. AC is the biggest thing a generator runs.</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {AC_COUNTS.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        className={`${option} min-h-16 justify-center text-center text-[1.05rem] font-semibold ${a.id === 'unsure' ? 'col-span-2' : ''}`}
                        onClick={() => { setAc(a.id); setView('contact'); }}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {view === 'contact' && (
                <form onSubmit={submitLead} noValidate>
                  {/* Blurred teaser: the answer is right there. */}
                  <div className="flex items-center gap-3 rounded-2xl border border-[#E3E6EA] bg-[#F8FAFB] p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F3EC] text-[#1F7A4D]"><Check className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.8rem] font-medium text-[#5A6B7F]">Your size</p>
                      <p className="select-none text-[1.4rem] font-bold tracking-tight blur-[7px]" aria-hidden>{live?.range.match(/^.*?kW/)?.[0] ?? '18–26 kW'}</p>
                    </div>
                    <Lock className="h-5 w-5 shrink-0 text-[#9AA5B1]" aria-hidden />
                  </div>

                  <div className="mt-5 grid gap-4">
                    <div>
                      <label htmlFor="gs-name" className={label}>First name</label>
                      <input id="gs-name" className={field} autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="gs-phone" className={label}>Mobile phone</label>
                      <input id="gs-phone" className={field} type="tel" inputMode="tel" autoComplete="tel" placeholder="(713) 555-0123" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="gs-zip" className={label}>ZIP code <span className="font-normal text-[#5A6B7F]">(so we know we can come to you)</span></label>
                      <input id="gs-zip" className={field} inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="77096" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))} />
                    </div>
                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                    {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-[0.92rem] text-red-700" role="alert">{error}</p>}

                    <button type="submit" disabled={sending} className={cta}>
                      {sending ? 'One moment…' : <>Show my generator size <ArrowRight className="h-5 w-5" /></>}
                    </button>

                    <p className="flex items-start justify-center gap-1.5 text-center text-[0.82rem] leading-snug text-[#5A6B7F]">
                      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                      We only use this to send your size and set up your free visit.
                    </p>

                    <label className="flex items-start gap-2.5 rounded-xl bg-[#F8FAFB] p-3 text-[0.72rem] leading-snug text-[#5A6B7F]">
                      <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#0A1322]" />
                      <span>
                        Optional: text me about my request. I agree to receive texts from Solivance Electric LLC about my quote and appointment. Msg frequency varies. Msg &amp; data rates
                        may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of service. See{' '}
                        <a href="/privacy" target="_blank" rel="noopener" className="underline">Privacy</a>.
                      </span>
                    </label>
                  </div>

                  {/* Who's on the other end. */}
                  <div className="mt-5 flex items-center gap-3 border-t border-[#EEF0F3] pt-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A1322] text-white"><ShieldCheck className="h-5 w-5" aria-hidden /></span>
                    <p className="text-[0.88rem] leading-snug text-[#4A5A6C]">
                      <b className="text-[#0A1322]">Real electricians check every answer.</b> We’ll call or text to find your exact size.
                    </p>
                  </div>
                </form>
              )}
            </div>
  );

  return (
    <div className={`${isLp ? 'min-h-[100dvh]' : ''} overflow-x-clip bg-[#F5F6F8] text-[#0A1322]`}>
      {isLp && (
      <header className="sticky top-0 z-40 border-b border-[#E6E8EC] bg-white">
        <div className={`${shell} flex h-16 items-center justify-between`}>
          <Logo />
          <div className="flex items-center gap-1">
            <a href={`tel:${siteConfig.cleanPhone}`} className="flex h-10 items-center gap-2 rounded-lg px-3 text-[0.92rem] font-semibold hover:bg-[#F5F6F8]">
              <Phone className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">{siteConfig.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
            <button type="button" onClick={() => setExitPrompt(true)} aria-label="Leave" className="flex h-10 w-10 items-center justify-center rounded-lg text-[#5A6B7F] hover:bg-[#F5F6F8]">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      )}

      {view !== 'result' && (
        <>
          {/* Dark band carries the headline; the question card overlaps it. */}
          <section className="bg-[#0A1322] pb-24 pt-6 text-white sm:pb-28 sm:pt-10 lg:pb-20 lg:pt-14">
            <div className={`${shell} lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-center lg:gap-16`}>
            <div className="mx-auto max-w-[592px] lg:mx-0 lg:max-w-none">
              <div className="flex h-9 items-center justify-between gap-4">
                {view === 'goal' ? (
                  <span className="flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#FDBA74]">
                    <Zap className="h-3.5 w-3.5" /> Free · 20 seconds
                  </span>
                ) : (
                  <button type="button" onClick={() => setView(view === 'ac' ? 'goal' : 'ac')} className="-ml-1 flex h-9 items-center gap-1 rounded-lg px-1 text-[0.9rem] font-medium text-white/80 hover:text-white">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                )}
                <span className="text-[0.8rem] font-medium text-white/60">Step {stepNo} of 3</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15" aria-hidden>
                <div className="h-full rounded-full bg-[#E8590C] transition-all duration-300" style={{ width: `${(stepNo / 3) * 100}%` }} />
              </div>
              <h1 className="mt-6 text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[2.3rem] lg:mt-10 lg:text-[3rem] lg:leading-[1.05]">
                {view === 'contact' ? 'Your generator size is ready.' : isLp ? 'What size generator does your home need?' : 'What size generator does your Houston home need?'}
              </h1>
              <p className="mt-2.5 text-[1rem] leading-relaxed text-white/75 lg:mt-4 lg:text-[1.15rem]">
                {view === 'contact' ? 'Tell us where to send it. You’ll see it on the next screen.' : 'Answer 2 quick questions. See which generators fit your home.'}
              </p>

              {/* Desktop only: reasons + proof beside the card. */}
              <ul className="mt-8 hidden gap-3 lg:grid">
                {['Free, and it takes 20 seconds', 'See the generators that fit your home, with prices', 'Real electricians check every answer'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[1rem] text-white/85">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8590C]/20 text-[#FDBA74]"><Check className="h-3.5 w-3.5" /></span>
                    {t}
                  </li>
                ))}
              </ul>
              {PROOF[0] && (
                <figure className="mt-8 hidden max-w-[480px] rounded-2xl border border-white/10 bg-white/5 p-5 lg:block">
                  <div className="flex items-center gap-2"><Stars className="h-3.5 w-3.5" /><GoogleG className="h-4 w-4" /></div>
                  <blockquote className="mt-2 text-[0.95rem] leading-relaxed text-white/85">“{excerpt(PROOF[0].quote, 190)}”</blockquote>
                  <figcaption className="mt-2 text-[0.85rem] font-semibold text-white">{PROOF[0].author}, Google review</figcaption>
                </figure>
              )}
              <div className="mt-6 hidden lg:block"><TrustRow dark /></div>
            </div>
            <div className="hidden lg:block">{quizCard}</div>
            </div>
          </section>

          <main className={`${wrap} -mt-16 pb-16 sm:-mt-20 lg:hidden`}>
            {quizCard}

            <div className="mt-6"><TrustRow /></div>

            {view === 'contact' && PROOF[0] && (
              <figure className="mt-6 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
                <div className="flex items-center gap-2"><Stars className="h-3.5 w-3.5" /><GoogleG className="h-4 w-4" /></div>
                <blockquote className="mt-2 text-[0.92rem] leading-relaxed text-[#334155]">“{excerpt(PROOF[0].quote, 190)}”</blockquote>
                <figcaption className="mt-2 text-[0.82rem] font-semibold">{PROOF[0].author}, Google review</figcaption>
              </figure>
            )}
          </main>
        </>
      )}

      {view === 'result' && result && panel && (
        <main className={`${page} pb-32 pt-6 sm:pb-16 lg:pt-8`}>
          {panel.kind === 'detail' && byId(panel.id) ? (
            <ModelDetail
              p={byId(panel.id)!}
              isPick={panel.id === pickId}
              inRange={modelIds.includes(panel.id)}
              pickId={pickId}
              rangeIds={modelIds}
              viewed={viewed.length}
              first={first}
              onBack={() => setPanel(null)}
              onBook={bookFor}
              onAll={openAll}
              onOpen={openModel}
            />
          ) : (
            <AllModels pickId={pickId} rangeIds={modelIds} viewed={viewed.length} first={first} onBack={() => setPanel(null)} onOpen={openModel} onBook={() => bookFor()} />
          )}
        </main>
      )}

      {view === 'result' && result && !panel && (
        <>
          {/* 1. The answer */}
          <section className="bg-[#0A1322] pb-10 pt-8 text-white sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14">
            <div className={`${page} lg:max-w-[1160px]`}>
            <div className="lg:max-w-[640px]">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#FDBA74]">{first ? `${first}, here’s your size` : 'Here’s your size'}</p>
              <p className="mt-3 text-[3rem] font-bold leading-none tracking-[-0.03em] sm:text-[4rem]">{rangeNum}</p>
              {rangeRest && <p className="mt-1.5 text-[1rem] font-medium text-white/75">{rangeRest}</p>}
              <p className="mt-4 text-[1rem] leading-relaxed text-white/75">{result.explanation}</p>
              <button type="button" onClick={toSchedule} className={`${cta} mt-6 lg:w-auto lg:px-10`}>
                <CalendarCheck className="h-5 w-5" /> Book my free visit
              </button>
              <p className="mt-3 text-center text-[0.82rem] text-white/60 lg:text-left">We come out for free, find the exact size, and give you one set price.</p>
            </div>
            </div>
          </section>

          <main className={`${page} grid grid-cols-[minmax(0,1fr)] gap-8 pb-32 pt-8 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-x-10 lg:pt-10`}>
            {/* 2. The prize: our pick, then the rest. Every card opens a screen inside the funnel. */}
            <PickCards pick={pick} others={models.filter((x) => x.model !== pickId)} onOpen={openModel} onAll={openAll} />

            {/* 3. The one action */}
            <section ref={scheduleRef} id="schedule" className="scroll-mt-20 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-6 lg:row-start-1 lg:self-start rounded-3xl bg-white p-5 shadow-[0_20px_50px_-24px_rgba(10,19,34,0.35)] ring-2 ring-[#0A1322] sm:p-7">
              {booked ? (
                <div className="py-2 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F3EC] text-[#1F7A4D]"><CalendarCheck className="h-7 w-7" /></span>
                  <h2 className="mt-3 text-[1.4rem] font-bold">{bookSaved ? `Got it! You picked ${dayLabel || 'a day'}.` : 'Almost done!'}</h2>
                  <p className="mt-1.5 text-[0.98rem] text-[#4A5A6C]">
                    {bookSaved ? 'We’ll call or text to set the time. Need us sooner?' : `Please call us to lock in ${dayLabel || 'your day'}. It takes 1 minute.`}
                  </p>
                  <a href={`tel:${siteConfig.cleanPhone}`} className={`${cta} mt-5`}><Phone className="h-5 w-5" /> Call {siteConfig.phone}</a>
                </div>
              ) : (
                <>
                  <p className={eyebrow}>Next step</p>
                  <h2 className="mt-1.5 text-[1.45rem] font-bold leading-tight">Book your free visit</h2>
                  <p className="mt-1 text-[0.95rem] text-[#4A5A6C]">Pick a day. We’ll call or text to set the time.</p>
                  {interest && byId(interest) && (
                    <p className="mt-3 rounded-xl bg-[#E8F3EC] px-3.5 py-2.5 text-[0.9rem] text-[#1F5132]">
                      <Check className="mr-1 inline h-4 w-4" /> We’ll check if the <b>{byId(interest)!.name}</b> fits your home.
                    </p>
                  )}

                  <div className="mt-5 grid grid-cols-5 gap-1.5 sm:gap-2">
                    {days.map((d) => {
                      const on = day === d.ymd;
                      return (
                        <button
                          key={d.ymd}
                          type="button"
                          onClick={() => setDay(d.ymd)}
                          className={`flex h-[68px] min-w-0 flex-col items-center justify-center rounded-xl border text-center transition-colors ${
                            on ? 'border-[#0A1322] bg-[#0A1322] text-white' : 'border-[#DDE1E6] bg-white hover:border-[#9AA5B1]'
                          }`}
                        >
                          <span className={`text-[0.7rem] font-medium uppercase ${on ? 'text-white/70' : 'text-[#5A6B7F]'}`}>{d.dow}</span>
                          <span className="text-[1.15rem] font-bold leading-tight">{d.dom}</span>
                          <span className={`text-[0.68rem] ${on ? 'text-white/70' : 'text-[#9AA5B1]'}`}>{d.mon}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {WINDOWS.map((w) => {
                      const [lbl, hrs] = windowParts(w);
                      const on = timeWindow === w;
                      return (
                        <button key={w} type="button" onClick={() => setTimeWindow(w)} className={`${chip(on)} flex flex-col items-center py-2.5 leading-tight`}>
                          <span className="font-semibold">{lbl}</span>
                          <span className={`text-[0.78rem] ${on ? 'text-white/70' : 'text-[#5A6B7F]'}`}>{hrs}</span>
                        </button>
                      );
                    })}
                  </div>

                  <details className="group mt-4 rounded-2xl border border-[#E3E6EA] p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-[0.95rem] font-semibold">
                      Optional: tell us a little more
                      <ArrowRight className="h-4 w-4 rotate-90 text-[#9AA5B1] transition-transform group-open:-rotate-90" />
                    </summary>
                    <div className="mt-4 grid gap-4">
                      <div>
                        <p className="mb-2 text-[0.85rem] font-semibold text-[#4A5A6C]">Home size</p>
                        <div className="flex flex-wrap gap-2">{HOME_SIZES.map((h) => <button key={h.id} type="button" className={chip(homeSize === h.id)} onClick={() => setHomeSize(h.id)}>{h.label}</button>)}</div>
                      </div>
                      <div>
                        <p className="mb-2 text-[0.85rem] font-semibold text-[#4A5A6C]">Any of these? Pick all that apply</p>
                        <div className="flex flex-wrap gap-2">
                          {BIG_LOADS.map((l) => <button key={l.id} type="button" className={chip(loads.includes(l.id))} onClick={() => toggleLoad(l.id)}>{l.label}</button>)}
                          <button type="button" className={chip(noLoads)} onClick={() => { setNoLoads(!noLoads); setLoads([]); }}>None of these</button>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-[0.85rem] font-semibold text-[#4A5A6C]">What gas do you have?</p>
                        <div className="flex flex-wrap gap-2">{FUELS.map((f) => <button key={f.id} type="button" className={chip(fuel === f.id)} onClick={() => setFuel(f.id)}>{f.label}</button>)}</div>
                      </div>
                      <div>
                        <p className="mb-2 text-[0.85rem] font-semibold text-[#4A5A6C]">When do you want it?</p>
                        <div className="flex flex-wrap gap-2">{TIMELINES.map((t) => <button key={t} type="button" className={chip(timeline === t)} onClick={() => setTimeline(t)}>{t}</button>)}</div>
                      </div>
                      {live && <p className="rounded-xl bg-[#F5F6F8] px-3 py-2 text-[0.88rem]">Your new size: <b>{live.range}</b></p>}
                    </div>
                  </details>

                  <button type="button" disabled={!day || booking} onClick={requestSiteWalk} className={`${cta} mt-5`}>
                    {booking ? 'One moment…' : day ? <><CalendarCheck className="h-5 w-5" /> Book my free visit{dayLabel ? `: ${dayLabel}` : ''}</> : 'Pick a day above'}
                  </button>
                  <p className="mt-2.5 text-center text-[0.8rem] text-[#5A6B7F]">Free · No cost · Licensed {siteConfig.license.label}</p>
                </>
              )}
            </section>

            {/* 4. Proof */}
            <section>
              <div className="flex items-center gap-3">
                <GoogleG className="h-7 w-7" />
                <span className="text-[1.6rem] font-bold leading-none">{siteConfig.rating.toFixed(1)}</span>
                <div><Stars className="h-4 w-4" /><p className="mt-0.5 text-[0.8rem] text-[#5A6B7F]">Google reviews from Houston homeowners</p></div>
              </div>
              <div className="mt-4 grid gap-3">
                {PROOF.map((r) => (
                  <figure key={r.id} className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
                    <Stars className="h-3.5 w-3.5" />
                    <blockquote className="mt-2 text-[0.94rem] leading-relaxed text-[#334155]">“{excerpt(r.quote)}”</blockquote>
                    <figcaption className="mt-2 text-[0.82rem] font-semibold">{r.author}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, t: 'Texas licensed', d: siteConfig.license.label },
                { icon: FileCheck2, t: 'Permitted', d: 'City-inspected installs' },
                { icon: BadgeCheck, t: 'B&S dealer', d: 'Up to 7-yr warranty' },
                { icon: Zap, t: 'Financing', d: 'Through Synchrony*' },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(10,19,34,0.06)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F3EC] text-[#1F7A4D]"><Icon className="h-[18px] w-[18px]" /></span>
                  <p className="mt-2.5 text-[0.95rem] font-semibold leading-tight">{t}</p>
                  <p className="mt-0.5 text-[0.8rem] text-[#5A6B7F]">{d}</p>
                </div>
              ))}
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(10,19,34,0.06)] sm:p-7">
              <p className={eyebrow}>How the free visit works</p>
              <ol className="mt-4 grid gap-4">
                {[
                  { t: 'We check your home', d: 'Your panel, AC, big appliances, and gas.' },
                  { t: 'You get the right size', d: 'The one that runs what you want. You don’t pay for more than you need.' },
                  { t: 'You get one set price', d: 'Generator, switch, permit, and start-up. All in one price, in writing.' },
                ].map(({ t, d }, i) => (
                  <li key={t} className="flex gap-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A1322] text-[0.85rem] font-bold text-white">{i + 1}</span>
                    <span><span className="block text-[0.98rem] font-semibold">{t}</span><span className="text-[0.9rem] text-[#5A6B7F]">{d}</span></span>
                  </li>
                ))}
              </ol>
              {!booked && (
                <button type="button" onClick={toSchedule} className={`${cta} mt-6`}><CalendarCheck className="h-5 w-5" /> Book my free visit</button>
              )}
            </section>

            <p className="text-center text-[0.75rem] leading-snug text-[#5A6B7F]">*Financing through Synchrony, subject to credit approval. Prices are Briggs &amp; Stratton MAP, equipment only.</p>
          </main>
        </>
      )}

      {/* Sticky book bar on phones: on the results AND inside every generator screen. */}
      {view === 'result' && result && !booked && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E6E8EC] bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
          <div className="flex gap-2">
            <a href={`tel:${siteConfig.cleanPhone}`} aria-label={`Call ${siteConfig.phone}`} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#CDD3DA]">
              <Phone className="h-5 w-5" />
            </a>
            <button type="button" onClick={() => bookFor(panel?.kind === 'detail' ? panel.id : undefined)} className={cta}>
              <CalendarCheck className="h-5 w-5" /> Book my free visit
            </button>
          </div>
        </div>
      )}

      {exitPrompt && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0A1322]/60 sm:items-center sm:p-4" onClick={() => setExitPrompt(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="exit-title" onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-t-3xl bg-white p-6 pb-8 sm:rounded-3xl">
            <h2 id="exit-title" className="text-[1.3rem] font-bold leading-tight">
              {leadDone.current ? (booked ? 'You’re all set.' : 'Leave without your free visit?') : 'Your size is almost ready.'}
            </h2>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-[#4A5A6C]">
              {leadDone.current
                ? booked
                  ? 'We’ll call or text to set your time.'
                  : 'It’s free. It’s the only way to know the right size before you spend thousands.'
                : 'You’re one step away. It’s free.'}
            </p>
            <div className="mt-6 grid gap-2">
              {!booked && (
                <button type="button" onClick={() => { setExitPrompt(false); if (leadDone.current) toSchedule(); }} className={cta}>
                  {leadDone.current ? 'Book my free visit' : 'See my size'}
                </button>
              )}
              {onExit ? (
                <button type="button" onClick={() => { setExitPrompt(false); onExit(); }} className="py-3 text-center text-[0.92rem] font-medium text-[#5A6B7F] underline underline-offset-2">
                  {booked ? 'Close' : 'Leave anyway'}
                </button>
              ) : (
                <a href="/generators" className="py-3 text-center text-[0.92rem] font-medium text-[#5A6B7F] underline underline-offset-2">
                  {booked ? 'Back to generators' : 'Leave anyway'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
