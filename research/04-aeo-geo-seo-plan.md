# Solivance Electric — AEO / GEO / SEO Master Plan

**Purpose:** Single working document for transforming the existing Next.js codebase into a full-stack AEO/GEO/SEO-optimized website, grounded in the competitor analysis and built under brand-only voice (no founder references).

**Status:** Active plan. Check off items as they ship.
**Owner of execution:** Whoever picks this up next.
**Context docs:** `research/01-client-brand.md`, `research/02-competitor-analysis.md`, `competitive-analysis.html`.

---

## 0 · Non-negotiable rule — brand voice only

Solivance Electric is the subject of every sentence. **Never** mention the founder, owner, or any named individual in copy, schema, metadata, or UI. This is a hard constraint affecting:

| Surface | Current (must change) | New |
|---------|----------------------|-----|
| `app/config.ts` | `ownerName: 'Jossue Molina'` | Remove the field entirely. |
| `app/HomePageClient.tsx:315` | `{siteConfig.ownerName} founded Solivance Electric LLC to bring…` | `Solivance Electric was built to bring…` |
| `app/about/AboutPageClient.tsx:105–109` | `{siteConfig.ownerName} founded … After years of licensed field experience … Jossue saw a simple gap…` | Full rewrite — company subject (see §5.3) |
| `app/contact/ContactPageClient.tsx:167` | `{siteConfig.ownerName}, Owner` | Remove the entire "Owner" line; replace with company tagline or cert badge. |
| `app/layout.tsx:150–153` | JSON-LD `"founder": { "@type": "Person", "name": "Jossue Molina" }` | Delete the `founder` block entirely. |
| `competitive-analysis.html:637–638` | Cover meta "Founder: Jossue Molina" | Change label to "Specialty" → "Commercial + Industrial" or delete the cell. |
| `research/01-client-brand.md` | `Owner / Founder` row | Keep for internal reference only — mark NOT FOR WEB. |
| `research/03-build-brief.md` | "founder quote / headshot" bullets | Replace with "team photo" + "company statement." |

**Voice rules going forward:**
- Subject of every headline and body sentence is **Solivance Electric** or **we / our team / our crew**.
- Replace "the founder" / "the owner" patterns with "the team," "our crew," "our licensed electricians."
- Replace "our story" section framing with "our standard" / "how we work" / "what we do differently."
- Never use first-person singular ("I", "my"). Always first-person plural ("we", "our").
- Never name a person in a testimonial attribution. Use "Commercial client · Sugar Land, TX" pattern instead of "John D."

**Search-and-destroy checklist (copy-paste for execution day):**
```
[ ] app/config.ts              → delete ownerName field
[ ] app/HomePageClient.tsx     → rewrite About section paragraphs (~L310–325)
[ ] app/about/AboutPageClient.tsx → rewrite Our Story paragraphs (~L100–135), retitle section
[ ] app/contact/ContactPageClient.tsx → remove "Owner" line at L167
[ ] app/layout.tsx             → delete "founder" block from LocalBusiness JSON-LD
[ ] competitive-analysis.html  → relabel/remove cover "Founder" cell
[ ] Global grep: Jossue        → 0 matches
[ ] Global grep: ownerName     → 0 matches
[ ] Global grep: founder\|founded by → review and neutralize
```

---

## 1 · The three optimization layers (AEO, GEO, SEO)

| Layer | Target audience | Optimization goal | Primary vehicle |
|-------|-----------------|-------------------|-----------------|
| **SEO** | Google / Bing crawlers | Rank in the 10 blue links | Keyword-targeted pages, schema, internal links, page speed |
| **AEO** (Answer Engine Optimization) | Google AI Overviews, Bing Copilot, featured snippets | Be the quoted answer to a specific question | Question-first headings, 40–60 word answer blocks, FAQ/HowTo schema |
| **GEO** (Generative Engine Optimization) | ChatGPT, Perplexity, Claude, Gemini | Be the cited source when an LLM answers a buyer's question | Factual, entity-rich content with stable citations, proper author/organization entities, clean HTML |

**Key insight from competitor analysis:** Beekman, Colwell, and FSG win SEO but leak on AEO and GEO. Their content is written for humans, not machines. Solivance can leapfrog by designing every page for **all three layers at once**.

---

## 2 · AEO strategy — be the answer

### 2.1 Structure every content block around a question

Every service page, FAQ entry, and blog post must pass the **"40-word answer test"**: can the first 40 words under a question heading stand alone as a complete, cite-worthy answer?

**Example (panel upgrades page):**
```html
<h2>How much does a commercial panel upgrade cost in Houston?</h2>
<p>
  A commercial electrical panel upgrade in Houston typically runs $2,500–$8,500 for
  a 200-amp service, and $6,000–$18,000 for 400-amp three-phase. Final pricing depends
  on meter location, utility coordination, and whether the existing service entrance
  needs relocation. Solivance Electric provides fixed-fee quotes after a free site visit.
</p>
```

This single pattern unlocks:
- Google AI Overview inclusion (direct paragraph pull)
- Bing Copilot answer card
- Featured snippet ranking
- LLM citation (specific, factual, attributable)

### 2.2 Question taxonomy — build content around these

Organize every service page around these question shapes:

