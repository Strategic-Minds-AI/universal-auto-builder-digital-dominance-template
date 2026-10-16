# Release / verification gates

Implemented in source, pending test receipts:
- Required SitePack shape, source SHA, approved visual reference and color token syntax
- Preview-only approval and noindex rules
- Local uniqueness + local-value length checks and service-area declarations
- Require evidence_reference for non-synthetic locations (presence only; proof not independently verified)
- Block testimonials, unsafe color tokens and non-HTTPS brand assets
- Synthetic preview notice, disconnected contact actions, robots.txt blocking
- SHA-256 artifact receipts, explicitly not deployed
- Deterministic X1 job *specification* only; it does not submit a queue job

**NOT YET VALIDATED OR IMPLEMENTED**:
- Independent research and verification of real business and location facts
- Actual provider adapter, tenant auth/RLS, durable queue, worker, retry and idempotency across runtimes
- Real CRM/telephone/form flows, consent and analytics attribution
- Vercel preview HTTP reachability and rollback
- Approved premium Website Launch Engine visual parity >=99% on defined viewports
- WCAG auditing, mobile browser checks, full QA, performance and technical SEO checks
- Production authorization and scoped deployment receipts
- All claimed scale (1/10/100/1000 sites) requires real job and browser receipts

No production publishing, DNS, payment, secret modification, customer messages or mass indexing without separately recorded operator approval.
