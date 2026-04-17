export const siteConfig = {
  businessName: 'Solivance Electric LLC',
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
    'New Home Builds (Single & Multi-Family)',
    'New Commercial & Shopping Centers',
    'RV Park Pedestals',
    'Mobile Home Connections',
  ],
  rating: 5.0,
  reviewCount: 0,
  yearsInBusiness: 10,
  hours: '6am–6pm · 24hr Emergency',
  slogan: 'Commercial Electrical. Done Right the First Time.',
  serviceAreas: ['Houston', 'Cypress', 'Katy', 'Memorial'],
  allServiceAreas: [
    'Houston, TX', 'Cypress, TX', 'Katy, TX', 'Memorial, TX',
    'Spring, TX', 'Jersey Village, TX', 'Tomball, TX', 'Bellaire, TX',
    'West University, TX', 'The Woodlands, TX', 'Sugar Land, TX', 'Missouri City, TX',
  ],
  neighborhoods: 'Memorial Villages · Hedwig Village · Piney Point · Hunters Creek · Bunker Hill · Spring Branch · Tanglewood',
  zipCodes: ['77024', '77079', '77055', '77429', '77433', '77449', '77493', '77494', '77095'],
  testimonials: [] as { quote: string; name: string; stars: number }[],
  faqs: [
    { q: 'What areas does Solivance Electric serve?', a: 'Our top service areas are Houston, Cypress, Katy, and Memorial. We also cover Spring, Jersey Village, Tomball, Bellaire, West University, Sugar Land, Missouri City, and the surrounding Harris and Fort Bend County communities. If you are inside the Beltway or along the I-10 / US-290 / I-45 corridors, we cover it.' },
    { q: 'Do you handle commercial and industrial work?', a: 'Yes. Commercial and light-industrial is the core of what we do — panel upgrades from 200A through 3-phase switchgear, standby generator installs with automatic transfer switch commissioning, parking-lot LED retrofits to photometric spec, Level 2 and DCFC EV charger builds, ground-up warehouse electrical, and RV park pedestal arrays. Office parks, retail pads, warehouses, and property-management portfolios are our usual clients.' },
    { q: 'Are you licensed and insured in Texas?', a: 'Yes. Solivance Electric LLC is a licensed Texas electrical contractor with active liability insurance on every job. License and COI available on request before work begins.' },
    { q: 'Do you offer 24-hour emergency electrical service?', a: 'Yes. Standard hours are 6am–6pm, six days a week. A licensed electrician answers after-hours for emergencies — lost power to a tenant suite, tripped main, burnt feeder, smoke from a panel. Call (832) 965-9964 any hour.' },
    { q: 'How much does a commercial panel upgrade cost in Houston?', a: 'A 200A commercial upgrade typically runs $2,500–$8,500 depending on meter location and utility coordination. 400A and 3-phase upgrades run $6,000–$18,000. Every number is a fixed-fee quote after a free site walk — no ballpark over the phone.' },
    { q: 'How long does a standby generator install take?', a: 'Most commercial standby installs take 2–5 working days on site: concrete pad, generator set, fuel line, ATS wiring, commissioning, and final inspection. Permit pull and equipment lead time sit ahead of that.' },
    { q: 'Do you install Level 2 and DC fast chargers for commercial properties?', a: 'Yes. Level 2 and DCFC for office lots, apartment complexes, fleet yards, and retail pads. Includes load calc, panel capacity check, trenching, bollard placement, and submetering where needed. Make-ready infrastructure designed so you can add more stalls later without tearing up the lot.' },
    { q: 'Do you pull permits and coordinate inspections?', a: 'Yes. Harris County or City of Houston permits depending on jurisdiction, CenterPoint Energy cut-over scheduling, and every inspection on the calendar. You do not chase the permit office — we do.' },
    { q: 'How quickly can you start a project?', a: 'Most estimates come back within 24 hours. Once the quote is signed, most jobs start within 1–2 weeks. Emergency work moves to the front of the line.' },
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
const photo = (slug: string) => `/photos_new/${slug}.jpg`;

export const serviceData: ServiceItem[] = [
  {
    slug: 'panel-upgrades',
    title: 'Panel Upgrades',
    media: [
      { type: 'image', src: photo('panel-upgrades') },
    ],
    summary: '100A through 3-phase switchgear. Meter and main replaced, feeders pulled, labels legible. Inspection passes the first walk.',
    details: [
      '100A, 200A, 400A, and 3-phase service upgrades',
      'Meter base, main breaker, and bus replacements',
      'Permit pull and utility cut-over coordination',
      'Downtime windows scheduled around tenants or operations',
    ],
    turnaround: 'Most 200A upgrades completed in 1–2 business days',
    longDescription: 'Outdated panels flicker lights, trip breakers at half load, and hide failing buswork behind a painted cover. Solivance Electric handles panel upgrades from 200A residential services through commercial 3-phase switchgear — pulling the Harris County permit, coordinating the CenterPoint cut-over, and tagging every feeder before it goes back in. Most 200A jobs are on and re-energized inside two business days.',
    keywords: ['panel upgrade Houston TX', 'commercial panel replacement Cypress TX', '200 amp service upgrade Katy TX', 'electrical panel upgrade Memorial Houston'],
  },
  {
    slug: 'generator-installs',
    title: 'Generator Installs',
    media: [
      { type: 'image', src: photo('generator-installs') },
    ],
    summary: 'Standby generators with ATS commissioning. Sized to the load, sited on a proper pad, fuel planned for the longest outage on record.',
    details: [
      'Commercial standby installs from 22 kW through 150 kW',
      'Automatic transfer switch wiring and commissioning',
      'Load calc, fuel sizing, and annual maintenance intervals',
      'Concrete pad, fuel line, and emissions permit handling',
    ],
    turnaround: 'Typical commercial install in 2–5 working days on site',
    longDescription: 'When the grid drops, your business should not. We install standby generators for warehouses, medical offices, property-management portfolios, and premium residential across the Houston metro. Every install starts with an actual load calc — not a sales sheet — and ends with a commissioning run that we document and hand to you. ATS wiring, fuel planning, emissions paperwork, and the first annual service date on the calendar.',
    keywords: ['generator installation Houston TX', 'commercial standby generator Cypress TX', 'backup generator Katy TX', 'Generac install Memorial Houston'],
  },
  {
    slug: 'parking-lot-lighting',
    title: 'Parking Lot Lighting',
    media: [
      { type: 'image', src: photo('parking-lot-lighting') },
    ],
    summary: 'LED pole and shoebox lighting to photometric spec. Trenching, conduit, photocells, timers — and the energy savings that pay for it.',
    details: [
      'LED pole, shoebox, and wall-pack fixtures',
      'Photocell and timer-based controls',
      'HID-to-LED retrofit on existing poles',
      'Trenching, conduit, and underground feeder runs',
    ],
    turnaround: 'Most lots re-lit in 3–7 days',
    longDescription: 'Dark parking lots are a liability — slip-and-fall claims, tenant complaints, insurance premium hikes. We design LED parking lot lighting to a real photometric layout (not a lumen guess), retrofit the HID fixtures you already have, or run the full trench-conduit-feeder build for a ground-up lot. Photocells and timers ship standard. Most tenant-occupied lots get re-lit inside a week, working around business hours.',
    keywords: ['parking lot lighting Houston TX', 'LED retrofit Cypress TX', 'commercial pole lighting Katy TX', 'shoebox LED Memorial Houston'],
  },
  {
    slug: 'ev-chargers',
    title: 'EV Chargers',
    media: [
      { type: 'image', src: photo('ev-chargers') },
    ],
    summary: 'Level 2 and DC fast chargers for fleets, multi-tenant properties, and premium homes. Load-managed, submetered, ready to scale.',
    details: [
      'Level 2 (7.2–19.2 kW) and Level 3 DCFC installs',
      'Fleet, multi-unit, and workplace deployments',
      'Dynamic load management and per-stall submetering',
      'Make-ready infrastructure to add stalls later without re-trenching',
    ],
    turnaround: 'Single Level 2 stations in 1 day · DCFC builds scoped per site',
    longDescription: 'EV charging is not optional any more — tenants, fleets, and customers expect it. We install Level 2 (7.2–19.2 kW) and DC fast chargers on commercial properties across Greater Houston. Every build starts with a real capacity check on the existing service, not a hope. When capacity is tight, we ship load-managed builds that share a circuit without nuisance-tripping. When you plan to add stalls next year, we run the make-ready conduit now so the next install is a pull, not a dig.',
    keywords: ['EV charger installation Houston TX', 'commercial Level 2 charger Cypress TX', 'DCFC install Katy TX', 'Tesla charger install Memorial Houston'],
  },
  {
    slug: 'commercial-warehouses',
    title: 'New Commercial Warehouses',
    media: [
      { type: 'image', src: photo('commercial-warehouses') },
    ],
    summary: 'Ground-up electrical for new commercial warehouses. Service entrance through high-bay LED, dock power, and office build-out.',
    details: [
      'Design-build electrical for tilt-wall and metal-building warehouses',
      'Service entrance, switchgear, and feeder distribution',
      'High-bay LED lighting with occupancy and daylight controls',
      'Dock leveler power, office fit-out, data and fire-alarm coordination',
    ],
    turnaround: 'Scoped to the GC schedule — typical 60–120k sq ft in 4–10 weeks',
    longDescription: 'New warehouse construction lives or dies on two things: the electrical being on the GC schedule, and the high-bay lighting being right the first time. We handle the full scope — service entrance sizing, main switchgear and distribution, high-bay LED layout with daylight harvesting, dock leveler and overhead-door power, and the office fit-out inside. One foreman from the ground breaking to the final inspection.',
    keywords: ['warehouse electrical contractor Houston TX', 'new construction electrician Cypress TX', 'industrial electrician Katy TX', 'tilt-wall electrical Memorial Houston'],
  },
  {
    slug: 'pedestals',
    title: 'RV Park Pedestals',
    media: [
      { type: 'image', src: photo('pedestals') },
    ],
    summary: 'RV park, mobile home park, and temp-service pedestals. 30A, 50A, 100A configurations installed to NEC 551/552 and utility spec.',
    details: [
      'RV park and mobile-home park pedestal arrays',
      'Temporary service pedestals for jobsites',
      '30A / 50A / 100A receptacle configurations',
      'Grounding, bonding, and utility inspection pass-through',
    ],
    turnaround: 'Most single pedestals installed in 1 day · park arrays scoped per lot count',
    longDescription: 'RV pedestals look simple on a spec sheet and fail utility inspection for the same three reasons every time: bad grounding, wrong NEMA configuration, or a receptacle rated for the wrong duty cycle. We build pedestal arrays for RV parks, mobile-home parks, and temporary-service jobsites to NEC 551/552, utility spec, and the local AHJ. Trenching, ground rods, bonding, weather-rated enclosures — and the inspector signs off the first walk.',
    keywords: ['RV park pedestal Houston TX', 'mobile home park pedestal Cypress TX', 'temporary service pedestal Katy TX', '50 amp pedestal Memorial Houston'],
  },
  {
    slug: 'mobile-home-connections',
    title: 'Mobile Home Connections',
    media: [
      { type: 'image', src: photo('mobile-home-connections') },
    ],
    summary: 'Mobile and manufactured home service hookups. Disconnect, feeder, grounding, bonding — and the inspection signed on the first walk.',
    details: [
      'Service disconnect and feeder run to meter loop',
      'Grounding and bonding to NEC 550',
      'CenterPoint / utility coordination and permit pull',
      'New installs and service replacements',
    ],
    turnaround: 'Most connections complete in 1 day',
    longDescription: 'Mobile home connections look simple and fail inspection anyway. Three reasons: the grounding electrode conductor isn\'t sized right, the feeder isn\'t rated for the termination, or the service disconnect is in the wrong location. We handle the whole scope — service disconnect, feeder, grounding, bonding, utility coordination, permit, and inspection — so the tenant has power on move-in day, not two weeks later.',
    keywords: ['mobile home electrical Houston TX', 'manufactured home hookup Cypress TX', 'mobile home connection Katy TX', 'trailer electrical Memorial Houston'],
  },
  {
    slug: 'home-builds',
    title: 'New Home Builds — Single & Multi-Family',
    media: [
      { type: 'image', src: photo('home-builds') },
    ],
    summary: 'Ground-up residential electrical for custom homes, spec builds, and small-to-mid multi-family. Rough-in through trim, EV make-ready in every garage.',
    details: [
      'Custom, spec, and multi-family new construction',
      'Service entrance, panel, and sub-panel layout',
      'Smokes/CO, AFCI, GFCI, and tamper-resistant to NEC 2023',
      'Structured cabling and EV make-ready standard',
    ],
    turnaround: 'Typical single-family in 4–7 weeks on the GC schedule',
    longDescription: 'New home construction lives or dies on the electrical being ready when drywall shows up. Solivance Electric handles single-family custom, production spec, townhome rows, and small-to-mid multi-family across Greater Houston — rough-in through trim, smart-home ready, EV make-ready in the garage. We work the GC schedule, not our own, and the final inspection passes the first walk.',
    keywords: ['new construction electrician Houston TX', 'multi-family electrical contractor Cypress TX', 'custom home electrical Katy TX', 'home builder electrician Memorial Houston'],
  },
  {
    slug: 'commercial-centers',
    title: 'New Commercial & Shopping Centers',
    media: [
      { type: 'image', src: photo('commercial-centers') },
    ],
    summary: 'Ground-up retail pads, strip centers, and shopping-center builds. Service entrance, tenant metering, site lighting, signage — opening-night ready.',
    details: [
      'Service entrance and tenant meter banks',
      'Vanilla-shell tenant rough-in',
      'Site lighting, photocells, and pylon sign power',
      'Phased tenant turnover and inspection walks',
    ],
    turnaround: 'Typical 20k sq ft strip center in 6–12 weeks',
    longDescription: 'Shopping-center and retail-pad electrical is a coordination problem as much as a wiring problem — tenant meters, signage power, pylon circuits, site-lighting photometric, and the opening-day schedule all have to land on the same set of drawings. Solivance Electric handles ground-up electrical for retail pads, strip centers, mixed-use, and anchor-plus-satellite shopping centers across Houston, Cypress, Katy, and Memorial. Vanilla-shell rough-in through tenant turnover, every meter set on the lease start date.',
    keywords: ['shopping center electrical contractor Houston TX', 'retail electrical Cypress TX', 'strip center electrical Katy TX', 'commercial construction electrician Memorial Houston'],
  },
];

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: 'panel' | 'generator' | 'lighting' | 'ev' | 'warehouse' | 'pedestal' | 'mobile-home' | 'home-build' | 'retail' | 'map-pin' | 'info' | 'phone' | 'help' | 'file';
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
  featured?: { heading: string; body: string; ctaLabel: string; ctaHref: string };
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Panel Upgrades',             href: '/services/panel-upgrades',           description: '100A through 3-phase switchgear.',            icon: 'panel' },
      { label: 'Generator Installs',         href: '/services/generator-installs',       description: 'Standby gen-sets, sized and commissioned.',   icon: 'generator' },
      { label: 'Parking Lot Lighting',       href: '/services/parking-lot-lighting',     description: 'LED retrofit and ground-up, photometric.',    icon: 'lighting' },
      { label: 'EV Chargers',                href: '/services/ev-chargers',              description: 'Level 2 and DCFC, load-managed.',             icon: 'ev' },
      { label: 'New Commercial Warehouses',  href: '/services/commercial-warehouses',    description: 'Service entrance through high-bay LED.',      icon: 'warehouse' },
      { label: 'New Home Builds',            href: '/services/home-builds',              description: 'Single & multi-family, rough to trim.',       icon: 'home-build' },
      { label: 'Commercial & Shopping Centers', href: '/services/commercial-centers',    description: 'Retail pads, strip centers, tenant metering.', icon: 'retail' },
      { label: 'RV Park Pedestals',          href: '/services/pedestals',                description: '30A/50A/100A arrays to utility spec.',        icon: 'pedestal' },
      { label: 'Mobile Home Connections',    href: '/services/mobile-home-connections',  description: 'Service disconnect, feeder, bonding.',        icon: 'mobile-home' },
    ],
    featured: {
      heading: '24-hour emergency',
      body: 'A licensed electrician picks up any hour. Fixed-fee quotes inside a day.',
      ctaLabel: 'See all services',
      ctaHref: '/services',
    },
  },
  {
    label: 'Areas',
    href: '/locations',
    children: [
      { label: 'Houston',   href: '/locations/houston',   description: 'Inside the Beltway · Harris County.',       icon: 'map-pin' },
      { label: 'Cypress',   href: '/locations/cypress',   description: 'NW Harris County · US-290 corridor.',        icon: 'map-pin' },
      { label: 'Katy',      href: '/locations/katy',      description: 'West metro · I-10 corridor.',                icon: 'map-pin' },
      { label: 'Memorial',  href: '/locations/memorial',  description: 'Memorial Villages · west of the Loop.',      icon: 'map-pin' },
    ],
    featured: {
      heading: 'Surrounding metro',
      body: 'Spring, Tomball, Bellaire, Sugar Land, Missouri City, The Woodlands — covered on a call.',
      ctaLabel: 'View all service areas',
      ctaHref: '/locations',
    },
  },
  { label: 'About',   href: '/about' },
  { label: 'FAQ',     href: '/faq' },
  { label: 'Blog',    href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
