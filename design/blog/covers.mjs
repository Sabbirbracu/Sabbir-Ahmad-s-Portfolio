// Cover images (1200x630 PNG) for every article. Add a post? Add an entry to COVERS and pick a motif.
import { C, esc, FONT, MONO } from "./lib.mjs";

const G = "#47b48c"; // bright brand green on dark
const ring = (cx, cy, r, w = 3, o = 0.5) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${G}" stroke-width="${w}" opacity="${o}"/>`;
const node = (x, y, r = 24, fill = "#1d5a43") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${G}" stroke-width="3"/>`;

export const motifs = {
  ai: () => {
    const cx = 930, cy = 330;
    const pts = [[0, -190], [165, -95], [165, 95], [0, 190], [-165, 95], [-165, -95]].map(([dx, dy]) => [cx + dx, cy + dy]);
    return (
      pts.map(([x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#2f8a69" stroke-width="3" opacity="0.7"/>`).join("") +
      pts.map(([x, y], i) => `<line x1="${x}" y1="${y}" x2="${pts[(i + 1) % 6][0]}" y2="${pts[(i + 1) % 6][1]}" stroke="#2f8a69" stroke-width="2" opacity="0.35"/>`).join("") +
      pts.map(([x, y]) => node(x, y)).join("") +
      `<circle cx="${cx}" cy="${cy}" r="62" fill="${C.amber}" opacity="0.18"/><circle cx="${cx}" cy="${cy}" r="42" fill="${C.amber}"/>` +
      `<text x="${cx}" y="${cy + 12}" font-size="34" font-weight="800" fill="${C.night}" text-anchor="middle">AI</text>`
    );
  },
  saas: () => {
    const x = 790, y = 150;
    const layer = (i, fill, label) =>
      `<g transform="translate(${x + i * 18}, ${y + i * 112})"><rect width="330" height="92" rx="16" fill="${fill}" stroke="${G}" stroke-width="2.5"/>` +
      [0, 1, 2, 3].map((k) => `<circle cx="${42 + k * 44}" cy="46" r="15" fill="${[G, C.amber, "#8fd1b6", "#ffffff"][k]}" opacity="0.95"/>`).join("") +
      `<text x="240" y="54" font-size="22" font-weight="700" fill="#cfeee0" text-anchor="middle">${label}</text></g>`;
    return layer(0, "#1d5a43", "Tenants") + layer(1, "#174a38", "Billing") + layer(2, "#123c2e", "Core");
  },
  perf: () => {
    const cx = 930, cy = 400, r = 190;
    const a = (deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)];
    const arc = (from, to, color) => {
      const [x1, y1] = a(from), [x2, y2] = a(to);
      return `<path d="M${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2}" fill="none" stroke="${color}" stroke-width="30" stroke-linecap="butt"/>`;
    };
    const [nx, ny] = a(35);
    return (
      arc(180, 120, "#c2412d") + arc(120, 60, C.amber) + arc(60, 0, G) +
      `<line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="#fff" stroke-width="8" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="20" fill="#fff"/>` +
      `<text x="${cx}" y="${cy + 80}" font-size="30" font-weight="800" fill="#cfeee0" text-anchor="middle">LCP · INP · CLS</text>`
    );
  },
  // an agent: a core node on a loop, with tools around it
  agent: () => {
    const cx = 930, cy = 330, r = 165;
    const on = (deg, rr = r) => [cx + rr * Math.cos((deg * Math.PI) / 180), cy - rr * Math.sin((deg * Math.PI) / 180)];
    const tools = [90, 210, 330].map((d) => on(d, 215));
    return (
      ring(cx, cy, r, 4, 0.55) + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.amber}" stroke-width="5" stroke-dasharray="70 330" stroke-linecap="round" transform="rotate(-25 ${cx} ${cy})"/>` +
      [30, 150, 270].map((d) => { const [x, y] = on(d); return node(x, y, 20); }).join("") +
      tools.map(([x, y]) => `<rect x="${x - 34}" y="${y - 34}" width="68" height="68" rx="14" fill="#16342a" stroke="#8fd1b6" stroke-width="3"/><rect x="${x - 16}" y="${y - 10}" width="32" height="6" rx="3" fill="#8fd1b6"/><rect x="${x - 16}" y="${y + 4}" width="22" height="6" rx="3" fill="#8fd1b6"/>`).join("") +
      `<circle cx="${cx}" cy="${cy}" r="70" fill="${C.amber}" opacity="0.18"/><circle cx="${cx}" cy="${cy}" r="48" fill="${C.amber}"/><text x="${cx}" y="${cy + 11}" font-size="28" font-weight="800" fill="${C.night}" text-anchor="middle">Agent</text>`
    );
  },
  // retrieval: documents plus a magnifier
  rag: () => {
    const doc = (x, y, o) => `<g transform="translate(${x},${y})" opacity="${o}"><rect width="250" height="300" rx="18" fill="#1d5a43" stroke="${G}" stroke-width="3"/>${[50, 90, 130, 170].map((yy, i) => `<rect x="30" y="${yy}" width="${i === 3 ? 110 : 190}" height="12" rx="6" fill="#8fd1b6" opacity="0.7"/>`).join("")}<rect x="30" y="215" width="190" height="40" rx="8" fill="${C.amber}" opacity="0.35"/></g>`;
    return doc(780, 120, 0.45) + doc(840, 170, 0.75) + doc(900, 220, 1) +
      `<circle cx="900" cy="440" r="70" fill="#0c2118" fill-opacity="0.7" stroke="#fff" stroke-width="12"/><line x1="950" y1="492" x2="1010" y2="552" stroke="#fff" stroke-width="16" stroke-linecap="round"/>` +
      `<text x="900" y="452" font-size="34" font-weight="800" fill="${C.amber}" text-anchor="middle">?</text>`;
  },
  // a tech stack: blocks that narrow toward the top
  stack: () => {
    const rows = [["Interface", 330, "#8fd1b6"], ["API & logic", 380, "#47b48c"], ["Data", 430, "#2f8a69"], ["Infrastructure", 480, "#1d5a43"]];
    return rows.map(([label, w, fill], i) => `<g><rect x="${940 - w / 2}" y="${140 + i * 112}" width="${w}" height="92" rx="16" fill="${fill}" stroke="#d7efe4" stroke-opacity="0.35" stroke-width="2"/><text x="940" y="${140 + i * 112 + 56}" font-size="26" font-weight="800" fill="${i < 2 ? C.night : "#fff"}" text-anchor="middle">${esc(label)}</text></g>`).join("");
  },
  // an MVP: ascending steps with a flag
  mvp: () => {
    const bars = [90, 150, 210, 270, 330].map((h, i) => `<rect x="${760 + i * 76}" y="${520 - h}" width="62" height="${h}" rx="10" fill="${i === 4 ? C.amber : "#2f8a69"}" opacity="${0.45 + i * 0.14}"/>`).join("");
    return bars + `<line x1="${760 + 4 * 76 + 31}" y1="190" x2="${760 + 4 * 76 + 31}" y2="120" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M${760 + 4 * 76 + 34},120 l78,26 l-78,26 z" fill="#47b48c"/>` +
      `<text x="940" y="575" font-size="26" font-weight="700" fill="#cfeee0" text-anchor="middle">8 weeks</text>`;
  },
  // security: a shield with a check
  security: () => {
    const cx = 930, y0 = 130;
    return `<path d="M${cx},${y0} L${cx + 150},${y0 + 52} V${y0 + 190} C${cx + 150},${y0 + 300} ${cx + 40},${y0 + 360} ${cx},${y0 + 385} C${cx - 40},${y0 + 360} ${cx - 150},${y0 + 300} ${cx - 150},${y0 + 190} V${y0 + 52} Z" fill="#1d5a43" stroke="${G}" stroke-width="5"/>` +
      `<path d="M${cx},${y0 + 36} L${cx + 112},${y0 + 76} V${y0 + 190} C${cx + 112},${y0 + 276} ${cx + 30},${y0 + 326} ${cx},${y0 + 346} C${cx - 30},${y0 + 326} ${cx - 112},${y0 + 276} ${cx - 112},${y0 + 190} V${y0 + 76} Z" fill="#16342a"/>` +
      `<polyline points="${cx - 58},${y0 + 190} ${cx - 14},${y0 + 236} ${cx + 66},${y0 + 140}" fill="none" stroke="${C.amber}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`;
  },
  // a store: browser window with a bag and speed lines
  store: () => {
    const x = 760, y = 150;
    return `<rect x="${x}" y="${y}" width="360" height="300" rx="18" fill="#16342a" stroke="${G}" stroke-width="3"/><rect x="${x}" y="${y}" width="360" height="48" rx="18" fill="#1d5a43"/>` +
      [0, 1, 2].map((i) => `<circle cx="${x + 30 + i * 26}" cy="${y + 24}" r="7" fill="${[C.red, C.amber, G][i]}"/>`).join("") +
      `<rect x="${x + 110}" y="${y + 130}" width="140" height="120" rx="14" fill="${C.amber}"/><path d="M${x + 145},${y + 130} v-26 a35,35 0 0 1 70,0 v26" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>` +
      [0, 1, 2].map((i) => `<rect x="${x - 70 + i * 14}" y="${y + 140 + i * 30}" width="${90 - i * 14}" height="9" rx="4.5" fill="#8fd1b6" opacity="${0.8 - i * 0.2}"/>`).join("");
  },
  // images: a picture frame with mountains and a sun
  images: () => {
    const x = 770, y = 150;
    return `<rect x="${x}" y="${y}" width="350" height="290" rx="20" fill="#16342a" stroke="${G}" stroke-width="3"/>` +
      `<circle cx="${x + 255}" cy="${y + 85}" r="34" fill="${C.amber}"/>` +
      `<path d="M${x},${y + 270} L${x + 110},${y + 130} L${x + 190},${y + 220} L${x + 250},${y + 160} L${x + 350},${y + 270} L${x + 350},${y + 270} a20,20 0 0 1 -20,20 H${x + 20} a20,20 0 0 1 -20,-20 Z" fill="#2f8a69"/>` +
      `<path d="M${x},${y + 290 - 20} L${x + 110},${y + 175} L${x + 170},${y + 245} L${x + 235},${y + 195} L${x + 350},${y + 270} v0" fill="#47b48c" opacity="0.5"/>` +
      `<rect x="${x + 20}" y="${y + 320}" width="130" height="14" rx="7" fill="#8fd1b6" opacity="0.6"/><rect x="${x + 170}" y="${y + 320}" width="90" height="14" rx="7" fill="#8fd1b6" opacity="0.35"/>`;
  },
};

export const cover = ({ kicker, title, sub, motif }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" font-family="${FONT}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16342a"/><stop offset="1" stop-color="#0c2118"/></linearGradient>
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/></pattern>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/><rect width="1200" height="630" fill="url(#grid)"/>
<circle cx="1000" cy="320" r="330" fill="#176c4f" opacity="0.16"/>
${motifs[motif]()}
<text x="80" y="92" font-size="30" font-weight="800" fill="#fff">Sabbir Ahmad<tspan fill="#47b48c">.</tspan></text>
<rect x="80" y="150" width="${kicker.length * 13.5 + 36}" height="38" rx="19" fill="#47b48c" fill-opacity="0.16" stroke="#47b48c" stroke-opacity="0.5"/>
<text x="98" y="175" font-size="17" font-weight="700" fill="#8fd1b6" letter-spacing="2">${esc(kicker.toUpperCase())}</text>
<text font-size="64" font-weight="800" fill="#fff" letter-spacing="-1.5">${title.map((l, i) => `<tspan x="80" y="${262 + i * 76}">${esc(l)}</tspan>`).join("")}</text>
<text x="80" y="${262 + title.length * 76 + 6}" font-size="26" fill="#a9c9bb">${esc(sub)}</text>
<text x="80" y="582" font-size="20" fill="#6f9a88" font-family="${MONO}">bysabbir.com</text>
</svg>`;

export const COVERS = [
  { slug: "ai-integration-for-modern-businesses", kicker: "AI & Automation", title: ["AI Integration for", "Modern Businesses"], sub: "Where it pays off, and where it's an expensive demo", motif: "ai" },
  { slug: "building-saas-products-that-scale", kicker: "SaaS Architecture", title: ["Building SaaS", "Products That Scale"], sub: "The decisions that are expensive to change later", motif: "saas" },
  { slug: "nextjs-performance-optimization", kicker: "Performance", title: ["Next.js Performance", "Optimization"], sub: "From slow to instant, measured on real users", motif: "perf" },
  { slug: "ai-agents-for-business", kicker: "AI & Automation", title: ["AI Agents for", "Business"], sub: "What actually works in production", motif: "agent" },
  { slug: "rag-vs-fine-tuning", kicker: "AI & Automation", title: ["RAG vs", "Fine-Tuning"], sub: "How to make an LLM know your business", motif: "rag" },
  { slug: "choosing-the-right-tech-stack", kicker: "SaaS Architecture", title: ["Choosing the Right", "Tech Stack"], sub: "A framework you won't regret in two years", motif: "stack" },
  { slug: "ship-an-mvp-in-8-weeks", kicker: "SaaS Architecture", title: ["How to Ship an", "MVP in 8 Weeks"], sub: "Scope ruthlessly, launch, then learn", motif: "mvp" },
  { slug: "web-app-security-checklist", kicker: "SaaS Architecture", title: ["A Security Checklist", "for Production Apps"], sub: "Practical steps, mapped to the OWASP Top 10", motif: "security" },
  { slug: "faster-shopify-and-wordpress-stores", kicker: "Performance", title: ["Faster Shopify and", "WordPress Stores"], sub: "Where the speed goes, and how to win it back", motif: "store" },
  { slug: "image-optimization-for-the-web", kicker: "Performance", title: ["Image Optimization", "for the Web"], sub: "Formats, sizes, and delivery that actually help", motif: "images" },
];
