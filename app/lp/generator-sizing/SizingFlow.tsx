'use client';

// Generator sizing lead magnet: /lp/generator-sizing (no site nav, one job).
//   1. What do you want running?   2. How many AC units?
//   3. "Your size is ready. Where should we send it?"  -> lead created, Josh alerted
//   4. Result: size range + matching models, then everything funnels to ONE action:
//      request the free site walk (day + time window, plus optional details).
// Leaving: the X asks first; on desktop, moving to leave before the lead is in shows
// one gentle "wait" prompt. The browser Back button is never hijacked.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CalendarCheck, Check, ClipboardCheck, FileCheck2, Phone, ShieldCheck, Wrench, X, Zap } from 'lucide-react';
import { siteConfig } from '../../config';
import { reviews } from '../../reviews';
import { products, formatUsd } from '../../generators/products';
import { ProductImage } from '../../generators/ProductImage';
import { BrandLogo } from '../../components/BrandLogo';
import { SynchronyLogo } from '../../components/FinancingBanner';
import { brands } from '../../lib/brands';
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
type ServerResult = { tier: string; range: string; headline: string; explanation: string; modelIds: string[]; checkOnSite: string[] };

const card =
  'flex w-full items-center justify-between gap-3 rounded-xl border-2 border-[#E3E6EA] bg-white px-5 py-4 text-left text-[1.05rem] font-semibold text-[#0A1322] transition-colors hover:border-[#E8590C] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#0A1322]';
const chip = (on: boolean) =>
  `rounded-full border-2 px-3.5 py-2 text-[0.9rem] font-semibold transition-colors ${on ? 'border-[#0A1322] bg-[#0A1322] text-white' : 'border-[#E3E6EA] bg-white text-[#0A1322] hover:border-slate-400'}`;
const input = 'h-13 w-full rounded-lg border-2 border-[#E3E6EA] px-4 py-3 text-[1rem] text-[#0A1322] outline-none focus:border-[#0A1322]';
const ctaBtn = 'inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E8590C] px-6 py-4 text-[1.05rem] font-bold text-white transition-colors hover:bg-[#CF4E0A] disabled:opacity-60';
const WINDOWS = ['Morning (8am–12pm)', 'Afternoon (12pm–5pm)'] as const;

// Proof: real reviews only. Yeny's is the generator/outage story.
const review = (id: string) => reviews.find((r) => r.id === id);
const PROOF_REVIEWS = ['yeny-v', 'tonya-n', 'zno-z'].map(review).filter(Boolean) as NonNullable<ReturnType<typeof review>>[];

// Next 10 working days (Mon–Sat), starting tomorrow, as YYYY-MM-DD in Houston time.
function nextDays(): { ymd: string; label: string }[] {
  const out: { ymd: string; label: string }[] = [];
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  for (let i = 1; out.length < 10 && i < 20; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    if (d.getDay() === 0) continue;
    const ymd = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    out.push({ ymd, label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) });
  }
  return out;
}

