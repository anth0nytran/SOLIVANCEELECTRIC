import type { BlogPost } from '../types';

export const posts_2027_04: BlogPost[] = [
  {
    slug: 'generator-sizing-ac-tonnage-houston',
    title: 'Generator Sizing by AC Tonnage: A Houston Walkthrough',
    description:
      'How AC tonnage, nameplate RLA and locked-rotor amps drive standby generator sizing in Houston homes, plus where soft starters and load management fit.',
    date: '2027-04-01',
    readTime: '7 min read',
    category: 'Generators',
    image: '/photos_new/generator-installs.jpg',
    keywords: [
      'generator sizing AC tonnage Houston',
      'standby generator for 5 ton AC',
      'what size generator to run central air Houston',
      'locked rotor amps generator sizing',
      'AC soft starter generator Houston',
      'Briggs & Stratton generator dealer Houston',
      'generator sizing Bellaire Meyerland',
      'whole home generator Katy Cypress',
    ],
    faqs: [
      {
        q: 'What size generator do I need to run central air in Houston?',
        a: 'It depends on the condenser’s nameplate, not just the tonnage. Solivance Electric reads the running amps (RLA) and locked-rotor amps (LRA) on each outdoor unit, adds the rest of the house load, and sizes the generator to carry the running load and absorb the largest motor start without a deep voltage dip.',
      },
      {
        q: 'Does every ton of AC need the same generator capacity?',
        a: 'No. One ton is 12,000 BTU per hour of cooling, but two 4-ton condensers from different years and manufacturers can draw very different current. Older single-stage compressors usually pull more starting current than newer variable-speed units. The nameplate on the unit is the number that goes into the sizing worksheet.',
      },
      {
        q: 'Can a soft starter let me use a smaller generator?',
        a: 'Often, yes. A soft starter on a compressor reduces the inrush current when it kicks on, which lowers the starting load the generator has to absorb. It does not reduce running load. Solivance Electric confirms compatibility with the condenser and the generator before recommending one.',
      },
      {
        q: 'How do two AC systems affect generator size?',
        a: 'Two systems means two compressor starts. If both start at once, the generator sees both inrush loads together. Load management on the transfer switch can stagger the second system or shed it during peak load, so the generator is sized for realistic operation instead of every motor starting at the same instant.',
      },
      {
        q: 'Do you size the generator before I buy it?',
        a: 'Yes. Solivance Electric is an authorized Briggs & Stratton standby generator dealer. The free site walk includes reading the panel, the AC nameplates, and the gas meter, then recommending a unit and a fixed-fee install quote. You can buy the unit alone or the unit plus full installation.',
      },
    ],
    content: `
<p>In a Houston house, the air conditioner is the load that decides the generator. Lights, the refrigerator, a few TVs and the Wi-Fi router are small. A 4-ton or 5-ton condenser starting on a 95-degree August afternoon is not. Size the generator around the compressors and the rest of the house usually falls into place.</p>
<p>This walkthrough covers how Solivance Electric reads AC equipment during a site walk and turns tonnage into a generator recommendation. It builds on the general method in <a href="/blog/briggs-stratton-standby-generator-houston-sizing">sizing a Briggs &amp; Stratton standby generator in Houston</a>.</p>

<h2>How does AC tonnage affect generator size?</h2>
<p><strong>Tonnage sets cooling capacity; the nameplate sets electrical load.</strong> A generator has to carry the compressor&rsquo;s running amps (RLA) continuously and absorb its locked-rotor amps (LRA) for the second it takes to start. Solivance Electric reads both off every outdoor unit, adds the rest of the house load, and sizes from those numbers, not from tonnage alone.</p>

<h2>Tonnage is a starting point, not the answer</h2>
<p>One ton of cooling equals 12,000 BTU per hour. A 3-ton system moves 36,000 BTU per hour, a 5-ton system 60,000. That tells you how much heat the system removes. It does not tell you how many amps it draws.</p>
<p>Two condensers rated at the same tonnage can draw noticeably different current. Age, refrigerant, compressor type (single-stage, two-stage, variable-speed) and efficiency rating all change the electrical numbers. That is why the sizing worksheet uses the data plate on the side of the unit.</p>

<h3>What we read off the condenser nameplate</h3>
<ul>
  <li><strong>RLA (rated load amps):</strong> what the compressor draws while running.</li>
  <li><strong>LRA (locked-rotor amps):</strong> the inrush when the compressor starts from a dead stop. Commonly several times the RLA.</li>
  <li><strong>FLA of the condenser fan motor:</strong> small, but it runs every time the compressor runs.</li>
  <li><strong>MCA and MOCP:</strong> minimum circuit ampacity and maximum overcurrent protection. These confirm the breaker and wire size are correct before the circuit goes on a generator.</li>
  <li><strong>Voltage and phase:</strong> almost every Houston home is 240V single-phase.</li>
</ul>
<p>We also read the air handler or furnace in the attic. The blower motor and, in some homes, electric heat strips are part of the HVAC load. Heat strips matter during a freeze like Winter Storm Uri in February 2021 and are usually the first thing load management sheds.</p>

<h2>Why starting current matters more than running current</h2>
<p>A generator can carry a steady load right up to its rating. What it struggles with is a sudden large demand. When a compressor starts, it pulls its locked-rotor current for a fraction of a second to a couple of seconds. The generator&rsquo;s engine and alternator have to answer that surge without letting voltage sag so far that lights dim hard, electronics reset, or the compressor fails to start.</p>
<p>Generator manufacturers publish how much motor starting load each unit can handle. That figure, compared against the LRA of the largest compressor, is often what pushes a recommendation up a size. The running load might fit a smaller unit; the start does not.</p>

<h2>A Houston walkthrough: how the numbers come together</h2>
<p>Here is the order Solivance Electric works through on a typical two-story home in Meyerland, Bellaire or Katy with two AC systems.</p>
<ol>
  <li><strong>Read the service.</strong> Main breaker size (100A, 150A, 200A), panel brand and condition, and available space for a transfer switch. NEC 230.85 (2023) emergency disconnect requirements are checked at the same time.</li>
  <li><strong>Read every condenser.</strong> RLA, LRA, and fan FLA for each outdoor unit, plus the tonnage for reference.</li>
  <li><strong>Read the air handlers.</strong> Blower motor and any heat strips.</li>
  <li><strong>List the other large loads.</strong> Electric water heater, electric range or cooktop, dryer, pool pump, well pump, EV charger.</li>
  <li><strong>Run the load calculation.</strong> NEC 220 methods set the baseline. See <a href="/blog/residential-load-calculation-nec-220">load calculations explained: NEC 220</a>.</li>
  <li><strong>Decide what runs and when.</strong> Whole-home coverage, managed whole-home, or essential circuits only.</li>
  <li><strong>Check the largest motor start</strong> against the published starting capability of the candidate generator.</li>
  <li><strong>Check fuel.</strong> Natural gas meter capacity and line size, or propane tank size.</li>
</ol>

<h3>How common AC setups usually land</h3>
<table>
  <thead>
    <tr><th>AC setup</th><th>What drives the sizing</th><th>Common approach</th></tr>
  </thead>
  <tbody>
    <tr><td>One 3-ton system, gas heat</td><td>Single compressor start</td><td>Whole-home coverage is often practical</td></tr>
    <tr><td>One 5-ton system</td><td>Large compressor LRA</td><td>Size for the start, or add a soft starter</td></tr>
    <tr><td>Two systems (e.g., 4-ton + 3-ton)</td><td>Two compressor starts plus combined running load</td><td>Load management staggers or sheds the second system</td></tr>
    <tr><td>Three systems or heat strips</td><td>Combined running load in summer and winter</td><td>Managed whole-home with a defined shed order</td></tr>
  </tbody>
</table>
<p>These are patterns, not quotes. The actual recommendation comes from the nameplates at your address.</p>

<h2>Soft starters and load management</h2>
<p>Two tools let a generator handle more AC than its raw numbers suggest.</p>
<p><strong>Soft starters</strong> mount at the condenser and ramp the compressor up instead of slamming it on. Inrush drops, so the generator sees a smaller starting surge. Running load stays the same. Compatibility depends on the compressor, so we confirm before specifying one.</p>
<p><strong>Load management</strong> lives in or alongside the automatic transfer switch. It watches generator output and drops or delays selected loads (the second AC system, the water heater, the dryer) when the generator nears capacity, then brings them back when there is room. The full mechanics are in <a href="/blog/generator-load-management-explained">load management on a home standby generator</a>.</p>
<p>Used together, these often let a home in Sugar Land, Cypress or the Heights keep every room cooled on a correctly sized unit instead of jumping to the largest air-cooled model available.</p>

<h2>Where the generator comes from</h2>
<p>Solivance Electric is an authorized Briggs &amp; Stratton standby generator dealer. That means the same company that reads your nameplates can supply the unit and install it, or sell you the unit alone if you have an install plan. The current lineup is on the <a href="/generators">generators page</a>. Call or request a quote to buy.</p>
<p>Every install is a fixed-fee quote after a free site walk: permit with the City of Houston or Harris County, pad, transfer switch, wiring, gas coordination, inspection and commissioning. The full scope is on the <a href="/services/generator-installs">generator installation page</a>.</p>

<h2>Common sizing mistakes</h2>
<ul>
  <li>Sizing from square footage alone. A 2,800 sq ft house with gas heat and one efficient system is not the same load as a 2,800 sq ft house with two older systems and heat strips.</li>
  <li>Ignoring the start. A generator that carries the running load but cannot start the compressor leaves the house warm.</li>
  <li>Forgetting future loads. An EV charger, pool equipment or a garage conversion adds load. Plan the transfer switch and load management for it.</li>
  <li>Skipping the gas meter. A generator that cannot get enough fuel cannot make its rated output.</li>
</ul>

<h2>Get your AC read and the generator sized</h2>
<p>Solivance Electric reads every nameplate at the site walk and hands back a generator recommendation with a fixed-fee install quote. Request a quote on the <a href="/contact">contact page</a> or call <strong>(832) 965-9964</strong>. Financing available through Synchrony &mdash; ask about <a href="/financing">monthly payment options</a>. Subject to credit approval.</p>
`,
  },
  {
    slug: 'briggs-stratton-warranty-authorized-dealer',
    title: 'Briggs & Stratton Warranty and Authorized Dealer Installs',
    description:
      'How Briggs & Stratton standby generator warranty coverage works in Houston, what an authorized dealer install documents, and what keeps coverage in good standing.',
    date: '2027-04-06',
    readTime: '7 min read',
    category: 'Generators',
    image: '/photos_new/generator-installs.jpg',
    keywords: [
      'Briggs & Stratton generator warranty Houston',
      'authorized Briggs & Stratton dealer Houston',
      'standby generator warranty registration',
      'generator dealer install vs handyman',
      'Briggs & Stratton generator installer Bellaire',
      'standby generator commissioning Houston',
      'generator warranty maintenance records',
    ],
    faqs: [
      {
        q: 'How long is the Briggs & Stratton standby generator warranty?',
        a: 'Warranty terms vary by model. Solivance Electric registers the install as an authorized dealer and gives you the warranty paperwork for the exact unit installed. For the specific terms on a model you are considering, call (832) 965-9964 or review the documentation that ships with the unit.',
      },
      {
        q: 'Why does an authorized dealer install matter for warranty?',
        a: 'Manufacturers tie warranty coverage to correct installation, startup and registration. An authorized dealer installs to the manufacturer’s instructions, commissions the unit, records the startup, and registers it. That paper trail is what a warranty claim relies on if a component fails later.',
      },
      {
        q: 'Can I buy the generator from Solivance and install it myself?',
        a: 'You can buy the unit alone from Solivance Electric. A standby generator install still needs a licensed electrician, a permit and an inspection in Houston and Harris County. Installation by someone other than a qualified installer can affect warranty coverage, so review the warranty terms before deciding.',
      },
      {
        q: 'Does skipping maintenance affect a generator warranty?',
        a: 'It can. Warranty documents commonly require maintenance at the intervals the manufacturer sets, with records to show it. Solivance Electric care plans cover annual service and keep a dated record of each visit, which is the documentation a claim usually asks for.',
      },
    ],
    content: `
<p>A standby generator is an engine, an alternator, a controller and a transfer switch that sit outside for years and are expected to start the first time CenterPoint drops the feed. When a component fails, the warranty is what decides who pays. And the warranty is only as good as the paperwork behind the install.</p>
<p>Solivance Electric is an authorized Briggs &amp; Stratton standby generator dealer. This post covers what that means for warranty coverage, what a dealer install documents, and what keeps coverage in good standing.</p>

<h2>Why does an authorized dealer install matter for a Briggs &amp; Stratton warranty?</h2>
<p><strong>Warranty coverage depends on a correct install, a recorded startup and a registered unit.</strong> An authorized dealer installs to the manufacturer&rsquo;s instructions, commissions the generator, and registers it. Warranty terms vary by model; Solivance Electric registers the install as an authorized dealer, so the paper trail exists before you ever need it.</p>

<h2>What a generator warranty is built on</h2>
<p>Every manufacturer&rsquo;s warranty is a contract with conditions. The exact terms belong to the specific model and the documents that ship with it. The conditions that show up across standby generator warranties generally fall into a few buckets:</p>
<ul>
  <li><strong>Correct installation</strong> to the manufacturer&rsquo;s written instructions and to code.</li>
  <li><strong>Startup and commissioning</strong> performed and recorded.</li>
  <li><strong>Registration</strong> of the unit with the manufacturer.</li>
  <li><strong>Maintenance</strong> at the intervals the manufacturer sets, with records.</li>
  <li><strong>Exclusions</strong> for damage from improper fuel supply, flooding, physical damage or unauthorized modification.</li>
</ul>
<p>Solivance Electric does not quote warranty years for any model in a blog post. Warranty terms vary by model. The terms for the unit you choose are reviewed with you before purchase.</p>

<h2>What the code says about following the manual</h2>
<p>NEC 110.3(B) requires listed equipment to be installed and used according to the instructions included in the listing. For a standby generator, that ties code compliance directly to the installation manual: pad requirements, clearances, fuel line sizing, conductor sizing and transfer switch connections.</p>
<p>The generator itself falls under NEC 445. A home standby system is an optional standby system under NEC 702. The transfer switch, the disconnects and the wiring between them all have to meet those articles, plus the 2023 NEC emergency disconnect requirement in 230.85 where it applies. The City of Houston and Harris County inspect against these rules.</p>
<p>An install that skips a step in the manual can fail inspection. It can also become the reason a warranty claim is questioned later.</p>

<h2>What an authorized dealer install documents</h2>
<p>When Solivance Electric installs a Briggs &amp; Stratton standby generator, the job produces a record, not just a working unit.</p>
<table>
  <thead>
    <tr><th>Step</th><th>What gets recorded</th></tr>
  </thead>
  <tbody>
    <tr><td>Site walk and sizing</td><td>Load calculation, AC nameplate data, gas meter capacity</td></tr>
    <tr><td>Permit</td><td>City of Houston or Harris County permit number</td></tr>
    <tr><td>Installation</td><td>Pad, clearances, conductor sizes, transfer switch wiring per the manual</td></tr>
    <tr><td>Inspection</td><td>Passed inspection on file</td></tr>
    <tr><td>Commissioning</td><td>Startup checks, fuel pressure under load, transfer and retransfer test</td></tr>
    <tr><td>Registration</td><td>Unit registered with the manufacturer as an authorized dealer install</td></tr>
  </tbody>
</table>
<p>You get copies. If a controller, starter or alternator component fails down the road, the claim starts with documents instead of guesswork.</p>

<h2>Buying the unit only vs. unit plus install</h2>
<p>Solivance Electric sells Briggs &amp; Stratton standby generators two ways: the unit only, or the unit plus full installation. The lineup is on the <a href="/generators">generators page</a>; call or request a quote to buy.</p>
<p>Buying the unit alone works for builders and owners who already have a licensed installer lined up. Two things to know before going that route:</p>
<ol>
  <li>A standby generator install in Houston still needs a licensed electrician, a permit and an inspection. Fuel piping is separate work with its own requirements.</li>
  <li>Who installs and commissions the unit can affect warranty coverage. Read the warranty terms for the model first.</li>
</ol>
<p>Unit plus install puts the supply, the install, the commissioning and the registration under one company. One number to call if anything needs attention.</p>

<h2>What keeps coverage in good standing</h2>
<p>After the install, the owner&rsquo;s part is mostly maintenance. Standby generators run a scheduled exercise cycle, burn oil, wear filters and plugs, and sit through Houston heat and humidity. Manufacturers set service intervals, and warranty documents commonly expect them to be followed.</p>
<ul>
  <li>Annual service at minimum, more often after long run times like a multi-day outage.</li>
  <li>Oil, oil filter, air filter and spark plugs on the manufacturer&rsquo;s schedule.</li>
  <li>Battery tested and replaced before it fails.</li>
  <li>Firmware or controller updates where the manufacturer releases them.</li>
  <li>A dated record of every visit.</li>
</ul>
<p>The <a href="/blog/standby-generator-maintenance-schedule">standby generator maintenance schedule</a> post covers what an annual service includes. Solivance Electric <a href="/care-plans">care plans</a> handle the visits and keep the record.</p>

<h2>Common ways coverage gets put at risk</h2>
<ul>
  <li>Undersized gas line or meter, so the engine runs starved under load.</li>
  <li>Unit set in a low spot that floods. Placement matters in Meyerland, Bellaire and parts of Missouri City.</li>
  <li>Transfer switch from a different manufacturer wired in without confirming compatibility.</li>
  <li>No startup record and no registration.</li>
  <li>Maintenance skipped for years.</li>
</ul>
<p>Each of these is avoidable at install. That is the point of an authorized dealer install: the decisions that protect coverage get made before the unit is set on the pad.</p>

<h2>What happens if a component fails under warranty?</h2>
<p>When a generator throws a fault code or fails to start, the first call goes to the installer. Solivance Electric reads the controller&rsquo;s fault history, checks the fuel supply, battery and transfer switch, and isolates the failed part. If the failure looks like a covered defect, the claim goes forward with the install record, the commissioning sheet, the registration and the maintenance history attached.</p>
<p>That sequence is the practical difference between a dealer install and an install with no paperwork. Without a startup record or a service history, a claim starts with questions about how the unit was installed and maintained. With them, it starts with the failed part.</p>
<p>A few things owners can do between service visits:</p>
<ul>
  <li>Keep the controller powered and the unit in automatic mode.</li>
  <li>Note any alerts or fault lights and call before clearing them.</li>
  <li>Keep vegetation, mulch and stored items out of the required clearances.</li>
  <li>After a long outage run, schedule a service visit before the next storm.</li>
</ul>

<h2>Transfer switch and accessories</h2>
<p>A standby system is more than the generator. The automatic transfer switch, load management modules and any monitoring accessories are part of the installation. Pairing components the manufacturer lists for use together keeps the system inside the manual and inside the warranty conditions. The <a href="/blog/automatic-transfer-switch-explained">automatic transfer switch explainer</a> covers how the switch works.</p>

<h2>Where Solivance Electric installs</h2>
<p>Solivance Electric installs and services standby generators across Houston, including <a href="/locations/bellaire">Bellaire</a>, West U, Meyerland, the <a href="/locations/heights">Heights</a>, the <a href="/locations/memorial-villages">Memorial Villages</a>, Sugar Land, Missouri City, Stafford, <a href="/locations/katy">Katy</a> and <a href="/locations/cypress">Cypress</a>. The full install scope is on the <a href="/services/generator-installs">generator installation page</a>.</p>

<h2>Start with a site walk</h2>
<p>Every install is a fixed-fee quote after a free site walk, and every unit Solivance Electric installs is registered as an authorized dealer install. Request a quote on the <a href="/contact">contact page</a> or call <strong>(832) 965-9964</strong>. Financing available through Synchrony &mdash; ask about <a href="/financing">monthly payment options</a>. Subject to credit approval.</p>
`,
  },
  {
    slug: 'standby-generator-install-day-by-day',
    title: 'What Happens During a Standby Generator Install, Day by Day',
    description:
      'The standby generator install sequence in Houston: site walk, permit, pad, transfer switch, gas, inspection and commissioning, and what you need to do at each step.',
    date: '2027-04-11',
    readTime: '8 min read',
    category: 'Generators',
    image: '/photos_new/generator-installs.jpg',
    keywords: [
      'standby generator installation process Houston',
      'how long does a generator install take',
      'generator install day by day',
      'automatic transfer switch install Houston',
      'generator permit inspection Harris County',
      'Briggs & Stratton generator install Sugar Land',
      'whole home generator installer Memorial',
    ],
    faqs: [
      {
        q: 'How long does a standby generator install take in Houston?',
        a: 'The on-site work is usually short; the calendar time is set by permitting, equipment availability, gas work and inspection scheduling. Solivance Electric gives you the sequence and the expected dates at the site walk and keeps you updated as the permit and inspection move.',
      },
      {
        q: 'Will my power be off during the install?',
        a: 'Yes, for part of one day. The house is de-energized while the automatic transfer switch is connected to the service. Solivance Electric schedules that window in advance, and refrigerators and freezers hold temperature through it when kept closed.',
      },
      {
        q: 'Do I need to be home during the installation?',
        a: 'You need to be available for the site walk, for access on the day the house is de-energized, and for the final walkthrough. Many homeowners are not home for the pad and outdoor work. Solivance Electric confirms access needs before each step.',
      },
      {
        q: 'Who runs the gas line for a standby generator?',
        a: 'Fuel gas piping in Texas is licensed plumbing work. Solivance Electric coordinates the gas connection as part of the project so the line is sized for the generator, pressure-tested, and ready when the electrical side is complete.',
      },
      {
        q: 'What happens at commissioning?',
        a: 'The generator is started, fuel pressure is checked under load, the transfer switch is tested by simulating a utility outage, retransfer is confirmed, and the exercise schedule is set. Solivance Electric then walks you through the controller and registers the unit as an authorized dealer install.',
      },
    ],
    content: `
<p>A standby generator install looks like one big job from the street. It is actually a sequence of smaller ones, each with its own checks: sizing, permit, pad, fuel, transfer switch, inspection and startup. Knowing the order makes it easier to plan around.</p>
<p>This is how Solivance Electric runs a residential standby generator install in Houston and Harris County, step by step.</p>

<h2>What happens during a standby generator install?</h2>
<p><strong>The install runs in a fixed order:</strong> site walk and sizing, permit, equipment order, pad and placement, fuel connection, transfer switch and wiring, inspection, then commissioning. The house is without power for part of one day while the transfer switch is tied in. Solivance Electric handles the permit, the coordination and the inspection.</p>

<h2>Step 1: The site walk</h2>
<p>The site walk is free and decides most of the job. Solivance Electric reads:</p>
<ul>
  <li>The electrical service: main breaker rating, panel brand and condition, meter location.</li>
  <li>Every AC condenser nameplate: running amps and locked-rotor amps.</li>
  <li>Other large loads: water heater, range, dryer, pool equipment, EV charger.</li>
  <li>The gas meter and the likely route for the fuel line.</li>
  <li>Placement options: clearances from windows, doors, vents and lot lines, drainage, and HOA rules.</li>
</ul>
<p>From that, you get a generator recommendation and a fixed-fee install quote. The sizing method is covered in <a href="/blog/generator-sizing-ac-tonnage-houston">generator sizing by AC tonnage</a>, and placement in <a href="/blog/generator-placement-clearance-code">standby generator placement clearances</a>.</p>

<h2>Step 2: Permit and equipment order</h2>
<p>Once you approve the quote, Solivance Electric files the electrical permit with the City of Houston or Harris County, depending on the address. Cities like Bellaire, West U, Sugar Land and Missouri City have their own permit offices and rules, and those get filed the same way. The details are in <a href="/blog/standby-generator-permits-houston-harris-county">what permits a standby generator needs</a>.</p>
<p>At the same time, the generator is ordered. Solivance Electric is an authorized Briggs &amp; Stratton standby generator dealer, so the unit comes through us. Lead times change with the season, which is why <a href="/blog/generator-lead-times-order-before-june">ordering before June</a> matters.</p>

<h2>Step 3: Pad and placement</h2>
<p>The generator sits on a level pad at the location agreed at the site walk. The pad type follows the manufacturer&rsquo;s instructions. The spot is checked again against required clearances and against standing water, which matters in flood-prone parts of Meyerland and Bellaire.</p>
<p>Conduit runs between the generator location and the transfer switch location are laid out and stubbed at this stage.</p>

<h2>Step 4: Fuel connection</h2>
<p>Fuel gas piping in Texas is licensed plumbing work. Solivance Electric coordinates the gas side so the line is sized for the generator&rsquo;s fuel demand at full load, run from the meter, and pressure-tested. CenterPoint may need to evaluate or upgrade the gas meter if the existing one cannot supply the house and the generator together. That coordination starts early because it can set the schedule.</p>
<p>Propane installs follow the same idea with a tank instead of a meter. The comparison is in <a href="/blog/natural-gas-vs-propane-generator-houston">natural gas vs. propane standby generators</a>.</p>

<h2>Step 5: Transfer switch and wiring</h2>
<p>This is the day the house goes dark for a few hours. Solivance Electric de-energizes the service and installs the automatic transfer switch between the meter and the panel (whole-home) or ahead of a dedicated essential-loads panel (essential-circuit).</p>
<table>
  <thead>
    <tr><th>Task</th><th>What it involves</th></tr>
  </thead>
  <tbody>
    <tr><td>Transfer switch</td><td>Mounted near the meter or panel, rated for the service</td></tr>
    <tr><td>Service conductors</td><td>Re-landed through the transfer switch</td></tr>
    <tr><td>Generator feeder</td><td>Sized conductors from the generator to the switch, in conduit</td></tr>
    <tr><td>Control wiring</td><td>Low-voltage wiring between the generator controller and the switch</td></tr>
    <tr><td>Load management</td><td>Modules on selected large loads, if specified</td></tr>
    <tr><td>Disconnects and labeling</td><td>NEC 230.85 (2023) and NEC 702 labeling where required</td></tr>
  </tbody>
</table>
<p>The system is built under NEC 702 for optional standby systems and NEC 445 for the generator. The <a href="/blog/automatic-transfer-switch-explained">automatic transfer switch explainer</a> covers what the switch does. Power comes back on the utility side the same day.</p>

<h2>Step 6: Inspection</h2>
<p>Solivance Electric schedules the inspection with the authority having jurisdiction. The inspector checks the generator, the transfer switch, conductor sizing, grounding and bonding, clearances and labeling. You do not need to chase the permit office. Inspections pass on the first walk because the work was correct when it was installed.</p>

<h2>Step 7: Commissioning and walkthrough</h2>
<p>With the inspection passed, the generator is started and tested:</p>
<ol>
  <li>Oil and coolant levels (where applicable) confirmed.</li>
  <li>Engine started, voltage and frequency checked.</li>
  <li>Fuel pressure checked under load.</li>
  <li>Utility outage simulated: the transfer switch moves to generator and the house loads come up.</li>
  <li>Load management checked by running large loads together.</li>
  <li>Utility restored: retransfer confirmed and cooldown observed.</li>
  <li>Weekly exercise schedule set.</li>
</ol>
<p>Then Solivance Electric walks you through the controller, the status lights, the exercise cycle and what to do if an alert appears. The unit is registered as an authorized dealer install. Warranty terms vary by model; you get the paperwork for yours.</p>

<h2>What you need to do</h2>
<ul>
  <li>Be available for the site walk.</li>
  <li>Approve the quote and placement.</li>
  <li>Get HOA approval if your neighborhood requires it. See <a href="/blog/generator-noise-hoa-bellaire-west-u">generator noise, placement and HOA rules</a>.</li>
  <li>Provide access on transfer switch day.</li>
  <li>Attend the walkthrough.</li>
</ul>
<p>Everything else, from the permit to the inspection to the registration, is handled by Solivance Electric.</p>

<h2>What can push the schedule?</h2>
<p>Most installs follow the sequence above without surprises. When the calendar moves, it is usually one of these:</p>
<ul>
  <li><strong>Gas meter capacity.</strong> If the existing meter cannot supply the house and the generator together, CenterPoint has to evaluate or replace it before the generator can run at full output.</li>
  <li><strong>Service condition.</strong> A failing meter base, a Federal Pacific or Zinsco panel, or a 100A service that cannot support the transfer switch may need a <a href="/services/panel-upgrades">panel upgrade</a> first.</li>
  <li><strong>HOA review.</strong> Some associations in the Memorial Villages, Sugar Land and Katy review placement and screening before work starts.</li>
  <li><strong>Equipment availability.</strong> Demand climbs after every storm and before hurricane season.</li>
  <li><strong>Inspection scheduling.</strong> Permit offices get busy in the spring and after major outages.</li>
  <li><strong>Weather.</strong> Pad and trench work waits for dry ground.</li>
</ul>
<p>Solivance Electric flags the likely ones at the site walk, so they show up in the plan instead of as a surprise halfway through.</p>

<h2>Whole-home vs. essential-circuit installs</h2>
<p>The sequence is the same for both. The difference is in Step 5. A whole-home install puts a service-rated transfer switch ahead of the main panel, usually with load management on the largest loads. An essential-circuit install adds a smaller panel, moves the chosen circuits into it, and puts the transfer switch ahead of that panel only. The tradeoffs are in <a href="/blog/whole-home-vs-essential-circuit-generator">whole-home vs. essential-circuit generator</a>.</p>

<h2>After the install</h2>
<p>The generator exercises on its own. Annual service keeps it ready and keeps the maintenance record that warranty claims rely on. <a href="/care-plans">Care plans</a> cover that.</p>
<p>Solivance Electric installs across Houston, the <a href="/locations/memorial">Memorial</a> area, the Heights, Stafford, Sugar Land, Katy and Cypress. See the full scope on the <a href="/services/generator-installs">generator installation page</a> and the Briggs &amp; Stratton lineup on the <a href="/generators">generators page</a>.</p>

<h2>Book the site walk</h2>
<p>The install starts with a free site walk and a fixed-fee quote. Request one on the <a href="/contact">contact page</a> or call <strong>(832) 965-9964</strong>. Financing available through Synchrony &mdash; ask about <a href="/financing">monthly payment options</a>. Subject to credit approval.</p>
`,
  },
  {
    slug: 'houston-power-outages-beryl-backup-power',
    title: 'Houston Outages After Beryl: The Case for Backup Power',
    description:
      'What Hurricane Beryl, the 2024 derecho and Winter Storm Uri showed about Houston outages, and how a standby generator changes a multi-day outage at home.',
    date: '2027-04-16',
    readTime: '7 min read',
    category: 'Generators',
    image: '/photos_new/houston.jpg',
    keywords: [
      'Houston power outage backup generator',
      'Hurricane Beryl power outage generator',
      'CenterPoint outage standby generator',
      'Houston derecho power outage',
      'whole home generator Houston hurricane',
      'standby generator Bellaire Heights',
      'Briggs & Stratton dealer Houston',
      'generator before hurricane season Houston',
    ],
    faqs: [
      {
        q: 'How many people lost power in Houston during Hurricane Beryl?',
        a: 'Hurricane Beryl made landfall in July 2024 and knocked out power to more than 2 million CenterPoint customers. Many homes were without power for days during peak summer heat, which is why standby generator interest in Houston rose afterward.',
      },
      {
        q: 'Is a standby generator worth it in Houston?',
        a: 'For homes where a multi-day outage means no cooling, spoiled food, medical equipment without power, or a home office offline, a standby generator restores power automatically within seconds of an outage. Solivance Electric sizes the unit to the house and quotes the install at a fixed fee after a free site walk.',
      },
      {
        q: 'Is a portable generator enough for a Houston hurricane outage?',
        a: 'A portable generator can run a few circuits through a properly installed interlock or inlet, but it usually cannot run central air, needs refueling, and must stay outdoors away from openings. A standby generator runs on natural gas or propane and starts automatically. The tradeoffs depend on the house and the loads.',
      },
      {
        q: 'When should I install a generator before hurricane season?',
        a: 'Hurricane season starts June 1. Permits, equipment lead times, gas coordination and inspection all take calendar time, and demand rises after every major storm. Starting with a site walk in the spring gives the install room to finish before the season starts.',
      },
    ],
    content: `
<p>Houston has had three outages in recent memory that reset how homeowners think about power. Winter Storm Uri in February 2021. The derecho that hit Houston in May 2024. Hurricane Beryl in July 2024, which knocked out power to more than 2 million CenterPoint customers. Each one hit in a different season, from a different direction, and each one left homes without power for days.</p>
<p>This post covers what those events showed and how a standby generator changes the outcome at a single house.</p>

<h2>Why do Houston homeowners install standby generators after Beryl?</h2>
<p><strong>Beryl showed that a long outage in Houston heat is a health and property problem, not an inconvenience.</strong> A standby generator starts automatically within seconds of losing utility power and keeps air conditioning, refrigeration and medical equipment running on natural gas or propane until CenterPoint restores service, with no refueling and no extension cords.</p>

<h2>What the last three big outages had in common</h2>
<table>
  <thead>
    <tr><th>Event</th><th>When</th><th>What it did to homes</th></tr>
  </thead>
  <tbody>
    <tr><td>Winter Storm Uri</td><td>February 2021</td><td>Grid-wide outages during a hard freeze; no heat, frozen pipes</td></tr>
    <tr><td>Houston derecho</td><td>May 2024</td><td>Straight-line winds took down lines and poles across the city</td></tr>
    <tr><td>Hurricane Beryl</td><td>July 2024</td><td>More than 2 million CenterPoint customers lost power in summer heat</td></tr>
  </tbody>
</table>
<p>Three different weather events. Same result at the house: no power, no cooling or heat, and no firm restoration time. The common thread is that the outage was not caused by anything at the house, and nothing at the house could fix it.</p>

<h2>What a multi-day outage costs a house</h2>
<p>A summer outage in Houston is measured in heat and humidity. Indoor temperatures climb within hours. After a day or two:</p>
<ul>
  <li>Refrigerator and freezer contents are at risk.</li>
  <li>Indoor humidity rises, and mold becomes a concern in closed-up houses.</li>
  <li>Sump pumps and well pumps stop, where a house has them.</li>
  <li>Medical devices like CPAP machines and oxygen concentrators need another power source.</li>
  <li>Home offices go offline.</li>
  <li>Older family members and infants face real heat risk.</li>
</ul>
<p>A winter outage like Uri flips the problem: no heat, and pipes that freeze and split. Our <a href="/blog/houston-freeze-prep-electrical-generator">Houston freeze prep post</a> covers that side.</p>

<h2>How a standby generator changes the outcome</h2>
<p>A standby generator is permanently installed outside the house, connected to the natural gas line or a propane tank, and wired through an automatic transfer switch. When utility power drops:</p>
<ol>
  <li>The transfer switch senses the loss of utility voltage.</li>
  <li>The generator starts on its own.</li>
  <li>The switch disconnects the house from the utility and connects it to the generator.</li>
  <li>The house runs on generator power.</li>
  <li>When CenterPoint restores service, the switch moves back and the generator cools down and shuts off.</li>
</ol>
<p>No one has to be home. No one has to go outside in the storm. There is no gasoline to store. The transfer switch also keeps generator power from backfeeding onto the utility lines, which protects line crews working on restoration. The <a href="/blog/automatic-transfer-switch-explained">transfer switch explainer</a> has more detail.</p>

<h2>Standby vs. portable after Beryl</h2>
<p>A lot of homeowners bought portable generators during and after Beryl. A portable unit can be the right tool for some houses. It has limits:</p>
<ul>
  <li>Most cannot run central air.</li>
  <li>They need refueling, often more than once a day.</li>
  <li>They must run outdoors, away from windows and doors, because of carbon monoxide.</li>
  <li>Connecting one to house wiring requires a listed interlock or transfer switch and a power inlet. Backfeeding through a dryer outlet is dangerous and illegal.</li>
</ul>
<p>The full comparison is in <a href="/blog/portable-vs-standby-generator-backfeed">portable vs. standby generator: backfeed, interlocks and safety</a>.</p>

<h2>Whole-home or essential circuits</h2>
<p>Not every house needs every circuit on the generator. Two common approaches:</p>
<ul>
  <li><strong>Whole-home:</strong> the transfer switch sits ahead of the main panel and the generator carries the house, usually with load management on the largest loads.</li>
  <li><strong>Essential circuits:</strong> a smaller generator feeds a dedicated panel with the refrigerator, some lighting, one AC system, medical equipment and the garage door.</li>
</ul>
<p>Which one fits depends on the house and the budget. See <a href="/blog/whole-home-vs-essential-circuit-generator">whole-home vs. essential-circuit generator</a> and <a href="/blog/generator-sizing-ac-tonnage-houston">generator sizing by AC tonnage</a>.</p>

<h2>Houston neighborhoods where backup power comes up most</h2>
<p>Solivance Electric hears about backup power across the service area, with a few patterns:</p>
<ul>
  <li><strong>Bellaire, West U and Meyerland:</strong> mature tree canopy over overhead lines, plus flood-aware placement on the lot.</li>
  <li><strong>The Heights:</strong> older homes, often with 100A or 150A service that needs a look before a generator. See <a href="/blog/panel-upgrade-before-generator">panel upgrade before a generator</a>.</li>
  <li><strong>Memorial Villages:</strong> larger homes with multiple AC systems and HOA placement rules.</li>
  <li><strong>Sugar Land, Missouri City, Stafford, Katy and Cypress:</strong> newer construction where whole-home coverage is often practical.</li>
</ul>

<h2>Timing: why spring is the window</h2>
<p>Hurricane season starts June 1. A standby generator install takes calendar time: site walk, permit, equipment order, gas coordination, install, inspection and commissioning. Demand rises after every major storm, and lead times move with it. The <a href="/blog/hurricane-season-generator-checklist-houston">March generator checklist</a> covers what to line up early.</p>

<h2>What should run on backup power?</h2>
<p>Before the site walk, it helps to list what the house cannot go without for three or four days in July. A typical Houston list:</p>
<ul>
  <li>At least one AC system, sized to keep bedrooms livable.</li>
  <li>Refrigerator and freezer.</li>
  <li>Medical equipment: CPAP, oxygen concentrator, refrigerated medication.</li>
  <li>Kitchen and bathroom lighting and receptacles.</li>
  <li>Internet equipment and the home office circuit.</li>
  <li>Garage door opener and gate operator.</li>
  <li>Sump pump or well pump, where present.</li>
  <li>Gas furnace blower and controls for a winter event like Uri.</li>
</ul>
<p>That list drives the sizing. Every AC system and every electric heat strip on it changes the generator size, which is why the condenser nameplates get read at the walk.</p>

<h2>What a standby generator does not fix</h2>
<p>A generator keeps the house powered. It does not keep the house dry. A unit set in the wrong spot on a Meyerland or Bellaire lot can sit in standing water, so placement looks at drainage and flood history. It also does not replace storm prep: trimmed trees, secured outdoor items and a plan for where the household stays if the house itself is damaged. And it needs fuel. On natural gas, that means a meter and line sized for the generator. On propane, it means a tank sized for the run time you want.</p>
<p>The transfer switch, gas supply, placement and maintenance all have to be right for the generator to start the first time it is needed. That is the case for doing the install once, correctly, before the storm instead of during it.</p>

<h2>Buying and installing through Solivance Electric</h2>
<p>Solivance Electric is an authorized Briggs &amp; Stratton standby generator dealer. You can buy the unit alone or the unit plus full installation, permit, inspection and commissioning. The lineup is on the <a href="/generators">generators page</a>; call or request a quote to buy. Install scope is on the <a href="/services/generator-installs">generator installation page</a>.</p>

<h2>Get ahead of the next outage</h2>
<p>Every install is a fixed-fee quote after a free site walk. Request one on the <a href="/contact">contact page</a> or call <strong>(832) 965-9964</strong>. Financing available through Synchrony &mdash; ask about <a href="/financing">monthly payment options</a>. Subject to credit approval.</p>
`,
  },
  {
    slug: 'smart-panel-load-management-vs-service-upgrade',
    title: 'Smart Panel Load Management vs. a Service Upgrade',
    description:
      'When a smart panel or energy management system can avoid a 200A service upgrade in a Houston home, and when the load calculation says upgrade the service.',
    date: '2027-04-21',
    readTime: '7 min read',
    category: 'Panel Upgrades',
    image: '/photos_new/panel-upgrades.jpg',
    keywords: [
      'smart panel vs service upgrade Houston',
      'load management instead of panel upgrade',
      'NEC 220.70 energy management system',
      'EV charger load management Houston',
      '100 amp to 200 amp upgrade Houston',
      'smart electrical panel Heights Bellaire',
      'panel upgrade financing Houston',
    ],
    faqs: [
      {
        q: 'Can a smart panel replace a service upgrade?',
        a: 'Sometimes. If the load calculation shows the existing service can carry the house when large loads are managed so they do not all run at once, an energy management system can avoid a service upgrade. If the calculated load exceeds the service even with management, or the panel itself is failing, the service needs to be upgraded.',
      },
      {
        q: 'What does the NEC say about load management?',
        a: 'The 2023 NEC recognizes energy management systems in Article 750, and NEC 220.70 allows a listed energy management system to set the load value used in the calculation. NEC 625.42 covers EV charger load management. Solivance Electric applies these during the load calculation and the inspection.',
      },
      {
        q: 'Is load management cheaper than a panel upgrade?',
        a: 'It depends on the house. Load management avoids CenterPoint coordination and new service conductors, but the equipment and installation still cost something. Solivance Electric quotes both options at a fixed fee after a free site walk so you can compare them side by side.',
      },
      {
        q: 'Can I add an EV charger to a 100A or 150A service?',
        a: 'Often, with load management. A charger with listed load management can reduce or pause charging when the house load is high. Whether it works depends on the NEC 220 calculation for the house. If the numbers do not work even with management, a service upgrade is the answer.',
      },
    ],
    content: `
<p>A lot of Houston homes are running out of room on the service. The 100A or 150A service that was fine when the house was built now has to carry two AC systems, an EV charger, a pool pump, maybe a hot tub and a home office. The traditional answer is a service upgrade to 200A or more. The newer answer is load management: a smart panel or energy management system that keeps the big loads from all running at once.</p>
<p>Both are legitimate. The load calculation decides which one fits.</p>

<h2>When does load management make sense instead of a service upgrade?</h2>
<p><strong>Load management fits when the existing service can carry the house as long as the largest loads are kept from running together.</strong> Under NEC 220.70 and Article 750, a listed energy management system can set the load used in the calculation. If the managed number still exceeds the service, or the panel is failing, the service needs an upgrade.</p>

<h2>Two ways to solve the same problem</h2>
<table>
  <thead>
    <tr><th></th><th>Load management</th><th>Service upgrade</th></tr>
  </thead>
  <tbody>
    <tr><td>What changes</td><td>Adds monitoring and control of selected loads</td><td>New meter base, service conductors, main panel</td></tr>
    <tr><td>Utility involvement</td><td>Usually none</td><td>CenterPoint disconnect and reconnect</td></tr>
    <tr><td>Capacity</td><td>Same service, used more carefully</td><td>More amps available at all times</td></tr>
    <tr><td>Tradeoff</td><td>Some loads may pause or slow during peaks</td><td>None in daily use</td></tr>
    <tr><td>Fixes a failing panel</td><td>No</td><td>Yes</td></tr>
    <tr><td>Future headroom</td><td>Limited</td><td>Room for added loads</td></tr>
  </tbody>
</table>

<h2>What load management actually is</h2>
<p>Load management covers a range of equipment:</p>
<ul>
  <li><strong>Smart panels</strong> replace or supplement the main panel and can monitor and switch individual circuits.</li>
  <li><strong>Energy management systems</strong> monitor the service and control a few large loads through relays or controllers.</li>
  <li><strong>EV chargers with built-in load management</strong> read the service current and lower or pause charging when the house is busy. NEC 625.42 covers this.</li>
  <li><strong>Load-shed modules</strong> on generator transfer switches, which work the same idea on generator power. See <a href="/blog/generator-load-management-explained">generator load management explained</a>.</li>
</ul>
<p>For code purposes, the system has to be listed for the purpose and installed per its instructions. The 2023 NEC covers energy management systems in Article 750. NEC 220.70 lets the load value set by the system be used in the service calculation.</p>

<h2>How the load calculation decides</h2>
<p>Every recommendation starts with an NEC 220 load calculation for the house. The method is covered in <a href="/blog/residential-load-calculation-nec-220">load calculations explained: NEC 220</a>. The steps:</p>
<ol>
  <li>Calculate the existing house load from square footage, appliances, HVAC and fixed equipment.</li>
  <li>Add the new load: EV charger, second AC system, pool equipment, hot tub.</li>
  <li>Compare to the service rating.</li>
  <li>If it exceeds the service, check whether managing one or two large loads brings the calculated load back within the rating.</li>
  <li>Check the condition of the existing panel, meter base and service conductors.</li>
</ol>
<p>If the managed calculation fits and the equipment is in good condition, load management is an option. If not, the service gets upgraded.</p>

<h2>When load management is a good fit</h2>
<ul>
  <li>The house is on a 150A or 200A service in good condition and needs one new large load, typically an EV charger.</li>
  <li>The new load can wait: overnight EV charging, a pool heater, a water heater.</li>
  <li>The meter base and service conductors are sound and the panel brand has no known problems.</li>
  <li>The owner wants to avoid CenterPoint coordination for now.</li>
</ul>
<p>A common Houston case: a Cypress or Katy home on a 150A service adding a Level 2 EV charger. A charger with listed load management can often go in without a service change. See <a href="/blog/home-ev-charger-installation-houston">Level 2 EV charger at home: panel capacity first</a>.</p>

<h2>When a service upgrade is the right call</h2>
<ul>
  <li><strong>The panel is failing or obsolete.</strong> Federal Pacific Stab-Lok and Zinsco panels get replaced, not managed. See <a href="/blog/federal-pacific-zinsco-panel-replacement-houston">Federal Pacific and Zinsco panels in Houston homes</a>.</li>
  <li><strong>The house is on 100A</strong> with central air and electric appliances. There is rarely enough headroom to manage.</li>
  <li><strong>Several large loads are coming</strong>: EV charger, second AC, pool, generator. Managing all of them means a lot of things waiting their turn.</li>
  <li><strong>The meter base or service conductors are damaged</strong> or corroded.</li>
  <li><strong>A standby generator is planned</strong> and the existing service equipment will not support the transfer switch. See <a href="/blog/panel-upgrade-before-generator">panel upgrade before a generator</a>.</li>
</ul>
<p>Older homes in the Heights, Bellaire and Meyerland often land here. A new 200A service gives the house room for the next 20 years of additions. The process is on the <a href="/services/panel-upgrades">panel upgrades page</a>.</p>

<h2>The middle ground</h2>
<p>The two are not mutually exclusive. Some houses get a 200A service upgrade and still use load management on an EV charger or generator transfer switch. Others start with load management now and plan the service upgrade for when the next large load arrives. Solivance Electric lays out both paths at the site walk.</p>

<h2>What does load management feel like day to day?</h2>
<p>With a properly configured system, most days look the same as before. The management only acts when the house is near its limit. On a Houston summer afternoon with both AC systems running, the oven on and the dryer going, the system may slow the EV charger or hold the water heater for a while. Once the load drops, the managed loads come back.</p>
<p>The setup decides how noticeable that is. Solivance Electric picks which loads are managed and in what order based on what can wait:</p>
<ul>
  <li><strong>Good candidates:</strong> EV charging, electric water heaters, pool pumps and heaters, hot tubs.</li>
  <li><strong>Poor candidates:</strong> primary AC on a hot day, medical equipment, refrigeration.</li>
</ul>
<p>If the plan requires managing the primary AC regularly to stay under the service rating, that is a sign the service is too small and an upgrade is the better answer.</p>

<h2>How a standby generator fits in</h2>
<p>A home that plans a standby generator should look at the service and the generator together. The transfer switch has to match the service rating, and load management on the generator side follows the same logic as load management on the utility side. A 200A service with a managed whole-home generator is a common pairing. The generator lineup is on the <a href="/generators">generators page</a>.</p>

<h2>Permits and inspection</h2>
<p>Both options need an electrical permit in the City of Houston and most surrounding jurisdictions, including Bellaire, West U, Sugar Land and Missouri City. A service upgrade also needs CenterPoint coordination for the disconnect and reconnect. Solivance Electric files the permit, schedules the utility and handles the inspection. The 2023 NEC emergency disconnect requirement in 230.85 is checked on any service work.</p>

<h2>Get the load calculation done</h2>
<p>Solivance Electric runs the NEC 220 calculation at a free site walk and quotes both options at a fixed fee. Request a quote on the <a href="/contact">contact page</a> or call <strong>(832) 965-9964</strong>. Financing available through Synchrony &mdash; ask about <a href="/financing">monthly payment options</a>. Subject to credit approval.</p>
`,
  },
  {
    slug: 'generator-financing-vs-cash-vs-heloc',
    title: 'Paying for a Generator: Financing vs. Cash vs. HELOC',
    description:
      'Three ways Houston homeowners pay for a standby generator: cash, Synchrony financing and a HELOC, with the questions to ask before choosing one.',
    date: '2027-04-26',
    readTime: '7 min read',
    category: 'Financing',
    image: '/photos_new/generator-installs.jpg',
    keywords: [
      'how to pay for a standby generator Houston',
      'generator financing vs HELOC',
      'Synchrony generator financing Houston',
      'pay cash for whole home generator',
      'standby generator financing Katy Cypress',
      'Briggs & Stratton generator financing',
      'home equity line generator install',
    ],
    faqs: [
      {
        q: 'Can I finance a standby generator through Solivance Electric?',
        a: 'Yes. Financing is available through Synchrony for the generator and the installation. Ask about monthly payment options when you request a quote. Financing is subject to credit approval, and the terms are set by Synchrony based on your application.',
      },
      {
        q: 'Is a HELOC better than generator financing?',
        a: 'It depends on your situation. A HELOC is secured by your home and is arranged through your bank or credit union. Project financing through Synchrony is applied for with the project. Compare the terms each lender offers you, and talk to your lender or financial advisor before borrowing against your home.',
      },
      {
        q: 'Does paying cash change the generator price?',
        a: 'Solivance Electric quotes a fixed fee for the install after a free site walk, and the quote is the same scope regardless of how you pay. Ask about current payment terms when you receive the quote.',
      },
      {
        q: 'Can I finance only the generator unit and not the installation?',
        a: 'Solivance Electric sells Briggs & Stratton standby generators as the unit only or the unit plus full installation. Ask which purchase options financing through Synchrony can cover when you request your quote. Financing is subject to credit approval.',
      },
      {
        q: 'When should I apply for financing?',
        a: 'After the site walk and the fixed-fee quote, so you know the exact amount and scope. That also gives the install time to move through permitting and scheduling before hurricane season starts June 1.',
      },
    ],
    content: `
<p>A standby generator is a large purchase for most households. The unit, the transfer switch, the fuel connection, the permit and the install add up. Once the site walk is done and the quote is in hand, the next question is how to pay for it.</p>
<p>Houston homeowners generally use one of three routes: cash, project financing, or a home equity line of credit (HELOC). This post lays out how each works in plain terms. It is not financial advice; talk to your lender or financial advisor about your situation.</p>

<h2>What is the best way to pay for a standby generator?</h2>
<p><strong>The best way depends on your cash reserves, your home equity and the terms you are offered.</strong> Cash avoids borrowing. Financing through Synchrony is applied for with the project and is subject to credit approval. A HELOC borrows against your home through your bank. Compare the actual terms from each before deciding.</p>

<h2>Start with a fixed number</h2>
<p>Before comparing payment options, you need the exact amount. Solivance Electric provides a fixed-fee install quote after a free site walk, with the generator recommendation included. The quote covers sizing, permit, pad, transfer switch, wiring, gas coordination, inspection and commissioning. The full scope is on the <a href="/services/generator-installs">generator installation page</a>.</p>
<p>Solivance Electric is an authorized Briggs &amp; Stratton standby generator dealer, so the unit and the install can be on one quote. You can also buy the unit only. The lineup is on the <a href="/generators">generators page</a>; call or request a quote to buy.</p>

<h2>The three options side by side</h2>
<table>
  <thead>
    <tr><th></th><th>Cash</th><th>Synchrony financing</th><th>HELOC</th></tr>
  </thead>
  <tbody>
    <tr><td>Where you apply</td><td>No application</td><td>With the project, through Solivance Electric</td><td>Your bank or credit union</td></tr>
    <tr><td>Secured by your home</td><td>No</td><td>No</td><td>Yes</td></tr>
    <tr><td>Credit approval</td><td>Not needed</td><td>Subject to credit approval</td><td>Subject to lender approval</td></tr>
    <tr><td>Effect on savings</td><td>Reduces reserves</td><td>Reserves stay in place</td><td>Reserves stay in place</td></tr>
    <tr><td>Time to set up</td><td>None</td><td>Applied for with the quote</td><td>Lender&rsquo;s process, often longer</td></tr>
    <tr><td>Can cover other projects</td><td>Yes</td><td>Ask what it covers</td><td>Often yes, within the line</td></tr>
  </tbody>
</table>

<h2>Paying cash</h2>
<p>Cash is the simplest route. No application, no lender, no monthly payment.</p>
<p>The question to ask is what it does to your reserves. Houston outages tend to arrive with other costs: storm damage, roof repairs, tree removal, spoiled food, insurance deductibles. Hurricane Beryl in July 2024 and the May 2024 derecho both left homeowners paying for several things at once. If paying cash for the generator would drain the fund those costs come out of, that is worth weighing.</p>

<h2>Financing through Synchrony</h2>
<p>Financing available through Synchrony &mdash; ask about monthly payment options. Subject to credit approval.</p>
<p>How it works with Solivance Electric:</p>
<ol>
  <li>Free site walk and fixed-fee quote.</li>
  <li>Ask about monthly payment options with the quote.</li>
  <li>Apply through Synchrony. Synchrony sets the terms based on the application.</li>
  <li>Review the terms Synchrony offers you before accepting.</li>
  <li>Approve the quote and the install moves to permitting.</li>
</ol>
<p>The financing is tied to the project, does not borrow against your home, and leaves savings in place. Read every term in the offer before accepting. The <a href="/financing">financing page</a> has details, and <a href="/blog/how-to-finance-a-standby-generator-houston">how to finance a standby generator in Houston</a> walks through the process.</p>

<h2>Using a HELOC</h2>
<p>A home equity line of credit lets you borrow against the equity in your home through your bank or credit union. Some homeowners already have one open.</p>
<p>Things to know:</p>
<ul>
  <li><strong>It is secured by your home.</strong> That is the most important difference from the other two options.</li>
  <li><strong>Terms come from your lender.</strong> Ask your lender how the rate and repayment work on their product.</li>
  <li><strong>Setup takes time</strong> if you do not already have a line. Factor that into the install schedule.</li>
  <li><strong>It can cover several projects</strong>, such as a generator plus a panel upgrade plus roof work.</li>
  <li><strong>Tax treatment</strong> of home equity borrowing depends on your situation. Ask a tax professional.</li>
</ul>

<h2>Questions to ask before choosing</h2>
<ul>
  <li>What is the total cost of borrowing under each option, based on the actual terms offered?</li>
  <li>How does each option affect my emergency reserves?</li>
  <li>Am I comfortable with a loan secured by my home?</li>
  <li>How fast can each option be in place, given that hurricane season starts June 1?</li>
  <li>Do I need to cover other work at the same time, such as a <a href="/blog/panel-upgrade-before-generator">panel upgrade before the generator</a>?</li>
</ul>

<h2>Combining the generator with other work</h2>
<p>Some homes need more than a generator. An older Heights or Bellaire house on a 100A service may need a service upgrade first. A Katy or Cypress home may want an EV charger installed at the same time. Bundling the work into one quote can mean one permit cycle and one set of inspections where the scopes overlap. Financing for panel work is covered in <a href="/blog/financing-a-panel-upgrade-houston">financing a panel upgrade in Houston</a>, and the panel work itself on the <a href="/services/panel-upgrades">panel upgrades page</a>.</p>

<h2>Reading a financing offer</h2>
<p>Whatever route you take, read the offer before signing. A few things worth confirming in writing with any lender:</p>
<ul>
  <li>The total amount financed and what it covers: unit, install, or both.</li>
  <li>How payments are calculated and when the first one is due.</li>
  <li>Whether any promotional terms have conditions, and what happens if a condition is missed.</li>
  <li>Whether there is a penalty for paying early.</li>
  <li>For a HELOC, how the rate is set and whether it can change over time.</li>
</ul>
<p>Solivance Electric does not set financing terms. Synchrony sets the terms on its offers, and your bank sets the terms on a HELOC. If anything in an offer is unclear, ask the lender before accepting.</p>

<h2>What does not change with the payment method</h2>
<p>The scope of the job is the same whether the generator is paid in cash, financed through Synchrony or covered by a HELOC. Same sizing, same permit, same transfer switch, same inspection, same commissioning and the same authorized dealer registration. Warranty terms vary by model; Solivance Electric registers the install as an authorized dealer regardless of how it is paid for. Annual service through a <a href="/care-plans">care plan</a> is separate from the install and can be added at any time.</p>

<h2>Timing the purchase</h2>
<p>Whatever the payment route, the install still runs through site walk, permit, equipment order, gas coordination, install, inspection and commissioning. Starting in the spring leaves room before June 1. Solivance Electric serves Houston, Bellaire, West U, Meyerland, the Heights, the Memorial Villages, Sugar Land, Missouri City, Stafford, Katy and Cypress.</p>

<h2>Get the number first</h2>
<p>Every install starts with a free site walk and a fixed-fee quote. Request one on the <a href="/contact">contact page</a> or call <strong>(832) 965-9964</strong>. Financing available through Synchrony &mdash; ask about <a href="/financing">monthly payment options</a>. Subject to credit approval.</p>
`,
  },
];
