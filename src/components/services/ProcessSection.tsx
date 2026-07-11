import { motion } from "framer-motion";
import {
    Calendar,
    CheckCircle,
    Code2,
    MessageSquare,
    Rocket,
} from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: Calendar,
    title: "Discovery Call",
    description:
      "We discuss your vision, goals, and requirements in a free 30-minute consultation.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    step: 2,
    icon: MessageSquare,
    title: "Proposal & Planning",
    description:
      "You receive a detailed proposal with timeline, milestones, and transparent pricing.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    step: 3,
    icon: Code2,
    title: "Development",
    description:
      "I build your solution with weekly updates and demos. You're involved every step.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    step: 4,
    icon: Rocket,
    title: "Launch & Support",
    description:
      "We deploy together, and I provide ongoing support to ensure your success.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            From Idea to Launch in 4 Steps
          </h2>
          <p className="text-muted-foreground">
            A transparent, collaborative process designed to deliver results
            without surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all h-full">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>

                <div
                  className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center mb-4`}
                >
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>

                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            No hidden costs • Weekly updates • 100% transparency
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
