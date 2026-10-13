// Reusable diagram templates for the blog. Each returns a complete SVG string.
// Text is wrapped automatically, and anything that cannot fit throws, so layout bugs surface at build time.
import { arrow, badge, C, rect, svg, text } from "./lib.mjs";

const W = 1200;
const AVG = { 400: 0.54, 600: 0.57, 700: 0.58, 800: 0.59 }; // conservative average glyph width / font size

export const widthOf = (str, size, weight = 400) => str.length * size * (AVG[weight] ?? 0.58);

// Greedy word wrap to a pixel width. Throws if a single word is wider than the box.
export const wrap = (str, size, maxW, weight = 400) => {
  const lines = [];
  let line = "";
  for (const word of String(str).split(/\s+/)) {
    if (widthOf(word, size, weight) > maxW) throw new Error(`"${word}" does not fit in ${Math.round(maxW)}px at ${size}px`);
    const next = line ? `${line} ${word}` : word;
    if (widthOf(next, size, weight) <= maxW) line = next;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
};

const fitOne = (str, size, maxW, weight, where) => {
  if (widthOf(str, size, weight) > maxW) throw new Error(`${where}: "${str}" is ~${Math.round(widthOf(str, size, weight))}px wide, limit ${Math.round(maxW)}px`);
  return str;
};

const header = (title, subtitle) =>
  text(50, 62, fitOne(title, 32, 1100, 800, "title"), { size: 32, weight: 800 }) +
  text(50, 98, fitOne(subtitle, 21, 1100, 400, "subtitle"), { size: 21, fill: C.muted });

const banner = (y, str, { fill = C.night, fg = "#cfeee0" } = {}) => {
  const lines = wrap(str, 21, 1040, 600);
  if (lines.length > 2) throw new Error("banner too long: " + str);
  const h = 38 + lines.length * 28;
  return { h, svg: rect(50, y, 1100, h, { fill, stroke: fill }) + text(600, y + 36, lines, { size: 21, weight: 600, fill: fg, anchor: "middle", lh: 1.3 }) };
};

const ACCENT = {
  green: { fill: C.greenSoft, stroke: C.green, head: C.green },
  amber: { fill: C.amberSoft, stroke: "#ecd08a", head: "#9a6a00" },
  red: { fill: C.redSoft, stroke: "#e7b9af", head: C.red },
  neutral: { fill: C.card, stroke: C.line, head: C.ink },
};

/* ---------------------------------------------------------------- flow */
// A row of 3-5 steps with arrows. `hot` highlights steps. `topNote` adds a caption above the row.
export const flow = ({ title, subtitle, steps, hot = [], topNote, bannerText, alt }) => {
  const n = steps.length;
  const gap = n <= 3 ? 56 : n === 4 ? 44 : 34;
  const bw = (1100 - (n - 1) * gap) / n;
  const stacked = n >= 4; // badge above the heading when columns are narrow
  const headSize = n >= 4 ? 22 : 25;
  const subSize = n >= 5 ? 18 : 19;
  const inner = bw - 44;

  const prepared = steps.map((s) => ({ head: fitOne(s.head, headSize, stacked ? inner : inner - 40, 800, "step head"), sub: wrap(s.sub, subSize, inner, 400) }));
  const maxSub = Math.max(...prepared.map((p) => p.sub.length));
  if (maxSub > 5) throw new Error("step text too long");
  const bh = (stacked ? 96 : 66) + maxSub * subSize * 1.35 + 22;

  let y = 150;
  let s = header(title, subtitle);
  if (topNote) {
    s += text(600, 150, fitOne(topNote, 20, 1000, 700, "topNote"), { size: 20, weight: 700, fill: C.muted, anchor: "middle" });
    s += `<line x1="50" y1="168" x2="1150" y2="168" stroke="${C.line}" stroke-width="2"/>`;
    y = 192;
  }
  prepared.forEach((p, i) => {
    const x = 50 + i * (bw + gap);
    const isHot = hot.includes(i);
    s += rect(x, y, bw, bh, { fill: isHot ? C.green : C.card, stroke: isHot ? C.green : C.line, r: 14 });
    if (stacked) {
      s += badge(x + 34, y + 36, i + 1, { fill: isHot ? C.amber : C.green });
      s += text(x + 22, y + 88, p.head, { size: headSize, weight: 800, fill: isHot ? "#fff" : C.ink });
      s += text(x + 22, y + 122, p.sub, { size: subSize, fill: isHot ? "#d4efe3" : C.muted, lh: 1.35 });
    } else {
      s += badge(x + 34, y + 38, i + 1, { fill: isHot ? C.amber : C.green });
      s += text(x + 64, y + 46, p.head, { size: headSize, weight: 800, fill: isHot ? "#fff" : C.ink });
      s += text(x + 22, y + 92, p.sub, { size: subSize, fill: isHot ? "#d4efe3" : C.muted, lh: 1.35 });
    }
    if (i < n - 1) s += arrow(x + bw + 4, y + bh / 2, x + bw + gap - 4, y + bh / 2, { sw: 3 });
  });
  let h = y + bh + 40;
  if (bannerText) { const b = banner(h, bannerText); s += b.svg; h += b.h + 36; } else h += 6;
  return svg(W, h, s, alt ?? title);
};

/* --------------------------------------------------------------- cards */
// 2-4 columns. Each column has a heading, optional tag, and one or more labeled bullet sections.
export const cards = ({ title, subtitle, cols, bannerText, alt }) => {
  const n = cols.length;
  const gap = 24;
  const cw = (1100 - (n - 1) * gap) / n;
  const size = n >= 4 ? 18 : 19;
  const inner = cw - 56;

  const prepared = cols.map((c) => ({
    ...c,
    head: fitOne(c.head, n >= 4 ? 22 : 25, cw - 40, 800, "card head"),
    tag: c.tag ? fitOne(c.tag, 17, cw - 40, 600, "card tag") : "",
    sections: (c.sections ?? [{ items: c.items }]).map((sec) => ({ label: sec.label, items: sec.items.map((it) => wrap(it, size, inner, 400)) })),
  }));

  const heights = prepared.map((c) => {
    let h = c.tag ? 102 : 78;
    for (const sec of c.sections) {
      if (sec.label) h += 34;
      for (const lines of sec.items) h += lines.length * size * 1.3 + 12;
      h += 10;
    }
    return h + 10;
  });
  const ch = Math.max(...heights);

  let s = header(title, subtitle);
  const y0 = 130;
  prepared.forEach((c, i) => {
    const x = 50 + i * (cw + gap);
    const a = ACCENT[c.accent ?? "neutral"];
    s += rect(x, y0, cw, ch, { fill: C.card, stroke: C.line, r: 14 });
    s += `<rect x="${x}" y="${y0}" width="${cw}" height="10" rx="5" fill="${a.stroke}" opacity="0.9"/>`;
    s += text(x + 24, y0 + 52, c.head, { size: n >= 4 ? 22 : 25, weight: 800, fill: a.head });
    if (c.tag) s += text(x + 24, y0 + 80, c.tag, { size: 17, weight: 600, fill: C.muted });
    let y = y0 + (c.tag ? 112 : 88);
    for (const sec of c.sections) {
      if (sec.label) { s += text(x + 24, y + 4, sec.label.toUpperCase(), { size: 14, weight: 800, fill: a.head }); y += 30; }
      for (const lines of sec.items) {
        s += `<circle cx="${x + 30}" cy="${y - size * 0.3}" r="4" fill="${a.stroke}"/>` + text(x + 46, y, lines, { size, fill: C.ink, lh: 1.3 });
        y += lines.length * size * 1.3 + 12;
      }
      y += 10;
    }
  });
  let h = y0 + ch + 36;
  if (bannerText) { const b = banner(h, bannerText); s += b.svg; h += b.h + 36; } else h += 4;
  return svg(W, h, s, alt ?? title);
};

/* ---------------------------------------------------------------- grid */
// A 3-column checklist grid of titled groups.
export const grid = ({ title, subtitle, groups, bannerText, alt }) => {
  const cols = 3, gap = 24, cw = (1100 - (cols - 1) * gap) / cols, size = 19, inner = cw - 76;
  const prepared = groups.map((g) => ({ head: fitOne(g.head, 23, cw - 48, 800, "group head"), items: g.items.map((it) => wrap(it, size, inner, 400)) }));
  const rows = Math.ceil(prepared.length / cols);
  const rowH = [];
  for (let r = 0; r < rows; r++) {
    const slice = prepared.slice(r * cols, r * cols + cols);
    rowH.push(Math.max(...slice.map((g) => 66 + g.items.reduce((a, l) => a + l.length * size * 1.3 + 12, 0))) + 12);
  }
  let s = header(title, subtitle);
  let y = 130;
  prepared.forEach((g, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    if (c === 0 && r > 0) y += rowH[r - 1] + gap;
    const x = 50 + c * (cw + gap);
    s += rect(x, y, cw, rowH[r], { fill: C.card, stroke: C.line, r: 14 }) + text(x + 24, y + 42, g.head, { size: 23, weight: 800 });
    let yy = y + 78;
    for (const lines of g.items) {
      s += `<circle cx="${x + 34}" cy="${yy - 6}" r="11" fill="${C.greenSoft}" stroke="${C.green}" stroke-width="2"/><path d="M${x + 28.5},${yy - 6} l4,4 l7,-8" fill="none" stroke="${C.green}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
      s += text(x + 56, yy, lines, { size, fill: C.ink, lh: 1.3 });
      yy += lines.length * size * 1.3 + 12;
    }
  });
  let h = y + rowH[rows - 1] + 36;
  if (bannerText) { const b = banner(h, bannerText); s += b.svg; h += b.h + 36; } else h += 4;
  return svg(W, h, s, alt ?? title);
};

/* --------------------------------------------------------------- cycle */
// Four nodes in a 2x2 loop: 1 -> 2 (right), 2 -> 3 (down), 3 -> 4 (left), 4 -> 1 (up).
export const cycle = ({ title, subtitle, nodes, hot = [], bannerText, alt }) => {
  const nw = 440, size = 20;
  const prepared = nodes.map((nd) => ({ head: fitOne(nd.head, 25, nw - 100, 800, "node head"), sub: wrap(nd.sub, size, nw - 56, 400) }));
  const nh = 74 + Math.max(...prepared.map((p) => p.sub.length)) * size * 1.35 + 12;
  const xs = [110, 650], y1 = 140, y2 = y1 + nh + 64;
  const pos = [[xs[0], y1], [xs[1], y1], [xs[1], y2], [xs[0], y2]];
  let s = header(title, subtitle);
  prepared.forEach((p, i) => {
    const [x, y] = pos[i], isHot = hot.includes(i);
    s += rect(x, y, nw, nh, { fill: isHot ? C.green : C.card, stroke: isHot ? C.green : C.line }) + badge(x + 34, y + 38, i + 1, { fill: isHot ? C.amber : C.green });
    s += text(x + 66, y + 46, p.head, { size: 25, weight: 800, fill: isHot ? "#fff" : C.ink }) + text(x + 28, y + 92, p.sub, { size, fill: isHot ? "#d4efe3" : C.muted, lh: 1.35 });
  });
  const mid = (a, b) => (a + b) / 2;
  s += arrow(xs[0] + nw + 4, y1 + nh / 2, xs[1] - 4, y1 + nh / 2, { green: true, sw: 4 });
  s += arrow(mid(xs[1], xs[1] + nw), y1 + nh + 4, mid(xs[1], xs[1] + nw), y2 - 4, { green: true, sw: 4 });
  s += arrow(xs[1] - 4, y2 + nh / 2, xs[0] + nw + 4, y2 + nh / 2, { green: true, sw: 4 });
  s += arrow(mid(xs[0], xs[0] + nw), y2 - 4, mid(xs[0], xs[0] + nw), y1 + nh + 4, { green: true, sw: 4 });
  let h = y2 + nh + 40;
  if (bannerText) { const b = banner(h, bannerText, { fill: C.greenSoft, fg: C.ink }); s += b.svg; h += b.h + 36; } else h += 4;
  return svg(W, h, s, alt ?? title);
};

/* ------------------------------------------------------------ timeline */
// Four phases along a horizontal line.
export const timeline = ({ title, subtitle, phases, bannerText, alt }) => {
  const n = phases.length, gap = 24, cw = (1100 - (n - 1) * gap) / n, size = 19, inner = cw - 52;
  const prepared = phases.map((p) => ({ when: p.when, head: wrap(p.head, 24, inner, 800), items: p.items.map((it) => wrap(it, size, inner - 18, 400)) }));
  const ch = Math.max(...prepared.map((p) => 96 + p.head.length * 30 + p.items.reduce((a, l) => a + l.length * size * 1.3 + 12, 0))) + 8;
  const lineY = 170;
  let s = header(title, subtitle) + `<line x1="70" y1="${lineY}" x2="1130" y2="${lineY}" stroke="${C.green}" stroke-width="5" stroke-linecap="round"/>`;
  prepared.forEach((p, i) => {
    const x = 50 + i * (cw + gap);
    s += `<circle cx="${x + 36}" cy="${lineY}" r="16" fill="${i === n - 1 ? C.amber : C.green}" stroke="#fff" stroke-width="4"/>`;
    s += rect(x, lineY + 34, cw, ch, { fill: C.card, stroke: C.line, r: 14 });
    s += text(x + 24, lineY + 74, p.when.toUpperCase(), { size: 15, weight: 800, fill: C.green });
    s += text(x + 24, lineY + 108, p.head, { size: 24, weight: 800, lh: 1.25 });
    let y = lineY + 108 + (p.head.length - 1) * 30 + 42;
    for (const lines of p.items) {
      s += `<circle cx="${x + 30}" cy="${y - 6}" r="4" fill="${C.green}"/>` + text(x + 46, y, lines, { size, fill: C.ink, lh: 1.3 });
      y += lines.length * size * 1.3 + 12;
    }
  });
  let h = lineY + 34 + ch + 36;
  if (bannerText) { const b = banner(h, bannerText); s += b.svg; h += b.h + 36; } else h += 4;
  return svg(W, h, s, alt ?? title);
};
