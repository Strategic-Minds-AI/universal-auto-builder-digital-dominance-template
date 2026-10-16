# Capability matrix | Universal Auto Builder + Digital Dominance

**Evidence scope:** development branch. Describes source and code presence, not production readiness. A positive test receipt is required before labeling runnable behavior PASS.

Definitions: **SOURCE EXTRACTED** = working donor source copied but not release-validated here; **CODE PRESENT** = new local implementation committed, test result separate; **PARTIAL** = limited static guardrails only; **NOT INSTALLED** = no working implementation; **PROTECTED** = requires operator approval; **VERIFIED CONFIGURATION** = read back from GitHub.

Total cataloged capabilities: 62.

Repository visibility is currently reported as **public** by GitHub; original private-repository creation receipt did not match subsequent readback. Do not migrate further proprietary modules or secrets until scope and visibility are reconciled.

## SOURCE / VISUAL

| Capability | Status | Where / dependency | Honest interpretation |
|---|---|---|---|
| Actual Auto Builder HTML renderer | SOURCE EXTRACTED | src/donors/x1/siteRenderer.js | Renders a standalone HTML page from a project content object; production quality not certified |
| 20 Auto Builder structurally distinct mini-layouts | SOURCE EXTRACTED | src/donors/x1/websiteLayouts.js | These are small previews, not 20 production sites |
| 20 Digital Dominance layout recipes | SOURCE EXTRACTED | src/donors/digital-dominance/templateLayouts.js | Recipe metadata, not full working page implementation |
| Layout catalog stripped of unsupported scores | CODE PRESENT | src/catalog.mjs | Omits donor ratings and claimed conversion data |
| Premium approved marketing visual replication | NOT INSTALLED | Project reference / screenshots | Locked reference; 99% parity untested |
| Real client brand/logo pack installer | NOT INSTALLED | Proposed pack adapter | Versioning and licensed media required |
| True full-page site per layout recipe | NOT INSTALLED | Future renderer extension | Distinctness and visual QA required |
| Responsive browser proof | NOT VERIFIED | Playwright/browser QA | Mobile and desktop screenshots needed |

## PACKS / PREVIEWS

| Capability | Status | Where / dependency | Honest interpretation |
|---|---|---|---|
| Versioned SitePack JSON schema | CODE PRESENT | schemas/sitepack.schema.json | Schema aligned to existing SitePack skill reference |
| Static SitePack validator | CODE PRESENT | src/validate.mjs | Checks shape, provenance, locality declarations and preview flags, not claim truth |
| Synthetic epoxy SitePack demo | CODE PRESENT | examples/fictional-epoxy.sitepack.json | Fictional location and contact; never publish |
| Local HTML preview generator | CODE PRESENT | src/preview.mjs | Noindex HTML emitted to disk only |
| Full local gallery generator | CODE PRESENT | src/preview.mjs | Renders 20 visual mini-layouts and lists 20 DD recipes |
| Layout inventory CLI | CODE PRESENT | src/cli.mjs | Exports layout/recipe metadata as JSON |
| Noindex and robots quarantine | CODE PRESENT | src/preview.mjs | Preview output disallows crawl; host checks still required |
| SHA-256 artifact receipts | CODE PRESENT | src/preview.mjs | Hashes static HTML; no real deployment proof |
| Source commit tracking | CODE PRESENT | src/validate.mjs | Requires reference; does not independently authenticate commits |
| Site quantity generation | CODE PRESENT | src/preview.mjs | One local HTML file per supplied validated location |
| Copy-ready CLI commands | CODE PRESENT | package.json | npm test, gallery, preview, validate, layouts |
| CLI/validator integration tests | CODE PRESENT | tests/factory.test.mjs | PASS only with independent execution receipt |

## GOVERNANCE / X1

| Capability | Status | Where / dependency | Honest interpretation |
|---|---|---|---|
| Deterministic draft job metadata | CODE PRESENT | src/job-contract.mjs | Generates packet only; no queue submission |
| Existing X1 queue adapter | ADAPTER NOT INSTALLED | docs/BRIDGE_CONTRACT.md | Resolve authoritative Supabase and worker |
| One scheduler/heartbeat reuse | POLICY ONLY | AGENTS.md | No scheduler provisioned |
| Idempotent persistent execution | ADAPTER NOT INSTALLED | Existing X1 runtime | Runtime/dedupe and lease proof required |
| Approval-first gated release | PARTIAL | src/validate.mjs + AGENTS.md | No release endpoint exists |
| Rollback receipt model | PARTIAL | docs/RELEASE_GATES.md | Provider specific reversibility untested |
| Independent validator job | ADAPTER NOT INSTALLED | X1/Fault Line/Playwright | Builder cannot self-certify release |
| GitHub template flag | VERIFIED CONFIGURATION | GitHub repository API is_template=true | May still need feature branch merge to make new-template clones complete |
| Default-branch merge | PROTECTED | GitHub owner approval | Not done |
| Production publishing | PROTECTED | Vercel/provider approval | Not done |