| Question shape | Example | Why it matters |
|---------------|---------|----------------|
| `How much does X cost?` | "Cost of commercial panel upgrade Houston" | Highest-intent commercial search |
| `How long does X take?` | "How long does a generator install take?" | Timeline is a top buyer concern |
| `Do I need X?` | "Does my warehouse need a 400A service?" | Educational — builds trust |
| `What's the difference between X and Y?` | "Level 2 vs DC fast charger cost" | Comparison = high LLM citation |
| `Is X required by code in Texas?` | "Is an arc-fault breaker required in TX?" | Authority signal, captures code-compliance searches |
| `Can you X in [suburb]?` | "EV charger install Sugar Land TX" | Geo intent capture |

### 2.3 Required on-page primitives

Every service page ships with:
- [ ] **H2 question headings** — every section heading is a full question, not a noun phrase.
- [ ] **Answer-block paragraph** — 40–60 words immediately following each H2.
- [ ] **`FAQPage` schema** — applied in-page, not just at layout level.
- [ ] **`HowTo` schema** where a process is described (e.g., "How a panel upgrade works").
- [ ] **Specific numbers** — costs, durations, amperages, load sizes. Vague content does not get cited.
- [ ] **Last-updated date** — published directly on-page (`<time dateTime="…">`), also in `dateModified` schema.
- [ ] **Direct entity linking** — link `NEC`, `Texas TDLR`, `Harris County permit office`, `CenterPoint Energy` to their canonical URLs to strengthen entity graph.

---

## 3 · GEO strategy — be the cited source

LLMs cite sources that are **factual, entity-rich, authoritative, and crawlable**. The GEO playbook:

### 3.1 Write factually, not emotionally

| Weak (loses citation) | Strong (wins citation) |
|---|---|
| "We do great panel upgrades." | "Solivance Electric replaces 100A, 200A, and 400A commercial electrical panels to 2023 NEC standards across Greater Houston, typically completing 200A upgrades within 1–2 business days." |
| "Generators are important." | "A commercial standby generator sized for a 15,000 sq ft warehouse typically ranges from 48 kW to 125 kW, with installation completed in 2–5 days including ATS commissioning." |

### 3.2 Entity-rich content

Every page surfaces these entities consistently:
- **Geographic:** Greater Houston, Harris County, Fort Bend County, ZIPs 77048, 77407, 77478, 77493, 77471
- **Regulatory:** NEC (National Electrical Code), Texas Department of Licensing and Regulation (TDLR), Harris County Permitting, CenterPoint Energy
- **Service verticals:** commercial electrical contractor, industrial electrical contractor, standby generator installation, EV charger installation (Level 2, DCFC), LED parking lot lighting
- **Technical:** transfer switch (ATS), photocell, switchgear, main breaker, feeder, bonding, grounding, service disconnect

### 3.3 The "citation hygiene" checklist

LLMs prefer pages that look machine-trustworthy:
- [ ] Canonical URL on every page (`<link rel="canonical">`)
- [ ] `Organization` schema with sameAs links to Google Business Profile, BBB, Facebook, LinkedIn
- [ ] `LocalBusiness` schema with exact hours, phone, coordinates, address
- [ ] `Service` schema per service page with `areaServed`, `provider`, `hasOfferCatalog`
- [ ] `Article`/`BlogPosting` schema on every blog post with `dateModified`, `author: Organization` (not a person)
- [ ] Author attribution is always the **Organization** `Solivance Electric LLC`, never a person
- [ ] `en` hreflang; Spanish pages (when shipped) get `es-US` hreflang alternates
- [ ] `robots.txt` allows all major AI crawlers — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot — unless actively opting out
- [ ] Clean semantic HTML (article, section, h1–h3 hierarchy, no div soup)
- [ ] No critical content hidden behind client-only JavaScript rendering (server-render everything important)

### 3.4 The author/entity identity

All `author` fields across the site point to:
```json
{
  "@type": "Organization",
  "name": "Solivance Electric LLC",
  "url": "https://solivanceelectric.com",
  "logo": "https://solivanceelectric.com/logo/logo_horzontial.svg"
}
```
Never to a named person.

---

## 4 · SEO strategy — structural foundation

### 4.1 Keyword architecture

Three tiers, mapped to pages:

**Tier 1 — Category parent (home + services index)**
- `commercial electrical contractor Houston TX`
- `commercial electrician Houston`
- `industrial electrical contractor Houston`

**Tier 2 — Service pages (one page per service, already partially built)**
- `panel upgrade Houston TX` / variants by suburb
- `commercial generator installation Houston`
- `parking lot lighting LED Houston`
- `commercial EV charger installation Houston`
- `warehouse electrical contractor Houston`
- `pedestal installation Houston`
- `mobile home electrical hookup Houston`

**Tier 3 — Geo × service matrix (new pages — highest leverage, aligned with target areas)**
- `commercial electrician Cypress TX`
- `commercial electrician Katy TX`
- `commercial electrician Memorial Houston`
- `commercial electrician Houston TX`
- Service × geo combinations: `panel upgrade Cypress TX`, `EV charger installation Katy TX`, `standby generator Memorial Houston`, `parking lot lighting Cypress`, `RV park pedestal installation Katy`, etc.

### 4.2 URL structure

