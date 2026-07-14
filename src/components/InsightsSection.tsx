import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  GitBranch,
  Gauge,
  Layers,
} from "lucide-react";

const articles = [
  {
    icon: Boxes,
    accent: "primary" as const,
    category: "SaaS Architecture",
    title: "Building SaaS Products That Scale",
    excerpt:
      "The architecture decisions that let a product grow from its first user to its first thousand — multi-tenancy, billing, and the parts nobody plans for.",
    readTime: "8 min read",
  },
  {
    icon: GitBranch,
    accent: "amber" as const,
    category: "Engineering Strategy",
    title: "Choosing the Right Tech Stack",
    excerpt:
      "Why the best stack is rarely the newest one — a practical framework for choosing technologies your business won't regret.",
    readTime: "6 min read",
  },
  {
    icon: BrainCircuit,
    accent: "primary" as const,
    category: "AI & Automation",
    title: "AI Integration for Modern Businesses",
    excerpt:
      "Where AI actually pays off in business software — and where it's just an expensive demo.",
    readTime: "7 min read",
  },
  {
    icon: Layers,
    accent: "amber" as const,
    category: "Production Notes",
    title: "Lessons from Shipping Production Software",
    excerpt:
      "What 17+ production launches taught me about deadlines, debugging, and building things that survive contact with real users.",
    readTime: "9 min read",
  },
  {
    icon: Gauge,
    accent: "primary" as const,
    category: "Performance",
    title: "Next.js Performance Optimization",
    excerpt:
      "From slow to instant — the rendering, caching, and bundle strategies that make Next.js apps feel fast.",
    readTime: "6 min read",
  },
];

/* Designed editorial cover — visual anchor without stock photos */
const ArticleCover = ({
  article,
  index,
  featured = false,
}: {
  article: (typeof articles)[number];
  index: number;
  featured?: boolean;
}) => {
  const Icon = article.icon;
  const accentText = article.accent === "amber" ? "text-amber" : "text-primary";
  const accentBorder =
    article.accent === "amber" ? "border-amber/40" : "border-primary/40";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border section-dark bg-dark-glow ${
        featured ? "h-full min-h-[260px]" : "aspect-[16/9]"
      }`}
    >
      {/* Ghost index */}
      <span className="pointer-events-none absolute -right-3 -bottom-8 font-heading text-[9rem] leading-none font-semibold text-[hsl(78_30%_95%/0.05)] select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon emblem */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex items-center justify-center border ${accentBorder} bg-[hsl(160_20%_16%/0.6)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 ${
            featured ? "w-20 h-20" : "w-14 h-14"
          }`}
        >
          <Icon className={`${featured ? "w-9 h-9" : "w-6 h-6"} ${accentText}`} />
        </span>
      </div>

      {/* Category chip */}
      <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.15em] uppercase text-[hsl(78_30%_92%)] border border-[hsl(158_14%_28%)] bg-[hsl(162_30%_10%/0.7)] backdrop-blur-sm rounded-full px-3 py-1.5">
        {article.category}
      </span>

      {/* Coming soon pill */}
      <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-amber border border-amber/40 bg-[hsl(162_30%_10%/0.7)] backdrop-blur-sm rounded-full px-3 py-1.5">
        Soon
      </span>
    </div>
  );
};

const InsightsSection = () => {
  const [featured, ...rest] = articles;

  return (
    <section id="insights" className="section-sand py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rule pt-8 mb-14 md:mb-20"
        >
          <p className="eyebrow mb-6">
            <span className="eyebrow-index">09</span> — Insights
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-2xl">
              Sharing what I learn while{" "}
              <span className="text-primary">building software</span>.
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Articles on software engineering, SaaS architecture, AI
              development, and lessons from production systems.
            </p>
          </div>
        </motion.div>

        {/* Featured article */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group grid md:grid-cols-2 gap-6 md:gap-8 border border-border bg-card rounded-2xl p-4 md:p-5 mb-6 md:mb-8 cursor-default transition-colors hover:border-primary/40"
        >
          <ArticleCover article={featured} index={0} featured />

          <div className="flex flex-col justify-center p-2 md:p-6">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
              <span className="text-primary">Featured</span> · {featured.readTime}
            </p>
            <h3 className="mt-4 font-heading text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {featured.title}
            </h3>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
              {featured.excerpt}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-foreground">
              Publishing soon
              <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </motion.article>

        {/* Article grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {rest.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col border border-border bg-card rounded-2xl p-4 cursor-default transition-all hover:border-primary/40 hover:-translate-y-1"
            >
              <ArticleCover article={article} index={i + 1} />

              <div className="flex flex-col flex-1 pt-5 px-1 pb-2">
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  {article.readTime}
                </p>
                <h3 className="mt-2 font-heading text-base md:text-lg font-semibold tracking-tight leading-snug text-foreground group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
          First articles publishing soon — written from real production work
        </p>
      </div>
    </section>
  );
};

export default InsightsSection;
