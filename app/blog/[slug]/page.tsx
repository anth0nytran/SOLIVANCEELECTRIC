import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts, getPostBySlug, getAllSlugs } from '../posts';
import { siteConfig } from '../../config';

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

/* ── Static params for all slugs ── */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ── Dynamic metadata per post ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://onestopoutdoorconstruction.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['One Stop Outdoor Construction'],
      siteName: 'One Stop Outdoor Construction',
      images: [{ url: '/hero.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/hero.png'],
    },
  };
}

/* ── Page component ── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <section className="py-32 text-center">
        <div className={shell}>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-slate-500 mb-8">The blog post you are looking for does not exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--onestop-gold)] font-semibold hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  /* Related posts: same category first, then most recent, excluding current */
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1;
      if (b.category === post.category && a.category !== post.category) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

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
                item: 'https://onestopoutdoorconstruction.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://onestopoutdoorconstruction.com/blog',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://onestopoutdoorconstruction.com/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />

      {/* ── JSON-LD: Article ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              '@type': 'Organization',
              name: 'One Stop Outdoor Construction',
              url: 'https://onestopoutdoorconstruction.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'One Stop Outdoor Construction',
              url: 'https://onestopoutdoorconstruction.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://onestopoutdoorconstruction.com/hero.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://onestopoutdoorconstruction.com/blog/${post.slug}`,
            },
            keywords: post.keywords.join(', '),
          }),
        }}
      />

      {/* ── JSON-LD: FAQPage ── */}
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      )}

      {/* ── Hero ── */}
      <section className="bg-[var(--onestop-cream)] py-14 sm:py-18">
        <div className={shell}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-[var(--onestop-navy-deep)] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-[var(--onestop-navy-deep)] transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[var(--onestop-navy-deep)] line-clamp-1">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Category */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[var(--onestop-navy-deep)] mb-5">
            <Tag className="h-3 w-3" />
            {post.category}
          </span>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-app-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--onestop-navy-deep)] mb-5 max-w-4xl leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="text-slate-400">By {siteConfig.businessName}</span>
          </div>
        </div>
      </section>

      {/* ── Article Content ── */}
      <section className="py-14 sm:py-18 bg-white">
        <div className={shell}>
          <div className="max-w-3xl">
            <article
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* ── Related Posts ── */}
      <section className="bg-slate-50 py-14 sm:py-18 border-t border-slate-200">
        <div className={shell}>
          <h2 className="font-[family-name:var(--font-app-display)] text-2xl sm:text-3xl font-bold text-[var(--onestop-navy-deep)] mb-8">
            More from Our Blog
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => {
              const relDate = new Date(related.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
              return (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--onestop-cream)] px-2.5 py-0.5 text-xs font-semibold text-[var(--onestop-navy-deep)] mb-3">
                    <Tag className="h-3 w-3" />
                    {related.category}
                  </span>
                  <h3 className="font-[family-name:var(--font-app-display)] text-lg font-bold text-[var(--onestop-navy-deep)] group-hover:text-[var(--onestop-gold)] transition-colors leading-snug mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                    {related.description}
                  </p>
                  <span className="text-xs text-slate-400">{relDate} &middot; {related.readTime}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--onestop-gold)] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-16 sm:py-20">
        <div className="absolute inset-0">
          <Image
            src="/facebook/filler2.jpg"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
           
            className="object-cover opacity-20 mix-blend-luminosity"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />
        <div className={`${shell} relative z-10 text-center`}>
          <h2 className="font-[family-name:var(--font-app-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Book a Consultation?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            {siteConfig.businessName} serves Richmond, Katy, Houston, Sugar Land,
            Rosenberg, and surrounding areas. Quality craftsmanship and fair pricing — call us or book your consultation online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--onestop-red)] px-7 py-3.5 font-semibold text-white shadow-lg hover:brightness-110 transition"
            >
              Book Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.cleanPhone}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-7 py-3.5 font-semibold text-white hover:bg-white/10 transition"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
