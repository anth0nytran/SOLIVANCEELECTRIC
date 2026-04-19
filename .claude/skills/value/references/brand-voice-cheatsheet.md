# Solivance Brand Voice Cheatsheet

Single-page reference. For the full skill spec, see `/value-skill.md` in project root.

---

## Voice in one line

Write like the foreman wrote it on the drive back from the job. Not like an agency wrote it
in a Notion doc.

---

## Sentence patterns that ship

These are real lines from the current site. Study the rhythm before writing new copy.

- "Most 200A upgrades are on and re-energized inside two business days."
- "When you call, a licensed electrician picks up — not a call center."
- "Every splice is installed to the 2023 NEC when it is made — not retro-fixed after the blue tag."
- "The mechanical room is swept before we leave."
- "You do not chase the permit office — we do."
- "Done right the first time is not a marketing line. It is the reason we do not have a callback schedule."
- "The panel cover goes back on straight. The grounding bonds are visible and labeled."
- "Commercial electrical. Done right the first time."
- "Inspections pass on the first walk because the work was correct when it was buried."

---

## Banned-words list (hard stop)

Do not ship a draft containing any of these. Rewrite.

| Banned | Replacement pattern |
|--------|--------------------|
| premium | concrete spec ("200A", "3-phase switchgear") |
| seamless | remove, or describe the actual sequence ("permit pulled, cut-over scheduled, inspection booked") |
| robust | amperage / code reference |
| elevate | cut the sentence |
| cutting-edge | specific gear model or code year ("2023 NEC") |
| innovative | cut; describe the technique |
| unleash / unlock | cut |
| streamline | "handled in one visit" / "one foreman, start to finish" |
| solutions (noun) | the specific service ("panel upgrade", "EV charger build") |
| partner with | "works with" or just drop |
| reach out | "call" or "request a quote" |
| journey | cut entirely |
| empower | cut |
| leverage | "uses" |
| best-in-class / world-class | cut; cite a concrete standard ("2023 NEC", "OSHA 1910.147") |
| dive deep | cut |

---

## Subject discipline

Subject is the company, or a concrete artifact. **Never a person.**

| Don't write | Write |
|-------------|-------|
| Our team is passionate about… | Solivance Electric pulls the permit, walks the site, hands back a number. |
| We believe in quality | The panel cover goes back on straight. Grounding bonds labeled. No callbacks. |
| Jossue and his team | Solivance Electric |
| Partner with our experts | Call (832) 965-9964 |

---

## Trade vocab to weave in

Use these naturally. Do not define them unless the audience is clearly a homeowner.

feeder · bus · switchgear · ATS commissioning · CenterPoint cut-over · photometric spec ·
2023 NEC · blue tag · lockout/tagout · OSHA 1910.147 · NEC 551 · conduit stub · bonding
jumper · service entrance · meter base · main disconnect · load calc · utility coordination ·
Harris County permit · Fort Bend permit · Montgomery County permit · AHJ · COI

---

## City tiers (do not invent)

**Daily (4):** Houston, Cypress, Katy, Memorial
**Regular cycle (10):** Sugar Land, Stafford, Missouri City, Magnolia, Conroe, Spring,
The Woodlands, Tomball, Jersey Village, Bellaire
**Fallback:** "Surrounding Texas on a call"

Every city mentioned in copy must exist in `app/config.ts` `allServiceAreas`. If not, update
config first — or the schema markup and content will drift apart.

---

## Numbers that matter

Pull from `app/config.ts` + `app/services/serviceContent.ts`. Do not guess.

- Phone: `(832) 965-9964`
- Email: `service@solivanceelectric.com`
- Years: `10`
- Hours: `6am–6pm · 24hr Emergency`
- Response: `24 hours`

Service prices (cross-check `serviceContent.ts`):
- 200A commercial upgrade: `$2,500–$8,500`
- 400A / 3-phase upgrade: `$6,000–$18,000`
- Standby generator install: `2–5 working days`

---

## Opener patterns (use one, do not invent a new category)

- **Failure-mode opener:** "Lights dim every time the compressor kicks. That is a bus warming
  up past safe capacity. A panel upgrade is the fix."
- **Specific-job opener:** "Two-story Cypress warehouse, 400A service, new DCFC stall on the
  east parking pad. Timeline: 3 working days."
- **Code-check opener:** "The 2023 NEC tightened the rules on grounding bonds for commercial
  panel swaps. Here is what that actually changes on site."
- **Process opener:** "Permit pulled Monday. CenterPoint cut-over Tuesday morning. Inspection
  booked Wednesday afternoon. That is the typical 200A calendar."

Never open with: "In today's commercial landscape…" / "Are you tired of…" / "Have you ever
wondered…" / "As a business owner, you know…"

---

## SERP / SEO quick rules

- Title: 50–60 chars, keyword + city + brand
- Description: 150–158 chars
- H1 = primary keyword, matches URL slug
- First 100 words contain primary keyword
- Internal links: ≥2 service pages + 1 location page per article
- FAQ schema on every page with a FAQ block
- No banned words — no exceptions

---

## One-sentence voice test

Before delivery, ask: **Would this copy still make sense on a competitor's site?**

If yes, it is too generic. Add a Solivance-specific detail — a city, a permit office, a code
year, a piece of gear, a timeline. Ship.
