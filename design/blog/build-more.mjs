// Diagrams for the second batch of articles (cover images live in covers.mjs).
//   node design/blog/build-more.mjs      (build-art.mjs runs this too)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cards, cycle, flow, grid, timeline } from "./diagrams.mjs";
import { arrow, C, rect, svg, text } from "./lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/blog");
const write = (slug, name, content) => {
  fs.mkdirSync(path.join(root, slug), { recursive: true });
  fs.writeFileSync(path.join(root, slug, name), content);
};

/* ---------------------------------------------------------------- AI agents */
write("ai-agents-for-business", "agent-loop.svg", cycle({
  title: "The agent loop",
  subtitle: "A model that decides, acts, and checks until the goal is met",
  nodes: [
    { head: "Decide", sub: "Pick the next step, or decide the goal is met" },
    { head: "Act", sub: "Call a tool: search, query, draft, or update a record" },
    { head: "Observe", sub: "Read the result, including errors and empty answers" },
    { head: "Check", sub: "Within limits? Needs approval? Done?" },
  ],
  hot: [3],
  bannerText: "Every turn is bounded by a step limit, a budget cap, approvals, and a full trace.",
  alt: "Agent loop: decide, act with a tool, observe the result, then check limits before deciding again",
}));

write("ai-agents-for-business", "autonomy-spectrum.svg", flow({
  title: "How much autonomy do you need?",
  subtitle: "Most business problems are solved well to the left of this diagram",
  steps: [
    { head: "Fixed workflow", sub: "Code decides every step. Predictable and cheap." },
    { head: "Workflow + AI", sub: "Code sets the path; the model handles language tasks." },
    { head: "Single agent", sub: "The model chooses steps and tools within limits." },
    { head: "Multi-agent", sub: "Agents coordinate. Most flexible, hardest to control." },
  ],
  hot: [1, 2],
  topNote: "More flexibility also means more cost, more latency, and more risk",
  bannerText: "Start on the left. Move right only when a simpler design fails a real test.",
  alt: "Spectrum from fixed workflows to AI inside workflows, single agents, and multi-agent systems",
}));

/* ------------------------------------------------------------ RAG vs tuning */
write("rag-vs-fine-tuning", "three-levers.svg", cards({
  title: "Three ways to adapt a model to your business",
  subtitle: "They solve different problems, so they are rarely interchangeable",
  cols: [
    { head: "Better prompts", tag: "Start here", accent: "green", sections: [
      { label: "Best for", items: ["Clear instructions and examples", "Output format and tone", "Fast experiments"] },
      { label: "Watch out", items: ["Limited by the context window", "Cannot add private knowledge alone"] } ] },
    { head: "RAG", tag: "Your knowledge", accent: "amber", sections: [
      { label: "Best for", items: ["Your documents and data", "Facts that change often", "Answers with sources"] },
      { label: "Watch out", items: ["Retrieval quality is everything", "Must respect permissions"] } ] },
    { head: "Fine-tuning", tag: "Behavior", accent: "neutral", sections: [
      { label: "Best for", items: ["Consistent style or format", "Narrow, repeated tasks", "Smaller, cheaper models"] },
      { label: "Watch out", items: ["Poor at teaching new facts", "Needs labeled data and retraining"] } ] },
  ],
  bannerText: "Try them in this order: prompts, then RAG, then fine-tuning if a gap remains.",
  alt: "Comparison of better prompts, retrieval-augmented generation and fine-tuning: what each is best for and what to watch out for",
}));

{
  // custom decision tree
  const q = (x, y, w, t) => rect(x, y, w, 100, { fill: C.card, stroke: C.ink, sw: 2.5 }) + text(x + w / 2, y + 42, t, { size: 21, weight: 800, anchor: "middle", lh: 1.3 });
  const leaf = (x, y, w, h, head, sub, fill, stroke) => rect(x, y, w, h, { fill, stroke, sw: 3 }) + text(x + w / 2, y + 42, head, { size: 24, weight: 800, anchor: "middle" }) + text(x + w / 2, y + 76, sub, { size: 18, fill: C.muted, anchor: "middle", lh: 1.3 });
  let b = text(50, 62, "Which approach fits your problem?", { size: 32, weight: 800 }) + text(50, 98, "Two questions cover most cases", { size: 21, fill: C.muted });
  b += q(60, 140, 470, ["Does the answer depend on your own,", "changing information?"]);
  b += arrow(534, 190, 656, 190, { green: true, sw: 3 }) + text(595, 176, "Yes", { size: 19, weight: 700, fill: C.muted, anchor: "middle" });
  b += leaf(660, 130, 480, 120, "Use RAG", ["Retrieve the right passages and", "cite them. Keep the data fresh."], C.amberSoft, "#ecd08a");
  b += arrow(295, 244, 295, 326, { sw: 3 }) + text(311, 292, "No", { size: 19, weight: 700, fill: C.muted });
  b += q(60, 330, 470, ["Do you need a consistent style,", "format, or narrow behavior?"]);
  b += arrow(534, 380, 656, 380, { green: true, sw: 3 }) + text(595, 366, "Yes", { size: 19, weight: 700, fill: C.muted, anchor: "middle" });
  b += leaf(660, 320, 480, 120, "Consider fine-tuning", ["After prompts and examples fall short.", "Needs good labeled data."], C.greenSoft, C.green);
  b += arrow(295, 434, 295, 496, { sw: 3 }) + text(311, 470, "No", { size: 19, weight: 700, fill: C.muted });
  b += leaf(60, 500, 470, 100, "Better prompts may be enough", "Clear instructions and a few examples.", C.card, C.line);
  b += rect(660, 500, 480, 100, { fill: C.night, stroke: C.night }) + text(900, 542, "Often the best answer is both:", { size: 19, weight: 700, fill: "#8fd1b6", anchor: "middle" }) + text(900, 574, "RAG for knowledge, tuning for behavior", { size: 21, weight: 700, fill: "#fff", anchor: "middle" });
  write("rag-vs-fine-tuning", "decision.svg", svg(1200, 640, b, "Decision tree: use RAG when answers depend on changing private information, consider fine-tuning for style or narrow behavior, otherwise better prompts"));
}

