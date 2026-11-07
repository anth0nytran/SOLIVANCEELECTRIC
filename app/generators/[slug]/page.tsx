import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronDown, ChevronRight, Package, Phone, ShieldCheck, Wrench } from 'lucide-react';
import { siteConfig } from '../../config';
import { brands, financing } from '../../lib/brands';
import { BrandLogo } from '../../components/BrandLogo';
import { CtaBackdrop } from '../../components/CtaBackdrop';
import { FinancingNote, SynchronyLogo } from '../../components/FinancingBanner';
import { ProductImage } from '../ProductImage';
import { PRICE_LIST_EFFECTIVE, formatUsd, products, type Product } from '../products';
import {
  brandOf,
  fullName,
  getProductBySlug,
  groupDetail,
  groupOf,
  isAsco,
  isGenerator,
  pairsWith,
  productHref,
  productSlug,
  siblings,
  specRows,
} from '../details';

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
const effective = new Date(`${PRICE_LIST_EFFECTIVE}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const quoteHref = (p: Product, install: boolean) => `/contact?generator=${p.model}&install=${install ? 1 : 0}#form`;

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: productSlug(p) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProductBySlug((await params).slug);
  if (!p) return { title: 'Product not found' };
  const kind = isGenerator(p) ? 'Standby Generator' : p.amps ? 'Transfer Switch' : 'Power Management';
  const title = `${fullName(p)} ${kind} · ${formatUsd(p.map)} | Houston Dealer`;
  const description = `${fullName(p)} (model ${p.model}): ${p.spec}. ${formatUsd(p.map)} unit price from an authorized Houston dealer. Installed or unit only. Financing available through Synchrony.`;
  return {
    title,
    description,
    alternates: { canonical: productHref(p) },
    openGraph: { title, description, url: `${siteConfig.domain}${productHref(p)}`, images: [{ url: p.image, alt: fullName(p) }] },
  };
}

/** Short headline facts for the middle column, in plain words. */
function keyFacts(p: Product): string[] {
  const facts: string[] = [];
  if (p.kw) {
    const [lp, ng] = p.kw.replace(' kW', '').split('/').map((s) => s.trim());
    facts.push(ng ? `${lp} kW on propane, ${ng} kW on natural gas` : `${lp} kW output`);
  }
  if (p.group === 'powerprotect' || p.group === 'powerprotect-dx') facts.push('120/240 volt, single phase, air-cooled');
  if (p.group === 'fortress') facts.push('Liquid-cooled engine with block heater');
  if (p.amps) {
    const volts = p.spec.match(/(208|240|480)V/)?.[1];
    facts.push(`${p.model === '071257' ? 'Dual 200 / split 400' : p.amps} amps${volts ? `, ${volts} volts` : ''}${p.phase === 'Three-Phase' ? ', three phase' : ''}`);
  }
  if (p.spec.includes('EnergyTrak')) facts.push('EnergyTrak monitoring on your phone');
  if (p.spec.includes('SED') && !p.spec.includes('Non-SED')) facts.push('Rated to install at the service entrance');
  if (p.warrantyYears) facts.push(`${p.warrantyYears}-year manufacturer warranty`);
  return facts;
}

