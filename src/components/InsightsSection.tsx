import { Skeleton } from "@/components/ui/skeleton";
import { Article, useGetArticlesQuery } from "@/store/api/apiSlice";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Layers,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

/* A card is either a published article (links to /article/<slug>) or a planned topic marked "Soon". */
interface Card {
  key: string;
  href?: string;
  image?: string;
  icon: LucideIcon;
  category: string;
  title: string;
  excerpt: string;
  readTime?: string;
  soon: boolean;
}

/* Topics that are planned but not written yet. They fill the empty slots until real articles replace them. */
const PLANNED: Card[] = [
  {
    key: "planned-production-lessons",
    icon: Layers,
    category: "Production Notes",
    title: "Lessons from Shipping Production Software",
    excerpt:
      "What 17+ production launches taught me about deadlines, debugging, and building things that survive contact with real users.",
    readTime: "9 min read",
    soon: true,
  },
];

const SLOTS = 5; // one featured card + four in the grid

const toCard = (a: Article): Card => ({
  key: a.slug,
  href: `/article/${a.slug}`,
  image: a.image,
  icon: BookOpen,
  category: a.category ?? "Article",
  title: a.title,
  excerpt: a.description,
  readTime: a.readTime,
  soon: false,
});

/* Real cover image for published articles; designed emblem (no stock photos) for planned ones */
const ArticleCover = ({
  article,
  index,
  featured = false,
}: {
  article: Card;
  index: number;
  featured?: boolean;
}) => {
  const Icon = article.icon;

  if (article.image) {
    return (
      <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-xl border border-[hsl(160_62%_30%/0.15)] bg-[hsl(162_30%_12%)]">
        <img
          src={article.image}
          alt={`Cover illustration for ${article.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[1200/630] w-full overflow-hidden rounded-xl border border-[hsl(160_62%_30%/0.15)] bg-gradient-to-br from-[hsl(162_30%_14%)] via-[hsl(162_30%_12%)] to-[hsl(162_30%_10%)]"
    >
      <span className="pointer-events-none absolute -right-2 -bottom-5 font-heading text-[7rem] leading-none font-extrabold text-white/[0.025] select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(160_62%_30%/0.2)] to-[hsl(160_62%_30%/0.05)] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />
          <span
            className={`relative flex items-center justify-center bg-[hsl(160_62%_26%)] border border-[hsl(160_62%_35%/0.3)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[hsl(160_62%_28%)] ${
              featured ? "w-20 h-20" : "w-16 h-16"
            }`}
          >
            <Icon className={`${featured ? "w-9 h-9" : "w-7 h-7"} text-white`} />
          </span>
        </div>
      </div>

      {article.soon && (
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] uppercase text-[hsl(42_88%_55%)] border border-[hsl(42_88%_50%/0.25)] bg-[hsl(42_88%_15%/0.3)] backdrop-blur-sm rounded-full px-2.5 py-1.5 font-semibold">
          Soon
        </span>
      )}
    </div>
  );
};

/* Wraps a card in a link only when it points at a real article */
const MaybeLink = ({ href, className, children }: { href?: string; className?: string; children: React.ReactNode }) =>
  href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );

const InsightsSection = () => {
  const { data, isLoading } = useGetArticlesQuery();

  // Newest published articles first, then planned topics to fill whatever slots remain.
  const published = (data ?? []).map(toCard);
  const cards = [...published, ...PLANNED].slice(0, SLOTS);
  const [featured, ...rest] = cards;
  const hasSoon = cards.some((c) => c.soon);
  const totalPublished = published.length;

  return (
    <section id="insights" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-gradient-radial from-[hsl(160_62%_26%/0.08)] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[hsl(42_88%_50%/0.05)] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <div className="border-t border-border pt-8">
            <p className="eyebrow mb-6">
              <span className="text-[hsl(160_62%_40%)]">09</span> <span className="text-muted-foreground">— Insights</span>
            </p>
            <h2 className="font-heading text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] sm:leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.04em] text-foreground mb-6">
              Sharing what I learn
              <br />
              while{" "}
              <span className="bg-gradient-to-br from-[hsl(160_62%_22%)] via-[hsl(160_62%_26%)] to-[hsl(95_55%_32%)] bg-clip-text text-transparent">building software</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Articles on software engineering, SaaS architecture, AI
              development, and lessons from production systems.
            </p>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="space-y-6 md:space-y-8" aria-busy="true">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[340px] w-full rounded-xl" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Featured article */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 md:mb-8"
            >
              <MaybeLink
                href={featured.href}
                className={`group grid md:grid-cols-2 items-center gap-6 md:gap-8 border border-[hsl(160_62%_30%/0.15)] bg-card rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[hsl(160_62%_35%/0.3)] hover:shadow-lg hover:shadow-[hsl(160_62%_26%/0.08)] ${
                  featured.href ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <ArticleCover article={featured} index={0} featured />

                <div className="flex flex-col justify-center p-2 md:p-4">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] bg-[hsl(160_62%_30%/0.1)] border border-[hsl(160_62%_30%/0.2)] px-2.5 py-1 font-bold">
                      {featured.category}
                    </span>
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                      {featured.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-[hsl(160_62%_35%)] transition-colors">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
                    {featured.excerpt}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-foreground font-bold">
                    {featured.soon ? "Publishing soon" : "Read article"}
                    <ArrowUpRight className="w-4 h-4 text-[hsl(160_62%_40%)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </MaybeLink>
            </motion.article>

            {/* Article grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {rest.map((article, i) => (
                <motion.article
                  key={article.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex"
                >
                  <MaybeLink
                    href={article.href}
                    className={`group flex w-full flex-col border border-[hsl(160_62%_30%/0.15)] bg-card rounded-xl p-4 transition-all duration-300 hover:border-[hsl(160_62%_35%/0.3)] hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[hsl(160_62%_26%/0.08)] ${
                      article.href ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <ArticleCover article={article} index={i + 1} />

                    <div className="flex flex-col flex-1 pt-5 px-1 pb-2">
                      <span className="inline-flex items-center w-fit font-mono text-[9px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] bg-[hsl(160_62%_30%/0.1)] border border-[hsl(160_62%_30%/0.2)] px-2 py-1 mb-3 font-bold">
                        {article.category}
                      </span>

                      <h3 className="font-heading text-base md:text-lg font-extrabold tracking-tight leading-snug text-foreground group-hover:text-[hsl(160_62%_35%)] transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

                      <p className="mt-auto pt-4 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                        {article.readTime}
                      </p>
                    </div>
                  </MaybeLink>
                </motion.article>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-5 md:mt-14">
              <Link
                href="/articles"
                className="group inline-flex h-14 items-center gap-3 bg-primary px-10 font-mono text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-foreground hover:shadow-2xl"
              >
                {totalPublished > SLOTS ? `View all ${totalPublished} articles` : "View all articles"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {hasSoon && (
                <p className="text-center font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  More articles on the way — written from real production work
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default InsightsSection;
