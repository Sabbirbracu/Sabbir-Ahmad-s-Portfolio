import { motion } from "framer-motion";
import { Brain, Database, Layers, Server } from "lucide-react";

const skillGroups = [
  {
    label: "Frontend",
    icon: Layers,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "TanStack Query"],
  },
  {
    label: "Backend",
    icon: Server,
    items: ["Node.js", "Express", "FastAPI", "Laravel", "REST APIs", "WebSockets"],
  },
  {
    label: "Database & Infrastructure",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Docker", "Nginx", "GitHub Actions", "AWS"],
  },
  {
    label: "AI & Machine Learning",
    icon: Brain,
    ai: true,
    items: ["Python", "PyTorch", "TensorFlow", "OpenCV", "LangChain", "LangGraph", "NumPy", "Pandas", "Computer Vision"],
  },
];

const StackSection = () => {
  return (
    <section id="stack" className="py-20 md:py-28">
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
            <span className="eyebrow-index">07</span> — Engineering Stack
          </p>
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] sm:leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.04em] text-foreground">
              Technologies I use to build{" "}
              <span className="bg-gradient-to-br from-[hsl(160_62%_22%)] via-[hsl(160_62%_24%)] to-[hsl(95_55%_32%)] bg-clip-text text-transparent">production systems</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Production-tested across the stack, from interface to
              infrastructure to intelligence.
            </p>
          </div>
        </motion.div>

        {/* Toolkit matrix */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-border bg-card divide-y divide-border"
        >
          {skillGroups.map((group, i) => (
            <div
              key={group.label}
              className="grid grid-cols-12 gap-y-4 md:gap-x-8 p-5 md:p-7"
            >
              {/* Label */}
              <div className="col-span-12 md:col-span-4 lg:col-span-3 flex items-center gap-3">
                <span
                  className={`flex items-center justify-center w-9 h-9 shrink-0 border ${
                    group.ai
                      ? "border-[hsl(42_88%_50%)] text-[hsl(42_88%_50%)]"
                      : "border-[hsl(160_62%_26%)] text-[hsl(160_62%_26%)]"
                  }`}
                >
                  <group.icon className="w-4 h-4" />
                </span>
                <span className="flex items-baseline gap-1.5">
                  <span className="font-mono text-[10px] text-[hsl(160_62%_26%)] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-base font-bold text-foreground">
                    {group.label}
                  </span>
                </span>
              </div>

              {/* Chips */}
              <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-wrap items-center gap-2">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] font-medium transition-colors ${
                      group.ai
                        ? "border border-dashed border-[hsl(42_88%_50%)] text-[hsl(42_88%_50%)] hover:bg-[hsl(42_88%_50%/0.1)]"
                        : "border border-border bg-background text-foreground/80 hover:border-[hsl(160_62%_26%)] hover:text-[hsl(160_62%_26%)]"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StackSection;
