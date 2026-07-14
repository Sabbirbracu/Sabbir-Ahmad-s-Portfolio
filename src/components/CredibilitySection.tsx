import { motion } from "framer-motion";
import { Rocket, Clock, DollarSign, Globe, Sparkles } from "lucide-react";

const metrics = [
  { icon: Rocket, value: "17+", label: "Production Applications" },
  { icon: Clock, value: "2+", label: "Years Building Software" },
  { icon: DollarSign, value: "$1K+", label: "Upwork Revenue" },
  { icon: Globe, value: "International", label: "Client Experience" },
  { icon: Sparkles, value: "AI & ML", label: "Research Focus" },
];

const CredibilitySection = () => {
  return (
    <section className="py-20 md:py-28">
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
            <span className="eyebrow-index">01</span> — Trusted By
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-foreground max-w-2xl">
            Engineering experience across{" "}
            <span className="text-primary">startups, businesses, and AI products</span>.
          </h2>
        </motion.div>

        {/* Metric grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-border border border-border"
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-card/50 backdrop-blur-sm p-6 md:p-7">
              <metric.icon className="w-5 h-5 text-primary mb-4" />
              <p className="font-heading text-xl md:text-2xl font-semibold text-foreground leading-tight">
                {metric.value}
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.1em] uppercase text-muted-foreground leading-snug">
                {metric.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CredibilitySection;
