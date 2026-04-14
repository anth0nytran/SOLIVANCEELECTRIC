import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MobileCTA } from "./components/MobileCTA";
import "./globals.css";

const bodyFont = Geist({
  variable: "--font-app-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const displayFont = Bricolage_Grotesque({
  variable: "--font-app-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-app-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://solivanceelectric.com'),
  title: {
    default: "Commercial Electrical Contractor | Houston TX",
    template: "%s | Solivance Electric LLC",
  },
  description: "Commercial electrical contractor in Houston TX. Panel upgrades, generator installs, parking lot lighting, EV chargers & more. Licensed & insured. 24hr emergency — (832) 965-9964.",
  keywords: [
    'commercial electrical contractor Houston TX',
    'panel upgrades Houston TX',
    'generator installation Houston TX',
    'parking lot lighting Houston TX',
    'EV charger installation Houston TX',
    'commercial warehouse electrical Houston TX',
    'pedestal installation Houston TX',
    'mobile home electrical connection Houston TX',
    'electrical contractor Sugar Land TX',
    'electrical contractor Richmond TX',
    'electrical contractor Katy TX',
    'electrical contractor Pearland TX',
    'electrical contractor Missouri City TX',
    'electrical contractor Stafford TX',
    'electrical contractor Rosenberg TX',
    'licensed electrician Houston TX',
    '24 hour emergency electrician Houston TX',
    'commercial electrician 77048',
    'business electrical services Houston TX',
    'corporate electrical contractor Houston TX',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Commercial Electrical Contractor in Houston TX | Solivance Electric LLC",
    description: "Panel upgrades, generator installs, parking lot lighting, EV chargers & commercial electrical services in Houston TX. Licensed & insured. 24hr emergency — (832) 965-9964.",
    url: 'https://solivanceelectric.com',
    siteName: 'Solivance Electric LLC',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/placeholder.svg',
        width: 1200,
        height: 630,
        alt: 'Solivance Electric LLC — Commercial Electrical Contractor in Houston TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premium Electrical Work. Done Right. | Solivance Electric LLC",
    description: "Commercial electrical contractor serving Houston, Sugar Land, Richmond, Katy, Pearland & surrounding TX. Licensed & insured. 24hr emergency service.",
    images: ['/placeholder.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/placeholder.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gscVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "ElectricalContractor"],
              "name": "Solivance Electric LLC",
              "image": "https://solivanceelectric.com/placeholder.svg",
              "@id": "https://solivanceelectric.com",
              "url": "https://solivanceelectric.com",
              "telephone": "+18329659964",
              "email": "service@solivanceelectric.com",
              "description": "Licensed and insured commercial electrical contractor serving Houston, Sugar Land, Richmond, Katy, Pearland, Missouri City, Stafford and Rosenberg TX. Panel upgrades, generator installs, parking lot lighting, EV chargers, commercial warehouses, pedestals and mobile home connections. 24hr emergency service.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Houston",
                "addressRegion": "TX",
                "postalCode": "77048",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.6163,
                "longitude": -95.3461
              },
              "areaServed": [
                { "@type": "City", "name": "Houston", "sameAs": "https://en.wikipedia.org/wiki/Houston" },
                { "@type": "City", "name": "Sugar Land" },
                { "@type": "City", "name": "Richmond" },
                { "@type": "City", "name": "Katy" },
                { "@type": "City", "name": "Pearland" },
                { "@type": "City", "name": "Missouri City" },
                { "@type": "City", "name": "Stafford" },
                { "@type": "City", "name": "Rosenberg" }
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "06:00",
                "closes": "18:00",
                "description": "Regular hours 6am–6pm Mon–Sat. 24hr emergency service available."
              },
              "priceRange": "$$",
              "knowsLanguage": ["en", "es"],
              "paymentAccepted": "Cash, Credit Card, Check, Zelle",
              "currenciesAccepted": "USD",
              "slogan": "Premium Electrical Work. Done Right.",
              "founder": {
                "@type": "Person",
                "name": "Jossue Molina"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Commercial Electrical Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Panel Upgrades", "description": "Commercial electrical panel upgrades and replacements for increased capacity, safety and code compliance" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Generator Installs", "description": "Standby and commercial generator installation, transfer switches and backup power systems" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Parking Lot Lighting", "description": "Commercial parking lot lighting design, installation, retrofit and LED upgrades for businesses and corporations" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EV Chargers", "description": "Commercial EV charging station installation, Level 2 and DC fast chargers for businesses and workplaces" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "New Commercial Warehouses", "description": "Ground-up commercial warehouse electrical installation, lighting, power distribution and service" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pedestals", "description": "RV, marina and commercial power pedestal installation and service" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile Home Connections", "description": "Mobile and manufactured home electrical service connections, meter loops and feeders" } }
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Solivance Electric LLC",
              "alternateName": ["Solivance Electric", "Solivance"],
              "url": "https://solivanceelectric.com"
            })
          }}
        />
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
        {gscVerification ? (
          <meta name="google-site-verification" content={gscVerification} />
        ) : null}
      </head>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} antialiased`}
      >
        <div className="onestop-site min-h-screen bg-white text-slate-900 selection:bg-[var(--onestop-navy)] selection:text-white">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <MobileCTA />
        </div>
      </body>
    </html>
  );
}
