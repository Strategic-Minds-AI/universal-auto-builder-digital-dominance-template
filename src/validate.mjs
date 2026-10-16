// SitePack guardrails. This is static validation, not third-party fact verification.
const nonempty = (v) => typeof v === "string" && v.trim().length > 0;
const required = ["pack_id","version","source","brand","industry","design","locations","provisioning"];
const https = (value) => {
  try { const u = new URL(value); return u.protocol === "https:" && Boolean(u.hostname); }
  catch { return false; }
};

export function validateSitePack(pack) {
  const errors = [], warnings = [];
  if (!pack || typeof pack !== "object" || Array.isArray(pack)) {
    return {valid:false,errors:["SitePack must be a JSON object"],warnings};
  }
  for (const key of required) if (!(key in pack)) errors.push("Missing "+key);
  for (const k of ["pack_id","version"]) if (!nonempty(pack[k])) errors.push("Missing "+k);
  const source = pack.source || {};
  if (!nonempty(source.repository) || !nonempty(source.template_id) ||
      !nonempty(source.commit_sha) || source.commit_sha.trim().length < 7) {
    errors.push("Source repository, immutable commit SHA and template ID are mandatory");
  }
  const brand = pack.brand || {};
  for (const key of ["name","legal_business_name","contact_phone"])
    if (!nonempty(brand[key])) errors.push("Missing brand."+key);
  for (const k of ["logo_url","hero_image_url","source_url"]) {
    if (nonempty(brand[k]) && !https(brand[k])) errors.push("HTTPS URL required for brand."+k);
  }
  const industry = pack.industry || {};
  if (!nonempty(industry.slug) || !Array.isArray(industry.services) || !industry.services.some(nonempty))
    errors.push("Industry slug and at least one real service are mandatory");
  const design = pack.design || {};
  if (!nonempty(design.approved_reference) || !nonempty(design.design_token_version))
    errors.push("Approved visual reference and design-token version are mandatory");
  for (const [name,value] of Object.entries(design.colorTokens || {})) {
    if (!["primary","accent","background"].includes(name) ||
        typeof value !== "string" || !/^#[0-9a-f]{6}$/i.test(value)) {
      errors.push("Unsupported design color token "+name);
    }
  }
  const p = pack.provisioning || {};
  if (p.mode !== "preview" || p.approval_required !== true || p.noindex_until_validated !== true)
    errors.push("Preview mode, operator approval and noindex are mandatory");
  if (!Array.isArray(pack.locations) || pack.locations.length === 0) {
    errors.push("At least one location required");
  } else {
    const seen = new Set();
    for (const [i,loc] of pack.locations.entries()) {
      if (!loc || typeof loc !== "object") {errors.push("Invalid location "+i);continue;}
      const key = ["city","region","country"].map(k=>String(loc[k]||"").toLowerCase().trim()).join(":");
      if (seen.has(key)) errors.push("Duplicate location "+i);
      seen.add(key);
      if (!["city","region","country"].every(k=>nonempty(loc[k])))
        errors.push("Location "+i+" requires city, region and country");
      if (loc.verified_service_area !== true)
        errors.push("Location "+i+" lacks service-area verification declaration");
      if (String(loc.unique_value || "").trim().length < 30)
        errors.push("Location "+i+" lacks meaningful original local value");
      if (!pack.synthetic && !nonempty(loc.evidence_reference))
        errors.push("Location "+i+" lacks evidence reference for human review");
    }
  }
  const content = pack.content || {};
  if (Array.isArray(content.testimonials) && content.testimonials.length)
    errors.push("No testimonials may be generated without a separate verified-evidence adapter");
  if (pack.synthetic) warnings.push("Synthetic example only; no real service, leads, indexing or publishing");
  if (!nonempty(pack.independent_validation_receipt))
    warnings.push("Independent validation receipt not supplied; no release eligibility");
  warnings.push("Code cannot independently prove claims or market coverage: reviewer must verify");
  return {valid:errors.length===0,errors,warnings};
}
export function assertValidSitePack(pack) {
  const result = validateSitePack(pack);
  if (!result.valid) throw new Error("SitePack BLOCKED: "+result.errors.join("; "));
  return result;
}
