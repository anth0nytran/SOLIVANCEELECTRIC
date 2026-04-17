# Solivance Electric — Website Build Brief (Phase 4)

**Status:** Awaiting approval before Phase 5 implementation.
**Scope:** Refine the existing Next.js 16 codebase in place. Not a rebuild.

---

## TL;DR
Solivance's current build already out-designs 4 of 5 direct competitors on typography, palette, and motion. The gap is **proof**, not polish. This brief focuses Phase 5 on inserting the specific trust, photography, and conversion patterns the top 10% execute — without touching what already works.

---

## Design Direction

### Color system — refine tokens, keep values
| New token | Value | Role |
|-----------|-------|------|
| `--brand-ink` | `#0f2847` | Deep navy — headings, dark sections |
| `--brand-navy` | `#1a3a6b` | Mid navy — accent surfaces, eyebrows |
| `--brand-accent` | `#F26B1F` | Orange — CTAs, underlines, highlights |
| `--brand-paper` | `#f6f4f0` | Warm off-white — mid-page section surface |
| `--brand-line` | `#e2e8f0` | Hairline divider |

**Action:** retire the `--onestop-*` legacy naming. Collapse the bug where `--onestop-red` and `--onestop-gold` alias the same hex. Keep all user-visible colors identical.

### Typography — unchanged
- Display: **Bricolage Grotesque** 500–800
- Body: **Geist** 400–700
- Eyebrow / mono: **JetBrains Mono** 400–700

### Photography
Five hero shots before launch (crew portrait, panel close-up, generator install, parking-lot pole at dusk, EV charger). Until shoot, use 2–3 licensed commercial-trade stock images across the seven service cards — remove every `/placeholder.svg` from user-facing surfaces.

### Animation recommendations
- Keep all Framer Motion entrance transitions (already tasteful).
- Add scroll-triggered counter on new trust band: "Since 2015" / "[n] projects" / "Inspections passed first time" — numerals in Bricolage Grotesque.
- Keep marquee (`.proof-marquee`) keyframes for the certification logo strip (new use).

### What to AVOID (competitor failure modes)
- Don't stuff geo into the H1 (Beekman's mistake).
- Don't use the company name as H1 (RMG's mistake).
- Don't rely on a single stock hero (Wired's weakness).
- Don't over-round radii — keep the industrial squared-off aesthetic already shipped.
- Don't ship with any `/placeholder.svg` on a user-facing surface.

---

## Site Architecture

Preserve the existing structure — no route changes. Per-page purpose:

| Route | Primary purpose | Primary CTA |
|-------|----------------|-------------|
| `/` | Convert first-touch traffic — commercial buyers comparing 3+ quotes | Hero form + tap-to-call |
| `/services` | SEO landing anchor — unique copy per service, FAQ per service | Inline quote link + phone |
| `/services#[slug]` | Deep-link target for each of 7 services | Service-scoped quote form |
| `/about` | Brand + credibility — founder story, values, service areas | Phone + free quote |
| `/blog` | SEO long-tail + lead nurture | Inline quote CTA |
| `/contact` | Dedicated form + map + hours | Form + phone + email |

### Navigation (existing — hold)
Home · Services · About · Blog · Contact + phone button.

### Conversion surface area per page
- Every page: phone in header, phone in hero/above-fold, footer phone.
- Home + Contact: full form.
- Service pages: short-form CTA (name + phone + service preset) — reduces friction.
- About: dual CTA row (Our Story + tel link) — already shipped, hold.

---

## Content Framework

### Homepage headline — hold current + test
**Current (ship as-is):**
> "Commercial electrical, done right."

This already beats Beekman (SEO string), RMG (company name), and Wired (generic). No change.

**Future A/B candidates (for post-launch testing):**
1. "The commercial electrician Houston builders call twice."
2. "Code-correct electrical. First inspection, every time."
3. "Power your business. Done right the first time."

### Value prop structure — already strong, tighten supporting copy
- H1 (brand promise) →
- Subhead (scope + geo in one line) →
- Dual CTA (phone primary, "Our Services" secondary) →
- Trust chip row (Licensed · Insured · 24/7 · Commercial) →
- Floating form card.

### Section-by-section copy direction
1. **Hero** — keep current structure. Insert "Since 2015" above the navy headline, and append TECL license number to the trust chip row.
2. **Trust strip** (new or repurposed) — horizontal row of 4–5 certification logos (BBB, IEC, NFPA, Generac/Kohler dealer badge, Texas TECL emblem). Grayscale, 40% opacity, hover to full color.
3. **Services grid** — keep 7-card grid, replace placeholder images with real or stock photography per service.
4. **Signature stat band (new)** — "10 Years · [100+] Projects · [50+] Panels Upgraded · 100% Inspection-Pass Rate." Bricolage Grotesque numerals, scroll-counted.
5. **About / Why Us** — keep two-column pattern. Add founder quote pulled from Jossue Molina's own voice.
6. **Social proof (new block)** — until reviews accrue, show: (a) 4–6 anonymized "Recent Projects" cards ("200A panel upgrade · Sugar Land professional office · completed in 2 days"), (b) certification stack row.
7. **FAQ** — keep existing 7 questions. Consider adding: "How quickly do you respond to emergency commercial calls?" and "Do you provide Spanish-speaking technicians?"
8. **Bottom CTA + form** — keep the current pattern. No change.

