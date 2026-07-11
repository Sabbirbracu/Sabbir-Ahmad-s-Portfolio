import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import projects from "@/data/projects";
import { getStatusLabel } from "@/types/project";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Projects — Sabbir Ahmad</title>
        <meta
          name="description"
          content="Shipped, verifiable work by Sabbir Ahmad — full-stack products in production, with live links and full case studies."
        />
      </Helmet>

      <Navbar />

      <section className="pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14 md:mb-20"
          >
            <p className="eyebrow mb-6">
              <span className="eyebrow-index">Index</span> — All Projects
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight text-foreground max-w-3xl">
              Shipped work, with the{" "}
              <span className="text-primary">receipts</span>.
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Every project links to a live product or a real repository, with
              a full case study — the problem, the architecture, the decisions,
              and what happened after launch.
            </p>
          </motion.div>

          {/* Index */}
          <div>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block rule py-10 md:py-12"
                >
                  <div className="grid grid-cols-12 gap-y-6 md:gap-x-8 items-start">
                    <div className="col-span-2 md:col-span-1">
                      <span className="font-mono text-sm text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="col-span-10 md:col-span-6">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                        <ArrowUpRight className="w-5 h-5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {project.status === "in-progress" && (
                          <span className="font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1 border border-primary/40 text-primary">
                            Now Building
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-mono text-xs tracking-[0.1em] uppercase text-muted-foreground">
                        {project.tagline}
                      </p>
                      <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                    </div>

                    <div className="col-span-12 md:col-span-3 md:col-start-9 md:text-right">
                      <p className="font-mono text-xs text-muted-foreground leading-loose">
                        {project.techStack?.primary?.join(" · ")}
                      </p>
                      <p className="mt-3 font-mono text-xs text-foreground">
                        {project.year} — {getStatusLabel(project.status)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="rule pt-6">
            <p className="font-mono text-xs text-muted-foreground">
              More experiments and open source on{" "}
              <a
                href="https://github.com/Sabbirbracu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground editorial-link"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
