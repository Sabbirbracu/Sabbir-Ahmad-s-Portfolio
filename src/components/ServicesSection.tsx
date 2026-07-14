import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Bot,
  Globe,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";

const services = [
  {
    icon: Boxes,
    title: "SaaS Development",
    description:
      "Launch scalable SaaS products with modern architecture, secure authentication, subscription workflows, and maintainable codebases.",
  },
  {
    icon: LayoutDashboard,
    title: "Custom Web Applications",
    description:
      "Business systems, dashboards, internal tools, CRMs, portals, and custom software tailored to your workflow.",
  },
  {
    icon: Bot,
    title: "AI-Powered Applications",
    description:
      "Integrate intelligent features such as AI assistants, chatbots, document search, workflow automation, and business intelligence into your products.",
  },
  {
    icon: ShoppingBag,
    title: "Shopify Development",
    description:
      "Build or customize high-converting Shopify stores with custom themes, integrations, and performance optimization.",
  },
  {
    icon: Globe,
    title: "WordPress & WooCommerce",
    description:
      "Develop fast, secure, and SEO-friendly business websites and ecommerce platforms with custom functionality where needed.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden">
      {/* Clean background graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-32 left-0 w-[450px] h-[450px] bg-gradient-radial from-[hsl(42_88%_50%/0.05)] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-gradient-radial from-[hsl(160_62%_26%/0.06)] to-transparent rounded-full blur-3xl" />
        
        {/* Minimal grid overlay */}
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
        
        {/* Left side decorations */}
        <div className="absolute top-1/3 left-8 w-20 h-20 border border-[hsl(42_88%_50%/0.1)] rotate-12" />
        <div className="absolute bottom-1/4 left-12 w-2.5 h-2.5 bg-[hsl(160_62%_26%/0.15)] rounded-full" />
        
        {/* Right side decorations */}
        <div className="absolute top-1/2 right-10 w-16 h-16 border border-[hsl(160_62%_26%/0.08)] -rotate-12" />
        <div className="absolute bottom-40 right-16 w-3 h-3 bg-[hsl(42_88%_50%/0.18)] rounded-full" />
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
            <span className="eyebrow-index">03</span> — Services
          </p>
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] sm:leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.04em] text-foreground">
              Engineering solutions for{" "}
              <span className="bg-gradient-to-br from-[hsl(160_62%_22%)] via-[hsl(160_62%_24%)] to-[hsl(95_55%_32%)] bg-clip-text text-transparent">
                growing businesses
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              I work with startups and businesses to design, build, and scale
              modern software products — from MVPs to production-ready
              platforms.
            </p>
          </div>
        </motion.div>

        {/* Service grid — premium card design */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative bg-gradient-to-br from-white to-[hsl(78_26%_99%)] border border-[hsl(165_28%_11%/0.08)] hover:border-[hsl(160_62%_26%)] p-10 transition-all duration-500 hover:shadow-2xl overflow-hidden"
            >
              {/* Premium gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(42_88%_50%/0.03)] to-[hsl(160_62%_26%/0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Subtle top accent line with amber-to-green gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(42_88%_50%)] via-[hsl(160_62%_26%)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

              {/* Number badge - refined */}
              <div className="absolute top-8 right-8">
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-[hsl(165_28%_11%/0.2)] font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Icon - premium style */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(42_88%_50%)] to-[hsl(160_62%_26%)] blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative flex items-center justify-center w-16 h-16 bg-[hsl(160_62%_26%)] text-white shadow-xl">
                  <service.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <h3 className="relative mt-8 font-heading text-2xl font-bold tracking-tight text-foreground leading-tight">
                {service.title}
              </h3>
              <p className="relative mt-5 text-base text-[hsl(165_28%_11%/0.7)] leading-relaxed">
                {service.description}
              </p>

              {/* Bottom corner accent - subtle luxury detail */}
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-[3px] border-b-[3px] border-[hsl(42_88%_50%/0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Decorative dot */}
              <div className="absolute bottom-8 left-10 w-1.5 h-1.5 bg-[hsl(42_88%_50%)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}

          {/* Premium CTA card */}
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative bg-[hsl(160_62%_26%)] p-10 text-left flex flex-col justify-between min-h-[320px] hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Sophisticated animated overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Premium corner frame */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-[3px] border-t-[3px] border-white/20" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-[3px] border-b-[3px] border-white/20" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-white/40" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/60 font-semibold">
                  Let's Talk
                </span>
              </div>
              <p className="font-heading text-2xl font-bold tracking-tight text-white leading-tight">
                Have something else in mind?
              </p>
            </div>
            
            <div className="relative z-10">
              <p className="text-base text-white/85 leading-relaxed mb-6">
                Tell me about your project — if I'm not the right fit, I'll say
                so and point you in the right direction.
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase text-white font-bold group-hover:gap-3 transition-all border-b-2 border-white/30 pb-1">
                Start the conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            {/* Subtle accent dots */}
            <div className="absolute top-1/2 right-10 w-2 h-2 bg-white/20 rounded-full" />
            <div className="absolute top-1/3 right-16 w-1.5 h-1.5 bg-white/15 rounded-full" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
