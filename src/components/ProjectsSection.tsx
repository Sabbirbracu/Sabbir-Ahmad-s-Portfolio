import projects from "@/data/projects";
import { Project, getStatusLabel } from "@/types/project";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* Client-facing selection, in pitch order */
const FEATURED_ORDER = ["rchms", "shaadimartbd", "ai-customer-support"];
const featuredProjects = FEATURED_ORDER.map((slug) =>
  projects.find((p) => p.slug === slug),
).filter(Boolean) as Project[];

const collectImages = (p: Project): string[] => {
  const imgs: string[] = [];
  if (p.media.banner) imgs.push(p.media.banner);
  p.media.gallery?.forEach((g) => {
    if (!imgs.includes(g)) imgs.push(g);
  });
  return imgs;
};

const StatusPill = ({ project }: { project: Project }) => (
  <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-[hsl(165_28%_11%/0.15)] px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-foreground font-semibold shadow-sm">
    {project.status === "in-progress" ? (
      <>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(42_88%_50%)] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(42_88%_50%)]" />
        </span>
        Now Building
      </>
    ) : (
      <>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        Live
      </>
    )}
  </span>
);

/* Auto-sliding screenshot gallery (falls back to a typographic tile) */
const ProjectShowcase = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const images = useMemo(() => collectImages(project), [project]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % images.length),
      4000 + index * 350,
    );
    return () => clearInterval(t);
  }, [images.length, index]);

  return (
    <div className="group relative aspect-[16/10] overflow-hidden bg-[hsl(160_62%_26%)] p-1 shadow-2xl hover:shadow-3xl transition-all duration-500">
      {/* Inner container */}
      <div className="relative w-full h-full bg-white overflow-hidden">
        {images.length > 0 ? (
          <>
            {/* Images with premium frame */}
            <div className="relative w-full h-full p-8 md:p-10 bg-gradient-to-br from-[hsl(75_22%_99%)] to-[hsl(78_26%_97%)]">
              {images.map((src, i) => (
                <div
                  key={src}
                  className={`absolute inset-8 md:inset-10 transition-all duration-1000 ${
                    i === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${project.title} — screenshot ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top shadow-xl rounded-sm"
                  />
                </div>
              ))}
            </div>

            {/* Premium top badge */}
            <div className="absolute top-4 left-4 z-20">
              <StatusPill project={project} />
            </div>

            {/* Navigation dots - elegant style */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-[hsl(165_28%_11%/0.1)] shadow-lg">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === current 
                        ? "w-8 bg-[hsl(160_62%_26%)]" 
                        : "w-2 bg-[hsl(165_28%_11%/0.25)] hover:bg-[hsl(165_28%_11%/0.4)]"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Premium fallback design */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(75_22%_99%)] via-[hsl(78_26%_97%)] to-[hsl(160_62%_96%)] flex flex-col items-center justify-center gap-6 p-8">
              {/* Icon container with gradient border */}
              <div className="relative">
                <div className="absolute inset-0 bg-[hsl(160_62%_26%)] blur-xl opacity-30" />
                <div className="relative w-28 h-28 md:w-36 md:h-36 bg-[hsl(160_62%_26%)] flex items-center justify-center shadow-2xl">
                  <span className="font-heading text-6xl md:text-7xl font-black text-white">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-foreground font-bold block">
                  {project.status === "in-progress" ? "In Development" : project.tagline}
                </span>
              </div>
            </div>

            {/* Top badge */}
            <div className="absolute top-2 left-2 z-20">
              <StatusPill project={project} />
            </div>
          </>
        )}

        {/* Elegant corner decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[hsl(160_62%_26%/0.2)]" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[hsl(42_88%_50%/0.3)]" />
      </div>

      {/* Premium glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(42_88%_50%/0.2)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="work" className="relative py-20 md:py-28 overflow-hidden">
      {/* Clean background graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-radial from-[hsl(160_62%_26%/0.06)] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gradient-radial from-[hsl(42_88%_50%/0.04)] to-transparent rounded-full blur-3xl" />
        
        {/* Minimal grid overlay - very subtle */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(160 62% 26%) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(160 62% 26%) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Vertical accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[hsl(160_62%_26%/0.06)] to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[hsl(42_88%_50%/0.04)] to-transparent" />
        
        {/* Left side decorations */}
        <div className="absolute top-40 left-8 w-20 h-20 border border-[hsl(160_62%_26%/0.08)] rotate-12" />
        <div className="absolute top-1/3 left-12 w-3 h-3 bg-[hsl(160_62%_26%/0.15)] rounded-full" />
        <div className="absolute bottom-1/4 left-6 w-2 h-2 bg-[hsl(42_88%_50%/0.2)] rounded-full" />
        <div className="absolute bottom-40 left-10 w-24 h-24 border border-[hsl(42_88%_50%/0.06)]" />
        
        {/* Right side decorations */}
        <div className="absolute top-60 right-12 w-16 h-16 border border-[hsl(42_88%_50%/0.1)] rotate-45" />
        <div className="absolute top-1/2 right-8 w-2.5 h-2.5 bg-[hsl(160_62%_26%/0.18)] rounded-full" />
        <div className="absolute bottom-1/3 right-16 w-3 h-3 bg-[hsl(42_88%_50%/0.15)] rounded-full" />
        <div className="absolute bottom-32 right-10 w-20 h-20 border border-[hsl(160_62%_26%/0.08)] -rotate-12" />
        
        {/* Corner accent elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-[hsl(160_62%_26%/0.06)]" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-[hsl(42_88%_50%/0.08)]" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rule pt-8 mb-16 md:mb-24"
        >
          <p className="eyebrow mb-6">
            <span className="eyebrow-index">02</span> — Selected Work
          </p>
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] sm:leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.04em] text-foreground">
              Turning ideas into{" "}
              <span className="bg-gradient-to-br from-[hsl(160_62%_22%)] via-[hsl(160_62%_24%)] to-[hsl(95_55%_32%)] bg-clip-text text-transparent">
                production
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              A collection of software products built for startups and businesses—from early-stage MVPs to production-ready platforms used by real users.
            </p>
          </div>
        </motion.div>

        {/* Alternating feature rows */}
        <div className="space-y-16 md:space-y-24">
          {featuredProjects.map((project, index) => {
            const flipped = index % 2 === 1;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Showcase */}
                <Link
                  to={`/projects/${project.slug}`}
                  className={`md:col-span-7 ${flipped ? "md:order-2" : ""}`}
                >
                  <ProjectShowcase project={project} index={index} />
                </Link>

                {/* Content */}
                <div className={`md:col-span-5 ${flipped ? "md:order-1" : ""}`}>
                  <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    <span className="text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>{" "}
                    / {project.tagline}
                  </p>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="group inline-flex items-center gap-2 mt-3"
                  >
                    <h3 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-6 h-6 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>

                  <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.caseStudy?.features && (
                    <div className="mt-6">
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                        Highlights
                      </p>
                      <ul className="space-y-2">
                        {project.caseStudy.features.slice(0, 4).map((f) => (
                          <li
                            key={f}
                            className="flex gap-2.5 text-sm text-foreground/90"
                          >
                            <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                            <span className="leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Stack chips */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack?.primary?.map((tech) => (
                      <span
                        key={tech}
                        className="border border-border bg-card rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.06em] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-foreground hover:scale-105 h-12 px-6 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-lg hover:shadow-2xl"
                    >
                      Case Study
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background hover:scale-105 h-12 px-6 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300"
                      >
                        Live <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all + GitHub */}
        <div className="mt-20 md:mt-24 rule pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground hover:bg-foreground hover:scale-105 h-14 px-10 font-mono text-sm tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://github.com/Sabbirbracu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background hover:scale-105 h-14 px-10 font-mono text-sm tracking-[0.15em] uppercase font-bold transition-all duration-300"
          >
            More on GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