| Pattern | Purpose |
|---------|---------|
| `/` | Home — category parent |
| `/services` | Services index — internal link hub |
| `/services/panel-upgrades` | Individual service pages (one per service; currently anchor-only on `/services`) |
| `/services/generator-installs` | |
| `/services/parking-lot-lighting` | |
| `/services/ev-chargers` | |
| `/services/commercial-warehouses` | |
| `/services/pedestals` | |
| `/services/mobile-home-connections` | |
| `/locations` | Locations index — internal link hub |
| `/locations/houston` | Anchor city page (broadest, most thorough) |
| `/locations/cypress` | Primary target — US-290 corridor, 77429/77433/77095 |
| `/locations/katy` | Primary target — 77449/77493/77494 |
| `/locations/memorial` | Primary target — Memorial Villages, 77024/77079/77055 |
| `/about` | Company (not founder) story |
| `/contact` | Quote form + contact |
| `/faq` | Dedicated FAQ page (separate from on-page FAQ blocks) |
| `/blog` | Content hub |
| `/blog/[slug]` | Blog posts |

**Migration note:** existing `/services#slug` anchor deep-links keep working via 301 redirect or simply by leaving the anchor navigation alive on the services index — new service pages are additive, not replacements.

### 4.3 Internal linking rules

- Home links to: services index, each top 3 service pages, top 3 locations, about, contact, 2 blog posts.
- Every service page links to: home, services index, all other service pages (in-copy or in footer module), top 3 locations, contact, 2 relevant blog posts.
- Every location page links to: home, services index, all 7 service pages, contact.
- Every blog post links to: 2 related service pages, 1 location page, 1 other blog post.
- Footer: full sitemap of services + locations (already exists; extend).

### 4.4 Core Web Vitals targets

| Metric | Target | Why |
|--------|--------|-----|
| LCP | < 2.0s | Ranking factor + user trust |
| CLS | < 0.1 | Currently clean; watch hero image loads |
| INP | < 200ms | Framer Motion should not block interaction |
| TTFB | < 600ms | Static generation keeps this trivial |

---

## 5 · Page-by-page content plan

Styling baseline for all new pages: **Bricolage Grotesque display + Geist body + JetBrains Mono eyebrows, navy `#0f2847` + orange `#F26B1F`, squared-off radii (0.25–0.5rem), eyebrow label pattern `01 — Section · 02 — Section`, dark-hero → light-body alternation, Framer Motion fade-up on scroll.** Every new page inherits the existing `onestop-site` class container.

### 5.1 Home (`/`) — refinement, not rewrite

Current state is strong. Edits only:

| Section | Action |
|---------|--------|
| Hero | Replace `{siteConfig.ownerName}` references. Keep H1 "Commercial electrical, done right." |
| Trust band (below hero) | **NEW** — insert: "Since 2016 · Licensed Texas Electrical Contractor · Insured · 24/7 Emergency Service" in a slim navy strip with eyebrow tracking. |
| Services grid | Keep 7-card layout. Replace `/placeholder.svg` with **service illustration cards** (see §7). |
| About (home section) | Rewrite paragraphs — remove owner name. New copy in §5.3 below. |
| Stat band | **NEW** — "10 Years · [100+] Projects Completed · [50+] Panels Upgraded · 100% Inspection-Pass Rate" in Bricolage numerals with scroll-triggered counter. Numbers marked `[bracketed]` until real metrics confirmed. |
| Recent Projects | **NEW** — 4–6 anonymized project cards (see §5.8). |
| Reviews | Keep empty-state; swap CTA copy to lean on certifications, not founder. |
| FAQ | Keep. Extend to 10–12 Qs covering top AEO queries (costs, timelines, code, suburbs). |
| Bottom CTA | Keep, no change. |

### 5.2 Services index (`/services`)

Keep the anchor-navigation pattern; add **per-service "Learn More" buttons that link to dedicated service pages** (new — §5.4).

### 5.3 About (`/about`) — full rewrite (company-subject)

**New H1:** `The standard behind every Solivance install.`

**Replace "Our Story" with "Our Standard"** — four blocks:

1. **What we do** — one paragraph defining the commercial/industrial specialty.
2. **How we work** — permits, inspections, in-house crew, code adherence. No subcontracting chain.
3. **Why it matters** — outcome for the client: no callbacks, inspections passed first-time, property left cleaner than found.
4. **Where we work** — Greater Houston service area with suburb list + map embed.

**Example copy** (drop-in, no founder references):

> Solivance Electric is a licensed Texas commercial electrical contractor serving the Greater Houston metro. Panel upgrades, generator installs, parking lot lighting, EV chargers, warehouse builds, pedestals, and mobile home connections — every job to the 2023 NEC, every inspection on the first pass.
>
> Every project starts with a free site visit and a fixed-fee quote. Our licensed crew pulls every permit, coordinates every utility handoff, and stands behind every panel. No subcontracting chain, no hidden changes, no callbacks.
>
> We work across Houston, Sugar Land, Richmond, Katy, Pearland, Missouri City, Stafford, Rosenberg, and the surrounding communities. For commercial buyers comparing bids, the shortest path to a clean install is the one this crew has been running for ten years.

**Sections:**
- Hero with breadcrumb (keep)
- Stat band (already exists — keep, remove any ownerName tie-ins)
- **"Our Standard"** block (4 sub-blocks above)
- Service-areas list (keep)
- Certification stack (new — §7.4)
- CTA to contact (keep)

