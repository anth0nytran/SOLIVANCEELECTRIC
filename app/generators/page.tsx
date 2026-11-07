import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Phone } from 'lucide-react';
import { siteConfig } from '../config';
import { brands, financing } from '../lib/brands';
import { FinancingInline, FinancingNote } from '../components/FinancingBanner';
import { BrandLogo } from '../components/BrandLogo';
import { CtaBackdrop } from '../components/CtaBackdrop';
import { ProductImage } from './ProductImage';
import { LineNav } from './LineNav';
import { PRICE_LIST_EFFECTIVE, formatUsd, productGroups, products, productsIn, type Product, type ProductGroup } from './products';
import { brandOf, fullName, productHref } from './details';

const title = 'Briggs & Stratton Generators Houston | Authorized Dealer';
const description =
  'Buy Briggs & Stratton standby generators from an authorized Houston dealer. PowerProtect, dealer-exclusive DX, and Fortress 13–60 kW, priced. Installed or unit only. Financing through Synchrony.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Briggs & Stratton generator dealer Houston',
    'Briggs and Stratton standby generator Houston',
    'PowerProtect generator Houston',
    'Fortress generator installer Houston',
    'whole home generator Bellaire TX',
    'generator financing Houston',
    'standby generator price Houston',
  ],
  alternates: { canonical: '/generators' },
  openGraph: {
    title,
    description,
    url: `${siteConfig.domain}/generators`,
    images: [{ url: '/generators/pp22.jpg', width: 1370, height: 1024, alt: 'Briggs & Stratton PowerProtect standby generator' }],
  },
};

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
const effective = new Date(`${PRICE_LIST_EFFECTIVE}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const sizingHref = '/contact?generator=&install=1#form';

/** Navigator labels, short enough to fit on one line on a phone. */
const navLabel: Record<string, string> = {
  powerprotect: 'PowerProtect',
  'powerprotect-dx': 'PowerProtect DX',
  fortress: 'Fortress',
  'bs-transfer': 'Transfer switches',
  'power-management': 'Power management',
  'asco-single': 'ASCO single phase',
  'asco-three': 'ASCO three phase',
};

/** The big line in each cell, in plain words. */
function keyFact(p: Product): string {
  if (p.kw) {
    const [lp, ng] = p.kw.replace(' kW', '').split('/').map((s) => s.trim());
    return ng ? `${lp} kW propane · ${ng} kW natural gas` : `${lp} kW`;
  }
  if (p.amps) {
    const volts = p.spec.match(/(208|240|480)V/)?.[1];
    const amps = p.model === '071257' ? 'Dual 200 / split 400 amps' : `${p.amps} amps`;
    return volts ? `${amps} · ${volts} volts` : amps;
  }
  return 'Load management module';
}

const faqs = [
  {
    q: 'Can I buy just the generator, or do you have to install it?',
    a: 'Both. Buy the unit and transfer switch at the listed price, or have Solivance Electric install it for one fixed price that covers the pad, gas line, transfer switch wiring, Harris County or City of Houston permit, CenterPoint coordination, commissioning, and warranty registration.',
  },
  {
    q: 'What size generator does a Houston home need?',
    a: 'It depends on the AC tonnage, electric appliances, and service size. Many 2,000–3,500 sq ft homes land in the 18–26 kW range with load management on the AC; larger homes with multiple systems move to Fortress liquid-cooled. Solivance Electric runs a free load calc on the site walk before recommending a size.',
  },
  {
    q: 'What is the difference between PowerProtect and PowerProtect DX?',
    a: 'Same generator and sizes. DX models are sold only through authorized dealers and carry a 10-year warranty instead of 7. Solivance Electric is an authorized Briggs & Stratton dealer and carries both.',
  },
  {
    q: 'Do you offer financing?',
    a: 'Yes. Financing is available through Synchrony on generators, transfer switches, and installation. Ask about monthly payment options when you call or request a quote. Subject to credit approval.',
  },
];

export default function GeneratorsPage() {
  const hero = products.find((p) => p.model === '040790')!; // PP22DX+
  const generatorGroups = productGroups.filter((g) => g.kind === 'generator');
  const otherGroups = productGroups.filter((g) => g.kind !== 'generator');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
        { '@type': 'ListItem', position: 2, name: 'Generators', item: `${siteConfig.domain}/generators` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Briggs & Stratton standby generators and transfer switches — Solivance Electric, Houston TX',
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${siteConfig.domain}${productHref(p)}`,
        item: {
          '@type': 'Product',
          name: fullName(p),
          sku: p.model,
          mpn: p.model,
          image: `${siteConfig.domain}${p.image}`,
          brand: { '@type': 'Brand', name: brandOf(p) },
          offers: { '@type': 'Offer', price: p.map, priceCurrency: 'USD', url: `${siteConfig.domain}${productHref(p)}` },
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ── */}
      <section className="border-b border-slate-200 bg-white">
        <div className={`${shell} grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-2 lg:gap-14`}>
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3 text-[1rem] text-slate-700">
              <BrandLogo src={brands.briggs.logo} name="Briggs & Stratton" className="h-7" fallbackClassName="text-base text-[var(--onestop-navy-deep)]" />
              <span className="h-5 w-px bg-slate-300" aria-hidden />
              Authorized dealer
            </div>
            <h1 className="font-[family-name:var(--font-app-display)] text-[2.2rem] sm:text-[2.8rem] lg:text-[3.1rem] font-bold leading-[1.06] tracking-[-0.025em] text-[var(--onestop-navy-deep)] text-balance">
              Briggs &amp; Stratton standby generators, priced and installed in Houston.
            </h1>
            <p className="mt-5 max-w-lg text-[1.08rem] leading-[1.65] text-slate-700">
              Every model we carry is listed below with its price. Tap any one to see the details. Buy the unit, or have us
              install it for one fixed price.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#powerprotect"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-8 text-[1.02rem] font-bold text-white hover:bg-[#e55f15] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--onestop-navy-deep)]"
              >
                See all generators
              </a>
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border-2 border-[var(--onestop-navy-deep)] px-8 text-[1.02rem] font-bold text-[var(--onestop-navy-deep)] hover:bg-[var(--onestop-navy-deep)] hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5" aria-hidden /> Call {siteConfig.phone}
              </a>
            </div>
            <div className="text-[1rem]">
              <FinancingInline tone="light" />
            </div>
          </div>

          <Link href={productHref(hero)} className="group block rounded-2xl border border-slate-200 bg-[#f4f6f9] p-6 sm:p-8">
            <ProductImage src={hero.image} alt={fullName(hero)} className="h-56 w-full sm:h-72" sizes="(min-width: 1024px) 560px, 100vw" priority />
            <span className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-[1.05rem] font-bold text-[var(--onestop-navy-deep)] group-hover:underline">{hero.name}</span>
              <span className="text-[1.3rem] font-extrabold tabular-nums text-[var(--onestop-navy-deep)]">{formatUsd(hero.map)}</span>
            </span>
            <span className="block text-[0.95rem] text-slate-600">{hero.kw} · Warranty: {hero.warrantyYears} years · Dealer exclusive</span>
          </Link>
        </div>
      </section>

      <LineNav items={productGroups.map((g) => ({ id: g.id, label: navLabel[g.id], count: productsIn(g.id).length }))} />

      {/* ── Generators ── */}
      <section className="bg-white py-12 sm:py-16">
        <div className={`${shell} space-y-16`}>
          {generatorGroups.map((g) => (
            <CatalogSection key={g.id} group={g} items={productsIn(g.id)} columns="generators" />
          ))}
        </div>
      </section>

      {/* ── Transfer switches and accessories ── */}
      <section className="border-t border-slate-200 bg-[#f4f6f9] py-12 sm:py-16">
        <div className={`${shell} space-y-16`}>
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-app-display)] text-[1.9rem] font-bold tracking-[-0.02em] text-[var(--onestop-navy-deep)]">
              Transfer switches and accessories
            </h2>
            <p className="mt-2 text-[1.05rem] leading-relaxed text-slate-700">
              Every installed generator price already includes the right transfer switch. These are listed for contractors and
              unit-only orders.
            </p>
          </div>
          {otherGroups.map((g) => (
            <CatalogSection key={g.id} group={g} items={productsIn(g.id)} columns="parts" sub />
          ))}
          <p className="max-w-3xl text-[0.92rem] leading-relaxed text-slate-600">
            Prices are Briggs &amp; Stratton minimum advertised prices for equipment only, effective {effective}, and change with
            manufacturer pricing. Installation is quoted as one fixed price after a free site walk. EnergyTrak monitoring is $99 a
            year after setup. {financing.headline}. {financing.disclaimer}
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-labelledby="faq-h" className="border-t border-slate-200 bg-white py-14 sm:py-16">
        <div className={`${shell} max-w-4xl`}>
          <h2 id="faq-h" className="font-[family-name:var(--font-app-display)] text-[1.9rem] font-bold tracking-[-0.02em] text-[var(--onestop-navy-deep)]">
            Common questions
          </h2>
          <div className="mt-6 divide-y divide-slate-300 border-y border-slate-300">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.08rem] font-bold text-[var(--onestop-navy-deep)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="h-6 w-6 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <p className="pb-5 text-[1.02rem] leading-relaxed text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <CtaBackdrop />
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="h-section text-white">Not sure which size you need?</h2>
          <p className="mx-auto mt-4 max-w-lg text-[1.05rem] leading-[1.7] text-white/85">
            We meter your panel on a free site walk and tell you the smallest generator that carries the house.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={sizingHref} className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-8 text-[1.02rem] font-bold text-white hover:bg-[#e55f15]">
              Book a free site walk <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <a href={`tel:${siteConfig.cleanPhone}`} className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border-2 border-white/70 px-8 text-[1.02rem] font-bold text-white hover:bg-white hover:text-[var(--onestop-navy-deep)] transition-colors">
              <Phone className="h-5 w-5" aria-hidden /> {siteConfig.phone}
            </a>
          </div>
          <FinancingNote />
        </div>
      </section>
    </>
  );
}

