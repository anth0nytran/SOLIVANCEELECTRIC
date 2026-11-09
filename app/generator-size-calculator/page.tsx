import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { ArrowRight, BadgeCheck, ChevronDown, Clock, FileCheck2, Flame, Home, Lightbulb, ShieldCheck, Thermometer, Zap } from 'lucide-react';
import { siteConfig } from '../config';
import { products, formatUsd } from '../generators/products';
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
  { home: 'Just the essentials', detail: 'Lights, fridge, outlets, Wi-Fi', ac: 'AC not backed up', range: '11.5–18 kW', models: ['040746', '040757'] },
  { home: 'Whole home, up to 3,500 sq ft', detail: 'Everything, including AC', ac: '1 AC unit', range: '18–26 kW', models: ['040757', '040787', '040807'] },
  { home: 'Whole home, 3,500–5,000 sq ft', detail: 'Everything, including AC', ac: '2 AC units', range: '22–26 kW', models: ['040787', '040807'] },
  { home: 'Whole home, over 5,000 sq ft', detail: 'Everything, including AC', ac: '3+ AC units', range: '30–60 kW', models: ['076880', '076830', '076850', '076860'] },
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
      <section className="bg-[#0A1322] text-white">
        <div className="mx-auto grid max-w-[1040px] gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#FDBA74]"><Zap className="h-3.5 w-3.5" /> Free · 20 seconds</p>
            <h1 className="mt-4 text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[2.6rem] lg:text-[3rem]">Houston Generator Size Calculator</h1>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-white/75 sm:text-[1.15rem]">
              Answer 2 quick questions. See which standby generators fit your Houston home, with real prices. A licensed electrician confirms it for free.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.85rem] text-white/75">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#4ADE80]" /> Licensed {siteConfig.license.label}</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#4ADE80]" /> Briggs &amp; Stratton dealer</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-[#4ADE80]" /> {siteConfig.rating.toFixed(1)} on Google</span>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5 text-[#0A1322] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] sm:p-7">
            <p className="text-[1.15rem] font-semibold leading-snug sm:text-[1.3rem]">What do you want running when the power goes out?</p>
            <div className="mt-4 grid gap-3">
              {[
                { goal: 'essentials', icon: Lightbulb, t: 'Just the essentials', d: 'Lights, fridge, outlets, Wi-Fi' },
                { goal: 'whole', icon: Home, t: 'My whole home', d: 'AC included, like nothing happened' },
              ].map(({ goal, icon: Icon, t, d }) => (
                <OpenCalcButton
                  key={goal}
                  goal={goal}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-[#E3E6EA] bg-white px-4 py-4 text-left transition-all hover:border-[#E8590C] hover:shadow-[0_6px_18px_-8px_rgba(232,89,12,0.45)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF1E8] text-[#C2410C]"><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1rem] font-semibold">{t}</span>
                    <span className="block text-[0.86rem] text-[#5A6B7F]">{d}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#9AA5B1] group-hover:text-[#E8590C]" />
                </OpenCalcButton>
              ))}
            </div>
            <p className="mt-3 text-center text-[0.8rem] text-[#5A6B7F]">Step 1 of 3 · Free, no obligation</p>
          </div>
        </div>
      </section>

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
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {CHART.map((r) => (
              <div key={r.home} className={`${card} p-5`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[1.02rem] font-semibold leading-snug">{r.home}</p>
                    <p className="text-[0.85rem] text-[#5A6B7F]">{r.detail} · {r.ac}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-[#0A1322] px-2.5 py-1.5 text-[0.9rem] font-bold text-white">{r.range}</span>
                </div>
                <ul className="mt-4 divide-y divide-[#EEF0F3] border-t border-[#EEF0F3]">
                  {r.models.map((id) => (
                    <li key={id} className="flex justify-between gap-3 py-2 text-[0.9rem]">
                      <span>Briggs &amp; Stratton {pp(id).name}</span>
                      <span className="font-semibold tabular-nums">{formatUsd(pp(id).map)}</span>
                    </li>
                  ))}
                </ul>
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
