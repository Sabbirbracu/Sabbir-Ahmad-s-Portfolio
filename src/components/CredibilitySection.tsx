import { motion } from "framer-motion";
import { Clock, Globe, Layers, Rocket } from "lucide-react";

const metrics = [
  {
    icon: Rocket,
    value: "17+",
    label: "Production-Grade Projects",
  },
  {
    icon: Globe,
    value: "International",
    label: "Client Experience",
  },
  {
    icon: Clock,
    value: "2+",
    label: "Years Engineering Practice",
  },
  {
    icon: Layers,
    value: "End-to-End",
    label: "Design → Deployment",
  },
];

const CredibilitySection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="section-container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card-hover p-4 sm:p-5 lg:p-6 text-center group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-primary/10 mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                <metric.icon className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-4xl font-bold font-heading text-foreground mb-1 sm:mb-2">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground leading-tight">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CredibilitySection;