import {mkdir, readFile, writeFile, copyFile} from "node:fs/promises";
import {resolve, join, dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {builderLayouts, digitalDominanceLayouts} from "./catalog.mjs";
import {writeIndustryAcademies} from "./industry-academies.mjs";

const srcRoot=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const dist=resolve(srcRoot,"dist/academy");
const esc=value=>String(value??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const human=id=>id.split("-").map(x=>x[0].toUpperCase()+x.slice(1)).join(" ");
const concepts=[
 ["Installation","A beautiful finish begins below the surface.","Surface Studio","Explore installations","Concrete transformations built around your space.",["Flooring systems","Surface preparation","Design consultation"],"#66e2c4"],
 ["Education","Learn the craft. Build your future.","Workshop Academy","Explore classes","Practice-led learning for the next generation of builders.",["Hands-on workshops","Equipment basics","Skills development"],"#edb77a"],
 ["Equipment","The right tools change everything.","Supply Modern","Explore equipment","An editorial storefront concept for specialized equipment.",["Surface tools","Machines and tooling","Training resources"],"#94aeff"],
 ["Legal","Confident guidance, clear next steps.","Counsel Studio","Learn about services","A professional services concept with clarity at its core.",["Consultations","Case evaluation","Client resources"],"#d8b88a"],
 ["Real Estate","Find a place that moves you.","North House","Browse spaces","Modern presentation for exceptional spaces and neighborhoods.",["Property discovery","Area guides","Personalized search"],"#b4e0b7"],
 ["Wellness","Make room for a better ritual.","Wellform","Explore experiences","A calming service presentation for mindful care.",["Private sessions","Guided programs","Wellness resources"],"#caa9ff"],
 ["Technology","Make your next move a smarter one.","Nexa Systems","Explore solutions","Complex technology, beautifully explained.",["Product strategy","Automation systems","Connected experiences"],"#6bbdff"],
 ["Architecture","Spaces with a point of view.","Form + Matter","View approach","Thoughtful architecture and curated design services.",["Concept development","Design planning","Material direction"],"#eea992"],
 ["Home Services","Better spaces start with better service.","Fieldcraft","Discover services","A premium starting point for a practical home-services brand.",["Project planning","Home upgrades","Service scheduling"],"#b5d7e8"],
 ["Creative","Ideas you can feel.","Atelier Nine","See what we do","Distinctive branding, content and creative direction.",["Brand identity","Digital design","Production"],"#e3a2d8"],
 ["Hospitality","A place worth arriving for.","Haven House","Explore the stay","An inviting hospitality concept built around discovery.",["Suites and stays","Curated experiences","Local guide"],"#f2c784"],
 ["Professional","Experience made accessible.","Clarity Partners","Explore expertise","An elegant professional-services website concept.",["Advisory","Planning","Client onboarding"],"#c3d2f7"],
 ["Data","Make every signal count.","Signal Works","Explore insights","A purposeful data product design with readable impact.",["Analytics","Dashboards","Reporting"],"#79e1dc"],
 ["Coaching","Progress starts with a plan.","Open Path","See programs","A guided-service template for better customer journeys.",["Discovery sessions","Guided programs","Resources"],"#b3c4ff"],
 ["SaaS","Your workflow, finally in sync.","Flow Pilot","Explore platform","A product-forward digital service landing page.",["Automations","Integrations","Workspace tools"],"#8be0ff"],
 ["Commerce","Details matter. Discover yours.","Object Atelier","Browse the collection","Quiet luxury meets a precise product showcase.",["Curated products","Personal selection","Product care"],"#ecd0a1"],
 ["Appointment","More possibilities, less waiting.","Bookwell","Explore sessions","A scheduling-oriented concept without live booking.",["Service menu","Availability guide","Preparation"],"#accbe9"],
 ["Portfolio","The work speaks.","Element Studio","View projects","A visual-first portfolio for services and products.",["Project gallery","Our process","Design services"],"#c1f0dc"],
 ["Consulting","A clear path from idea to execution.","Arc Advisory","Start exploring","Turn complex decisions into practical progress.",["Discovery","Planning","Execution"],"#d6a8ff"],
 ["Platform","One view. More possibilities.","Atlas Grid","Explore platform","A modular concept for a business platform or portal.",["Operations","Reporting","Workspaces"],"#85c5f3"]
];
function makeManifest(){
 const builder=builderLayouts.map((id,i)=>{
  const c=concepts[i]||concepts[0];
  return {id,index:i+1,name:human(id),category:c[0],headline:c[1],brand:c[2],
    cta:c[3],subtitle:c[4],services:c[5],accent:c[6],path:"/sites/"+id+"/",
    studio:"/studio/?template="+encodeURIComponent(id),source:"x1/websiteLayouts.js",
    recipe:digitalDominanceLayouts[i]?.name??null,ready:"demonstration",origin:"builder-layout"};
 });
 const recipes=digitalDominanceLayouts.map((recipe,i)=>{
  const c=concepts[(i+3)%concepts.length];
  const id="dd-"+String(recipe.id).toLowerCase().replace(/[^a-z0-9-]+/g,"-");
  return {id,index:i+builder.length+1,name:recipe.name+" Concept",category:c[0],
    headline:c[1],brand:c[2]+" Concept",cta:c[3],
    subtitle:"An educational interpretation of the "+recipe.name+" design recipe. "+c[4],
    services:c[5],accent:c[6],path:"/sites/"+id+"/",
    studio:"/studio/?template="+encodeURIComponent(id),
    source:"digital-dominance/templateLayouts.js",recipe:recipe.name,
    ready:"demonstration",origin:"recipe-interpretation"};
 });
 return [...builder,...recipes];
}
function renderSite(m,css){
 const motif=["columns","center","offset","edge","glass","poster","split","cascade","minimal","cards"][ (m.index-1)%10];
 const dark=[0,2,4,6,8,9].includes((m.index-1)%10);
 const theme=dark?"dark":"light";
 const features=m.services.map((service,i)=>'<article class="service"><span class="service-num">0'+(i+1)+'</span><h3 data-service="'+i+'">'+esc(service)+'</h3><p>Replace this demonstration with your verified services, examples and practical details.</p><a href="#how">Explore the process <span aria-hidden="true">↗</span></a></article>').join("");
 const visual='<div class="hero-art" aria-hidden="true"><div class="art-grid"></div><div class="art-halo"></div><div class="art-frame"><div class="art-chip"><span></span> MODULAR DESIGN SYSTEM</div><div class="art-orbit one"></div><div class="art-orbit two"></div><div class="art-core"><b>01</b><small>YOUR NEXT IDEA</small></div><div class="art-caption">DESIGNED TO BE REUSED <span>↗</span></div></div></div>';
 const callToAction='<a class="button button-primary" data-field="cta" href="#services">'+esc(m.cta)+' <span aria-hidden="true">↗</span></a>';
 return ['<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
  '<meta name="robots" content="noindex,nofollow"><meta name="generator" content="Strategic Minds Universal Factory Academy">',
  '<title>'+esc(m.brand)+' | '+esc(m.category)+' template</title><meta name="description" content="Fictional customizable website template example.">',
  '<style>'+css+'</style></head><body class="theme-'+theme+' motif-'+motif+'" style="--accent:'+m.accent+'">',
  '<div class="demo-ribbon">FICTIONAL TEMPLATE DEMO · REPLACE WITH VERIFIED BUSINESS CONTENT BEFORE RELEASE</div>',
  '<header class="site-header"><a href="#top" class="wordmark" data-field="brand">'+esc(m.brand)+'</a>',
  '<nav aria-label="Main navigation"><a href="#services">Services</a><a href="#how">Approach</a><a href="#faq">Questions</a></nav>',
  '<a href="#contact" class="nav-action">Start here <span>↗</span></a></header>',
  '<main id="top"><section class="hero"><div class="hero-content"><div class="eyebrow"><span class="signal"></span><span data-field="category">'+esc(m.category)+'</span> / DESIGN '+String(m.index).padStart(2,"0")+'</div>',
  '<h1 data-field="headline">'+esc(m.headline)+'</h1><p class="hero-description" data-field="subtitle">'+esc(m.subtitle)+'</p>',
  '<div class="hero-actions">'+callToAction+'<a class="text-link" href="#how">Our approach <span>↘</span></a></div>',
  '<div class="hero-meta"><span>SPECIMEN / '+esc(m.name.toUpperCase())+'</span><span class="meta-line"></span><span>DEMO EDITION</span></div></div>',
  visual,'</section>',
  '<section class="marquee" aria-label="Example capabilities"><span>YOUR BRAND</span><i>✳</i><span>YOUR SERVICES</span><i>✳</i><span>YOUR CONTENT</span><i>✳</i><span>YOUR STYLE</span></section>',
  '<section class="section-intro" id="services"><div class="section-kicker">01 / WHAT WE DO</div><div class="intro-grid"><h2>Thoughtful services.<br><em>Useful outcomes.</em></h2><p>This is a complete, editable website composition. Replace example offerings with useful information and legitimate service details for your business.</p></div></section>',
  '<section class="services">'+features+'</section>',
  '<section class="approach" id="how"><div class="approach-image"><div class="approach-glyph">✳</div><span>CRAFT + PURPOSE</span></div>',
  '<div class="approach-copy"><div class="section-kicker">02 / THE APPROACH</div><h2>Built around<br>what matters.</h2><p>A strong website is more than a polished first impression. Give visitors clear information, useful next steps, and a reason to trust what they see.</p>',
  '<div class="numbered"><div><b>01</b><span>Understand the real need</span></div><div><b>02</b><span>Make the solution easy to explore</span></div><div><b>03</b><span>Measure and improve</span></div></div></div></section>',
  '<section class="faq-section" id="faq"><div><div class="section-kicker">03 / QUESTIONS</div><h2>Good questions.<br><em>Clear answers.</em></h2></div>',
  '<div class="faq-stack"><details open><summary>Is this a real business website?</summary><p>No. This is a fictional working website template designed to show how the layout can be replicated.</p></details>',
  '<details><summary>Can I customize this for my industry?</summary><p>Yes. Open the Academy Studio to change the name, headline, services, location and brand colors, then export its HTML.</p></details>',
  '<details><summary>What must I do before launching for customers?</summary><p>Replace fictional information with verified facts, connect real customer contact workflows, check accessibility and legal requirements, and validate the final site.</p></details></div></section>',
  '<section class="final-panel" id="contact"><div class="section-kicker">04 / YOUR NEXT STEP</div><h2>Your next chapter<br>starts here.</h2><p>This demonstration does not accept contact submissions or generate leads. Connect your verified contact or booking system before release.</p>',
  '<a class="button button-outline" href="#top">Back to top <span>↑</span></a></section></main>',
  '<footer class="site-footer"><span class="wordmark" data-field="brand">'+esc(m.brand)+'</span><span>FICTIONAL EXAMPLE · NO SALES OR BOOKING</span><a href="#top">BACK TO TOP ↑</a></footer>',
  '</body></html>'].join("");
}
function academyHead(title){
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#090e15"><title>'+
 esc(title)+' | Strategic Minds AI</title><meta name="description" content="Learn to replicate, customize, validate and export reusable website templates with Universal Auto Builder and Digital Dominance."><link rel="stylesheet" href="/assets/academy.css"></head>';
}
function nav(active){
 return '<header class="academy-nav"><a class="brand" href="/"><span class="brandmark">S<span>✳</span></span><span>STRATEGIC MINDS<span class="brand-ai"> AI</span><small>UNIVERSAL FACTORY</small></span></a>'+
 '<nav aria-label="Academy navigation"><a '+(active==="gallery"?'aria-current="page" ':'')+'href="/#library">Template library</a><a href="/academies/">Industry academies</a><a '+(active==="learn"?'aria-current="page" ':'')+'href="/learn/">Learn generators</a><a '+(active==="studio"?'aria-current="page" ':'')+'href="/studio/">Build in studio</a></nav><a class="nav-cta" href="/studio/">Open Studio <span>↗</span></a></header>';
}
function foot(){
 return '<footer class="academy-footer"><div><b>STRATEGIC MINDS AI</b><p>Reusable designs. Governed launches. Real ownership.</p></div><div><a href="/#library">Library</a><a href="/academies/">Industry academies</a><a href="/learn/">Lessons</a><a href="/studio/">Studio</a><a href="https://github.com/Strategic-Minds-AI/universal-auto-builder-digital-dominance-template" rel="noopener noreferrer">Source ↗</a></div><small>Demonstration content is synthetic. Publication of customer-facing sites requires separate validation.</small></footer>';
}
function card(m){
 return '<article class="template-card" data-category="'+esc(m.category.toLowerCase())+'" data-name="'+esc((m.name+" "+m.brand+" "+m.category).toLowerCase())+'"><div class="template-browser"><div class="browser-controls"><span></span><span></span><span></span><em>'+esc(m.brand.toLowerCase().replace(/\W/g,""))+'.demo</em></div><div class="screen-frame"><iframe title="Actual '+esc(m.name)+' website preview" loading="lazy" tabindex="-1" src="'+m.path+'" sandbox="allow-same-origin"></iframe></div><a class="preview-cover" aria-label="Open full-page '+esc(m.name)+' preview" href="'+m.path+'" target="_blank" rel="noopener">View full-page preview ↗</a></div><div class="template-info"><div><small>DESIGN '+String(m.index).padStart(2,"0")+' / '+esc(m.category)+'</small><h3>'+esc(m.name)+'</h3></div><a class="mini-action" href="'+m.studio+'" aria-label="Customize '+esc(m.name)+'">Use design ↗</a></div><p class="template-note">'+esc(m.brand)+' · Full-page, editable demo</p></article>';
}
function home(manifest){
 const cards=manifest.map(card).join("");
 return academyHead("Universal Builder Academy")+'<body class="academy-body">'+nav("gallery")+
 '<main><section class="academy-hero"><div class="hero-metadata"><span class="live-dot"></span> THE UNIVERSAL SITE FACTORY <span class="hero-metadata-end">ACADEMY / EDITION 01</span></div>'+
 '<div class="hero-columns"><div class="hero-copy"><span class="eyeline">DESIGN. UNDERSTAND. REPLICATE.</span><h1>One great design.<br><em>Infinite directions.</em></h1><p>Explore real, working website templates. Choose the one you love, personalize it in the live studio, and take home your own independent website files.</p><div class="academy-actions"><a class="primary" href="#library">Explore the template library <span>↗</span></a><a class="quiet" href="/learn/">Learn how generators work <span>↗</span></a></div><div class="hero-proof"><span><b>40</b> runnable site concepts</span><span><b>20</b> Digital Dominance recipes</span><span><b>0</b> vendor lock-in to export</span></div></div>'+
 '<div class="hero-visual"><div class="visual-top"><span>LIVE SYSTEM / WEBSITE REPLICATOR</span><span>● ACTIVE</span></div><div class="visual-art"><div class="visual-disk"></div><div class="visual-window w1"><span>01 / SELECT</span><div class="v-line large"></div><div class="v-line"></div><div class="v-block"></div></div><div class="visual-window w2"><span>02 / CONFIGURE</span><div class="v-line large"></div><div class="v-line"></div><div class="v-grid"><i></i><i></i><i></i></div></div><div class="visual-window w3"><span>03 / EXPORT</span><div class="v-line large"></div><div class="v-line"></div><div class="v-block"></div></div></div><div class="visual-bottom"><span>FROM A SINGLE TEMPLATE TO YOUR OWN SYSTEM</span><span>↗</span></div></div></div></section>'+
 '<section class="workflow-strip" aria-label="How it works"><div><span>01</span><b>Discover</b><small>Pick the site design</small></div><i>↗</i><div><span>02</span><b>Customize</b><small>Make it your own</small></div><i>↗</i><div><span>03</span><b>Export</b><small>Own the HTML + settings</small></div><i>↗</i><div><span>04</span><b>Validate</b><small>Release with evidence</small></div></section>'+
 '<section class="library" id="library"><div class="section-label">THE SOURCE LIBRARY / 01</div><div class="section-heading"><div><h2>Find your next<br><em>starting point.</em></h2><p>Every preview below is an actual HTML website generated from our reusable template system, not a screenshot of an unrelated site.</p></div><div class="library-count">'+manifest.length+'<small>INDIVIDUAL REPLICABLE DESIGNS</small></div></div>'+
 '<div class="library-tools"><label class="search-wrap"><span>⌕</span><input id="templateSearch" type="search" placeholder="Search by style, business or category..." autocomplete="off"></label><div class="filter-controls"><button class="filter active" data-filter="all" type="button">All templates</button><button class="filter" data-filter="installation" type="button">Installation</button><button class="filter" data-filter="education" type="button">Education</button><button class="filter" data-filter="equipment" type="button">Equipment</button><button class="filter" data-filter="technology" type="button">Technology</button></div></div>'+
 '<div class="template-grid" id="templateGrid">'+cards+'</div><p class="no-results" id="noResults" hidden>No templates match your search. Clear the filter to explore all designs.</p></section>'+
 '<section class="academy-editions-promo"><div><span class="section-label">NEW / SIX SPECIALIZED FACTORIES</span><h2>One engine. <em>Six different worlds.</em></h2><p>Epoxy, personal-injury law, real estate, industrial equipment, hands-on education and AI systems. Each edition includes six tailored full-page website examples, specific teaching guides, and individual export in the Studio.</p><a class="primary" href="/academies/">Explore six industry academies ↗</a></div><div class="promo-art" aria-hidden="true"><span>01 / EPOXY</span><span>02 / LEGAL</span><span>03 / PROPERTY</span><span>04 / EQUIPMENT</span><span>05 / TRAINING</span><span>06 / AI SYSTEMS</span></div></section>'+
 '<section class="teacher-section"><div class="teacher-card"><div><span class="section-label">THE GENERATOR PLAYBOOK / 02</span><h2>Learn the machine.<br><em>Keep the magic.</em></h2><p>Step-by-step lessons explain templates, generators, SitePacks, preview deployment, and why approval and QA matter before multiplying websites.</p><a class="primary" href="/learn/">Enter the learning lab ↗</a></div><div class="teacher-diagram"><span>IDEA</span><i>↓</i><span>TEMPLATE + CONFIG</span><i>↓</i><span>RENDER + PREVIEW</span><i>↓</i><span>QA + APPROVAL</span><i>↓</i><strong>YOUR SITE</strong></div></div></section>'+
 '<section class="academy-closing"><span>YOUR NEXT WEBSITE STARTS WITH A CHOICE.</span><h2>Choose the design.<br>Own what comes next.</h2><a class="primary" href="/studio/">Open the Studio ↗</a></section></main>'+foot()+
 '<script src="/assets/academy.js" defer></script></body></html>';
}
function studio(manifest){
 const opts=manifest.map(m=>'<option value="'+esc(m.id)+'">'+esc(m.index+". "+m.name+" · "+m.category)+'</option>').join("");
 return academyHead("Website Replication Studio")+'<body class="academy-body studio-body">'+nav("studio")+'<main class="studio-page"><div class="studio-head"><div><span class="section-label">DESIGN LAB / INDIVIDUAL REPLICATION</span><h1>Make it <em>yours.</em></h1><p>Choose a template, make live edits, then download an independent HTML website. No code or account required.</p></div><a href="/learn/#lesson-3" class="quiet">How this works ↗</a></div>'+
 '<div class="studio-shell"><aside class="studio-sidebar"><div class="control-heading"><span>01 / CHOOSE YOUR DESIGN</span><span class="control-status">LOCAL / UNSAVED</span></div>'+
 '<label for="designSelect">Website template</label><select id="designSelect">'+opts+'</select><a id="fullPreview" target="_blank" rel="noopener" href="/sites/centered/">View untouched original ↗</a>'+
 '<hr><div class="control-heading"><span>02 / CUSTOMIZE</span><span>LIVE PREVIEW</span></div>'+
 '<label for="brand">Business name</label><input id="brand" maxlength="70" value="Your Business" autocomplete="off">'+
 '<label for="headline">Main headline</label><textarea id="headline" rows="2" maxlength="130"></textarea>'+
 '<label for="subtitle">Description</label><textarea id="subtitle" rows="3" maxlength="240"></textarea>'+
 '<label for="category">Industry / category</label><input id="category" maxlength="55">'+
 '<label for="cta">Primary button</label><input id="cta" maxlength="48">'+
 '<label for="service0">Service one</label><input id="service0" maxlength="75">'+
 '<label for="service1">Service two</label><input id="service1" maxlength="75">'+
 '<label for="service2">Service three</label><input id="service2" maxlength="75">'+
 '<label for="accent">Brand accent</label><div class="color-row"><input id="accent" type="color" value="#66e2c4"><span id="colorLabel">#66e2c4</span></div>'+
 '<div class="studio-note"><b>Important</b><p>The generated template is a demo. Replace all synthetic content and integrate verified forms, consent, privacy, SEO and lead-routing before using it for customers.</p></div></aside>'+
 '<div class="studio-main"><div class="studio-toolbar"><div class="live-indicator"><span></span>LIVE WEBSITE PREVIEW</div><div class="device-modes"><button type="button" class="mode active" data-device="desktop">Desktop</button><button type="button" class="mode" data-device="tablet">Tablet</button><button type="button" class="mode" data-device="mobile">Mobile</button></div><button id="reset" class="reset-btn" type="button">Reset ↺</button></div><div class="studio-canvas"><div class="studio-device desktop" id="studioDevice"><div class="studio-browserbar"><span>● ● ●</span><span>LOCAL TEMPLATE PREVIEW</span><span>↗</span></div><iframe title="Live customizable website" id="studioPreview" sandbox="allow-same-origin" referrerpolicy="no-referrer"></iframe></div></div><div class="studio-download"><div><h3>Your website, your files.</h3><p>Export individual designs. The browser builds these downloads locally without collecting data.</p><span id="studioFeedback" role="status" aria-live="polite"></span></div><div class="export-buttons"><button id="downloadHtml" class="primary" type="button">Download website HTML ↓</button><button id="downloadJson" class="secondary" type="button">Download config JSON ↓</button><button id="copyPrompt" class="secondary" type="button">Copy generator prompt ↗</button></div></div></div></div></main>'+foot()+
 '<script src="/assets/studio.js" defer></script></body></html>';
}
function lesson(number,title,copy,how,example){
 return '<article class="lesson-card" id="lesson-'+number+'"><div class="lesson-number">'+String(number).padStart(2,"0")+'</div><div class="lesson-body"><h2>'+esc(title)+'</h2><p>'+esc(copy)+'</p><h3>Do this</h3><p>'+esc(how)+'</p><div class="lesson-example"><b>EXAMPLE</b><p>'+esc(example)+'</p></div></div></article>';
}
function learn(){
 return academyHead("Learn website generators")+'<body class="academy-body">'+nav("learn")+'<main><section class="learn-hero"><div class="section-label">THE EDUCATIONAL PLAYBOOK</div><h1>Understand generators.<br><em>Build with intention.</em></h1><p>A practical field guide to turning a single quality website design into reusable business websites without creating thin duplicates or losing control of the details.</p><div class="learn-nav"><a href="#lesson-1">01 Templates</a><a href="#lesson-2">02 Generators</a><a href="#lesson-3">03 Replication</a><a href="#lesson-4">04 SitePacks</a><a href="#lesson-5">05 QA & launch</a></div></section>'+
 '<section class="lesson-stack">'+
 lesson(1,"Template ≠ generator","A template is the reusable design and layout. A generator is the software that combines a template with structured content and rules to create a new site.","Choose any of the 20 designs in the library and open its full-page site before editing anything.","A legal landing page and an equipment catalog may share infrastructure but need different content, navigation and user journeys.")+
 lesson(2,"How a website generator works","The generator reads a design ID, your brand data, industry-specific sections and a set of allowed options. It renders the result to an actual webpage, which can be tested before launch.","Select a design in the Studio, change the headline and color, and watch the iframe update. That is a miniature deterministic generator.","Template: split-left + brand: Example Flooring + offer: verified services + accent: emerald → independent HTML output.")+
 lesson(3,"Replicate one site you like","Start from one exact template ID instead of changing the design to something else. Copy that design into its own project, customize the content and download its HTML.","Click Use design on a gallery card. Change the name, headline, three services and color. Download website HTML, then open it in a browser without the Academy.","Start with the Equipment layout for Client A. Reopen the same layout to create Client B without editing or replacing Client A.")+
 lesson(4,"Structured SitePacks and recipes","A SitePack is a versioned configuration contract with provenance, brand, industry, verified service area, design tokens and release rules. The Digital Dominance recipes describe section strategies, not 20 additional finished websites.","Export config JSON from Studio to preserve your choices. For automated batch provisioning, map approved facts into the separate canonical SitePack schema and run the repository validator.","One location with verified coverage → generate one noindex preview → inspect → approve; do not publish hundreds of city-swap pages.")+
 lesson(5,"Quality gates before launch","A good website must have truthful content, useful functionality, accessible markup, working links/forms, privacy/consent, correct meta and schema, verified ownership and measurable results.","Test mobile and desktop previews, replace synthetic copy, connect your own backend, check privacy and SEO, then authorize an actual deployment.","A landing page that says 'Book now' must have a genuinely working, approved booking path, not a decorative button.")+
 '</section><section class="recipe-section"><div><span class="section-label">PRACTICAL STARTERS</span><h2>Try these three paths.</h2></div><div class="recipe-grid"><article><span>01 / SERVICE BUSINESS</span><h3>Epoxy installation</h3><p>Use split-left, add verified preparation and coating information, show real project photos, then connect a legitimate estimate flow.</p><a href="/studio/?template=split-left">Open in Studio ↗</a></article><article><span>02 / TRAINING</span><h3>Hands-on academy</h3><p>Use centered or timeline, outline actual course outcomes, dates, instructor background, and an authorized enrollment system.</p><a href="/studio/?template=timeline">Open in Studio ↗</a></article><article><span>03 / EQUIPMENT</span><h3>Tool supplier</h3><p>Use product-focus, create a truthful product catalog and specifications, then connect approved inventory and checkout services.</p><a href="/studio/?template=product-focus">Open in Studio ↗</a></article></div></section><div class="learn-bottom"><h2>Ready to build the first one?</h2><a class="primary" href="/studio/">Go to the Studio ↗</a></div></main>'+foot()+'</body></html>';
}
async function main(){
 const css=await readFile(join(srcRoot,"academy/site.css"),"utf8");
 const manifest=makeManifest();
 for(const m of manifest){
  const dir=join(dist,"sites",m.id);
  await mkdir(dir,{recursive:true});
  await writeFile(join(dir,"index.html"),renderSite(m,css),"utf8");
 }
 for(const d of ["assets","studio","learn"]) await mkdir(join(dist,d),{recursive:true});
 await Promise.all(["academy.css","academy.js","studio.js","industry-academies.css"].map(x=>copyFile(join(srcRoot,"academy",x),join(dist,"assets",x))));
 await writeFile(join(dist,"manifest.json"),JSON.stringify({version:1,source:"Strategic Minds authorized donor templates",previewOnly:true,templates:manifest,recipes:digitalDominanceLayouts},null,2),"utf8");
 await writeFile(join(dist,"index.html"),home(manifest),"utf8");
 await writeFile(join(dist,"studio/index.html"),studio(manifest),"utf8");
 await writeFile(join(dist,"learn/index.html"),learn(),"utf8");
 const editions=await writeIndustryAcademies(manifest,dist,renderSite,css);
 await writeFile(join(dist,"robots.txt"),"User-agent: *\nAllow: /\nDisallow: /sites/\nDisallow: /studio/\nDisallow: /academies/*/sites/\n","utf8");
 console.log("Academy build generated "+manifest.length+" complete noindex preview websites, "+digitalDominanceLayouts.length+" recipes, live studio and lessons in dist/academy; plus "+editions.academies+" industry academies with "+editions.industryExamples+" tailored website previews");
}
main().catch(e=>{console.error(e);process.exitCode=1;});
