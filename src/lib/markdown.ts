// Helpers shared by the article page and its renderer.

export const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export interface Heading {
  id: string;
  text: string;
}

// H2 headings for the "In this article" list. Skips anything inside fenced code blocks.
export const extractHeadings = (markdown: string): Heading[] => {
  const headings: Heading[] = [];
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const match = line.match(/^## (.+)$/);
    if (match) {
      const text = match[1].replace(/[*_`]/g, "").trim();
      // The id keeps the full text (it must match the rendered heading); the list label drops a leading
      // "1. " so numbered headings aren't double-numbered next to the list's own 01, 02, ...
      headings.push({ id: slugifyHeading(text), text: text.replace(/^\d+\.\s+/, "") });
    }
  }
  return headings;
};

// The page already shows the title as an H1, so drop a duplicate leading "# Title" from older articles.
export const stripLeadingTitle = (markdown: string, title: string) => {
  const trimmed = markdown.trimStart();
  const match = trimmed.match(/^# (.+)\n/);
  return match && match[1].trim().toLowerCase() === title.trim().toLowerCase() ? trimmed.slice(match[0].length) : markdown;
};
