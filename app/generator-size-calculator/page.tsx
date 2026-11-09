import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { ArrowRight, BadgeCheck, Check, Star, ChevronDown, Clock, FileCheck2, Flame, Home, Lightbulb, ShieldCheck, Thermometer, Zap } from 'lucide-react';
import { siteConfig } from '../config';
import { products, formatUsd, type Product } from '../generators/products';
import { ProductImage } from '../generators/ProductImage';
import { productHref } from '../generators/details';
import { CalculatorPopout, OpenCalcButton } from './CalculatorPopout';

// Public, indexable Houston generator size calculator. Same funnel as the paid
// landing page (/lp/generator-sizing, noindex), inside the normal site, with
// sourced Houston reference content below it so Google and AI answer engines can
// read, rank, and cite it. Every outside number here has a source in SOURCES.

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' });

const TITLE = 'Houston Generator Size Calculator: What Size Generator Do I Need?';
const DESC =
  'Free Houston generator size calculator. Answer 2 questions and see which standby generators fit your home, with real prices, a Houston size chart, and sourced outage data. Licensed electrician, TECL #41163.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Solivance Electric` },
  description: DESC,
  alternates: { canonical: '/generator-size-calculator' },
  openGraph: { title: TITLE, description: DESC, url: `${siteConfig.domain}/generator-size-calculator`, images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
};

const pp = (id: string) => products.find((p) => p.model === id)!;

const SOURCES = [
  { n: 1, t: 'T&D World: CenterPoint restores power to more than 1 million customers after Hurricane Beryl (Jul 11, 2024)', u: 'https://www.tdworld.com/disaster-response/news/55125353/centerpoint-energy-restores-power-to-more-than-1-million-customers-following-hurricane-beryl' },
  { n: 2, t: 'Houston Landing: 250,000 still without power for 8th day after Beryl (Jul 15, 2024)', u: 'https://houstonlanding.org/centerpoint-reports-2-million-customers-restored-250000-still-without-power-for-8th-day/' },
  { n: 3, t: 'University of Houston Hobby School: Winter Storm Uri survey, Harris County (Apr 8, 2021)', u: 'https://www.uh.edu/news-events/stories/2021/april-2021/04082021-hobby-winter-hc.php' },
  { n: 4, t: 'Generac: What Size Generator Do I Need?', u: 'https://www.generac.com/resources/home-management/what-size-generator-do-i-need/' },
  { n: 5, t: 'DTE Energy / GenerLink: Appliance Usage Guide', u: 'https://www.dteenergy.com/content/dam/dteenergy/deg/website/residential/service-and-price/protection/Appliance-Usage-Guide-GenerLink-Worksheet.pdf' },
  { n: 6, t: 'U.S. Department of Energy AFDC: Charging stations (Level 2 power)', u: 'https://afdc.energy.gov/fuels/electricity-stations' },
  { n: 7, t: 'Briggs & Stratton PowerProtect PP26 spec sheet (BS1536)', u: 'https://apelectric.com/content/PDF/Briggs/26kw_ppp_spec_sheet.pdf' },
  { n: 8, t: 'Generac: Backup Generator Installation (cost and timeline)', u: 'https://www.generac.com/resources/home-management/backup-generator-installation/' },
  { n: 9, t: 'Consumer Reports: Best Home Standby Generators (updated Jul 2026)', u: 'https://www.consumerreports.org/home-garden/generators/best-home-standby-generators-consumer-reports-tests-a5942327707/' },
  { n: 10, t: 'Houston Public Works: Residential Standby Generator Permit & Inspection Guide, Form CE-1060 (rev. Sept 2024)', u: 'https://www.houstonpermittingcenter.org/media/1886/download' },
];
const Cite = ({ n }: { n: number }) => (
  <a href={`#src-${n}`} className="align-super text-[0.68rem] font-semibold text-[var(--onestop-red)] no-underline">[{n}]</a>
);

const STATS = [
  { icon: Zap, big: '2.26 million', label: 'CenterPoint customers lost power in Hurricane Beryl', n: 1 },
  { icon: Clock, big: '~207,000', label: 'were still without power 8 days after Beryl hit', n: 2 },
  { icon: Thermometer, big: '91%', label: 'of Harris County residents lost power in Winter Storm Uri, for 49 hours on average', n: 3 },
];