const ratingLabel = (p: Product) => (p.kw ? 'Output' : p.amps ? 'Rating' : 'Type');

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProductBySlug((await params).slug);
  if (!p) notFound();

  const group = groupOf(p);
  const detail = groupDetail[p.group];
  const gen = isGenerator(p);
  const rows = specRows(p);
  const pairs = pairsWith(p);
  const compare = [p, ...siblings(p, 3)].sort((a, b) => a.map - b.map);
  const dxTwin =
    p.group === 'powerprotect'
      ? products.find((x) => x.group === 'powerprotect-dx' && x.kw === p.kw)
      : p.group === 'powerprotect-dx'
        ? products.find((x) => x.group === 'powerprotect' && x.kw === p.kw)
        : undefined;

  const faqs = [
    {
      q: `How much is the ${fullName(p)}?`,
      a: `The ${fullName(p)} (model ${p.model}) is ${formatUsd(p.map)} for the unit, the manufacturer's minimum advertised price effective ${effective}. Installation is quoted separately as one fixed price after a free site walk.`,
    },
    {
      q: `Can Solivance Electric install the ${p.name}?`,
      a: `Yes. Solivance Electric is an authorized Briggs & Stratton dealer and licensed Texas electrical contractor (${siteConfig.license.label}). The installed price covers the ${gen ? 'pad, gas line, transfer switch wiring, ' : 'wiring, '}permit, inspection, commissioning, and warranty registration.`,
    },
    {
      q: `Is financing available on the ${p.name}?`,
      a: 'Yes. Financing is available through Synchrony on the equipment and the installation. Ask about monthly payment options when you call or request a quote. Subject to credit approval.',
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: fullName(p),
      sku: p.model,
      mpn: p.model,
      description: `${p.spec}. ${detail.overview}`,
      image: `${siteConfig.domain}${p.image}`,
      brand: { '@type': 'Brand', name: brandOf(p) },
      category: group.title,
      offers: {
        '@type': 'Offer',
        price: p.map,
        priceCurrency: 'USD',
        url: `${siteConfig.domain}${productHref(p)}`,
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: siteConfig.businessName, telephone: siteConfig.phone },
      },
      additionalProperty: rows.map((r) => ({ '@type': 'PropertyValue', name: r.label, value: r.value })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
        { '@type': 'ListItem', position: 2, name: 'Generators', item: `${siteConfig.domain}/generators` },
        { '@type': 'ListItem', position: 3, name: p.name, item: `${siteConfig.domain}${productHref(p)}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  const h2 = 'font-[family-name:var(--font-app-display)] text-[1.6rem] font-bold tracking-[-0.02em] text-[var(--onestop-navy-deep)]';
  const hl = (c: Product) => (c.model === p.model ? 'bg-[#fff7f1]' : '');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <ol className={`${shell} flex flex-wrap items-center gap-x-1.5 gap-y-1 py-3 text-[0.95rem] text-slate-600`}>
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden><ChevronRight className="h-4 w-4 text-slate-400" /></li>
          <li><Link href="/generators" className="hover:underline">Generators</Link></li>
          <li aria-hidden><ChevronRight className="h-4 w-4 text-slate-400" /></li>
          <li><Link href={`/generators#${p.group}`} className="hover:underline">{group.title}</Link></li>
          <li aria-hidden className="hidden sm:block"><ChevronRight className="h-4 w-4 text-slate-400" /></li>
          <li className="hidden font-semibold text-slate-900 sm:block">{p.name}</li>
        </ol>
      </nav>

      {/* ── Image | details | buy box ── */}
      <section className="bg-white py-8 sm:py-10">
        <div className={`${shell} grid gap-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-12`}>
          <div className="xl:col-span-5">
            <div className="relative flex aspect-square items-center justify-center rounded-xl border border-slate-200 bg-white p-6 sm:aspect-[4/3] sm:p-10 lg:sticky lg:top-36 lg:aspect-square">
              {p.badge && (
                <span className="absolute left-4 top-4 rounded bg-[var(--onestop-navy-deep)] px-2.5 py-1 text-[0.85rem] font-bold text-white">{p.badge}</span>
              )}
              <ProductImage src={p.image} alt={fullName(p)} className="h-full w-full" sizes="(min-width: 1280px) 520px, (min-width: 1024px) 50vw, 100vw" priority />
            </div>
          </div>

          <div className="min-w-0 xl:col-span-7 xl:grid xl:grid-cols-7 xl:gap-10">
          <div className="min-w-0 xl:col-span-4">
            {!isAsco(p) ? (
              <Link href="/generators" className="inline-flex h-8 items-center" aria-label="All Briggs & Stratton products">
                <BrandLogo src={brands.briggs.logo} name="Briggs & Stratton" className="h-6" fallbackClassName="text-base text-[var(--onestop-navy-deep)]" />
              </Link>
            ) : (
              <span className="text-[1rem] font-bold text-slate-700">ASCO</span>
            )}
            <h1 className="mt-2 font-[family-name:var(--font-app-display)] text-[1.9rem] sm:text-[2.2rem] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--onestop-navy-deep)]">
              {fullName(p)}
            </h1>
            <p className="mt-2 text-[1rem] text-slate-600">Model {p.model} · {group.title}</p>

            <div className="mt-5 border-y border-slate-200 py-4">
              <span className="block text-[2rem] font-extrabold tabular-nums leading-none text-[var(--onestop-navy-deep)]">{formatUsd(p.map)}</span>
              <span className="mt-1.5 block text-[0.95rem] text-slate-600">Unit price. Installation is quoted separately.</span>
            </div>

            <h2 className="mt-6 text-[1.1rem] font-bold text-slate-900">About this item</h2>
            <ul className="mt-3 space-y-2.5">
              {keyFacts(p).map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[1.02rem] leading-snug text-slate-800">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--onestop-red)]" aria-hidden /> {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[1rem] leading-[1.7] text-slate-700">{detail.overview}</p>

            {p.note && <p className="mt-4 rounded-lg bg-slate-50 p-3.5 text-[0.95rem] text-slate-700">{p.note}</p>}

            {dxTwin && (
              <Link
                href={productHref(dxTwin)}
                className="mt-5 flex items-center justify-between gap-4 rounded-lg border-2 border-slate-200 p-4 hover:border-[var(--onestop-navy-deep)] transition-colors"
              >
                <span>
                  <span className="block text-[0.9rem] text-slate-600">{p.group === 'powerprotect-dx' ? 'Standard version' : 'Dealer-only version'}</span>
                  <span className="block text-[1.02rem] font-bold text-[var(--onestop-navy-deep)]">
                    {dxTwin.name}, {dxTwin.warrantyYears}-year warranty
                  </span>
                </span>
                <span className="shrink-0 text-[1.1rem] font-extrabold tabular-nums text-[var(--onestop-navy-deep)]">{formatUsd(dxTwin.map)}</span>
              </Link>
            )}
          </div>

          <aside className="mt-8 xl:col-span-3 xl:mt-0" aria-label="Order options">
            <div className="rounded-xl border border-slate-300 bg-white p-5 xl:sticky xl:top-36">
              <span className="block text-[1.75rem] font-extrabold tabular-nums leading-none text-[var(--onestop-navy-deep)]">{formatUsd(p.map)}</span>
              {p.warrantyYears && (
                <span className="mt-2 flex items-center gap-1.5 text-[0.95rem] text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-[var(--onestop-red)]" aria-hidden /> {p.warrantyYears}-year warranty
                </span>
              )}
              <span className="mt-1 block text-[0.95rem] text-slate-700">Sold and installed by {siteConfig.businessName}</span>

              <div className="mt-5 grid gap-2.5">
                <Link href={quoteHref(p, true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--onestop-red)] px-5 text-[1rem] font-bold text-white hover:bg-[#e55f15]">
                  <Wrench className="h-4 w-4" aria-hidden /> Get installed price
                </Link>
                <Link href={quoteHref(p, false)} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[var(--onestop-navy-deep)] px-5 text-[1rem] font-bold text-[var(--onestop-navy-deep)] hover:bg-[var(--onestop-navy-deep)] hover:text-white transition-colors">
                  <Package className="h-4 w-4" aria-hidden /> Buy unit only
                </Link>
                <a href={`tel:${siteConfig.cleanPhone}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-100 px-5 text-[1rem] font-bold text-[var(--onestop-navy-deep)] hover:bg-slate-200">
                  <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
                </a>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <SynchronyLogo />
                <p className="mt-2 text-[0.92rem] leading-snug text-slate-700">
                  <Link href="/financing" className="font-bold text-[var(--onestop-navy-deep)] underline underline-offset-2">Financing available</Link>{' '}
                  on the unit and installation. {financing.sub}
                </p>
                <p className="mt-1 text-[0.82rem] text-slate-500">{financing.disclaimer}</p>
              </div>

              <ul className="mt-4 space-y-1.5 border-t border-slate-200 pt-4 text-[0.92rem] text-slate-700">
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--onestop-red)]" aria-hidden /> Authorized B&amp;S dealer</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--onestop-red)]" aria-hidden /> {siteConfig.license.label}</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--onestop-red)]" aria-hidden /> Permit and inspection handled</li>
              </ul>
            </div>
          </aside>
          </div>
        </div>
      </section>

      {/* ── Product details ── */}
      <section className="border-t border-slate-200 bg-white py-10 sm:py-12">
        <div className={shell}>
          <h2 className={h2}>Product details</h2>
          <dl className="mt-5 grid overflow-hidden rounded-xl border-l border-t border-slate-300 md:grid-cols-2">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] border-b border-r border-slate-300">
                <dt className="bg-slate-50 px-4 py-3 text-[0.98rem] font-semibold text-slate-700">{r.label}</dt>
                <dd className="px-4 py-3 text-[0.98rem] text-slate-900">{r.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[0.88rem] text-slate-500">
            From the Briggs &amp; Stratton price list effective {effective}. Full ratings are on the manufacturer spec sheet.
          </p>
        </div>
      </section>

      {/* ── Compare with similar ── */}
      {compare.length > 1 && (
        <section className="border-t border-slate-200 bg-[#f4f6f9] py-10 sm:py-12">
          <div className={shell}>
            <h2 className={h2}>Compare with similar</h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-300 bg-white">
              <table className="w-full min-w-[640px] border-collapse text-left text-[0.98rem]">
                <thead>
                  <tr>
                    <td className="w-40 border-b border-r border-slate-300 bg-slate-50" />
                    {compare.map((c) => (
                      <th key={c.model} scope="col" className={`border-b border-r border-slate-300 px-4 py-4 align-top font-normal last:border-r-0 ${hl(c)}`}>
                        <Link href={productHref(c)} className="group block">
                          <ProductImage src={c.image} alt="" className="h-24 w-full" sizes="200px" />
                          <span className="mt-2 block font-bold text-[var(--onestop-navy-deep)] group-hover:underline">{c.name}</span>
                          {c.model === p.model && <span className="mt-0.5 block text-[0.85rem] font-semibold text-[var(--onestop-red)]">This item</span>}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Price', get: (c: Product) => <span className="font-extrabold tabular-nums text-[var(--onestop-navy-deep)]">{formatUsd(c.map)}</span> },
                    { label: ratingLabel(p), get: (c: Product) => c.kw ?? (c.amps ? `${c.amps} amps` : 'Module') },
                    { label: 'Warranty', get: (c: Product) => (c.warrantyYears ? `${c.warrantyYears} years` : 'See spec sheet') },
                    { label: 'Model number', get: (c: Product) => c.model },
                  ].map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="border-b border-r border-slate-300 bg-slate-50 px-4 py-3 text-[0.92rem] font-semibold text-slate-700">{row.label}</th>
                      {compare.map((c) => (
                        <td key={c.model} className={`border-b border-r border-slate-300 px-4 py-3 last:border-r-0 ${hl(c)}`}>{row.get(c)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="border-r border-slate-300 bg-slate-50" />
                    {compare.map((c) => (
                      <td key={c.model} className={`border-r border-slate-300 px-4 py-3 last:border-r-0 ${hl(c)}`}>
                        {c.model !== p.model && (
                          <Link href={productHref(c)} className="inline-flex items-center gap-1 font-bold text-[var(--onestop-navy-deep)] underline underline-offset-2">
                            View <ArrowRight className="h-4 w-4" aria-hidden />
                          </Link>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── Pairs with ── */}
      {pairs.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-10 sm:py-12">
          <div className={shell}>
            <h2 className={h2}>Transfer switches that pair with it</h2>
            <p className="mt-1.5 text-[1rem] text-slate-700">Matched to your service at the site walk. Every installed price includes the switch.</p>
            <ul className="mt-5 grid grid-cols-1 overflow-hidden rounded-xl border-l border-t border-slate-300 sm:grid-cols-2 lg:grid-cols-4">
              {pairs.map((x) => (
                <li key={x.model} className="min-w-0 border-b border-r border-slate-300">
                  <Link href={productHref(x)} className="group flex h-full items-center gap-4 p-4 hover:bg-[#f7f9fc]">
                    <ProductImage src={x.image} alt="" className="h-16 w-16 shrink-0" sizes="64px" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[1rem] font-bold leading-snug text-[var(--onestop-navy-deep)] group-hover:underline">{x.name}</span>
                      <span className="mt-1 block text-[1.05rem] font-extrabold tabular-nums text-[var(--onestop-navy-deep)]">{formatUsd(x.map)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── What the installed price covers ── */}
      {gen && (
        <section className="border-t border-slate-200 bg-[#f4f6f9] py-10 sm:py-12">
          <div className={shell}>
            <h2 className={h2}>What the installed price covers</h2>
            <ul className="mt-5 grid grid-cols-1 overflow-hidden rounded-xl border-l border-t border-slate-300 bg-white sm:grid-cols-2 lg:grid-cols-4">
              {[
                'Load calc against your metered panel',
                'Pad sited to code clearances',
                'Gas line sized for the unit',
                'Transfer switch wired and labeled',
                'Harris County or City of Houston permit',
                'Inspection walked with the inspector',
                'Live grid-drop commissioning test',
                'Warranty registration and first service date',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 border-b border-r border-slate-300 p-4 text-[1rem] text-slate-800">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--onestop-red)]" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="border-t border-slate-200 bg-white py-10 sm:py-12">
        <div className={`${shell} max-w-4xl`}>
          <h2 className={h2}>Questions about the {p.name}</h2>
          <div className="mt-5 divide-y divide-slate-300 border-y border-slate-300">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.05rem] font-bold text-[var(--onestop-navy-deep)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="h-6 w-6 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <p className="pb-5 text-[1rem] leading-relaxed text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <CtaBackdrop />
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 text-center">
          <h2 className="h-section text-white">Not sure the {p.name} is the right size?</h2>
          <p className="mx-auto mt-4 max-w-lg text-[1.05rem] leading-[1.7] text-white/85">
            We meter your panel on a free site walk and tell you the smallest unit that carries the house.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={quoteHref(p, true)} className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-8 text-[1.02rem] font-bold text-white hover:bg-[#e55f15]">
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
