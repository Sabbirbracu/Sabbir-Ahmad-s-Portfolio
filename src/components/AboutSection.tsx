import { motion } from "framer-motion";
import { Database, GraduationCap, Layers, Server, Sparkles } from "lucide-react";

const skillGroups = [
  {
    label: "Frontend",
    icon: Layers,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "TanStack Query"],
  },
  {
    label: "Backend",
    icon: Server,
    items: ["Node.js", "Express", "FastAPI", "Laravel", "REST APIs", "WebSockets"],
  },
  {
    label: "Data & Infra",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Nginx", "GitHub Actions", "Docker"],
  },
  {
    label: "Exploring",
    icon: Sparkles,
    exploring: true,
    items: ["PyTorch", "TensorFlow", "OpenCV", "Computer Vision"],
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28">
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
            <span className="eyebrow-index">04</span> — About
          </p>
        </motion.div>

        {/* Row 1 — Portrait + Narrative */}
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-5 lg:col-span-4"
          >
            <div className="relative border border-border">
              <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-primary z-10" />
              <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-primary z-10" />
              <img
                src="/img.png"
                alt="Sabbir Ahmad"
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="flex justify-between items-baseline mt-3">
              <p className="font-mono text-xs text-muted-foreground">
                Sabbir Ahmad
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                Dhaka, Bangladesh
              </p>
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 md:col-span-7 flex flex-col justify-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-tight text-foreground">
              An engineer who cares what happens{" "}
              <span className="text-primary">after</span> the code ships.
            </h2>

            <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm in my final semester of Computer Science &amp; Engineering
                at BRAC University, but most of what I know about software I
                learned in production — debugging WebSocket failures behind
                Nginx at 2am, designing payroll systems where a rounding error
                is a real person's salary, and shipping 17+ projects for
                clients who needed them to just work.
              </p>
              <p>
                I care about clean architecture, modular design, and systems
                that stay maintainable long after launch. My default question
                isn't "does it work?" — it's "will it still work with 10× the
                users and a new developer on the team?"
              </p>
              <p>
                Right now I'm expanding into AI/ML and computer vision,
                researching CNN-based image processing at BRAC University —
                with the goal of building web platforms with genuinely
                intelligent features, not bolted-on gimmicks.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 2 — Skills (full width) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-24 rule pt-10 md:pt-12"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow mb-4">
                <span className="eyebrow-index">◆</span> Toolkit
              </p>
              <h3 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Technologies I build with
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed">
              Production-tested across the stack, with active research into
              AI &amp; computer vision.
            </p>
          </div>

          {/* Toolkit matrix */}
          <div className="border border-border bg-card divide-y divide-border">
            {skillGroups.map((group, i) => (
              <div
                key={group.label}
                className="grid grid-cols-12 gap-y-4 md:gap-x-8 p-5 md:p-7"
              >
                {/* Label */}
                <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                  <span
                    className={`flex items-center justify-center w-9 h-9 border ${
                      group.exploring
                        ? "border-amber/50 text-amber"
                        : "border-border text-primary"
                    }`}
                  >
                    <group.icon className="w-4 h-4" />
                  </span>
                  <span className="flex items-baseline gap-1.5">
                    <span className="font-mono text-[10px] text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-base font-semibold text-foreground">
                      {group.label}
                    </span>
                  </span>
                </div>

                {/* Chips */}
                <div className="col-span-12 md:col-span-9 flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] transition-colors ${
                        group.exploring
                          ? "border border-dashed border-amber/50 text-amber/90 hover:bg-amber/10"
                          : "border border-border bg-background text-foreground/80 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="-mt-px border border-border bg-card p-5 md:p-7 flex items-center gap-4">
            <span className="flex items-center justify-center w-11 h-11 shrink-0 border border-primary/40 text-primary">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div className="flex flex-wrap items-center justify-between gap-2 flex-1">
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  B.Sc. Computer Science &amp; Engineering
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  BRAC University
                </p>
              </div>
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-primary border border-primary/40 px-2.5 py-1">
                Final semester
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
