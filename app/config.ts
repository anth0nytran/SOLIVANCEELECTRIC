export const siteConfig = {
  businessName: 'Solivance Electric LLC',
  ownerName: 'Jossue Molina',
  phone: '(832) 965-9964',
  cleanPhone: '+18329659964',
  email: 'service@solivanceelectric.com',
  domain: 'https://solivanceelectric.com',
  primaryService: 'Panel Upgrades',
  services: [
    'Generator Installs',
    'Parking Lot Lighting',
    'EV Chargers',
    'New Commercial Warehouses',
    'Pedestals',
    'Mobile Home Connections',
  ],
  rating: 5.0,
  reviewCount: 0,
  yearsInBusiness: 10,
  hours: '6am–6pm · 24hr Emergency',
  slogan: 'Premium Electrical Work. Done Right.',
  serviceAreas: ['Houston', 'Sugar Land', 'Richmond', 'Katy', 'Pearland'],
  allServiceAreas: [
    'Houston, TX', 'Sugar Land, TX', 'Richmond, TX', 'Katy, TX',
    'Pearland, TX', 'Missouri City, TX', 'Stafford, TX', 'Rosenberg, TX',
    'Fulshear, TX', 'Cinco Ranch, TX', 'Greatwood, TX', 'Pecan Grove, TX',
  ],
  neighborhoods: '',
  zipCodes: ['77048', '77407', '77478', '77493', '77471'],
  testimonials: [] as { quote: string; name: string; stars: number }[],
  faqs: [
    { q: 'Do you service commercial and industrial clients?', a: 'Yes. Solivance Electric LLC specializes in commercial and industrial electrical work — business owners, property managers, and large corporations are our ideal clients. From panel upgrades to new commercial warehouse builds, we handle it all.' },
    { q: 'What areas do you serve?', a: 'We serve Houston (77048), Sugar Land, Richmond, Katy, Pearland, Missouri City, and surrounding Texas communities. If you are not sure whether your location is covered, just call — we probably do.' },
    { q: 'Do you offer 24-hour emergency service?', a: 'Yes. Our standard hours are 6am–6pm, but we provide 24-hour emergency electrical service for urgent commercial and residential issues. Call (832) 965-9964 any time.' },
    { q: 'Are you licensed and insured?', a: 'Yes — Solivance Electric LLC is a fully licensed Texas electrical contractor with comprehensive liability insurance. Every job is covered from start to finish.' },
    { q: 'What services do you specialize in?', a: 'Our top services are panel upgrades, generator installs, parking lot lighting, EV chargers, new commercial warehouse wiring, pedestals, and mobile home connections. We focus on quality work done right the first time.' },
    { q: 'Do you install EV chargers for commercial properties?', a: 'Absolutely. We install Level 2 and Level 3 EV chargers for commercial lots, office parks, apartment complexes, and fleet facilities across the Houston metro area.' },
    { q: 'How quickly can you start a project?', a: 'Scheduling varies by scope, but most estimates are returned within 24 hours and most projects can start within 1–2 weeks of approval. Emergency work is prioritized.' },
  ],
};

export interface ServiceItem {
  slug: string;
  title: string;
  media: { type: 'image' | 'video'; src: string }[];
  summary: string;
  details: string[];
  turnaround: string;
  longDescription: string;
  keywords: string[];
}

const PLACEHOLDER = '/placeholder.svg';

