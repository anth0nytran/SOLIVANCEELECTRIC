'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, User, MapPin, ClipboardList, Lock, Calendar, Clock, Mail, Zap, Shield, CheckCircle2, AlertTriangle } from 'lucide-react';
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
  const labelCls = `block text-[0.68rem] font-bold mb-1 uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-slate-700'}`;
  const inputCls = "w-full rounded-md border border-slate-300 bg-slate-50 pl-9 pr-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20";
  const iconCls = "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {formStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          >
            <div className="bg-[var(--onestop-navy)] px-5 pt-6 pb-5 text-center border-b-4 border-[var(--onestop-red)]">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-4 ring-white/20 mb-2.5"
              >
                <CheckCircle2 className="h-7 w-7 text-emerald-300" />
              </motion.div>
              <motion.h3 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-lg font-extrabold text-white leading-tight">
                Thanks for your request
              </motion.h3>
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="mt-1.5 text-[0.82rem] text-white/85 leading-relaxed">
                Keep your phone nearby — our team will be reaching out ASAP.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="p-4 space-y-2.5">
              <p className="text-center text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">Rather reach us now?</p>
              <a href={`tel:${siteConfig.cleanPhone}`} className="flex items-center justify-center gap-2 w-full rounded-md bg-[var(--onestop-red)] py-2.5 text-white font-bold text-[0.8rem] uppercase tracking-wider hover:bg-[var(--onestop-navy-deep)] transition shadow">
                <Phone className="h-3.5 w-3.5" /> Call {siteConfig.phone}
              </a>
              <a href={`tel:${siteConfig.cleanPhone}`} className="flex items-center gap-2.5 w-full rounded-md border border-[var(--onestop-red)]/30 bg-rose-50 px-3 py-2 hover:bg-rose-100 transition">
                <AlertTriangle className="h-4 w-4 text-[var(--onestop-red)] shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[0.62rem] font-extrabold uppercase tracking-widest text-[var(--onestop-red)]">24/7 Emergency Service</div>
                  <div className="text-[0.78rem] font-bold text-slate-800">Also call {siteConfig.phone}</div>
                </div>
              </a>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="grid gap-2.5"
            action="/api/lead"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <input type="hidden" name="_ts" value={formTimestamp} />

            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User className={iconCls} />
                  <input required name="name" type="text" placeholder="John Doe" autoComplete="name" pattern="[A-Za-z\s\-']{2,50}" className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Phone <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className={iconCls} />
                  <input required name="phone" type="tel" placeholder="(832) 555-0123" autoComplete="tel" value={phoneValue} onChange={(e) => setPhoneValue(formatPhone(e.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" className={inputCls} />
                </div>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail className={iconCls} />
                  <input required name="email" type="email" placeholder="you@example.com" autoComplete="email" className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Street Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin className={iconCls} />
                  <input required name="address" type="text" placeholder="123 Main St" autoComplete="street-address" className={inputCls} />
                </div>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Preferred Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Calendar className={iconCls} />
                  <input required name="preferredDate" type="date" min={new Date().toISOString().split('T')[0]} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Time Window <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Clock className={iconCls} />
                  <select required name="timeWindow" defaultValue="" className={`${inputCls} appearance-none`}>
                    <option value="" disabled>Pick a window...</option>
                    <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
                    <option value="Afternoon (12pm–5pm)">Afternoon (12pm–5pm)</option>
                    <option value="After hours (5pm–8pm)">After hours (5pm–8pm)</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Urgency <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Zap className={iconCls} />
                  <select required name="urgency" defaultValue="" className={`${inputCls} appearance-none`}>
                    <option value="" disabled>Select urgency...</option>
                    <option value="Emergency — now">Emergency — now</option>
                    <option value="Within 24 hours">Within 24 hours</option>
                    <option value="This week">This week</option>
                    <option value="This month">This month</option>
                    <option value="Just getting a number">Just getting a number</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Service Needed <span className="text-red-500">*</span></label>
                <div className="relative">
                  <ClipboardList className={iconCls} />
                  <select required name="service" defaultValue="" className={`${inputCls} appearance-none`}>
                    <option value="" disabled>Select service...</option>
                    {[siteConfig.primaryService, ...siteConfig.services].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className={labelCls}>Project Details <span className={`font-normal normal-case tracking-normal ${isDark ? 'text-white/30' : 'text-slate-400'}`}>(Optional)</span></label>
              <textarea name="message" rows={2} maxLength={5000} placeholder="Scope of work, site access notes, or specific concerns..." className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:border-[var(--onestop-navy)] focus:ring-2 focus:ring-[var(--onestop-navy)]/20 resize-none" />
            </div>

            <label className="flex items-start gap-2 cursor-pointer border border-slate-200 bg-slate-50 rounded-md px-2.5 py-2">
              <input type="checkbox" name="sms_consent" value="yes" className="mt-0.5 h-3.5 w-3.5 shrink-0 border-slate-300 text-[var(--onestop-navy)] focus:ring-1 focus:ring-[var(--onestop-navy)] rounded-sm" />
              <span className="text-[0.62rem] leading-[1.45] text-slate-600">
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>SMS consent (optional).</span> Receive texts from Solivance Electric LLC about your quote &amp; scheduling. 1–5 msgs/request. Msg &amp; data rates apply. Reply STOP to opt out. See <a href="/privacy" className="underline hover:text-[var(--onestop-red)]">Privacy</a> &amp; <a href="/terms" className="underline hover:text-[var(--onestop-red)]">Terms</a>.
              </span>
            </label>

            <div className="pt-1">
              <button type="submit" disabled={formStatus === 'sending'} className="relative w-full rounded-md bg-[var(--onestop-red)] py-3 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white shadow transition hover:bg-[var(--onestop-navy-deep)] active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 group">
                <span className="flex items-center justify-center gap-2">
                  {formStatus === 'sending' ? 'Sending…' : 'Get Your Free Quote'}
                  {formStatus !== 'sending' && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />}
                </span>
              </button>

              <div className="mt-2 flex items-center justify-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-widest text-[var(--onestop-navy)]/70">
                <Lock className="h-2.5 w-2.5" />
                <span>100% Secure &amp; Confidential</span>
              </div>
            </div>

            {formStatus === 'error' && <div role="alert" aria-live="assertive" className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800 font-medium">{formError || `Something went wrong. Please call ${siteConfig.phone}.`}</div>}
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-3 flex items-center justify-center gap-2.5 text-[0.68rem] text-slate-400">
        <Shield className="h-3 w-3 text-[var(--onestop-navy)]/60" />
        <span className="font-bold text-slate-600">Licensed &amp; Insured</span>
        <span>|</span>
        <span>24/7 Emergency</span>
      </div>
    </div>
  );
}
