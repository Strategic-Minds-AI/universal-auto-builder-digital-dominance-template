# Universal Auto Builder + Digital Dominance Academy

## What this running website actually does

The Academy is a static, Vercel-compatible educational website built from the authorized Universal Auto Builder layout IDs and Digital Dominance recipe catalog. It generates **40 standalone full-page website demonstrations**, each with accessible navigation, distinct hero styling, service sections, an approach section, FAQ, and a clearly nonfunctional demo inquiry area.

- \`/\` is a searchable gallery of **live HTML page previews** (iframes point to the real generated websites, not borrowed screenshots).
- \`/sites/<template-id>/\` opens the **entire individual demonstration website**, which stays noindex.
- \`/studio/?template=<template-id>\` is a functional client-side editor. Brand, headline, description, industry, CTA label, three services, and accent color update in the real iframe preview.
- Export **one standalone HTML file** per chosen site or **one JSON configuration file**, with zero generator account dependency. The HTML contains its own CSS and can be opened directly on a computer.
- Copy an implementation prompt specifying the original exact template ID.
- \`/learn/\` teaches what templates and generators are, deterministic replication, configuration/SitePacks, quality gates and launch.
- The 20 **Digital Dominance recipe-derived demonstrations** are static full-page interpretations of 20 descriptive layout recipes, not exact reproductions of advanced video/3D/animation behavior. The underlying recipes also remain available as metadata.
- Production-ready in this document means an educational website can be deployed on Vercel, NOT that any synthetic customer website has passed release validation or that X1, Supabase, CRM, payments, AI Gateway, or a customer-contact system is connected.

## Local run

Requirements: Node 20+.

\`\`\`bash
npm test
npm run build
# Serve output locally with any static HTTP server; root is dist/academy
python3 -m http.server 8000 --directory dist/academy
\`\`\`

Then navigate to \`http://localhost:8000/\`, click a template and use its **Use design** action to enter the editor. Do NOT double-click the Academy's main \`index.html\` for file:// browsing because browser fetch security rules prevent loading manifest and templates from disk. Exported individual HTML sites themselves open offline.

## Deployment

The repository root contains \`vercel.json\`, with \`buildCommand: npm run build\`, \`outputDirectory: dist/academy\`, framework null. Link the repository to a new project in the authorized Strategic Minds Vercel team. Release the reviewed commit only after CI, visual smoke testing and the operator's production approval; retain source SHA and rollback pointer. No domain purchase, DNS change, paid API, provisioner, or scheduler is required.

## How to replicate one exact design

1. Choose a preview on the gallery. Click **View full-page preview** and scroll through all sections.
2. Click **Use design** to open the Studio with that exact ID loaded.
3. Change business name, headline, description, industry, CTA, services and accent. Use **Desktop / Tablet / Mobile** preview.
4. Click **Download website HTML**. This is a complete portable static HTML file with CSS inlined. Download **config JSON** to preserve the inputs and template ID.
5. Open the downloaded HTML in a browser or place it as \`index.html\` in its own GitHub repository. Customize content, images, SEO, real contact forms and CRM APIs in the independent project.
6. Add verified facts, accurate business identity and actual product/service data. Validate accessibility, content and contact handling. Create a preview before authorizing a public launch.
7. Repeat steps 1-6 for another client or industry. Existing exports and repositories remain separate.

The library replicates **its own 20 authorized Auto Builder designs and 20 recipe-derived Digital Dominance concepts**, not an arbitrary third-party website URL. No wholesale cloning of external copyright-protected sites is offered.

## Examples that you can try now

| Goal | Start design | What to customize | Release gate |
|---|---|---|---|
| Epoxy flooring installer | \`split-left\` | service systems, real floor photos, estimate intake | working estimate + consent |
| Contractor training | \`timeline\` | workshops, lesson outlines, verified dates | real booking + attendance |
| Equipment supply | \`product-focus\` | product list, SKU facts, inventory | authorized checkout + tax/shipping |
| Personal injury attorney | \`centered\` | jurisdictions, attorney identity, actual case services | lawyer advertising rules + lead routing |
| Real estate agency | \`gallery\` | listings and real availability | licensing + data rights |
| AI consulting | \`bento\` | actual service offerings, approved case studies | operational booking |
| SaaS product | \`dashboard\` | real screenshots and functional product | auth + user isolation |
| Medical/wellness studio | \`minimal\` | truthful services and qualifications | intake privacy |
| Local contractor | \`split-right\` | verified service areas, differentiators | working phone/form |
| Creative studio | \`magazine\` | genuine portfolio and licensed images | contact conversion |

Other example industries in the gallery include hospitality, equipment, training, data, architecture, coaching and professional services.

## Generator vs template vs SitePack

- **Template**: visual design and page composition reused across examples.
- **Generator**: deterministic build script \`src/academy.mjs\` that creates the actual website files from template metadata and CSS.
- **Studio configuration**: user-edited JSON export. It is a browser-friendly demonstration, **not** the canonical validated SitePack format.
- **Canonical SitePack**: versioned industry/brand/verified-location/provenance/release contract in \`schemas/sitepack.schema.json\`; validate using \`scripts/validate_sitepack.py\`.
- **Production deployment**: a separately approved user-visible Vercel deployment of the *Academy app*; customer website production is gated independently.

## Safety and boundaries

All generated customer sample sites have \`noindex,nofollow\` plus \`X-Robots-Tag\` and robots disallow routes in this Academy. The Studio is browser-local: no account, persistent storage, server-side generator job, database, form submissions or outside customer communications. Buttons in individual sites use local section anchors, not fake lead workflows. No automatic SEO ranking or autonomous batch provisioning is claimed. A reviewed SitePack and real integration will be needed for batch release into Digital Dominance's existing governed queue.

## Next integration sequence

1. Attach a verified Academy Vercel project and independently test desktop/mobile, download integrity, preview links, and noindex behavior.
2. Add optional authenticated project save/reopen and SitePack export backed by validated existing Supabase tenant scope.
3. Wire approved packages to the **existing** X1 Digital Dominance queue, leases and receipts. Avoid duplicate workers or schedulers.
4. Add lead collection, real CRM integration and deployment receipts with approvals, tenant isolation and anti-abuse protections.
5. Pilot **one** real authorized business before any city/industry batch launch.
