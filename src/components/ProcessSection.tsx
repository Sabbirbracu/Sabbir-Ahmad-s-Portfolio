import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

const phases = [
  {
    id: "01",
    title: "Discovery",
    hook: "Before code comes clarity.",
    description:
      "We define the business problem, user workflows, technical constraints, and project priorities so everyone is aligned before development begins.",
    outcomeLabel: "You leave with",
    outcomes: [
      "Clear project scope",
      "Technical recommendations",
      "Realistic timeline & budget",
    ],
  },
  {
    id: "02",
    title: "System Design",
    hook: "Build the foundation before the features.",
    description:
      "I design the application's architecture, database structure, APIs, and deployment strategy to support future growth — not just today's requirements.",
    outcomeLabel: "You leave with",
    outcomes: [
      "Scalable system architecture",
      "Technology decisions with clear reasoning",
      "Development roadmap",
    ],
  },
  {
    id: "03",
    title: "Product Engineering",
    hook: "Ship working software, not status updates.",
    description:
      "Development happens in small, measurable milestones with continuous testing, code reviews, and regular demonstrations so progress is always transparent.",
    outcomeLabel: "You get",
    outcomes: [
      "Weekly progress updates",
      "Reviewable builds",
      "Continuous feedback loops",
    ],
  },
  {
    id: "04",
    title: "Launch & Evolution",
    hook: "Deployment is the beginning — not the end.",
    description:
      "Launching software is only one milestone. After release, I help monitor performance, resolve issues, and improve the product as real users begin using it.",
    outcomeLabel: "You get",
    outcomes: [
      "Production deployment",
      "Monitoring & stability checks",
      "Ongoing improvements based on real usage",
    ],
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="relative py-20 md:py-28 overflow-hidden">
      {/* Clean background graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-gradient-radial from-[hsl(160_62%_26%/0.06)] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[hsl(42_88%_50%/0.04)] to-transparent rounded-full blur-3xl" />
        
        {/* Minimal grid */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(160 62% 26%) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(160 62% 26%) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Side decorations */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border border-[hsl(160_62%_26%/0.08)] rotate-12" />
        <div className="absolute bottom-1/3 right-12 w-16 h-16 border border-[hsl(42_88%_50%/0.1)]" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rule pt-8 mb-14 md:mb-20"
        >
          <p className="eyebrow mb-6">
            <span className="eyebrow-index">05</span> — How I Work
          </p>
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] sm:leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.04em] text-foreground">
              From idea to{" "}
              <span className="bg-gradient-to-br from-[hsl(160_62%_22%)] via-[hsl(160_62%_24%)] to-[hsl(95_55%_32%)] bg-clip-text text-transparent">
                production
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Every successful product is the result of hundreds of technical
              decisions made in the right order. My process is designed to
              reduce uncertainty, keep progress visible, and deliver software
              that's ready for real users.
            </p>
          </div>
        </motion.div>

        {/* Process timeline - professional design */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute left-0 right-0 top-[32px] h-[2px] bg-gradient-to-r from-[hsl(160_62%_26%/0.2)] via-[hsl(160_62%_26%/0.4)] to-[hsl(160_62%_26%/0.2)]" />
          
          {/* Connection line - mobile */}
          <div className="lg:hidden absolute left-[31px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[hsl(160_62%_26%/0.2)] via-[hsl(160_62%_26%/0.4)] to-[hsl(160_62%_26%/0.2)]" />

          <div className="grid lg:grid-cols-4 gap-y-12 lg:gap-x-8">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex lg:block gap-6"
              >
                {/* Phase number node */}
                <div className="relative z-10 shrink-0 flex lg:mb-8 items-start">
                  <div className="flex items-center justify-center w-16 h-16 bg-[hsl(160_62%_26%)] border-2 border-white shadow-lg">
                    <span className="font-mono text-lg text-white font-bold">
                      {phase.id}
                    </span>
                  </div>
                  {/* Arrow between phases - desktop */}
                  {i < phases.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(160_62%_26%)]" />
                  )}
                </div>

                {/* Flip card container */}
                <div className="flex-1 group perspective-1000">
                  <div className="relative preserve-3d transition-transform duration-700 group-hover:rotate-y-180" style={{ transformStyle: 'preserve-3d', minHeight: '320px' }}>
                    {/* Front of card - Clean & Minimal with gradient */}
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-white via-[hsl(78_26%_99%)] to-[hsl(160_62%_98%)] border border-[hsl(165_28%_11%/0.08)] p-8 flex flex-col justify-center items-center text-center shadow-lg overflow-hidden">
                      {/* Curved line background graphics */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                          <path d="M0,50 Q150,20 300,50 T600,50" stroke="hsl(160 62% 26%)" strokeWidth="2" fill="none" />
                          <path d="M0,150 Q200,120 400,150 T800,150" stroke="hsl(160 62% 26%)" strokeWidth="2" fill="none" />
                          <circle cx="80%" cy="30%" r="60" stroke="hsl(160 62% 26%)" strokeWidth="1.5" fill="none" />
                        </svg>
                      </div>

                      {/* Subtle gradient orbs */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-[hsl(160_62%_26%/0.08)] to-transparent rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-[hsl(42_88%_50%/0.06)] to-transparent rounded-full blur-2xl" />

                      <div className="relative z-10">
                        <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
                          {phase.title}
                        </h3>
                        <p className="font-medium text-base text-[hsl(160_62%_26%)] leading-relaxed">
                          {phase.hook}
                        </p>
                        <div className="mt-6 text-xs text-[hsl(165_28%_11%/0.4)] uppercase tracking-wider font-mono">
                          Hover for details
                        </div>
                      </div>
                    </div>

                    {/* Back of card - Detailed Information */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[hsl(160_62%_26%)] via-[hsl(160_62%_27%)] to-[hsl(160_62%_28%)] border border-[hsl(160_62%_26%)] p-6 flex flex-col shadow-xl overflow-hidden" style={{ transform: 'rotateY(180deg)' }}>
                      <div className="flex-1 relative z-10 overflow-y-auto">
                        <p className="text-sm text-white/90 leading-relaxed mb-4">
                          {phase.description}
                        </p>

                        {/* Outcomes */}
                        <div className="pt-3 border-t border-white/20">
                          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60 font-semibold mb-2">
                            {phase.outcomeLabel}
                          </p>
                          <ul className="space-y-1.5">
                            {phase.outcomes.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-xs text-white"
                              >
                                <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[hsl(42_88%_50%)]" strokeWidth={2.5} />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA card - professional */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 md:mt-20 relative overflow-hidden"
        >
          <div className="bg-gradient-to-br from-[hsl(162_30%_12%)] to-[hsl(162_30%_10%)] border border-white/10 p-8 md:p-12">
            {/* Subtle top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(160_62%_35%)] to-transparent opacity-50" />
            
            <div className="grid md:grid-cols-12 items-center gap-6 md:gap-10">
              {/* Status indicator */}
              <div className="md:col-span-3 flex items-center gap-4">
                <span className="relative flex items-center justify-center w-14 h-14 shrink-0 bg-[hsl(160_62%_30%)]">
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
                </span>
                <span className="font-heading text-lg font-bold text-white leading-tight">
                  Great software keeps evolving.
                </span>
              </div>

              {/* Message */}
              <div className="md:col-span-6 space-y-3">
                <p className="text-base text-white/70 leading-relaxed">
                  A successful launch isn't measured by the day it goes live —
                  it's measured by how well it performs months later.
                </p>
                <p className="text-base text-white leading-relaxed">
                  That's why I focus on building software that's maintainable,
                  scalable, and ready for whatever comes next.
                </p>
              </div>

              {/* CTA button */}
              <div className="md:col-span-3 md:text-right">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-foreground hover:scale-105 h-12 px-6 font-mono text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  Start Phase 01
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
