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
