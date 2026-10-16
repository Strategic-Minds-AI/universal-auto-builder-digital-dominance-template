// Six independently addressable, industry-specific educational factory editions.
// Reuses the original Academy renderer and Vercel app. No queue, new worker or client data.
import {mkdir,writeFile} from "node:fs/promises";
import {join} from "node:path";

export const INDUSTRY_ACADEMIES = Object.freeze([
  {
    id:"epoxy", name:"Epoxy Website Factory", label:"CONTRACTOR GROWTH / 01",
    theme:"mineral", accent:"#a9e1d4", accentDark:"#538d83", number:"01",
    header:"Exceptional floors.", emphasis:"Unforgettable first impressions.",
    intro:"A curated site-making studio for epoxy flooring, concrete resurfacing, and professional installation brands. Discover complete designs, customize one, and export a working site to build on.",
    industry:"Epoxy & Decorative Concrete", brand:"Surfacecraft Studio Demo",
    tagline:"A better finish starts with the right foundation.",
    subtitle:"A fictional flooring contractor template, ready for verified project photos, service details and a real estimate workflow.",
    cta:"Explore finishes", services:["Garage floor transformations","Commercial flooring concepts","Surface preparation guidance"],
    templates:["split-left","fullscreen-image","grid-cards","bento","dd-hero-centered","dd-asymmetric-hero"],
    themes:["Installation-led split","Project-driven visual","Service catalog","Estimator foundation","Clean conversion","Bold branded"],
    lessons:[
      ["Present the finish","Lead with genuine before-and-after work and specific installation systems. Never borrow a photo as proof of work you did not perform."],
      ["Build an honest estimator","Connect verified dimensions, prep conditions and approved pricing logic. A pretty estimate button is not an operating quote system."],
      ["Scale service-area value","Only generate location-specific pages for areas actually served, with helpful local details and accurate contact routing."]
    ],
    useCases:["Residential garage coatings","Commercial floor systems","Concrete polishing and resurfacing"],
    icon:"◈", sideNote:"INSTALLATION / SERVICES / ESTIMATES"
  },
  {
    id:"legal",name:"Legal Lead Academy",label:"ATTORNEY DIGITAL GROWTH / 02",
    theme:"verdict",accent:"#d7bd93",accentDark:"#806341",number:"02",
    header:"Make clarity",emphasis:"your strongest first impression.",
    intro:"An editorial website workshop for personal-injury and motor-vehicle accident law firm marketing. Study layouts, assemble clear intake experiences, and keep attorney advertising compliance in view.",
    industry:"Personal Injury Legal Marketing",brand:"Counsel House Demo",
    tagline:"Clear information when the next step matters.",
    subtitle:"A fictional attorney marketing concept. No attorney-client relationship, no guaranteed results, and no real legal services are provided.",
    cta:"Explore the process",services:["Accident consultation overview","Attorney identity and credentials","Educational case intake guidance"],
    templates:["centered","split-right","sidebar","stats","dd-bold-minimal","dd-magazine"],
    themes:["Clarity first","Editorial authority","Information hierarchy","Fact-forward trust","Minimal premium","Long-form education"],
    lessons:[
      ["Make intake accessible","Give visitors a clear explanation of who receives their inquiry. Never imply an attorney-client relationship through a demo."],
      ["Use verified lawyer facts","Actual bar status, practice areas, jurisdiction and testimonials require evidence and applicable advertising compliance."],
      ["Validate every handoff","Once an authorized form is connected, test consent, retention, CRM attribution and communication safeguards."]
    ],
    useCases:["Vehicle accident information","Attorney consultation funnels","Educational practice-area pages"],
    icon:"⚖",sideNote:"LEGAL / EDUCATION / INTAKE"
  },
  {
    id:"real-estate",name:"Property Intelligence Studio",label:"REAL ESTATE & INVESTING / 03",
    theme:"terrain",accent:"#9cc4f4",accentDark:"#516d92",number:"03",
    header:"Real estate has layers.",emphasis:"Your website should too.",
    intro:"Build transparent property discovery, neighborhood education, and investor-research experiences. Turn trustworthy records into useful interfaces instead of creating imaginary listings.",
    industry:"Real Estate & Property Intelligence",brand:"Groundwork Property Demo",
    tagline:"Better information. Better property decisions.",
    subtitle:"A fictional property intelligence site demonstrating how verified listings and evidence-based investment research could be presented.",
    cta:"Discover the process",services:["Property discovery workflows","Distressed deal research education","Neighborhood and area analysis"],
    templates:["gallery","magazine","split-left","asymmetric","dd-split-screen","dd-bento-box"],
    themes:["Listing gallery","Editorial market insight","Investor discovery","Asymmetric showcase","Split search","Structured data"],
    lessons:[
      ["Respect property source data","Verify ownership, listing permission, status, dates and licensed feed rights before displaying any property claim."],
      ["Explain deal quality","Separate verified property records from estimates, modeled values and unconfirmed distress indicators."],
      ["Make research actionable","Add evidence links, filters and traceable calculations before promoting any site as an operational deal finder."]
    ],
    useCases:["Property intelligence portal","Distressed property research","Brokerage and listing education"],
    icon:"⌂",sideNote:"PROPERTY / ANALYSIS / DISCOVERY"
  },
  {
    id:"equipment",name:"Equipment Commerce Lab",label:"TOOLS & DISTRIBUTION / 04",
    theme:"foundry",accent:"#f0a67b",accentDark:"#a65f37",number:"04",
    header:"Industrial strength.",emphasis:"Beautifully presented.",
    intro:"A premium website-making laboratory for equipment, supply catalogs, and distributor education. Compare product-oriented designs and export the exact interface you choose.",
    industry:"Equipment & Industrial Supply",brand:"Foundry Supply Demo",
    tagline:"Precision tools for ambitious work.",
    subtitle:"A fictional equipment-distributor concept. Real specifications, inventory, price, warranty and checkout must be integrated later.",
    cta:"Explore categories",services:["Machines and equipment categories","Consumable product education","Specifications and buyer guidance"],
    templates:["product-focus","grid-cards","carousel","bento","dd-card-stack","dd-glassmorphism"],
    themes:["Product-first story","Category browsing","Featured selections","Modular catalog","Stacked product cards","Elevated visual system"],
    lessons:[
      ["Start with truthful products","Real SKUs, compatibility, stock and warranties belong in a verified product-data source."],
      ["Decide the buying journey","Product inquiry, quotation, dealer referral and checkout require different backend integrations."],
      ["Test operational commerce","Before taking orders, validate inventory, taxation, delivery, refunds, payments and customer support."]
    ],
    useCases:["Machinery catalog","Surface prep supply shop","Wholesale distributor portal"],
    icon:"✦",sideNote:"COMMERCE / PRODUCTS / OPERATIONS"
  },
  {
    id:"training",name:"Training Program Builder",label:"EDUCATION & CLASSES / 05",
    theme:"scholar",accent:"#c4e89b",accentDark:"#77964a",number:"05",
    header:"Teach something real.",emphasis:"Build the future around it.",
    intro:"Learn to create exceptional course websites for trade schools, workshops and hands-on instruction. Go from a class description to a complete, enrollment-ready design concept.",
    industry:"Training & Professional Education",brand:"Skillsmith Workshop Demo",
    tagline:"Hands-on skills begin with a clear path.",
    subtitle:"A fictional training-program example. Instructor identities, class dates, availability and accreditation require verification.",
    cta:"Explore courses",services:["Hands-on training workshops","Certification pathway overviews","Course scheduling guidance"],
    templates:["timeline","booking","centered","sidebar","dd-accessibility-first","dd-hero-centered"],
    themes:["Course journey","Schedule-ready concept","Direct enrollment story","Multi-course sidebar","Accessible learning","Classic education"],
    lessons:[
      ["Show the real curriculum","Describe prerequisites, equipment, class outcomes, fees and instructor credentials accurately."],
      ["Make dates trustworthy","Availability, seats and registration flows must come from a real authorized booking system."],
      ["Support students after signup","Connect approved reminders, accessible resources, payments and cancellation policies."]
    ],
    useCases:["Concrete polishing workshops","Trade certification programs","Equipment skills training"],
    icon:"✳",sideNote:"CLASSES / CURRICULUM / LEARNING"
  },
  {
    id:"ai-systems",name:"AI Systems Launch Studio",label:"AUTOMATION & SOFTWARE / 06",
    theme:"synapse",accent:"#acb5ff",accentDark:"#5867bd",number:"06",
    header:"Imagine the system.",emphasis:"Then make it tangible.",
    intro:"A visual teaching and build studio for AI agencies, automation consultants, software products and agent-based business systems. Make the complex understandable and export a compelling first website.",
    industry:"AI Systems & Automation",brand:"Circuitline AI Demo",
    tagline:"Turn good ideas into repeatable systems.",
    subtitle:"A fictional AI systems agency concept. Functional automation, agent permissions, uptime, pricing and case studies must be independently verified.",
    cta:"Explore capabilities",services:["AI workflow discovery","Software product concepts","Agent operations education"],
    templates:["dashboard","bento","stats","minimal","dd-kinetic-typography","dd-glassmorphism"],
    themes:["Product dashboard","Platform modules","System metrics concept","Ultra-clear offer","Bold typography","Modern glass presentation"],
    lessons:[
      ["Sell the specific outcome","Use a clear offer, architecture examples and real customer problems. Do not present synthetic metrics as results."],
      ["Distinguish demo from live","A dashboard preview is not a running SaaS or active agent. State which backend integrations are actually connected."],
      ["Engineer before launching","Confirm security, data access, tenant isolation, audit logs, model costs and measurable operational tests."]
    ],
    useCases:["AI consulting agency","Automation platform showcase","Agent operations SaaS"],
    icon:"✺",sideNote:"AI / AGENTS / SYSTEMS"
  }
]);

