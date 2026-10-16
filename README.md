# Strategic Minds AI · Universal Auto Builder + Digital Dominance

> **GitHub-native template repository, development branch.** Combines real visual assets from two authorized codebases with guarded, local-only preview tooling. This is **not** an autonomous, production-ready mass-deployment engine.

## What this template does right now

The master template is a reusable **source kit** that can inspect its layouts, validate a structured SitePack, render clearly labeled demo sites and generate local quality receipts. It is an on-ramp to Digital Dominance, not a replacement for the existing Website Launch Engine, Base44 project or X1 runtime.

| Working code / extracted source | What it actually does | Proof boundary |
|---|---|---|
| Auto Builder standalone HTML renderer | Turns site content objects into static HTML | Extracted source; visual parity not certified |
| **20** Auto Builder visual mini-layouts | Displays structural preview variety | Mini previews are not full production website templates |
| **20** Digital Dominance layout recipes | Provides catalog entries, section configurations and design direction | Recipe descriptions, not fully coded sites |
| Static SitePack validation | Checks provenance, business schema, locations, noindex and approval rules | Cannot independently verify factual business claims |
| Local synthetic HTML generation | Writes one noindex HTML preview per specified eligible location | Local files, **not live websites** |
| Local gallery | Writes a browsable gallery of the 20 mini-layouts and 20 DD recipe descriptions | No public deployment |
| SHA-256 preview receipt | Stores file hashes, not-deployed status and UNKNOWN external QA | Not proof of HTTP availability |
| Draft X1 job specification | Produces deterministic idempotency metadata for a PREVIEW job | Does not submit jobs or create workers |
| Regression tests | Checks preview restrictions, duplicates, false testimonials and source integration | CI status must be checked before PASS |

**Important repository state (2026-10-16):** GitHub currently reports the repository as **public** and is_template=true. Its initial creation receipt said private, so repo visibility must be deliberately reconciled before migrating proprietary assets. Only development branch contains the full source kit; the default main branch has not been merged with these changes. GitHub's Use this template button defaults to main until the operator approves the PR merge.

## PHASE / STEP / TODO

**PHASE 2: Development template. STEP: audit, document, implement safe preview functions.** TODO: verify CI -> test gallery/browser -> reconcile public visibility -> connect existing X1 queue and Vercel *preview* -> independent QA -> obtain production release approval.

## Quick start (Node.js 20+)

Clone the development branch, rather than the minimal main branch, until the change is reviewed:

~~~bash
git clone --branch feature/universal-factory-convergence-20261015 https://github.com/Strategic-Minds-AI/universal-auto-builder-digital-dominance-template.git
cd universal-auto-builder-digital-dominance-template
npm test
npm run validate:demo
npm run preview:demo
npm run gallery
node src/cli.mjs layouts
node src/cli.mjs job examples/fictional-epoxy.sitepack.json
~~~

Outputs:

- Local simulated site: **dist/preview/exampleville-zz-us/index.html**
- Gallery of extracted visuals: **dist/gallery/index.html**
- Evidence: **dist/preview/receipt.json** with SHA-256 hashes, deployed:false, UNKNOWN external tests
- Website indexing blocked by local robots.txt and meta noindex. These files are not published.

## Complete capability catalog

The [capability matrix](docs/CAPABILITY_MATRIX.md) separates **CODE PRESENT**, **SOURCE EXTRACTED**, **PARTIAL**, **NOT INSTALLED**, **PROTECTED**, and current verification status. This distinction is mandatory: an item in a source repository or README does not make the provider integration operational.

### Planned Digital Dominance modules

1. Business discovery, 3-competitor benchmark, market value and intent scoring.
2. Premium approved brand, logo, visual, and image-asset packs.
3. Industry-specific site generation with useful products, services and local content.
4. Real lead forms, photo uploads, estimate engines, phone CTAs and CRM routing.
5. Location scoring, quantity selection, preview provisioning, approval wizard and proof dashboard.
6. SEO / AEO / GEO evidence, structured data, canonical URLs, accessibility and helpful-content QA.
7. Analytics, calls, leads, appointments, sales and attributed revenue.
8. Tenant-isolated client/admin dashboards, onboarding, roles, billing and support.
9. AI Gateway generation, draft-only social/media and X1 specialist-agent orchestration.
10. Existing Supabase durable queue / lease / worker and single heartbeat, with validated Vercel previews.
11. Independent Playwright/mobile/browser QA, security validation, rollback and receipts.
12. Explicit approval for protected actions including production, customer communications, domains and spend.

**These 12 modules are an implementation roadmap, not 12 installed integrations.** They are documented with truth labels in [capabilities](docs/CAPABILITY_MATRIX.md) and [adapter contracts](docs/BRIDGE_CONTRACT.md).

## 330 concrete examples of what it could be adapted to build

Each example below is a potential project after completing the necessary modules, not a deployed asset. The complete list of all 330 examples is in **[EXAMPLE_CATALOG.md](docs/EXAMPLE_CATALOG.md)**.

### Industry examples

| Construction & trades | Legal & professional | Commerce & education |
|---|---|---|
| Epoxy floor instant-estimate funnel | Car-accident lawyer intake | Concrete equipment and tooling shop |
| Polished-concrete training portal | Truck-accident case intake | Luxury skincare and perfume storefront |
| Commercial floor coating qualification | Probate attorney appointment portal | Polished Concrete University class registration |
| Roofing storm-inspection booking | Immigration lawyer consultation | Distributor wholesale product catalog |
| HVAC replacement decision wizard | CPA advisory discovery page | Subscription course/learning membership |
| Plumbing emergency dispatch inquiry | Financial advisor educational funnel | AI consulting and SaaS product landing |
| Pool resurfacing cost planner | Employment law lead form | Realtor neighborhood resource hub |
| General contractor bid portal | Med-spa appointment qualification | Nonprofit volunteer and donation information |

