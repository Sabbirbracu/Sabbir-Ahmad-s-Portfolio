import { ArrowUpRight, Check, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetProjectBySlugQuery } from "@/store/api/apiSlice";
import { getStatusLabel, getTypeLabel, hasCaseStudy } from "../types/project";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, isError } = useGetProjectBySlugQuery(slug ?? "", {
    skip: !slug,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="section-container pt-40 pb-24 text-center">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground animate-pulse">
            Loading project…
          </p>
        </div>
      </main>
    );
  }

  if (isError || !project) {
    return (
      <div className="section-container py-24">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <p className="text-muted-foreground">Could not locate the requested project.</p>
        <Link to="/projects" className="mt-6 inline-block text-primary underline">Back to projects</Link>
      </div>
    );
  }

  const caseStudy = project?.caseStudy;
  const techStack = project?.techStack;
  const links = project?.links;
  const media = project?.media || {};

  return (
    <main className="min-h-screen bg-background">
      {/* Add Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-[hsl(78_26%_99%)] to-white">
        {/* Background graphics */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-gradient-radial from-[hsl(160_62%_26%/0.08)] to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-radial from-[hsl(42_88%_50%/0.05)] to-transparent rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10">
          {/* Hero content */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] bg-[hsl(160_62%_30%/0.1)] border border-[hsl(160_62%_30%/0.2)] px-3 py-1.5 font-bold">
                {hasCaseStudy(project) ? "Case Study" : "Project"}
              </span>
              {project.status === "live" && (
                <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-[hsl(165_28%_11%/0.15)] px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-foreground font-semibold shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  Live
                </span>
              )}
            </div>

            <h1 className="font-heading text-[2.5rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] sm:leading-[1.05] font-extrabold tracking-[-0.04em] text-foreground mb-6">
              {project.title}
            </h1>

            {project.tagline && (
              <p className="text-xl md:text-2xl text-[hsl(160_62%_26%)] font-semibold mb-6">
                {project.tagline}
              </p>
            )}

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Quick actions */}
            <div className="flex flex-wrap items-center gap-4">
              {links?.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[hsl(160_62%_26%)] text-white hover:bg-foreground hover:scale-105 h-12 md:h-14 px-6 md:px-8 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-lg"
                >
                  View Live
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {links?.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background hover:scale-105 h-12 md:h-14 px-6 md:px-8 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Banner Image */}
      {media.banner && (
        <section className="section-container py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-[hsl(160_62%_26%)] p-1 shadow-2xl"
          >
            <div className="relative w-full bg-white p-8 md:p-12">
              <img 
                src={media.banner} 
                alt={project.title} 
                className="w-full object-contain max-h-[600px] mx-auto"
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[hsl(160_62%_26%/0.2)]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[hsl(42_88%_50%/0.3)]" />
            </div>
          </motion.div>
        </section>
      )}

      {/* Project Overview - Key Metrics */}
      <section className="section-container py-12 md:py-16 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8 md:mb-12">
            Project <span className="text-[hsl(160_62%_26%)]">Overview</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">Project Type</p>
              <p className="font-heading text-xl font-bold text-foreground">{getTypeLabel(project.type)}</p>
            </div>
            
            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">Duration</p>
              <p className="font-heading text-xl font-bold text-foreground">{project.duration || 'Ongoing'}</p>
            </div>
            
            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">My Role</p>
              <p className="font-heading text-xl font-bold text-foreground">{caseStudy?.role || 'Full-Stack Developer'}</p>
            </div>
            
            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">Status</p>
              <p className="font-heading text-xl font-bold text-[hsl(160_62%_26%)]">{project.status ? getStatusLabel(project.status) : 'Live'}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problem & Solution */}
      {(caseStudy?.problem || caseStudy?.solution) && (
        <section className="section-container py-12 md:py-20 border-t border-border bg-gradient-to-b from-white via-[hsl(78_26%_99%)] to-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] bg-[hsl(160_62%_30%/0.1)] border border-[hsl(160_62%_30%/0.2)] px-3 py-1.5 font-bold">
                Challenge & Approach
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-6">
                From <span className="text-[hsl(42_88%_50%)]">Problem</span> to{" "}
                <span className="text-[hsl(160_62%_26%)]">Solution</span>
              </h2>
            </div>

            {/* Problem & Solution Cards */}
            <div className="relative">
              {/* Connecting Arrow/Line */}
              <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_26%)]" />
                  <svg className="w-6 h-6 text-[hsl(160_62%_26%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[hsl(160_62%_26%)] to-transparent" />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Problem Card */}
                {caseStudy?.problem && (
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="h-full bg-white border-2 border-[hsl(42_88%_50%/0.2)] p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {/* Problem Icon */}
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-[hsl(42_88%_50%/0.1)] border-2 border-[hsl(42_88%_50%)] mb-6">
                        <svg className="w-7 h-7 text-[hsl(42_88%_50%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>

                      {/* Problem Title */}
                      <h3 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-4 flex items-center gap-3">
                        <span>The Problem</span>
                      </h3>

                      {/* Problem Description */}
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {caseStudy.problem}
                      </p>

                      {/* Corner Accent */}
                      <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-[hsl(42_88%_50%/0.3)]" />
                    </div>
                  </motion.div>
                )}

                {/* Solution Card */}
                {caseStudy?.solution && (
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="h-full bg-white border-2 border-[hsl(160_62%_26%/0.2)] p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {/* Solution Icon */}
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-[hsl(160_62%_26%/0.1)] border-2 border-[hsl(160_62%_26%)] mb-6">
                        <svg className="w-7 h-7 text-[hsl(160_62%_26%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>

                      {/* Solution Title */}
                      <h3 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-4 flex items-center gap-3">
                        <span>The Solution</span>
                      </h3>

                      {/* Solution Description */}
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {caseStudy.solution}
                      </p>

                      {/* Corner Accent */}
                      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-[hsl(160_62%_26%/0.3)]" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Mobile Arrow */}
              <div className="lg:hidden flex justify-center my-6">
                <svg className="w-8 h-8 text-[hsl(160_62%_26%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Key Features */}
      {caseStudy?.features && caseStudy.features.length > 0 && (
        <section className="section-container py-12 md:py-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8 md:mb-12">
              Key <span className="text-[hsl(160_62%_26%)]">Features</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 p-6 border border-border bg-card hover:border-[hsl(160_62%_26%/0.3)] transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 shrink-0 bg-[hsl(160_62%_26%)]">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-base text-foreground leading-relaxed">{f}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Tech Stack */}
      {techStack && (
        <section className="section-container py-12 md:py-16 border-t border-border bg-gradient-to-b from-white to-[hsl(78_26%_99%)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8 md:mb-12">
              Tech <span className="text-[hsl(160_62%_26%)]">Stack</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techStack.frontend && techStack.frontend.length > 0 && (
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-4 font-bold">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.frontend.map((t) => (
                      <span key={t} className="px-3 py-1.5 border border-border bg-card font-mono text-xs text-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {techStack.backend && techStack.backend.length > 0 && (
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-4 font-bold">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.backend.map((t) => (
                      <span key={t} className="px-3 py-1.5 border border-border bg-card font-mono text-xs text-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {techStack.database && techStack.database.length > 0 && (
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-4 font-bold">Database</h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.database.map((t) => (
                      <span key={t} className="px-3 py-1.5 border border-border bg-card font-mono text-xs text-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {techStack.aiMl && techStack.aiMl.length > 0 && (
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-4 font-bold">AI/ML</h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.aiMl.map((t) => (
                      <span key={t} className="px-3 py-1.5 border border-border bg-card font-mono text-xs text-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {techStack.devops && techStack.devops.length > 0 && (
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-4 font-bold">DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.devops.map((t) => (
                      <span key={t} className="px-3 py-1.5 border border-border bg-card font-mono text-xs text-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {techStack.tools && techStack.tools.length > 0 && (
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-4 font-bold">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.tools.map((t) => (
                      <span key={t} className="px-3 py-1.5 border border-border bg-card font-mono text-xs text-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {caseStudy?.challenges && caseStudy.challenges.length > 0 && (
        <section className="section-container py-12 md:py-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8 md:mb-12">
              Challenges & <span className="text-[hsl(160_62%_26%)]">Solutions</span>
            </h2>

            <div className="space-y-8">
              {caseStudy.challenges.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="grid md:grid-cols-2 gap-6 md:gap-8"
                >
                  <div className="p-6 border-l-4 border-[hsl(42_88%_50%)] bg-[hsl(42_88%_50%/0.05)]">
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(42_88%_50%)] mb-3 font-bold">Challenge</p>
                    <p className="text-base text-foreground leading-relaxed">{c.problem}</p>
                  </div>
                  <div className="p-6 border-l-4 border-[hsl(160_62%_26%)] bg-[hsl(160_62%_26%/0.05)]">
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_26%)] mb-3 font-bold">Solution</p>
                    <p className="text-base text-foreground leading-relaxed">{c.solution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Gallery */}
      {(media.gallery && media.gallery.length > 0) && (
        <section className="section-container py-12 md:py-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8 md:mb-12">
              Project <span className="text-[hsl(160_62%_26%)]">Gallery</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {media.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-[hsl(160_62%_26%)] p-1 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative bg-white p-6">
                    <img 
                      src={img} 
                      alt={`${project.title} ${i + 1}`} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Outcome / Impact */}
      {(caseStudy?.outcome || project.summaryMetrics) && (
        <section className="section-container py-12 md:py-16 border-t border-border bg-gradient-to-b from-white to-[hsl(78_26%_99%)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8 md:mb-12">
              Impact & <span className="text-[hsl(160_62%_26%)]">Results</span>
            </h2>

            {caseStudy?.outcome && (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                {caseStudy.outcome}
              </p>
            )}

            {project.summaryMetrics && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.summaryMetrics.users && (
                  <div className="p-6 border border-[hsl(160_62%_26%/0.2)] bg-white">
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">Users</p>
                    <p className="font-heading text-2xl md:text-3xl font-bold text-[hsl(160_62%_26%)]">{project.summaryMetrics.users}</p>
                  </div>
                )}
                {project.summaryMetrics.scale && (
                  <div className="p-6 border border-[hsl(160_62%_26%/0.2)] bg-white">
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">Scale</p>
                    <p className="font-heading text-2xl md:text-3xl font-bold text-[hsl(160_62%_26%)]">{project.summaryMetrics.scale}</p>
                  </div>
                )}
                {project.summaryMetrics.performance && (
                  <div className="p-6 border border-[hsl(160_62%_26%/0.2)] bg-white">
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">Performance</p>
                    <p className="font-heading text-2xl md:text-3xl font-bold text-[hsl(160_62%_26%)]">{project.summaryMetrics.performance}</p>
                  </div>
                )}
                {project.summaryMetrics.impact && (
                  <div className="p-6 border border-[hsl(160_62%_26%/0.2)] bg-white">
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">Impact</p>
                    <p className="font-heading text-2xl md:text-3xl font-bold text-[hsl(160_62%_26%)]">{project.summaryMetrics.impact}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-container py-16 md:py-24 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Need a similar <span className="text-[hsl(160_62%_26%)]">solution</span>?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            I can help you build a custom solution tailored to your business needs. Let's discuss your project requirements, timeline, and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-[hsl(160_62%_26%)] text-white hover:bg-foreground hover:scale-105 h-12 md:h-14 px-8 md:px-10 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-lg"
            >
              Get a Proposal
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background hover:scale-105 h-12 md:h-14 px-8 md:px-10 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300"
            >
              View More Projects
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ProjectDetails;