const esc=x=>String(x??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const wrapHead=(title,description)=>"<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"theme-color\" content=\"#090e14\"><meta name=\"robots\" content=\"noindex,follow\"><meta name=\"description\" content=\""+esc(description)+"\"><title>"+esc(title)+" | Strategic Minds AI</title><link rel=\"stylesheet\" href=\"/assets/academy.css\"><link rel=\"stylesheet\" href=\"/assets/industry-academies.css\"></head>";
function nav(current) {
 const links=INDUSTRY_ACADEMIES.map(x=>"<a "+(x.id===current?'aria-current="page" ':'')+"href=\"/academies/"+x.id+"/\">"+esc(x.name.split(" ")[0])+"</a>").join("");
 return "<header class=\"ia-nav\"><a class=\"ia-logo\" href=\"/\"><span class=\"ia-logo-mark\">S<span>✳</span></span><span>STRATEGIC MINDS AI<small>INDUSTRY FACTORIES</small></span></a><nav aria-label=\"Academy navigation\"><a href=\"/academies/\">All Academies</a>"+links+"</nav><a class=\"ia-nav-button\" href=\"/studio/\">OPEN STUDIO <span>↗</span></a></header>";
}
function footer(){
 return "<footer class=\"ia-footer\"><div><span class=\"ia-footer-logo\">STRATEGIC MINDS AI</span><p>Reusable design systems. Education before automation. Verified launches.</p></div><div><a href=\"/\">Master Academy</a><a href=\"/academies/\">Industry Academies</a><a href=\"/learn/\">Generator Lessons</a><a href=\"/studio/\">Live Studio</a></div><small>Sample industries and business brands are fictional. No customer inquiries, payments, or regulated services are performed by these examples.</small></footer>";
}
function academyCard(a,i){
 const href="/academies/"+a.id+"/";
 return "<article class=\"ia-hub-card ia-theme-"+esc(a.theme)+"\" style=\"--ia-accent:"+esc(a.accent)+";--ia-shade:"+esc(a.accentDark)+"\">"+
 "<div class=\"ia-hub-card-top\"><span>"+esc(a.label)+"</span><span class=\"ia-hub-icon\" aria-hidden=\"true\">"+esc(a.icon)+"</span></div>"+
 "<div class=\"ia-hub-illustration\" aria-hidden=\"true\"><div class=\"ia-illustration-ring\"></div><div class=\"ia-illustration-core\">"+esc(a.icon)+"</div><span class=\"ia-illustration-caption\">"+esc(a.sideNote)+"</span></div>"+
 "<div class=\"ia-hub-card-body\"><span class=\"ia-hub-index\">ACADEMY "+String(i+1).padStart(2,"0")+" / 06</span><h2>"+esc(a.name)+"</h2><p>"+esc(a.intro)+"</p>"+
 "<div class=\"ia-hub-foot\"><span>6 tailored live-site examples</span><a href=\""+href+"\" aria-label=\"Explore "+esc(a.name)+"\">OPEN ACADEMY <span>↗</span></a></div></div></article>";
}
export function renderAcademiesHub(){
 return wrapHead("Six specialized website generator academies","Six industry-focused website factories for epoxy, legal, real estate, equipment, training and AI.")+
 "<body class=\"academy-body ia-body\">"+nav("")+
 "<main><section class=\"ia-hub-hero\"><div class=\"ia-eyebrow\"><span class=\"ia-dot\"></span> YOUR UNIVERSAL BUILDER / INDUSTRY EDITIONS</div>"+
 "<div class=\"ia-hub-hero-grid\"><div><h1>One engine.<br><em>Six different worlds.</em></h1><p>What if every industry had its own expert template classroom? Choose a factory below to explore tailored full-page designs, learn the workflows, and make your own independent websites.</p><a class=\"ia-primary\" href=\"#factories\">EXPLORE THE SIX FACTORIES <span>↘</span></a></div><div class=\"ia-hub-sphere\" aria-hidden=\"true\"><div class=\"ia-hub-halo\"></div><div class=\"ia-hub-orbit\"><span>DESIGN</span><span>BUILD</span><span>LEARN</span><span>REPEAT</span></div><div class=\"ia-hub-center\">06<small>INDUSTRY EDITIONS</small></div></div></div>"+
 "<div class=\"ia-hub-metrics\"><span><b>06</b> Industry academies</span><span><b>36</b> Tailored site demonstrations</span><span><b>40</b> Master library layouts</span><span><b>01</b> Reusable generator</span></div></section>"+
 "<section class=\"ia-hub-gallery\" id=\"factories\"><div class=\"ia-section-label\">PICK YOUR INDUSTRY / 01</div><div class=\"ia-section-heading\"><h2>Specialized by design.<br><em>Connected by the engine.</em></h2><p>Every Academy uses the same working website generator while tailoring its design selections, demo content, lessons and project-building starting points.</p></div>"+
 "<div class=\"ia-hub-grid\">"+INDUSTRY_ACADEMIES.map(academyCard).join("")+"</div></section>"+
 "<section class=\"ia-hub-lesson\"><div><div class=\"ia-section-label\">THE METHOD / 02</div><h2>See it.<br>Shape it.<br><em>Ship it when ready.</em></h2><p>Inspect six complete designs per industry. Open any one in the live Studio with your industry preset. Export a standalone HTML website, replace fictional examples with real content, validate, and launch the finished project through your approved workflow.</p><a class=\"ia-primary\" href=\"/learn/\">LEARN THE GENERATOR ↗</a></div><div class=\"ia-hub-steps\"><div><b>01</b><span>Select a specialist Academy</span></div><div><b>02</b><span>Inspect real generated website HTML</span></div><div><b>03</b><span>Customize brand, services and layout</span></div><div><b>04</b><span>Export your independent website</span></div><div><b>05</b><span>Test and approve real integrations</span></div></div></section></main>"+footer()+"</body></html>";
}
function demoCard(a,m,variant,i){
 const id=variant.id;
 const site="/academies/"+a.id+"/sites/"+id+"/";
 const studio="/studio/?template="+encodeURIComponent(id)+"&academy="+encodeURIComponent(a.id);
 return "<article class=\"ia-preview-card\"><div class=\"ia-preview-window\"><div class=\"ia-window-bar\"><span class=\"ia-lights\"><i></i><i></i><i></i></span><span>"+esc(a.id)+"-site-"+String(i+1).padStart(2,"0")+".demo</span><span>↗</span></div><div class=\"ia-frame-crop\"><iframe title=\"Generated "+esc(a.name)+" "+esc(m.name)+" website\" src=\""+site+"\" loading=\"lazy\" tabindex=\"-1\" sandbox=\"allow-same-origin\"></iframe></div><a class=\"ia-preview-overlay\" href=\""+site+"\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open full-page "+esc(m.name)+" preview\">OPEN FULL SITE ↗</a></div>"+
 "<div class=\"ia-preview-details\"><div><span>DESIGN "+String(i+1).padStart(2,"0")+"</span><h3>"+esc(m.name)+"</h3><p>"+esc(a.themes[i]||"Premium website concept")+"</p></div><a class=\"ia-use-design\" href=\""+studio+"\">CUSTOMIZE THIS <span>↗</span></a></div></article>";
}
function lessonCard(lesson,i){
 return "<article class=\"ia-lesson\"><span>0"+(i+1)+" / THE PLAYBOOK</span><h3>"+esc(lesson[0])+"</h3><p>"+esc(lesson[1])+"</p></article>";
}
export function renderIndustryAcademy(a,selected){
 const hrefBase="/academies/"+a.id+"/";
 const first="/studio/?template="+encodeURIComponent(selected[0].base.id)+"&academy="+a.id;
 const previews=selected.map((v,i)=>demoCard(a,v.base,v.variant,i)).join("");
 const others=INDUSTRY_ACADEMIES.filter(x=>x.id!==a.id).map(x=>"<a href=\"/academies/"+x.id+"/\">"+esc(x.name)+" <span>↗</span></a>").join("");
 return wrapHead(a.name,"A dedicated educational website template factory for "+a.industry+". Six full-page demo websites with individual live editing and HTML export.")+
 "<body class=\"academy-body ia-body ia-theme-"+esc(a.theme)+"\" style=\"--ia-accent:"+esc(a.accent)+";--ia-shade:"+esc(a.accentDark)+"\">"+nav(a.id)+
 "<main><section class=\"ia-industry-hero\"><div class=\"ia-eyebrow\"><span class=\"ia-dot\"></span>"+esc(a.label)+"<span class=\"ia-hero-index\">INDUSTRY "+esc(a.number)+" OF 06</span></div>"+
 "<div class=\"ia-industry-hero-grid\"><div class=\"ia-industry-copy\"><div class=\"ia-small-label\">THE DIGITAL DOMINANCE EDITION</div><h1>"+esc(a.header)+"<br><em>"+esc(a.emphasis)+"</em></h1><p>"+esc(a.intro)+"</p><div class=\"ia-hero-actions\"><a class=\"ia-primary\" href=\"#designs\">EXPLORE "+selected.length+" DESIGNS <span>↘</span></a><a href=\""+first+"\" class=\"ia-text-link\">BUILD IN THE STUDIO <span>↗</span></a></div><div class=\"ia-industry-meta\"><span>"+esc(a.industry.toUpperCase())+"</span><i></i><span>STRATEGIC MINDS AI</span></div></div>"+
 "<div class=\"ia-industry-stage\" aria-label=\"A live website generated for this Academy\"><div class=\"ia-stage-grid\"></div><div class=\"ia-stage-orbit\"></div><div class=\"ia-stage-window\"><div class=\"ia-stage-browser\"><span><i></i><i></i><i></i></span><b>EXAMPLE WEBSITE / VIEW 01</b><a href=\""+hrefBase+"sites/"+selected[0].base.id+"/\" aria-label=\"Open complete example\" target=\"_blank\" rel=\"noopener noreferrer\">↗</a></div><div class=\"ia-stage-frame\"><iframe title=\"Featured "+esc(a.name)+" live website\" src=\""+hrefBase+"sites/"+selected[0].base.id+"/\" loading=\"eager\" tabindex=\"-1\" sandbox=\"allow-same-origin\"></iframe></div></div><div class=\"ia-stage-label\"><span>INDUSTRY GENERATOR / "+esc(a.number)+"</span><span>LIVE HTML ↗</span></div></div></div></section>"+
 "<section class=\"ia-industry-stats\"><div><b>06</b><span>Curated layouts</span></div><div><b>100%</b><span>Real HTML preview files</span></div><div><b>01</b><span>Shared factory engine</span></div><div><b>∞</b><span>Possible custom brand configurations</span></div></section>"+
 "<section class=\"ia-collection-library\" id=\"designs\"><div class=\"ia-section-label\">TEMPLATE LIBRARY / "+esc(a.number)+"</div><div class=\"ia-section-heading\"><h2>Find the right shape<br><em>for your business.</em></h2><p>These are six actual, generated, full-length pages with fictional industry-specific copy. Open the whole site or load the exact design into the Studio to make an independent copy.</p></div><div class=\"ia-preview-grid\">"+previews+"</div></section>"+
 "<section class=\"ia-industry-method\" id=\"method\"><div class=\"ia-method-intro\"><div class=\"ia-section-label\">HOW THE GENERATOR WORKS / 02</div><h2>One design.<br><em>Different futures.</em></h2><p>Each site comes from a reusable template, an industry-specific set of configuration values, and a deterministic renderer. The Studio lets you edit and export one design without changing the others.</p><a class=\"ia-primary\" href=\""+first+"\">CUSTOMIZE A WEBSITE ↗</a></div><div class=\"ia-method-sequence\"><div><span>01</span><b>Choose a website</b><small>Select the exact layout you want to replicate.</small></div><div><span>02</span><b>Customize the content</b><small>Change business details, headlines, services and brand color.</small></div><div><span>03</span><b>Download your copy</b><small>Own a standalone HTML website and settings file.</small></div><div><span>04</span><b>Make it operational</b><small>Connect verified forms, facts and necessary backends before release.</small></div></div></section>"+
 "<section class=\"ia-learning-section\" id=\"learn\"><div class=\"ia-section-label\">THE SPECIALIST PLAYBOOK / 03</div><div class=\"ia-section-heading\"><h2>Know the design.<br><em>Know the industry.</em></h2><p>Three implementation lessons for this particular industry, beyond changing the logo and colors.</p></div><div class=\"ia-learning-grid\">"+a.lessons.map(lessonCard).join("")+"</div></section>"+
 "<section class=\"ia-scenarios\"><div><div class=\"ia-section-label\">POSSIBLE SITE APPLICATIONS</div><h2>Where you can take this.</h2></div><div>"+a.useCases.map((u,i)=>"<span><b>0"+(i+1)+"</b>"+esc(u)+"</span>").join("")+"</div></section>"+
 "<section class=\"ia-final-cta\"><div><span class=\"ia-section-label\">YOUR NEXT SITE STARTS HERE</span><h2>Choose it.<br><em>Make it your own.</em></h2><p>Begin with a demo, make the edits in the browser, and export a separate file. You can build another without touching the first one.</p><a class=\"ia-primary\" href=\""+first+"\">OPEN THE GENERATOR STUDIO ↗</a></div><div class=\"ia-next-industries\"><span>EXPLORE MORE FACTORIES</span>"+others+"</div></section></main>"+footer()+"</body></html>";
}
export async function writeIndustryAcademies(manifest,root,renderSite,siteCss){
 const index=new Map(manifest.map(x=>[x.id,x]));
 if(index.size!==40)throw new Error("Expected 40 unique master designs");
 const output=[];
 for(const a of INDUSTRY_ACADEMIES){
  const selected=a.templates.map((id,i)=>{
   const m=index.get(id);
   if(!m)throw new Error("Unknown curated design "+id+" for "+a.id);
   const variant={
    ...m,brand:a.brand,category:a.industry,
    headline:i===0?a.tagline:a.header+" "+a.emphasis,
    subtitle:a.subtitle,
    cta:a.cta,services:[...a.services],
    accent:a.accent,path:"/academies/"+a.id+"/sites/"+id+"/"
   };
   return {base:m,variant};
  });
  if(selected.length!==6||new Set(a.templates).size!==6)throw new Error("Curated site identity error: "+a.id);
  const dir=join(root,"academies",a.id);
  await mkdir(dir,{recursive:true});
  await writeFile(join(dir,"index.html"),renderIndustryAcademy(a,selected),"utf8");
  for(const x of selected){
   const p=join(dir,"sites",x.base.id);
   await mkdir(p,{recursive:true});
   await writeFile(join(p,"index.html"),renderSite(x.variant,siteCss),"utf8");
  }
  output.push({id:a.id,name:a.name,path:"/academies/"+a.id+"/",templateIds:[...a.templates],sites:selected.map(x=>x.variant.path),preset:{
   brand:a.brand,industry:a.industry,headline:a.tagline,subtitle:a.subtitle,cta:a.cta,
   services:[...a.services],accent:a.accent},synthetic:true,formsConnected:false});
 }
 const hub=join(root,"academies");
 await mkdir(hub,{recursive:true});
 await writeFile(join(hub,"index.html"),renderAcademiesHub(),"utf8");
 await writeFile(join(hub,"registry.json"),JSON.stringify({version:1,kind:"educational_industry_editions",count:output.length,synthetic:true,academies:output},null,2)+"\n","utf8");
 return {academies:output.length,industryExamples:output.reduce((n,x)=>n+x.sites.length,0),registry:"/academies/registry.json"};
}
