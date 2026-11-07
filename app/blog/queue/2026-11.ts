import type { BlogPost } from '../types';

export const posts_2026_11: BlogPost[] = [
  {
    slug: 'briggs-stratton-standby-generator-houston-sizing',
    title: 'Sizing a Briggs & Stratton Standby Generator in Houston',
    description:
      'How Solivance Electric sizes a Briggs & Stratton standby generator for a Houston home or business: load calc, AC start-up, fuel, and service size.',
    date: '2026-11-07',
    readTime: '7 min read',
    category: 'Generators',
    image: '/photos_new/generator-installs.jpg',
    keywords: [
      'Briggs & Stratton generator dealer Houston',
      'standby generator sizing Houston',
      'what size generator do I need Houston',
      'whole home generator Bellaire',
      'generator load calculation NEC 220',
      'commercial standby generator Houston',
      'generator installer Sugar Land',
      'authorized Briggs & Stratton dealer Texas',
    ],
    faqs: [
      {
        q: "How do I know what size standby generator my Houston home needs?",
        a: "Sizing starts with a load calculation under NEC 220 and a look at the air conditioning. Solivance Electric counts the loads you want running during an outage, adds the start-up current of the largest AC compressor, and matches a generator with headroom. Square footage alone does not set the size.",
      },
      {
        q: "Can Solivance Electric sell me the generator and install it?",
        a: "Yes. Solivance Electric is an authorized Briggs & Stratton standby generator dealer. The unit can be purchased alone or with a full install that covers the pad, transfer switch, gas coordination, wiring, permits, and commissioning. Call (832) 965-9964 or request a quote on the generators page.",
      },
      {
        q: "Does a bigger generator always cost more to run?",
        a: "A generator burns fuel in proportion to the load it carries, plus a base amount just to idle at speed. An oversized unit on a light load wastes some fuel and costs more up front. An undersized unit trips or stalls when the AC starts. The right size sits between those two.",
      },
      {
        q: "Will my existing electrical service work with a standby generator?",
        a: "Most 200A residential services in Houston take a standby generator and automatic transfer switch without a panel upgrade. Older 100A or 150A services, full panels, and obsolete panel brands sometimes need work first. Solivance Electric checks the service during the free site walk and lists any required work in the fixed-fee quote.",
      },
    ],
    content: `
<p>Solivance Electric is an authorized <strong>Briggs &amp; Stratton standby generator dealer</strong>. That means a Houston homeowner or business owner can buy the generator from us, have us install it, or both. Before either happens, the unit has to be sized. A generator that is too small trips off the first time the AC compressor starts. A generator that is too large costs more than it needs to and runs lightly loaded for its whole life.</p>
<p>This post covers how Solivance Electric sizes a standby generator for a house in Bellaire or a strip center in Stafford, what goes into the number, and what to have ready before the site walk.</p>

<h2>How do you size a standby generator for a Houston home?</h2>
<p><strong>A standby generator is sized from a load calculation, not from square footage.</strong> Solivance Electric lists every load you want running during an outage, totals the running watts, then adds the start-up surge of the largest motor &mdash; almost always the AC compressor. The generator has to carry the running load and survive that surge without the voltage collapsing.</p>
<p>That is the short answer. The rest of this post is the long one.</p>

<h2>What goes into the load calculation?</h2>
<p>The NEC gives two sizing paths for an optional standby system under Article 702. Either the generator carries every load the transfer switch can connect, calculated per NEC 220, or the install uses automatic load management so the generator never sees more than it can carry. Both are legal. The second is how a smaller unit covers a larger house.</p>
<p>On the site walk, Solivance Electric records:</p>
<ul>
  <li><strong>Service size.</strong> 100A, 150A, 200A, or 400A (often a 320A meter base with two 200A panels).</li>
  <li><strong>AC equipment.</strong> Number of systems, tonnage, and the nameplate data on each condenser.</li>
  <li><strong>Heating.</strong> Gas furnace or electric heat strips. Heat strips are a large resistive load and matter in a freeze.</li>
  <li><strong>Large appliances.</strong> Electric range, electric dryer, electric water heater, pool pump, well pump, EV charger.</li>
  <li><strong>Must-run loads.</strong> Refrigerators, freezers, medical equipment, sump pumps, network gear, security.</li>
  <li><strong>Fuel.</strong> Natural gas meter size and location, or room for a propane tank.</li>
</ul>
<p>The math under the hood is simple. Watts equal volts times amps. A 240V load drawing 20A is 4,800 watts, or 4.8 kW. Add up what will run at the same time, and the total is the running load.</p>

<h2>Why does the air conditioner drive the size?</h2>
<p>In Houston, the AC is the load that decides the generator. A compressor draws several times its running current for the first fraction of a second as it starts &mdash; the locked-rotor current on the nameplate. A generator has to supply that surge while everything else is already running.</p>
<p>Two houses with the same square footage can need very different generators:</p>
<table>
  <thead>
    <tr><th>Factor</th><th>Pushes the size up</th><th>Pulls the size down</th></tr>
  </thead>
  <tbody>
    <tr><td>AC systems</td><td>Two or three condensers that can start together</td><td>One system, or a soft starter on the compressor</td></tr>
    <tr><td>Heating</td><td>Electric heat strips</td><td>Gas furnace</td></tr>
    <tr><td>Appliances</td><td>Electric range, dryer, water heater</td><td>Gas appliances</td></tr>
    <tr><td>Load management</td><td>None &mdash; every load at once</td><td>Load-shed modules that hold back big loads</td></tr>
    <tr><td>Coverage</td><td>Whole-home</td><td>Essential-circuit subpanel</td></tr>
  </tbody>
</table>
<p>A soft starter on the compressor lowers the start-up surge. Load-shed modules let the transfer switch drop a second AC or the dryer when the generator gets close to its limit. Both are common ways to fit a right-sized generator to a Houston house with heavy cooling.</p>

<h2>What about sizing for a business?</h2>
<p>Commercial sizing follows the same logic with different loads. Walk-in coolers, POS systems, server closets, rooftop units, and lighting are the usual list. Three-phase service changes the math, and a business often has to decide which loads go on standby and which ride out the outage. We covered the commercial side in <a href="/blog/backup-generator-houston-business">backup generators for Houston businesses</a>. Retail and restaurant work in Stafford, Missouri City, and Sugar Land runs through our <a href="/services/commercial-centers">commercial center</a> crew.</p>

<h2>Does the electrical service need work first?</h2>
<p>Sometimes. A standby generator connects through an automatic transfer switch at or near the service. If the service is 200A with room in the panel, the install is usually straightforward. If the house still runs on a 100A or 150A service, the panel is full, or the panel is a brand with a known failure history, the generator quote may include a <a href="/services/panel-upgrades">panel upgrade</a>.</p>
<p>The 2023 NEC also requires an outdoor emergency disconnect for one- and two-family dwellings under NEC 230.85. Many service-rated transfer switches satisfy that requirement when they are mounted outside. Solivance Electric confirms how the disconnect is handled during the site walk.</p>

<h2>Natural gas or propane?</h2>
<p>Most homes in Meyerland, West U, the Heights, and the Memorial Villages already have natural gas. A standby generator usually runs on it, but the gas meter has to supply the generator plus the furnace, water heater, and range at the same time. If the meter is too small, CenterPoint can upsize it. Solivance Electric includes that coordination in the install scope.</p>
<p>Homes without natural gas &mdash; some lots in Katy, Cypress, and rural Fort Bend &mdash; run the generator on propane from a tank on site. Tank size sets how long the generator runs between fills.</p>

<h2>What does buying through an authorized dealer change?</h2>
<p>Buying from an authorized dealer means the unit comes through the manufacturer&rsquo;s channel and the install is registered. Warranty terms vary by model; Solivance Electric registers the install as an authorized dealer. You can see the current Briggs &amp; Stratton lineup and pricing on our <a href="/generators">generators page</a>. Call or request a quote to buy the unit alone or with a full install.</p>

<h2>What should I have ready for the site walk?</h2>
<p>The site walk goes faster when a few things are on hand. None of them are required, but each one shortens the list of follow-up questions.</p>
<ul>
  <li>A recent electric bill and gas bill, so the service and gas meter are easy to identify with CenterPoint.</li>
  <li>A list of what has to run in an outage: whole home, or a short list of essential circuits.</li>
  <li>Any medical equipment that needs power, with its plug type and rating.</li>
  <li>Planned loads in the next few years &mdash; an <a href="/services/ev-chargers">EV charger</a>, a pool, an added AC system, a garage apartment.</li>
  <li>HOA rules on equipment placement and screening, if the neighborhood has them.</li>
</ul>
<p>Planned loads matter most. A generator sized for the house today can come up short once a Level 2 charger or a second condenser goes in. Solivance Electric sizes for what is coming, not only for what is there.</p>

<h2>What happens after the site walk?</h2>
<ol>
  <li><strong>Load calculation.</strong> Solivance Electric totals the loads and picks a generator size with headroom.</li>
  <li><strong>Fixed-fee quote.</strong> One number in writing covering the unit, transfer switch, pad, wiring, gas coordination, permits, and commissioning.</li>
  <li><strong>Permits.</strong> We pull the electrical permit with the City of Houston or the local AHJ, and coordinate the gas side.</li>
  <li><strong>Install and inspection.</strong> The generator is set, wired, tested under load, and inspected.</li>
  <li><strong>Walkthrough.</strong> You see the transfer switch run a test transfer before we leave.</li>
</ol>
<p>Our full <a href="/services/generator-installs">generator install</a> page covers the install in more detail, and the <a href="/locations/bellaire">Bellaire</a> page covers HOA and lot-line issues common inside the Loop.</p>

<h2>Ready to size a generator?</h2>
<p>Solivance Electric runs a free site walk, sizes the generator from your actual loads, and hands back a fixed-fee quote. <a href="/contact">Request a site walk</a> or call <strong>(832) 965-9964</strong>. Financing available through Synchrony &mdash; ask about monthly payment options. Subject to credit approval. Details are on the <a href="/financing">financing page</a>.</p>
`,
  },
  {
    slug: 'how-to-finance-a-standby-generator-houston',
    title: 'How to Finance a Standby Generator in Houston',
    description:
      'How generator financing through Synchrony works with Solivance Electric: site walk, fixed-fee quote, credit application, and install. Subject to approval.',
    date: '2026-11-07',
    readTime: '6 min read',
    category: 'Financing',
    image: '/photos_new/generator-installs.jpg',
    keywords: [
      'generator financing Houston',
      'finance a standby generator Texas',
      'Synchrony generator financing',
      'whole home generator payment options Houston',
      'Briggs & Stratton generator financing',
      'standby generator monthly payments Katy',
      'generator install financing Sugar Land',
    ],
    faqs: [
      {
        q: "Does Solivance Electric offer financing on standby generators?",
        a: "Yes. Financing is available through Synchrony for qualifying customers. Ask about monthly payment options when you receive your fixed-fee quote. All financing is subject to credit approval, and the terms are set by Synchrony, not by Solivance Electric.",
      },
      {
        q: "Can the install be financed along with the generator?",
        a: "Solivance Electric quotes the whole project as one fixed-fee number: the Briggs & Stratton unit, transfer switch, pad, wiring, gas coordination, permits, and commissioning. Ask about financing options for that full project number when you get the quote. Approval and terms come from Synchrony and are subject to credit approval.",
      },
      {
        q: "Do I need a quote before I apply for financing?",
        a: "A quote first is the cleaner order. The free site walk sets the generator size and the scope, and the fixed-fee quote gives you the project number. With that number in hand, you can ask about monthly payment options and decide whether financing fits. Subject to credit approval.",
      },
      {
        q: "Where can I read the financing terms?",
        a: "Synchrony provides the terms, disclosures, and credit decision directly to you during the application. Solivance Electric does not set rates or terms. The financing page on our site explains how to start, and the team at (832) 965-9964 can walk you through the next step.",
      },
    ],
    content: `
<p>A standby generator is a large purchase. For a lot of Houston homeowners, the question after &ldquo;what size do I need&rdquo; is &ldquo;how do I pay for it.&rdquo; Solivance Electric offers <strong>financing through Synchrony</strong> on generator projects, including the Briggs &amp; Stratton units we sell and install as an authorized dealer.</p>
<p>This post covers how the process runs, what gets financed, and what to have ready. It does not cover rates or terms &mdash; those come from Synchrony, and they depend on your credit.</p>

<h2>How does generator financing work with Solivance Electric?</h2>
<p><strong>Financing is available through Synchrony &mdash; ask about monthly payment options. Subject to credit approval.</strong> The order is: free site walk, fixed-fee quote, application with Synchrony, credit decision, then scheduling. Synchrony sets the terms and makes the credit decision. Solivance Electric sizes, quotes, permits, and installs the generator.</p>

<h2>What is in the project number?</h2>
<p>A generator project is more than the unit in the box. Solivance Electric quotes the full job as one fixed-fee number after the site walk, so the figure you discuss for financing is the figure you actually pay. A typical scope includes:</p>
<ul>
  <li><strong>The generator.</strong> A Briggs &amp; Stratton standby unit sized from your load calculation. Current lineup and pricing are on the <a href="/generators">generators page</a>.</li>
  <li><strong>Transfer switch.</strong> An automatic transfer switch, often service-rated, and any load-shed modules the sizing calls for.</li>
  <li><strong>Pad and placement.</strong> A pad set to the manufacturer&rsquo;s clearances and the local code.</li>
  <li><strong>Electrical work.</strong> Conductors, conduit, breakers, and the outdoor emergency disconnect under NEC 230.85 if the transfer switch does not already provide it.</li>
  <li><strong>Gas coordination.</strong> Gas line sizing and CenterPoint coordination if the meter needs to be upsized, or propane tank coordination.</li>
  <li><strong>Permits and inspection.</strong> Pulled and scheduled by Solivance Electric.</li>
  <li><strong>Commissioning.</strong> Start-up, a test transfer under load, and a walkthrough.</li>
</ul>
<p>If the electrical service needs work first &mdash; a 100A service, a full panel, or an obsolete panel brand &mdash; the <a href="/services/panel-upgrades">panel upgrade</a> is listed as a separate line in the same quote.</p>

<h2>What are the steps, in order?</h2>
<ol>
  <li><strong>Site walk.</strong> Solivance Electric looks at the service, the AC equipment, the gas meter, and where the generator can sit. No charge.</li>
  <li><strong>Sizing.</strong> We run the load calculation and pick the generator. The sizing method is covered in <a href="/blog/briggs-stratton-standby-generator-houston-sizing">sizing a Briggs &amp; Stratton standby generator in Houston</a>.</li>
  <li><strong>Fixed-fee quote.</strong> One number in writing. No ballpark over the phone.</li>
  <li><strong>Ask about financing.</strong> If you want to pay over time, ask about monthly payment options. You apply with Synchrony, and Synchrony gives you the terms and disclosures.</li>
  <li><strong>Credit decision.</strong> Synchrony makes the decision. Financing is subject to credit approval.</li>
  <li><strong>Order and permit.</strong> Once the project is approved and signed, Solivance Electric orders the unit and pulls permits.</li>
  <li><strong>Install and inspection.</strong> The generator is set, wired, tested, and inspected.</li>
</ol>

<h2>Why get the quote before applying?</h2>
<p>Applying before the project is defined means guessing at a number. The site walk answers the questions that move the number: generator size, whether the service needs an upgrade, how far the generator sits from the panel and the gas meter, and whether the meter needs to be upsized. With a fixed-fee quote in hand, you know exactly what you are asking to finance.</p>

<h2>What does financing compare against?</h2>
<p>Homeowners in Katy, Cypress, Sugar Land, and inside the Loop pay for generator projects a few different ways. Each has trade-offs that depend on your own finances, and Solivance Electric does not give financial advice. The common options are:</p>
<table>
  <thead>
    <tr><th>Option</th><th>What to consider</th></tr>
  </thead>
  <tbody>
    <tr><td>Cash or check</td><td>No application. Uses savings in one payment.</td></tr>
    <tr><td>Financing through Synchrony</td><td>Spreads the cost over time. Terms set by Synchrony. Subject to credit approval.</td></tr>
    <tr><td>Home equity products</td><td>Arranged through your own lender, outside of Solivance Electric.</td></tr>
  </tbody>
</table>
<p>Whichever route you take, the scope and the fixed-fee number from Solivance Electric stay the same.</p>

<h2>Why finance a generator now instead of after the next storm?</h2>
<p>Demand for standby generators climbs after every major outage. After Winter Storm Uri in February 2021 and Hurricane Beryl in July 2024 &mdash; which knocked out power to more than 2 million CenterPoint customers &mdash; installers across the Houston area had waiting lists. Ordering in the off-season, between November and spring, gives the permit and install schedule room before hurricane season starts June 1.</p>
<p>The weather side is simple. Houston gets freezes, derechos like the one in May 2024, and hurricanes. The generator has to be on the pad and commissioned before any of them, not ordered after.</p>

<h2>What does financing not change?</h2>
<p>Paying over time changes how the project is paid for. It does not change how the project is built. The same items apply whether the job is paid in full or financed:</p>
<ul>
  <li><strong>The scope.</strong> The generator size, transfer switch, and electrical work come from the load calculation, not the payment method.</li>
  <li><strong>The fixed fee.</strong> The project number in the quote is the number. No change orders for routine items Solivance Electric should have caught on the site walk.</li>
  <li><strong>Permits and inspection.</strong> Every install is permitted with the City of Houston or the local AHJ and inspected.</li>
  <li><strong>Commissioning.</strong> A test transfer under load before the crew leaves.</li>
  <li><strong>Registration.</strong> Warranty terms vary by model; Solivance Electric registers the install as an authorized Briggs &amp; Stratton dealer.</li>
</ul>

<h2>What questions should I ask before applying?</h2>
<p>Synchrony provides the terms and disclosures during the application. Read them before you sign. Useful questions to have answered in writing:</p>
<ul>
  <li>What are the full terms of the offer, and are there conditions that change them?</li>
  <li>What happens if a payment is late or missed?</li>
  <li>Can the balance be paid off early?</li>
  <li>Does the amount financed match the fixed-fee quote from Solivance Electric?</li>
</ul>
<p>Solivance Electric does not set or quote financing terms. Questions about the credit decision or the account go to Synchrony.</p>

<h2>What should I have ready?</h2>
<ul>
  <li>A recent electric bill and gas bill, so the service and meter are easy to identify.</li>
  <li>Photos of the electrical panel with the door open, and the AC condensers&rsquo; nameplates.</li>
  <li>A list of what you want running in an outage: whole home, or essential circuits only.</li>
  <li>HOA rules on generator placement, if your neighborhood has them. Bellaire, West U, and the Memorial Villages often do.</li>
</ul>

<h2>Is financing available for other electrical work?</h2>
<p>Financing through Synchrony is not limited to generators. Panel upgrades, EV charger installs, and other electrical projects can be discussed the same way. Ask about monthly payment options when you receive the quote. Subject to credit approval. See our <a href="/services/generator-installs">generator install</a> page for the full install scope.</p>

<h2>Start with a site walk</h2>
<p>Solivance Electric sizes the generator, quotes the whole project as one fixed fee, and handles permits and inspection. <a href="/contact">Request a site walk</a> or call <strong>(832) 965-9964</strong>. Financing available through Synchrony &mdash; ask about monthly payment options. Subject to credit approval. Read more on the <a href="/financing">financing page</a>.</p>
`,
  },
  {
    slug: 'whole-home-vs-essential-circuit-generator',
    title: 'Whole-Home vs. Essential-Circuit Generator in Houston',
    description:
      'Whole-home or essential-circuit standby generator for a Houston house? How Solivance Electric compares coverage, transfer switches, AC, and load management.',
    date: '2026-11-07',
    readTime: '7 min read',
    category: 'Generators',
    image: '/photos_new/generator-installs.jpg',
    keywords: [
      'whole home generator Houston',
      'essential circuit generator',
      'partial home generator vs whole home',
      'generator subpanel Houston',
      'whole house generator Memorial Villages',
      'standby generator load management',
      'generator transfer switch Heights',
      'Briggs & Stratton whole home generator',
    ],
    faqs: [
      {
        q: "What is the difference between a whole-home and an essential-circuit generator?",
        a: "A whole-home setup transfers the entire service, so every circuit in the house runs during an outage, often with load management on large loads. An essential-circuit setup moves selected circuits to a separate subpanel, and only those circuits get generator power. The generator is usually smaller for essential circuits.",
      },
      {
        q: "Can an essential-circuit generator run my air conditioning?",
        a: "It can if the AC is one of the selected circuits and the generator is sized for the compressor's start-up surge. Many Houston homeowners put one AC system on the essential subpanel and leave the second off. Solivance Electric checks the condenser nameplate during the site walk before committing to that plan.",
      },
      {
        q: "Is a whole-home generator worth it in Houston?",
        a: "It depends on how you use the house during an outage. Homes with two or three AC systems, electric appliances, or people who work from home often want everything running. Homes where a few circuits cover the essentials can use a smaller generator. Solivance Electric quotes both options from the same site walk.",
      },
      {
        q: "Can I switch from essential-circuit to whole-home later?",
        a: "Sometimes, but it usually means a larger generator and a different transfer switch, so most of the original equipment gets replaced. Making the decision once at the start is less expensive. Solivance Electric sizes for what you want covered now and notes any planned loads like an EV charger.",
      },
    ],
    content: `
<p>Once a Houston homeowner decides on a standby generator, the next decision is coverage. A <strong>whole-home</strong> setup runs every circuit in the house during an outage. An <strong>essential-circuit</strong> setup runs a chosen list &mdash; refrigerator, one AC, some lights and outlets, the furnace blower, the network closet. Both are legal under NEC Article 702. They lead to different generators, different transfer switches, and different install scopes.</p>
<p>Solivance Electric installs both. This post lays out how each works and how to pick.</p>

<h2>Should a Houston home get a whole-home or essential-circuit generator?</h2>
<p><strong>A whole-home generator fits houses with two or more AC systems, electric appliances, or people who need the whole house working through a multi-day outage. An essential-circuit generator fits houses where a short list of circuits covers what matters. The essential-circuit option uses a smaller generator; the whole-home option avoids choosing.</strong></p>

<h2>How does a whole-home setup work?</h2>
<p>A whole-home setup uses an automatic transfer switch rated for the full service, typically 200A. The switch sits between the meter and the main panel. When utility power drops, the switch moves the entire house to the generator. Every breaker in the panel stays live.</p>
<p>The generator does not have to be big enough to run everything at once. NEC 702 allows automatic load management, so the transfer switch can hold back large loads &mdash; a second AC, an electric dryer, a pool pump, an EV charger &mdash; until there is room. That is how a whole-home setup fits a reasonably sized generator.</p>
<p>A service-rated transfer switch mounted outside can also act as the outdoor emergency disconnect required by NEC 230.85 in the 2023 code, which simplifies the install on many houses.</p>

<h2>How does an essential-circuit setup work?</h2>
<p>An essential-circuit setup adds a subpanel next to the main panel. Solivance Electric moves the chosen circuits from the main panel into the subpanel. The transfer switch feeds that subpanel from either the utility or the generator. Everything left in the main panel goes dark during an outage.</p>
<p>A typical essential list in a Houston house:</p>
<ul>
  <li>Refrigerator and a chest freezer</li>
  <li>One AC system, usually the one serving bedrooms</li>
  <li>Gas furnace blower and controls</li>
  <li>Kitchen outlets and the microwave</li>
  <li>A few lighting circuits</li>
  <li>Garage door opener</li>
  <li>Network equipment, a home office, medical devices</li>
  <li>Sump pump or well pump, where one exists</li>
</ul>

<h2>How do the two compare side by side?</h2>
<table>
  <thead>
    <tr><th></th><th>Whole-home</th><th>Essential-circuit</th></tr>
  </thead>
  <tbody>
    <tr><td>Circuits covered</td><td>All of them</td><td>Selected circuits in a subpanel</td></tr>
    <tr><td>Generator size</td><td>Larger, or right-sized with load management</td><td>Smaller</td></tr>
    <tr><td>Transfer switch</td><td>Service-rated, full amperage</td><td>Smaller, feeds the subpanel</td></tr>
    <tr><td>AC coverage</td><td>All systems, managed</td><td>Usually one system</td></tr>
    <tr><td>Panel work</td><td>Minimal on a clean 200A service</td><td>Circuits moved to a new subpanel</td></tr>
    <tr><td>During an outage</td><td>House runs normally</td><td>Only the listed circuits run</td></tr>
    <tr><td>Fuel use</td><td>Higher at full load</td><td>Lower</td></tr>
  </tbody>
</table>

<h2>Where does the AC fit in?</h2>
<p>In Houston, the AC decides almost everything. A house in Sugar Land with a 4-ton and a 3-ton system has two compressors that can start at the same time. If both are on the generator without load management, the generator has to handle both start-up surges. If only one is on an essential subpanel, the generator only sees one.</p>
<p>A soft starter on the compressor reduces the start-up surge and is a common add-on in either setup. Solivance Electric reads the condenser nameplates on the site walk before committing to a generator size. The full sizing method is in <a href="/blog/briggs-stratton-standby-generator-houston-sizing">sizing a Briggs &amp; Stratton standby generator in Houston</a>.</p>

<h2>Which houses usually go whole-home?</h2>
<ul>
  <li>Larger homes in the Memorial Villages, West U, and Bellaire with two or three AC systems.</li>
  <li>Homes with electric ranges, dryers, or water heaters that the owners do not want to give up for a week.</li>
  <li>Homes where people work from home and need offices, networks, and cooling all running.</li>
  <li>Owners who do not want to decide during an outage which circuit gets power.</li>
</ul>

<h2>Which houses usually go essential-circuit?</h2>
<ul>
  <li>Smaller homes in the Heights, Meyerland, or Missouri City where one AC system covers the main living space.</li>
  <li>Homes with gas appliances, where the electric load is already modest.</li>
  <li>Owners who want the generator mainly for food, cooling one area, and medical equipment.</li>
  <li>Homes where the main panel is full and a subpanel gives the install a clean starting point.</li>
</ul>

<h2>Does the electrical service affect the choice?</h2>
<p>Yes. A whole-home setup on a 200A service with a clean panel is usually straightforward. On a 100A or 150A service, Solivance Electric may recommend a <a href="/services/panel-upgrades">panel upgrade</a> first, or an essential-circuit setup that avoids touching the main service. Obsolete panels such as Federal Pacific or Zinsco usually get replaced either way.</p>

<h2>What about loads the house does not have yet?</h2>
<p>The coverage choice should account for the next few years, not only the current house. The loads that most often get added after a generator goes in:</p>
<ul>
  <li><strong>A Level 2 EV charger.</strong> Typically a 40A to 60A circuit under NEC 625. On a whole-home setup, a load-shed module can hold the charger off while the generator is busy. On an essential-circuit setup, the charger usually stays off the subpanel. More on that circuit is on our <a href="/services/ev-chargers">EV charger</a> page.</li>
  <li><strong>A pool or spa.</strong> Pumps and heaters add both running load and start-up surge.</li>
  <li><strong>An added AC system.</strong> A room addition or garage apartment with its own condenser.</li>
  <li><strong>A switch from gas to electric appliances.</strong> An induction range or a heat pump water heater changes the load calculation.</li>
</ul>
<p>An essential-circuit setup can take a few more circuits if the subpanel has spaces and the generator has headroom. A whole-home setup takes new loads more easily, as long as load management is wired for them. Solivance Electric asks about planned loads on the site walk for that reason.</p>

<h2>What does the generator itself look like in each case?</h2>
<p>Both setups use the same kind of equipment: an air-cooled or liquid-cooled standby generator on a pad outside, running on natural gas or propane, with an automatic transfer switch. The difference is the size of the generator and the transfer switch. Solivance Electric is an authorized Briggs &amp; Stratton dealer; the current lineup with pricing is on the <a href="/generators">generators page</a>. Call or request a quote to buy the unit alone or with a full install.</p>

<h2>How does the cost compare?</h2>
<p>An essential-circuit setup generally uses a smaller generator and a smaller transfer switch, but it adds a subpanel and the labor to move circuits. A whole-home setup uses a larger generator or load management, but often less panel work. The only way to compare them is to quote both from the same site walk. Solivance Electric does that, with a fixed-fee number for each option. If paying over time helps, see <a href="/blog/how-to-finance-a-standby-generator-houston">how to finance a standby generator in Houston</a>.</p>

<h2>Get both options quoted</h2>
<p>Solivance Electric walks the house, reads the AC nameplates, checks the service and the gas meter, and quotes whole-home and essential-circuit side by side. <a href="/contact">Request a site walk</a> or call <strong>(832) 965-9964</strong>. More on the install is on our <a href="/services/generator-installs">generator install</a> page. Financing available through Synchrony &mdash; ask about monthly payment options. Subject to credit approval. See the <a href="/financing">financing page</a>.</p>
`,
  },
  {
    slug: 'automatic-transfer-switch-explained',
    title: 'What an Automatic Transfer Switch Does and Why It Matters',
    description:
      'What an automatic transfer switch does on a Houston standby generator: utility sensing, transfer, retransfer, NEC 702 rules, backfeed, and load management.',
    date: '2026-11-07',
    readTime: '7 min read',
    category: 'Generators',
    image: '/photos_new/generator-installs.jpg',
    keywords: [
      'automatic transfer switch explained',
      'ATS standby generator Houston',
      'service rated transfer switch',
      'generator transfer switch installation Houston',
      'NEC 702 transfer equipment',
      'NEC 230.85 emergency disconnect generator',
      'generator backfeed danger',
      'transfer switch load shedding',
    ],
    faqs: [
      {
        q: "What does an automatic transfer switch do?",
        a: "An automatic transfer switch watches utility voltage. When the utility drops, it signals the standby generator to start, waits for stable output, and moves the house or building onto generator power. When the utility returns and holds steady, it moves the load back and lets the generator cool down and shut off.",
      },
      {
        q: "Why is a transfer switch required for a standby generator?",
        a: "NEC Article 702 requires transfer equipment for optional standby systems so the generator and the utility can never be connected at the same time. Without it, generator power can backfeed into CenterPoint lines and endanger line crews, and returning utility power can damage the generator.",
      },
      {
        q: "What is a service-rated transfer switch?",
        a: "A service-rated transfer switch includes a main breaker and is listed for use as service equipment. It mounts between the meter and the panel and can switch the entire service. Mounted outdoors, it can also serve as the emergency disconnect required by NEC 230.85 on one- and two-family dwellings under the 2023 NEC.",
      },
      {
        q: "How long does it take the transfer switch to restore power?",
        a: "Most standby systems have power restored within seconds to under a minute after an outage. The switch waits briefly to confirm the outage is real, the generator starts and stabilizes, then the transfer happens. The house is dark for that short window, so sensitive electronics still benefit from a UPS.",
      },
      {
        q: "Can a transfer switch run a whole house on a smaller generator?",
        a: "Yes, with load management. Load-shed modules let the transfer switch hold back large loads such as a second AC, an electric dryer, or an EV charger until the generator has capacity. NEC 702 allows automatic load management as a sizing method for optional standby systems.",
      },
    ],
    content: `
<p>A standby generator gets most of the attention, but the <strong>automatic transfer switch</strong> is the part that decides when the generator runs and what it powers. It is also the part that keeps generator power off CenterPoint&rsquo;s lines. Every standby generator Solivance Electric installs in Houston has one.</p>
<p>This post covers what the switch does, how it works, the code that governs it, and the choices that come up when a switch is specified.</p>

<h2>What does an automatic transfer switch do?</h2>
<p><strong>An automatic transfer switch (ATS) watches utility power. When the utility drops, it starts the generator, waits for stable voltage, and moves the load to the generator. When the utility returns and holds, it moves the load back and lets the generator cool down. At no point can the generator and the utility connect to each other.</strong></p>

<h2>What happens during an outage, step by step?</h2>
<ol>
  <li><strong>Utility sensing.</strong> The switch monitors voltage on the utility side continuously.</li>
  <li><strong>Outage confirmed.</strong> A short delay rules out a blink. Brief sags during a storm do not start the generator.</li>
  <li><strong>Start signal.</strong> The switch tells the generator to start.</li>
  <li><strong>Warm-up.</strong> The generator comes up to speed and its voltage and frequency stabilize.</li>
  <li><strong>Transfer.</strong> The switch disconnects from the utility and connects to the generator. The house or building is back on.</li>
  <li><strong>Utility return.</strong> The switch sees utility voltage return and waits to confirm it is stable.</li>
  <li><strong>Retransfer.</strong> The load moves back to the utility.</li>
  <li><strong>Cool-down.</strong> The generator runs unloaded for a few minutes, then shuts off and returns to standby.</li>
</ol>
<p>From outage to restored power is typically seconds to under a minute. The house is dark for that window, so computers and network gear still benefit from a small UPS.</p>

<h2>Why does the code require one?</h2>
<p>NEC Article 702 covers optional standby systems &mdash; the category most home and small business generators fall into. It requires transfer equipment that prevents the generator and the utility from ever being connected together. There are two reasons.</p>
<p>The first is backfeed. A generator connected to a house wired to the grid pushes power back out through the meter and the service drop. The transformer on the pole steps that voltage back up, and a line crew working on what they believe is a dead line can be injured or killed. This is why plugging a portable generator into a dryer outlet is dangerous and illegal.</p>
<p>The second is equipment damage. When utility power returns to a house that is still connected to a running generator, the two sources fight. The generator loses.</p>

<h2>What kinds of transfer switches are there?</h2>
<table>
  <thead>
    <tr><th>Type</th><th>Where it sits</th><th>What it covers</th></tr>
  </thead>
  <tbody>
    <tr><td>Service-rated ATS</td><td>Between the meter and the main panel</td><td>The entire service, typically 200A on a house</td></tr>
    <tr><td>Non-service-rated ATS</td><td>After the main breaker, feeding a subpanel</td><td>An essential-circuit subpanel</td></tr>
    <tr><td>Manual transfer switch</td><td>Next to the panel</td><td>Selected circuits; someone flips it by hand</td></tr>
    <tr><td>Interlock kit</td><td>On the main panel cover</td><td>Used with portable generators; manual only</td></tr>
  </tbody>
</table>
<p>A standby generator nearly always pairs with an automatic switch. Manual switches and interlocks are for portable generators, which is a different setup with different safety concerns.</p>

<h2>What does a service-rated switch change?</h2>
<p>A service-rated ATS has a main breaker built in and is listed as service equipment. It replaces the role of the main breaker for transfer purposes, which means the whole house can move to the generator. On many Houston houses, it mounts outside next to the meter.</p>
<p>That outdoor location matters under the 2023 NEC. Section 230.85 requires an emergency disconnect outside one- and two-family dwellings, readily accessible to first responders. A service-rated transfer switch mounted outside can serve as that disconnect, so the generator install brings the house into compliance at the same time.</p>

<h2>How does load management work inside the switch?</h2>
<p>A whole-home transfer switch does not have to send every load to the generator at once. Load-shed modules connect to large loads &mdash; a second AC condenser, an electric dryer, a pool pump, an EV charger &mdash; and hold them off when the generator is near its limit. When there is capacity, the switch lets them run.</p>
<p>NEC 702 allows this automatic load management as a way to size the generator. It is how a right-sized generator covers a house in the Memorial Villages with three AC systems. The trade-offs between whole-home and partial coverage are in <a href="/blog/whole-home-vs-essential-circuit-generator">whole-home vs. essential-circuit generator</a>.</p>

<h2>What does Solivance Electric check when installing the switch?</h2>
<ul>
  <li><strong>Amperage match.</strong> The switch rating matches the service or subpanel it feeds.</li>
  <li><strong>Neutral and grounding.</strong> The neutral and the grounding are bonded correctly for the switch type and generator, per NEC 250 and the manufacturer.</li>
  <li><strong>Conductor sizing.</strong> Generator conductors sized for the generator&rsquo;s output and the run length, per NEC 445.</li>
  <li><strong>Control wiring.</strong> Start and sensing wires run and terminated so the switch and generator talk to each other.</li>
  <li><strong>Load-shed wiring.</strong> Modules connected to the right loads and tested.</li>
  <li><strong>Labeling.</strong> Required signage at the service and the switch so a first responder or inspector knows a generator is on site.</li>
  <li><strong>Test transfer.</strong> The switch is put through a full transfer and retransfer under load before the inspection.</li>
</ul>

<h2>How is a commercial transfer switch different?</h2>
<p>The job is the same on a strip center in Stafford or a warehouse in Southwest Houston: keep the generator and the utility apart, and move the load when the utility drops. The equipment and the decisions get larger.</p>
<ul>
  <li><strong>Three-phase service.</strong> Commercial switches are often three-phase, at 208V or 480V, and sized for 400A and up.</li>
  <li><strong>Which loads go on standby.</strong> A business usually puts refrigeration, POS, network, security, and some lighting on the generator and leaves process loads off.</li>
  <li><strong>Multiple switches.</strong> Larger buildings sometimes use more than one transfer switch so different loads can transfer in sequence.</li>
  <li><strong>Code article.</strong> Most business generators are optional standby under NEC 702. Life-safety systems fall under NEC 700 and legally required standby under NEC 701, which carry stricter rules.</li>
</ul>
<p>Our <a href="/services/commercial-warehouses">commercial warehouse</a> and <a href="/services/commercial-centers">commercial center</a> pages cover that work.</p>

<h2>Does the switch need maintenance?</h2>
<p>The switch has moving contacts and a control board. Most standby generators run a scheduled self-test, and the switch should be exercised under load periodically. Contacts and terminations get checked during annual generator service. Solivance Electric covers that work under our <a href="/care-plans">care plans</a>.</p>

<h2>Do I buy the switch separately from the generator?</h2>
<p>Solivance Electric is an authorized Briggs &amp; Stratton standby generator dealer. The transfer switch is specified with the generator so the controls match and the switch is sized for the service. The current lineup with pricing is on the <a href="/generators">generators page</a>, and sizing is covered in <a href="/blog/briggs-stratton-standby-generator-houston-sizing">sizing a standby generator in Houston</a>.</p>

<h2>Get the switch specified correctly</h2>
<p>Solivance Electric specifies the generator and transfer switch together, pulls the permit, coordinates with CenterPoint where needed, and tests a transfer under load before we leave. <a href="/contact">Request a site walk</a> or call <strong>(832) 965-9964</strong>. See the full scope on our <a href="/services/generator-installs">generator install</a> page. Financing available through Synchrony &mdash; ask about monthly payment options. Subject to credit approval. Details on the <a href="/financing">financing page</a>.</p>
`,
  },
  {
    slug: 'houston-freeze-prep-electrical-generator',
    title: 'Houston Freeze Prep: What Uri Taught About Backup Power',
    description:
      'Lessons from Winter Storm Uri for Houston homes: heat loads, generator fuel, freeze prep, and how Solivance Electric sets up standby power for cold weather.',
    date: '2026-11-07',
    readTime: '7 min read',
    category: 'Generators',
    image: '/photos_new/houston.jpg',
    keywords: [
      'Houston freeze prep generator',
      'Winter Storm Uri backup power',
      'standby generator cold weather Houston',
      'generator for heat strips Houston',
      'freeze electrical prep Texas home',
      'whole home generator winter Katy',
      'backup heat power outage Houston',
    ],
    faqs: [
      {
        q: "Will a standby generator run my heat during a Houston freeze?",
        a: "It depends on the heating system. A gas furnace needs only a small electrical load for the blower and controls, so most standby generators carry it easily. Electric heat strips are a large resistive load and must be counted in the sizing. Solivance Electric checks the heating system on the site walk before sizing.",
      },
      {
        q: "What did Winter Storm Uri show about backup power in Houston?",
        a: "Uri in February 2021 showed that outages in Texas can last days, not hours, and can happen in winter as well as hurricane season. Homes with standby generators on natural gas or full propane tanks kept heat on. Homes depending on portable generators faced fuel shortages and carbon monoxide risk.",
      },
      {
        q: "Should I get my generator serviced before winter?",
        a: "Yes. A pre-winter service checks the battery, oil, air filter, spark plugs, transfer switch, and exercise schedule. Cold weather is hard on batteries, and a weak battery is a common reason a standby generator fails to start. Solivance Electric performs annual generator service under its care plans.",
      },
      {
        q: "Is it too late to install a generator before this winter?",
        a: "It depends on permit timing, unit availability, and whether the gas meter needs upsizing. Solivance Electric gives a schedule with the fixed-fee quote after the site walk. Even if an install finishes after the first cold snap, Houston freezes can arrive as late as February, and hurricane season follows in June.",
      },
    ],
    content: `
<p>In February 2021, Winter Storm Uri put most of Texas into a deep freeze and took down a large share of the state grid. In Houston, outages that were supposed to rotate turned into days without power for many homes. Pipes burst in houses that had never seen a hard freeze. People ran cars in garages and grills indoors to stay warm, and some did not survive it.</p>
<p>Solivance Electric installs standby generators across Houston, and Uri changed how a lot of homeowners think about backup power. Hurricanes are not the only reason the lights go out. This post covers what Uri showed and how to set up a house for the next freeze.</p>

<h2>What did Winter Storm Uri teach Houston about backup power?</h2>
<p><strong>Uri showed that Houston outages can last days in winter, not just after hurricanes. Homes need a heat source that runs without grid power, a fuel supply that does not depend on a gas station, and a generator sized for heating loads, not just cooling loads. A standby generator with an automatic transfer switch covers all three.</strong></p>

<h2>Why is winter sizing different from summer sizing?</h2>
<p>Most Houston generator sizing is driven by the AC compressor. In a freeze, the load changes. What matters is how the house makes heat.</p>
<table>
  <thead>
    <tr><th>Heating system</th><th>Electrical load in a freeze</th><th>Generator impact</th></tr>
  </thead>
  <tbody>
    <tr><td>Gas furnace</td><td>Blower motor, igniter, controls</td><td>Small; most generators carry it easily</td></tr>
    <tr><td>Heat pump</td><td>Compressor, plus auxiliary heat strips in hard cold</td><td>Moderate to large</td></tr>
    <tr><td>Electric furnace / heat strips only</td><td>Large resistive heat-strip load</td><td>Large; must be in the load calculation</td></tr>
    <tr><td>Space heaters</td><td>Roughly 1,500 watts each on 120V</td><td>Adds up fast on a few circuits</td></tr>
  </tbody>
</table>
<p>Heat strips are the load that surprises people. In summer, the air handler only runs a blower. In a freeze, the strips inside the same air handler can draw more than the AC compressor ever does. Solivance Electric reads the air handler nameplate on the site walk so the generator is sized for both seasons. The full method is in <a href="/blog/briggs-stratton-standby-generator-houston-sizing">sizing a Briggs &amp; Stratton standby generator in Houston</a>.</p>

<h2>What fuel works in a freeze?</h2>
<p>A standby generator on natural gas draws from the utility gas line, so it does not depend on a gas station or a delivery truck. No fuel source is guaranteed in an event like Uri, but piped natural gas avoids the problem portable generator owners hit: empty gas cans and closed stations on iced-over roads.</p>
<p>Propane works the same way as long as the tank is full before the storm. Homes in Katy, Cypress, and rural Fort Bend without natural gas should top off the tank in the fall and again when a freeze is forecast.</p>

<h2>What about portable generators?</h2>
<p>Uri showed the risks of portable generators clearly. Carbon monoxide poisonings were widely reported during the storm, from generators, grills, and cars run in or near homes. A portable generator must run outdoors, away from windows and doors, and it should never be connected to the house without a transfer switch or interlock. Backfeeding a dryer outlet puts CenterPoint line crews at risk.</p>
<p>A standby generator sits on a pad outside at code clearances and connects through an automatic transfer switch. How that switch works is covered in <a href="/blog/automatic-transfer-switch-explained">what an automatic transfer switch does</a>.</p>

<h2>What electrical prep should a Houston home do before a freeze?</h2>
<ul>
  <li><strong>Service the generator.</strong> Battery, oil, filters, plugs, and a test transfer. Cold is hard on batteries.</li>
  <li><strong>Ask about cold-weather accessories.</strong> Battery warmers and oil heaters are offered for many standby units. Ask whether one fits your unit.</li>
  <li><strong>Check heat tape and well pumps.</strong> Heat tape on exposed pipes and well pumps need power to protect the plumbing. Make sure those circuits are on the generator.</li>
  <li><strong>Know which circuits are covered.</strong> On an essential-circuit setup, label what runs and what does not. The trade-offs are in <a href="/blog/whole-home-vs-essential-circuit-generator">whole-home vs. essential-circuit generator</a>.</li>
  <li><strong>Clear the generator.</strong> Keep the area around the unit clear so it can breathe, and keep ice and debris off the enclosure.</li>
  <li><strong>Check smoke and CO alarms.</strong> Battery backup on every alarm. Any fuel-burning appliance in the house makes CO alarms a must.</li>
  <li><strong>Fill propane.</strong> If the generator runs on propane, fill the tank before the forecast turns.</li>
</ul>

<h2>What should I do while the generator is running in a freeze?</h2>
<p>A standby generator runs on its own once the transfer switch moves the house over. A few habits keep it running through a multi-day outage:</p>
<ol>
  <li><strong>Check the unit once a day.</strong> Look for ice, snow, or debris blocking the intake and exhaust, and listen for anything that sounds different from the weekly exercise run.</li>
  <li><strong>Hold back large loads.</strong> On an essential-circuit setup without load management, avoid running the dryer, oven, and heat strips at the same time.</li>
  <li><strong>Watch the propane gauge.</strong> On a propane unit, track the tank level and call the supplier early. Deliveries slow down on iced roads.</li>
  <li><strong>Keep the generator outside.</strong> The unit stays on its pad. Never move a generator, grill, or heater into a garage or porch.</li>
  <li><strong>Leave the transfer switch alone.</strong> The switch moves the house back to the utility on its own when CenterPoint power returns and holds steady.</li>
</ol>

<h2>What happens to the panel when power returns?</h2>
<p>When the grid came back after Uri, many homes saw every appliance and every heat strip start at once. That surge trips breakers and stresses older panels. A standby generator with load management staggers the large loads on the generator side. On the utility side, an older 100A or 150A service, or a Federal Pacific or Zinsco panel, is worth looking at before winter. Our <a href="/services/panel-upgrades">panel upgrade</a> page covers what that work involves.</p>

<h2>Is a freeze reason enough to get a generator?</h2>
<p>Houston does not freeze hard every year. But the same generator covers the summer storm season too. Hurricane Beryl in July 2024 knocked out power to more than 2 million CenterPoint customers, and the May 2024 derecho took down lines across the city weeks earlier. One standby generator, sized for both cooling and heating, covers every one of those events.</p>
<p>Homeowners in Meyerland, Bellaire, West U, and the Heights who have lived through all three often decide the generator is part of the house now, the same way a roof is.</p>

<h2>What does Solivance Electric install?</h2>
<p>Solivance Electric is an authorized Briggs &amp; Stratton standby generator dealer. You can buy the unit alone or with a full install that covers the pad, transfer switch, gas coordination, permits, and commissioning. The current lineup with pricing is on the <a href="/generators">generators page</a>. Warranty terms vary by model; Solivance Electric registers the install as an authorized dealer.</p>

<h2>Get set up before the next freeze</h2>
<p>Solivance Electric runs a free site walk, sizes the generator for both heating and cooling, and hands back a fixed-fee quote with a schedule. <a href="/contact">Request a site walk</a> or call <strong>(832) 965-9964</strong>. Existing generator owners can book annual service through our <a href="/care-plans">care plans</a>. Financing available through Synchrony &mdash; ask about monthly payment options. Subject to credit approval. See the <a href="/financing">financing page</a>.</p>
`,
  },
  {
    slug: 'standby-generator-permits-houston-harris-county',
    title: 'Standby Generator Permits in Houston and Harris County',
    description:
      'What permits a standby generator needs in Houston, Harris County, and nearby cities: electrical, gas, HOA, and CenterPoint, and how Solivance Electric files them.',
    date: '2026-11-07',
    readTime: '7 min read',
    category: 'Generators',
    image: '/photos_new/southwest-houston.jpg',
    keywords: [
      'standby generator permit Houston',
      'generator permit Harris County',
      'City of Houston electrical permit generator',
      'generator permit Bellaire',
      'generator HOA approval Houston',
      'generator gas line permit Houston',
      'Sugar Land generator permit',
      'generator inspection Houston',
    ],
    faqs: [
      {
        q: "Do I need a permit to install a standby generator in Houston?",
        a: "Yes. A standby generator inside the City of Houston needs an electrical permit, and the gas connection is permitted and inspected separately. Cities like Bellaire, West University Place, and Sugar Land run their own building departments with their own requirements. Solivance Electric confirms the authority having jurisdiction by address and pulls the permits.",
      },
      {
        q: "Who pulls the generator permit, the homeowner or the electrician?",
        a: "Solivance Electric pulls the electrical permit as the licensed electrical contractor, TECL #41163, and coordinates the gas permit and inspection. The homeowner does not need to visit the permit office. Permit fees and filing are included in the fixed-fee quote after the free site walk.",
      },
      {
        q: "Do I need HOA approval for a standby generator?",
        a: "Many Houston-area HOAs and deed-restricted neighborhoods require approval of generator placement and screening before install. That approval is separate from the city permit. Solivance Electric provides a site plan with the generator location and clearances so you can submit it to the HOA.",
      },
      {
        q: "What happens if a generator is installed without a permit?",
        a: "An unpermitted generator can cause problems with insurance claims, home sales, and future inspections, and the city can require it to be opened up and inspected after the fact. An unpermitted install also skips the inspection that checks the transfer switch and grounding. Solivance Electric permits every generator install.",
      },
    ],
    content: `
<p>Every standby generator Solivance Electric installs is permitted and inspected. That is not a formality. The inspection is where a third party checks the transfer switch, the grounding, the gas line, and the placement &mdash; the parts that keep generator power off CenterPoint&rsquo;s lines and keep exhaust away from bedroom windows.</p>
<p>Permit requirements change depending on where the house sits. Inside the City of Houston is one set of rules. Bellaire, West University Place, Sugar Land, Missouri City, Stafford, and Katy each run their own building departments. Unincorporated Harris County and Fort Bend County have their own processes again. This post covers what a generator install usually needs and how Solivance Electric handles it.</p>

<h2>What permits does a standby generator need in Houston?</h2>
<p><strong>Inside the City of Houston, a standby generator needs an electrical permit for the generator, transfer switch, and wiring, plus a separate permit and inspection for the gas connection. HOA approval is often required on top of that. Other cities and unincorporated Harris County set their own rules, so Solivance Electric confirms the AHJ by address before quoting.</strong></p>

<h2>Which permits usually apply?</h2>
<table>
  <thead>
    <tr><th>Approval</th><th>Covers</th><th>Who handles it</th></tr>
  </thead>
  <tbody>
    <tr><td>Electrical permit</td><td>Generator, automatic transfer switch, conductors, grounding, disconnects</td><td>Solivance Electric, as the licensed electrical contractor</td></tr>
    <tr><td>Gas / plumbing permit</td><td>Gas line from the meter to the generator, sizing, pressure test</td><td>Coordinated by Solivance Electric with a licensed plumber</td></tr>
    <tr><td>Gas utility coordination</td><td>Meter upsizing if the existing meter cannot carry the added load</td><td>Coordinated with CenterPoint</td></tr>
    <tr><td>HOA / deed restriction approval</td><td>Placement, screening, sometimes noise</td><td>Homeowner submits; Solivance Electric provides the site plan</td></tr>
    <tr><td>Propane tank</td><td>Tank setting and line, where no natural gas is available</td><td>Coordinated with the propane supplier</td></tr>
  </tbody>
</table>
<p>Not every job needs every row. A propane install does not need a CenterPoint meter change. A house outside an HOA skips that step.</p>

<h2>Who is the AHJ for my address?</h2>
<p>The authority having jurisdiction (AHJ) is the office that issues the permit and sends the inspector. A Houston mailing address does not always mean the City of Houston. Bellaire, West U, and the Memorial Villages &mdash; Bunker Hill, Hedwig, Hunters Creek, Piney Point, Spring Valley, and Hilshire &mdash; are separate cities with their own departments. Requirements in unincorporated Harris County differ from the City of Houston as well.</p>
<p>Solivance Electric confirms the AHJ by address before the quote, so the permit scope and fees are in the fixed-fee number.</p>

<h2>What does the inspector check?</h2>
<p>The electrical inspection covers the work under the NEC as adopted locally. On a standby generator, that usually means:</p>
<ul>
  <li><strong>Transfer equipment.</strong> NEC Article 702 requires a transfer switch that keeps the generator and utility from connecting. How it works is covered in <a href="/blog/automatic-transfer-switch-explained">what an automatic transfer switch does</a>.</li>
  <li><strong>Sizing.</strong> The generator is sized for the load it can carry, per NEC 702 and the NEC 220 calculation, or the install uses automatic load management.</li>
  <li><strong>Generator conductors and protection.</strong> Sized and protected per NEC 445.</li>
  <li><strong>Grounding and bonding.</strong> Correct for the transfer switch type and generator configuration.</li>
  <li><strong>Emergency disconnect.</strong> Where the 2023 NEC is adopted, an outdoor emergency disconnect on one- and two-family dwellings under NEC 230.85.</li>
  <li><strong>Placement.</strong> Clearances to windows, doors, vents, and lot lines per the manufacturer and local code.</li>
  <li><strong>Labeling.</strong> Signage at the service showing a generator is on site.</li>
</ul>
<p>The gas inspection checks the line size, materials, shut-off, and a pressure test.</p>

<h2>How long does permitting take?</h2>
<p>It varies by AHJ and by season. After a major outage, permit offices see a wave of generator applications, and review times stretch. After Hurricane Beryl in July 2024 knocked out power to more than 2 million CenterPoint customers, demand for generator installs across the region climbed. Filing in the off-season, November through spring, gives the review and inspection schedule room before hurricane season.</p>
<p>Solivance Electric gives an estimated schedule with the quote and updates it once the permit is filed.</p>

<h2>What about HOAs?</h2>
<p>Deed-restricted neighborhoods in Bellaire, West U, Meyerland, the Memorial Villages, Sugar Land, and many Katy and Cypress subdivisions often have rules about where equipment can sit and how it is screened. Some limit placement in front or side yards. The HOA does not issue the city permit, and the city permit does not satisfy the HOA. Both are needed.</p>
<p>Solivance Electric provides a site plan with the generator location, pad, and clearances for the HOA submission. Getting HOA approval before ordering the unit avoids a moved pad later.</p>

<h2>Do commercial generators need different permits?</h2>
<p>A business generator follows the same basic path &mdash; electrical permit, gas or fuel permit, inspection &mdash; with more paperwork. Commercial work usually needs drawings with the load calculation, a one-line diagram, and equipment specs. A building with a fire alarm or life-safety system may involve the fire marshal. Larger units can raise questions about fuel storage and, in some cases, air permitting.</p>
<p>Solivance Electric handles commercial generator permits for <a href="/services/commercial-centers">retail centers</a> and <a href="/services/commercial-warehouses">warehouses</a> across Houston, Stafford, and Sugar Land. The scope is confirmed on the site walk, and the permit work is in the fixed-fee quote.</p>

<h2>What does the homeowner need to provide?</h2>
<p>Very little. Solivance Electric needs the property address, the owner&rsquo;s name as it appears on the deed or tax record, and access to the meter, panel, and generator location. If an HOA approval letter is required, the permit office or the inspector may ask for it, so keep a copy. Everything else &mdash; the load calculation, equipment specs, and site plan &mdash; comes from us.</p>

<h2>What does Solivance Electric handle?</h2>
<ol>
  <li><strong>Site walk.</strong> Location, clearances, service, gas meter, and AHJ confirmed.</li>
  <li><strong>Fixed-fee quote.</strong> Permit fees and filing included.</li>
  <li><strong>Site plan.</strong> For the HOA and the permit application.</li>
  <li><strong>Permit filing.</strong> Electrical permit pulled under TECL #41163; gas permit coordinated.</li>
  <li><strong>CenterPoint coordination.</strong> Gas meter upsizing where needed.</li>
  <li><strong>Install.</strong> Pad, generator, transfer switch, wiring, gas connection.</li>
  <li><strong>Inspections.</strong> Scheduled and attended by Solivance Electric.</li>
  <li><strong>Commissioning.</strong> Test transfer under load and a walkthrough with the owner.</li>
</ol>
<p>You do not chase the permit office. We do.</p>

<h2>Does buying the generator change the permit process?</h2>
<p>No. Whether you buy the unit from Solivance Electric as an authorized Briggs &amp; Stratton dealer or bring a unit in, the install is permitted and inspected the same way. Buying the unit and install together keeps the generator, transfer switch, and permit drawings matched. See the lineup with pricing on the <a href="/generators">generators page</a>. If paying over time helps, read <a href="/blog/how-to-finance-a-standby-generator-houston">how to finance a standby generator in Houston</a>.</p>

<h2>Get the permits handled</h2>
<p>Solivance Electric confirms the AHJ, pulls the permits, coordinates CenterPoint and the gas inspection, and attends every inspection. <a href="/contact">Request a site walk</a> or call <strong>(832) 965-9964</strong>. More on the install is on our <a href="/services/generator-installs">generator install</a> page and our <a href="/locations/southwest-houston">Southwest Houston</a> page. Financing available through Synchrony &mdash; ask about monthly payment options. Subject to credit approval. Details on the <a href="/financing">financing page</a>.</p>
`,
  },
];
