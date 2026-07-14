import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import projects from "@/data/projects";
import { getStatusLabel } from "@/types/project";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// Project categories
const categories = [
  { id: "full-stack", title: "Full-Stack Custom Software", types: ["saas", "custom-app"] },
  { id: "wordpress", title: "WordPress Development", types: ["wordpress"] },
  { id: "shopify", title: "Shopify Development", types: ["ecommerce"] },
  { id: "ai-apps", title: "AI Applications", types: ["ai-app"] },
  { id: "ai-models", title: "AI Models", types: ["ai-ml"] },
  { id: "ghl", title: "Go-High Level Automations", types: ["automation"] },
];

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

      {/* Hero Section with Background Graphics */}
      <section className="relative pt-32 md:pt-44 pb-16 md:pb-20 overflow-hidden">
        {/* Enhanced Background graphics */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Main gradient orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[hsl(160_62%_26%/0.12)] to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[hsl(42_88%_50%/0.08)] to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-[hsl(160_62%_26%/0.06)] to-transparent rounded-full blur-2xl" />
          
          {/* Animated geometric shapes */}
          <div className="absolute top-32 left-16 w-24 h-24 border-2 border-[hsl(160_62%_26%/0.15)] rotate-45 animate-spin-slow" />
          <div className="absolute bottom-40 right-20 w-20 h-20 border-2 border-[hsl(42_88%_50%/0.2)] animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
          
          {/* Floating dots */}
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-[hsl(160_62%_26%/0.3)] rounded-full animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-[hsl(42_88%_50%/0.4)] rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-[hsl(160_62%_26%/0.25)] rounded-full animate-float" style={{ animationDelay: '2s' }} />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(160 62% 26%) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(160 62% 26%) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Diagonal lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[hsl(160_62%_26%/0.08)] to-transparent" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[hsl(42_88%_50%/0.06)] to-transparent" />
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[hsl(160_62%_26%/0.15)]" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[hsl(42_88%_50%/0.2)]" />
          
          {/* Side decorations */}
          <div className="absolute top-1/4 left-12 w-20 h-20 border border-[hsl(160_62%_26%/0.1)] rotate-12" />
          <div className="absolute bottom-1/4 right-16 w-16 h-16 border border-[hsl(42_88%_50%/0.15)]" />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] bg-[hsl(160_62%_30%/0.1)] border border-[hsl(160_62%_30%/0.2)] px-3 py-1.5 font-bold">
                Portfolio
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                {projects.length}+ Production Applications
              </span>
            </div>

            <h1 className="font-heading text-[2.5rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] sm:leading-[1.05] font-extrabold tracking-[-0.04em] text-foreground mb-6 max-w-4xl">
              Shipped work, with the{" "}
              <span className="bg-gradient-to-br from-[hsl(160_62%_22%)] via-[hsl(160_62%_26%)] to-[hsl(95_55%_32%)] bg-clip-text text-transparent">receipts</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Every project links to a live product or a real repository, with
              a full case study — the problem, the architecture, the decisions,
              and what happened after launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full-Stack Custom Software */}
      <section className="section-container py-12 md:py-16 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_26%)]" />
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                Full-Stack <span className="text-[hsl(160_62%_26%)]">Custom Software</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              End-to-end custom applications built from scratch — SaaS platforms, business systems, and tailored solutions.
            </p>
          </div>

          <div className="space-y-2">
            {projects
              .filter(p => ["saas", "custom-app"].includes(p.type))
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group block border border-border bg-card p-6 hover:border-[hsl(160_62%_26%/0.4)] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="font-heading text-xl md:text-2xl font-extrabold tracking-tight text-foreground group-hover:text-[hsl(160_62%_26%)] transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-[hsl(160_62%_26%)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          
                          {project.status === "live" && (
                            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-[hsl(165_28%_11%/0.15)] px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] uppercase text-foreground font-semibold shadow-sm">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                              </span>
                              Live
                            </span>
                          )}
                        </div>
                        
                        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-3">
                          {project.tagline}
                        </p>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.techStack?.primary?.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 border border-border bg-background font-mono text-[10px] text-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                          {project.year}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            
            {projects.filter(p => ["saas", "custom-app"].includes(p.type)).length === 0 && (
              <div className="text-center py-12 border border-dashed border-border bg-card">
                <p className="font-mono text-sm text-muted-foreground">Projects coming soon</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* WordPress Development */}
      <section className="section-container py-12 md:py-16 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_26%)]" />
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                WordPress <span className="text-[hsl(160_62%_26%)]">Development</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Custom WordPress websites, WooCommerce stores, and plugin development for business needs.
            </p>
          </div>

          <div className="text-center py-12 border border-dashed border-border bg-card">
            <p className="font-mono text-sm text-muted-foreground">Projects coming soon</p>
          </div>
        </motion.div>
      </section>

      {/* Shopify Development */}
      <section className="section-container py-12 md:py-16 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_26%)]" />
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                Shopify <span className="text-[hsl(160_62%_26%)]">Development</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              High-converting Shopify stores with custom themes, integrations, and performance optimization.
            </p>
          </div>

          <div className="space-y-2">
            {projects
              .filter(p => p.type === "ecommerce")
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group block border border-border bg-card p-6 hover:border-[hsl(160_62%_26%/0.4)] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="font-heading text-xl md:text-2xl font-extrabold tracking-tight text-foreground group-hover:text-[hsl(160_62%_26%)] transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-[hsl(160_62%_26%)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          
                          {project.status === "live" && (
                            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-[hsl(165_28%_11%/0.15)] px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] uppercase text-foreground font-semibold shadow-sm">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                              </span>
                              Live
                            </span>
                          )}
                        </div>
                        
                        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-3">
                          {project.tagline}
                        </p>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.techStack?.primary?.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 border border-border bg-background font-mono text-[10px] text-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                          {project.year}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            
            {projects.filter(p => p.type === "ecommerce").length === 0 && (
              <div className="text-center py-12 border border-dashed border-border bg-card">
                <p className="font-mono text-sm text-muted-foreground">Projects coming soon</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* AI Applications */}
      <section className="section-container py-12 md:py-16 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_26%)]" />
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                AI <span className="text-[hsl(160_62%_26%)]">Applications</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Intelligent applications with AI assistants, chatbots, automation, and business intelligence.
            </p>
          </div>

          <div className="text-center py-12 border border-dashed border-border bg-card">
            <p className="font-mono text-sm text-muted-foreground">Projects coming soon</p>
          </div>
        </motion.div>
      </section>

      {/* AI Models */}
      <section className="section-container py-12 md:py-16 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_26%)]" />
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                AI <span className="text-[hsl(160_62%_26%)]">Models</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Machine learning models, computer vision systems, and research projects in artificial intelligence.
            </p>
          </div>

          <div className="space-y-2">
            {projects
              .filter(p => p.type === "ai-ml")
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group block border border-border bg-card p-6 hover:border-[hsl(160_62%_26%/0.4)] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="font-heading text-xl md:text-2xl font-extrabold tracking-tight text-foreground group-hover:text-[hsl(160_62%_26%)] transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-[hsl(160_62%_26%)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          
                          {project.status === "live" && (
                            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-[hsl(165_28%_11%/0.15)] px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] uppercase text-foreground font-semibold shadow-sm">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                              </span>
                              Live
                            </span>
                          )}
                        </div>
                        
                        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-3">
                          {project.tagline}
                        </p>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.techStack?.primary?.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 border border-border bg-background font-mono text-[10px] text-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                          {project.year}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            
            {projects.filter(p => p.type === "ai-ml").length === 0 && (
              <div className="text-center py-12 border border-dashed border-border bg-card">
                <p className="font-mono text-sm text-muted-foreground">Projects coming soon</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Go-High Level Automations */}
      <section className="section-container py-12 md:py-16 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_26%)]" />
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                Go-High Level <span className="text-[hsl(160_62%_26%)]">Automations</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Marketing automation workflows, CRM integrations, and business process optimization with Go-High Level.
            </p>
          </div>

          <div className="text-center py-12 border border-dashed border-border bg-card">
            <p className="font-mono text-sm text-muted-foreground">Projects coming soon</p>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="section-container py-16 md:py-20 border-t border-border bg-gradient-to-b from-white to-[hsl(78_26%_99%)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Have a project <span className="text-[hsl(160_62%_26%)]">in mind</span>?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
            Whether it's a new product, a custom solution, or scaling an existing platform — let's discuss how I can help bring your vision to production.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-[hsl(160_62%_26%)] text-white hover:bg-foreground hover:scale-105 h-12 md:h-14 px-8 md:px-10 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-lg"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
