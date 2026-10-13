// Tiny SVG helpers shared by the blog art generator. Output is plain SVG using a system font stack
// (images embedded via <img> cannot load web fonts).
export const C = {
  ink: "#17211c", muted: "#5b6b63", line: "#cfd9d4", bg: "#f6f9f7", card: "#ffffff",
  green: "#176c4f", greenSoft: "#e3f1ea", greenDark: "#0f3d2e", night: "#13251d",
  amber: "#e8a50c", amberSoft: "#fdf3d8", red: "#c2412d", redSoft: "#fbe6e1", grey: "#eef2f0",
};
export const FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
export const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const svg = (w, h, body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)}" font-family="${FONT}">
<title>${esc(title)}</title>
<defs>
  <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.muted}"/></marker>
  <marker id="arrg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.green}"/></marker>
</defs>
<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="18" fill="${C.bg}" stroke="${C.line}" stroke-width="2"/>
${body}
</svg>
`;

export const rect = (x, y, w, h, { fill = C.card, stroke = C.line, sw = 2, r = 12 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

// Multi-line text. `lines` is a string or array of strings.
export const text = (x, y, lines, { size = 22, weight = 400, fill = C.ink, anchor = "start", lh = 1.3, mono = false, rotate } = {}) => {
  const arr = Array.isArray(lines) ? lines : [lines];
  const tr = rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : "";
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${mono ? ` font-family="${MONO}"` : ""}${tr}>${arr
    .map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : size * lh}">${esc(l)}</tspan>`)
    .join("")}</text>`;
};

export const arrow = (x1, y1, x2, y2, { color = C.muted, sw = 3, green = false, dash = false } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${green ? C.green : color}" stroke-width="${sw}" ${dash ? 'stroke-dasharray="8 7" ' : ""}marker-end="url(#${green ? "arrg" : "arr"})"/>`;

export const path = (d, { color = C.muted, sw = 3, green = false, dash = false } = {}) =>
  `<path d="${d}" fill="none" stroke="${green ? C.green : color}" stroke-width="${sw}" ${dash ? 'stroke-dasharray="8 7" ' : ""}marker-end="url(#${green ? "arrg" : "arr"})"/>`;

export const chip = (x, y, w, label, { fill = C.greenSoft, fg = C.green, size = 18, h = 34 } = {}) =>
  rect(x, y, w, h, { fill, stroke: "none", sw: 0, r: h / 2 }) + text(x + w / 2, y + h / 2 + size * 0.35, label, { size, weight: 600, fill: fg, anchor: "middle" });

export const badge = (cx, cy, n, { fill = C.green } = {}) =>
  `<circle cx="${cx}" cy="${cy}" r="16" fill="${fill}"/>` + text(cx, cy + 7, String(n), { size: 19, weight: 700, fill: "#fff", anchor: "middle" });