export function SizingFlow() {
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
  const [exitPrompt, setExitPrompt] = useState(false);
  const [days, setDays] = useState<{ ymd: string; label: string }[]>([]);

  const submissionId = useRef('');
  const openedAt = useRef(0);
  const leadDone = useRef(false);
  const exitShown = useRef(false);
  const scheduleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    submissionId.current = newSubmissionId();
    openedAt.current = Date.now();
    captureAttribution();
    setDays(nextDays());
    pushDataLayer({ event: 'generator_sizing_view' });
  }, []);

  // Desktop exit intent: once, only before the lead is in.
  useEffect(() => {
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
  }, [view]);

  const answers = (): EstimatorAnswers => ({ goal: goal!, ac: ac!, homeSize, loads: noLoads ? [] : loads.length ? loads : undefined, fuel, timeline });
  const testKey = () => new URLSearchParams(window.location.search).get('test') || undefined;

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
      testKey: testKey(),
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
        // One conversion per accepted submission (server decides; repeats and tests never count).
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
        body: JSON.stringify({ step: 'details', submissionId: submissionId.current, answers: answers(), preferredDay: day, timeWindow }),
      });
      const json = (await res.json().catch(() => ({}))) as { result?: ServerResult; siteWalk?: boolean };
      if (json.result) setResult(json.result);
      setBooked(true);
      if (json.siteWalk) pushDataLayer({ event: 'generator_sitewalk_request', transaction_id: submissionId.current });
    } finally {
      setBooking(false);
    }
  }

  const toSchedule = () => scheduleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const toggleLoad = (id: BigLoad) => {
    setNoLoads(false);
    setLoads((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  // Live refined range while they tap; the server's answer replaces it on submit.
  const live = goal && ac ? estimate(answers()) : undefined;
  const range = live && result ? live.range : result?.range;
  const modelIds = live && result ? live.models.map((m) => m.model) : result?.modelIds || [];
  const models = modelIds.map((id) => products.find((p) => p.model === id)).filter(Boolean) as typeof products;
  const stepNo = view === 'goal' ? 1 : view === 'ac' ? 2 : 3;
  const dayLabel = days.find((d) => d.ymd === day)?.label;

  return (
    <div className="min-h-[100dvh] bg-[#F4F6F9] text-[#0A1322]">
      {/* Top bar: logo, phone, and the only way out (X asks first). */}
      <header className="sticky top-0 z-40 border-b border-[#E3E6EA] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4">
          <span className="relative h-9 w-[120px] overflow-hidden">
            <Image src="/logo/logo_horzontial.PNG" alt="Solivance Electric LLC" width={6144} height={4096} priority className="absolute left-1/2 top-1/2 h-[80px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2" sizes="130px" />
          </span>
          <div className="flex items-center gap-1">
            <a href={`tel:${siteConfig.cleanPhone}`} className="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[0.9rem] font-semibold">
              <Phone className="h-4 w-4" /> <span className="hidden sm:inline">{siteConfig.phone}</span><span className="sm:hidden">Call</span>
            </a>
            <button type="button" onClick={() => setExitPrompt(true)} aria-label="Leave" className="rounded-md p-2 text-slate-500 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-28 pt-6 sm:pt-10">
        {view !== 'result' && (
          <div className="mx-auto max-w-lg">
            <div className="mb-5 flex items-center justify-between">
              {view === 'goal' ? (
                <span className="flex items-center gap-1.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#B23F07]">
                  <Zap className="h-4 w-4" /> Free 20-second generator sizing
                </span>
              ) : (
                <button type="button" onClick={() => setView(view === 'ac' ? 'goal' : 'ac')} className="flex items-center gap-1 text-[0.9rem] font-semibold text-slate-600">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
              <div className="flex gap-1.5" aria-label={`Step ${stepNo} of 3`}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={`h-1.5 w-8 rounded-full ${n <= stepNo ? 'bg-[#E8590C]' : 'bg-slate-300'}`} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_-15px_rgba(10,19,34,0.25)] sm:p-7">
              {view === 'goal' && (
                <>
                  <h1 className="text-[1.6rem] font-bold leading-tight tracking-[-0.02em] sm:text-[2rem]">What size generator does your home need?</h1>
                  <p className="mt-2 text-[1rem] text-slate-600">First: what do you want running when the power goes out?</p>
                  <div className="mt-5 grid gap-3">
                    {GOALS.map((g) => (
                      <button key={g.id} type="button" className={card} onClick={() => { setGoal(g.id); setView('ac'); pushDataLayer({ event: 'generator_sizing_start' }); }}>
                        <span>
                          {g.label}
                          <span className="block text-[0.88rem] font-normal text-slate-500">{g.hint}</span>
                        </span>
                        <ArrowRight className="h-5 w-5 shrink-0 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {view === 'ac' && (
                <>
                  <h1 className="text-[1.6rem] font-bold leading-tight tracking-[-0.02em] sm:text-[2rem]">How many AC units does your home have?</h1>
                  <p className="mt-2 text-[1rem] text-slate-600">Count the outdoor units. AC is the biggest factor in generator size.</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {AC_COUNTS.map((a) => (
                      <button key={a.id} type="button" className={`${card} justify-center ${a.id === 'unsure' ? 'col-span-2' : ''}`} onClick={() => { setAc(a.id); setView('contact'); }}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {view === 'contact' && (
                <form onSubmit={submitLead} noValidate>
                  <div className="flex items-center gap-2 text-[0.95rem] font-semibold text-[#1F7A4D]">
                    <Check className="h-5 w-5" /> Your generator size is ready
                  </div>
                  <h1 className="mt-2 text-[1.6rem] font-bold leading-tight tracking-[-0.02em] sm:text-[2rem]">Where should we send it?</h1>
                  <p className="mt-2 text-[1rem] text-slate-600">You&apos;ll see it on the next screen. Josh, a licensed electrician, confirms the exact size.</p>
                  <div className="mt-5 grid gap-3">
                    <input className={input} placeholder="First name" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className={input} placeholder="Mobile phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input className={input} placeholder="ZIP code" inputMode="numeric" autoComplete="postal-code" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))} />
                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                    <label className="flex items-start gap-2 text-[0.72rem] leading-snug text-slate-500">
                      <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="mt-0.5" />
                      <span>
                        Optional: text me about my request. I agree to receive texts from Solivance Electric LLC about my quote and appointment. Msg frequency varies. Msg &amp;
                        data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of service. See{' '}
                        <a href="/privacy" target="_blank" rel="noopener" className="underline">Privacy</a>.
                      </span>
                    </label>
                    {error && <p className="rounded-md bg-red-50 px-3 py-2 text-[0.9rem] text-red-700" role="alert">{error}</p>}
                    <button type="submit" disabled={sending} className={ctaBtn}>
                      {sending ? 'Sending…' : <>Show My Generator Size <ArrowRight className="h-5 w-5" /></>}
                    </button>
                    <p className="text-center text-[0.82rem] text-slate-500">Free · No obligation</p>
                  </div>
                </form>
              )}
            </div>

            {/* Quiet proof under the quiz. */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.85rem] text-slate-600">
              <span className="flex items-center gap-1.5"><GoogleG className="h-4 w-4" /> {siteConfig.rating.toFixed(1)} on Google</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#1F7A4D]" /> {siteConfig.license.label}</span>
              <span className="flex items-center gap-1.5"><BrandLogo src={brands.briggs.logo} name="Briggs & Stratton" className="h-4" fallbackClassName="text-[0.8rem]" /> Authorized dealer</span>
            </div>
          </div>
        )}

        {view === 'result' && result && (
          <div className="grid gap-5">
            {/* 1. The answer */}
            <section className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_-15px_rgba(10,19,34,0.25)] sm:p-7">
              <div className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#B23F07]">{name ? `${name.split(' ')[0]}, your` : 'Your'} preliminary size</div>
              <h1 className="mt-1.5 text-[1.9rem] font-bold leading-tight tracking-[-0.02em] sm:text-[2.4rem]">{range}</h1>
              <p className="mt-2 text-[1rem] leading-relaxed text-slate-600">{result.explanation}</p>
              <button type="button" onClick={toSchedule} className={`${ctaBtn} mt-5`}>
                <CalendarCheck className="h-5 w-5" /> Book My Free Site Walk
              </button>
              <p className="mt-2 text-center text-[0.8rem] text-slate-500">Josh confirms the exact size and gives you one fixed install price.</p>
            </section>

            {/* 2. Models that fit, every one funnels to the site walk */}
            <section>
              <h2 className="px-1 text-[1.15rem] font-bold">Generators in your range</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {models.map((m) => (
                  <div key={m.model} className="rounded-2xl bg-white p-4 shadow-[0_6px_20px_-12px_rgba(10,19,34,0.2)]">
                    <ProductImage src={m.image} alt={`Briggs & Stratton ${m.name}`} className="h-32 w-full" sizes="(min-width: 640px) 360px, 90vw" />
                    <div className="mt-3 flex items-baseline justify-between gap-2">
                      <span className="text-[1.02rem] font-bold">{m.name}</span>
                      <span className="text-[1.05rem] font-extrabold tabular-nums">{formatUsd(m.map)}</span>
                    </div>
                    <p className="text-[0.85rem] text-slate-600">{m.kw} (propane / natural gas) · {m.warrantyYears}-year warranty</p>
                    <p className="text-[0.75rem] text-slate-500">Unit price. Installation quoted after the site walk.</p>
                    <button type="button" onClick={toSchedule} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-[#0A1322] py-2.5 text-[0.92rem] font-bold hover:bg-[#0A1322] hover:text-white">
                      See if this fits my home <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-2 px-1 text-[0.75rem] leading-snug text-slate-500">
                Preliminary guidance, not a load calculation. A licensed electrician confirms the size on site before you buy.
              </p>
            </section>

            {/* 3. Proof */}
            <section className="rounded-2xl bg-white p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-2"><GoogleG className="h-7 w-7" /><span className="text-[1.6rem] font-bold">{siteConfig.rating.toFixed(1)}</span><Stars /></span>
                <span className="text-[0.9rem] text-slate-600">Google reviews · Houston homeowners</span>
              </div>
              <div className="mt-4 grid gap-3">
                {PROOF_REVIEWS.map((r) => (
                  <figure key={r.id} className="rounded-xl bg-[#F4F6F9] p-4">
                    <Stars className="h-3.5 w-3.5" />
                    <blockquote className="mt-2 text-[0.95rem] leading-relaxed text-slate-700">“{r.quote}”</blockquote>
                    <figcaption className="mt-2 text-[0.85rem] font-semibold">{r.author} · {r.source}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, t: 'Texas licensed', d: siteConfig.license.label },
                { icon: FileCheck2, t: 'Permitted + inspected', d: 'We pull the permit and pass the city inspection' },
                { icon: Wrench, t: 'Briggs & Stratton dealer', d: 'Up to 7-year manufacturer warranty on PowerProtect' },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-2xl bg-white p-4">
                  <Icon className="h-6 w-6 text-[#1F7A4D]" />
                  <p className="mt-2 text-[0.98rem] font-bold">{t}</p>
                  <p className="text-[0.85rem] text-slate-600">{d}</p>
                </div>
              ))}
            </section>

            <section className="flex flex-col gap-3 rounded-2xl bg-white p-5 sm:flex-row sm:items-center">
              <SynchronyLogo size="md" />
              <p className="text-[0.92rem] text-slate-700">
                <b>Financing available</b> through Synchrony on generator installs. Ask about monthly payments at your site walk. Subject to credit approval.
              </p>
            </section>

            <section className="rounded-2xl bg-white p-5 sm:p-7">
              <h2 className="text-[1.15rem] font-bold">What happens at your free site walk</h2>
              <ol className="mt-3 grid gap-3">
                {[
                  { icon: ClipboardCheck, t: 'Josh checks your home', d: 'Panel, AC units, large appliances, and gas meter or propane.' },
                  { icon: Zap, t: 'You get the exact size', d: 'No guessing: the generator that runs what you want, without paying for more than you need.' },
                  { icon: FileCheck2, t: 'One fixed install price', d: 'Generator, transfer switch, permit, and startup in one written quote.' },
                ].map(({ icon: Icon, t, d }, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF1E8] text-[0.95rem] font-bold text-[#B23F07]">{i + 1}</span>
                    <span><span className="flex items-center gap-1.5 font-bold"><Icon className="h-4 w-4" /> {t}</span><span className="text-[0.9rem] text-slate-600">{d}</span></span>
                  </li>
                ))}
              </ol>
            </section>

            {/* 4. The one action */}
            <section ref={scheduleRef} id="schedule" className="scroll-mt-20 rounded-2xl border-2 border-[#0A1322] bg-white p-5 sm:p-7">
              {booked ? (
                <div className="text-center">
                  <CalendarCheck className="mx-auto h-10 w-10 text-[#1F7A4D]" />
                  <h2 className="mt-2 text-[1.4rem] font-bold">Site walk requested{dayLabel ? ` for ${dayLabel}` : ''}</h2>
                  <p className="mt-1.5 text-[0.98rem] text-slate-600">Josh will reach out to confirm the time. Need it sooner? Call {siteConfig.phone}.</p>
                  <a href={`tel:${siteConfig.cleanPhone}`} className={`${ctaBtn} mt-4`}><Phone className="h-5 w-5" /> Call {siteConfig.phone}</a>
                </div>
              ) : (
                <>
                  <h2 className="text-[1.4rem] font-bold leading-tight">Book your free generator site walk</h2>
                  <p className="mt-1 text-[0.95rem] text-slate-600">Pick a day that works. Josh confirms the time with you.</p>

                  <div className="mt-4 text-[0.88rem] font-semibold text-slate-700">Day</div>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {days.map((d) => (
                      <button key={d.ymd} type="button" className={chip(day === d.ymd)} onClick={() => setDay(d.ymd)}>{d.label}</button>
                    ))}
                  </div>
                  <div className="mt-3 text-[0.88rem] font-semibold text-slate-700">Time</div>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {WINDOWS.map((w) => (
                      <button key={w} type="button" className={chip(timeWindow === w)} onClick={() => setTimeWindow(w)}>{w}</button>
                    ))}
                  </div>

                  <details className="mt-4 rounded-xl bg-[#F4F6F9] p-4">
                    <summary className="cursor-pointer text-[0.95rem] font-bold">Optional: help Josh come prepared</summary>
                    <div className="mt-3 text-[0.85rem] font-semibold text-slate-600">Home size</div>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {HOME_SIZES.map((h) => <button key={h.id} type="button" className={chip(homeSize === h.id)} onClick={() => setHomeSize(h.id)}>{h.label}</button>)}
                    </div>
                    <div className="mt-3 text-[0.85rem] font-semibold text-slate-600">Any of these? (pick all)</div>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {BIG_LOADS.map((l) => <button key={l.id} type="button" className={chip(loads.includes(l.id))} onClick={() => toggleLoad(l.id)}>{l.label}</button>)}
                      <button type="button" className={chip(noLoads)} onClick={() => { setNoLoads(!noLoads); setLoads([]); }}>None of these</button>
                    </div>
                    <div className="mt-3 text-[0.85rem] font-semibold text-slate-600">Generator fuel</div>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {FUELS.map((f) => <button key={f.id} type="button" className={chip(fuel === f.id)} onClick={() => setFuel(f.id)}>{f.label}</button>)}
                    </div>
                    <div className="mt-3 text-[0.85rem] font-semibold text-slate-600">When do you want it installed?</div>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {TIMELINES.map((t) => <button key={t} type="button" className={chip(timeline === t)} onClick={() => setTimeline(t)}>{t}</button>)}
                    </div>
                    {live && <p className="mt-3 text-[0.88rem] text-slate-700">Updated estimate: <b>{live.range}</b></p>}
                  </details>

                  <button type="button" disabled={!day || booking} onClick={requestSiteWalk} className={`${ctaBtn} mt-5`}>
                    {booking ? 'Sending…' : <><CalendarCheck className="h-5 w-5" /> {day ? `Request my site walk${dayLabel ? ` for ${dayLabel}` : ''}` : 'Pick a day above'}</>}
                  </button>
                  <p className="mt-2 text-center text-[0.8rem] text-slate-500">Free · No obligation</p>
                </>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Sticky action on the result page */}
      {view === 'result' && !booked && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E3E6EA] bg-white/95 p-3 backdrop-blur">
          <div className="mx-auto flex max-w-3xl gap-2">
            <a href={`tel:${siteConfig.cleanPhone}`} className="inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-[#0A1322] px-4 font-bold">
              <Phone className="h-5 w-5" />
            </a>
            <button type="button" onClick={toSchedule} className={ctaBtn}>
              <CalendarCheck className="h-5 w-5" /> Book My Free Site Walk
            </button>
          </div>
        </div>
      )}

      {/* Leave confirmation */}
      {exitPrompt && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-4" onClick={() => setExitPrompt(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="exit-title" onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-t-2xl bg-white p-6 sm:rounded-2xl">
            <h2 id="exit-title" className="text-[1.35rem] font-bold leading-tight">
              {leadDone.current ? (booked ? 'You’re all set.' : 'Leave without booking your free site walk?') : 'Wait, your generator size is almost ready.'}
            </h2>
            <p className="mt-2 text-[0.98rem] text-slate-600">
              {leadDone.current
                ? booked
                  ? 'Josh will reach out to confirm your site walk.'
                  : 'It’s free, and it’s the only way to know the exact size before you spend thousands on a generator.'
                : 'Two taps and you’ll see which generators fit your home. No cost, no obligation.'}
            </p>
            <div className="mt-5 grid gap-2">
              {!booked && (
                <button type="button" onClick={() => { setExitPrompt(false); if (leadDone.current) toSchedule(); }} className={ctaBtn}>
                  {leadDone.current ? 'Book my free site walk' : 'Finish my estimate'}
                </button>
              )}
              <a href="/generators" className="py-2.5 text-center text-[0.92rem] font-semibold text-slate-500 underline">
                {booked ? 'Back to generators' : 'Leave anyway'}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
