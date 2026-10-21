import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { LpTracking } from './LpTracking';

// Paid landing pages: not for organic search, and the ONLY place Google Tag
// Manager loads. The Google Ads tag must live in GTM alone — never also
// hardcoded — so each conversion is sent exactly one way.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Consent Mode v2 defaults, set before GTM loads. Ads/analytics storage is on
// unless the visitor chose "Essential only" on the cookie banner or sends a
// Global Privacy Control signal. LpTracking pushes updates if they change it.
const bootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var c = null; try { c = localStorage.getItem('solivance-consent-v1'); } catch (e) {}
var denied = c === 'declined' || (c !== 'accepted' && navigator.globalPrivacyControl === true);
var v = denied ? 'denied' : 'granted';
gtag('consent', 'default', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
${
  GTM_ID
    ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});`
    : ''
}`;

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script id="lp-gtm" strategy="afterInteractive">
        {bootstrap}
      </Script>
      {GTM_ID ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="gtm"
          />
        </noscript>
      ) : null}
      <LpTracking />
      {children}
    </>
  );
}
