import test from "node:test";
import assert from "node:assert/strict";
import {readFile,mkdtemp,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {validateSitePack} from "../src/validate.mjs";
import {builderLayouts,digitalDominanceLayouts} from "../src/catalog.mjs";
import {renderGallery,renderPreview,writePreviewBatch,writeGallery} from "../src/preview.mjs";
import {createPreviewJob} from "../src/job-contract.mjs";
const sample=JSON.parse(await readFile(new URL("../examples/fictional-epoxy.sitepack.json",import.meta.url),"utf8"));
const clone=v=>JSON.parse(JSON.stringify(v));
test("synthetic SitePack validates with clear warnings",()=>{
  const r=validateSitePack(sample);assert.equal(r.valid,true,JSON.stringify(r.errors));
  assert.ok(r.warnings.some(w=>w.includes("Synthetic")));
});
test("rejects fake service-area declaration",()=>{
  const p=clone(sample);p.locations[0].verified_service_area=false;
  assert.equal(validateSitePack(p).valid,false);
});
test("rejects duplicate location and thin local value",()=>{
  const p=clone(sample);p.locations.push({...p.locations[0],unique_value:"copy"});
  assert.equal(validateSitePack(p).valid,false);
});
test("rejects release or indexing bypass",()=>{
  for(const [key,val] of [["mode","release"],["approval_required",false],["noindex_until_validated",false]]){
    const p=clone(sample);p.provisioning[key]=val;assert.equal(validateSitePack(p).valid,false,key);
  }
});
test("blocks fake testimonials and unsafe design tokens",()=>{
  const p=clone(sample);p.content.testimonials=[{author:"Invented",quote:"Best ever!"}];
  assert.equal(validateSitePack(p).valid,false);
  const q=clone(sample);q.design.colorTokens.primary="url(javascript:alert(1))";
  assert.equal(validateSitePack(q).valid,false);
});
test("requires evidence references for actual service areas",()=>{
  const p=clone(sample);p.synthetic=false;
  assert.equal(validateSitePack(p).valid,false);
  p.locations[0].evidence_reference="verified-by-operator";
  assert.equal(validateSitePack(p).valid,true);
});
test("copied visual catalogs are available but claims excluded",()=>{
  assert.equal(builderLayouts.length,20);
  assert.equal(digitalDominanceLayouts.length,20);
  assert.ok(digitalDominanceLayouts.every(l=>!("rating" in l)&&!("conversion_score" in l)));
  assert.match(renderGallery(),/noindex,nofollow/);
});
test("preview HTML is noindex with no call or mail links",()=>{
  const html=renderPreview(sample,sample.locations[0]);
  assert.match(html,/noindex, nofollow/);
  assert.match(html,/SYNTHETIC BUSINESS/);
  assert.doesNotMatch(html,/href="tel:/);
  assert.doesNotMatch(html,/href="mailto:/);
});
test("non-submitted X1 queue packet is deterministic and rejects non-SitePack cities",()=>{
  const a=createPreviewJob(sample,sample.locations[0],"tenant-test");
  const b=createPreviewJob(sample,sample.locations[0],"tenant-test");
  assert.equal(a.idempotency_key,b.idempotency_key);
  assert.equal(a.production_release_allowed,false);
  assert.equal(a.state,"DRAFT_JOB_NOT_SUBMITTED");
  assert.throws(()=>createPreviewJob(sample,{city:"Another",region:"ZZ",country:"US"},"tenant-test"));
});
test("output artifacts have noindex files and hashes, never deployment claims",async()=>{
  const dir=await mkdtemp(join(tmpdir(),"smai-factory-"));
  try {
    const r=await writePreviewBatch(sample,join(dir,"sites"));
    assert.equal(r.deployed,false);
    assert.equal(r.sites.length,1);
    assert.equal(r.sites[0].public_url,null);
    assert.match(await readFile(join(dir,"sites","robots.txt"),"utf8"),/Disallow: \//);
    assert.match(await readFile(join(dir,"sites","exampleville-zz-us","index.html"),"utf8"),/noindex, nofollow/);
    const gallery=await writeGallery(join(dir,"gallery"));
    assert.equal(gallery.layouts,20);
    assert.match(await readFile(join(dir,"gallery","index.html"),"utf8"),/Auto Builder visual layouts/);
  }finally{await rm(dir,{recursive:true,force:true});}
});
