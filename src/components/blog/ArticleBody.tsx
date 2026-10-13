import Link from "next/link";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/markdown";

// Renders an article's markdown with the site's typography. react-markdown does not render raw HTML,
// so article content can't inject markup or scripts.

const textOf = (node: ReactNode): string =>
  typeof node === "string" ? node : Array.isArray(node) ? node.map(textOf).join("") : node && typeof node === "object" && "props" in node ? textOf((node as ReactElement<{ children?: ReactNode }>).props.children) : "";

const Heading = (Tag: "h2" | "h3", cls: string) => {
  const Component = ({ children }: { children?: ReactNode }) => (
    <Tag id={slugifyHeading(textOf(children))} className={`scroll-mt-28 font-heading font-bold tracking-tight text-foreground ${cls}`}>
      {children}
    </Tag>
  );
  return Component;
};

const components: ComponentProps<typeof ReactMarkdown>["components"] = {
  // The page title is the only H1, so a stray "# " in the body becomes a section heading.
  h1: Heading("h2", "text-2xl md:text-[1.7rem] mt-14 mb-4"),
  h2: Heading("h2", "text-2xl md:text-[1.7rem] mt-14 mb-4"),
  h3: Heading("h3", "text-xl mt-10 mb-3"),

  p: ({ node, children }) => {
    // A paragraph holding only an image is rendered as a <figure>; a <figure> can't live inside a <p>.
    const only = node?.children?.length === 1 && node.children[0].type === "element" && node.children[0].tagName === "img";
    return only ? <>{children}</> : <p className="mb-5 text-[1.05rem] leading-[1.85] text-foreground/80">{children}</p>;
  },

  a: ({ href = "", children }) => {
    const external = /^https?:\/\//.test(href);
    const cls = "font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary";
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  },

  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,

  // Bullets are drawn with a ::before marker on direct children; numbered lists keep native numbering.
  ul: ({ children }) => (
    <ul className="mb-6 space-y-2.5 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-[0.72em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-primary [&>li]:before:content-['']">
      {children}
    </ul>
  ),
  ol: ({ children }) => <ol className="mb-6 ml-6 list-decimal space-y-2.5 marker:font-semibold marker:text-primary [&>li]:pl-1.5">{children}</ol>,
  li: ({ children }) => <li className="text-[1.05rem] leading-[1.8] text-foreground/80">{children}</li>,

  blockquote: ({ children }) => (
    <blockquote className="my-8 rounded-r-lg border-l-4 border-primary/50 bg-primary/5 px-6 py-4 text-foreground/80 [&>p]:mb-0">{children}</blockquote>
  ),
  hr: () => <hr className="my-12 border-border/60" />,

  // Fenced code: dark panel with a language label. Inline code is handled by `code` below.
  pre: ({ children }) => {
    const child = (Array.isArray(children) ? children[0] : children) as ReactElement<{ className?: string; children?: ReactNode }>;
    const lang = /language-(\w+)/.exec(child?.props?.className ?? "")?.[1];
    return (
      <div className="group relative my-8 overflow-hidden rounded-xl border border-border/60 bg-[hsl(165_28%_11%)] shadow-sm">
        {lang && <span className="absolute right-3 top-2 font-mono text-[10px] uppercase tracking-widest text-white/40">{lang}</span>}
        <pre className="overflow-x-auto p-5 pt-7 text-[13.5px] leading-relaxed text-[#d7efe4] [font-variant-ligatures:none]">{child?.props?.children}</pre>
      </div>
    );
  },
  code: ({ className, children }) =>
    className ? (
      <code className={`font-mono ${className}`}>{children}</code>
    ) : (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.88em] text-primary">{children}</code>
    ),

  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full border-collapse text-left text-[0.95rem]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/60">{children}</thead>,
  th: ({ children }) => <th className="border-b border-border/60 px-4 py-3 font-semibold text-foreground">{children}</th>,
  td: ({ children }) => <td className="border-b border-border/40 px-4 py-3 align-top text-foreground/80">{children}</td>,

  // Centered figure with a caption taken from the markdown image title: ![alt](url "caption")
  img: ({ src, alt, title }) => (
    <figure className="my-10 text-center">
      <img
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="mx-auto h-auto w-full rounded-xl border border-border/60 bg-card shadow-sm"
      />
      {title && <figcaption className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{title}</figcaption>}
    </figure>
  ),
};

const ArticleBody = ({ content }: { content: string }) => (
  <div className="article-body">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  </div>
);

export default ArticleBody;
