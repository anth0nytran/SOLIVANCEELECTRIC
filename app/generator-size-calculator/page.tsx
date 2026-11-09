import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '../config';
import { products, formatUsd } from '../generators/products';
import type { CSSProperties } from 'react';
import { Poppins } from 'next/font/google';
import { SizingFlow } from '../lp/generator-sizing/SizingFlow';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' });

// Public, indexable Houston generator size calculator. Same funnel as the paid
// landing page (/lp/generator-sizing, noindex), but inside the normal site with
// crawlable reference content below it, so Google and AI answer engines can read,
// rank, and cite it for Houston generator-sizing questions.

const TITLE = 'Houston Generator Size Calculator: What Size Generator Do I Need?';
const DESC =
  'Free Houston generator size calculator. Answer 2 questions and see which standby generators fit your home, with real prices. Licensed Houston electrician, TECL #41163.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Solivance Electric` },
  description: DESC,
  alternates: { canonical: '/generator-size-calculator' },
  openGraph: { title: TITLE, description: DESC, url: `${siteConfig.domain}/generator-size-calculator`, images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
};

const pp = (id: string) => products.find((p) => p.model === id)!;

// Chart rows mirror the calculator's rules (app/generators/estimator.ts).
const CHART = [
  { home: 'Essentials only (lights, fridge, outlets, Wi-Fi)', ac: 'Not backed up', range: '11.5–18 kW', models: ['040746', '040757'] },
  { home: 'Whole home, up to 3,500 sq ft', ac: '1 AC unit', range: '18–26 kW', models: ['040757', '040787', '040807'] },
  { home: 'Whole home, 3,500–5,000 sq ft', ac: '2 AC units', range: '22–26 kW', models: ['040787', '040807'] },
  { home: 'Whole home, over 5,000 sq ft', ac: '3 or more AC units', range: '30–60 kW', models: ['076880', '076830', '076850', '076860'] },
];

const FAQS = [
  {
    q: 'What size generator do I need for my Houston home?',
    a: 'Most Houston homes that want whole-home backup with one AC unit land in the 18–26 kW range. Two AC units usually push you to 22–26 kW, and three or more often need a 30 kW or larger liquid-cooled unit. Your AC is the biggest load, so a licensed electrician should check it before you buy.',
  },
  {
    q: 'Why does AC matter so much for generator size in Houston?',
    a: 'A central AC compressor needs a big burst of power to start, much more than it uses while running. In a Houston summer outage the AC is the thing most people want back, so it drives the generator size more than anything else in the home.',
  },
  {
    q: 'Is a natural gas generator smaller than the same model on propane?',
    a: 'Often, yes. Many air-cooled standby generators put out a little less on natural gas than on propane. For example, the Briggs & Stratton PowerProtect PP26+ is rated 26 kW on propane and 24 kW on natural gas.',
  },
  {
    q: 'Do I need a permit to install a standby generator in Houston?',
    a: 'Yes. Standby generator installs need permits, and the city or AHJ inspects the work. Bellaire, West University Place, and other cities each have their own permit office. A licensed electrician pulls the permits and meets the inspector.',
  },
  {
    q: 'How much does a standby generator cost in Houston?',
    a: `Briggs & Stratton home standby units we carry range from ${formatUsd(pp('040746').map)} to ${formatUsd(pp('040807').map)} for the unit (manufacturer advertised price). Installation is priced after a site visit because it depends on your panel, gas line, and transfer switch.`,
  },
];

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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={poppins.className} style={{ '--font-app-display': poppins.style.fontFamily } as CSSProperties}>
        <SizingFlow variant="site" />
      </div>

      {/* Crawlable reference content: what search engines and AI answer engines read and cite. */}
      <section className="border-t border-slate-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[880px] px-4 sm:px-6">
          <h2 className="text-[1.8rem] font-bold leading-tight text-[var(--onestop-navy-deep)] sm:text-[2.2rem]">Houston generator size chart</h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-slate-700">
            <b>Short answer:</b> most Houston homes that back up the whole house with one AC unit need an 18–26 kW standby generator. Two AC units usually means
            22–26 kW. Three or more, or a home over 5,000 sq ft, usually needs a 30 kW or larger liquid-cooled unit. Use the chart for a starting point, then have a
            licensed electrician check your panel and AC before you buy.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[620px] text-left text-[0.92rem]">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-3 font-semibold">What you want backed up</th>
                  <th className="p-3 font-semibold">AC units</th>
                  <th className="p-3 font-semibold">Typical size</th>
                  <th className="p-3 font-semibold">Models (unit price)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {CHART.map((r) => (
                  <tr key={r.home}>
                    <td className="p-3">{r.home}</td>
                    <td className="p-3">{r.ac}</td>
                    <td className="p-3 font-semibold">{r.range}</td>
                    <td className="p-3">
                      {r.models.map((id) => (
                        <span key={id} className="block">
                          {pp(id).name}: {formatUsd(pp(id).map)}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[0.8rem] text-slate-500">Prices are Briggs &amp; Stratton manufacturer advertised prices for the unit only. Ranges are a starting point, not a load calculation.</p>

          <h2 className="mt-12 text-[1.6rem] font-bold text-[var(--onestop-navy-deep)]">Common questions</h2>
          <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200">
            {FAQS.map((f) => (
              <div key={f.q} className="p-5">
                <h3 className="text-[1.05rem] font-semibold text-[var(--onestop-navy-deep)]">{f.q}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-slate-700">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            <Link href="/generators" className="rounded-xl border border-slate-200 p-4 font-semibold text-[var(--onestop-navy-deep)] hover:border-slate-400">See every generator we sell →</Link>
            <Link href="/services/generator-installs" className="rounded-xl border border-slate-200 p-4 font-semibold text-[var(--onestop-navy-deep)] hover:border-slate-400">Standby generator installation in Houston →</Link>
            <Link href="/financing" className="rounded-xl border border-slate-200 p-4 font-semibold text-[var(--onestop-navy-deep)] hover:border-slate-400">Generator financing →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
