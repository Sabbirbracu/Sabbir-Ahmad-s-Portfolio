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

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[hsl(160_62%_30%/0.15)] bg-gradient-to-br from-[hsl(162_30%_14%)] via-[hsl(162_30%_12%)] to-[hsl(162_30%_10%)] ${
        featured ? "h-full min-h-[260px]" : "aspect-[16/9]"
      }`}
    >
      {/* Clean ghost index */}
      <span className="pointer-events-none absolute -right-2 -bottom-5 font-heading text-[7rem] leading-none font-extrabold text-white/[0.025] select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon emblem - centered and clean */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Subtle glow */}
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

      {/* Coming soon pill - bottom right */}
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] uppercase text-[hsl(42_88%_55%)] border border-[hsl(42_88%_50%/0.25)] bg-[hsl(42_88%_15%/0.3)] backdrop-blur-sm rounded-full px-2.5 py-1.5 font-semibold">
        Soon
      </span>
    </div>
  );
};

const InsightsSection = () => {
  const [featured, ...rest] = articles;

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

        {/* Featured article */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group grid md:grid-cols-2 gap-6 md:gap-8 border border-[hsl(160_62%_30%/0.15)] bg-card rounded-xl p-5 md:p-6 mb-6 md:mb-8 cursor-default transition-all duration-300 hover:border-[hsl(160_62%_35%/0.3)] hover:shadow-lg hover:shadow-[hsl(160_62%_26%/0.08)]"
        >
          <ArticleCover article={featured} index={0} featured />

          <div className="flex flex-col justify-center p-2 md:p-4">
            {/* Category badge */}
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
              Publishing soon
              <ArrowUpRight className="w-4 h-4 text-[hsl(160_62%_40%)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
              className="group flex flex-col border border-[hsl(160_62%_30%/0.15)] bg-card rounded-xl p-4 cursor-default transition-all duration-300 hover:border-[hsl(160_62%_35%/0.3)] hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[hsl(160_62%_26%/0.08)]"
            >
              <ArticleCover article={article} index={i + 1} />

              <div className="flex flex-col flex-1 pt-5 px-1 pb-2">
                {/* Category badge */}
                <span className="inline-flex items-center w-fit font-mono text-[9px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] bg-[hsl(160_62%_30%/0.1)] border border-[hsl(160_62%_30%/0.2)] px-2 py-1 mb-3 font-bold">
                  {article.category}
                </span>
                
                <h3 className="font-heading text-base md:text-lg font-extrabold tracking-tight leading-snug text-foreground group-hover:text-[hsl(160_62%_35%)] transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                
                {/* Read time at bottom */}
                <p className="mt-auto pt-4 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  {article.readTime}
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
