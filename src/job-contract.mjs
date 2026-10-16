// Descriptive work packet only. This module does not submit or run queue jobs.
import {createHash} from "node:crypto";
import {assertValidSitePack} from "./validate.mjs";
export function createPreviewJob(pack,location,tenantId) {
  assertValidSitePack(pack);
  if (!tenantId || typeof tenantId!=="string") throw new Error("Tenant ID required");
  const approved=pack.locations.find(loc=>loc.city===location?.city &&
    loc.region===location?.region && loc.country===location?.country);
  if (!approved) throw new Error("Location absent from SitePack");
  const idempotency_key=createHash("sha256").update(JSON.stringify(
    [tenantId,pack.pack_id,pack.version,approved.city,approved.region,approved.country,"preview"]
  )).digest("hex");
  return Object.freeze({
    action:"CREATE_PREVIEW_ONLY",source:pack.source,tenant_id:tenantId,
    pack_id:pack.pack_id,pack_version:pack.version,location:approved,
    idempotency_key,approval_status:"PENDING",indexable:false,production_release_allowed:false,
    state:"DRAFT_JOB_NOT_SUBMITTED"
  });
}