### 5.4 Individual service pages (`/services/[slug]`) — NEW, 7 pages

Template applied uniformly. Each page targets one high-value Tier-2 keyword.

**Page structure (every service page):**
```
Hero                → Eyebrow, H1 (service + geo), 3-line intro, phone + quote CTAs
Trust strip         → Licensed · Insured · 2023 NEC Compliant · 24/7 Emergency
Overview            → What this service covers (answer-block)
"How much does it cost?"  → Price range + factors (answer-block, schema-ready)
"How long does it take?"  → Timeline breakdown (answer-block, HowTo schema)
Our process         → 4 numbered steps (HowTo schema)
Code + permit notes → NEC references, Harris County permit info
Suburb matrix       → "Also serving Sugar Land · Katy · Richmond …" with internal links
Related services    → 3 cards linking other service pages
FAQ                 → 5–7 service-specific questions (FAQPage schema)
Bottom CTA          → Form + phone
```

**Example H1 formulas (by service):**
- Panel upgrades → "Commercial Panel Upgrades in Houston, TX."
- Generator installs → "Commercial Standby Generator Installation — Houston Metro."
- Parking lot lighting → "LED Parking Lot Lighting. Installed to Photometric Spec."
- EV chargers → "Commercial EV Charger Installation — Level 2 &amp; DCFC."
- Warehouses → "New Commercial Warehouse Electrical — Ground-Up Builds."
- Pedestals → "Pedestal Installation — RV Parks, Mobile Homes, Job Sites."
- Mobile home connections → "Mobile Home Electrical Connections — Texas Code."

**Per-page required content blocks (ship list):**
| Block | Required word count | Status |
|-------|--------------------|--------|
| Intro paragraph | 60–100 | — |
| What this covers | 120–180 | — |
| Cost Q&amp;A | 80–120 | — |
| Timeline Q&amp;A | 60–100 | — |
| Our process | 150–200 | — |
| Code/permit paragraph | 80–120 | — |
| Suburb list (internal links) | 40–60 | — |
| FAQ section (5–7 Qs) | 400–600 | — |
| **Total per page** | **~1,000–1,400** | — |

This matches category leaders (FSG, Beekman) while outperforming Colwell/RMG/Wired.

### 5.5 Location pages (`/locations/[city]`) — NEW, 6 pages

One per suburb. Template:

```
Hero                → "Commercial Electrical Contractor in [City], TX"
Intro               → 80-word paragraph anchoring city + Solivance
Services available  → Grid of all 7 services linking to service pages
"Why [City]"        → 100-word section — local infrastructure notes, typical projects, local code/utility (CenterPoint Energy)
Zip codes served    → Display all ZIPs for that city
Suburb photo placeholder → Abstract illustrated city-card (see §7)
Recent projects in [City] → 2–4 anonymized local projects
FAQ                 → 4–5 city-specific Qs ("Do you do emergency service in [City]?")
CTA                 → Quote form
```

**Cities to ship (aligned with confirmed top-4 target areas):**
1. Houston (anchor page, most thorough)
2. Cypress (NW Harris County, US-290 corridor — 77429 / 77433 / 77095)
3. Katy (W Harris County + Fort Bend — 77449 / 77493 / 77494)
4. Memorial (West Houston — Memorial Villages, Hedwig Village, Piney Point, Hunters Creek, Bunker Hill — 77024 / 77079 / 77055)

**Secondary tier (mentioned in `allServiceAreas`, no dedicated page yet):**
Spring · Jersey Village · Tomball · Bellaire · West University · The Woodlands · Sugar Land · Missouri City — covered site-wide in the footer service-area grid, queued behind the top-4 for dedicated pages as volume justifies (avoid thin-content penalty until real case-study copy is available for each).

### 5.6 Dedicated FAQ page (`/faq`) — NEW

Aggregate site-wide FAQs into a single page. 25–35 questions organized into sections:
- **General** (licensing, insurance, emergency, payment)
- **Panel upgrades** (5)
- **Generators** (5)
- **Lighting** (4)
- **EV chargers** (5)
- **Warehouses** (4)
- **Pedestals / Mobile home** (3)
- **Service areas** (4)

`FAQPage` schema with `mainEntity` array covering every question. Search-friendly, AEO gold.

### 5.7 Blog — framework (keep existing, restructure)

Current `app/blog/posts.ts` is 25KB — significant content exists. Plan:

1. **Audit posts.ts** — delete or rewrite any posts that reference the owner.
2. **Add `dateModified`** to every post.
3. **Add `author: { @type: Organization, name: "Solivance Electric LLC" }`** to `BlogPosting` schema.
4. **Introduce post categories** — Panel / Generator / Lighting / EV / Code & Permits / How-Tos.
5. **Schedule 1 post/month** covering AEO queries identified in §2.2.

**Post ideas (each targets a specific AEO query):**
- "How much does a 200A commercial panel upgrade cost in Houston in 2026?"
- "How long does it take to install a commercial standby generator?"
- "LED vs HID parking lot lighting — full cost breakdown for Houston lots"
- "Is a Level 3 DC fast charger worth it for a small commercial lot?"
- "What does the 2023 NEC change for warehouse electrical in Texas?"
- "Harris County electrical permit process — step-by-step for commercial properties"