// Mirrors the calculator's rules (app/generators/estimator.ts).
const CHART = [
  { home: 'Just the essentials', detail: 'Lights, fridge, outlets, Wi-Fi', ac: 'AC not backed up', range: '11.5–18 kW', models: ['040746', '040757'], pick: '040757' as string | undefined, goal: 'essentials' },
  { home: 'Whole home, up to 3,500 sq ft', detail: 'Everything, including AC', ac: '1 AC unit', range: '18–26 kW', models: ['040757', '040787', '040807'], pick: '040787', goal: 'whole' },
  { home: 'Whole home, 3,500–5,000 sq ft', detail: 'Everything, including AC', ac: '2 AC units', range: '22–26 kW', models: ['040787', '040807'], pick: '040807', goal: 'whole' },
  { home: 'Whole home, over 5,000 sq ft', detail: 'Everything, including AC', ac: '3+ AC units', range: '30–60 kW', models: ['076880', '076830', '076850', '076860'], pick: undefined, goal: 'whole' },
];

const APPLIANCES: [string, string, number][] = [
  ['Central AC, 3-ton (running)', '3,500–5,000 W', 4],
  ['Central AC, 3-ton (starting surge)', 'up to 15,000–18,000 W', 4],
  ['Electric range with oven', '12,200 W', 5],
  ['Level 2 EV charger (30 A)', '7,200 W', 6],
  ['Electric water heater, 50 gal', '4,500–5,000 W', 5],
  ['Electric clothes dryer', '4,850 W', 5],
  ['Well pump, 1/2 HP', '1,000 W', 5],
  ['Refrigerator / freezer', '750 W', 5],
  ['Furnace fan, 1/3 HP', '450 W', 5],
];

const FAQS = [
  {
    q: 'What size generator do I need for my Houston home?',
    a: 'Most Houston homes that back up the whole house with one AC unit land in the 18–26 kW range. Two AC units usually means 22–26 kW, and three or more often needs a 30 kW or larger liquid-cooled unit. Generac calls 22 kW the industry standard for a whole home of about 2,500–3,000 sq ft. A licensed electrician should check your AC and panel before you buy.',
  },
  {
    q: 'Why does AC matter so much for generator size in Houston?',
    a: 'A 3-ton central AC runs at about 3.5–5 kW, but it can need 15–18 kW for a moment to start. In a Houston summer outage the AC is what most people want back, so it drives the size more than anything else in the home.',
  },
  {
    q: 'Is a natural gas generator smaller than the same model on propane?',
    a: 'Often, yes. The Briggs & Stratton PowerProtect PP26 is rated 26 kW on propane and 24 kW on natural gas, about 8% less on natural gas.',
  },
  {
    q: 'Do I need a permit to install a standby generator in Houston?',
    a: 'Yes. The City of Houston requires electrical and plumbing permits, a pad inspection before concrete is poured, and clearances such as 5 ft from combustible walls and openings. Bellaire, West University Place, and other cities have their own permit offices.',
  },
  {
    q: 'How much does a whole-home standby generator cost?',
    a: `Generac puts the average installed cost at $8,000–$16,000, including the generator. The Briggs & Stratton home standby units we carry run ${formatUsd(pp('040746').map)}–${formatUsd(pp('040807').map)} for the unit. Your install price depends on your panel, gas line, and transfer switch, so it's quoted after a free visit.`,
  },
  {
    q: 'How long can a standby generator run in an outage?',
    a: 'On natural gas it runs as long as the gas utility keeps flowing. On propane it depends on the tank: a PP26 uses about 2.6 gallons per hour at half load, per Briggs & Stratton.',
  },
];

