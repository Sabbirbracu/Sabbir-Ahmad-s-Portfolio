import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Cpu } from "lucide-react";

const experiences = [
  {
    icon: Briefcase,
    accent: "primary" as const,
    current: true,
    role: "Software Engineer",
    type: "Contract",
    company: "Startups & International Clients",
    location: "Remote",
    period: "2024 — Present",
    summary:
      "Designed, developed, and deployed 17+ production applications across SaaS, ecommerce, internal business systems, and AI-powered solutions.",
    impact: [
      "Delivered scalable applications for startups and international clients",
      "Built frontend and backend systems using modern JavaScript frameworks",
      "Designed REST APIs and optimized application performance",
      "Integrated third-party services and AI capabilities",
      "Supported deployments, maintenance, and production improvements",
    ],
    stack: ["React", "Next.js", "Node.js", "Laravel", "MongoDB", "CI/CD"],
  },
  {
    icon: Cpu,
    accent: "amber" as const,
    current: true,
    role: "AI & Computer Vision Research",
    type: "Research",
    company: "BRAC University",
    location: "Dhaka",
    period: "2025 — Present",
    summary:
      "Exploring machine learning, deep learning, and computer vision with a focus on practical AI systems that solve real-world problems.",
    impact: [
      "Image classification & object detection",
      "Segmentation and CNN architectures",
      "AI-powered web applications",
    ],
    stack: ["Python", "PyTorch", "TensorFlow", "OpenCV", "NumPy", "Pandas"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-sand py-20 md:py-28">
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
            <span className="eyebrow-index">06</span> — Experience
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-2xl">
              Building software since{" "}
              <span className="text-primary">2024</span>.
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Working with startups and businesses to transform ideas into
              production-ready digital products.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border md:left-[23px]" />

          <div className="space-y-8 md:space-y-10">
            {experiences.map((exp, index) => {
              const accentText =
                exp.accent === "amber" ? "text-amber" : "text-primary";
              const accentBar =
                exp.accent === "amber" ? "bg-amber" : "bg-primary";
              const accentBorder =
                exp.accent === "amber" ? "border-amber" : "border-primary";

              return (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="relative flex gap-5 md:gap-8"
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border bg-card ${accentBorder}`}
                    >
                      <exp.icon className={`w-5 h-5 ${accentText}`} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="group relative flex-1 border border-border bg-card overflow-hidden">
                    {/* Accent bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${accentBar}`}
                    />
                    {/* Ghost index */}
                    <span className="pointer-events-none absolute -right-2 -top-6 font-heading text-[7rem] leading-none font-semibold text-foreground/[0.04] select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative p-6 md:p-8 lg:p-10">
                      {/* Top row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
                          {exp.current && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-60" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-700" />
                            </span>
                          )}
                          {exp.period}
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
                          {exp.location}
                        </span>
                      </div>

                      {/* Role + company */}
                      <h3 className="mt-5 font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                        {exp.role}
                      </h3>
                      <p className="mt-1.5 text-sm md:text-base text-foreground/80">
                        <span className="font-medium text-foreground">
                          {exp.company}
                        </span>
                        <span className={`ml-2 font-mono text-xs uppercase tracking-[0.1em] ${accentText}`}>
                          {exp.type}
                        </span>
                      </p>

                      {/* Summary */}
                      <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                        {exp.summary}
                      </p>

                      {/* Impact */}
                      <ul className="mt-6 space-y-3 border-t border-border pt-6">
                        {exp.impact.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm md:text-[15px] text-foreground/90"
                          >
                            <ArrowUpRight
                              className={`w-4 h-4 mt-0.5 shrink-0 ${accentText}`}
                            />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Stack chips */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="border border-border bg-background px-2.5 py-1 font-mono text-[11px] tracking-[0.06em] text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
