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
    items: ["Python", "PyTorch", "TensorFlow", "OpenCV", "NumPy", "Pandas", "Computer Vision"],
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-2xl">
              Technologies I use to build{" "}
              <span className="text-primary">production systems</span>.
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
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
              <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-wrap items-center gap-2">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] transition-colors ${
                      group.ai
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
        </motion.div>
      </div>
    </section>
  );
};

export default StackSection;