/** One product line: heading + a ruled grid where every cell is a link to the product page. */
function CatalogSection({
  group,
  items,
  columns,
  sub = false,
}: {
  group: ProductGroup;
  items: Product[];
  columns: 'generators' | 'parts';
  sub?: boolean;
}) {
  const Heading = sub ? 'h3' : 'h2';
  const cols = columns === 'generators' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <div id={group.id} className="scroll-mt-48">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="max-w-2xl">
          <Heading className={`font-[family-name:var(--font-app-display)] font-bold tracking-[-0.02em] text-[var(--onestop-navy-deep)] ${sub ? 'text-[1.45rem]' : 'text-[1.9rem]'}`}>
            {group.title}
          </Heading>
          <p className="mt-1.5 text-[1.02rem] leading-relaxed text-slate-700">{group.blurb}</p>
        </div>
        <p className="shrink-0 text-[0.98rem] font-semibold text-slate-600">
          {items.length} {items.length === 1 ? 'model' : 'models'}
        </p>
      </div>

      {/* Each cell draws its right + bottom rule; the list draws top + left. Incomplete last rows just end. */}
      <ul className={`mt-6 grid grid-cols-1 overflow-hidden rounded-xl border-l border-t border-slate-300 bg-white ${cols}`}>
        {items.map((p) => (
          <li key={p.model} className="border-b border-r border-slate-300 bg-white">
            <Link
              href={productHref(p)}
              className="group flex h-full flex-col p-5 transition-colors hover:bg-[#f7f9fc] focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-[var(--onestop-red)]"
            >
              <div className="relative">
                {p.badge && (
                  <span className="absolute left-0 top-0 z-10 rounded bg-[var(--onestop-navy-deep)] px-2 py-1 text-[0.8rem] font-bold text-white">
                    {p.badge}
                  </span>
                )}
                <ProductImage src={p.image} alt="" className={columns === 'generators' ? 'h-44 w-full' : 'h-32 w-full'} />
              </div>
              <span className="mt-4 block text-[1.2rem] font-bold leading-snug text-[var(--onestop-navy-deep)] group-hover:underline">
                {p.name}
              </span>
              <span className="mt-1 block text-[1rem] font-semibold text-slate-800">{keyFact(p)}</span>
              <dl className="mt-3 space-y-1 text-[0.95rem] text-slate-700">
                {p.warrantyYears && (
                  <div className="flex gap-1.5">
                    <dt>Warranty:</dt>
                    <dd className="font-semibold text-slate-900">{p.warrantyYears} years</dd>
                  </div>
                )}
                <div className="flex gap-1.5">
                  <dt>Model:</dt>
                  <dd className="font-semibold text-slate-900">{p.model}</dd>
                </div>
              </dl>
              <span className="mt-auto block pt-5">
                <span className="block text-[1.65rem] font-extrabold tabular-nums leading-none text-[var(--onestop-navy-deep)]">{formatUsd(p.map)}</span>
                <span className="mt-1 block text-[0.88rem] text-slate-600">Unit price · financing available</span>
                <span className="mt-4 flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-[var(--onestop-navy-deep)] text-[0.98rem] font-bold text-[var(--onestop-navy-deep)] transition-colors group-hover:bg-[var(--onestop-navy-deep)] group-hover:text-white">
                  View details <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