### 5.8 New marketing/trust sections to insert across pages

**Recent Projects block** (home + About + each location page):
```
┌─────────────────────────────────────────────────────┐
│ [pattern card]                                       │
│ Commercial · Sugar Land, TX                          │
│ 400A Service Upgrade · 3-Phase                       │
│ Office + Warehouse · Completed in 3 days             │
└─────────────────────────────────────────────────────┘
```
Anonymized so no client permission needed. Pattern card = abstract SVG (§7).

**Certification row** (home + About + service pages):
Horizontal strip of 5 items. If no real memberships yet, ship text-only version:
```
Texas Licensed Electrical Contractor · Fully Insured · Bonded ·
2023 NEC Compliant · 24/7 Emergency Response
```
Replace with real badge logos as memberships land.

**Stat band** (home + About):
Four big numbers in Bricolage Grotesque, scroll-counted:
```
  10           100+          50+           100%
Years       Projects     Panels       Inspection
           Completed   Upgraded     Pass Rate
```

---

## 6 · Bringing AEO/GEO/SEO together — on every page

A single shipped page must pass **all three layers** before it goes live. The checklist:

```
[SEO]
[ ] Target keyword in <title> and H1
[ ] Target keyword and 2 variants in H2s
[ ] Canonical URL set
[ ] Meta description 140–160 chars
[ ] Open Graph + Twitter cards
[ ] Alt text on every image
[ ] Internal links to 3+ related pages
[ ] sitemap.ts includes the page
[ ] Unique content (>900 words for service + location pages)
[ ] Keyword in first 100 words
[ ] Phone number tappable in first viewport

[AEO]
[ ] Every H2 is a question
[ ] Every H2 has a 40–60 word direct-answer paragraph immediately below
[ ] Specific numbers (costs, durations, amperages) in body
[ ] FAQPage schema present when 3+ Qs exist on page
[ ] HowTo schema present when steps/process listed
[ ] Last-updated date shown on page and in dateModified

[GEO]
[ ] author: Organization (never a person) in schema
[ ] Organization schema at layout level with sameAs links
[ ] LocalBusiness schema at layout level
[ ] Entities linked (NEC → official URL, CenterPoint → official URL)
[ ] Server-rendered (no client-only critical content)
[ ] robots.txt allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
[ ] Semantic HTML (article, section, proper heading order)
[ ] Clean URL, clean breadcrumbs, clean internal link anchors
```

---

## 7 · Imagery plan — designing for scarcity

Real photography is not yet available. Until it is, every image slot uses a **designed placeholder** — not `/placeholder.svg`. Four asset families, reusable across the site.

### 7.1 Hero illustration cards

Used for: home hero, service page heros, About hero, 404 page.

**Pattern:** Large navy background with an oversized, thin-line orange lucide-react icon (e.g., `Zap`, `PlugZap`, `Lightbulb`, `Warehouse`) positioned off-center, subtle radial gradient, grid overlay at 5% opacity. Feels editorial, not under-construction.

Component spec: `<HeroArtCard icon="zap" palette="navy" />` — single reusable component in `app/components/`.

### 7.2 Service illustration cards

Used for: 7 service cards on home + services index.

**Pattern:** 4:3 aspect ratio card with:
- Dark navy gradient background (`#0f2847` → `#1a3a6b`)
- Large thin-stroke lucide icon centered and muted (20% opacity)
- Service title in Bricolage Grotesque, service summary below in Geist
- Thin orange accent bar top-left

This replaces every instance of `/placeholder.svg` in service card contexts.

### 7.3 Project card pattern

Used for: Recent Projects anonymized grid.

**Pattern:** Cream paper background (`#f6f4f0`), thin orange top-border, bold Bricolage Grotesque project descriptor ("400A 3-phase upgrade"), small caps meta line ("Commercial · Sugar Land, TX · 3 days"), subtle textured SVG noise overlay at 3% opacity.

### 7.4 Certification badges (text-only until real logos)

Used for: trust strip row across home, About, services.

**Pattern:** Horizontal row of small navy-bordered cream pills, each containing:
- Thin lucide icon (Shield, CheckCircle, FileCheck, Clock, Lightning)
- Mono-case label ("Licensed TX Contractor", "24/7 Emergency", "2023 NEC Compliant")

When real cert logos land (BBB, IEC, Generac, etc.), swap pills for grayscale logos at 40% opacity → 100% on hover.

### 7.5 Location city cards

Used for: Locations index, location pages.

**Pattern:** Abstract map-inspired SVG — light topographic contour lines in `#1a3a6b` at 8% opacity on cream background, city name and ZIP range in Bricolage Grotesque overlaid. Uniform across all 6 cities; only the text varies.

### 7.6 Photo substitution roadmap (when real photos arrive)

When shoot happens, replace in this order of visual impact:
1. Home hero (single biggest visual)
2. About page "team at work" photo
3. Each of 7 service page heros (swap hero illustration cards for real photos)
4. Panel upgrade detail image (most-searched service)
5. Parking lot lighting at dusk (photogenic)
6. Generator install (photogenic)
7. Warehouse interior (photogenic)