## RESEARCH / SEO

| Capability | Status | Where / dependency | Honest interpretation |
|---|---|---|---|
| 3-current-benchmark competitive research | NOT INSTALLED | Future research adapter | Must cite live evidence |
| Verified market scoring | NOT INSTALLED | DD research workflows | Demand, economics, competition and sources required |
| Industry/product taxonomy | PARTIAL | Donor recipe metadata | No real offer catalogs installed |
| Original local differentiator validation | PARTIAL | src/validate.mjs | Length/evidence presence only, requires human fact review |
| Structured data generation | NOT INSTALLED | Future SEO adapter | Factual data only |
| Canonical/sitemap production workflow | NOT INSTALLED | Future SEO adapter | Must validate with real routes |
| Search Console indexing workflow | NOT INSTALLED | Google authorization | No indexing from preview |
| AEO/GEO answer design | NOT INSTALLED | Future content pack | No guaranteed AI-citation visibility |
| Content-quality and doorway checks | PARTIAL | Validation policy | Manual and independent content review required |
| SEO performance measurement | NOT INSTALLED | GSC/Analytics connector | No live data bound |

## LEADS / PRODUCT

| Capability | Status | Where / dependency | Honest interpretation |
|---|---|---|---|
| Real working contact form | NOT INSTALLED | Consent + API + storage | Preview CTA is intentionally non-operational |
| Phone-call conversion tracking | NOT INSTALLED | Approved phone provider | No live calls |
| Instant estimate math | NOT INSTALLED | Client/product rules | Calculations and pricing verification required |
| File/photo upload form | NOT INSTALLED | Storage and safety controls | Antivirus/privacy review required |
| Scheduling/calendars | NOT INSTALLED | Provider auth | No bookings made |
| CRM qualified-lead routing | NOT INSTALLED | CRM + tenant identity | No leads sent |
| Client/admin portal | NOT INSTALLED | Auth/UI/RLS | Not in this starter |
| E-commerce checkout | NOT INSTALLED | Stripe/Shopify | No payments |
| Training course registration | NOT INSTALLED | Learning platform | No seats booked |
| Analytics attribution | NOT INSTALLED | Events/GA/GSC/CRM | No attribution reported |

## AUTONOMY / MEDIA / DELIVERY

| Capability | Status | Where / dependency | Honest interpretation |
|---|---|---|---|
| AI original business content generation | NOT INSTALLED | AI Gateway/model auth | No external model call |
| AI logo and image generation | NOT INSTALLED | Creative provider | Need license and QA |
| Social campaign draft automation | NOT INSTALLED | Metricool/approved scheduler | No social accounts accessed |
| Live social publishing | PROTECTED | Exact signed campaign approval | No posts sent |
| SMS/voice/email workflows | PROTECTED | Comms adapter + approval | No messages sent |
| Multi-agent swarm | NOT INSTALLED | Existing X1 agent runtime | No agents started |
| Vercel preview deploy adapter | NOT INSTALLED | Provider token + release scope | No hosted URLs |
| Batch publish 10/100/1000 sites | NOT INSTALLED | Verified queue + hosting | Local files are not deployed websites |
| DNS/domain provisioning | PROTECTED | Registrar/hosting approval | No DNS touched |
| Tenant isolated auth/RLS | NOT INSTALLED | Supabase schema/security | No database created |
| Continuous 24/7 reconciliation | NOT INSTALLED | Existing singleton heartbeat | No persistent jobs started |
| Post-release independent browser QA | NOT INSTALLED | Playwright/cloud browser | No live site validated |

## Non-negotiable release verification

- Research 3 live comparables and document business, industry, economics, intent, competitor gaps and real market coverage.
- Lock approved design; require screenshots at desktop 1440x900, tablet and 390x844 mobile and measure parity.
- Verify actual routes/HTTP, forms, contact events, privacy/consent, schema/canonical/sitemap/robots, accessibility and meaningful original local content.
- Verify tenant identity, API auth, RLS isolation, duplicate prevention, queue/worker/heartbeat, payment state (if applicable), cost limits and rollback.
- Require separate release approval and independent proof receipts. No ranking promises.
