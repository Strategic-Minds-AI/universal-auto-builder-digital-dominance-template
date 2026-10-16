(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const inputs = ["brand","headline","subtitle","category","cta","service0","service1","service2","accent"];
  const select = $("designSelect");
  const frame = $("studioPreview");
  const feedback = $("studioFeedback");
  let manifest = [];
  let activeAcademy = null;
  let current = null;
  let originalHtml = "";
  let renderedHtml = "";
  function notice(message) {
    if (feedback) feedback.textContent = message;
  }
  function escapeFilename(name) {
    return (name || "your-site").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60) || "your-site";
  }
  function setFields(data) {
    $("brand").value = data.brand;
    $("headline").value = data.headline;
    $("subtitle").value = data.subtitle;
    $("category").value = data.category;
    $("cta").value = data.cta;
    for (let i=0;i<3;i++) $("service"+i).value = data.services[i] || "";
    $("accent").value = data.accent;
    $("colorLabel").textContent = data.accent.toUpperCase();
  }
  function config(){
    if (!current) return null;
    return {
      generator: "Strategic Minds AI / Universal Site Factory Academy",
      format: "studio-config-v1",
      template_id: current.id,
      industry_academy: activeAcademy?.id || null,
      donor: current.source,
      brand: $("brand").value.trim(),
      industry: $("category").value.trim(),
      headline: $("headline").value.trim(),
      subtitle: $("subtitle").value.trim(),
      cta: $("cta").value.trim(),
      services: [0,1,2].map(i=>$("service"+i).value.trim()),
      accent: $("accent").value,
      synthetic: true,
      publication_status: "requires_real_business_facts_and_approval",
      reminder: "This studio file is not a validated canonical SitePack, live lead funnel, or proof of local serviceability."
    };
  }
  function render(){
    if (!current || !originalHtml) return;
    const values = config();
    const doc = new DOMParser().parseFromString(originalHtml,"text/html");
    for (const key of ["brand","headline","subtitle","category","cta"]) {
      doc.querySelectorAll('[data-field="'+key+'"]').forEach(el=>{el.textContent=values[key]||"";});
    }
    for (let i=0;i<3;i++) doc.querySelectorAll('[data-service="'+i+'"]').forEach(el=>{el.textContent=values.services[i]||"";});
    doc.body.style.setProperty("--accent",values.accent);
    doc.title = values.brand+" | "+values.industry+" template";
    const description = doc.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content",values.subtitle);
    renderedHtml = "<!doctype html>\n"+doc.documentElement.outerHTML;
    frame.srcdoc = renderedHtml;
    $("colorLabel").textContent=values.accent.toUpperCase();
  }
  async function loadDesign(id) {
    const selected = manifest.find(m=>m.id===id);
    if (!selected) throw new Error("That template is not in the approved gallery.");
    current=selected;
    select.value=id;
    const previewLink=$("fullPreview");
    const scopedPath=activeAcademy && activeAcademy.templateIds.includes(id)
      ? "/academies/"+encodeURIComponent(activeAcademy.id)+"/sites/"+encodeURIComponent(id)+"/"
      : selected.path;
    previewLink.href=scopedPath;
    setFields(activeAcademy?{...selected,...activeAcademy.preset}:selected);
    originalHtml="";
    notice("Loading the original working website...");
    const response=await fetch(scopedPath+"index.html",{cache:"no-cache"});
    if (!response.ok) throw new Error("Template could not load (HTTP "+response.status+").");
    const html=await response.text();
    if (!html.includes("data-field=") || !html.includes('name="robots"')) throw new Error("The source template failed structural validation.");
    originalHtml=html;
    render();
    notice(activeAcademy?"Ready with the "+activeAcademy.name+" preset. This example is fictional; export before publishing.":"Ready. Your changes remain in this browser until you export them.");
    const url=new URL(location.href);
    url.searchParams.set("template",id);
    history.replaceState({template:id},"",url.toString());
  }
  function download(filename,contents,type){
    const blob=new Blob([contents],{type:type||"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;link.download=filename;link.style.display="none";
    document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),2500);
  }
  async function copyPrompt(){
    const data=config();if(!data)return;
    const prompt=[
      "Using my authorized Universal Auto Builder + Digital Dominance template,",
      "replicate the EXACT selected design (do not redesign).",
      "Template ID: "+data.template_id+".",
      "Industry academy: "+(data.industry_academy || "Universal master library")+".",
      "Brand: "+data.brand+". Industry: "+data.industry+".",
      "Headline: "+data.headline+". Description: "+data.subtitle+".",
      "CTA label: "+data.cta+".",
      "Services: "+data.services.filter(Boolean).join("; ")+".",
      "Accent: "+data.accent+".",
      "Create a complete, accessible, responsive website based on this source layout.",
      "Keep demo content noindex and do not publish, fabricate offices, reviews, services or evidence.",
      "Before public launch, verify real business details, functional forms, attribution and release approval."
    ].join("\n");
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard not available in this browser. Export JSON instead.");
    await navigator.clipboard.writeText(prompt);
    notice("Generator prompt copied. Use it with your approved website-building workflow.");
  }
  async function init(){
    try{
      const response=await fetch("/manifest.json",{cache:"no-cache"});
      if (!response.ok)throw new Error("Gallery manifest could not be loaded.");
      const data=await response.json();
      manifest=data.templates||[];
      if (manifest.length!==40)throw new Error("Expected the approved 40-template catalog.");
      const params=new URLSearchParams(location.search);
      const academyId=params.get("academy");
      if(academyId){
        const registryResponse=await fetch("/academies/registry.json",{cache:"no-cache"});
        if(!registryResponse.ok) throw new Error("Industry academy registry unavailable.");
        const registry=await registryResponse.json();
        activeAcademy=(registry.academies||[]).find(x=>x.id===academyId)||null;
        if(!activeAcademy)throw new Error("Unknown industry academy preset.");
      }
      const chosen=params.get("template") || activeAcademy?.templateIds[0] || manifest[0].id;
      await loadDesign(manifest.some(x=>x.id===chosen)?chosen:manifest[0].id);
    }catch(e){notice("Error: "+e.message);}
  }
  select.addEventListener("change",async e=>{
    try {await loadDesign(e.target.value);}catch(error){notice("Error: "+error.message);}
  });
  for (const name of inputs)$(name).addEventListener("input",render);
  $("reset").addEventListener("click",()=>{
    if(!current)return;
    setFields(activeAcademy?{...current,...activeAcademy.preset}:current);
    render();
    notice(activeAcademy?"Restored the "+activeAcademy.name+" example preset.":"Restored the original "+current.name+" demonstration.");
  });
  for (const button of document.querySelectorAll("[data-device]"))button.addEventListener("click",()=>{
    for (const item of document.querySelectorAll("[data-device]"))item.classList.toggle("active",item===button);
    $("studioDevice").className="studio-device "+button.dataset.device;
  });
  $("downloadHtml").addEventListener("click",()=>{
    if(!renderedHtml||!current){notice("Load a design before exporting.");return;}
    download(escapeFilename($("brand").value)+"-"+current.id+".html",renderedHtml,"text/html;charset=utf-8");
    notice("Website HTML downloaded. Open the file locally to preview the standalone site.");
  });
  $("downloadJson").addEventListener("click",()=>{
    const data=config();
    if(!data){notice("Load a design before exporting.");return;}
    download(escapeFilename(data.brand)+"-"+data.template_id+".json",JSON.stringify(data,null,2)+"\n","application/json;charset=utf-8");
    notice("Configuration exported. Keep it with the HTML to reproduce your edits.");
  });
  $("copyPrompt").addEventListener("click",()=>copyPrompt().catch(e=>notice("Copy failed: "+e.message)));
  init();
})();
