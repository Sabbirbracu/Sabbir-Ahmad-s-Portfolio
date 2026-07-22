import { ArrowUpRight, Check, ExternalLink, Github, Clock, Users, Briefcase, Target } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetProjectBySlugQuery } from "@/store/api/apiSlice";
import { getStatusLabel, getTypeLabel, hasCaseStudy } from "../types/project";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Reusable section primitives — keep every block visually consistent  */
/* ------------------------------------------------------------------ */

const Section = ({
  children,
  tinted = false,
  className = "",
}: {
  children: ReactNode;
  tinted?: boolean;
  className?: string;
}) => (
  <section
    className={`${
      tinted ? "bg-gradient-to-b from-[hsl(78_26%_99%)] to-white" : "bg-white"
    } ${className}`}
  >
    <div className="section-container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);

/** Heading where the final word is accented, matching the site's pattern */
const SectionTitle = ({ lead, accent }: { lead: string; accent?: string }) => (
  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-10 md:mb-14">
    {lead}
    {accent && <span className="text-[hsl(160_62%_26%)]"> {accent}</span>}
  </h2>
);

const Prose = ({ paragraphs }: { paragraphs: string[] }) => (
  <div className="space-y-6 max-w-4xl">
    {paragraphs.map((p, i) => (
      <p key={i} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        {p}
      </p>
    ))}
  </div>
);

/** Amber-ruled callout used for notes the reader should not miss */
const Callout = ({ children }: { children: ReactNode }) => (
  <div className="border-l-4 border-[hsl(42_88%_50%)] bg-[hsl(42_88%_50%/0.05)] p-8 md:p-10 rounded-r-lg shadow-sm">
    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{children}</p>
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-4 max-w-4xl">
    {items.map((item, i) => (
      <li key={i} className="flex gap-4">
        <span className="mt-[0.5rem] h-2 w-2 shrink-0 bg-[hsl(160_62%_26%)] rounded-full" />
        <span className="text-base md:text-lg text-muted-foreground leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

const NumberedList = ({ items }: { items: string[] }) => (
  <ol className="space-y-6 max-w-4xl">
    {items.map((item, i) => (
      <li key={i} className="flex gap-5">
        <span className="flex items-center justify-center w-8 h-8 shrink-0 bg-[hsl(160_62%_26%)] text-white font-mono text-sm font-bold">
          {i + 1}
        </span>
        <span className="text-base md:text-lg text-muted-foreground leading-relaxed pt-1">{item}</span>
      </li>
    ))}
  </ol>
);

/* ------------------------------------------------------------------ */

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
        <Link to="/projects" className="mt-6 inline-block text-primary underline">
          Back to projects
        </Link>
      </div>
    );
  }

  const caseStudy = project?.caseStudy;
  const techStack = project?.techStack;
  const links = project?.links;
  const media = project?.media || {};

  const stackGroups: [string, string[] | undefined][] = [
    ["Frontend", techStack?.frontend],
    ["Backend", techStack?.backend],
    ["Database", techStack?.database],
    ["Real-time", techStack?.realtime],
    ["AI/ML", techStack?.aiMl],
    ["DevOps", techStack?.devops],
    ["Tools", techStack?.tools],
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-[hsl(78_26%_99%)] via-white to-[hsl(160_62%_97%)]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-radial from-[hsl(160_62%_26%/0.08)] to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[hsl(42_88%_50%/0.06)] to-transparent rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] bg-[hsl(160_62%_30%/0.1)] border border-[hsl(160_62%_30%/0.2)] px-4 py-2 font-bold rounded">
                {hasCaseStudy(project) ? "Case Study" : "Project"}
              </span>
              {project.status === "live" && (
                <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-[hsl(165_28%_11%/0.15)] px-4 py-2 font-mono text-[11px] tracking-[0.15em] uppercase text-foreground font-semibold shadow-sm rounded">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  Live
                </span>
              )}
            </div>

            <h1 className="font-heading text-[2.75rem] leading-[1.08] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] sm:leading-[1.05] font-extrabold tracking-[-0.04em] text-foreground mb-8">
              {project.title}
            </h1>

            {project.tagline && (
              <p className="text-xl md:text-2xl lg:text-3xl text-[hsl(160_62%_26%)] font-semibold mb-8 leading-snug">
                {project.tagline}
              </p>
            )}

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-5">
              {links?.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[hsl(160_62%_26%)] text-white hover:bg-foreground hover:scale-105 h-14 md:h-16 px-8 md:px-10 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-xl rounded-md"
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
                  className="inline-flex items-center gap-3 border-2 border-foreground bg-white text-foreground hover:bg-foreground hover:text-white hover:scale-105 h-14 md:h-16 px-8 md:px-10 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 rounded-md"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- Showcase / URL note */}
      {caseStudy?.showcaseNote && (
        <section className="section-container py-8 -mt-8">
          <div className="max-w-5xl">
            <Callout>{caseStudy.showcaseNote}</Callout>
          </div>
        </section>
      )}

      {/* -------------------------------------------------- Banner image */}
      {media.banner && (
        <section className="bg-white py-16 md:py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-[hsl(160_62%_26%)] to-[hsl(160_62%_20%)] p-2 shadow-2xl rounded-xl overflow-hidden"
            >
              <div className="relative w-full bg-white p-10 md:p-16 rounded-lg">
                <img
                  src={media.banner}
                  alt={project.title}
                  className="w-full object-contain max-h-[650px] mx-auto rounded-md shadow-lg"
                />
                <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-[hsl(160_62%_26%/0.15)] rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-[hsl(42_88%_50%/0.25)] rounded-br-lg" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* --------------------------------------------- Executive summary */}
      {(caseStudy?.executiveSummary?.intro ||
        caseStudy?.executiveSummary?.points?.length ||
        caseStudy?.keyMetrics?.length) && (
        <Section>
          <SectionTitle lead="Executive" accent="Summary" />

          {caseStudy.executiveSummary?.intro && (
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed max-w-4xl mb-10">
              {caseStudy.executiveSummary.intro}
            </p>
          )}

          {caseStudy.executiveSummary?.points && caseStudy.executiveSummary.points.length > 0 && (
            <div className="mb-12">
              <BulletList items={caseStudy.executiveSummary.points} />
            </div>
          )}

          {caseStudy.keyMetrics && caseStudy.keyMetrics.length > 0 && (
            <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {caseStudy.keyMetrics.map((m, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-gradient-to-br from-[hsl(160_62%_26%)] to-[hsl(160_62%_20%)] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <p className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-3">
                    {m.value}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/80 leading-relaxed">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* ------------------------------------------------ Quick overview */}
      <Section tinted>
        <SectionTitle lead="Project" accent="Overview" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:border-[hsl(160_62%_26%/0.3)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[hsl(160_62%_26%/0.1)] rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-[hsl(160_62%_26%)]" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                Project Type
              </p>
            </div>
            <p className="font-heading text-xl font-bold text-foreground">
              {getTypeLabel(project.type)}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:border-[hsl(160_62%_26%/0.3)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[hsl(160_62%_26%/0.1)] rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-[hsl(160_62%_26%)]" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                Duration
              </p>
            </div>
            <p className="font-heading text-xl font-bold text-foreground">
              {project.duration || "Ongoing"}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:border-[hsl(160_62%_26%/0.3)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[hsl(160_62%_26%/0.1)] rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[hsl(160_62%_26%)]" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                My Role
              </p>
            </div>
            <p className="font-heading text-xl font-bold text-foreground">
              {caseStudy?.role || "Full-Stack Developer"}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:border-[hsl(160_62%_26%/0.3)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[hsl(160_62%_26%/0.1)] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[hsl(160_62%_26%)]" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                Status
              </p>
            </div>
            <p className="font-heading text-xl font-bold text-[hsl(160_62%_26%)]">
              {project.status ? getStatusLabel(project.status) : "Live"}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ------------------------------------------------------- Context */}
      {caseStudy?.context && caseStudy.context.length > 0 && (
        <Section tinted>
          <SectionTitle lead="Context" />
          <Prose paragraphs={caseStudy.context} />
        </Section>
      )}

      {/* ------------------------------------------------- The challenge */}
      {caseStudy?.challengePoints && caseStudy.challengePoints.length > 0 && (
        <Section>
          <SectionTitle lead="The" accent="Challenge" />
          {caseStudy.challengeIntro && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-8">
              {caseStudy.challengeIntro}
            </p>
          )}
          <NumberedList items={caseStudy.challengePoints} />
        </Section>
      )}

      {/* --------------------------------------------------- Constraints */}
      {caseStudy?.constraints && caseStudy.constraints.length > 0 && (
        <Section tinted>
          <SectionTitle lead="Constraints" />
          <BulletList items={caseStudy.constraints} />
        </Section>
      )}

      {/* ---------------------------------------------------- My approach */}
      {caseStudy?.approachSteps && caseStudy.approachSteps.length > 0 && (
        <Section>
          <SectionTitle lead="My" accent="Approach" />
          {caseStudy.approachIntro && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mb-12">
              {caseStudy.approachIntro}
            </p>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudy.approachSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border-2 border-border rounded-xl p-8 md:p-10 hover:border-[hsl(160_62%_26%)] hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(160_62%_26%)] to-[hsl(160_62%_20%)] rounded-lg flex items-center justify-center font-mono text-lg font-bold text-white group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] font-bold">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4 leading-snug">
                  {s.title}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
          {caseStudy.approachOutro && (
            <p className="mt-10 text-lg md:text-xl text-foreground font-medium leading-relaxed max-w-4xl">
              {caseStudy.approachOutro}
            </p>
          )}
        </Section>
      )}

      {/* ------------------------------------------- System architecture */}
      {(caseStudy?.architectureComponents?.length || caseStudy?.architectureIntro) && (
        <Section tinted>
          <SectionTitle lead="System" accent="Architecture" />
          {caseStudy.architectureIntro && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-10">
              {caseStudy.architectureIntro}
            </p>
          )}

          {caseStudy.architectureComponents && caseStudy.architectureComponents.length > 0 && (
            <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
              {caseStudy.architectureComponents.map((c, i) => (
                <div key={i} className="bg-background p-6">
                  <p className="font-heading text-base font-bold text-foreground mb-2">{c.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>
          )}

          {caseStudy.architectureOutro && (
            <p className="mt-8 text-base text-muted-foreground leading-relaxed max-w-4xl">
              {caseStudy.architectureOutro}
            </p>
          )}

          {caseStudy.architectureNotes?.map((n, i) => (
            <div key={i} className="mt-10 border-l-4 border-[hsl(160_62%_26%)] bg-white p-6 md:p-8">
              <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-4">
                {n.title}
              </h3>
              <div className="space-y-3">
                {n.body.map((p, j) => (
                  <p key={j} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* ------------------------------------------ Problem & Solution   */}
      {/* (kept for projects that use the condensed pair)                 */}
      {(caseStudy?.problem || caseStudy?.solution) && (
        <Section tinted>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] bg-[hsl(160_62%_30%/0.1)] border border-[hsl(160_62%_30%/0.2)] px-3 py-1.5 font-bold">
                Challenge &amp; Approach
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-6">
                From <span className="text-[hsl(42_88%_50%)]">Problem</span> to{" "}
                <span className="text-[hsl(160_62%_26%)]">Solution</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {caseStudy?.problem && (
                <div className="h-full bg-white border-2 border-[hsl(42_88%_50%/0.2)] p-8 md:p-10 shadow-lg">
                  <h3 className="font-heading text-2xl font-extrabold tracking-tight text-foreground mb-4">
                    The Problem
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>
              )}
              {caseStudy?.solution && (
                <div className="h-full bg-white border-2 border-[hsl(160_62%_26%/0.2)] p-8 md:p-10 shadow-lg">
                  <h3 className="font-heading text-2xl font-extrabold tracking-tight text-foreground mb-4">
                    The Solution
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* ------------------------------------------------ Problems solved */}
      {caseStudy?.deepDives && caseStudy.deepDives.length > 0 && (
        <Section tinted>
          <SectionTitle lead="Problems" accent="Solved" />
          <div className="space-y-16 md:space-y-20">
            {caseStudy.deepDives.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-8 md:p-12 shadow-lg border border-border"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[hsl(42_88%_50%)] to-[hsl(42_88%_40%)] rounded-lg font-mono text-2xl font-bold text-white shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(42_88%_50%)] font-bold mb-3">
                      Problem {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
                      {d.title}
                    </h3>
                  </div>
                </div>
                <div className="space-y-5 pl-0 md:pl-22">
                  {d.paragraphs.map((p, j) => (
                    <p key={j} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* -------------------------------------------------- Key features */}
      {caseStudy?.features && caseStudy.features.length > 0 && (
        <Section>
          <SectionTitle lead="Modules" accent="Delivered" />
          <div className="grid md:grid-cols-2 gap-5">
            {caseStudy.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-5 p-6 md:p-7 bg-white border-2 border-border rounded-lg hover:border-[hsl(160_62%_26%)] hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-center w-10 h-10 shrink-0 bg-[hsl(160_62%_26%)] rounded-lg group-hover:scale-110 transition-transform">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">{f}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* ------------------------------------------ Decisions & tradeoffs */}
      {caseStudy?.tradeoffs && caseStudy.tradeoffs.length > 0 && (
        <Section tinted>
          <SectionTitle lead="Engineering Decisions &" accent="Tradeoffs" />
          <div className="space-y-6">
            {caseStudy.tradeoffs.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-border rounded-xl p-8 md:p-10 hover:shadow-lg transition-all"
              >
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] font-bold mb-3">
                      Decision
                    </p>
                    <p className="text-base md:text-lg font-bold text-foreground leading-snug">
                      {t.decision}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-bold mb-3">
                      Alternative Considered
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {t.alternative}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-bold mb-3">
                      Rationale
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {t.rationale}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* ------------------------------------------------ Security block */}
      {caseStudy?.security?.points && caseStudy.security.points.length > 0 && (
        <Section tinted>
          <SectionTitle lead="Security &" accent="Privacy" />
          {caseStudy.security.intro && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-8">
              {caseStudy.security.intro}
            </p>
          )}
          <BulletList items={caseStudy.security.points} />
        </Section>
      )}

      {/* ---------------------------------------------- Deployment block */}
      {caseStudy?.deployment?.points && caseStudy.deployment.points.length > 0 && (
        <Section>
          <SectionTitle lead="Deployment &" accent="Production Ownership" />
          {caseStudy.deployment.intro && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-8">
              {caseStudy.deployment.intro}
            </p>
          )}
          <BulletList items={caseStudy.deployment.points} />
        </Section>
      )}

      {/* ----------------------------------------------------- Tech stack */}
      {techStack && (
        <Section>
          <SectionTitle lead="Tech" accent="Stack" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stackGroups.map(([label, items], idx) =>
              items && items.length > 0 ? (
                <motion.div 
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white border border-border rounded-xl p-6 md:p-8 hover:shadow-lg transition-all"
                >
                  <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-[hsl(160_62%_40%)] mb-5 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-[hsl(160_62%_26%)] rounded-full" />
                    {label}
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {items.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-2 bg-[hsl(160_62%_26%/0.05)] border border-[hsl(160_62%_26%/0.2)] hover:bg-[hsl(160_62%_26%/0.1)] hover:border-[hsl(160_62%_26%/0.4)] rounded-lg font-mono text-sm text-foreground transition-all"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : null
            )}
          </div>
        </Section>
      )}

      {/* ---------------------------------- Challenges (condensed format) */}
      {caseStudy?.challenges && caseStudy.challenges.length > 0 && (
        <Section>
          <SectionTitle lead="Challenges &" accent="Solutions" />
          <div className="space-y-8">
            {caseStudy.challenges.map((c, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="p-6 border-l-4 border-[hsl(42_88%_50%)] bg-[hsl(42_88%_50%/0.05)]">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(42_88%_50%)] mb-3 font-bold">
                    Challenge
                  </p>
                  <p className="text-base text-foreground leading-relaxed">{c.problem}</p>
                </div>
                <div className="p-6 border-l-4 border-[hsl(160_62%_26%)] bg-[hsl(160_62%_26%/0.05)]">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[hsl(160_62%_26%)] mb-3 font-bold">
                    Solution
                  </p>
                  <p className="text-base text-foreground leading-relaxed">{c.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* -------------------------------------------------------- Gallery */}
      {media.gallery && media.gallery.length > 0 && (
        <Section tinted>
          <SectionTitle lead="Project" accent="Gallery" />
          <div className="grid md:grid-cols-2 gap-8">
            {media.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-gradient-to-br from-[hsl(160_62%_26%)] to-[hsl(160_62%_20%)] p-2 rounded-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
              >
                <div className="relative bg-white p-6 rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    loading="lazy"
                    className="w-full h-72 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* -------------------------------------------------------- Results */}
      {(caseStudy?.results || caseStudy?.outcome || project.summaryMetrics) && (
        <Section tinted>
          <SectionTitle lead="Results &" accent="Impact" />

          {caseStudy?.outcome && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-10">
              {caseStudy.outcome}
            </p>
          )}

          {caseStudy?.results?.metrics && caseStudy.results.metrics.length > 0 && (
            <div className="overflow-x-auto border border-border mb-8">
              <table className="w-full min-w-[480px] border-collapse">
                <tbody>
                  {caseStudy.results.metrics.map((m, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 text-sm text-muted-foreground w-1/2">{m.label}</td>
                      <td className="px-5 py-4 font-heading text-lg font-bold text-[hsl(160_62%_26%)]">
                        {m.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {caseStudy?.results?.modulesNote && (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-4xl mb-10">
              {caseStudy.results.modulesNote}
            </p>
          )}

          {caseStudy?.results?.businessImpact && caseStudy.results.businessImpact.length > 0 && (
            <>
              <h3 className="font-heading text-xl font-bold text-foreground mb-5">
                Business impact
              </h3>
              <BulletList items={caseStudy.results.businessImpact} />
            </>
          )}

          {project.summaryMetrics && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {(
                [
                  ["Users", project.summaryMetrics.users],
                  ["Scale", project.summaryMetrics.scale],
                  ["Performance", project.summaryMetrics.performance],
                  ["Impact", project.summaryMetrics.impact],
                ] as [string, string | undefined][]
              ).map(([label, value]) =>
                value ? (
                  <div key={label} className="p-6 border border-[hsl(160_62%_26%/0.2)] bg-white">
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                      {label}
                    </p>
                    <p className="font-heading text-xl md:text-2xl font-bold text-[hsl(160_62%_26%)]">
                      {value}
                    </p>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Section>
      )}

      {/* ------------------------------------------ What I'd do differently */}
      {caseStudy?.improvements && caseStudy.improvements.length > 0 && (
        <Section>
          <SectionTitle lead="What I'd Do" accent="Differently" />
          <BulletList items={caseStudy.improvements} />
        </Section>
      )}

      {/* ----------------------------------------------------- Reflection */}
      {caseStudy?.reflection && caseStudy.reflection.length > 0 && (
        <Section tinted>
          <SectionTitle lead="Reflection" />
          <Prose paragraphs={caseStudy.reflection} />
        </Section>
      )}

      {/* ------------------------------------------------------------ CTA */}
      <section className="bg-gradient-to-br from-[hsl(160_62%_26%)] via-[hsl(160_62%_22%)] to-[hsl(160_62%_18%)] py-20 md:py-28">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Need a similar <span className="text-[hsl(42_88%_50%)]">solution</span>?
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              I can help you build a custom solution tailored to your business needs. Let's discuss
              your project requirements, timeline, and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-3 bg-white text-[hsl(160_62%_26%)] hover:bg-[hsl(42_88%_50%)] hover:text-white hover:scale-105 h-14 md:h-16 px-10 md:px-12 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-xl rounded-lg"
              >
                Get a Proposal
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 border-2 border-white bg-transparent text-white hover:bg-white hover:text-[hsl(160_62%_26%)] hover:scale-105 h-14 md:h-16 px-10 md:px-12 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 rounded-lg"
              >
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetails;
