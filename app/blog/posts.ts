export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'panel-upgrade-signs-commercial',
    title: 'When Does Your Commercial Building Need a Panel Upgrade?',
    description:
      'Seven warning signs your Houston commercial electrical panel is due for an upgrade, plus the process and what a modern service looks like.',
    date: '2026-03-01',
    readTime: '7 min read',
    category: 'Panel Upgrades',
    image: '/photos_new/panel-upgrades.jpg',
    keywords: [
      'commercial panel upgrade Houston TX',
      'electrical panel replacement Cypress TX',
      '200 amp service upgrade Memorial Houston',
      'commercial electrician Katy',
      'warehouse panel upgrade Houston',
      'flickering lights commercial building',
      'tripped breakers warehouse',
      'NEC code panel upgrade',
    ],
    faqs: [
      {
        q: 'How do I know if my commercial panel needs upgrading?',
        a: 'The clearest signs are frequent breaker trips, flickering lights when equipment starts, a panel that feels warm to the touch, burning smells, visible scorching, or a service rated 100A or less on a building running modern HVAC and equipment loads.',
      },
      {
        q: 'How long does a commercial panel upgrade take?',
        a: 'Most commercial panel upgrades at Solivance Electric take one to two working days on site, with the building de-energized for only a portion of that window. Larger switchgear replacements can run three to five days depending on utility coordination.',
      },
      {
        q: 'What goes into a commercial panel upgrade quote?',
        a: 'The scope is driven by the service size and gear — a straightforward 200A swap is a different job than a 400A or 800A service with new meter bases, disconnects, or switchgear. Service-run length, meter relocation, the condition of the existing grounding, and the utility requirements set the rest. Every job is a fixed-fee quote after a free site walk.',
      },
      {
        q: 'Do you pull the permit and handle the inspection?',
        a: 'Yes. Every panel upgrade we perform includes permit filing, utility coordination with CenterPoint, and the final inspection. You get a clean, code-compliant service without chasing paperwork.',
      },
    ],
    content: `
<p>An electrical panel is the heart of your commercial building. It takes utility power from the street and distributes it safely to every circuit, fixture, and piece of equipment inside. When a panel is undersized, outdated, or failing, the symptoms show up everywhere &mdash; flickering lights, tripped breakers during normal operation, hot panel covers, and nuisance downtime that costs you money every time it happens.</p>
<p>At <strong>Solivance Electric LLC</strong>, panel upgrades are one of our most requested services across Houston, Cypress, Katy, and Memorial. Below we walk through the warning signs that tell you it is time for an upgrade, what the process looks like, and what a modern commercial service should do for your building.</p>

<h2>7 Warning Signs Your Commercial Panel Needs an Upgrade</h2>
<p>Panels rarely fail all at once. They send signals for months &mdash; sometimes years &mdash; before something gives. Here is what to watch for.</p>

<h3>1. Flickering or Dimming Lights</h3>
<p>If your lights dim every time an HVAC compressor kicks on, a compressor pump starts, or a rooftop unit cycles, your service is likely undersized for the real load. A modern panel with correctly sized feeders should not react visibly to normal equipment starts.</p>

<h3>2. Breakers Tripping Under Normal Load</h3>
<p>A breaker is supposed to trip when something is wrong &mdash; a short, a ground fault, or a genuine overload. If yours trip during regular business hours with normal equipment running, either the circuits are overloaded or the breakers themselves are weak and need replacement alongside the panel.</p>

<h3>3. A Warm or Hot Panel Cover</h3>
<p>Walk up and touch the front of your panel. It should feel the same temperature as the wall around it. A panel that is warm, hot, or humming audibly has loose connections, undersized conductors, or failing breakers inside &mdash; and that is the beginning of a fire.</p>

<h3>4. Burning Smell or Visible Scorching</h3>
<p>Any smell of burning plastic near the panel is an emergency. Same with visible scorch marks, melted insulation, or discoloration around breakers. Stop using the affected circuits and call a licensed electrician the same day.</p>

<h3>5. A 60A or 100A Service on a Modern Load</h3>
<p>A lot of older commercial buildings in the Houston area still run on 60A or 100A service entrances that were specified decades ago. Today&rsquo;s buildings run high-efficiency HVAC, LED lighting with drivers, server rooms, EV chargers, and point-of-sale systems &mdash; loads that the original service was never designed to handle.</p>

<h3>6. You Cannot Add Any More Circuits</h3>
<p>If every slot in your panel is full and you need to add a circuit for new equipment, a tenant buildout, or an EV charger, it is usually cheaper to upgrade the whole panel than to tack on a sub-panel that bandages the problem.</p>

<h3>7. Fuse Box or Obsolete Brand Panel</h3>
<p>If your building still has a fuse box or a panel brand with known failure history (Federal Pacific, Zinsco, certain Challenger panels), insurance carriers are increasingly refusing to cover the property until it is replaced. A panel upgrade solves the safety and insurability issue in one step.</p>

<h2>What a Panel Upgrade Actually Does</h2>
<p>When Solivance Electric performs a <a href="/services/panel-upgrades">commercial panel upgrade</a>, we replace the service entrance cable, meter base, main breaker, and panel as a single, code-compliant system. The outcome:</p>
<ul>
  <li>Higher capacity (typical upgrades go from 100A to 200A, 200A to 400A, or to custom switchgear configurations)</li>
  <li>Modern arc-fault and ground-fault protection where code requires</li>
  <li>Room for future circuits &mdash; EV chargers, new HVAC, server gear, additional tenants</li>
  <li>Full compliance with the current NEC and local Houston amendments</li>
  <li>Lower insurance exposure and fewer nuisance outages</li>
</ul>

<h2>The Upgrade Process &mdash; Step by Step</h2>
<p>A straightforward commercial panel upgrade with Solivance Electric runs like this:</p>
<ol>
  <li><strong>Site assessment.</strong> We measure existing load, review your current panel, check the service entrance, and confirm what size the new service needs to be.</li>
  <li><strong>Permit and utility coordination.</strong> We file the permit and coordinate the outage window with CenterPoint so your business is only de-energized for the minimum time required.</li>
  <li><strong>Installation.</strong> On upgrade day, the building is taken offline, the old panel and service entrance are removed, and the new equipment is installed, labeled, and terminated cleanly.</li>
  <li><strong>Inspection and re-energization.</strong> The city inspector signs off, CenterPoint reconnects, and we walk you through the new panel, labels, and any warranty documentation.</li>
</ol>

<h2>What Shapes a Commercial Panel Upgrade Quote</h2>
<p>Every building is different, so we quote each job after a site walk rather than off a price list. The scope is driven by a handful of factors:</p>
<ul>
  <li><strong>Service size and gear.</strong> A 200A single-phase swap is a different scope than a 400A service or an 800A&ndash;1200A switchgear replacement.</li>
  <li><strong>Service-run length and meter location.</strong> Long runs and meter-base relocations add labor and material.</li>
  <li><strong>Existing grounding and bonding.</strong> Bringing an older service entrance up to current code is part of the scope when the existing work falls short.</li>
  <li><strong>Utility requirements.</strong> What CenterPoint requires for the new service drop and cut-over varies by address.</li>
</ul>
<p>You get one fixed-fee number in writing before any material is ordered &mdash; no ballpark over the phone, no surprise changes mid-job.</p>

<h2>Do Not Wait for the Panel to Fail</h2>
<p>The most expensive panel upgrades are the ones that follow an outage, a fire, or a failed insurance inspection &mdash; because by then you are paying for the upgrade, the downtime, and the damage. If your building is showing any of the signs above, get a professional assessment before the panel forces your hand.</p>

<p>Solivance Electric LLC provides licensed, insured commercial electrical service across Houston, Cypress, Katy, and Memorial. <a href="/contact">Request a panel assessment</a> or call us directly &mdash; most quotes come back within 24 hours.</p>
`,
  },
  {
    slug: 'ev-charger-installation-commercial-houston',
    title: 'EV Charger Installation for Houston Commercial Properties',
    description:
      'Level 2 vs DC fast charging, load calculations, permits, and real ROI for commercial EV charger installation in Houston, Cypress, Katy, and Memorial.',
    date: '2026-03-15',
    readTime: '8 min read',
    category: 'EV Chargers',
    image: '/photos_new/ev-chargers.jpg',
    keywords: [
      'EV charger installation Houston TX',
      'commercial EV charging Cypress TX',
      'Level 2 charger Memorial Houston',
      'DC fast charger Houston',
      'workplace EV charging Katy',
      'apartment EV charger installation',
      'fleet charging infrastructure Houston',
      'Tesla commercial charger install',
    ],
    faqs: [
      {
        q: 'What is the difference between Level 2 and DC fast charging?',
        a: 'Level 2 chargers run on 208V or 240V and add about 20 to 30 miles of range per hour. DC fast chargers run on 480V three-phase and can add 100+ miles in 20 minutes. Level 2 is the right answer for workplaces, apartments, and long-dwell retail. DC fast is right for highway corridors, fleets, and quick-turn retail.',
      },
      {
        q: 'How many EV chargers can my building support?',
        a: 'It depends on your available service capacity, existing load, and whether load management is deployed. A quick service-level load calculation answers this in one site visit. Many Houston commercial buildings can support four to eight Level 2 ports without a panel upgrade when load management is used.',
      },
      {
        q: 'Do I need a permit for commercial EV chargers in Houston?',
        a: 'Yes. Every commercial EV charger installation in the City of Houston and Fort Bend County requires an electrical permit and inspection. Solivance Electric handles the permit, inspection scheduling, and any utility coordination end-to-end.',
      },
      {
        q: 'What incentives exist for commercial EV charging?',
        a: 'Federal tax credits (the Alternative Fuel Vehicle Refueling Property Credit, subject to eligibility), utility rebates, and occasional TxDOT or federal NEVI grants can offset a meaningful share of the project. We help you identify what applies before scoping the project.',
      },
    ],
    content: `
<p>Commercial EV charging is no longer a perk &mdash; it is infrastructure your tenants, employees, and customers expect. Houston commercial property owners who installed chargers in 2022 are seeing higher lease-up rates, longer tenant stays, and real revenue from session fees. Those who wait are competing for tenants with a visibly shorter amenity list.</p>
<p>At <strong>Solivance Electric LLC</strong>, we design and install <a href="/services/ev-chargers">commercial EV charging systems</a> across Houston, Cypress, Katy, and Memorial. This guide covers what property owners actually need to know before calling for a quote.</p>

<h2>Level 2 vs DC Fast Charging &mdash; Which Fits Your Property?</h2>
<p>The right charger type depends entirely on how long cars sit at your property.</p>

<h3>Level 2 Charging (7&ndash;19 kW)</h3>
<p>Level 2 is the workhorse of commercial EV charging. It uses standard 208V or 240V power, delivers roughly 20&ndash;30 miles of range per hour, and costs a fraction of DC fast equipment. It is the right answer for:</p>
<ul>
  <li>Office buildings and workplaces (8-hour dwell)</li>
  <li>Apartment and condo parking (overnight dwell)</li>
  <li>Hotels, gyms, and long-dwell retail</li>
  <li>Fleet yards with overnight parking</li>
</ul>

<h3>DC Fast Charging (50&ndash;350 kW)</h3>
<p>DC fast chargers deliver 100+ miles of range in 20 minutes, but they run on 480V three-phase power, require significant service capacity, and cost 8&ndash;15x more per port than Level 2. They fit:</p>
<ul>
  <li>Highway-adjacent convenience retail</li>
  <li>Fleet depots with short turnaround</li>
  <li>Quick-turn retail (grocery, pharmacy, drive-thru)</li>
  <li>Dedicated public charging plazas</li>
</ul>

<h2>Site Assessment &mdash; What We Look At First</h2>
<p>Before we quote a single port, we walk the site and collect:</p>
<ul>
  <li><strong>Existing service capacity.</strong> Size of the main service, panel schedule, and existing peak demand.</li>
  <li><strong>Charger locations.</strong> Distance from panel to parking, trenching or conduit requirements, accessibility, and future expansion.</li>
  <li><strong>Utility service.</strong> Whether the transformer on site can support added load, or whether a utility upgrade is required.</li>
  <li><strong>ADA, signage, and code compliance.</strong> Required accessible stalls, clearance, signage, and local amendments.</li>
</ul>

<h2>Load Calculation &mdash; The Step Most Contractors Skip</h2>
<p>The biggest mistake we see on commercial EV projects is contractors quoting charger installs without running a real NEC Article 220 load calculation. That is how buildings end up with nuisance trips six months later, or with a stranded panel that cannot support anything else.</p>
<p>A proper load study looks at existing metered demand over 12 months, applies the correct diversity factors, and confirms whether load management (which throttles charger output during peak building load) can keep you under service capacity. Many commercial buildings can add four to eight Level 2 ports without upgrading the main service when load management is deployed correctly.</p>
<p>When the calculation shows the service cannot support the planned load, the honest answer is a <a href="/services/panel-upgrades">panel upgrade</a> alongside the chargers. We build that into the quote rather than discovering it mid-install.</p>

<h2>Permitting &mdash; What to Expect in Houston</h2>
<p>Every commercial EV charger install in the City of Houston, Cypress, Katy, and Memorial requires an electrical permit and inspection. On DC fast-charging projects, you will also coordinate with CenterPoint on service size and transformer capacity, which can add weeks to the timeline.</p>
<p>We file the permit, schedule the inspection, and handle any utility coordination. The only thing we ask of the property owner is access and a decision on charger model and networking.</p>

<h2>ROI and Tenant Attraction</h2>
<p>The financial case for commercial EV charging looks like this:</p>
<ul>
  <li><strong>Tenant attraction and retention.</strong> Surveys from major commercial brokers consistently show EV charging in the top five amenities prospective tenants ask about.</li>
  <li><strong>Session revenue.</strong> Networked Level 2 ports generate per-kWh session-fee revenue through the charging network, which can offset operating cost in high-use workplace and multifamily settings.</li>
  <li><strong>Federal tax credit.</strong> The Alternative Fuel Vehicle Refueling Property Credit can offset a share of the installed project (subject to eligibility and location).</li>
  <li><strong>Lease differentiation.</strong> Commercial properties advertising EV charging lease faster and support modestly higher rents in competitive submarkets.</li>
</ul>

<h2>What Shapes an EV Charging Quote</h2>
<p>We quote each project after a site walk rather than off a price list, because the scope swings widely with the install:</p>
<ul>
  <li><strong>Charger type and count.</strong> A single wall-mount Level 2 port is a different scope than a networked multi-port pedestal build, and a DC fast charger is a different scope again.</li>
  <li><strong>Service capacity.</strong> Whether the existing panel has headroom, needs load management, or needs a service upgrade is the biggest variable.</li>
  <li><strong>Trenching and conduit.</strong> Distance from the panel to the stalls and the surface being crossed drive the underground work.</li>
  <li><strong>Utility coordination.</strong> DC fast charging often adds transformer and service-entrance work with CenterPoint.</li>
</ul>
<p>The fastest way to a real number is a one-hour site walk &mdash; we tell you what your building can support and quote the all-in scope in writing.</p>

<h2>Start With a Site Assessment</h2>
<p>The cheapest way to get to a real number on your project is a one-hour site walk with an electrician who installs commercial EV chargers for a living. We will tell you honestly whether your building needs a service upgrade, how many ports it can support, and what the all-in number looks like.</p>

<p>Solivance Electric LLC installs commercial EV charging across Houston, Cypress, Katy, and Memorial. <a href="/contact">Request a commercial EV site assessment</a> and we will follow up within one business day.</p>
`,
  },
  {
    slug: 'backup-generator-houston-business',
    title: 'Why Every Houston Business Needs a Backup Generator',
    description:
      'Gulf storm risk, standby vs portable, sizing, ATS, fuel planning — everything Houston commercial property owners need to know about backup generator installation.',
    date: '2026-04-01',
    readTime: '8 min read',
    category: 'Generators',
    image: '/photos_new/generator-installs.jpg',
    keywords: [
      'commercial generator installation Houston TX',
      'backup generator Cypress TX',
      'standby generator Memorial Houston',
      'warehouse generator Katy',
      'hurricane generator Houston business',
      'automatic transfer switch commercial',
      'natural gas generator Houston',
      'commercial generator sizing',
    ],
    faqs: [
      {
        q: 'How long does a commercial generator installation take?',
        a: 'Most commercial standby generator installations at Solivance Electric take two to five days on site. Timeline is driven by gas line work, concrete pad curing, and permit inspections. Total project time from signed contract to commissioning is typically four to eight weeks including equipment lead time.',
      },
      {
        q: 'What size generator does my business need?',
        a: 'Generator sizing is based on a load study, not square footage. We measure actual building demand, identify critical loads (HVAC, servers, refrigeration, lighting, security), and size the unit to start and run those loads without nuisance tripping. Typical commercial units range from 22 kW up to 500+ kW.',
      },
      {
        q: 'Standby generator or portable &mdash; which is right for a business?',
        a: 'For a real business, a permanently installed standby generator with automatic transfer is the only professional answer. Portables require a person on site to deploy, do not cover extended outages, and cannot safely power a whole building through proper switchgear.',
      },
      {
        q: 'Do generators run on natural gas or diesel in Houston?',
        a: 'Most commercial standbys in Houston run on natural gas because the utility gas line is more reliable than diesel fuel logistics during a prolonged storm event. Diesel makes sense for critical facilities that need 72+ hours of runtime or where gas service is not available.',
      },
    ],
    content: `
<p>Houston is one of the most power-disrupted commercial markets in the country. Hurricanes, tropical storms, derechos, ice storms, and everyday grid events routinely take parts of the metro offline for hours or days. Every hour your business is dark costs you &mdash; in spoiled inventory, lost sales, payroll for idle staff, comfort-of-stay tenant complaints, and reputation with customers who simply went somewhere else.</p>
<p>A properly sized, professionally installed standby generator eliminates that risk. At <strong>Solivance Electric LLC</strong>, we install <a href="/services/generator-installs">commercial standby generators</a> across Houston, Cypress, Katy, and Memorial &mdash; sized and commissioned so the lights come back on 10 seconds after the grid drops, without anyone having to touch a thing.</p>

<h2>The Gulf Coast Problem</h2>
<p>Three realities make Houston uniquely risky for commercial power:</p>
<ul>
  <li><strong>Hurricane season.</strong> June through November, any Gulf storm can knock out power to hundreds of thousands of meters for days.</li>
  <li><strong>Severe thunderstorm and derecho activity.</strong> The May 2024 derecho and subsequent Hurricane Beryl outages left large parts of the metro dark for a week or more. Grid events outside hurricane season are just as damaging.</li>
  <li><strong>Heat-driven grid strain.</strong> Texas summer demand peaks routinely push the grid to the edge, triggering rolling outages that hit commercial properties without warning.</li>
</ul>
<p>If your business operates in Houston, it is not a question of whether the power will go out &mdash; it is how long your building can stay offline before real money walks out the door.</p>

<h2>Standby vs Portable &mdash; Only One is a Real Answer for a Business</h2>

<h3>Portable Generators</h3>
<p>Portables are fine for residential emergency use and construction jobsites. For a commercial building, they are not a serious solution. They require a person on site to start them, drag extension cords, and cannot safely power a panel through a proper transfer switch. When a real storm hits, your staff is sheltering at home &mdash; not running out to start a generator.</p>

<h3>Permanently Installed Standby Generators</h3>
<p>A permanently installed commercial standby unit sits on a concrete pad outside the building, connects to natural gas or diesel, and ties into the service through an automatic transfer switch. When the utility fails, the generator starts automatically, the ATS transfers the building to generator power within about 10 seconds, and operations resume with no human involvement. When utility power returns, the ATS transfers back and the generator shuts itself down after a cooldown cycle.</p>
<p>That is the only configuration that actually protects a business.</p>

<h2>Generator Sizing &mdash; A Load Study, Not a Guess</h2>
<p>Sizing a commercial generator by square footage or by what a competitor quoted is how buildings end up with a unit that nuisance-trips every time the compressor cycles. A proper sizing exercise looks at:</p>
<ul>
  <li>Actual metered demand over 12 months</li>
  <li>Motor starting loads (HVAC compressors, refrigeration, pumps)</li>
  <li>Critical vs non-critical loads (can we shed the parking lot lights during an outage?)</li>
  <li>Future expansion and tenant buildouts</li>
</ul>
<p>The output of a real load study is a generator that runs the loads you need, starts them without sagging voltage, and has enough headroom to add a tenant or a new compressor without re-engineering.</p>

<h2>The Automatic Transfer Switch (ATS)</h2>
<p>The ATS is the brains of the system. It senses when utility voltage drops below spec, signals the generator to start, waits for it to stabilize, and transfers the load over &mdash; usually in under 10 seconds. On restoration, it watches for stable utility power, transfers back, and sends the generator into a cooldown shutdown.</p>
<p>Commercial ATS sizing has to match or exceed the service amperage. On most commercial projects we install service-entrance-rated ATS units so the transfer switch also acts as the main disconnect &mdash; cleaner install, fewer enclosures, better code compliance.</p>

<h2>Fuel Planning &mdash; Natural Gas vs Diesel</h2>
<p>The fuel decision drives both upfront cost and long-term reliability.</p>

<h3>Natural Gas</h3>
<p>The default for most Houston commercial standbys. Gas utility lines stay pressurized through most storm events &mdash; including hurricanes &mdash; and you never have to refuel. Downside: if the gas utility does go down in a catastrophic event, you are out.</p>

<h3>Diesel</h3>
<p>The right answer for critical facilities (medical, data center, life safety) that need 72+ hours of guaranteed runtime and cannot depend on the gas utility. Downside: tank storage, fuel polishing (diesel degrades), annual refill, and larger footprint.</p>

<p>For most Houston commercial buildings &mdash; warehouses, office, multifamily, retail, professional services &mdash; natural gas is the right call.</p>

<h2>What Shapes a Commercial Generator Quote</h2>
<p>We quote each install turnkey after a load study and site walk rather than off a price list. The scope is driven by:</p>
<ul>
  <li><strong>Generator size and phase.</strong> A small single-phase standby for a small office is a different build than a mid-size or large three-phase gen-set for a warehouse, campus, or critical facility.</li>
  <li><strong>Fuel type and gas-line run.</strong> Natural gas versus diesel, and the length of the gas line to the unit, change both the material and the labor.</li>
  <li><strong>Pad, trenching, and ATS sizing.</strong> Concrete pad work, conduit runs, and a service-entrance-rated transfer switch all scope to the building.</li>
  <li><strong>Utility coordination.</strong> Gas-side capacity and metering with CenterPoint are confirmed ahead of the install.</li>
</ul>
<p>Every install is quoted as one turnkey number &mdash; unit, ATS, concrete pad, gas line, commissioning, and permits &mdash; after we size the unit against your real metered load.</p>

<h2>Do Not Wait for the Next Storm</h2>
<p>The one absolute truth about commercial generators in Houston: demand spikes the week before every major storm, lead times go from 6 weeks to 6 months, and the contractors who would have installed yours are booked solid. The time to plan a generator is before you need one.</p>

<p>Solivance Electric LLC designs, installs, and services commercial standby generators across Houston, Cypress, Katy, and Memorial. <a href="/contact">Request a generator consultation</a> and we will walk your site, size the unit properly, and deliver a real quote within days &mdash; not weeks.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