### Funnel, SaaS and system examples

| Acquisition | Operations | Technical growth |
|---|---|---|
| Multi-step estimate questionnaire | Tenant-scoped CRM and lead inbox | Search Console attribution dashboard |
| Service-area verified landing pages | Client approval and release dashboard | AEO FAQ and factual schema library |
| Photo-upload estimate intake | Workshop booking and attendee portal | Local content-quality quarantine workflow |
| Mobile click-to-call site | Equipment rental inventory portal | Multi-location directory with real NAP |
| Industry-specific offer experiments | X1 draft-job orchestration console | Conversion A/B experiment plan |
| Sales call transcription handoff | Repeatable tenant onboarding workbook | ROI / time-to-sale report |
| Client lead magnet download | Consent and preference management | Accessibility and visual-parity test queue |
| Appointment funnel proposal | Client portal with authenticated roles | Site uptime/canonical/noindex checks |

### Example projects from a one-sentence brief

1. Build a differentiated, noindex 10-location epoxy estimator **preview** for approved areas.
2. Prepare a nationwide car-accident lawyer funnel *concept* with jurisdiction-specific disclaimers and independently reviewed intake.
3. Generate alternative visual mockups for an equipment distributor selling grinders and diamond tooling.
4. Draft a training catalog and class-registration workflow for hands-on concrete training.
5. Create a white-label client portal blueprint with site approvals, support tickets and lead inbox.
6. Design a 70-store location-content approval and lead-routing architecture without fake local offices.
7. Model an opt-in automated follow-up and appointment workflow without actually sending messages.
8. Produce 20 synthetic design thumbnails from existing visual source assets; no deployment.
9. Generate a client-specific SitePack with a real source SHA, brand facts and quarantined local content.
10. Build an attribution measurement specification from impression to lead to revenue.

Find the fully worked prompts and gaps in **[STARTER_RECIPES.md](docs/STARTER_RECIPES.md)**.

## Architecture and handoff

~~~text
Business request / evidence
  -> discovery + design approval (planned research integration)
  -> versioned SitePack (schema, provenance, approved design)
  -> static validation [PRESENT]
  -> local noindex HTML / layout gallery [PRESENT]
  -> SHA-256 static receipt [PRESENT]
  -> X1/Supabase durable queue + Vercel preview adapter [NOT INSTALLED]
  -> independently tested real URLs / tenant / conversion / SEO [NOT INSTALLED]
  -> separate protected release approval [REQUIRED]
~~~

### Important limits and conditions

- The existing X1 runtime is authoritative. No second cron, queue or agent swarm is installed.
- Local previews intentionally have no real call/mail links, CRM submission, payments or outbound messaging.
- Testimonials without verified evidence are blocked by the preview validator.
- The template does not clone competitor copyrighted pages or falsely claim a local business presence.
- Schema/metadata checks are not a substitute for factual verification or complete security review.
- No claims of Google page-one rankings, automatic indexing, profitable campaigns or 1,000 live deployments.
- Donor visual performance ratings are not verified; the runtime catalog intentionally removes them.
- Approved Website Launch Engine marketing visuals are **LOCKED** and were not replaced with this starter.
- Public GitHub visibility and native template settings are not identical to production approval.

## Important source and verification documents

- [Source provenance and SHA](docs/SOURCE_MAP.md)
- [Complete capabilities/status matrix](docs/CAPABILITY_MATRIX.md)
- [All 330 adaptation examples](docs/EXAMPLE_CATALOG.md)
- [Worked project briefs](docs/STARTER_RECIPES.md)
- [Existing X1 bridge and future adapters](docs/BRIDGE_CONTRACT.md)
- [Release gates and testing](docs/RELEASE_GATES.md)
- [Native GitHub template settings](docs/TEMPLATE_REPO_SETUP.md)

**Source truth:** Auto Builder: Strategic-Minds-AI/x1-auto-buiilder at 2a2059e; Digital Dominance: XTREME-SYSTEMS/digital-dominance at b65d4cb. Their original branches have not been modified by this template task.

**Release status: DEVELOPMENT ONLY.** No production merge, deployment, domains, secrets, customer communication or paid actions have been authorized or executed.


---

## New: Universal Factory Academy and Individual Site Replicator

The educational production-web *application* has been implemented as a new static Vercel build. It provides **20 actual standalone full-page template demonstration websites**, a live visual studio, per-design HTML/JSON exports, a searchable catalog, and five generator lessons.

**Launch locally:** \`npm run build\` then serve \`dist/academy\` over HTTP. **Vercel** reads \`vercel.json\` and builds the same directory.

- Gallery: \`/\`
- Five educational generator lessons: \`/learn/\`
- Customize/export an individual chosen site: \`/studio/?template=split-left\`
- Full-page actual example: \`/sites/split-left/\`

The 20 new complete demo websites are *generated from* the 20 authorized layout IDs; they use ten responsive style families. They are distinct from the original smaller donor mini-layout code and from the 20 Digital Dominance descriptive recipes. They do not constitute 20 customer-ready, connected websites.

**Step-by-step examples, boundaries, and copying instructions:** [Academy Playbook](docs/ACADEMY_PLAYBOOK.md).

**Important:** Academy educational hosting and independently exported HTML do not wire customer forms, AI generation, CRM, payments, authentication, or batch provisioning. Generated sites are synthetic and noindex until independently validated. The Studio JSON export is a configuration snapshot, not a validated canonical SitePack.