/* ------------------------------------------------------------- tech stack */
write("choosing-the-right-tech-stack", "decision-steps.svg", flow({
  title: "A five-step way to choose a stack",
  subtitle: "Slow enough to be deliberate, fast enough to fit in a week",
  steps: [
    { head: "Constraints", sub: "Team skills, budget, deadline, compliance." },
    { head: "Shortlist", sub: "Two or three realistic options, not ten." },
    { head: "Score", sub: "Rate each option against weighted criteria." },
    { head: "Prototype", sub: "Build the riskiest part first." },
    { head: "Decide", sub: "Write down why, so you can revisit it." },
  ],
  hot: [3],
  bannerText: "A decision you can explain is much easier to change later than one you can't.",
  alt: "Five-step process: constraints, shortlist, score, prototype, decide",
}));

write("choosing-the-right-tech-stack", "boring-vs-bold.svg", cards({
  title: "Where to be boring, and where to take a risk",
  subtitle: "Every unusual choice has a cost, so spend your risk where it pays",
  cols: [
    { head: "Be boring here", tag: "Proven, well-documented, easy to hire for", accent: "green", items: ["Database", "Authentication", "Payments and billing", "Hosting and deployment", "Monitoring and logging"] },
    { head: "Take a calculated risk here", tag: "Only where it gives a real edge", accent: "amber", items: ["The core of what customers pay you for", "A capability a mainstream tool can't match", "Anything a prototype has already proven"] },
  ],
  bannerText: "Spend your innovation tokens on the product, not on the plumbing.",
  alt: "Two columns: use proven technology for databases, auth, payments and hosting; take risks only on the product's differentiator",
}));

/* -------------------------------------------------------------------- MVP */
write("ship-an-mvp-in-8-weeks", "eight-week-plan.svg", timeline({
  title: "An eight-week MVP plan",
  subtitle: "Four two-week phases, each ending with something you can show",
  phases: [
    { when: "Weeks 1-2", head: "Discover and scope", items: ["Talk to real target users", "Choose the one core workflow", "Write the cut list"] },
    { when: "Weeks 3-4", head: "Build the core loop", items: ["Sign-up to value, end to end", "Ugly but working", "Demo every week"] },
    { when: "Weeks 5-6", head: "Harden and connect", items: ["Payments or contact path", "Errors, emails, edge cases", "A small group of real users"] },
    { when: "Weeks 7-8", head: "Launch and learn", items: ["Launch to a defined audience", "Watch what people actually do", "Decide what to build next"] },
  ],
  bannerText: "Dates will slip. The cut list is what keeps the launch date.",
  alt: "Eight-week MVP timeline in four phases: discover and scope, build the core loop, harden and connect, launch and learn",
}));

write("ship-an-mvp-in-8-weeks", "scope-triage.svg", cards({
  title: "Sorting every feature request",
  subtitle: "Most ideas belong in the second or third column",
  cols: [
    { head: "Build now", tag: "Needed to test the idea", accent: "green", items: ["The one workflow that proves the idea", "Sign-up and login", "A way to get paid or get in touch"] },
    { head: "Do by hand", tag: "Manual first, automate later", accent: "amber", items: ["Onboarding emails", "Reports and exports", "Anything a spreadsheet can run"] },
    { head: "Not yet", tag: "Interesting, but premature", accent: "red", items: ["Admin dashboards", "Settings and preferences", "Integrations nobody asked for"] },
  ],
  bannerText: "Doing it by hand for your first customers shows you exactly what is worth automating.",
  alt: "Three columns for sorting features: build now, do by hand, and not yet",
}));