const GEN_COUNT = products.filter((p) => p.group === 'powerprotect' || p.group === 'fortress').length;
const GRID_COLS: Record<number, string> = { 2: 'lg:grid-cols-3', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

/** "26 / 24 kW" -> "26 kW propane · 24 kW natural gas"; "30 kW" -> "30 kW" */
function fuelLine(p: Product) {
  const [lp, ng] = (p.kw || '').replace(' kW', '').split('/').map((x) => x.trim());
  return ng ? `${lp} kW propane · ${ng} kW natural gas` : `${lp} kW`;
}

function ChartProduct({ p, common, goal }: { p: Product; common: boolean; goal: string }) {
  const liquid = p.group === 'fortress';
  const facts = [
    liquid ? 'Liquid-cooled engine for big homes' : 'Air-cooled home standby',
    `${p.warrantyYears}-year limited warranty`,
    liquid ? 'Heavy-duty all-weather case' : 'Turns on by itself when power goes out',
  ];
  return (
    <div className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-[0_14px_32px_-16px_rgba(10,19,34,0.35)] ${common ? 'border-[#E8590C] ring-1 ring-[#E8590C]' : 'border-[#E6E8EC]'}`}>
      <Link href={productHref(p)} className="relative block aspect-[4/3] border-b border-[#EEF0F3] bg-white p-5" aria-label={`${p.name} details`}>
        {common && <span className="absolute left-3 top-3 z-10 rounded-md bg-[#E8590C] px-2 py-1 text-[0.7rem] font-semibold text-white">Our pick for this home</span>}
        {!common && p.badge && <span className="absolute left-3 top-3 z-10 rounded-md bg-[#E8F3EC] px-2 py-1 text-[0.7rem] font-semibold text-[#1F7A4D]">{p.badge}</span>}
        <ProductImage src={p.image} alt={`Briggs & Stratton ${p.name} standby generator`} className="h-full w-full" sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw" />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[0.75rem] font-medium text-[#5A6B7F]">Briggs &amp; Stratton</p>
        <Link href={productHref(p)} className="mt-0.5 text-[1.05rem] font-semibold leading-snug text-[#0A1322] hover:underline">{p.name}</Link>
        <p className="mt-1 text-[0.82rem] text-[#5A6B7F]">{fuelLine(p)}</p>
        <ul className="mt-3 grid gap-1.5">
          {facts.map((t) => (
            <li key={t} className="flex items-start gap-2 text-[0.84rem] leading-snug text-[#334155]"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1F7A4D]" /> {t}</li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          <p className="text-[1.35rem] font-bold leading-none tabular-nums">{formatUsd(p.map)}</p>
          <p className="mt-1 text-[0.74rem] text-[#5A6B7F]">Unit only · install quoted after a free visit</p>
          <div className="mt-4 grid gap-2">
            <OpenCalcButton goal={goal} className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#E8590C] px-3 py-2.5 text-[0.88rem] font-semibold text-white transition-colors hover:bg-[#C2410C]">
              Will this fit my home? <ArrowRight className="h-4 w-4" />
            </OpenCalcButton>
            <Link href={productHref(p)} className="flex w-full items-center justify-center rounded-xl border border-[#E3E6EA] px-3 py-2.5 text-[0.86rem] font-semibold text-[#0A1322] transition-colors hover:border-[#0A1322]">
              See full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const eyebrow = 'text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#B23F07]';
const h2 = 'mt-2 text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-[#0A1322] sm:text-[2rem]';
const card = 'rounded-2xl border border-[#E6E8EC] bg-white';

export default function GeneratorSizeCalculatorPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Houston Generator Size Calculator',
      url: `${siteConfig.domain}/generator-size-calculator`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
      provider: { '@type': 'ElectricalContractor', name: siteConfig.businessName, telephone: siteConfig.phone, areaServed: 'Houston, TX' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div className={`${poppins.className} bg-[#F5F6F8] text-[#0A1322]`} style={{ '--font-app-display': poppins.style.fontFamily } as CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorPopout className={poppins.className} style={{ '--font-app-display': poppins.style.fontFamily } as CSSProperties} />

      {/* Hero: the calculator opens full-screen from here. */}
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)] text-white">
        <Image src="/photos_new/generator-installs.jpg" alt="Standby generator installed by Solivance Electric in Houston" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/60 lg:bg-transparent" />
        <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-black/75 via-black/50 to-black/20 lg:block" />
        <div className="mx-auto grid max-w-[1120px] gap-12 px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/80"><span className="h-px w-6 bg-[var(--onestop-gold)]" /> Free · Takes 20 seconds</p>
            <h1 className="mt-5 text-[2.1rem] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[2.8rem] lg:text-[3.3rem]">
              Houston Generator Size Calculator
            </h1>
            <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-white/80 sm:text-[1.15rem]">
              Answer 2 quick questions. See which standby generators fit your Houston home, with real prices. A licensed electrician checks it for free.
            </p>
            <div className="hidden lg:block">
            <div className="mt-8 grid max-w-[34rem] grid-cols-3 divide-x divide-white/20 border-y border-white/20 py-4">
              {[
                { big: `${GEN_COUNT}`, small: 'models to compare' },
                { big: formatUsd(pp('040746').map), small: 'units start at' },
                { big: '$0', small: 'home visit' },
              ].map((x) => (
                <div key={x.small} className="px-3 first:pl-0 sm:px-5">
                  <p className="text-[1.25rem] font-bold leading-none tabular-nums sm:text-[1.45rem]">{x.big}</p>
                  <p className="mt-1.5 text-[0.75rem] leading-tight text-white/70 sm:text-[0.8rem]">{x.small}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 text-[0.86rem] text-white/80">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#4ADE80]" /> Licensed {siteConfig.license.label}</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#4ADE80]" /> Briggs &amp; Stratton dealer</span>
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" /> {siteConfig.rating.toFixed(1)} on Google</span>
            </div>
            </div>
          </div>
          <div className="hidden lg:block">
          <div className="overflow-hidden rounded-md bg-white text-[var(--onestop-navy-deep)] shadow-[0_1px_0_rgba(15,40,71,0.06),0_4px_12px_rgba(15,40,71,0.10),0_30px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5">
            {/* Authority bar: same as the homepage quote form. */}
            <div className="flex items-center justify-between gap-3 bg-[var(--onestop-navy-deep)] px-5 py-2.5 text-white sm:px-6 lg:px-7">
              <div className="flex items-center gap-2 font-[family-name:var(--font-app-mono)] text-[0.62rem] uppercase tracking-[0.22em] text-white/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--onestop-gold)]" />
                Free Sizing<span className="hidden min-[420px]:inline"> · No Obligation</span>
              </div>
              <div className="font-[family-name:var(--font-app-mono)] text-[0.62rem] uppercase tracking-[0.18em] text-[var(--onestop-gold)]">Step 1 of 3</div>
            </div>
            <div className="p-5 sm:p-6 lg:p-7">
              <h2 className="mb-1.5 text-xl font-bold leading-tight tracking-[-0.025em] text-[var(--onestop-navy-deep)] sm:text-[1.4rem]">What do you want running in an outage?</h2>
              <p className="mb-5 text-[0.82rem] leading-snug text-slate-500">Pick one. A licensed electrician confirms the size at a free home visit.</p>
              <div className="grid gap-2.5">
                {[
                  { goal: 'essentials', icon: Lightbulb, t: 'Just the essentials', d: 'Lights, fridge, outlets, Wi-Fi' },
                  { goal: 'whole', icon: Home, t: 'My whole home', d: 'Everything, including the AC' },
                ].map(({ goal, icon: Icon, t, d }) => (
                  <OpenCalcButton
                    key={goal}
                    goal={goal}
                    className="group flex w-full items-center gap-3.5 rounded-md border border-slate-200 bg-white px-4 py-3.5 text-left transition-colors hover:border-[var(--onestop-navy-deep)] hover:bg-slate-50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--onestop-navy)]/[0.06] text-[var(--onestop-navy-deep)]"><Icon className="h-[18px] w-[18px]" strokeWidth={1.9} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.98rem] font-semibold">{t}</span>
                      <span className="block text-[0.8rem] text-slate-500">{d}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-[var(--onestop-red)]" />
                  </OpenCalcButton>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-200 pt-4 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500 sm:text-[0.64rem]">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[var(--onestop-navy-deep)]" /> Licensed</span>
                <span className="flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[var(--onestop-navy-deep)]" /> B&amp;S Dealer</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 shrink-0 text-[var(--onestop-navy-deep)]" /> 20 Seconds</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Phones: the card overlaps the photo band, like the calculator pop-out. */}
      <div className="relative z-10 mx-auto -mt-16 max-w-[592px] px-4 sm:-mt-20 sm:px-6 lg:hidden">
          <div className="overflow-hidden rounded-md bg-white text-[var(--onestop-navy-deep)] shadow-[0_1px_0_rgba(15,40,71,0.06),0_4px_12px_rgba(15,40,71,0.10),0_30px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5">
            {/* Authority bar: same as the homepage quote form. */}
            <div className="flex items-center justify-between gap-3 bg-[var(--onestop-navy-deep)] px-5 py-2.5 text-white sm:px-6 lg:px-7">
              <div className="flex items-center gap-2 font-[family-name:var(--font-app-mono)] text-[0.62rem] uppercase tracking-[0.22em] text-white/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--onestop-gold)]" />
                Free Sizing<span className="hidden min-[420px]:inline"> · No Obligation</span>
              </div>
              <div className="font-[family-name:var(--font-app-mono)] text-[0.62rem] uppercase tracking-[0.18em] text-[var(--onestop-gold)]">Step 1 of 3</div>
            </div>
            <div className="p-5 sm:p-6 lg:p-7">
              <h2 className="mb-1.5 text-xl font-bold leading-tight tracking-[-0.025em] text-[var(--onestop-navy-deep)] sm:text-[1.4rem]">What do you want running in an outage?</h2>
              <p className="mb-5 text-[0.82rem] leading-snug text-slate-500">Pick one. A licensed electrician confirms the size at a free home visit.</p>
              <div className="grid gap-2.5">
                {[
                  { goal: 'essentials', icon: Lightbulb, t: 'Just the essentials', d: 'Lights, fridge, outlets, Wi-Fi' },
                  { goal: 'whole', icon: Home, t: 'My whole home', d: 'Everything, including the AC' },
                ].map(({ goal, icon: Icon, t, d }) => (
                  <OpenCalcButton
                    key={goal}
                    goal={goal}
                    className="group flex w-full items-center gap-3.5 rounded-md border border-slate-200 bg-white px-4 py-3.5 text-left transition-colors hover:border-[var(--onestop-navy-deep)] hover:bg-slate-50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--onestop-navy)]/[0.06] text-[var(--onestop-navy-deep)]"><Icon className="h-[18px] w-[18px]" strokeWidth={1.9} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.98rem] font-semibold">{t}</span>
                      <span className="block text-[0.8rem] text-slate-500">{d}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-[var(--onestop-red)]" />
                  </OpenCalcButton>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-200 pt-4 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500 sm:text-[0.64rem]">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[var(--onestop-navy-deep)]" /> Licensed</span>
                <span className="flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[var(--onestop-navy-deep)]" /> B&amp;S Dealer</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 shrink-0 text-[var(--onestop-navy-deep)]" /> 20 Seconds</span>
              </div>
            </div>
          </div>
        <div className="mt-6 grid grid-cols-3 divide-x divide-[#DDE1E6] rounded-md border border-[#DDE1E6] bg-white py-3.5">
          {[
            { big: `${GEN_COUNT}`, small: 'models to compare' },
            { big: formatUsd(pp('040746').map), small: 'units start at' },
            { big: '$0', small: 'home visit' },
          ].map((x) => (
            <div key={x.small} className="px-3 text-center">
              <p className="text-[1.2rem] font-bold leading-none tabular-nums text-[var(--onestop-navy-deep)]">{x.big}</p>
              <p className="mt-1.5 text-[0.72rem] leading-tight text-slate-500">{x.small}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[0.8rem] text-[#334155]">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#1F7A4D]" /> Licensed {siteConfig.license.label}</span>
          <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#1F7A4D]" /> Briggs &amp; Stratton dealer</span>
          <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" /> {siteConfig.rating.toFixed(1)} on Google</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1040px] grid-cols-[minmax(0,1fr)] gap-14 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Short answer */}
        <section className={`${card} border-l-4 border-l-[#E8590C] p-5 sm:p-7`}>
          <p className={eyebrow}>The short answer</p>
          <p className="mt-2 text-[1.1rem] leading-relaxed text-[#1E293B] sm:text-[1.2rem]">
            Most Houston homes that back up the whole house with <b>one AC unit</b> need an <b>18–26 kW</b> standby generator. Two AC units usually means{' '}
            <b>22–26 kW</b>. Three or more, or a home over 5,000 sq ft, usually needs <b>30 kW or more</b>. Your AC is the biggest load, so have a licensed electrician
            check it before you buy.
          </p>
        </section>

        {/* Why Houston */}
        <section>
          <p className={eyebrow}>Why Houston homes size up</p>
          <h2 className={h2}>Houston outages last days, not hours</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {STATS.map(({ icon: Icon, big, label, n }) => (
              <div key={big} className={`${card} p-5`}>
                <Icon className="h-6 w-6 text-[#E8590C]" />
                <p className="mt-3 text-[1.9rem] font-bold leading-none tracking-[-0.02em]">{big}</p>
                <p className="mt-2 text-[0.92rem] leading-snug text-[#4A5A6C]">
                  {label} <Cite n={n} />
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-[#334155]">
            When the power is out for days in July, the AC is what keeps a home livable. That&apos;s why so many Houston homes size their generator around the AC,
            not just the lights and fridge.
          </p>
        </section>

        {/* Size chart */}
        <section>
          <p className={eyebrow}>Houston generator size chart</p>
          <h2 className={h2}>What size generator for your home</h2>
          <p className="mt-2 text-[0.98rem] text-[#4A5A6C]">
            Generac calls 22 kW the industry standard for a whole home of about 2,500–3,000 sq ft <Cite n={4} />. Here&apos;s where Houston homes usually land, with
            the models we carry.
          </p>
          <div className="mt-8 grid gap-6">
            {CHART.map((r, i) => (
              <div key={r.home} className={`${card} overflow-hidden`}>
                <div className="flex flex-col gap-3 border-b border-[#EEF0F3] bg-[#FAFBFC] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A1322] text-[0.95rem] font-bold text-white">{i + 1}</span>
                    <div>
                      <p className="text-[1.08rem] font-semibold leading-snug sm:text-[1.15rem]">{r.home}</p>
                      <p className="mt-0.5 text-[0.86rem] text-[#5A6B7F]">{r.detail} · {r.ac}</p>
                    </div>
                  </div>
                  <span className="self-start rounded-xl bg-[#FFF1E8] px-3 py-1.5 text-[0.95rem] font-bold text-[#B23F07] sm:self-center">{r.range}</span>
                </div>
                <div className={`grid gap-4 p-4 sm:grid-cols-2 sm:p-6 ${GRID_COLS[r.models.length] ?? ''}`}>
                  {r.models.map((id) => (
                    <ChartProduct key={id} p={pp(id)} common={r.pick === id} goal={r.goal} />
                  ))}
                  {r.models.length === 2 && (
                    <div className="flex flex-col justify-center rounded-2xl border border-dashed border-[#CBD2DA] bg-[#FAFBFC] p-5 sm:col-span-2 lg:col-span-1">
                      <ShieldCheck className="h-7 w-7 text-[#1F7A4D]" />
                      <p className="mt-3 text-[1.05rem] font-semibold leading-snug">Not sure which one?</p>
                      <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[#4A5A6C]">
                        Our team comes out, checks your panel and AC, and tells you the right size. The visit is free.
                      </p>
                      <OpenCalcButton goal={r.goal} className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0A1322] px-3 py-2.5 text-[0.88rem] font-semibold text-white transition-colors hover:bg-[#1E293B]">
                        Find my size <ArrowRight className="h-4 w-4" />
                      </OpenCalcButton>
                      <a href={`tel:${siteConfig.cleanPhone}`} className="mt-2 text-center text-[0.86rem] font-semibold text-[#0A1322] hover:underline">Or call {siteConfig.phone}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[0.8rem] text-[#5A6B7F]">Unit prices are Briggs &amp; Stratton manufacturer advertised prices. Ranges are a starting point, not a load calculation.</p>
        </section>

        {/* Appliances */}
        <section>
          <p className={eyebrow}>What uses the most power</p>
          <h2 className={h2}>How much power common appliances use</h2>
          <div className={`${card} mt-6 overflow-hidden`}>
            <dl className="divide-y divide-[#EEF0F3]">
              {APPLIANCES.map(([name, watts, n]) => (
                <div key={name} className="flex items-center justify-between gap-4 px-5 py-3.5 text-[0.95rem]">
                  <dt className="text-[#334155]">{name}</dt>
                  <dd className="shrink-0 text-right font-semibold tabular-nums">
                    {watts} <Cite n={n} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-3 text-[0.9rem] text-[#4A5A6C]">
            Motors like AC compressors and pumps need 2–3 times their running power for a moment to start. Size for everything running plus the biggest start-up
            surge <Cite n={4} />.
          </p>
        </section>

        {/* Gas, permits, cost */}
        <section className="grid gap-3 md:grid-cols-3">
          <div className={`${card} p-5`}>
            <Flame className="h-6 w-6 text-[#E8590C]" />
            <h3 className="mt-3 text-[1.05rem] font-bold">Natural gas vs propane</h3>
            <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[#4A5A6C]">
              Many units put out less on natural gas. The PP26 is 26 kW on propane and 24 kW on natural gas. On propane it uses about 2.6 gal/hour at half load <Cite n={7} />.
            </p>
          </div>
          <div className={`${card} p-5`}>
            <FileCheck2 className="h-6 w-6 text-[#E8590C]" />
            <h3 className="mt-3 text-[1.05rem] font-bold">Houston permits</h3>
            <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[#4A5A6C]">
              Houston requires electrical and plumbing permits, a pad inspection, and clearances like 5 ft from walls and openings <Cite n={10} />. We pull them and meet
              the inspector.
            </p>
          </div>
          <div className={`${card} p-5`}>
            <Zap className="h-6 w-6 text-[#E8590C]" />
            <h3 className="mt-3 text-[1.05rem] font-bold">What it costs</h3>
            <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[#4A5A6C]">
              Generac puts the average installed cost at $8,000–$16,000 <Cite n={8} />. Consumer Reports lists units at about $3,400 to nearly $7,000 <Cite n={9} />.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <p className={eyebrow}>Questions</p>
          <h2 className={h2}>Houston generator questions</h2>
          <div className={`${card} mt-6 divide-y divide-[#EEF0F3]`}>
            {FAQS.map((f, i) => (
              <details key={f.q} className="group px-5 py-4" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1rem] font-semibold">
                  <h3 className="text-[1rem] font-semibold">{f.q}</h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#9AA5B1] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2.5 text-[0.96rem] leading-relaxed text-[#4A5A6C]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-[#0A1322] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <div>
            <p className="text-[1.35rem] font-bold leading-tight">Get your exact size, free</p>
            <p className="mt-1 text-[0.95rem] text-white/75">A licensed Houston electrician checks your panel and AC, then gives you one set price.</p>
          </div>
          <OpenCalcButton className="mt-4 inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E8590C] px-6 py-3.5 font-semibold text-white hover:bg-[#CF4E0A] sm:mt-0">
            Find my size <ArrowRight className="h-4 w-4" />
          </OpenCalcButton>
        </section>

        <nav className="grid gap-3 sm:grid-cols-3" aria-label="Related">
          {[
            ['/generators', 'Every generator we sell, with prices'],
            ['/services/generator-installs', 'Standby generator installation in Houston'],
            ['/financing', 'Generator financing'],
          ].map(([href, label]) => (
            <Link key={href} href={href} className={`${card} flex items-center justify-between gap-3 p-4 text-[0.95rem] font-semibold hover:border-[#9AA5B1]`}>
              {label} <ArrowRight className="h-4 w-4 shrink-0 text-[#9AA5B1]" />
            </Link>
          ))}
        </nav>

        {/* Sources */}
        <section>
          <h2 className="text-[1rem] font-bold">Sources</h2>
          <ol className="mt-3 grid gap-1.5 text-[0.8rem] text-[#5A6B7F]">
            {SOURCES.map((s) => (
              <li key={s.n} id={`src-${s.n}`} className="scroll-mt-24">
                [{s.n}]{' '}
                <a href={s.u} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-[#0A1322]">
                  {s.t}
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
