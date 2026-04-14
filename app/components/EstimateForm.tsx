'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Phone, User, MapPin, ClipboardList, Lock, Calendar, Mail, Zap, Shield } from 'lucide-react';
import { siteConfig } from '../config';

export function EstimateForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [formTimestamp] = useState(() => Date.now().toString());
  const [phoneValue, setPhoneValue] = useState('');

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 10);
    if (!d.length) return '';
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setFormStatus('sending');
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (typeof window !== 'undefined') {
      fd.set('page', window.location.href);
    }
    if (String(fd.get('website') || '').trim()) { form.reset(); setPhoneValue(''); setFormStatus('success'); return; }
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) { setFormStatus('error'); setFormError(data?.error || 'Something went wrong.'); return; }
      form.reset(); setPhoneValue(''); setFormStatus('success');
    } catch { setFormStatus('error'); setFormError('Something went wrong. Please try again.'); }
  };

  const isDark = variant === 'dark';

  return (
    <div>
      <form className="grid gap-4 sm:gap-4.5" action="/api/lead" method="POST" onSubmit={handleSubmit}>
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input type="hidden" name="_ts" value={formTimestamp} />

        <div className="grid gap-4 sm:gap-4.5 sm:grid-cols-2">
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Full Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input required name="name" type="text" placeholder="John Doe" autoComplete="name" pattern="[A-Za-z\s\-']{2,50}" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm" />
            </div>
          </div>
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Phone Number <span className="text-red-500">*</span></label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input required name="phone" type="tel" placeholder="(832) 555-0123" autoComplete="tel" value={phoneValue} onChange={(e) => setPhoneValue(formatPhone(e.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-4.5 sm:grid-cols-2">
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Email <span className="text-red-500">*</span></label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input required name="email" type="email" placeholder="you@example.com" autoComplete="email" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm" />
            </div>
          </div>
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Street Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input required name="address" type="text" placeholder="123 Main St" autoComplete="street-address" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-4.5 sm:grid-cols-2">
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Preferred Date/Time Window <span className="text-red-500">*</span></label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <select required name="timeline" defaultValue="" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm appearance-none">
                <option value="" disabled>Select a window...</option>
                <option value="Morning (8am-12pm)">Morning (8am-12pm)</option>
                <option value="Afternoon (12pm-5pm)">Afternoon (12pm-5pm)</option>
                <option value="Evening (5pm-8pm)">Evening (5pm-8pm)</option>
                <option value="ASAP / Emergency">ASAP / Emergency</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Urgency <span className="text-red-500">*</span></label>
            <div className="relative">
              <Zap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <select required name="urgency" defaultValue="" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm appearance-none">
                <option value="" disabled>Select urgency...</option>
                <option value="Emergency — now">Emergency — now</option>
                <option value="Within 24 hours">Within 24 hours</option>
                <option value="This week">This week</option>
                <option value="This month">This month</option>
                <option value="Just exploring">Just exploring</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Type of Service Needed <span className="text-red-500">*</span></label>
          <div className="relative">
            <ClipboardList className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select required name="service" defaultValue="" className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-base text-slate-900 outline-none transition-all focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm appearance-none">
              <option value="" disabled>Select a service...</option>
              {[siteConfig.primaryService, ...siteConfig.services].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`}>Project Details <span className={`font-normal normal-case tracking-normal ${isDark ? 'text-white/30' : 'text-slate-400'}`}>(Optional)</span></label>
          <textarea name="message" rows={3} maxLength={5000} placeholder="Scope of work, site access notes, equipment specs, or any specific concerns..." className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 shadow-sm min-h-[80px] resize-y" />
        </div>

        <div className="pt-2">
          <button type="submit" disabled={formStatus === 'sending'} className="relative w-full overflow-hidden rounded-lg bg-[var(--onestop-red)] py-4 text-[0.85rem] font-bold uppercase tracking-[0.15em] text-white shadow-lg transition-all hover:bg-[var(--onestop-navy-deep)] active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 group">
            <span className="relative z-10 flex items-center justify-center gap-2">
              {formStatus === 'sending' ? 'Processing...' : 'Get Your Free Quote'}
              {formStatus !== 'sending' && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </span>
          </button>

          <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-slate-400 font-medium px-2">
            By clicking request, you agree to receive SMS or emails from Solivance Electric LLC containing details for this quote and related electrical services. Message &amp; data rates may apply. You can reply STOP to opt-out.
          </p>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-[var(--onestop-navy)]/70">
            <Lock className="h-3 w-3" />
            <span>100% Secure &amp; Confidential</span>
          </div>
        </div>

        {formStatus === 'success' && <div role="status" aria-live="polite" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 font-medium">Got it — Solivance Electric will be in touch shortly to confirm your free quote.</div>}
        {formStatus === 'error' && <div role="alert" aria-live="assertive" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 font-medium">{formError || `Something went wrong. Please call ${siteConfig.phone} and we'll help directly.`}</div>}
      </form>

      <div className="mt-5 flex items-center justify-center gap-3 text-xs text-slate-400">
        <Shield className="h-3.5 w-3.5 text-[var(--onestop-navy)]/60" />
        <span className="font-bold text-slate-600">Licensed &amp; Insured</span>
        <span>|</span>
        <span>24/7 Emergency Service</span>
      </div>
    </div>
  );
}