/* --------------------------------------------------------------- security */
write("web-app-security-checklist", "checklist-grid.svg", grid({
  title: "A practical security checklist",
  subtitle: "Six areas that cover most real-world incidents",
  groups: [
    { head: "Identity", items: ["Hash passwords with bcrypt or Argon2", "Require MFA for admin accounts", "Rate-limit login attempts"] },
    { head: "Access control", items: ["Check ownership on every request", "Deny by default", "Scope every query by tenant"] },
    { head: "Input and output", items: ["Validate on the server", "Use parameterized queries", "Encode output"] },
    { head: "Secrets and config", items: ["Keep secrets out of Git", "Rotate keys on a schedule", "Separate dev and production"] },
    { head: "Dependencies", items: ["Audit and update regularly", "Review new packages", "Remove what you don't use"] },
    { head: "Monitoring", items: ["Log sign-ins and failures", "Alert on unusual activity", "Test your backup restores"] },
  ],
  bannerText: "Broken access control sits at the top of the OWASP list. Start there.",
  alt: "Six-part security checklist: identity, access control, input and output, secrets, dependencies and monitoring",
}));

write("web-app-security-checklist", "defense-in-depth.svg", flow({
  title: "Defense in depth",
  subtitle: "Each layer assumes another one may fail",
  steps: [
    { head: "Edge", sub: "HTTPS, a CDN or WAF, and DDoS protection." },
    { head: "Application", sub: "Authentication, authorization, validation, safe errors." },
    { head: "Data", sub: "Least-privilege access, encryption, and backups." },
    { head: "Operations", sub: "Logging, alerts, patching, and an incident plan." },
  ],
  hot: [1],
  bannerText: "No single control is enough on its own. Layers turn one mistake into a non-event.",
  alt: "Four security layers: edge, application, data and operations",
}));

/* ------------------------------------------------------------ store speed */
write("faster-shopify-and-wordpress-stores", "where-speed-goes.svg", cards({
  title: "Where a slow store loses its speed",
  subtitle: "The same four culprits show up on almost every audit",
  cols: [
    { head: "Images", accent: "green", items: ["Oversized originals", "No modern formats", "Everything loads at once"] },
    { head: "Apps and plugins", accent: "amber", items: ["Each adds scripts and styles", "Many run on every page", "Leftovers from removed ones"] },
    { head: "Theme and code", accent: "neutral", items: ["Heavy sliders and animations", "Unused CSS and JavaScript", "Too many font files"] },
    { head: "Server and cache", accent: "red", items: ["Slow server response", "No page or object cache", "No CDN for assets"] },
  ],
  bannerText: "Work in this order: images, apps and plugins, theme code, then server and cache.",
  alt: "Four common causes of slow online stores: images, apps and plugins, theme code, and hosting and caching",
}));

write("faster-shopify-and-wordpress-stores", "audit-loop.svg", cycle({
  title: "A repeatable speed audit",
  subtitle: "Measure, remove, optimize, verify, and keep it that way",
  nodes: [
    { head: "Measure", sub: "Run PageSpeed Insights on home, collection, and product pages" },
    { head: "Remove", sub: "Uninstall unused apps and plugins, and delete their leftovers" },
    { head: "Optimize", sub: "Resize images, defer scripts, and turn on caching" },
    { head: "Verify", sub: "Re-test and compare against your baseline" },
  ],
  hot: [1],
  bannerText: "Change one thing at a time, so you know what actually helped.",
  alt: "Speed audit loop: measure, remove, optimize and verify",
}));

/* ----------------------------------------------------------------- images */
write("image-optimization-for-the-web", "format-guide.svg", cards({
  title: "Choosing an image format",
  subtitle: "Pick by content type, then serve the smallest format the browser supports",
  cols: [
    { head: "JPEG / PNG", tag: "Universal fallbacks", accent: "neutral", items: ["JPEG for photos", "PNG for sharp graphics and transparency", "Bigger files than newer formats"] },
    { head: "WebP", tag: "A solid default", accent: "green", items: ["Photos and graphics", "Transparency and animation", "Works in all current major browsers"] },
    { head: "AVIF", tag: "Often the smallest", accent: "amber", items: ["Great for photos", "Slower to encode", "Broad support; keep a fallback"] },
    { head: "SVG", tag: "Vector artwork", accent: "green", items: ["Logos, icons, illustrations", "Sharp at any size", "Sanitize anything users upload"] },
  ],
  bannerText: "Serve AVIF or WebP with a JPEG or PNG fallback, using the picture element.",
  alt: "Image formats compared: JPEG and PNG, WebP, AVIF and SVG, with what each is best for",
}));

write("image-optimization-for-the-web", "responsive-pipeline.svg", flow({
  title: "From one master image to the right file for every screen",
  subtitle: "Do the work once at build time, and let the browser choose",
  steps: [
    { head: "Master image", sub: "Keep one high-quality original." },
    { head: "Resize", sub: "Generate several widths from it." },
    { head: "Describe", sub: "Add srcset and sizes so the browser can choose." },
    { head: "Deliver", sub: "Serve from a CDN with long-lived caching." },
  ],
  hot: [2],
  bannerText: "The browser picks the smallest file that still looks sharp on the visitor's screen.",
  alt: "Responsive image pipeline: master image, resize, describe with srcset and sizes, deliver from a CDN",
}));

console.log("More blog diagrams written to", root);
