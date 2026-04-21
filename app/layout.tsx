import type { Metadata, Viewport } from "next";
import { Geist, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MobileCTA } from "./components/MobileCTA";
import { IntroVideo } from "./components/IntroVideo";
import { reviews, reviewStats } from "./reviews";
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
    default: "Southwest Houston Commercial & Residential Electrician · Heights · Memorial Villages",
    template: "%s | Solivance Electric LLC",
  },
  description: "Licensed commercial & residential electrician based on S Post Oak Rd (77045). Panel upgrades, standby generators, parking-lot lighting, EV chargers, and warehouse builds across Southwest Houston, the Heights, Bellaire, and the Memorial Villages. 24hr emergency — (832) 965-9964.",
  keywords: [
    'commercial electrician Southwest Houston',
    'commercial electrician Bellaire TX',
    'commercial electrician Houston Heights',
    'residential electrician Memorial Villages',
    'panel upgrade Bellaire TX',
    'standby generator Memorial Villages',
    'EV charger installer Houston',
    'warehouse electrician Southwest Houston',
    'licensed electrician 77045',
    '24 hour emergency electrician Houston',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Southwest Houston Electrician — Heights · Bellaire · Memorial Villages | Solivance Electric LLC",
    description: "Based on S Post Oak Rd (77045). Commercial & residential panel upgrades, standby generators, parking-lot lighting, EV chargers, warehouse builds across Southwest Houston, the Heights, Bellaire, and the Memorial Villages. Licensed & insured. 24hr emergency — (832) 965-9964.",
    url: 'https://solivanceelectric.com',
    siteName: 'Solivance Electric LLC',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Solivance Electric LLC — Southwest Houston Electrician · Heights · Memorial Villages',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Solivance Electric — Southwest Houston's Electrician. Done Right the First Time.",
    description: "Licensed Texas electrical contractor based on S Post Oak Rd (77045). Southwest Houston · Heights · Memorial Villages · Bellaire. 24hr emergency service.",
    images: ['/og-image.jpg'],
  },
  authors: [{ name: 'Solivance Electric LLC', url: 'https://solivanceelectric.com' }],
  creator: 'Solivance Electric LLC',
  publisher: 'Solivance Electric LLC',
  category: 'Electrical Contractor',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0f2847',
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
              "image": "https://solivanceelectric.com/og-image.jpg",
              "logo": "https://solivanceelectric.com/logo/logo_horzontial.PNG",
              "@id": "https://solivanceelectric.com",
              "url": "https://solivanceelectric.com",
              "telephone": "+18329659964",
              "email": "service@solivanceelectric.com",
              "description": "Licensed commercial & residential electrical contractor based on S Post Oak Rd (77045). Daily service across Southwest Houston, the Heights, Bellaire, and the Memorial Villages. Panel upgrades, standby generator installs, parking-lot lighting, EV chargers, warehouse electrical, RV park pedestals, and mobile home connections. 24-hour emergency response.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "13035 S Post Oak Rd Suite I",
                "addressLocality": "Houston",
                "addressRegion": "TX",
                "postalCode": "77045",
                "addressCountry": "US"
              },
              "hasMap": "https://www.google.com/maps/search/?api=1&query=13035+S+Post+Oak+Rd+Suite+I+Houston+TX+77045",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.6310,
                "longitude": -95.4438
              },
              "areaServed": [
                { "@type": "Place", "name": "Southwest Houston" },
                { "@type": "Place", "name": "Houston Heights" },
                { "@type": "Place", "name": "Memorial Villages" },
                { "@type": "City", "name": "Bellaire", "sameAs": "https://en.wikipedia.org/wiki/Bellaire,_Texas" },
                { "@type": "City", "name": "West University Place", "sameAs": "https://en.wikipedia.org/wiki/West_University_Place,_Texas" },
                { "@type": "City", "name": "Houston", "sameAs": "https://en.wikipedia.org/wiki/Houston" }
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
              "slogan": "Commercial Electrical. Done Right the First Time.",
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "license",
                "name": "Texas State Electrical Contractor License",
                "recognizedBy": { "@type": "State", "name": "Texas" }
              },
              "sameAs": [
                "https://share.google/Qf4euLHsfdyaZ2b6U",
                "https://www.thumbtack.com/tx/houston/electrical-repairs/solivance-electric/service/480274825210142737",
                "https://www.yelp.com/biz/solivance-electric-houston",
                "https://www.bizapedia.com/tx/solivance-electric-llc.html",
                "https://www.instagram.com/solivance_electric"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": reviewStats.average.toFixed(1),
                "reviewCount": reviewStats.count,
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": reviews.map((r) => ({
                "@type": "Review",
                "author": { "@type": "Person", "name": r.author },
                "datePublished": r.date,
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": r.stars,
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "publisher": { "@type": "Organization", "name": r.source },
                "reviewBody": r.quote
              })),
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Commercial Electrical Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Panel Upgrades", "description": "Commercial electrical panel upgrades and replacements for increased capacity, safety and code compliance" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Generator Installs", "description": "Standby and commercial generator installation, transfer switches and backup power systems" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Parking Lot Lighting", "description": "Commercial parking lot lighting design, installation, retrofit and LED upgrades for businesses and corporations" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EV Chargers", "description": "Commercial EV charging station installation, Level 2 and DC fast chargers for businesses and workplaces" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "New Commercial Warehouses", "description": "Ground-up commercial warehouse electrical installation, lighting, power distribution and service" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "New Home Builds", "description": "Ground-up electrical for custom single-family homes, spec builds, and small-to-mid multi-family" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "New Commercial & Shopping Centers", "description": "Ground-up electrical for retail pads, strip centers, mixed-use, and shopping-center developments" } },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://solivanceelectric.com/#organization",
              "name": "Solivance Electric LLC",
              "alternateName": ["Solivance Electric", "Solivance"],
              "url": "https://solivanceelectric.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://solivanceelectric.com/logo/logo_horzontial.PNG",
                "width": 600,
                "height": 400
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+18329659964",
                "contactType": "customer service",
                "email": "service@solivanceelectric.com",
                "areaServed": "US-TX",
                "availableLanguage": ["English", "Spanish"]
              },
              "sameAs": [
                "https://share.google/Qf4euLHsfdyaZ2b6U",
                "https://www.thumbtack.com/tx/houston/electrical-repairs/solivance-electric/service/480274825210142737",
                "https://www.yelp.com/biz/solivance-electric-houston",
                "https://www.bizapedia.com/tx/solivance-electric-llc.html",
                "https://www.instagram.com/solivance_electric"
              ]
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
        <IntroVideo />
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
