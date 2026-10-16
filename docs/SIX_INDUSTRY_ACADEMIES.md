# The Six Industry Academies

## Built from the existing Universal Auto Builder + Digital Dominance Academy

Production Academy: https://universal-factory-academy.vercel.app/

The core renderer, forty base website concepts, Studio export tools, lessons and Vercel project remain authoritative. These new editions use the same source truth. They do **not** establish six duplicate backends, six cron jobs, or six independent GitHub repositories.

### Six independently addressable educational portals

| Industry edition | URL | Included working examples |
| --- | --- | --- |
| Epoxy installation | [/academies/epoxy/](https://universal-factory-academy.vercel.app/academies/epoxy/) | \`split-left\`, \`fullscreen-image\`, \`grid-cards\`, \`bento\`, \`dd-hero-centered\`, \`dd-asymmetric-hero\` |
| Personal-injury legal | [/academies/legal/](https://universal-factory-academy.vercel.app/academies/legal/) | \`centered\`, \`split-right\`, \`sidebar\`, \`stats\`, \`dd-bold-minimal\`, \`dd-magazine\` |
| Real estate & property intelligence | [/academies/real-estate/](https://universal-factory-academy.vercel.app/academies/real-estate/) | \`gallery\`, \`magazine\`, \`split-left\`, \`asymmetric\`, \`dd-split-screen\`, \`dd-bento-box\` |
| Equipment distribution | [/academies/equipment/](https://universal-factory-academy.vercel.app/academies/equipment/) | \`product-focus\`, \`grid-cards\`, \`carousel\`, \`bento\`, \`dd-card-stack\`, \`dd-glassmorphism\` |
| Contractor training | [/academies/training/](https://universal-factory-academy.vercel.app/academies/training/) | \`timeline\`, \`booking\`, \`centered\`, \`sidebar\`, \`dd-accessibility-first\`, \`dd-hero-centered\` |
| AI systems & automation | [/academies/ai-systems/](https://universal-factory-academy.vercel.app/academies/ai-systems/) | \`dashboard\`, \`bento\`, \`stats\`, \`minimal\`, \`dd-kinetic-typography\`, \`dd-glassmorphism\` |

Hub: https://universal-factory-academy.vercel.app/academies/

Each edition is a fully generated educational portal with six industry-customized, full-page HTML website demos, a live iframe showcase, a different visual identity, industry-specific implementation lessons, and direct links into the **existing** Studio with a preset. The six times six examples are **36 distinct generated pages**, in addition to the 40 master library preview pages, for 76 local HTML preview routes. These 36 are adaptations, not separate live client businesses or standalone apps.

### Example: build an epoxy contractor website

1. Open the [Epoxy Academy](https://universal-factory-academy.vercel.app/academies/epoxy/).
2. Scroll the six full-page demonstrations. Choose the split-left example and open its full website.
3. Click **CUSTOMIZE THIS** to load the *same exact template ID* into the Studio with a fictional epoxy brand, starter services and color palette.
4. Replace the business name, headings, descriptions and services. Switch desktop/tablet/mobile in the Studio.
5. Export **website HTML** and **config JSON**. These files are created in your own browser and need no Academy account.
6. Open the exported HTML file locally to inspect the standalone site.
7. Before publishing for a real business, supply legally usable project photography, verified service facts and genuinely operational estimate/CRM functionality. Run human and automated QA.

### Example: attorney marketing

- Open [Legal Lead Academy](https://universal-factory-academy.vercel.app/academies/legal/).
- Choose \`centered\` or \`sidebar\` for an educational accident-intake concept.
- Export the tailored design in Studio and replace every fictional claim with verified attorney identity, state bar information and actual practice content.
- Observe advertising rules, clear who receives inquiries, proper consent, privacy and attorney-client relationship disclaimers; connect authorized and verified lead routing separately.

### Example: distressed property intelligence

- Open [Property Intelligence Studio](https://universal-factory-academy.vercel.app/academies/real-estate/).
- Choose \`gallery\` for a property discovery front end or \`dd-bento-box\` for an analysis-focused look.
- Export then connect verified property records, legitimately obtained feeds, evidence references, licensing and useful search functionality.
- Do not present a synthetic page as a functioning deal-finding backend.

### Example: equipment distributor

- Open [Equipment Commerce Lab](https://universal-factory-academy.vercel.app/academies/equipment/).
- Try \`product-focus\` to start a visual product catalog.
- Before selling, integrate real inventory, SKUs, specification and shipping data; separately validate payments and transactions.

### Example: training program

- Open [Training Program Builder](https://universal-factory-academy.vercel.app/academies/training/).
- Start from \`timeline\` for a teaching sequence or \`booking\` for a class-first layout.
- Export and add real training dates, trainer credentials, curriculum and authenticated enrollment.

### Example: AI agency or software system

- Open [AI Systems Launch Studio](https://universal-factory-academy.vercel.app/academies/ai-systems/).
- Choose \`dashboard\` or \`bento\` for a visually strong system website.
- Add actual product screenshots, business capabilities, user journeys and verified technical integration rather than fictional performance metrics.

## Reusing these as an actual factory

**Design source**: original Auto Builder visual layout IDs + Digital Dominance recipe-derived interpretations.

**Industry adapter**: \`src/industry-academies.mjs\`, with six immutable configuration records containing design IDs, editable demo brand/content, visual theme, and three implementation lessons.

**Reusable pipeline**: \`src/academy.mjs\` calls \`writeIndustryAcademies(manifest, dist, renderSite, css)\`. No new queue, database, scheduler or external service.

**Generated output**: \`dist/academy/academies/<industry>/\` landing pages and \`dist/academy/academies/<industry>/sites/<template-id>/index.html\`. The registry is \`dist/academy/academies/registry.json\`. The original master library remains at \`dist/academy/sites/<template-id>/\`.

**Same Studio**: \`/studio/?academy=<industry>&template=<template-id>\`. The Studio reads the generated registry and applies the selected industry preset without creating a separate editor.

**Validation**: \`npm test\` runs deterministic checks against all 36 generated sites, registry references, noindex metadata, assets, example HTML and exact Studio integration. \`npm run build\` generates the full static Vercel bundle.

## What is and is not connected

- **Implemented**: six individually addressable academies, 36 complete industry-tuned HTML demonstrations, full-page navigation, six studios through a common parameterized Studio, downloadable HTML and configuration JSON, prompts, mobile/tablet frame sizes, deterministic build, CI.
- **Not implemented by these editions**: lead capture, CRM, real-time MLS/property feeds, quoting/pricing, lawyer intake submission, training enrollment, ecommerce checkout, live AI agent operations, tenant accounts, per-client separate domain/Vercel project, or automatic mass publication.
- **Indexation**: portal pages include noindex for synthetic educational versions; demo site pages additionally carry noindex and must not become search-doorway pages. Use verified business facts and release checks before customer-facing publication.
- **Production scope**: Vercel serves the six new routes from the existing authorized Academy project. No other brand deployment, DNS changes, purchasing or protected systems affected.
