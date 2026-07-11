import projects from "@/data/projects";
import { Project, getStatusLabel } from "@/types/project";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const collectImages = (p: Project): string[] => {
  const imgs: string[] = [];
  if (p.media.banner) imgs.push(p.media.banner);
  p.media.gallery?.forEach((g) => {
    if (!imgs.includes(g)) imgs.push(g);
  });
  return imgs;
};

const StatusPill = ({ project }: { project: Project }) => (
  <span className="inline-flex items-center gap-2 bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-foreground shadow-sm">
    {project.status === "in-progress" ? (
      <>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        Now Building
      </>
    ) : (
      <>
        <span className="inline-flex rounded-full h-1.5 w-1.5 bg-green-600" />
        {getStatusLabel(project.status)}
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
    <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-navy bg-dark-halo">
      {images.length > 0 ? (
        images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${project.title} — screenshot ${i + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-contain p-3 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))
      ) : (
        <div className="absolute inset-0 section-dark bg-dark-halo flex flex-col items-center justify-center gap-3">
          <span className="font-heading text-7xl md:text-8xl font-semibold text-primary">
            {project.title.charAt(0)}
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            {project.status === "in-progress" ? "In development" : project.tagline}
          </span>
        </div>
      )}

      {/* Status pill */}
      <span className="absolute top-4 left-4 z-10">
        <StatusPill project={project} />
      </span>

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {images.map((src, i) => (
            <span
              key={src}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-6 bg-primary" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="work" className="py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rule pt-8 mb-16 md:mb-24"
        >
          <p className="eyebrow mb-6">
            <span className="eyebrow-index">01</span> — Selected Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-2xl">
              Real products. Live links.{" "}
              <span className="text-primary">Verifiable.</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Every project here is shipped work you can click through — no
              mockups, no concepts.
            </p>
          </div>
        </motion.div>

        {/* Alternating feature rows */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => {
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
                  <div className="mt-8 flex items-center gap-6">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
                    >
                      Case Study
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
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
        <div className="mt-20 md:mt-24 rule pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-12 px-8 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://github.com/Sabbirbracu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            More on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
