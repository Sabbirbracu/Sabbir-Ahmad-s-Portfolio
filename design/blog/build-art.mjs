// Generates the blog's diagrams (SVG, served from /public/blog/<slug>/) and cover images (PNG, because
// social networks do not accept SVG for link previews).
//
//   node design/blog/build-art.mjs
//
// Edit the text/geometry below and re-run to update the artwork.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { COVERS, cover } from "./covers.mjs";
import { arrow, badge, C, path as pathEl, rect, svg, text } from "./lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/blog");
const write = (slug, name, content) => {
  const dir = path.join(root, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), content);
};

/* ====================================================================== */
/* Covers (1200x630 PNG): definitions live in covers.mjs                    */
/* ====================================================================== */
for (const c of COVERS) {
  write(c.slug, "cover.png", await sharp(Buffer.from(cover(c))).png({ compressionLevel: 9 }).toBuffer());
}

/* ====================================================================== */
/* AI integration                                                          */
/* ====================================================================== */
{
  const slug = "ai-integration-for-modern-businesses";

  // 1. Value matrix
  let b = text(50, 62, "Where AI integration pays off", { size: 32, weight: 800 }) + text(50, 98, "Task volume vs. the cost of a wrong answer", { size: 21, fill: C.muted });
  const gx = 150, gy = 130, qw = 500, qh = 215;
  const quad = (x, y, fill, stroke, head, lines) =>
    rect(x, y, qw, qh, { fill, stroke, r: 14 }) + text(x + 28, y + 48, head, { size: 27, weight: 800 }) + text(x + 28, y + 90, lines, { size: 20, fill: C.muted, lh: 1.5 });
  b += quad(gx, gy, C.redSoft, "#e7b9af", "Keep it human-led", ["Legal judgment calls", "Medical or financial advice", "One-off strategy decisions"]);
  b += quad(gx + qw + 10, gy, C.amberSoft, "#ecd08a", "Assist, with human review", ["Contract clause extraction", "Claims and refund triage", "Compliance summaries"]);
  b += quad(gx, gy + qh + 10, C.grey, C.line, "Probably not worth it", ["Rare internal notes", "Anything a template solves", "Low-volume busywork"]);
  b += quad(gx + qw + 10, gy + qh + 10, C.greenSoft, C.green, "Automate", ["Support ticket tagging & routing", "Drafting replies for approval", "Search and summaries over your docs"]);
  b += text(gx + qw + 5, 598 + 28, "Task volume", { size: 21, weight: 700, anchor: "middle", fill: C.muted }) + text(gx, 598 + 28, "Low", { size: 19, fill: C.muted }) + text(gx + 2 * qw + 10, 598 + 28, "High", { size: 19, fill: C.muted, anchor: "end" });
  b += text(60, gy + qh + 5, "Cost of a wrong answer", { size: 21, weight: 700, anchor: "middle", fill: C.muted, rotate: -90 }) + text(122, gy + 30, "High", { size: 19, fill: C.muted, anchor: "end" }) + text(122, gy + 2 * qh + 4, "Low", { size: 19, fill: C.muted, anchor: "end" });
  write(slug, "value-matrix.svg", svg(1200, 665, b, "Matrix of task volume against cost of a wrong answer, showing which tasks to automate, assist, keep human-led, or skip"));

  // 2. Pipeline
  const steps = [["Trigger", "Ticket, email,", "or form"], ["Retrieve", "Search your", "docs & data"], ["Model", "Draft, classify,", "or extract"], ["Validate", "Schema checks +", "business rules"], ["Gate", "Is it safe to", "act on?"]];
  b = text(50, 62, "An AI step inside a real workflow", { size: 32, weight: 800 }) + text(50, 98, "The model is one stage, surrounded by checks", { size: 21, fill: C.muted });
  const bw = 196, gap = 36, x0 = 50, by = 140, bh = 128;
  steps.forEach((s, i) => {
    const x = x0 + i * (bw + gap);
    const hot = i === 2;
    b += rect(x, by, bw, bh, { fill: hot ? C.green : C.card, stroke: hot ? C.green : C.line, r: 14 });
    b += badge(x + 28, by + 30, i + 1, { fill: hot ? C.amber : C.green });
    b += text(x + 54, by + 38, s[0], { size: 25, weight: 800, fill: hot ? "#fff" : C.ink });
    b += text(x + 22, by + 82, s.slice(1), { size: 19, fill: hot ? "#d4efe3" : C.muted, lh: 1.35 });
    if (i < steps.length - 1) b += arrow(x + bw + 4, by + bh / 2, x + bw + gap - 4, by + bh / 2, { sw: 3 });
  });
  const gateX = x0 + 4 * (bw + gap) + bw / 2; // centre of step 5
  const hiX = 560, loX = 860, ow = 270, oy = 334, oh = 92;
  // gate -> split line -> two outcome boxes
  b += `<line x1="${gateX}" y1="${by + bh + 4}" x2="${gateX}" y2="${by + bh + 34}" stroke="${C.muted}" stroke-width="3"/>`;
  b += `<line x1="${hiX + ow / 2}" y1="${by + bh + 34}" x2="${gateX}" y2="${by + bh + 34}" stroke="${C.muted}" stroke-width="3"/>`;
  b += `<line x1="${loX + ow / 2}" y1="${by + bh + 34}" x2="${gateX}" y2="${by + bh + 34}" stroke="${C.muted}" stroke-width="3"/>`;
  b += arrow(hiX + ow / 2, by + bh + 34, hiX + ow / 2, oy - 4, { green: true }) + arrow(loX + ow / 2, by + bh + 34, loX + ow / 2, oy - 4, {});
  b += rect(hiX, oy, ow, oh, { fill: C.greenSoft, stroke: C.green });
  b += text(hiX + ow / 2, oy + 38, "High confidence", { size: 22, weight: 800, anchor: "middle", fill: C.green }) + text(hiX + ow / 2, oy + 70, "Apply automatically", { size: 20, anchor: "middle", fill: C.muted });
  b += rect(loX, oy, ow, oh, { fill: C.amberSoft, stroke: "#ecd08a" });
  b += text(loX + ow / 2, oy + 38, "Low confidence", { size: 22, weight: 800, anchor: "middle", fill: "#9a6a00" }) + text(loX + ow / 2, oy + 70, "Route to a human", { size: 20, anchor: "middle", fill: C.muted });
  // outcomes -> merge -> system of record
  const mid = (hiX + ow / 2 + loX + ow / 2) / 2, my = oy + oh + 30, sy = my + 22;
  b += `<line x1="${hiX + ow / 2}" y1="${oy + oh}" x2="${hiX + ow / 2}" y2="${my}" stroke="${C.green}" stroke-width="3"/><line x1="${loX + ow / 2}" y1="${oy + oh}" x2="${loX + ow / 2}" y2="${my}" stroke="${C.muted}" stroke-width="3"/>`;
  b += `<line x1="${hiX + ow / 2}" y1="${my}" x2="${loX + ow / 2}" y2="${my}" stroke="${C.muted}" stroke-width="3"/>` + arrow(mid, my, mid, sy + 4, {});
  b += rect(mid - 200, sy + 6, 400, 64, { fill: C.card, stroke: C.ink, sw: 2.5 }) + text(mid, sy + 48, "System of record", { size: 25, weight: 800, anchor: "middle" });
  // explanatory note in the free space on the left
  b += rect(50, 306, 440, 230, { fill: C.card }) + text(76, 346, "Why this shape?", { size: 22, weight: 800 });
  b += text(76, 384, ["Validate before you trust anything", "the model says.", "", "Low-confidence work goes to people,", "not to production.", "", "Every decision leaves a trail."], { size: 19, fill: C.muted, lh: 1.32 });
  b += rect(50, 566, 1100, 60, { fill: C.night, stroke: C.night });
  b += text(600, 603, "Log every input, output and decision: your audit trail, and the raw material for evaluation.", { size: 21, fill: "#cfeee0", anchor: "middle", weight: 600 });
  write(slug, "workflow-pipeline.svg", svg(1200, 650, b, "Workflow diagram: trigger, retrieve context, model, validate, confidence gate, then auto-apply or human review before the system of record"));

  // 3. Eval loop
  b = text(50, 62, "The evaluation loop", { size: 32, weight: 800 }) + text(50, 98, "How you change a prompt or model without breaking what works", { size: 21, fill: C.muted });
  const node = (x, y, n, head, lines, hot = false) =>
    rect(x, y, 440, 130, { fill: hot ? C.green : C.card, stroke: hot ? C.green : C.line }) + badge(x + 34, y + 36, n, { fill: hot ? C.amber : C.green }) +
    text(x + 66, y + 44, head, { size: 25, weight: 800, fill: hot ? "#fff" : C.ink }) + text(x + 28, y + 88, lines, { size: 20, fill: hot ? "#d4efe3" : C.muted, lh: 1.35 });
  b += node(110, 140, 1, "Golden set", ["50-100 real examples with the", "answer you would accept"]);
  b += node(650, 140, 2, "Run the system", ["Same inputs, current prompt,", "model and retrieval settings"]);
  b += node(650, 340, 3, "Score", ["Pass/fail on must-haves, plus a", "rubric for tone and completeness"]);
  b += node(110, 340, 4, "Change one thing", ["Prompt, model, chunking, or", "a guardrail. Never several at once"], true);
  b += arrow(554, 205, 646, 205, { green: true, sw: 4 }) + arrow(870, 274, 870, 336, { green: true, sw: 4 }) + arrow(646, 405, 554, 405, { green: true, sw: 4 }) + arrow(330, 336, 330, 274, { green: true, sw: 4 });
  b += rect(50, 510, 1100, 100, { fill: C.greenSoft, stroke: C.green });
  b += text(80, 550, "Track on every run", { size: 21, weight: 800, fill: C.green }) + text(80, 584, "Accuracy · cost per task · latency · how often it escalates to a human", { size: 21, fill: C.ink });
  write(slug, "evaluation-loop.svg", svg(1200, 640, b, "Evaluation loop: build a golden set, run the system, score results, change one thing, repeat"));
}

