import { Phone } from 'lucide-react';
import { siteConfig } from '../config';

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/30">Contact</span>
      <a
        href={`tel:${siteConfig.cleanPhone}`}
        aria-label={`Call ${siteConfig.businessName}`}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold text-white/70 hover:border-white/30 hover:text-white transition-all"
      >
        <Phone className="h-3.5 w-3.5" />
        {siteConfig.phone}
      </a>
    </div>
  );
}
