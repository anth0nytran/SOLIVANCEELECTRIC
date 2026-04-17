export interface LocationContent {
  slug: string;
  name: string;         // "Cypress"
  fullName: string;     // "Cypress, TX"
  positionLine: string; // short eyebrow line, e.g. "North-west Harris County · US-290"
  heroLede: string;
  description: string;
  zipCodes: string[];
  neighborhoods: string;
  ahjNotes: string;
  projects: { scope: string; building: string; days: string }[];
  faqs: { q: string; a: string }[];
}

export const locationContent: Record<string, LocationContent> = {
  houston: {
    slug: 'houston',
    name: 'Houston',
    fullName: 'Houston, TX',
    positionLine: 'Inside the Beltway · Harris County · 2.3M residents',
    heroLede:
      'Licensed commercial electrical contractor working Houston proper — office parks, retail pads, warehouses, mobile home sites, and premium residential. Permits pulled at the City of Houston, utility cut-overs coordinated with CenterPoint.',
    description:
      'Solivance Electric works the full footprint inside the Beltway and the corridors running out of it. Downtown retail pads, the Texas Medical Center perimeter, East Downtown warehouses, the Heights residential premium, Montrose adaptive-reuse builds, and the south-side industrial lots off the 610 loop. For commercial buyers comparing three bids, the short version is: in-house crew, Harris County or City of Houston permit, CenterPoint cut-over coordinated, and inspection passed on the first walk.',
    zipCodes: ['77002', '77004', '77005', '77006', '77007', '77008', '77019', '77030', '77048', '77098'],
    neighborhoods:
      'Downtown · Midtown · East Downtown · Montrose · Heights · Rice Village · Museum District · Upper Kirby · Third Ward · Gulfgate',
    ahjNotes:
      'Most of Houston proper is City of Houston AHJ — permits filed through Houston Permitting Center, inspections scheduled through the city online portal. Pockets of unincorporated Harris County inside the Loop go through the county. CenterPoint Energy is the electric utility across the territory.',
    projects: [
      { scope: '400A 3-phase service upgrade', building: 'Office / retail pad', days: '3 days' },
      { scope: '80 kW standby generator with ATS', building: 'Medical suite', days: '4 days' },
      { scope: 'Level 2 EV charger × 8 with load management', building: 'Multi-tenant office', days: '6 days' },
      { scope: 'Parking-lot LED retrofit — 22 poles', building: 'Retail center', days: '5 days' },
    ],
    faqs: [
      {
        q: 'Do you serve commercial buildings inside the 610 Loop?',
        a: 'Yes — Downtown, Midtown, EaDo, Montrose, Heights, Rice Village, Medical Center perimeter, and the south-side industrial corridors. Most of that footprint is City of Houston AHJ; we pull Houston permits daily.',
      },
      {
        q: 'Are you a licensed City of Houston electrical contractor?',
        a: 'Yes. Licensed Texas Electrical Contractor with an active filing with the City of Houston Permitting Center. License number and COI available on request.',
      },
      {
        q: 'How fast can you get on a Houston commercial emergency?',
        a: 'Our 24-hour line is answered by a licensed electrician. Inside the Loop, a truck is usually on site inside two hours on business-day evenings, sometimes faster on weekdays.',
      },
      {
        q: 'Do you pull permits at the Houston Permitting Center?',
        a: 'Every time. Online filing, plan review if the scope requires it, rough-in and final inspections scheduled through the city portal, and the final walk with the inspector is part of the job.',
      },
    ],
  },
  cypress: {
    slug: 'cypress',
    name: 'Cypress',
    fullName: 'Cypress, TX',
    positionLine: 'NW Harris County · US-290 corridor · 200,000+ residents',
    heroLede:
      'Commercial electrical contractor serving the Cypress corridor — warehouse construction along 290, office parks, retail pads, and the residential premium through Bridgeland, Towne Lake, and Fairfield.',
    description:
      'Cypress is an unincorporated corner of north-west Harris County built around the US-290 freeway and the Grand Parkway. The electrical work here splits cleanly — new warehouse and retail construction on the commercial side, and a steady stream of panel upgrades, generator installs, and EV chargers across the master-planned residential inventory (Bridgeland, Towne Lake, Fairfield, Stone Gate, Cypress Creek Lakes). Solivance Electric pulls Harris County permits for this territory, coordinates with CenterPoint Energy on service-entrance work, and runs the inspection walk with the county electrical inspector.',
    zipCodes: ['77429', '77433', '77095', '77065', '77041'],
    neighborhoods:
      'Bridgeland · Towne Lake · Fairfield · Stone Gate · Cypress Creek Lakes · Copperfield · Blackhorse Ranch · Cypress Mill · Coles Crossing',
    ahjNotes:
      'Cypress is primarily unincorporated Harris County — permits filed through Harris County Permits (not City of Houston). Inspections run through the county schedule. CenterPoint Energy serves the territory. Some master-planned communities have additional HOA/ACC review on exterior work.',
    projects: [
      { scope: '200A residential panel upgrade', building: 'Bridgeland home', days: '1 day' },
      { scope: 'New warehouse electrical — 72,000 sq ft', building: '290 corridor tilt-wall', days: '7 weeks' },
      { scope: 'Whole-home standby generator — 48 kW', building: 'Towne Lake residence', days: '3 days' },
      { scope: 'RV park pedestal array — 24 sites', building: 'Fairfield-area park', days: '3 weeks' },
    ],
    faqs: [
      {
        q: 'Do you work unincorporated Cypress outside City of Houston jurisdiction?',
        a: 'Yes — most of the Cypress territory is unincorporated Harris County. Harris County Permits is where we file, the county electrical inspector is who we meet.',
      },
      {
        q: 'Do you serve the Bridgeland and Towne Lake master-planned communities?',
        a: 'Yes. Panel upgrades, generator installs, EV chargers, and service-entrance work across those neighborhoods. HOA and ACC submissions for exterior work (generator sites, EV bollards) are part of the job where required.',
      },
      {
        q: 'Can you handle warehouse electrical on the 290 corridor?',
        a: 'Yes. Ground-up tilt-wall and metal-building warehouse electrical for the inventory going up along US-290 — service entrance, distribution, high-bay LED, dock power, office fit-out. Design-build against the GC schedule.',
      },
      {
        q: 'How far west does the Cypress service area extend?',
        a: 'Practically, we cover the territory bounded by US-290 on the north, the Grand Parkway on the east, FM 529 on the south, and the Waller County line on the west. Call if you are close — we usually cover it.',
      },
    ],
  },
  katy: {
    slug: 'katy',
    name: 'Katy',
    fullName: 'Katy, TX',
    positionLine: 'W Harris + Fort Bend · I-10 corridor · Fast-growing',
    heroLede:
      'Licensed commercial electrical across the Katy metro — warehouse construction along I-10, Cinco Ranch and Cross Creek residential premium, and commercial pad work across Katy Mills and Grand Parkway.',
    description:
      'Katy straddles three counties (Harris, Fort Bend, Waller) and two fast-growing freeway corridors (I-10 Energy Corridor extending west, and the Grand Parkway). The commercial work is heavy on warehouse construction, medical office, and retail — with a residential premium across Cinco Ranch, Cross Creek Ranch, Firethorne, and the Cinco-Ranch-adjacent custom inventory. Solivance Electric pulls permits across three jurisdictions (Harris County, Fort Bend County, City of Katy) depending on the exact address, coordinates CenterPoint service work, and runs the inspection walk in each.',
    zipCodes: ['77449', '77493', '77494', '77450', '77441', '77406'],
    neighborhoods:
      'Cinco Ranch · Cross Creek Ranch · Firethorne · Seven Meadows · Grand Lakes · Kelliwood · Grayson Lakes · Avalon · Pine Mill Ranch',
    ahjNotes:
      'Katy crosses three permitting jurisdictions — City of Katy AHJ inside the city limits, Harris County for most of the Energy Corridor extension, and Fort Bend County for the Cross Creek / Firethorne side. We verify the AHJ by address before filing. CenterPoint Energy is the electric utility across the footprint.',
    projects: [
      { scope: '400A 3-phase panel upgrade', building: 'Katy Mills retail pad', days: '2 days' },
      { scope: 'Level 2 EV × 12 + DCFC × 1', building: 'Grand Parkway office park', days: '9 days' },
      { scope: 'New warehouse electrical — 95,000 sq ft', building: 'I-10 tilt-wall', days: '8 weeks' },
      { scope: 'Whole-home generator + panel upgrade', building: 'Cinco Ranch residence', days: '3 days' },
    ],
    faqs: [
      {
        q: 'Does your Katy service area cross all three county lines?',
        a: 'Yes — Harris, Fort Bend, and Waller. Each has its own permit portal and inspection schedule; we verify the AHJ by the exact address before filing.',
      },
      {
        q: 'Do you work the I-10 Energy Corridor warehouse inventory?',
        a: 'Yes. Ground-up tilt-wall and metal-building warehouse electrical for the new inventory going up west of the Grand Parkway — service entrance, distribution, high-bay, dock, office fit-out.',
      },
      {
        q: 'Can you handle Cinco Ranch and Cross Creek residential panel and generator work?',
        a: 'Yes. Panel upgrades, whole-home standby generators, EV chargers, and service-entrance work. HOA architectural-committee submissions for exterior gen-set placement are part of our scope.',
      },
      {
        q: 'How far west on I-10 do you cover?',
        a: 'Practically, to Brookshire / Pattison on the west, FM 1093 on the south, and the Hempstead Highway on the north. Call if you are close — we usually cover it.',
      },
    ],
  },
  memorial: {
    slug: 'memorial',
    name: 'Memorial',
    fullName: 'Memorial, Houston',
    positionLine: 'West Houston · Memorial Villages · Premium residential',
    heroLede:
      'Licensed electrical across the Memorial corridor — Villages residential premium, Spring Branch commercial, and the I-10 west office inventory. Permits pulled at six separate municipalities.',
    description:
      'Memorial is the dense western corridor running from Loop 610 out to Beltway 8 along I-10, split across six incorporated Memorial Villages (Hedwig Village, Piney Point, Hunters Creek, Bunker Hill, Spring Valley, Hilshire Village) plus unincorporated Harris County pockets and the City of Houston boundary on the east. The residential premium here is serious — custom homes, older services due for upgrades, and a steady stream of standby generator and EV charger work. Commercial side covers Spring Branch retail and office, Town & Country adjacent, and the north side of I-10 out toward Bunker Hill.',
    zipCodes: ['77024', '77079', '77055', '77043', '77063'],
    neighborhoods:
      'Memorial Villages · Hedwig Village · Piney Point · Hunters Creek · Bunker Hill · Spring Valley · Hilshire Village · Spring Branch · Town & Country · Tanglewood',
    ahjNotes:
      'Memorial is the most fragmented AHJ territory in the Solivance service area — six separate incorporated Memorial Villages each with their own permit office, plus Harris County pockets and the City of Houston eastern boundary. Village of Piney Point and Hedwig Village enforce stricter exterior-work ordinances (generator setbacks, dark-sky lighting). We verify the AHJ by the exact address before the quote is fixed-fee.',
    projects: [
      { scope: '400A service upgrade + meter relocation', building: 'Piney Point residence', days: '3 days' },
      { scope: '22 kW standby generator + ATS', building: 'Hunters Creek home', days: '2 days' },
      { scope: 'Level 2 EV × 2 in garage + make-ready', building: 'Bunker Hill residence', days: '1 day' },
      { scope: 'Commercial parking-lot LED retrofit', building: 'Spring Branch office', days: '4 days' },
    ],
    faqs: [
      {
        q: 'Do you serve all the Memorial Villages?',
        a: 'All six — Hedwig Village, Piney Point, Hunters Creek, Bunker Hill, Spring Valley, and Hilshire Village. Each village is its own AHJ with its own permit office; we know the path for each.',
      },
      {
        q: 'Do the Memorial Villages have special rules on generator placement or exterior lighting?',
        a: 'Yes — Piney Point and Hedwig Village in particular enforce exterior-equipment setbacks (gen-sets, ATS boxes) and dark-sky cutoff requirements on exterior lighting. We flag those in the quote before the gen-set is sited.',
      },
      {
        q: 'Can you handle premium residential panel upgrades in Memorial?',
        a: 'Routinely. Older services due for upsizing to 320A or 400A, meter relocation where the original placement fails current code, whole-home generator tie-in, and EV charger installs — same crew that does the commercial scope.',
      },
      {
        q: 'Do you work commercial inventory along I-10 / Memorial Drive?',
        a: 'Yes. Spring Branch retail, Town & Country office, the I-10 north-side corridor, and the Tanglewood premium. Panel upgrades, generator, EV, parking-lot lighting.',
      },
    ],
  },
};

export function getLocationContent(slug: string): LocationContent | null {
  return locationContent[slug] || null;
}

export const locationOrder = ['houston', 'cypress', 'katy', 'memorial'];
