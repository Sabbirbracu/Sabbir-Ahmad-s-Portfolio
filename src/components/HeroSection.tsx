import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

/* Alternating capabilities (what I build) and technologies (what I build with) */
const stack = [
  { label: "SaaS Development", capability: true },
  { label: "React" },
  { label: "AI Solutions", capability: true },
  { label: "Next.js" },
  { label: "Custom Web Apps", capability: true },
  { label: "Node.js" },
  { label: "System Architecture", capability: true },
  { label: "TypeScript" },
  { label: "API Development", capability: true },
  { label: "Python" },
  { label: "Shopify Development", capability: true },
  { label: "PostgreSQL" },
  { label: "Cloud Deployment", capability: true },
  { label: "Laravel" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[hsl(160_62%_26%/0.12)] to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[hsl(42_88%_50%/0.08)] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-[hsl(160_62%_26%/0.05)] to-transparent rounded-full blur-2xl" />
        
        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-[hsl(160_62%_26%/0.15)] rotate-45 animate-spin-slow" />
        <div className="absolute bottom-32 right-16 w-24 h-24 border-2 border-[hsl(42_88%_50%/0.2)] animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
        
        {/* Floating dots */}
        <div className="absolute top-40 right-1/4 w-3 h-3 bg-[hsl(160_62%_26%/0.3)] rounded-full animate-float" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-[hsl(42_88%_50%/0.4)] rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 bg-[hsl(160_62%_26%/0.25)] rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(160 62% 26%) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(160 62% 26%) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Diagonal lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[hsl(160_62%_26%/0.08)] to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[hsl(42_88%_50%/0.06)] to-transparent" />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-[hsl(160_62%_26%/0.15)]" />
        <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-[hsl(42_88%_50%/0.2)]" />
        
        {/* Floating code-like elements */}
        <div className="absolute top-1/4 left-12 opacity-10">
          <div className="font-mono text-xs text-[hsl(160_62%_26%)]">{'{ }'}</div>
        </div>
        <div className="absolute bottom-1/3 right-20 opacity-10">
          <div className="font-mono text-xs text-[hsl(42_88%_50%)]">{'</>'}</div>
        </div>
        <div className="absolute top-2/3 left-1/3 opacity-10">
          <div className="font-mono text-xs text-[hsl(160_62%_26%)]">{'( )'}</div>
        </div>
      </div>

      <div className="section-container flex-1 flex flex-col justify-center py-12 md:py-16 lg:py-20 relative">
        {/* Centered content */}
        <div className="max-w-5xl mx-auto text-center px-4">
          <p className="eyebrow mb-4 md:mb-6 justify-center mt-5">
            <span className="eyebrow-index">01</span> — Software Engineer &amp; Product Builder
          </p>

          <h1 className="font-heading text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] xl:text-[5.5rem] sm:leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.04em] text-foreground mb-6 md:mb-8">
            Building software
            <br />
            that solves
            <br />
            <span className="bg-gradient-to-br from-[hsl(160_62%_22%)] via-[hsl(160_62%_24%)] to-[hsl(95_55%_32%)] bg-clip-text text-transparent">
              real problems
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-3 md:mb-4">
            I'm Sabbir Ahmad, a Software Engineer specializing in SaaS
            development, web applications, and AI-powered solutions.
          </p>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8">
            I help startups and growing businesses transform ideas into
            reliable production ready systems — from system architecture
            and development to deployment.
          </p>

          <div className="inline-flex items-center gap-2 md:gap-3 mb-8 md:mb-10 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[hsl(42_88%_50%/0.1)] to-[hsl(160_62%_26%/0.1)] border-l-4 border-[hsl(42_88%_50%)]">
            <span className="font-mono text-xs md:text-sm lg:text-base tracking-[0.12em] uppercase text-foreground font-bold text-left md:text-center">
              17+ production applications shipped for startups and international clients.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-5 mb-6 md:mb-8">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-none bg-primary text-primary-foreground hover:bg-foreground hover:scale-105 h-12 md:h-14 px-6 md:px-10 font-mono text-xs md:text-sm tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-lg hover:shadow-2xl"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Start a Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-none border-2 md:border-[3px] border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background hover:scale-105 h-12 md:h-14 px-6 md:px-10 font-mono text-xs md:text-sm tracking-[0.15em] uppercase font-bold transition-all duration-300"
              onClick={() =>
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Case Studies
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 md:gap-8">
            <a
              href="https://github.com/Sabbirbracu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 md:gap-2 font-mono text-xs md:text-sm tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors group"
            >
              GitHub <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-muted-foreground/40 text-base md:text-xl">•</span>
            <a
              href="https://www.linkedin.com/in/sabbirahmad653/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 md:gap-2 font-mono text-xs md:text-sm tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors group"
            >
              LinkedIn <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Capabilities & technologies ticker - at bottom */}
      <div className="border-t-[3px] border-b-[3px] border-foreground bg-navy flex items-stretch relative z-10 mt-auto">
        {/* Fixed label */}
        <div className="relative z-20 shrink-0 flex items-center gap-3 bg-[hsl(160_62%_26%)] px-6 md:px-8 border-r-[3px] border-[hsl(42_88%_50%)]">
          <span className="text-[hsl(42_88%_50%)] text-lg leading-none font-bold">★</span>
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-white font-bold">
            Capabilities
          </span>
        </div>

        {/* Marquee */}
        <div className="relative flex-1 overflow-hidden" aria-hidden="true">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {stack.map((item) => (
                  <span
                    key={`${copy}-${item.label}`}
                    className={`flex items-center gap-3 px-6 md:px-7 py-4 border-r border-white/20 font-mono text-xs tracking-[0.16em] uppercase transition-colors ${
                      item.capability
                        ? "text-white font-bold"
                        : "text-white/60 font-medium"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item.capability ? "bg-[hsl(42_88%_50%)]" : "bg-white/40"
                      }`}
                    />
                    {item.label}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
