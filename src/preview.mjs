import {mkdir,writeFile} from "node:fs/promises";
import {join,resolve} from "node:path";
import {createHash} from "node:crypto";
import {renderSiteHtml,slugify} from "./donors/x1/siteRenderer.js";
import {assertValidSitePack} from "./validate.mjs";
import {builderLayouts,digitalDominanceLayouts,renderSyntheticLayout} from "./catalog.mjs";

const htmlEsc=(v)=>String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;")
  .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");

export function renderPreview(pack,location) {
  assertValidSitePack(pack);
  if (!pack.locations.some(loc=>loc.city===location.city && loc.region===location.region &&
                               loc.country===location.country)) throw new Error("Unknown location");
  const c = pack.content || {};
  const project = {
    business_name:pack.brand.name, industry:pack.industry.slug,
    location:location.city+", "+location.region,
    logo_url:pack.brand.logo_url||"",hero_image_url:pack.brand.hero_image_url||"",
    business_research:{
      businessName:pack.brand.name,tagline:pack.synthetic?"FICTIONAL DEMONSTRATION":String(c.tagline||""),
      phone:"",email:"",address:"",hours:"",serviceArea:location.city+", "+location.region
    },
    content:{
      colorTokens:pack.design.colorTokens||{primary:"#38bdf8",accent:"#0ea5e9",background:"#0b1523"},
      metaDescription:pack.synthetic?"Synthetic preview, not an operating business":String(c.metaDescription||"Preview only"),
      hero:c.hero||{headline:"Useful website preview",subheadline:location.unique_value,
                     primaryCta:"Explore services",secondaryCta:"How it works"},
      services:Array.isArray(c.services)?c.services:pack.industry.services.map(name=>({title:name,description:location.unique_value})),
      valueProps:Array.isArray(c.valueProps)?c.valueProps:[],
      process:Array.isArray(c.process)?c.process:[],
      about:c.about||{},faqs:Array.isArray(c.faqs)?c.faqs:[],testimonials:[],
      finalCta:{headline:"PREVIEW ONLY: no lead routing, forms or transactions",button:""}
    }
  };
  const rendered=renderSiteHtml(project);
  const notice='<div role="note" style="position:relative;z-index:100;background:#fde68a;'+
    'color:#111827;padding:12px 18px;text-align:center;font:700 15px system-ui">'+
    'PREVIEW ONLY / NOINDEX / NOT DEPLOYED'+(pack.synthetic?' / SYNTHETIC BUSINESS':' / NOT VALIDATED')+'</div>';
  return rendered.replace("</head>",'<meta name="robots" content="noindex, nofollow"></head>')
                 .replace("<body>","<body>"+notice);
}
export async function writePreviewBatch(pack,directory) {
  const validation=assertValidSitePack(pack);
  const root=resolve(directory);
  await mkdir(root,{recursive:true});
  const receipt={
    status:"preview_generated",mode:"preview",deployed:false,independent_validation:"UNKNOWN",
    approved_for_release:false,indexable:false,pack_id:pack.pack_id,version:pack.version,
    source:pack.source,created_at:new Date().toISOString(),validation,sites:[]
  };
  for(const loc of pack.locations) {
    const id=slugify(loc.city+"-"+loc.region+"-"+loc.country);
    const locationDir=join(root,id);
    await mkdir(locationDir,{recursive:true});
    const html=renderPreview(pack,loc);
    await writeFile(join(locationDir,"index.html"),html,"utf8");
    receipt.sites.push({
      id,city:loc.city,region:loc.region,country:loc.country,
      relative_file:id+"/index.html",sha256:createHash("sha256").update(html).digest("hex"),
      public_url:null,status:"preview_generated",external_http_test:"UNKNOWN"
    });
  }
  await writeFile(join(root,"robots.txt"),"User-agent: *\nDisallow: /\n","utf8");
  await writeFile(join(root,"receipt.json"),JSON.stringify(receipt,null,2)+"\n","utf8");
  return receipt;
}
export function renderGallery() {
  const items=builderLayouts.map(id=>
    '<article><h2>'+htmlEsc(id)+'</h2><div class="frame"><div class="preview">'+renderSyntheticLayout(id)+
    '</div></div><p>Fictional visual mini-layout. Not a deployable site.</p></article>').join("\n");
  const dd=digitalDominanceLayouts.map(r=>
    '<li><strong>'+htmlEsc(r.name)+'</strong> ('+htmlEsc(r.id)+') — '+htmlEsc(r.sections.join(" / "))+'</li>').join("\n");
  return '<!doctype html><html lang="en"><head><meta charset="utf-8">'+
    '<meta name="viewport" content="width=device-width,initial-scale=1">'+
    '<meta name="robots" content="noindex,nofollow">'+
    '<title>Universal Factory Preview Gallery</title><style>'+
    'body{background:#070e1d;color:#f1f5f9;margin:0;padding:clamp(16px,4vw,54px);font:16px system-ui}'+
    'h1{font-size:clamp(28px,5vw,55px)}p{color:#9fb1ca}h2{font-size:18px}'+
    '.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(345px,1fr));gap:20px}'+
    'article{border:1px solid #334155;background:#132038;padding:18px;border-radius:18px;overflow:hidden}'+
    '.frame{height:230px;border:1px solid #334155;border-radius:12px;overflow:hidden;background:#0b1523}'+
    '.preview{width:760px;height:460px;transform:scale(.45);transform-origin:top left}'+
    'li{margin:8px 0;color:#cbd5e1}</style></head><body><p>STRATEGIC MINDS AI · PREVIEW ONLY</p>'+
    '<h1>'+builderLayouts.length+' Auto Builder visual layouts</h1>'+
    '<p>Copied from the original authorized codebase. Synthetic examples, not deployed client sites.</p>'+
    '<div class="grid">'+items+'</div>'+
    '<h2>'+digitalDominanceLayouts.length+' Digital Dominance layout recipes</h2>'+
    '<p>Recipe descriptions are not implemented page templates. Original unverified performance scores have been excluded.</p>'+
    '<ul>'+dd+'</ul></body></html>';
}
export async function writeGallery(directory) {
  const root=resolve(directory);
  await mkdir(root,{recursive:true});
  await writeFile(join(root,"index.html"),renderGallery(),"utf8");
  await writeFile(join(root,"robots.txt"),"User-agent: *\nDisallow: /\n","utf8");
  return {status:"gallery_generated",path:root,layouts:builderLayouts.length,
    recipes:digitalDominanceLayouts.length,deployed:false,indexable:false};
}
