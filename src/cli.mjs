#!/usr/bin/env node
// Local-only CLI: reads JSON and writes synthetic HTML. No network calls.
import {readFile} from "node:fs/promises";
import {validateSitePack} from "./validate.mjs";
import {writePreviewBatch,writeGallery} from "./preview.mjs";
import {builderLayouts,digitalDominanceLayouts} from "./catalog.mjs";
import {createPreviewJob} from "./job-contract.mjs";
const [cmd,source,out]=process.argv.slice(2);
try {
  if (cmd==="layouts") {
    console.log(JSON.stringify({visual_layouts:builderLayouts,digital_dominance_recipes:digitalDominanceLayouts},null,2));
  } else if (cmd==="gallery") {
    console.log(JSON.stringify(await writeGallery(source||"dist/gallery"),null,2));
  } else if (["validate","preview","job"].includes(cmd)) {
    if (!source) throw new Error("Missing input SitePack JSON file");
    const pack=JSON.parse(await readFile(source,"utf8"));
    if(cmd==="validate") {
      const result=validateSitePack(pack);
      console.log(JSON.stringify(result,null,2));
      if(!result.valid) process.exitCode=1;
    } else if(cmd==="preview") {
      console.log(JSON.stringify(await writePreviewBatch(pack,out||"dist/preview"),null,2));
    } else {
      const result=createPreviewJob(pack,pack.locations?.[0],"synthetic-local-test-tenant");
      console.log(JSON.stringify(result,null,2));
    }
  } else {
    console.error("Usage: node src/cli.mjs layouts | gallery [out] | validate <pack.json> | preview <pack.json> [out] | job <pack.json>");
    process.exitCode=2;
  }
} catch(err) {console.error("BLOCKED: "+err.message);process.exitCode=1;}
