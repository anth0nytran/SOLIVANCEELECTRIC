export type ServiceIcon =
  | 'panel'
  | 'generator'
  | 'lighting'
  | 'ev'
  | 'warehouse'
  | 'pedestal'
  | 'mobile-home';

export interface ServiceContent {
  slug: string;
  icon: ServiceIcon;
  eyebrowNumber: string;
  heroH1: string;
  heroLede: string;
  overview: string;
  cost: {
    q: string;
    a: string;
    range: string; // display-ready price range chip
    note: string;  // caveat line
  };
  timeline: {
    q: string;
    a: string;
    phases: { label: string; duration: string }[];
  };
  process: { step: string; title: string; detail: string }[];
  codeNotes: {
    heading: string;
    body: string;
    chips: string[]; // code articles, AHJ, utility names
  };
  relatedSlugs: string[];
  faqs: { q: string; a: string }[];
}

export const serviceContent: Record<string, ServiceContent> = {
  'panel-upgrades': {
    slug: 'panel-upgrades',
    icon: 'panel',
    eyebrowNumber: '01',
    heroH1: 'Commercial Panel Upgrades in Greater Houston.',
    heroLede:
      'From 100A residential services to 3-phase commercial switchgear. Permits pulled, utility cut-over coordinated, inspection passed on the first walk.',
    overview:
      'An electrical panel is the meter-to-load junction for every circuit in the building. When the main breaker is undersized, the bus is pitted, or the bonding is wrong at the service entrance, the symptoms show up everywhere — lights dimming when an RTU kicks, breakers tripping at half load, a panel cover that is warm to the touch at 3 pm on a hot day. Solivance Electric replaces commercial and high-end residential panels across Houston, Cypress, Katy, and Memorial — 100A, 200A, 400A, and 3-phase 208/480 services. Every swap includes load calcs against actual metered demand, meter base and main breaker replacement, feeder upsizing when the run is marginal, legible circuit labeling, and a final walk with the inspector before the seal goes on.',
    cost: {
      q: 'How much does a commercial panel upgrade cost in Houston?',
      a: 'A 200A commercial panel upgrade typically runs $2,500–$8,500 installed. 400A services and 3-phase 208/480 switchgear replacements run $6,000–$18,000, with larger switchgear builds pushing past $25,000. Final pricing depends on meter location, whether the service entrance needs relocation, feeder length, and how much of the CenterPoint work is ours versus theirs. Every number is a fixed-fee quote after a free site walk — no ballpark over the phone, no surprise changes mid-job.',
      range: '$2,500 – $25,000+',
      note: 'Fixed fee quoted after free site walk.',
    },
    timeline: {
      q: 'How long does a commercial panel upgrade take?',
      a: 'Most 200A commercial upgrades are on and re-energized inside 1–2 business days, with the building de-energized for only a portion of that window. 400A and 3-phase switchgear replacements typically run 3–5 working days because of utility coordination, gear lead time, and longer feeder pulls. Permit pull and equipment delivery sit ahead of that on the calendar.',
      phases: [
        { label: 'Site walk + quote', duration: 'Same day, free' },
        { label: 'Permit + equipment', duration: '5–10 business days' },
        { label: 'Tear-out + install', duration: '1–2 days (200A)' },
        { label: 'Final inspection', duration: 'Same week' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'Site walk and load calc',
        detail:
          'We open the existing panel, check the bus, read the meter history, and pull a load calc against actual demand — not a rule-of-thumb number.',
      },
      {
        step: '02',
        title: 'Fixed-fee quote',
        detail:
          'Itemized scope: gear list, permit fee, CenterPoint coordination, downtime window, and final number. Signed before any material is ordered.',
      },
      {
        step: '03',
        title: 'Permit, cut-over, install',
        detail:
          'Harris County or City of Houston permit filed. CenterPoint disconnect scheduled. Panel swapped, feeders upsized where needed, every breaker labeled.',
      },
      {
        step: '04',
        title: 'Inspection and hand-off',
        detail:
          'Inspector meets us on site. Clean blue-tag the first walk. Old gear hauled, mechanical room swept, circuit directory handed to the owner.',
      },
    ],
    codeNotes: {
      heading: 'Code, permit, and utility notes',
      body:
        'Commercial panel upgrades in Greater Houston are typically pulled under the 2023 National Electrical Code as adopted by the Texas Department of Licensing and Regulation. Service-entrance grounding falls under NEC 250, working clearances under NEC 110.26, and the bonding jumpers in the meter and main are inspected for visibility. CenterPoint Energy handles the service-drop cut-over inside their territory — we coordinate the outage window so your tenants see the shortest possible disruption.',
      chips: ['NEC 250', 'NEC 110.26', 'Harris County Permits', 'City of Houston AHJ', 'CenterPoint Energy'],
    },
    relatedSlugs: ['generator-installs', 'commercial-warehouses', 'ev-chargers'],
    faqs: [
      {
        q: 'What are the warning signs my commercial panel needs an upgrade?',
        a: 'Lights dimming when an RTU or compressor starts, breakers tripping at normal load, a panel cover that is warm to the touch, burning-plastic smell near the gear, visible scorching on bus or breakers, or a building running modern HVAC and equipment off a 100A service. Any one of those is a call.',
      },
      {
        q: 'Do you handle 3-phase commercial service upgrades?',
        a: 'Yes. 208Y/120 for multi-tenant buildings, 480/277 for industrial loads and high-bay lighting. Gear selection (main breaker vs main lug, NEMA 3R vs indoor), fault-current rating, and SCCR matching are all part of the quote.',
      },
      {
        q: 'Will you coordinate with CenterPoint for the meter cut-over?',
        a: 'Every time. We file the service request, schedule the disconnect/reconnect window, meet the CenterPoint tech on site, and hand back a legible meter base with a fresh seal.',
      },
      {
        q: 'How long is the building de-energized during a panel swap?',
        a: 'Most 200A single-phase cut-overs are 2–6 hours of no-power time, sequenced around your occupancy. 400A and 3-phase swaps can push to a full day. We plan the outage window in the quote, not on the day of.',
      },
      {
        q: 'Do I need a permit to replace my panel in Houston?',
        a: 'Yes — any service-entrance work requires a permit and an electrical inspection, whether the jurisdiction is the City of Houston, unincorporated Harris County, or one of the Memorial villages. We pull it, file it, and meet the inspector.',
      },
      {
        q: 'Do you replace meter bases and masts at the same time as the panel?',
        a: 'Often — if the meter base is undersized, cracked, or wrong rating for the new service, it gets replaced in the same scope. Same for mast and weatherhead on an overhead service. It is cleaner to do both while the drop is already down.',
      },
    ],
  },
  'generator-installs': {
    slug: 'generator-installs',
    icon: 'generator',
    eyebrowNumber: '02',
    heroH1: 'Commercial Standby Generators — Installed, Commissioned, Documented.',
    heroLede:
      'Sized to the metered load, sited on a proper pad, fuel planned for the longest outage on record. ATS wiring and live commissioning on every build.',
    overview:
      'When the grid drops, your business should not. Solivance Electric installs commercial standby generators from 22 kW single-phase through 150 kW three-phase — medical suites, warehouses, multi-tenant offices, retail pads, and high-end residential across Greater Houston. Every install starts with a load calc against metered demand, not a sales-sheet guess. Generator siting accounts for exhaust clearance, noise to the nearest property line, refueling access, and the concrete pad spec the manufacturer actually called for. The Automatic Transfer Switch is wired, mechanically interlocked where required, and commissioned with a live grid-drop test. The first annual service date is on the calendar before we leave.',
    cost: {
      q: 'How much does a commercial standby generator installation cost?',
      a: 'A 22–35 kW commercial standby generator install typically runs $14,000–$28,000 turnkey (unit, ATS, pad, gas line, commissioning). 48–80 kW units run $28,000–$60,000. Larger 125–150 kW commercial gen-sets with paralleling or larger ATS builds push past $85,000. Fuel infrastructure, service-entrance upgrades, and enclosure selection (sound-attenuated, weather-protective, level 2) are the biggest variables.',
      range: '$14,000 – $85,000+',
      note: 'Unit, ATS, pad, fuel, and commissioning included.',
    },
    timeline: {
      q: 'How long does a standby generator install take?',
      a: 'Most commercial standby installs are 2–5 working days on site once the gear is delivered: pad cure, gen-set set, fuel line run, ATS wired, commissioning, and final inspection. Equipment lead time adds 4–12 weeks depending on the manufacturer and size. Permits sit inside that window — not after it.',
      phases: [
        { label: 'Load calc + sizing', duration: 'On the site walk' },
        { label: 'Gear lead time', duration: '4–12 weeks' },
        { label: 'Pad + install + ATS', duration: '2–5 days on site' },
        { label: 'Live commissioning', duration: 'Same day as final' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'Load calc against real demand',
        detail:
          'We read 12 months of metered demand, not a nameplate total, and size the gen-set to actual peak plus a motor-starting safety factor.',
      },
      {
        step: '02',
        title: 'Site layout + fuel plan',
        detail:
          'Pad location, exhaust and intake clearances, fuel source (natural gas vs diesel vs LP), and refueling access designed before a hole is dug.',
      },
      {
        step: '03',
        title: 'Pad, gen-set, ATS, gas',
        detail:
          'Concrete pad to manufacturer spec. Generator set, leveled and anchored. ATS wired and mechanically interlocked. Gas line sized and pressure-tested.',
      },
      {
        step: '04',
        title: 'Live commissioning',
        detail:
          'Grid-drop test with the real building load. Transfer time verified. Cooldown documented. Annual service date on the calendar before we leave.',
      },
    ],
    codeNotes: {
      heading: 'Code, permit, and utility notes',
      body:
        'Commercial standby gen-set work in Greater Houston touches NEC Article 702 (optional standby systems) and 700 where the gen-set is backing life-safety or emergency loads. Fuel installations are reviewed against NFPA 37 (stationary combustion engines) and local fire-marshal notes. For natural-gas feeds, CenterPoint Energy gas-side capacity and metering is confirmed ahead of install.',
      chips: ['NEC 700/702', 'NFPA 37', 'Harris County Permits', 'Fire Marshal Review', 'CenterPoint Gas'],
    },
    relatedSlugs: ['panel-upgrades', 'commercial-warehouses', 'ev-chargers'],
    faqs: [
      {
        q: 'What size generator does my building need?',
        a: 'The right answer comes from a real load calc, not a spec sheet. We pull 12 months of CenterPoint demand data (or meter the load with clamp-on recorders for 7 days) and size the gen-set to real peak plus a margin for motor starts. Undersizing causes nuisance trips on startup. Oversizing wastes capital and under-loads the engine.',
      },
      {
        q: 'Natural gas or diesel — which should I pick?',
        a: 'Natural gas wins on refueling (the line is already there), maintenance intervals, and emissions. Diesel wins on runtime per gallon and survives if the gas utility drops with the grid. For most commercial buildings in Greater Houston we spec natural gas; for critical 72-hour loads or remote sites, diesel with a day-tank.',
      },
      {
        q: 'Do you install the automatic transfer switch?',
        a: 'ATS wiring and commissioning are in every install. Service-entrance-rated ATS where required, mechanical interlock for code compliance, programmed transition timing, and a documented live grid-drop test at the end.',
      },
      {
        q: 'Do you do annual maintenance on the gen-sets you install?',
        a: 'Yes. Oil, filters, coolant, battery, ATS contact inspection, load-bank test every second year, and a written report. A unit that sits 51 weeks and runs once is not a reliable unit — the service contract is what makes it one.',
      },
      {
        q: 'Can a standby gen-set run my whole building or just essential loads?',
        a: 'Either, and the answer is a cost conversation. Whole-building standby means sizing the gen-set and ATS for the full service. Essential-loads only means a sub-panel of your critical circuits on transfer — cheaper unit, smaller pad, and the non-critical loads stay off during outages.',
      },
      {
        q: 'Do you handle the fire-marshal review and fuel permitting?',
        a: 'Yes. We file the permit, coordinate with the local fire marshal on clearance and gas-line review, and run the inspection. The package you sign covers all of it.',
      },
    ],
  },
  'parking-lot-lighting': {
    slug: 'parking-lot-lighting',
    icon: 'lighting',
    eyebrowNumber: '03',
    heroH1: 'LED Parking Lot Lighting — To Photometric Spec.',
    heroLede:
      'Pole and shoebox installs, HID-to-LED retrofits, and trench-to-fixture ground-up builds. Photocells and timers standard. Light where it is supposed to go.',
    overview:
      'Dark parking lots are a liability — slip-and-fall claims, tenant complaints, insurance premium hikes, and after-hours incidents that get blamed on the lighting plan. Solivance Electric designs and installs commercial parking-lot lighting across Houston, Cypress, Katy, and Memorial. Every lot starts with an actual photometric layout (IES files, not a lumen guess) showing footcandles at the pole base, at the middle of the drive lane, and at the darkest corner. We retrofit the HID and metal-halide fixtures you already have, swap tired poles, run underground conduit for new-build lots, and ship every job with photocells and timers so the lot turns itself on at civil twilight without a truck roll.',
    cost: {
      q: 'How much does commercial parking lot lighting cost in Houston?',
      a: 'An HID-to-LED retrofit on existing poles typically runs $350–$900 per fixture installed (bucket truck, drivers, labor, disposal). Full ground-up builds with new poles, concrete bases, and underground conduit run $3,500–$7,500 per pole assembly. Wall-pack and shoebox retrofits start at $250 per fixture. Trenching charges are per foot and site-dependent — rocky Cypress clay prices differently than loose Memorial fill.',
      range: '$250 – $7,500+ per fixture',
      note: 'Retrofits vs ground-up. Quoted per site.',
    },
    timeline: {
      q: 'How long does a parking lot re-lighting take?',
      a: 'Most tenant-occupied lots are re-lit in 3–7 working days, sequenced after-hours to avoid blocking customer traffic. Ground-up builds with trenching, new poles, and utility coordination run 2–4 weeks on site. Photometric design + pole + fixture lead time runs 2–5 weeks ahead of the install.',
      phases: [
        { label: 'Photometric design', duration: '3–5 business days' },
        { label: 'Material lead time', duration: '2–5 weeks' },
        { label: 'Install + aim', duration: '3–7 days on site' },
        { label: 'Photocell / timer test', duration: 'Final night' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'Photometric design',
        detail:
          'IES files for every fixture. Footcandle plot against the actual lot geometry. Pole heights and wattages selected for the real coverage — not a brochure guess.',
      },
      {
        step: '02',
        title: 'Fixture + pole selection',
        detail:
          'LED wattage, color temperature, optical distribution, shoebox vs aeroscape, dark-sky cutoff where required by the AHJ. Photocell and timer controls as standard.',
      },
      {
        step: '03',
        title: 'Install after hours',
        detail:
          'Bucket truck on a cone plan so tenant traffic never stops. HID fixtures pulled, drivers set, aimed to the design. Trenching and conduit runs on separate days for new-build.',
      },
      {
        step: '04',
        title: 'Night aim + photocell set',
        detail:
          'We come back after dark, verify the aim against the photometric, set the photocell trigger, and program the timer. The lot turns on at civil twilight without a call.',
      },
    ],
    codeNotes: {
      heading: 'Code, permit, and utility notes',
      body:
        'Parking-lot lighting falls under NEC 410 for fixtures and 225 for outside branch circuits and feeders. Dark-sky and light-trespass ordinances are a municipality-by-municipality conversation — Memorial Villages, for example, enforce stricter fixture cutoff than unincorporated Harris County. We check the AHJ ordinance before the fixture is specified, not after.',
      chips: ['NEC 410', 'NEC 225', 'IES Photometric Files', 'Dark-Sky Compliant Optics', 'Harris County AHJ'],
    },
    relatedSlugs: ['ev-chargers', 'panel-upgrades', 'commercial-warehouses'],
    faqs: [
      {
        q: 'Can you retrofit my existing HID poles to LED?',
        a: 'Usually yes. Existing poles, bases, and conduit stay in place; the fixture head and driver are swapped, the ballast is removed, and the photocell is updated. Energy draw typically drops 55–70 percent, and the fixture warranty resets to the LED product spec.',
      },
      {
        q: 'Will my new LED fixtures be too bright or glare into neighbors?',
        a: 'Not if the photometric is done right. We pick an optical distribution (Type III or IV for most lots) that pushes light into the lot and cuts it at the property line. Dark-sky cutoff fixtures are available when the municipality requires them.',
      },
      {
        q: 'Do photocells come standard or are they an add-on?',
        a: 'Standard on every fixture we install. A commercial lot without a photocell is a lot that is either on at noon or off at 9 pm — neither is acceptable. For tenant-occupied lots we add a timer override for after-hours dimming.',
      },
      {
        q: 'How much will I save on power by going LED?',
        a: 'Typical HID-to-LED retrofit reduces lighting power by 55–75 percent. A 15-pole lot running 400W HID at 12 hours/day saves roughly 18,000 kWh/year at the meter. At Texas commercial rates, that is real money back against the capital cost inside 2–3 years.',
      },
      {
        q: 'Can you add EV chargers to the same parking lot build?',
        a: 'Yes — and it is cheaper to do it at the same time. The trench is already open, the service capacity is being checked, and we can drop EV make-ready conduit to future stall locations while the pavement is up.',
      },
      {
        q: 'Do you handle trenching for new underground lighting feeders?',
        a: 'Yes. Directional bore or open-cut, depending on the pavement and the AHJ. We pull the permits, call 811, and patch the surface to the lot standard when the trench is backfilled.',
      },
    ],
  },
  'ev-chargers': {
    slug: 'ev-chargers',
    icon: 'ev',
    eyebrowNumber: '04',
    heroH1: 'Commercial EV Charger Installation — Level 2 and DCFC.',
    heroLede:
      'Load-managed Level 2 for fleets, offices, and multi-tenant lots. DC fast chargers for retail and fleet yards. Make-ready conduit so the next stall is a pull, not a dig.',
    overview:
      'EV charging stopped being optional two years ago — tenants, fleet managers, retail visitors, and workplace employees all expect it. Solivance Electric designs and installs commercial Level 2 (7.2–19.2 kW) and Level 3 DC fast chargers across Greater Houston. Every build starts with a real capacity check against the existing service — not a hope that the panel can take another 100A. When capacity is tight, we ship dynamic load-management builds that share a circuit without nuisance-tripping during peak demand. Multi-tenant and fleet deployments get per-stall submetering and OCPP-compatible backend selection. When the plan is to add more stalls in year two, we run the make-ready conduit and pull boxes now — so the next install is a pull, not another trench.',
    cost: {
      q: 'How much does a commercial EV charger installation cost?',
      a: 'A single Level 2 charger on existing panel capacity runs $2,800–$6,500 installed (mount, conduit, wire, commissioning). Multi-stall Level 2 builds with load management and submetering run $4,500–$8,500 per stall at scale. A single DC fast charger (50 kW) with service-entrance work and utility coordination runs $55,000–$120,000. A 150 kW DCFC with transformer-level work can push $250,000+.',
      range: '$2,800 per stall – $250,000+ (DCFC)',
      note: 'Service capacity is the biggest variable.',
    },
    timeline: {
      q: 'How long does an EV charger install take?',
      a: 'A single Level 2 charger is a one-day install once material is on site. Multi-stall Level 2 (8–20 stalls) typically runs 1–2 weeks including trenching and panel work. A DC fast charger typically runs 6–12 weeks once permits, utility work, and transformer delivery are factored in — plan ahead.',
      phases: [
        { label: 'Load calc + site walk', duration: 'Same day' },
        { label: 'Design + permit', duration: '2–4 weeks' },
        { label: 'Utility coordination', duration: '4–12 weeks (DCFC)' },
        { label: 'Install + commissioning', duration: '1 day – 2 weeks' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'Capacity check on the existing service',
        detail:
          'We meter the existing service with clamp-on recorders where the historical data is thin, and size the EV load against the real headroom — not the panel nameplate.',
      },
      {
        step: '02',
        title: 'Charger + backend selection',
        detail:
          'OCPP-compatible Level 2 or Level 3 units. ChargePoint, Enel X, EVgo, Blink — whichever your billing/backend path needs. Dynamic load management when capacity is tight.',
      },
      {
        step: '03',
        title: 'Trench, conduit, make-ready',
        detail:
          'Underground conduit to every stall, stub-ups at future-stall locations, pull boxes where the run is long. Concrete bollards and wheel-stop layout per ADA and the property owner.',
      },
      {
        step: '04',
        title: 'Commissioning + network onboarding',
        detail:
          'Chargers live, submetering verified, backend account created, test session billed end-to-end before we call it done.',
      },
    ],
    codeNotes: {
      heading: 'Code, permit, and utility notes',
      body:
        'EV charging equipment is installed under NEC Article 625, with load calculations per NEC 220 and the 2023 continuous-load factor on chargers. Dynamic load management systems must be documented per NEC 625.42. For DC fast chargers, CenterPoint Energy coordination covers transformer sizing, service-entrance upgrades, and sometimes a new primary service drop. Harris County Permits or the local AHJ reviews the install.',
      chips: ['NEC 625', 'NEC 220', 'Harris County Permits', 'CenterPoint Energy', 'OCPP / UL 2594'],
    },
    relatedSlugs: ['panel-upgrades', 'parking-lot-lighting', 'commercial-warehouses'],
    faqs: [
      {
        q: 'Can I add EV chargers to my existing commercial panel?',
        a: 'Often — but only if the capacity is there. A typical commercial service has headroom on paper but is already running close to peak in practice. We clamp-on record the service for 7 days, do a real 220 load calc, and give you a number you can trust. If capacity is tight, dynamic load management or a panel upgrade extends the runway.',
      },
      {
        q: 'What is dynamic load management and why does it matter?',
        a: 'Instead of pulling a new service to feed every new charger, load-managed systems share a feeder. The chargers talk to a controller that throttles each stall in real time so total draw never exceeds the feeder breaker. You get 6–10 stalls on a circuit that would have supported 4 at full wattage — without nuisance tripping.',
      },
      {
        q: 'Do you install DC fast chargers?',
        a: 'Yes — 50 kW through 350 kW DCFC. The electrical scope is substantially larger than Level 2 (transformer work, 480V service, liquid-cooled cables on 350 kW units), and lead times are 6–12 weeks minimum. We handle the CenterPoint transformer coordination as part of the quote.',
      },
      {
        q: 'Can you wire for more stalls later without re-trenching?',
        a: 'That is the point of make-ready infrastructure. We run conduit and pull boxes to every future-stall location while the pavement is already up, cap the stubs, and document the spare capacity. Adding stall #6 is a pull and a bollard — not another trench.',
      },
      {
        q: 'What brands of EV chargers do you install?',
        a: 'OCPP-compatible units from the major commercial brands — ChargePoint, Enel X, Blink, EVgo hardware, Wallbox Commercial, ClipperCreek. Brand selection depends on your backend billing needs, network preferences, and warranty terms. We are not locked to any single vendor.',
      },
      {
        q: 'Will adding chargers raise my insurance or trigger a service upgrade?',
        a: 'Possibly — and both are conversations worth having before the contract is signed. A service upgrade is an opportunity to right-size for future loads (EV expansion, roof-top equipment replacement, added tenants). Insurance implications are a check with your broker, not a guess.',
      },
    ],
  },
  'commercial-warehouses': {
    slug: 'commercial-warehouses',
    icon: 'warehouse',
    eyebrowNumber: '05',
    heroH1: 'New Commercial Warehouse Electrical — Ground Up.',
    heroLede:
      'Service entrance through high-bay LED, dock leveler power, and office build-out. One foreman from the pad to the final inspection.',
    overview:
      'New warehouse construction lives or dies on two things — the electrical being on the GC schedule, and the high-bay lighting being right the first time. Solivance Electric handles the complete electrical scope for new tilt-wall and metal-building warehouse construction across Greater Houston: service-entrance sizing, main switchgear selection and bus setup, feeder distribution to distribution panels, high-bay LED layout with daylight-harvesting controls, dock leveler and overhead-door power, office-fit-out rough-in and trim, data and fire-alarm coordination with the other trades, and the final inspection walk. One foreman from ground-breaking to the final inspection — not a new face every week.',
    cost: {
      q: 'How much does new warehouse electrical cost?',
      a: 'Ground-up commercial warehouse electrical typically runs $6–$12 per square foot for the full scope including service entrance, distribution, high-bay LED, dock power, and office fit-out. A 60,000 sq ft tilt-wall warehouse falls in the $360,000–$720,000 range. Heavier industrial loads (food-processing, cold-storage compressors, manufacturing machinery) push higher. Final pricing is a design-build conversation against the GC drawings.',
      range: '$6 – $12 per sq ft · $360k+ typical',
      note: 'Design-build quoted against GC drawings.',
    },
    timeline: {
      q: 'How long does new warehouse electrical take?',
      a: 'Typical 60–120k sq ft warehouse takes 4–10 weeks of on-site electrical, sequenced against the GC schedule — underground rough-in, service entrance, in-wall, tilt-wall-up electrical, high-bay layout after the deck is on, office build-out, dock and overhead-door power, trim, commissioning, final. We work the GC schedule, not our own.',
      phases: [
        { label: 'Design-build drawings', duration: '2–4 weeks' },
        { label: 'Underground + service', duration: '1–2 weeks on site' },
        { label: 'In-wall + high-bay', duration: '3–6 weeks on site' },
        { label: 'Trim + commissioning', duration: '1–2 weeks' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'Design-build against GC drawings',
        detail:
          'Single-line diagram, panel schedule, load calcs, fixture count, high-bay layout. Stamped where required. Coordinated with MEP before a hole is dug.',
      },
      {
        step: '02',
        title: 'Underground rough-in',
        detail:
          'Service entrance conduits, site lighting feeders, dock-door stubs, future-expansion conduit — all in before the slab goes down.',
      },
      {
        step: '03',
        title: 'Gear + high-bay install',
        detail:
          'Main switchgear set. Feeders run to sub-panels. High-bay LED layout installed after the roof deck is on, with daylight sensors and occupancy zones programmed.',
      },
      {
        step: '04',
        title: 'Trim, commissioning, final',
        detail:
          'Dock leveler power, office trim, data cable terminations, fire-alarm tie-in with the fire subcontractor, commissioning, punch-list, and final inspection.',
      },
    ],
    codeNotes: {
      heading: 'Code, permit, and utility notes',
      body:
        'Commercial warehouse electrical is designed under NEC Articles 200s (service and feeders) and 410 (lighting) with local amendments. High-bay LED layouts are photometric-designed to IES standards and often coordinated with an ASHRAE 90.1 energy review. Service-entrance equipment is selected for the AIC (available interrupting current) of the CenterPoint feeder at that address — not a guess from the spec sheet.',
      chips: ['NEC 220/230', 'NEC 410', 'ASHRAE 90.1', 'Harris County Permits', 'CenterPoint SCCR'],
    },
    relatedSlugs: ['panel-upgrades', 'parking-lot-lighting', 'generator-installs'],
    faqs: [
      {
        q: 'Do you work directly with the GC or through an MEP?',
        a: 'Both. We prefer to come in on design-build when the GC will let us, so we coordinate the electrical scope directly against the architectural and MEP drawings. On projects with a stamped MEP design already in place, we bid to spec and build to spec.',
      },
      {
        q: 'Do you handle the high-bay lighting design?',
        a: 'Yes. Photometric layout, fixture count, wattage, color temperature, daylight-harvesting zones, and occupancy sensors. The lighting spec leaves the design desk as an IES file, not a fixture count.',
      },
      {
        q: 'Can you coordinate with the other subs — fire, data, HVAC?',
        a: 'That is part of the job on a commercial warehouse. Fire-alarm tie-in with the fire sub, data cable pathways in the ceiling grid, roof-top unit disconnects and wiring with the mechanical sub, overhead-door controls with the door installer. The scheduling is as much of the work as the wiring.',
      },
      {
        q: 'Do you pull office fit-out inside the warehouse?',
        a: 'Office rough-in and trim are in the standard scope. Multi-tenant office within a warehouse shell adds sub-metering and separate panels, which gets quoted as an additional line item.',
      },
      {
        q: 'Can you run future-expansion conduit in the underground?',
        a: 'Always recommended. Future EV chargers, future high-bay additions, future exterior lighting, future equipment feeders — conduit is cheap to run with the trench already open. We stub it, cap it, and document it on the record drawings.',
      },
      {
        q: 'Who handles the utility coordination for the service entrance?',
        a: 'We do. CenterPoint Energy service request, transformer sizing, primary service drop scheduling, meter coordination, and the final connection inspection are in our scope. The GC is not chasing the utility.',
      },
    ],
  },
  pedestals: {
    slug: 'pedestals',
    icon: 'pedestal',
    eyebrowNumber: '06',
    heroH1: 'RV Park Pedestals — Installed to Utility and NEC Spec.',
    heroLede:
      '30A, 50A, and 100A pedestal arrays for RV parks, mobile-home parks, and temp-service jobsites. Grounding, bonding, and inspection — the first walk.',
    overview:
      'RV pedestals look simple on a spec sheet and fail utility inspection for the same three reasons every time — the grounding electrode conductor is wrong, the NEMA configuration on the receptacle is wrong for the rated duty cycle, or the bonding jumpers at the pedestal and the service disconnect are missing. Solivance Electric installs pedestal arrays for RV parks, mobile-home parks, and temporary jobsite services across Greater Houston. Trenching, proper ground rods, weather-rated NEMA 3R enclosures, correct receptacle selection (14-50 for 50A, TT-30 for 30A), and utility coordination with CenterPoint or the local co-op.',
    cost: {
      q: 'How much does an RV park pedestal installation cost?',
      a: 'A single pedestal install (30A/50A combo, underground conduit, ground rods, inspection) typically runs $1,400–$3,200. Multi-pedestal park arrays with trenching, panelboard, distribution, and metering run $1,800–$4,500 per pedestal depending on lot count and trench length. Mobile-home park arrays with individual meter sockets run higher. Pricing scales with distance from the service entrance — the long runs are where the cost lives.',
      range: '$1,400 – $4,500+ per pedestal',
      note: 'Per-pedestal; scales with trench length.',
    },
    timeline: {
      q: 'How long does pedestal installation take?',
      a: 'A single jobsite temp-service pedestal is a 1-day install. Small RV park arrays (5–15 pedestals) run 1–2 weeks on site including trenching and panelboard. Large park builds (30+ pedestals with metering and submetering) run 4–8 weeks. Utility inspection timing sits on top.',
      phases: [
        { label: 'Site walk + design', duration: '2–5 business days' },
        { label: 'Permit + material', duration: '1–3 weeks' },
        { label: 'Trench + set + wire', duration: '1–4 weeks on site' },
        { label: 'Inspection', duration: 'Same week' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'Lot layout + load calc',
        detail:
          'Lot count, receptacle mix (30A vs 50A vs 100A), feeder sizing per NEC 551, and the service entrance sizing to handle the demand factor.',
      },
      {
        step: '02',
        title: 'Trench + conduit + ground rods',
        detail:
          'Directional-bore or open-trench per site conditions. Ground rods driven at each pedestal. Conduit sized for pull length and derating.',
      },
      {
        step: '03',
        title: 'Pedestal set + terminations',
        detail:
          'NEMA 3R pedestals, receptacle selection verified against NEMA config, bonding jumpers visible and labeled. Meter sockets installed for individually-metered arrays.',
      },
      {
        step: '04',
        title: 'Utility inspection + energize',
        detail:
          'AHJ and utility inspection walked the same day. Clean blue-tag the first walk. Pedestal array energized, tested, and documented.',
      },
    ],
    codeNotes: {
      heading: 'Code, permit, and utility notes',
      body:
        'RV park electrical installations are governed by NEC Article 551 (recreational vehicles and parks). Demand factors for multi-site feeder sizing, receptacle configuration, grounding, and bonding all live in that article. Mobile-home park installs fall under NEC 552. Temporary jobsite pedestals fall under NEC 590. Weather-rated enclosures are NEMA 3R minimum.',
      chips: ['NEC 551', 'NEC 552', 'NEC 590', 'NEMA 3R', 'Harris County AHJ', 'CenterPoint Energy'],
    },
    relatedSlugs: ['mobile-home-connections', 'panel-upgrades', 'parking-lot-lighting'],
    faqs: [
      {
        q: 'What NEMA receptacle goes on a 50A RV pedestal?',
        a: 'NEMA 14-50R — 50 amps, 125/250V, four-prong. A 30A pedestal gets a TT-30R (not an L5-30). Installing the wrong receptacle on the wrong circuit is the #1 reason these fail inspection.',
      },
      {
        q: 'Do you install individually-metered pedestals for RV park submetering?',
        a: 'Yes. Meter socket on the pedestal, approved utility-grade meter, and submetering back-end setup. Billing integrations are a separate conversation — we provide the hardware and the raw data feed.',
      },
      {
        q: 'What is the demand factor for a 20-pedestal RV park?',
        a: 'NEC 551 gives a demand-factor table. A 20-site park with 50A sites does not require feeder sized for 1,000A — the demand factor at that count is typically 42%, so the feeder and service sizing shrinks to the actual diversified load.',
      },
      {
        q: 'Can you do temporary-service pedestals for construction sites?',
        a: 'Yes. Temp-service pedestals are NEC 590 scope — sized for the construction load, weather-rated, GFCI-protected, and sited for the duration of the project. Pulled when the permanent service energizes.',
      },
      {
        q: 'Do you handle the utility coordination for park service upgrades?',
        a: 'Every time. New service drops from CenterPoint or the local electric co-op, transformer sizing, primary feeder coordination, and the inspection are in our scope.',
      },
      {
        q: 'What is the difference between a mobile-home park pedestal and an RV park pedestal?',
        a: 'NEMA configuration, permanence, and code article. Mobile-home sites are semi-permanent and fall under NEC 552 with larger service connections. RV sites under NEC 551 are transient. The pedestal itself and the feeder sizing are different.',
      },
    ],
  },
  'mobile-home-connections': {
    slug: 'mobile-home-connections',
    icon: 'mobile-home',
    eyebrowNumber: '07',
    heroH1: 'Mobile Home Electrical Connections — Inspected First Walk.',
    heroLede:
      'Service disconnect, feeder, grounding, and bonding to NEC 550. Permit pulled, utility coordinated, inspection signed — tenant has power on move-in day.',
    overview:
      'Mobile home connections look simple and fail inspection anyway. Three reasons: the grounding electrode conductor is not sized to the service, the feeder is rated for the wrong termination temperature, or the service disconnect is sitting in the wrong location relative to the home. Solivance Electric handles the full scope — service disconnect, feeder run from the meter loop to the home panel, grounding, bonding, utility coordination, permit, and the inspection — across Houston, Cypress, Katy, and Memorial. Tenants have power on move-in day, not two weeks later.',
    cost: {
      q: 'How much does a mobile home electrical connection cost?',
      a: 'A standard mobile home service connection (meter loop, service disconnect, feeder to panel, grounding, bonding, permit, inspection) typically runs $1,800–$4,200. Replacements on existing sites with trenching already in place run lower. New sites requiring trench, utility coordination, and a fresh service drop run higher — sometimes substantially so when CenterPoint has to pull a new drop.',
      range: '$1,800 – $4,200 typical',
      note: 'Higher if a new service drop is required.',
    },
    timeline: {
      q: 'How long does a mobile home connection take?',
      a: 'Most mobile home connections complete in 1 working day once material is on site and the permit is issued. Permit pulls run 3–7 business days. Utility drop scheduling (where a new drop is required) sits at 1–3 weeks depending on CenterPoint load.',
      phases: [
        { label: 'Site walk + quote', duration: 'Same day' },
        { label: 'Permit + utility schedule', duration: '3 days – 3 weeks' },
        { label: 'Install + feeder', duration: '1 day on site' },
        { label: 'Inspection', duration: 'Same week' },
      ],
    },
    process: [
      {
        step: '01',
        title: 'Site walk + jurisdiction check',
        detail:
          'Service location, meter loop condition, feeder path, and which AHJ has jurisdiction. Harris County, City of Houston, or the park-specific review — determines the permit path.',
      },
      {
        step: '02',
        title: 'Permit + utility schedule',
        detail:
          'Permit filed with the AHJ. CenterPoint or the local co-op scheduled for the drop if the service is new. Material ordered to match the termination temperature ratings.',
      },
      {
        step: '03',
        title: 'Service disconnect + feeder + bonding',
        detail:
          'Service disconnect sited per NEC 550. Feeder sized and routed to the home panel. Ground rods driven, electrode conductor sized correctly, bonding jumpers visible and labeled.',
      },
      {
        step: '04',
        title: 'Inspection + hand-off',
        detail:
          'AHJ inspection. Clean blue-tag first walk. Utility energizes. Home has power before the tenant arrives.',
      },
    ],
    codeNotes: {
      heading: 'Code, permit, and utility notes',
      body:
        'Mobile home electrical connections are installed under NEC Article 550 (mobile homes, manufactured homes, and mobile-home parks). Service disconnect placement, feeder termination temperature ratings, grounding electrode conductor sizing, and bonding jumper visibility are all specifically called out. Weather-rated service-entrance equipment (NEMA 3R) is required at the exterior service disconnect.',
      chips: ['NEC 550', 'NEC 250 (Grounding)', 'NEMA 3R', 'Harris County AHJ', 'CenterPoint Energy'],
    },
    relatedSlugs: ['pedestals', 'panel-upgrades', 'generator-installs'],
    faqs: [
      {
        q: 'Where does the service disconnect for a mobile home get located?',
        a: 'Within sight of the home and not further than what the AHJ and NEC 550 require — typically at the meter loop pole or on an adjacent pedestal. Mounting it inside the home or at an invisible location is the fast path to a rejected inspection.',
      },
      {
        q: 'Do you handle utility coordination for a new mobile home service drop?',
        a: 'Yes. CenterPoint Energy (or the local co-op) service request, transformer sizing, primary feeder coordination, and the final connection. You are not chasing the utility.',
      },
      {
        q: 'Can you replace the meter loop and feeder on an existing mobile home site?',
        a: 'Often — when the meter base is cracked, the feeder is undersized for modern load, or the grounding is missing. The whole scope gets replaced as one permitted package.',
      },
      {
        q: 'What size feeder does a mobile home need?',
        a: 'NEC 550 sets the minimum at 100A for new installations, with the feeder sized to the calculated load. Most modern mobile homes with electric HVAC and water heat calc out to a 100A or 125A feeder — the 60A services you see on older installs are replaced on any new connection.',
      },
      {
        q: 'Do you install mobile home park infrastructure — meter banks, distribution?',
        a: 'Yes. Park service entrance, meter bank arrays, feeder distribution to pedestals, and the per-site service disconnects are all in our commercial scope.',
      },
      {
        q: 'Can you handle an emergency mobile home service failure?',
        a: 'Yes — our 24-hour emergency line covers mobile home service outages, burnt meter loops, and lost-feeder situations. A licensed electrician picks up any hour.',
      },
    ],
  },
};

export function getServiceContent(slug: string): ServiceContent | null {
  return serviceContent[slug] || null;
}
