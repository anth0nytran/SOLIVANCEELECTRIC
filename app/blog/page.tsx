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
  alternates: { canonical: '/blog' },
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
            'name': 'Commercial Electrical Blog — Houston, Sugar Land, Richmond, Katy',
            'description':
              'Expert commercial electrical guides and Houston-specific advice from Solivance Electric LLC.',
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
      <section className="bg-[var(--onestop-cream)] py-14 sm:py-18">
        <div className={shell}>
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-slate-400">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-[var(--onestop-navy-deep)] transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[var(--onestop-navy-deep)]">Blog</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--onestop-navy-deep)] leading-tight">
              Electrical Insights from Solivance Electric
            </h1>
            <p className="mt-3 text-base text-slate-500 leading-relaxed">
              Commercial electrical guides, cost breakdowns, and Houston-specific
              advice from the team at {siteConfig.businessName}.
            </p>
          </div>
        </div>
      </section>

      {/* ── Post Grid ── */}
      <section className="py-16 sm:py-20 bg-white">
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
                  className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
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
            src="/placeholder.svg"
            alt=""
            aria-hidden
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
              <p className="mt-1 text-sm text-white/50">Licensed electrical work for Houston, Sugar Land, Richmond, Katy &amp; beyond.</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--onestop-red)] px-6 py-3 text-sm font-bold text-white hover:brightness-110 transition"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-bold text-white hover:bg-white/5 transition"
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
