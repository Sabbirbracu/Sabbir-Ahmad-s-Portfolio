"use client";

import ArticleBody from "@/components/blog/ArticleBody";
import ShareDialog from "@/components/blog/ShareDialog";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { extractHeadings, stripLeadingTitle } from "@/lib/markdown";
import { useGetArticleBySlugQuery, useGetArticlesQuery } from "@/store/api/apiSlice";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [shareOpen, setShareOpen] = useState(false);
  const { data: article, isLoading, isError } = useGetArticleBySlugQuery(id ?? "", { skip: !id });
  const { data: allArticles = [] } = useGetArticlesQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground animate-pulse">Loading article…</p>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/#insights">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const body = stripLeadingTitle(article.content, article.title);
  const headings = extractHeadings(body);
  const others = allArticles.filter((a) => a.slug !== article.slug);
  // Same-category articles first, then the newest of the rest.
  const related = [...others.filter((a) => a.category === article.category), ...others.filter((a) => a.category !== article.category)].slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-container pt-28 md:pt-36 pb-20">
        <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <Button asChild variant="ghost" size="sm" className="gap-2 -ml-3 text-muted-foreground">
              <Link href="/articles">
                <ArrowLeft className="w-4 h-4" />
                All articles
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShareOpen(true)} className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Header */}
          <header>
            {article.category && (
              <span className="inline-block px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded-full mb-5">
                {article.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-[2.9rem] font-extrabold font-heading tracking-tight text-foreground leading-[1.12] mb-6">
              {article.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">{article.description}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-8 border-b border-border/60">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">SA</span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-foreground">Sabbir Ahmad</p>
                  <p className="text-xs text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </header>

          {/* Cover */}
          {article.image && (
            <figure className="my-10">
              <img
                src={article.image}
                alt={`Cover illustration for ${article.title}`}
                className="w-full h-auto rounded-2xl border border-border/60 shadow-lg"
              />
            </figure>
          )}

          {/* In this article */}
          {headings.length >= 3 && (
            <nav aria-label="In this article" className="mb-10 rounded-xl border border-border/60 bg-muted/30 p-6">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">In this article</p>
              <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {headings.map((h, i) => (
                  <li key={h.id} className="flex gap-3 text-sm">
                    <span className="font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <a href={`#${h.id}`} className="text-foreground/80 transition-colors hover:text-primary">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Body */}
          <ArticleBody content={body} />

          {/* Share prompt */}
          <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-heading text-lg font-bold text-foreground">Found this useful?</p>
              <p className="text-sm text-muted-foreground">Share it with someone who is building something similar.</p>
            </div>
            <Button onClick={() => setShareOpen(true)} className="gap-2 shrink-0">
              <Share2 className="w-4 h-4" />
              Share this article
            </Button>
          </div>

          {/* Author */}
          <aside className="mt-16 flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-6 sm:flex-row sm:items-center">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">SA</span>
            <div className="flex-1">
              <p className="font-heading text-lg font-bold text-foreground">Written by Sabbir Ahmad</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Software engineer building SaaS platforms, custom business systems, and AI-powered products for startups and growing businesses.
              </p>
            </div>
            <Button asChild>
              <Link href="/#contact">Work with me</Link>
            </Button>
          </aside>
        </motion.article>

        {/* More articles */}
        {related.length > 0 && (
          <section className="max-w-3xl mx-auto mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-heading text-2xl font-bold text-foreground">Keep reading</h2>
              <Link href="/articles" className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-primary hover:underline">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((a) => (
                <Link key={a.slug} href={`/article/${a.slug}`} className="group overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  {a.image && <img src={a.image} alt="" loading="lazy" className="aspect-[1200/630] w-full object-cover" />}
                  <div className="p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{a.category}</p>
                    <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-foreground group-hover:text-primary">{a.title}</h3>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      {a.readTime} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <ShareDialog open={shareOpen} onOpenChange={setShareOpen} title={article.title} description={article.description} />

      <Footer />
    </div>
  );
};

export default ArticlePage;