/* ====================================================================== */
/* SaaS architecture                                                       */
/* ====================================================================== */
{
  const slug = "building-saas-products-that-scale";

  // 1. Tenancy models
  let b = text(50, 62, "Three ways to isolate tenant data", { size: 32, weight: 800 }) + text(50, 98, "Isolation goes up, and so do cost and operational weight", { size: 21, fill: C.muted });
  const cw = 350, cg = 25, cx0 = 50, cy = 130, ch = 420;
  const tint = ["#47b48c", C.amber, "#6aa8d8"];
  const card = (i, title, tag, schematic, rows) => {
    const x = cx0 + i * (cw + cg);
    let s = rect(x, cy, cw, ch, { fill: C.card }) + text(x + 24, cy + 44, title, { size: 25, weight: 800 }) + text(x + 24, cy + 74, tag, { size: 18, fill: C.muted });
    s += schematic(x + 24, cy + 100);
    rows.forEach(([k, v], r) => {
      const yy = cy + 280 + r * 50;
      s += `<line x1="${x + 24}" y1="${yy - 22}" x2="${x + cw - 24}" y2="${yy - 22}" stroke="${C.line}" stroke-width="1.5"/>` + text(x + 24, yy + 6, k, { size: 18, fill: C.muted }) + text(x + cw - 24, yy + 6, v, { size: 19, weight: 700, anchor: "end" });
    });
    return s;
  };
  const rowsOf = (n) => [0, 1, 2, 3].map((k) => `<rect x="0" y="${k * 28}" width="${n}" height="22" rx="4" fill="${tint[k % 3]}"/>`).join("");
  b += card(0, "Shared schema", "One database, one set of tables", (x, y) => `<g transform="translate(${x},${y})">${rect(0, 0, 302, 140, { fill: C.grey, r: 10 })}<g transform="translate(16,16)">${rowsOf(270)}</g></g>`, [["Isolation", "Logical (code + RLS)"], ["Cost per tenant", "Lowest"], ["Operations", "Simplest"]]);
  b += card(1, "Schema per tenant", "One database, a schema for each", (x, y) => `<g transform="translate(${x},${y})">${rect(0, 0, 302, 140, { fill: C.grey, r: 10 })}${[0, 1, 2].map((k) => rect(14 + k * 94, 16, 86, 108, { fill: C.card, stroke: tint[k], sw: 3, r: 8 }) + `<rect x="${24 + k * 94}" y="30" width="66" height="14" rx="3" fill="${tint[k]}"/><rect x="${24 + k * 94}" y="54" width="66" height="14" rx="3" fill="${tint[k]}"/><rect x="${24 + k * 94}" y="78" width="66" height="14" rx="3" fill="${tint[k]}"/>`).join("")}</g>`, [["Isolation", "Stronger"], ["Cost per tenant", "Medium"], ["Operations", "Migrations x N"]]);
  b += card(2, "Database per tenant", "Fully separate databases", (x, y) => `<g transform="translate(${x},${y})">${[0, 1, 2].map((k) => rect(k * 104, 0, 94, 140, { fill: C.card, stroke: tint[k], sw: 3, r: 12 }) + `<ellipse cx="${k * 104 + 47}" cy="30" rx="30" ry="10" fill="${tint[k]}"/><rect x="${k * 104 + 17}" y="46" width="60" height="14" rx="3" fill="${tint[k]}" opacity="0.7"/><rect x="${k * 104 + 17}" y="70" width="60" height="14" rx="3" fill="${tint[k]}" opacity="0.7"/><rect x="${k * 104 + 17}" y="94" width="60" height="14" rx="3" fill="${tint[k]}" opacity="0.7"/>`).join("")}</g>`, [["Isolation", "Strongest"], ["Cost per tenant", "Highest"], ["Operations", "Most complex"]]);
  b += rect(50, 572, 1100, 56, { fill: C.night, stroke: C.night }) + text(600, 608, "Most products should start shared, then move large or regulated customers to dedicated databases.", { size: 21, weight: 600, fill: "#cfeee0", anchor: "middle" });
  write(slug, "tenancy-models.svg", svg(1200, 660, b, "Comparison of shared schema, schema per tenant and database per tenant for SaaS multi-tenancy"));

  // 2. Modular monolith
  b = text(50, 62, "A modular monolith, deployed as one app", { size: 32, weight: 800 }) + text(50, 98, "Clear module boundaries now, an easy path to extract services later", { size: 21, fill: C.muted });
  b += rect(50, 200, 190, 90, { fill: C.card }) + text(145, 240, "Web & mobile", { size: 22, weight: 800, anchor: "middle" }) + text(145, 268, "clients", { size: 19, fill: C.muted, anchor: "middle" });
  b += arrow(244, 245, 300, 245, { green: true, sw: 4 });
  b += rect(304, 130, 560, 400, { fill: C.greenSoft, stroke: C.green, sw: 3, r: 18 }) + text(334, 172, "One deployable application", { size: 23, weight: 800, fill: C.green });
  const mods = [["Auth & orgs", "Users, roles, invites"], ["Billing", "Plans, entitlements"], ["Core domain", "What customers pay for"], ["Notifications", "Email, in-app, webhooks"]];
  mods.forEach((m, i) => {
    const x = 334 + (i % 2) * 262, y = 200 + Math.floor(i / 2) * 150;
    b += rect(x, y, 244, 118, { fill: C.card, stroke: i === 2 ? C.green : C.line, sw: i === 2 ? 3 : 2 }) + text(x + 22, y + 46, m[0], { size: 24, weight: 800 }) + text(x + 22, y + 82, m[1], { size: 19, fill: C.muted });
  });
  b += text(334, 508, "Modules talk through plain interfaces, never each other's tables.", { size: 18, fill: C.muted });
  const side = (y, h, head, sub) => rect(930, y, 220, h, { fill: C.card }) + text(1040, y + 40, head, { size: 22, weight: 800, anchor: "middle" }) + text(1040, y + 70, sub, { size: 18, fill: C.muted, anchor: "middle" });
  b += side(150, 100, "Database", "Source of truth") + side(285, 100, "Queue + workers", "Email, exports, retries") + side(420, 100, "Object storage", "Files and uploads");
  b += arrow(868, 200, 926, 200, { sw: 3 }) + arrow(868, 335, 926, 335, { sw: 3 }) + arrow(868, 470, 926, 470, { sw: 3 });
  b += rect(304, 560, 560, 70, { fill: C.card, stroke: C.amber, sw: 2.5 }) + text(584, 603, "Payment provider  ->  signed, idempotent webhooks", { size: 21, weight: 700, anchor: "middle" });
  b += arrow(584, 556, 584, 534, { color: C.amber, sw: 3 });
  write(slug, "modular-monolith.svg", svg(1200, 670, b, "Architecture diagram of a modular monolith with auth, billing, core domain and notification modules, a database, a queue and a payment provider"));

  // 3. Billing lifecycle
  b = text(50, 62, "Subscription lifecycle, driven by webhooks", { size: 32, weight: 800 }) + text(50, 98, "Your billing provider is the source of truth. Your app mirrors it", { size: 21, fill: C.muted });
  const st = [["Trial", "Limited access", C.card, C.line], ["Active", "Full access", C.greenSoft, C.green], ["Past due", "Grace period", C.amberSoft, "#ecd08a"], ["Canceled", "Read-only / export", C.redSoft, "#e7b9af"]];
  st.forEach((s, i) => {
    const x = 50 + i * 300;
    b += rect(x, 200, 200, 120, { fill: s[2], stroke: s[3], sw: 3 }) + text(x + 100, 252, s[0], { size: 28, weight: 800, anchor: "middle" }) + text(x + 100, 290, s[1], { size: 19, fill: C.muted, anchor: "middle" });
  });
  b += arrow(254, 260, 346, 260, { green: true, sw: 4 }) + arrow(554, 260, 646, 260, { sw: 4 }) + arrow(854, 260, 946, 260, { sw: 4 });
  b += text(300, 200, ["payment", "succeeds"], { size: 17, fill: C.muted, anchor: "middle", lh: 1.2 }) + text(600, 200, ["payment", "fails"], { size: 17, fill: C.muted, anchor: "middle", lh: 1.2 }) + text(900, 200, ["retries", "exhausted"], { size: 17, fill: C.muted, anchor: "middle", lh: 1.2 });
  b += pathEl("M750,324 C750,400 450,400 450,324", { green: true, dash: true }) + text(600, 424, "payment recovered", { size: 18, fill: C.green, anchor: "middle", weight: 600 });
  b += rect(50, 470, 1100, 130, { fill: C.card }) + text(78, 512, "Webhook events to handle (names as used by Stripe-style providers)", { size: 20, weight: 800 });
  b += text(78, 552, "invoice.paid", { size: 19, mono: true, fill: C.green }) + text(290, 552, "invoice.payment_failed", { size: 19, mono: true, fill: "#9a6a00" }) + text(640, 552, "customer.subscription.deleted", { size: 19, mono: true, fill: C.red });
  b += text(78, 584, "Verify the signature, store the event id, and ignore duplicates, so every handler is idempotent.", { size: 19, fill: C.muted });
  write(slug, "billing-lifecycle.svg", svg(1200, 630, b, "Subscription lifecycle from trial to active, past due and canceled, with the webhook events that trigger each transition"));
}

