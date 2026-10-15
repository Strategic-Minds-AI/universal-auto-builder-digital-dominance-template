import { WEBSITE_LAYOUTS, renderWebsiteLayout } from "./donors/x1/websiteLayouts.js";
import { TEMPLATE_LAYOUTS } from "./donors/digital-dominance/templateLayouts.js";
export const builderLayouts = Object.freeze(Object.keys(WEBSITE_LAYOUTS));
export const digitalDominanceLayouts = Object.freeze(TEMPLATE_LAYOUTS.map(l => Object.freeze({
  id: String(l.id), name: String(l.name), description: String(l.description || ""),
  trend: String(l.trend || ""), sections: Array.isArray(l.sections) ? [...l.sections] : []
})));
export function renderSyntheticLayout(layout) {
  if (!builderLayouts.includes(layout)) throw new Error("Unknown layout: " + layout);
  return renderWebsiteLayout({
    layout, name:"SYNTHETIC DEMO", head:"Evidence-driven websites",
    sub:"Visual preview only. No real customer or location claims.",cta:"Explore",
    accent:"#38bdf8",tone:"#0b1523",ink:"#e8eef7",bg:"#0b1523"
  });
}