**Shoot shot-list:**
- [ ] Crew portrait (full team, in gear, on-site)
- [ ] Close-up of an opened panel being worked on
- [ ] Generator pad install with conduit run
- [ ] Parking lot pole at golden hour
- [ ] EV charger in use or pedestal closeup
- [ ] Warehouse bay interior with high-bay lights on
- [ ] Truck with Solivance decal at a jobsite

### 7.7 Interim — if stock is acceptable

Three licensed commercial-trade photos from Unsplash+, Shutterstock, or Adobe Stock (budget $150–$400 total) can cover home hero + About + bottom CTA with high-quality imagery while the shoot is scheduled. Illustration cards still carry the 7 service slots and all project cards.

---

## 8 · Structured data (schema) master checklist

Applied across the site:

### 8.1 Layout-level (runs on every page)
- [x] `LocalBusiness` + `ElectricalContractor` — **keep**, remove `founder` field
- [x] `WebSite` — keep
- [ ] `Organization` — **add** separate block with `sameAs` links to GBP, BBB, Facebook, LinkedIn, YouTube (when available)
- [ ] `BreadcrumbList` — add to every non-home page

### 8.2 Page-specific
- [ ] `Service` schema on every `/services/[slug]` page — with `areaServed`, `provider`, `hasOfferCatalog`
- [ ] `HowTo` schema on service process sections and How-To blog posts
- [ ] `FAQPage` schema on home, About, every service page, dedicated `/faq` page
- [ ] `BlogPosting` + `Article` schema on every blog post (author = Organization)
- [ ] `Place`/`City` schema on every location page
- [ ] `OfferCatalog` extension — per-service `Offer` entries with price ranges (enables rich results for commercial intent)

### 8.3 Suggested price-range extension

Adding approximate `priceSpecification` to service offers unlocks "starting at" rich results in Google:
```json
{
  "@type": "Offer",
  "itemOffered": { "@type": "Service", "name": "Panel Upgrades" },
  "priceSpecification": {
    "@type": "PriceSpecification",
    "priceCurrency": "USD",
    "minPrice": 2500,
    "maxPrice": 18000
  },
  "areaServed": [{ "@type": "City", "name": "Houston" }, ...]
}
```

---

## 9 · Technical SEO checklist

### 9.1 Current (existing — verify / fix)
- [x] `sitemap.ts` exists — audit after new pages land
- [x] `robots.ts` exists — audit, explicitly allow AI crawlers
- [ ] OG image path — **currently points to `/placeholder.svg`. Fix to `/og-image.jpg` in `app/layout.tsx`**
- [ ] Favicon — current `app/icon.png` is 2.3MB. Replace with 32×32 optimized `.ico` + 192/512 PNG set
- [ ] Logo files — current SVGs are 15–17MB (raster-traced). Re-export clean SVG or use PNG at 2x
- [ ] `robots.ts` — verify it explicitly lists:
  - `User-agent: GPTBot` → `Allow: /`
  - `User-agent: ClaudeBot` → `Allow: /`
  - `User-agent: PerplexityBot` → `Allow: /`
  - `User-agent: Google-Extended` → `Allow: /`
  - `User-agent: Bingbot` → `Allow: /`