/* ====================================================================== */
/* Next.js performance                                                     */
/* ====================================================================== */
{
  const slug = "nextjs-performance-optimization";

  // 1. Core Web Vitals
  let b = text(50, 62, "Core Web Vitals: the three numbers that matter", { size: 32, weight: 800 }) + text(50, 98, "Judged at the 75th percentile of real visits", { size: 21, fill: C.muted });
  const metrics = [
    ["LCP", "Largest Contentful Paint", "How fast the main content appears", "2.5 s", "4 s"],
    ["INP", "Interaction to Next Paint", "How quickly the page responds to input", "200 ms", "500 ms"],
    ["CLS", "Cumulative Layout Shift", "How much the layout jumps around", "0.1", "0.25"],
  ];
  metrics.forEach((m, i) => {
    const y = 135 + i * 150, bx = 440, bw = 700;
    b += rect(50, y - 6, 1100, 132, { fill: C.card });
    b += text(78, y + 46, m[0], { size: 38, weight: 800, fill: C.green }) + text(78, y + 80, m[1], { size: 19, weight: 700 }) + text(78, y + 106, m[2], { size: 17, fill: C.muted });
    b += `<rect x="${bx}" y="${y + 20}" width="${bw * 0.45}" height="30" fill="#47b48c" rx="6"/><rect x="${bx + bw * 0.45}" y="${y + 20}" width="${bw * 0.3}" height="30" fill="${C.amber}"/><rect x="${bx + bw * 0.75}" y="${y + 20}" width="${bw * 0.25}" height="30" fill="${C.red}" rx="6"/>`;
    b += `<rect x="${bx + bw * 0.4}" y="${y + 20}" width="${bw * 0.1}" height="30" fill="${C.amber}"/><rect x="${bx + bw * 0.7}" y="${y + 20}" width="${bw * 0.1}" height="30" fill="${C.red}"/>`;
    b += text(bx + bw * 0.225, y + 78, ["Good", `up to ${m[3]}`], { size: 19, weight: 700, anchor: "middle", fill: C.green, lh: 1.25 });
    b += text(bx + bw * 0.6, y + 78, ["Needs improvement", `up to ${m[4]}`], { size: 19, weight: 700, anchor: "middle", fill: "#9a6a00", lh: 1.25 });
    b += text(bx + bw * 0.875, y + 78, ["Poor", `over ${m[4]}`], { size: 19, weight: 700, anchor: "middle", fill: C.red, lh: 1.25 });
  });
  b += text(600, 622, "Thresholds as published by Google's web.dev. Lab tools estimate them; field data decides.", { size: 18, fill: C.muted, anchor: "middle" });
  write(slug, "core-web-vitals.svg", svg(1200, 650, b, "Core Web Vitals thresholds for LCP, INP and CLS, showing good, needs improvement and poor ranges"));

  // 2. Waterfall
  b = text(50, 62, "Sequential awaits vs. parallel requests", { size: 32, weight: 800 }) + text(50, 98, "Illustrative timings: independent fetches should not wait for each other", { size: 21, fill: C.muted });
  const lane = (y0, title, bars, total, color, note) => {
    let s = rect(50, y0, 1100, 230, { fill: C.card }) + text(78, y0 + 42, title, { size: 24, weight: 800, fill: color });
    bars.forEach(([label, start, dur], i) => {
      const x = 330 + start * 0.62, w = dur * 0.62, y = y0 + 68 + i * 48;
      s += text(310, y + 24, label, { size: 20, anchor: "end", fill: C.muted }) + rect(x, y, w, 34, { fill: color, stroke: "none", sw: 0, r: 8 }) + text(x + w / 2, y + 24, `${dur} ms`, { size: 18, weight: 700, fill: "#fff", anchor: "middle" });
    });
    s += `<line x1="${330 + total * 0.62}" y1="${y0 + 56}" x2="${330 + total * 0.62}" y2="${y0 + 214}" stroke="${C.ink}" stroke-width="2.5" stroke-dasharray="6 5"/>` + text(330 + total * 0.62 + 14, y0 + 205, note, { size: 20, weight: 800 });
    return s;
  };
  b += lane(130, "Sequential: await, await, await", [["user", 0, 300], ["orders", 300, 400], ["recommendations", 700, 300]], 1000, C.red, "~1000 ms total");
  b += lane(380, "Parallel: Promise.all", [["user", 0, 300], ["orders", 0, 400], ["recommendations", 0, 300]], 400, C.green, "~400 ms total");
  write(slug, "request-waterfall.svg", svg(1200, 640, b, "Timeline comparing three sequential data fetches against the same fetches run in parallel"));

  // 3. Rendering decision tree
  b = text(50, 62, "Choosing how to render a page", { size: 32, weight: 800 }) + text(50, 98, "Start static, and add dynamism only where the content demands it", { size: 21, fill: C.muted });
  const q = (x, y, w, t) => rect(x, y, w, 84, { fill: C.card, stroke: C.ink, sw: 2.5 }) + text(x + w / 2, y + 50, t, { size: 21, weight: 800, anchor: "middle" });
  const leaf = (x, y, w, head, sub, fill, stroke) => rect(x, y, w, 110, { fill, stroke, sw: 3 }) + text(x + w / 2, y + 44, head, { size: 24, weight: 800, anchor: "middle" }) + text(x + w / 2, y + 78, sub, { size: 18, fill: C.muted, anchor: "middle" });
  b += q(60, 140, 380, "Does it depend on the request?");
  b += q(60, 330, 380, "Does it change after deploy?");
  b += arrow(250, 226, 250, 326, { sw: 3 }) + text(266, 282, "No", { size: 19, weight: 700, fill: C.muted });
  b += arrow(444, 182, 556, 182, { sw: 3 }) + text(500, 168, "Yes", { size: 19, weight: 700, fill: C.muted, anchor: "middle" });
  b += leaf(560, 120, 580, "Dynamic render + streaming", "Wrap slow parts in Suspense so the shell appears instantly", C.amberSoft, "#ecd08a");
  b += arrow(250, 416, 250, 456, { sw: 3 }) + text(266, 442, "No", { size: 19, weight: 700, fill: C.muted });
  b += leaf(60, 460, 380, "Static (prerendered)", "Fastest. Served from the CDN", C.greenSoft, C.green);
  b += arrow(444, 372, 556, 372, { sw: 3 }) + text(500, 358, "Yes", { size: 19, weight: 700, fill: C.muted, anchor: "middle" });
  b += leaf(560, 320, 580, "Revalidate (ISR)", "Prerender, then refresh on a timer or by tag", C.greenSoft, C.green);
  b += rect(560, 470, 580, 100, { fill: C.night, stroke: C.night }) + text(850, 512, "Then, inside any page:", { size: 19, fill: "#8fd1b6", anchor: "middle", weight: 700 }) + text(850, 545, "only interactive leaves become Client Components", { size: 21, fill: "#fff", anchor: "middle", weight: 700 });
  write(slug, "rendering-decision.svg", svg(1200, 610, b, "Decision tree for choosing between static, revalidated and dynamic rendering in Next.js"));
}

await import("./build-more.mjs");
console.log("Blog art written to", root);
