# Digital Dominance / X1 future adapter contract

The preview starter does **not** operate a second queue or heartbeat.

Current interfaces:
- src/validate.mjs: validateSitePack and assertValidSitePack
- src/catalog.mjs: available Auto Builder visual layouts and Digital Dominance descriptive recipes
- src/preview.mjs: renderPreview, writePreviewBatch, renderGallery, writeGallery
- src/job-contract.mjs: createPreviewJob, deterministic metadata only (NO submission)
- src/cli.mjs: local validate / preview / gallery / layouts / job commands

Future provider adapter proposal (not present here):
1. Verify canonical Supabase tenant, durable queue, lease owner and existing X1 scheduler.
2. Import signed/versioned SitePack as PENDING_REVIEW with matching provenance and tenant ID.
3. Queue an idempotent PREVIEW task with a lease, timeout, retry budget and independent validation job.
4. Deploy only to authorized preview namespace and obtain provider-specific deployment ID.
5. Test desktop/tablet/mobile, actual links, forms, consent, route HTTP status, auth, RLS, noindex, real local facts and rollback.
6. Issue an immutable validation receipt; release remains separately gated by owner approval.
7. Connect CRM/SMS/email only with explicit scoped customer-contact approval and real receipts.

DO NOT call assumed endpoints. The following are proposed paths, **NOT implemented**:
- POST /api/sitepacks/validate
- POST /api/sitepacks/import
- POST /api/batches/preview
- GET /api/batches/:id/receipts
- POST /api/batches/:id/release [PROTECTED]

No provider bindings, webhooks, credentials, production deployment, scheduling, live lead capture or messaging are installed by these code modules.
