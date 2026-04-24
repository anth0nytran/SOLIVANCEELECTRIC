import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts } from './posts';
import { siteConfig } from '../config';

export const metadata: Metadata = {
  title: 'Blog — Commercial Electrical Insights & Guides | Solivance Electric',
  description:
    'Commercial electrical guides, cost breakdowns, and Houston-specific advice from Solivance Electric LLC — panel upgrades, EV chargers, generators, and more.',
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': [
        { url: '/blog/rss.xml', title: 'Solivance Electric Blog RSS' },
      ],
    },
  },
  openGraph: {
    title: 'Blog — Commercial Electrical Insights & Guides | Solivance Electric',
    description:
      'Commercial electrical guides and Houston-specific advice from Solivance Electric LLC.',
    url: `${siteConfig.domain}/blog`,
  },
};

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

export default function BlogPage() {
  return (
    <>
      {/* ── JSON-LD: BreadcrumbList ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteConfig.domain,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${siteConfig.domain}/blog`,
              },
            ],
          }),
        }}
      />

      {/* ── JSON-LD: ItemList (blog posts) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            'name': 'Commercial Electrical Blog — Southwest Houston, Heights, Bellaire, Memorial Villages',
            'description':
              'Commercial electrical guides, code notes, and Houston-specific field writeups from Solivance Electric LLC.',
            'url': `${siteConfig.domain}/blog`,
            'mainEntity': {
              '@type': 'ItemList',
              'itemListElement': blogPosts.map((post, i) => ({
                '@type': 'ListItem',
                'position': i + 1,
                'url': `${siteConfig.domain}/blog/${post.slug}`,
                'name': post.title,
              })),
            },
          }),
        }}
      />

      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos_new/subhero-blog.jpg"
            alt="Solivance Electric blog — commercial and residential electrical insights from Houston"
            fill
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2847]/95 via-[#0f2847]/80 to-[#0f2847]/55" />
        </div>
        <div className={`${shell} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-5 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.18em]">
            <ol className="flex items-center gap-2 text-white/55">
              <li><Link href="/" className="hover:text-[var(--onestop-gold)] transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/25">/</li>
              <li className="font-semibold text-white">Blog</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 font-[family-name:var(--font-app-mono)] text-[0.68rem] uppercase tracking-[0.24em] text-[var(--onestop-gold)]">
              <span className="h-px w-6 bg-[var(--onestop-gold)]" />
              Field Notes &amp; Guides
            </div>
            <h1 className="h-display text-white">
              Electrical Insights from Solivance Electric
            </h1>
            <p className="mt-5 text-[0.98rem] sm:text-base text-white/80 leading-[1.7]">
              Commercial electrical guides, cost breakdowns, and Houston-specific
              advice from the team at {siteConfig.businessName}.
            </p>
          </div>
        </div>
      </section>

      {/* ── Post Grid ── */}
      <section className="num-host py-16 sm:py-20 bg-white overflow-hidden">
        <div className="beam-layer beam-diagonal -top-16 -right-48 hidden md:block" aria-hidden />
        <div className={shell}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => {
              const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <article
                  key={post.slug}
                  className="group relative flex flex-col rounded-md bg-white overflow-hidden shadow-[inset_0_0_0_1px_rgba(15,40,71,0.08),0_1px_2px_rgba(15,40,71,0.04)] hover:shadow-[inset_0_0_0_1px_rgba(15,40,71,0.14),0_12px_28px_-10px_rgba(15,40,71,0.20)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Category badge */}
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--onestop-cream)] px-3 py-1 text-xs font-semibold text-[var(--onestop-navy-deep)] mb-4">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="font-[family-name:var(--font-app-display)] text-xl font-bold text-[var(--onestop-navy-deep)] mb-3 group-hover:text-[var(--onestop-gold)] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 relative">
                        {post.title}
                      </Link>
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                      {post.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-5">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formattedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Read more */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--onestop-gold)] group-hover:gap-2.5 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-12 sm:py-14">
        <div className="absolute inset-0">
          <Image
            src="/photos_new/cta-footer.jpg"
            alt="Solivance Electric Houston — call for a free commercial electrical quote"
            fill
            sizes="100vw"
            className="object-cover opacity-20 mix-blend-luminosity"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />
        <div className={`${shell} relative z-10`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Need a commercial electrician?</h2>
              <p className="mt-1 text-sm text-white/50">Licensed commercial electrical work across Southwest Houston, Heights, Bellaire &amp; Memorial Villages.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="btn-solid inline-flex items-center justify-center gap-2 rounded-md bg-[var(--onestop-red)] px-7 h-12 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#e55f15]"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="btn-ghost-dark inline-flex items-center justify-center gap-2 rounded-md px-7 h-12 text-[0.82rem] font-bold text-white font-[family-name:var(--font-app-mono)]"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
