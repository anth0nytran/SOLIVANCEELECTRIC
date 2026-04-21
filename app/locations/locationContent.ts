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
  'southwest-houston': {
    slug: 'southwest-houston',
    name: 'Southwest Houston',
    fullName: 'Southwest Houston, TX',
    positionLine: 'S Post Oak Rd HQ · Med Center to Sugar Land · 77045',
    heroLede:
      'Licensed commercial and residential electrical contractor headquartered at 13035 S Post Oak Rd Suite I, 77045. Permits pulled at City of Houston, Bellaire, West U, and Fort Bend AHJs; CenterPoint cut-overs coordinated day-in, day-out.',
    description:
      'Southwest Houston is the primary service footprint — the shop sits on S Post Oak Rd in 77045, ten minutes to the Medical Center, five minutes to Meyerland, ten to Bellaire and West University. The commercial mix here is retail pads along 610 and 90, medical office around TMC and NRG, strip-center property management portfolios, warehouse inventory down toward Stafford and Missouri City, and tenant finish-out through Westchase. The residential mix is serious too — older 100A and 150A services due for 200A upgrades across Westbury, Meyerland, and Braeswood; whole-home Generac installs through Bellaire and West U; Tesla wall connector and Level 2 EV charger builds on a weekly basis. Trucks leave the shop every morning going north to the Heights and west to the Villages; Southwest Houston is the neighborhood we cover twice a day.',
    zipCodes: ['77045', '77035', '77096', '77401', '77005', '77030', '77025', '77477'],
    neighborhoods:
      'Westbury · Meyerland · Bellaire · West University · Braeswood · Medical Center · Sharpstown · Stafford · Sugar Land',
    ahjNotes:
      'Most of the Southwest Houston footprint is City of Houston AHJ — permits filed through the Houston Permitting Center, inspections booked through the city portal. Bellaire and West University Place are their own AHJs with their own permit offices. Stafford, Missouri City, and Sugar Land sit in Fort Bend County with their own city-level permit routes. CenterPoint Energy is the electric utility across the territory. We verify AHJ by address before the quote is fixed-fee.',
    projects: [
      { scope: '400A 3-phase service upgrade', building: 'Medical office near TMC', days: '3 days' },
      { scope: '200A residential panel upgrade + whole-home surge', building: 'Westbury 1960s ranch', days: '1 day' },
      { scope: '48 kW whole-home Generac with ATS', building: 'Bellaire custom home', days: '2 days' },
      { scope: 'Tesla Wall Connector × 2 + panel capacity upgrade', building: 'West University residence', days: '1 day' },
      { scope: 'Parking-lot LED retrofit — 18 poles', building: 'Meyerland retail center', days: '4 days' },
      { scope: 'Level 2 EV × 8 + DCFC × 1', building: 'Sugar Land office park', days: '8 days' },
    ],
    faqs: [
      {
        q: 'Where is Solivance Electric physically located in Southwest Houston?',
        a: 'The shop is at 13035 S Post Oak Rd Suite I, Houston, TX 77045 — off S Post Oak between Fondren Southwest and West Bellfort, a short drive to Westbury, Meyerland, the Medical Center, and NRG. Trucks dispatch from that address daily.',
      },
      {
        q: 'Do you serve both commercial and residential in Southwest Houston?',
        a: 'Yes. Commercial is the bulk of the work — panel upgrades up to 3-phase, parking-lot lighting, EV charger builds for office lots and multi-tenant retail, and warehouse electrical toward Stafford and Sugar Land. Residential runs in parallel: 200A and 320A service upgrades on older Westbury/Meyerland homes, whole-home standby generators through Bellaire and West U, and Tesla/Level 2 EV installs on a weekly basis.',
      },
      {
        q: 'How fast can you get to a Southwest Houston emergency?',
        a: 'Inside the 610/Beltway triangle around 77045, a truck is usually on site inside 45 minutes on a business day, faster after hours when traffic clears. The 24-hour line is answered by a licensed electrician.',
      },
      {
        q: 'Do you pull City of Houston, Bellaire, West U, and Fort Bend permits?',
        a: 'Every week. Houston Permitting Center for the City of Houston footprint (77045, 77035, 77096, 77025, 77074, 77036, 77042, 77054, 77030). Bellaire and West University Place each have their own AHJ and we file through them. Fort Bend County cities (Stafford, Missouri City, Sugar Land) get their own routing. We confirm jurisdiction by address before the quote goes out.',
      },
      {
        q: 'Do you work the Medical Center and NRG area?',
        a: 'Yes. Medical office panel upgrades, standby generator installs for clinics and imaging suites, parking-structure lighting retrofits, and EV charging station builds for clinic campuses and NRG-adjacent lots.',
      },
    ],
  },
  heights: {
    slug: 'heights',
    name: 'The Heights',
    fullName: 'Houston Heights, TX',
    positionLine: 'Houston Heights · Garden Oaks · Oak Forest · Timbergrove',
    heroLede:
      'Licensed electrical contractor working the Heights corridor — Houston Heights, Garden Oaks, Oak Forest, Timbergrove. City of Houston permits pulled, HAHC historic district overlay handled, inspections passed on the first walk.',
    description:
      'The Heights is a mix most electricians underestimate — historic bungalows and craftsman homes with original 60A–150A services, new construction infill on every other lot, a White Oak and 19th Street retail corridor that runs tenant finish-out year-round, and a commercial strip along I-10 and 610 that never slows down. Solivance Electric runs the Heights corridor daily from the 77045 shop, pulling City of Houston permits, coordinating CenterPoint cut-overs, and handling the HAHC (Houston Archaeological and Historical Commission) overlay where it applies on Heights historic district addresses.',
    zipCodes: ['77008', '77009', '77007', '77018', '77092', '77022'],
    neighborhoods:
      'Houston Heights · Woodland Heights · Norhill · Garden Oaks · Oak Forest · Timbergrove · Shady Acres',
    ahjNotes:
      'The Heights corridor is City of Houston AHJ — permits through the Houston Permitting Center, inspections on the city portal. Heights historic district addresses fall under HAHC overlay for exterior work (service mast relocation, exterior conduit routing) and we handle that submission as part of the scope. CenterPoint Energy is the utility.',
    projects: [
      { scope: '200A service upgrade + meter relocation', building: '1925 Heights bungalow', days: '2 days' },
      { scope: '22 kW standby generator + ATS', building: 'Woodland Heights custom home', days: '2 days' },
      { scope: 'Tenant finish-out electrical', building: 'White Oak retail suite', days: '6 days' },
      { scope: 'Full rewire + panel upgrade', building: 'Norhill 1930s home', days: '5 days' },
      { scope: 'Parking-lot LED retrofit', building: 'Oak Forest strip center', days: '3 days' },
    ],
    faqs: [
      {
        q: 'Do you work Heights historic district addresses under HAHC overlay?',
        a: 'Yes. Service mast relocation, meter placement, and exterior conduit routing on HAHC-protected addresses need a certificate of appropriateness before permitting. We handle the HAHC submission as part of the scope — no passing that paperwork back to the homeowner.',
      },
      {
        q: 'Can you upgrade the 60A/100A services common on older Heights bungalows?',
        a: 'Routinely. Most 1920s–1940s Heights homes are on original or mid-century services that cannot carry a modern kitchen, mini-split HVAC, and EV charger on the same day. The typical upgrade path is 60A → 200A with a new meter loop, main panel, and dedicated circuits for the kitchen and HVAC. Inspection passes the first walk.',
      },
      {
        q: 'Do you handle tenant finish-out for Heights retail and restaurant spaces?',
        a: 'Yes. White Oak, 19th Street, Studewood, and the Heights Mercantile corridor get regular tenant finish-out scope — panel sizing, sub-panels, hood and kitchen equipment circuits, data/POS rough-in, and final inspection tied to the opening date.',
      },
      {
        q: 'Do you cover Garden Oaks, Oak Forest, and Timbergrove too?',
        a: 'Yes — same route. Older mid-century homes across Garden Oaks and Oak Forest have the same panel-upgrade demand as the Heights proper, and Timbergrove sees steady whole-home generator and EV install work.',
      },
    ],
  },
  bellaire: {
    slug: 'bellaire',
    name: 'Bellaire',
    fullName: 'Bellaire, TX',
    positionLine: 'Bellaire · West University Place · Braeswood · Premium residential + retail',
    heroLede:
      'Licensed electrical contractor working Bellaire, West University Place, and the Braeswood corridor. Bellaire and West U permits pulled directly, CenterPoint cut-overs coordinated, inspections passed the first walk.',
    description:
      'Bellaire and West University Place are their own incorporated cities with their own AHJs — smaller, faster permit offices than City of Houston, and inspectors who know which licensed contractors actually show up. The residential footprint here is premium: custom-built and teardown-rebuild homes, 400A services on new builds, whole-home Generac installs on roughly half the new construction in West U, and EV charger demand that has doubled year over year. Commercial work runs the Bellaire Blvd retail corridor and the office/medical inventory between Bellaire and the Medical Center. Solivance Electric covers this footprint out of the Southwest Houston shop on S Post Oak — fifteen minutes door to door.',
    zipCodes: ['77401', '77005', '77081', '77096', '77025'],
    neighborhoods:
      'Bellaire · West University Place · Southside Place · Braeswood Place · South Braeswood · Old Braeswood · Linkwood · Rice Village perimeter',
    ahjNotes:
      'Bellaire and West University Place are each their own city AHJ with their own permit offices — not City of Houston. The Braeswood/Linkwood addresses inside Houston city limits go through Houston Permitting Center. CenterPoint Energy is the electric utility across the territory. We verify AHJ by the exact address before the quote.',
    projects: [
      { scope: '400A service upgrade on new construction', building: 'West University custom home', days: '2 days' },
      { scope: '26 kW whole-home Generac + ATS', building: 'Bellaire residence', days: '2 days' },
      { scope: 'Tesla Wall Connector × 2 + panel upgrade', building: 'Braeswood Place home', days: '1 day' },
      { scope: 'Retail tenant finish-out', building: 'Bellaire Blvd strip center', days: '5 days' },
      { scope: 'Full rewire + service upgrade', building: 'Southside Place 1940s home', days: '6 days' },
    ],
    faqs: [
      {
        q: 'Do you pull Bellaire and West University permits?',
        a: 'Every week. Bellaire permit office and West University Place permit office are both separate AHJs from City of Houston — smaller staffs, faster turnarounds, and inspectors who see our trucks regularly. We file, schedule, and walk the inspection.',
      },
      {
        q: 'Can you handle 400A new-construction services in West U and Bellaire?',
        a: 'Routinely. New builds in West University and Bellaire are almost all spec-ing 320A or 400A services now to handle modern load: dual HVAC, EV make-ready in the garage, pool equipment, and standby generator tie-in. We size the service to the 2023 NEC demand calc, not a guess.',
      },
      {
        q: 'Do you install whole-home generators in Bellaire and West U?',
        a: 'Yes — multiple per month. Generac, Kohler, and Cummins air-cooled and liquid-cooled standby installs with ATS commissioning, fuel plumbing, emissions paperwork, and the first annual service on the calendar before we leave.',
      },
      {
        q: 'Do you handle Tesla Wall Connector and Level 2 EV installs?',
        a: 'Routinely. Most West U and Bellaire homes need a panel capacity check and often a sub-panel in the garage before the charger goes in. We pull the permit, size the circuit, and commission the charger on the Tesla app or the OEM app before leaving.',
      },
    ],
  },
  'memorial-villages': {
    slug: 'memorial-villages',
    name: 'Memorial Villages',
    fullName: 'Memorial Villages, TX',
    positionLine: 'Hunters Creek · Spring Valley · Bunker Hill · Piney Point · Hedwig',
    heroLede:
      'Licensed electrical contractor working the six incorporated Memorial Villages — Hunters Creek, Spring Valley, Bunker Hill, Piney Point, Hedwig, and Hilshire. Each village is its own AHJ; we know the permit path for all of them.',
    description:
      'The Memorial Villages are the most fragmented AHJ territory in the Solivance footprint — six separate incorporated villages, each with its own permit office, exterior-equipment ordinances, and inspector. Hunters Creek Village and Spring Valley Village are a regular daily run from the 77045 shop, the same with Bunker Hill, Piney Point, and Hedwig. Piney Point and Hedwig in particular enforce stricter exterior-work ordinances — generator setbacks, ATS enclosure placement, dark-sky cutoff requirements on exterior lighting — and we flag those in the quote before the gen-set gets sited. The residential premium here is serious; older services due for 320A–400A upgrades, standby generator demand after every hurricane, and EV charger builds in almost every new build.',
    zipCodes: ['77024', '77055', '77043', '77063'],
    neighborhoods:
      'Hunters Creek Village · Spring Valley Village · Bunker Hill Village · Piney Point Village · Hedwig Village · Hilshire Village · Memorial corridor · Tanglewood · Town & Country',
    ahjNotes:
      'Six separate incorporated Memorial Villages, each its own AHJ: Hunters Creek Village, Spring Valley Village, Bunker Hill Village, Piney Point Village, Hedwig Village, and Hilshire Village. Piney Point and Hedwig have stricter exterior-equipment ordinances (generator setbacks, ATS placement, dark-sky lighting cutoffs). City of Houston and unincorporated Harris County pockets sit between the villages — we verify AHJ by the exact address before the quote is fixed-fee.',
    projects: [
      { scope: '400A service upgrade + meter relocation', building: 'Piney Point Village residence', days: '3 days' },
      { scope: '48 kW standby generator + ATS', building: 'Hunters Creek Village home', days: '3 days' },
      { scope: '22 kW standby generator + ATS', building: 'Spring Valley Village home', days: '2 days' },
      { scope: 'Tesla Wall Connector × 2 + garage sub-panel', building: 'Bunker Hill Village residence', days: '1 day' },
      { scope: 'Commercial panel upgrade + lot lighting', building: 'Memorial Dr office pad', days: '4 days' },
    ],
    faqs: [
      {
        q: 'Do you serve all six Memorial Villages?',
        a: 'Yes — Hunters Creek, Spring Valley, Bunker Hill, Piney Point, Hedwig, and Hilshire. Each village is its own AHJ with its own permit office and inspector; we know the path for each and file accordingly.',
      },
      {
        q: 'Do Piney Point and Hedwig have special rules on generator placement or exterior lighting?',
        a: 'Yes. Both villages enforce exterior-equipment setback requirements (generator and ATS enclosure placement) and dark-sky cutoff requirements on exterior lighting. We flag those in the quote before the gen-set is sited — nobody wants to move a 1,500-pound Generac after the slab is poured.',
      },
      {
        q: 'Can you handle 400A residential service upgrades in the Villages?',
        a: 'Routinely. Older services on 1970s–1990s Villages homes are being upsized to 320A or 400A to carry dual HVAC, a standby generator tie-in, EV charging, and pool equipment on one modern panel. We pull the village permit, coordinate the CenterPoint cut-over, and pass inspection the first walk.',
      },
      {
        q: 'How fast can you get to a Memorial Villages emergency?',
        a: 'From the 77045 shop, a truck is usually on site in 25–40 minutes on a business day, depending on traffic on 610 and Beltway 8. The 24-hour line is answered by a licensed electrician.',
      },
    ],
  },
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

export const locationOrder = ['southwest-houston', 'heights', 'bellaire', 'memorial-villages', 'houston', 'memorial', 'katy', 'cypress'];