### SEO keyword targets (priority order)
1. `commercial electrical contractor Houston TX` (highest competition, parent term)
2. `panel upgrade Houston TX` / `Sugar Land` / `Katy` / `Richmond`
3. `commercial EV charger installation [suburb]`
4. `parking lot lighting Houston commercial`
5. `pedestal installation Houston` (low competition — quick win)
6. `mobile home electrical connection [Houston / Sugar Land / Richmond]` (low competition — quick win)
7. `electricista comercial Houston TX` / Spanish variants (uncontested — biggest single opportunity)

---

## Conversion Playbook

### Primary conversion goal
Phone call to (832) 965-9964. Form submission is secondary (commercial buyers with flexible timelines).

### Lead capture strategy
- **Hero form:** 5 required fields (name, phone, address, service, timeline) + 1 optional (details). Current form is well-scoped — hold.
- **Mobile:** MobileCTA component sticky bottom bar — already shipped. Ensure tel link is primary action.
- **SMS consent:** already present — keep.
- **Honeypot + timestamp:** already present — keep.

### Social proof plan
Pre-launch (0 reviews):
1. Certification stack (BBB, IEC, NFPA, TECL, insurance carrier) — ship immediately.
2. Anonymized project cards — ship immediately, update as real projects close.
3. Founder headshot + quote — schedule shoot.

Post-launch (5+ reviews):
1. Swap certification emphasis for review emphasis in hero trust band.
2. Add Google review widget + aggregate star rating.
3. Replace anonymized cards with named client logos (with permission).

### Trust signal checklist (ship before launch)
- [ ] Texas TECL license number visible on every page (footer minimum, hero ideally)
- [ ] "Since 2015" anchor in hero trust row
- [ ] Certification stack row below hero
- [ ] 4–6 anonymized project cards
- [ ] Founder headshot on About page
- [ ] Phone number repeated 3+ times per page
- [ ] 24/7 emergency messaging in hero + footer
- [ ] OG image actually points to the 587KB `og-image.jpg`, not `/placeholder.svg`
- [ ] Favicon under 50KB (current `icon.png` is 2.3MB)

---

## Phase 5 Scope — What Will Change

**Will change (surface refinement):**
1. Rename CSS tokens (`--onestop-*` → `--brand-*`) — decouple red/gold aliasing bug.
2. Insert trust band below hero (Since 2015, TECL #, certification stack).
3. Replace `/placeholder.svg` in hero + service cards with stock/licensed imagery OR a tasteful abstract gradient card until real photos land.
4. Add anonymized "Recent Projects" section (home page, between About and Reviews).
5. Add scroll-counted stat band.
6. Fix OG image metadata to point to `og-image.jpg`.
7. Optimize `icon.png` / ship proper favicon.ico.
8. Minor copy tightening on About (founder voice).
9. Update seed Spanish content placeholder for future expansion.

**Will NOT change:**
- Next.js / React / Tailwind / Framer Motion stack.
- Route structure.
- Form logic, API endpoint, email notifications.
- Current H1s, eyebrows, or numbering system.
- Typography stack.
- Squared-off radius aesthetic.
- Existing motion choreography.

---

## HARD STOP — APPROVAL CHECKPOINT

Ready to build?

**If yes:** reply "approved" / "ship it" / "go" and Phase 5 begins — I'll refactor the CSS tokens, insert the new trust band, swap placeholders, fix OG metadata, and wire the stat counter into `HomePageClient.tsx`.

**If changes needed:** tell me which decisions to revisit (palette, copy, scope, section order). Common edits at this stage:
- Surface the 5 things you most want changed.
- Tell me to hold a specific section as-is.
- Flag anything that contradicts house style I haven't been told yet.
- Provide the actual Texas TECL license number, founding year, and any cert affiliations (so I can ship real values instead of placeholders).

**Open questions to clarify before Phase 5 (if known):**
1. Exact **Texas TECL license number** for the hero trust band?
2. Confirmed **founding year** — config says `yearsInBusiness: 10` (so 2015 or 2016)?
3. Any **current memberships** (BBB, IEC, NFPA, TDLR)? If none formally, say "licensed Texas electrical contractor" and skip the cert logos.
4. **Generator dealer status** — authorized for Generac, Kohler, Briggs, or brand-agnostic?
5. Existing **photo assets** we can use — any real project photos buried in Dropbox/phone, or truly starting from zero?