export const serviceData: ServiceItem[] = [
  {
    slug: 'panel-upgrades',
    title: 'Panel Upgrades',
    media: [
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
    ],
    summary: 'Modern, code-compliant electrical panel upgrades for commercial buildings and residential properties — increased capacity, safer operation.',
    details: [
      '100A, 200A, 400A and higher service upgrades',
      'Meter and main breaker replacement',
      'Full code compliance and permit handling',
      'Minimal downtime scheduling for businesses',
    ],
    turnaround: 'Most upgrades completed in 1–2 days',
    longDescription: 'Outdated panels cause flickering lights, tripped breakers, and real fire risk. Solivance Electric handles complete panel upgrades for commercial, industrial, and high-end residential properties — increasing capacity, meeting the latest NEC code, and keeping downtime to a minimum. Our team pulls permits, coordinates inspections, and leaves the space cleaner than we found it.',
    keywords: ['panel upgrade Houston TX', 'electrical panel replacement Sugar Land', 'commercial panel upgrade Richmond TX', '200 amp service upgrade Katy'],
  },
  {
    slug: 'generator-installs',
    title: 'Generator Installs',
    media: [
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
    ],
    summary: 'Standby and whole-facility generator installation — keep operations running through outages with transfer switches sized for your load.',
    details: [
      'Commercial standby generator installation',
      'Automatic transfer switches (ATS)',
      'Load calculations and fuel planning',
      'Annual maintenance and service contracts',
    ],
    turnaround: 'Typical install in 2–5 days',
    longDescription: 'When the grid drops, your business should not. We install standby and whole-facility generators for warehouses, medical offices, retail, and high-end homes throughout the Houston metro. Every install includes proper load calculation, transfer switch sizing, fuel planning, and the permits to back it up.',
    keywords: ['generator installation Houston TX', 'commercial generator Sugar Land', 'standby generator Richmond TX', 'backup generator Katy'],
  },
  {
    slug: 'parking-lot-lighting',
    title: 'Parking Lot Lighting',
    media: [
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
    ],
    summary: 'LED parking lot lighting installation, retrofit, and repair — better visibility, lower energy bills, happier tenants.',
    details: [
      'LED pole and shoebox fixture installation',
      'Photocell and timer controls',
      'Energy-efficient retrofit of existing fixtures',
      'Trenching, conduit, and underground feeders',
    ],
    turnaround: 'Most lots completed in 3–7 days',
    longDescription: 'Dark parking lots are a liability. We design and install LED parking lot lighting that improves safety, tenant satisfaction, and energy costs — from single-pole retrofits to full-site ground-up builds. All work is engineered for photometric coverage and code compliance.',
    keywords: ['parking lot lighting Houston TX', 'LED parking lights Sugar Land', 'commercial lighting Richmond TX', 'pole lighting installation Katy'],
  },
  {
    slug: 'ev-chargers',
    title: 'EV Chargers',
    media: [
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
    ],
    summary: 'Level 2 and DC fast-charging EV infrastructure for commercial lots, fleets, apartments, and premium homes.',
    details: [
      'Level 2 and Level 3 (DCFC) installation',
      'Fleet and multi-unit deployments',
      'Load management and submetering',
      'Make-ready infrastructure for future expansion',
    ],
    turnaround: 'Single-station installs in 1 day',
    longDescription: 'EV charging is no longer optional — your tenants, customers, and fleet need it. Solivance Electric designs and installs Level 2 and DC fast-charging systems across commercial and residential properties, including load management, submetering, and make-ready infrastructure so you can scale without tearing it all out later.',
    keywords: ['EV charger installation Houston TX', 'commercial EV charging Sugar Land', 'Level 2 charger Richmond TX', 'Tesla charger install Katy'],
  },
  {
    slug: 'commercial-warehouses',
    title: 'New Commercial Warehouses',
    media: [
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
    ],
    summary: 'Ground-up electrical for new commercial warehouses — service entrance, distribution, lighting, and power to spec.',
    details: [
      'Full electrical design-build for warehouses',
      'Service entrance, switchgear, and distribution',
      'High-bay LED lighting layouts',
      'Power for equipment, docks, and office build-outs',
    ],
    turnaround: 'Scoped per project',
    longDescription: 'New commercial warehouse construction demands a contractor that understands both code and operations. We handle the complete electrical scope — service entrance, switchgear, feeder runs, high-bay LED lighting, dock power, office build-out, and everything in between — delivered on the GC’s timeline.',
    keywords: ['warehouse electrical contractor Houston TX', 'commercial electrical Sugar Land', 'new construction electrician Richmond TX', 'industrial electrician Katy'],
  },
  {
    slug: 'pedestals',
    title: 'Pedestals',
    media: [
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
    ],
    summary: 'RV park, mobile home park, and temporary service pedestals — installed to utility and code spec.',
    details: [
      'RV and mobile home park pedestals',
      'Temporary service pedestals for jobsites',
      '30A, 50A, and 100A configurations',
      'Utility coordination and inspection pass-through',
    ],
    turnaround: 'Typical install in 1–2 days',
    longDescription: 'Whether it’s a new RV park bay, a mobile home lot, or a temporary jobsite feed, we install pedestals that pass utility inspection the first time. Clean trenching, proper grounding, weather-rated enclosures — no callbacks.',
    keywords: ['pedestal installation Houston TX', 'RV pedestal Sugar Land', 'temporary service pedestal Richmond TX', 'mobile home pedestal Katy'],
  },
  {
    slug: 'mobile-home-connections',
    title: 'Mobile Home Connections',
    media: [
      { type: 'image', src: PLACEHOLDER },
      { type: 'image', src: PLACEHOLDER },
    ],
    summary: 'Mobile and manufactured home electrical hookups — service disconnect, feeder, bonding, and inspection.',
    details: [
      'Service disconnect and feeder installation',
      'Grounding and bonding to code',
      'Utility coordination and permit handling',
      'New and replacement mobile home connections',
    ],
    turnaround: 'Most connections in 1 day',
    longDescription: 'Mobile home connections look simple and fail inspection anyway. We handle the full scope — service disconnect, feeder, bonding, grounding, utility coordination, and the inspection — so your tenant has power on move-in day, not two weeks later.',
    keywords: ['mobile home electrical Houston TX', 'manufactured home hookup Sugar Land', 'mobile home connection Richmond TX', 'trailer electrical Katy'],
  },
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
