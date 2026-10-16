import test from "node:test";
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {readFile, readdir} from "node:fs/promises";
import {resolve} from "node:path";
const dist=resolve("dist/academy");
test("academy builds independently with all source templates",async()=>{
 const output=execFileSync(process.execPath,["src/academy.mjs"],{encoding:"utf8"});
 assert.match(output,/40 complete noindex preview websites, 20 recipes/);
 const manifest=JSON.parse(await readFile(resolve(dist,"manifest.json"),"utf8"));
 assert.equal(manifest.templates.length,40);
 assert.equal(manifest.recipes.length,20);
 assert.equal(new Set(manifest.templates.map(x=>x.id)).size,40);
 const folders=await readdir(resolve(dist,"sites"));
 assert.equal(folders.length,40);
 const page=await readFile(resolve(dist,"index.html"),"utf8");
 assert.match(page,/One great design/);
 assert.equal((page.match(/class="template-card"/g)||[]).length,40);
 assert.match(page,/iframe/);
 const studio=await readFile(resolve(dist,"studio/index.html"),"utf8");
 for(const id of ["designSelect","studioPreview","downloadHtml","downloadJson","copyPrompt","brand","accent"])assert.match(studio,new RegExp('id="'+id+'"'));
 const lesson=await readFile(resolve(dist,"learn/index.html"),"utf8");
 for(let i=1;i<=5;i++)assert.match(lesson,new RegExp('id="lesson-'+i+'"'));
});
test("each generated example is a complete self-contained noindex website",async()=>{
 const data=JSON.parse(await readFile(resolve(dist,"manifest.json"),"utf8"));
 for(const m of data.templates){
  const html=await readFile(resolve(dist,"sites",m.id,"index.html"),"utf8");
  assert.match(html,/<meta name="robots" content="noindex,nofollow">/);
  assert.match(html,/<style>/);
  assert.match(html,/data-field="brand"/);
  assert.match(html,/data-field="headline"/);
  assert.match(html,/data-service="2"/);
  assert.match(html,/id="contact"/);
  assert.match(html,/<details open>/);
  assert.match(html,/<nav aria-label="Main navigation">/);
  assert.match(html,/FICTIONAL TEMPLATE DEMO/);
  assert.ok(html.length>9000,"complete HTML for "+m.id);
 }
 const robots=await readFile(resolve(dist,"robots.txt"),"utf8");
 assert.match(robots,/Disallow: \/sites\//);
 assert.match(robots,/Disallow: \/studio\//);
});
test("studio export features and source are local and explicit",async()=>{
 const js=await readFile(resolve(dist,"assets/studio.js"),"utf8");
 for(const required of ["document.createElement","srcdoc","JSON.stringify","URL.createObjectURL","copyPrompt","downloadHtml","downloadJson"])assert.ok(js.includes(required),required);
 assert.doesNotMatch(js,/fetch\(["']https?:\/\/|localStorage|sessionStorage/);
 const conf=JSON.parse(await readFile(resolve("vercel.json"),"utf8"));
 assert.equal(conf.outputDirectory,"dist/academy");
 assert.equal(conf.buildCommand,"npm run build");
});


test("six independent industry academy routes and 36 complete tailored previews",async()=>{
 const registry=JSON.parse(await readFile(resolve(dist,"academies/registry.json"),"utf8"));
 assert.equal(registry.count,6);
 assert.equal(registry.academies.length,6);
 assert.equal(new Set(registry.academies.map(a=>a.id)).size,6);
 const hub=await readFile(resolve(dist,"academies/index.html"),"utf8");
 assert.match(hub,/Six different worlds/);
 assert.equal((hub.match(/class="ia-hub-card /g)||[]).length,6);
 const root=await readFile(resolve(dist,"index.html"),"utf8");
 assert.match(root,/href="\/academies\/"/);
 assert.match(root,/six industry academies/);
 let count=0;
 for(const a of registry.academies){
  assert.equal(a.synthetic,true);
  assert.equal(a.formsConnected,false);
  assert.equal(a.templateIds.length,6);
  assert.equal(new Set(a.templateIds).size,6);
  assert.equal(a.sites.length,6);
  const landing=await readFile(resolve(dist,"academies",a.id,"index.html"),"utf8");
  assert.match(landing,/name="robots" content="noindex,follow"/);
  assert.match(landing,/THE SPECIALIST PLAYBOOK/);
  assert.match(landing,/ia-preview-grid/);
  assert.equal((landing.match(/class="ia-preview-card"/g)||[]).length,6);
  assert.match(landing,new RegExp('academy='+a.id));
  for (const id of a.templateIds){
    const html=await readFile(resolve(dist,"academies",a.id,"sites",id,"index.html"),"utf8");
    assert.match(html,/<meta name="robots" content="noindex,nofollow">/);
    assert.match(html,/FICTIONAL TEMPLATE DEMO/);
    assert.match(html,/data-field="brand"/);
    assert.match(html,/data-field="headline"/);
    assert.match(html,/id="services"/);
    assert.ok(html.length>9000,a.id+"/"+id+" full page");
    count++;
  }
 }
 assert.equal(count,36);
 const css=await readFile(resolve(dist,"assets/industry-academies.css"),"utf8");
 assert.match(css,/ia-theme-verdict/);
 assert.match(css,/@media\(max-width:660px\)/);
 const studioJs=await readFile(resolve(dist,"assets/studio.js"),"utf8");
 assert.match(studioJs,/activeAcademy/);
 assert.match(studioJs,/academies\/registry\.json/);
 assert.match(studioJs,/activeAcademy\.preset/);
 const robots=await readFile(resolve(dist,"robots.txt"),"utf8");
 assert.match(robots,/Disallow: \/academies\/\*\/sites\//);
 const cfg=JSON.parse(await readFile(resolve("vercel.json"),"utf8"));
 assert.ok(cfg.headers.some(x=>x.source.includes("/academies/")&&x.headers.some(h=>h.key==="X-Robots-Tag")));
});