### 9.2 Add
- [ ] `sitemap.ts` must list every new page (services × 7, locations × 6, faq, all blog posts)
- [ ] Dynamic XML sitemap that auto-updates when blog posts are added
- [ ] `/humans.txt` (optional — GEO trust signal)
- [ ] Hreflang alternates once Spanish pages ship
- [ ] RSS feed for blog posts (discoverability + LLM training-data-adjacent signal)
- [ ] Proper 404 page (already exists — verify it's server-rendered)
- [ ] 301 redirects for any legacy anchor URLs

### 9.3 Performance
- [ ] Lighthouse 90+ on all core pages
- [ ] Optimize all raster logos (`main_logo.jpg` 514KB, `og-image.jpg` 587KB → target <150KB each)
- [ ] `next/image` already in use — verify `priority` only on first hero image per page
- [ ] Preload web fonts (already via `next/font`)
- [ ] Prefer CSS `content-visibility` on below-fold sections

### 9.4 Google Business Profile (GBP) parity
Every site fact must match GBP:
- [ ] Business name exactly: "Solivance Electric LLC"
- [ ] Phone: `(832) 965-9964`
- [ ] Address / service area ZIPs
- [ ] Hours: 6am–6pm, 24/7 emergency
- [ ] Category: Electrical contractor + Electrician + Commercial electrician
- [ ] `sameAs` link from `LocalBusiness` schema points to the GBP profile URL

---

## 10 · Execution roadmap

### Phase A — Scrub & refine (1–2 days)
- [ ] Delete owner references (see §0 checklist)
- [ ] Fix OG metadata (`/placeholder.svg` → `/og-image.jpg`)
- [ ] Add `--brand-*` CSS tokens alongside existing `--onestop-*` (no visual change)
- [ ] Rewrite Home "About" section (§5.1)
- [ ] Rewrite `/about` "Our Story" → "Our Standard" (§5.3)
- [ ] Build placeholder imagery components: HeroArtCard, ServiceArtCard, ProjectCard, CertPill (§7.1–7.4)
- [ ] Swap every `/placeholder.svg` usage for appropriate art component

### Phase B — New pages (3–5 days)
- [ ] Build `/services/[slug]` dynamic route (7 pages) with template from §5.4
- [ ] Build `/locations` index + 6 city pages from §5.5
- [ ] Build `/faq` page from §5.6
- [ ] Add stat band + Recent Projects sections to home (§5.8)
- [ ] Certification row inserted site-wide
- [ ] Update `sitemap.ts` to include all new pages
- [ ] Add Organization + BreadcrumbList schema

### Phase C — AEO/GEO content pass (2–3 days)
- [ ] Convert every page H2 to question-shape
- [ ] Add 40–60 word answer block under every H2
- [ ] Add FAQPage schema to home, About, all services, /faq
- [ ] Add HowTo schema to service-page process sections
- [ ] Add per-page canonical URLs
- [ ] Add per-page dateModified
- [ ] Add Organization author to all blog posts

### Phase D — Blog rewrite & expansion (ongoing)
- [ ] Audit existing `posts.ts` — scrub any owner references
- [ ] Add Organization author to every existing post
- [ ] Publish 6 new AEO-targeted posts (§5.7)
- [ ] Set monthly publishing cadence

### Phase E — Technical finalization (1 day)
- [ ] Robots.txt explicit allow-list for AI crawlers
- [ ] Favicon + logo asset optimization
- [ ] Lighthouse 90+ pass
- [ ] GBP parity audit
- [ ] Cross-browser smoke test (Chrome, Safari, Firefox, mobile Safari, mobile Chrome)
- [ ] Deploy preview → production cutover

### Phase F — After launch (30/60/90)
- **30 days:** Google Search Console verification, submit sitemap, first rankings snapshot.
- **60 days:** First AEO/GEO audit — search target keywords on Google AI Overview, Perplexity, ChatGPT; record which Solivance pages (if any) get cited; iterate.
- **90 days:** Reviews acquisition campaign (email past clients, QR codes on invoices). When 5+ reviews exist, swap certification-stack emphasis for review emphasis in the hero trust band.

---

## 11 · Success metrics

| Metric | Baseline (today) | Launch +90 days | Launch +180 days |
|--------|:----------------:|:---------------:|:----------------:|
| Total indexed pages | ~5 | 25+ | 35+ |
| Target keyword top-10 rankings | 0 | 5 | 12 |
| Google AI Overview citations | 0 | 1+ | 3+ |
| Perplexity/ChatGPT cited answers | 0 | 2+ | 5+ |
| Monthly organic sessions | ~0 | 300 | 1,500 |
| Google Business Profile reviews | 0 | 10 | 25 |
| Core Web Vitals (mobile) | TBD | 90+ | 95+ |

---

## 12 · Open data the owner still needs to provide

These values are currently placeholders in the codebase / plan. Fill in before launch:

| Field | Status | Needed for |
|-------|--------|-----------|
| Texas TECL license number | Missing | Hero trust band, footer, schema |
| Exact founding year | Implied 2016 (from `yearsInBusiness: 10`) | About page, "Since [year]" anchor |
| Insurance carrier name (optional) | Missing | Certification pill |
| BBB membership status | Unknown | Cert row decision |
| IEC / NFPA memberships | Unknown | Cert row decision |
| Generator dealer affiliations (Generac, Kohler, etc.) | Unknown | Service page: generator install |
| Number of projects completed | Unknown — using `[100+]` placeholder | Stat band |
| Number of panels upgraded | Unknown — using `[50+]` placeholder | Stat band |
| Google Business Profile URL | Unknown | `sameAs` in Organization schema |
| Social profile URLs (Facebook, LinkedIn, Instagram, YouTube) | Unknown | `sameAs` in Organization schema |
| 3–6 completed project summaries (anonymized ok) | Unknown | Recent Projects cards with real scope |
| Spanish content translation readiness | Not started | Spanish service pages (future phase) |
| Photo shoot date | Not scheduled | Replacing illustration cards with real imagery |

---

*This plan replaces `research/03-build-brief.md` as the current source of truth for execution. The competitive analysis (`competitive-analysis.html`) remains the client-facing deliverable; this doc is the internal build roadmap.*

---

## 13 · Changelog

### 2026-04-16 — Phase A ship (voice + config alignment)

**Config**
- `app/config.ts` — removed `ownerName` field. Reordered services to match owner priority: Panel Upgrades · Generator Installs · Parking Lot Lighting · EV Chargers · New Commercial Warehouses · RV Park Pedestals · Mobile Home Connections. Replaced `serviceAreas` with Houston / Cypress / Katy / Memorial. Rebuilt `allServiceAreas` to reflect west/north-west Houston focus (Spring, Jersey Village, Tomball, Bellaire, West U, The Woodlands, Sugar Land, Missouri City as secondary). Updated ZIP list to 77024/77079/77055/77429/77433/77449/77493/77494/77095. Rewrote all 9 site-wide FAQs with trade-voice copy (cost ranges, code references, CenterPoint coordination, NEC 2023 / 551 / 550). Retitled "Pedestals" → "RV Park Pedestals." Rewrote every service `summary` and `longDescription` with concrete amperages, durations, NEC references.
- Slogan updated: "Premium Electrical Work. Done Right." → "Commercial Electrical. Done Right the First Time."

**Layout / schema**
- `app/layout.tsx` — removed `founder` JSON-LD Person block. Updated `areaServed` cities to Houston/Cypress/Katy/Memorial (as `Place` for Memorial) plus secondary set. Updated metadata `keywords` to emphasize Cypress and Memorial. Fixed OG images to `/og-image.jpg` (was `/placeholder.svg`). Updated LocalBusiness schema `image` to `/og-image.jpg` and added `logo` property. Updated address to 77024 (Memorial) with geo coords near central Houston. Scrubbed "Premium Electrical Work. Done Right." schema slogan to new line.

**Home page**
- `app/HomePageClient.tsx` — Hero geo eyebrow now Houston · Cypress · Katy · Memorial. Hero sub-headline rewritten with specific amperages / trade vocabulary. Services section lead updated. About section: removed `siteConfig.ownerName` reference, full paragraph rewrite with trade voice (In-house crew / not subcontracted / Harris County permit / CenterPoint cut-over / NEC 2023 / labeled bonds). Value-card labels tightened ("Licensed & Insured" → "Licensed & Insured: Texas contractor, COI on request," etc.). Reviews empty-state copy rewritten.
- Hero form: added email field, added date picker (`preferredDate`), added time-window dropdown (`timeWindow`). Old `timeline` dropdown retired in favor of explicit date + window.

**About page**
- `app/about/AboutPageClient.tsx` — "Our Story" section replaced with "What we do" + eyebrow 01. Paragraphs rewritten — company subject, no `{siteConfig.ownerName}`. "How We Work" values tightened to concrete trade-voice copy (Fixed-fee quotes / NEC 2023 first / Lockout-tagout / Tenant-aware scheduling / Commercial + light-industrial / Clean the room). "Service Areas" retitled with eyebrow 03 and rewritten lede. Stats bar relabeled (2023 NEC Compliant / 24/7 Emergency Line / In-House Licensed Crew / 1st Walk Inspection Pass). Bottom CTA rewritten ("Walk a site with us").
- `app/about/page.tsx` — metadata rewritten with trade voice, new service-area refs, `/og-image.jpg`.

**Contact page**
- `app/contact/ContactPageClient.tsx` — H1 changed ("Walk a site. Get a number."). Deleted the "Owner" attribution line entirely; replaced the card with a "Talk to a licensed electrician" 24/7 line card. Form heading tightened. Bottom CTA rewritten.
- `app/contact/page.tsx` — metadata + FAQ array rewritten. Fixed-fee-focus copy. No owner / founder references. `/og-image.jpg`.

**Services page**
- `app/services/ServicesPageClient.tsx` — Hero H1 changed to "Seven services. One crew. One standard." and lede rewritten with new areas + trade terminology. Bottom CTA rewritten.
- `app/services/page.tsx` — metadata + FAQ array rewritten with concrete cost ranges and code references. `/og-image.jpg`.

**Forms**
- `app/components/EstimateForm.tsx` — replaced the "Preferred Date/Time Window" dropdown with two separate fields: an actual HTML5 date picker (`preferredDate`, min = today) and a Time Window dropdown (`timeWindow`). Urgency dropdown moved to its own row. Added `Clock` to lucide imports.
- `app/api/lead/route.ts` — `pickField` for `timeline` now also accepts `timeWindow` / `time_window` aliases. New `preferredDate` extracted and rendered in both text and HTML email output.

**Blog**
- `app/blog/posts.ts` — every occurrence of "Houston, Sugar Land, Richmond, and Katy" / comma variants replaced with "Houston, Cypress, Katy, and Memorial." Keyword arrays updated per post (Sugar Land → Cypress, Richmond → Memorial Houston).
- `app/blog/page.tsx` — CollectionPage schema name + hero subtitle updated.
- `app/blog/[slug]/page.tsx` — bottom CTA rewritten, new service areas.

**Footer / Header**
- `app/components/Footer.tsx` — brand blurb rewritten, no "Premium" slop, new service areas. "Pedestals" label → "RV Park Pedestals." Bottom bar attribution rewritten.
- `app/components/Header.tsx` — announcement bar updated to "Serving Houston, Cypress, Katy & Memorial."

**Competitive analysis HTML**
- `competitive-analysis.html` — cover "Founder: Jossue Molina" cell replaced with "Specialty: Commercial + Light-Industrial" and "Market" value updated to new top-4.

**Memory**
- Saved durable preference: `feedback_no_ai_slop.md` — ban list (premium / seamless / robust / etc.), prefer concrete trade vocabulary, company-as-subject-always.

### Still outstanding (not yet shipped)

- Dedicated `/services/[slug]` routes (7 pages)
- Dedicated `/locations/[city]` routes (4 pages: houston / cypress / katy / memorial)
- Dedicated `/faq` page
- Organization schema block with `sameAs` links (needs real GBP + social URLs from owner)
- `robots.ts` explicit allow-list for GPTBot / ClaudeBot / PerplexityBot / Google-Extended
- Placeholder imagery components (HeroArtCard / ServiceArtCard / ProjectCard / CertPill / LocationCard) — every service/about/hero still ships `/placeholder.svg` behind the copy
- Recent Projects anonymized grid
- Scroll-counted stat band on home
- Favicon + oversized logo SVG optimization
- Per-service `Service` schema + `FAQPage` schema per page
- `dateModified` on blog posts
- Blog post `author: Organization` across every post
