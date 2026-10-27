import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { LpTracking } from './LpTracking';
import { ADS_DIRECT, GOOGLE_ADS_ID, GTM_ID } from './_panel/googleAds';

// Paid landing pages: not for organic search, and the ONLY place the Google
// Ads tag loads — through GTM, or directly when there's no container (see
// ./_panel/googleAds), never both.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

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
}
${ADS_DIRECT ? `gtag('js', new Date()); gtag('config', ${JSON.stringify(GOOGLE_ADS_ID)});` : ''}`;

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script id="lp-gtm" strategy="afterInteractive">
        {bootstrap}
      </Script>
      {ADS_DIRECT ? (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
      ) : null}
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
