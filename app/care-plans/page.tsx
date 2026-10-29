import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, ClipboardList, HardHat, House, Mail, Phone, ShieldCheck, Tag } from 'lucide-react';
import { siteConfig } from '../config';
import { CarePlanPicker } from '../components/CarePlanPicker';
import { carePlanFinePrint, getCarePlan } from '../carePlans';

// Mirrors the client's membership flyer: blue hero, three plan cards, how it
// works, contact band, fine print. Copy and prices come from that flyer.

export const metadata: Metadata = {
  title: 'Solivance Care Plan — Basic, Plus & Commercial Electrical Memberships',
  description: `Electrical peace of mind for your home or business. Basic $199/yr, Plus $299/yr, Commercial $1,495/yr per site. ${siteConfig.businessName}, ${siteConfig.license.label}.`,
  alternates: { canonical: '/care-plans' },
};

const BENEFITS = [
  { icon: ShieldCheck, text: 'Yearly safety inspection' },
  { icon: CalendarDays, text: 'Priority scheduling' },
  { icon: Tag, text: 'Member discounts' },
];

const STEPS = [
  { icon: ClipboardList, title: 'Sign up', body: 'Pay the year and get inspected right away, or pay monthly.' },
  { icon: CalendarDays, title: 'We schedule', body: 'We call you to book your yearly inspection.' },
  { icon: HardHat, title: 'Inspect & report', body: 'A licensed electrician checks your system and explains the results.' },
  { icon: House, title: 'Save all year', body: 'Priority service and member pricing on repairs.' },
];

const shell = 'mx-auto w-full max-w-6xl px-5 sm:px-8';

export default async function CarePlansPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const initial = getCarePlan((await searchParams).plan)?.id;

  return (
    <div className="bg-[#F4F7FB] text-[#0B1F3F]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B4EA2] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" aria-hidden>
          <Image src="/photos_new/soffit-lighting.jpg" alt="" fill priority sizes="46vw" className="object-cover object-[75%_75%]" />
        </div>
        <div className={`${shell} relative py-12 sm:py-16 lg:py-20`}>
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.88rem] text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2 text-white/40" aria-hidden>/</span>
            <span className="text-white">Care Plans</span>
          </nav>
          <p className="text-[0.95rem] font-semibold text-white/85">
            {siteConfig.license.label} · Licensed · Insured · Local
          </p>
          <h1 className="mt-3 max-w-[38rem] font-[family-name:var(--font-app-display)] text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-[4rem] lg:text-[4.5rem]">
            Solivance Care Plan
          </h1>
          <p className="mt-4 max-w-[34rem] text-[1.2rem] leading-snug text-white/90 sm:text-[1.45rem]">
            Electrical peace of mind for your home or business.
          </p>
          <ul className="mt-8 grid max-w-[38rem] gap-4 sm:grid-cols-3 sm:gap-6">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[1.05rem] font-medium leading-tight">
                <Icon className="h-9 w-9 shrink-0" strokeWidth={1.6} aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="scroll-mt-24 py-12 sm:py-16">
        <div className={shell}>
          <CarePlanPicker initial={initial} />
        </div>
      </section>

      {/* How it works */}
      <section className="pb-12 sm:pb-16">
        <div className={shell}>
          <h2 className="font-[family-name:var(--font-app-display)] text-[2rem] font-extrabold tracking-[-0.02em] sm:text-[2.4rem]">How it works</h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="relative">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B4EA2] font-[family-name:var(--font-app-display)] text-[1.35rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon className="h-10 w-10 text-[#0B1F3F]" strokeWidth={1.5} aria-hidden />
                  {i < STEPS.length - 1 && (
                    <ArrowRight className="ml-auto hidden h-6 w-6 text-[#9DB3CF] lg:block" aria-hidden />
                  )}
                </div>
                <h3 className="mt-4 text-[1.3rem] font-bold">{title}</h3>
                <p className="mt-1.5 text-[1.02rem] leading-snug text-[#3E4E63]">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact band */}
      <section className="pb-8">
        <div className={shell}>
          <div className="flex flex-col gap-6 rounded-2xl bg-[#0B4EA2] px-5 py-7 text-white sm:px-8 md:flex-row md:items-center md:justify-between md:gap-10">
            <a href={`tel:${siteConfig.cleanPhone}`} className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/90">
                <Phone className="h-6 w-6" aria-hidden />
              </span>
              <span>
                <span className="block text-[1.05rem] font-semibold">Ask your technician or call to join.</span>
                <span className="block font-[family-name:var(--font-app-display)] whitespace-nowrap text-[1.5rem] min-[400px]:text-[1.75rem] font-extrabold leading-tight tracking-[-0.01em] sm:text-[2.4rem]">{siteConfig.phone}</span>
              </span>
            </a>
            <span className="hidden h-16 w-px bg-white/30 md:block" aria-hidden />
            <a href={`mailto:${siteConfig.email}`} className="flex min-w-0 items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/90">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 text-[0.84rem] [overflow-wrap:anywhere] min-[400px]:text-[0.95rem] sm:text-[1.15rem]">{siteConfig.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Fine print */}
      <section className="pb-14">
        <p className={`${shell} text-[0.82rem] leading-[1.55] text-[#5A6B80]`}>{carePlanFinePrint}</p>
      </section>
    </div>
  );
}
