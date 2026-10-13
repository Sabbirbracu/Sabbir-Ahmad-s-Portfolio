"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { slugifyHeading } from "@/lib/markdown";
import { Article, useGetArticlesQuery } from "@/store/api/apiSlice";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, ChevronUp, Clock } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// Categories listed here come first, in this order. Any new category appears after them, A to Z.
const CATEGORY_ORDER = ["AI & Automation", "SaaS Architecture", "Performance"];
const PER_ROW = 3;

interface Group {
  name: string;
  id: string;
  articles: Article[];
}

const groupByCategory = (articles: Article[]): Group[] => {
  const map = new Map<string, Article[]>();
  for (const a of articles) {
    const name = a.category?.trim() || "More articles";
    map.set(name, [...(map.get(name) ?? []), a]);
  }
  const rank = (name: string) => {
    const i = CATEGORY_ORDER.indexOf(name);
    return i === -1 ? CATEGORY_ORDER.length : i;
  };
  return [...map.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .map(([name, list]) => ({ name, id: `category-${slugifyHeading(name)}`, articles: list }));
};

const ArticleCard = ({ article, index }: { article: Article; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: (index % PER_ROW) * 0.07 }}
    className="flex"
  >
    <Link
      href={`/article/${article.slug}`}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      {article.image && (
        <div className="aspect-[1200/630] w-full overflow-hidden bg-[hsl(162_30%_12%)]">
          <img
            src={article.image}
            alt={`Cover illustration for ${article.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {article.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
        </div>
        <h3 className="font-heading text-xl font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.description}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-foreground">
          Read more
          <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  </motion.article>
);

const ArticlesPage = () => {
  const { data, isLoading, isError } = useGetArticlesQuery();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const groups = useMemo(() => groupByCategory(data ?? []), [data]);
  const total = data?.length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-10 h-[500px] w-[500px] rounded-full bg-gradient-radial from-[hsl(160_62%_26%/0.1)] to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-radial from-[hsl(42_88%_50%/0.06)] to-transparent blur-3xl" />
        </div>
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow mb-6">
              <span className="text-[hsl(160_62%_40%)]">Blog</span> <span className="text-muted-foreground">— Articles</span>
            </p>
            <h1 className="mb-6 max-w-4xl font-heading text-[2.5rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[3.5rem] md:text-[4.5rem]">
              Practical notes on{" "}
              <span className="bg-gradient-to-br from-[hsl(160_62%_22%)] via-[hsl(160_62%_26%)] to-[hsl(95_55%_32%)] bg-clip-text text-transparent">
                building software
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Articles on AI integration, SaaS architecture, performance, and shipping products, written from real production work.
            </p>

            {/* Category jump links */}
            {groups.length > 1 && (
              <nav aria-label="Article categories" className="mt-10 flex flex-wrap gap-3">
                {groups.map((g) => (
                  <a
                    key={g.id}
                    href={`#${g.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {g.name}
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{g.articles.length}</span>
                  </a>
                ))}
              </nav>
            )}
          </motion.div>
        </div>
      </section>

      {/* Category sections */}
      <main className="section-container pb-24">
        {isLoading && (
          <div className="space-y-16" aria-busy="true">
            {[0, 1].map((s) => (
              <div key={s}>
                <Skeleton className="mb-8 h-10 w-72" />
                <div className="grid gap-6 md:grid-cols-3">
                  {[0, 1, 2].map((i) => (
                    <Skeleton key={i} className="h-[420px] w-full rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="font-heading text-xl font-bold text-foreground">Couldn't load the articles</p>
            <p className="mt-2 text-sm text-muted-foreground">Please check your connection and try again in a moment.</p>
          </div>
        )}

        {!isLoading && !isError && total === 0 && (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="font-heading text-xl font-bold text-foreground">No articles yet</p>
            <p className="mt-2 text-sm text-muted-foreground">New articles are on the way.</p>
          </div>
        )}

        <div className="space-y-20 md:space-y-24">
          {groups.map((g) => {
            const isOpen = !!expanded[g.name];
            const visible = isOpen ? g.articles : g.articles.slice(0, PER_ROW);
            const hidden = g.articles.length - PER_ROW;
            return (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`} className="scroll-mt-28">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-5">
                  <div>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {g.articles.length} {g.articles.length === 1 ? "article" : "articles"}
                    </p>
                    <h2 id={`${g.id}-heading`} className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                      {g.name}
                    </h2>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {visible.map((a, i) => (
                    <ArticleCard key={a.slug} article={a} index={i} />
                  ))}
                </div>

                {hidden > 0 && (
                  <div className="mt-8 flex justify-center">
                    <Button variant="outline" className="gap-2 font-mono text-xs uppercase tracking-[0.15em]" onClick={() => setExpanded((e) => ({ ...e, [g.name]: !isOpen }))}>
                      {isOpen ? (
                        <>
                          Show fewer <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show {hidden} more in {g.name} <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlesPage;
