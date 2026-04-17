# Solivance Electric — Brand Snapshot (Phase 1)

## Brand Snapshot
- **Company:** Solivance Electric LLC
- **Source:** Local codebase @ `C:\Users\antho\Desktop\solivance` (pre-launch Next.js 16 app — no live site yet)
- **Primary Color:** `#0f2847` (navy deep — `--onestop-navy-deep`, also `--onestop-ink`)
- **Secondary Color:** `#1a3a6b` (navy — `--onestop-navy`)
- **Accent Color:** `#F26B1F` (orange — currently aliased to both `--onestop-red` and `--onestop-gold`)
- **Neutral / Surface:** `#ffffff` (cream/background), `#e2e8f0` (hairline), slate 500–950 for text & dark sections
- **Fonts:**
  - Display: **Bricolage Grotesque** (500–800) via `next/font`
  - Body: **Geist** (400–700)
  - Mono / eyebrow labels: **JetBrains Mono** (400–700)
- **Tone:** Industrial, direct, confident, no-fluff. Short declarative sentences. "Done right." / "No callbacks." / "Licensed, insured, on call 24/7."
- **Core Message:** Premium, code-correct commercial electrical work across Greater Houston — licensed, insured, 24/7 emergency.
- **Slogan:** "Premium Electrical Work. Done Right."

## Business Fundamentals
| Field | Value |
|-------|-------|
| Owner / Founder | Jossue Molina |
| Phone | (832) 965-9964 |
| Email | service@solivanceelectric.com |
| Domain | solivanceelectric.com (not live) |
| Years in business | 10 |
| Hours | 6am–6pm · 24hr emergency |
| Rating / reviews | 5.0 / 0 reviews (pre-launch — no testimonials yet) |
| Languages | English, Spanish |
| Payment | Cash, Credit Card, Check, Zelle |

## Services (seven core)
1. **Panel Upgrades** — 100A / 200A / 400A service upgrades, code compliance, permits (1–2 days)
2. **Generator Installs** — Standby / whole-facility, ATS, load calcs (2–5 days)
3. **Parking Lot Lighting** — LED pole/shoebox, photocell, trenching (3–7 days)
4. **EV Chargers** — Level 2 + DCFC, load management, submetering (1 day single)
5. **New Commercial Warehouses** — Ground-up: service entrance, switchgear, high-bay LED, docks
6. **Pedestals** — RV, mobile home park, temporary service (1–2 days)
7. **Mobile Home Connections** — Service disconnect, feeder, bonding, inspection (1 day)

**Positioning:** Commercial + industrial first, high-end residential second.

## Service Areas
**Primary:** Houston, Sugar Land, Richmond, Katy, Pearland
**Secondary:** Missouri City, Stafford, Rosenberg, Fulshear, Cinco Ranch, Greatwood, Pecan Grove
**Primary ZIP:** 77048 (also 77407, 77478, 77493, 77471)

## Site Architecture (Next.js 16 App Router)
```
app/
├── page.tsx              → Home (HomePageClient.tsx)
├── about/                → About page (AboutPageClient.tsx)
├── services/             → Services index + deep-linked anchors
├── blog/                 → Blog index + [slug] detail (posts.ts)
├── contact/              → Contact + form
├── api/                  → Lead submission endpoint (Resend)
├── layout.tsx            → Fonts, JSON-LD (LocalBusiness + ElectricalContractor), GA/GSC
├── sitemap.ts / robots.ts
└── components/           → Header, Footer, MobileCTA, EstimateForm, ProjectCard, etc.
```

## Current Design System
- **Framework:** Next.js 16.1.6 + React 19.2 + Tailwind v4 + Framer Motion 12
- **Aesthetic class:** `.onestop-site` — squared-off, industrial radii (0.25–0.5rem), thick dividers, eyebrow labels with gold hairline, mono typography for numbers/labels
- **Pattern language:** Hairline numbering (`01 — Services`, `02 — About`), gold accent underline on H1 key words, `::before` eyebrow rules, gradient dark hero with white form card floating right, proof marquee + review ticker keyframes
- **Motion:** Framer Motion entrance fades + y-translates, slow scale on image hover, marquee animations (28s/40s linear)

## Key Messaging Formulas in Use
- **Hero H1:** "Commercial electrical, done right." (navy bg, gold underline on key word)
- **About H2:** "Premium electrical work. Done right the first time."
- **Services H2:** "What we do best."
- **FAQ H2:** "Questions, answered."
- **Eyebrow pattern:** `01 — Services`, `02 — About`, `03 — FAQ` (monospace, caps, 0.24em tracking)
- **Trust chips:** Licensed · Insured · 24/7 Emergency · Commercial & Residential
- **Promise lines:** "Response within 24 hours. Faster for emergencies." / "Leave your property cleaner than we found it."

## Assets Inventory
| File | Notes |
|------|-------|
| `public/logo/logo_horzontial.svg` / `.PNG` | Full-size horizontal logo (SVG is 16MB — raster-traced, should be re-optimized) |
| `public/logo/logo_vertical.svg` / `.PNG` | Vertical lockup (same caveat) |
| `public/logo-placeholder.svg` | Lightweight light-bg SVG — navy/orange lightning bolt |
| `public/logo-placeholder-dark.svg` | Lightweight dark-bg variant |
| `public/main_logo.jpg` | 514KB legacy raster |
| `public/og-image.jpg` | Currently 587KB — OG meta still points to `/placeholder.svg` (needs fix) |
| `public/placeholder.svg` | Generic grey box used throughout hero/service/about — no real photography yet |
| `app/icon.png` | 2.3MB favicon source (oversized) |

## Content Gaps Flagged for Later Phases
- **No real photography** — every hero/service/about image is `/placeholder.svg`
- **Zero testimonials** — `testimonials` array is empty; reviews section has an empty-state block
- **OG image misconfigured** — metadata points at placeholder.svg not og-image.jpg
- **Color token naming is inconsistent** — `--onestop-red` and `--onestop-gold` both map to the same `#F26B1F` (legacy from the "onestop" scaffold)
- **Logo files are massively oversized** — 15–17MB SVGs from raster tracing
- **Favicon** — `icon.png` is 2.3MB; no proper favicon.ico shipped
- **Brand name residue:** "onestop" CSS class prefix and variable names persist across the theme (functional, but a refactor opportunity)

## Tone Examples (Verbatim from Codebase)
> "Premium electrical work. Done right the first time."

> "When the grid drops, your business should not."

> "Dark parking lots are a liability."

> "Mobile home connections look simple and fail inspection anyway. … no callbacks."

> "We show up, do the work to code, and leave your property cleaner than we found it."

**Voice markers:** Second-person ("your business"), blunt metaphors, trades vernacular, action verbs, short sentences. Skews male/commercial B2B. Confident without being boastful.
