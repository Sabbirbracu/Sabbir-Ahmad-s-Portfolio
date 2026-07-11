import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const stats = [
  { value: "17+", label: "Projects shipped in production" },
  { value: "3", label: "Live products serving real users" },
  { value: "2+", label: "Years building for clients & startups" },
  { value: "40%", label: "Conversion lift delivered for a client" },
];

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Socket.io",
  "Nginx",
  "GitHub Actions",
  "Tailwind CSS",
  "Computer Vision",
];

const HeroSection = () => {
  return (
    <section className="relative bg-hero-wash overflow-hidden">
      <div className="section-container pt-32 md:pt-40">
        {/* Main split */}
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-16 pb-16 md:pb-24 items-center">
          {/* Content */}
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow mb-8">
              <span className="eyebrow-index">00</span> — Introduction
            </p>

            <h1 className="font-heading text-[2.6rem] leading-[1.08] sm:text-5xl lg:text-[3.7rem] lg:leading-[1.06] font-semibold tracking-tight text-foreground max-w-xl">
              I build production systems that hold up under{" "}
              <span className="relative inline-block text-primary">
                real users
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-amber" />
              </span>
              .
            </h1>

            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              I take products from system design to deployment — and keep them
              running. I've shipped 17+ production apps for startups and
              international clients, and I'm now building{" "}
              <a
                href="https://bhashal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium editorial-link"
              >
                Bhashal
              </a>
              .
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button
                size="lg"
                className="rounded-none bg-primary text-primary-foreground hover:bg-foreground h-12 px-7 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
                onClick={() =>
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Selected Work
                <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none border-foreground/30 bg-transparent text-foreground hover:bg-foreground hover:text-background h-12 px-7 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Me
              </Button>
              <div className="flex items-center gap-5">
                <a
                  href="https://github.com/Sabbirbracu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sabbirahmad653/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Portrait — editorial duotone card */}
          <div className="col-span-12 lg:col-span-5">
            <div className="relative w-full max-w-[20rem] mx-auto lg:mr-0 lg:ml-auto">
              {/* Thin accent header */}
              <div className="flex items-center justify-between border border-border border-b-0 bg-navy px-4 py-2.5">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[hsl(40_40%_88%)]">
                  Sabbir Ahmad
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[hsl(40_30%_70%)]">
                    Available
                  </span>
                </span>
              </div>

              {/* Duotone portrait */}
              <div className="group relative overflow-hidden border border-border bg-navy">
                <img
                  src="/img.png"
                  alt="Sabbir Ahmad — Full-Stack Engineer"
                  className="w-full aspect-[4/5] object-cover object-top grayscale contrast-[1.05] transition-all duration-700 group-hover:grayscale-0"
                />
                {/* Warm duotone wash */}
                <div className="absolute inset-0 mix-blend-multiply bg-gradient-to-br from-primary/25 via-transparent to-navy/50 pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                {/* Bottom fade for caption legibility */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/90 to-transparent pointer-events-none" />

                {/* Amber corner ticks */}
                <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber" />
                <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber" />

                {/* Overlaid caption */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-heading font-semibold text-[hsl(40_40%_96%)] leading-tight">
                    Full-Stack Engineer
                  </p>
                  <p className="font-mono text-[11px] text-[hsl(40_30%_75%)] mt-1">
                    Dhaka, Bangladesh · BRAC University
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat rail */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-border bg-card/50 backdrop-blur-sm">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 md:p-7 ${
                i % 2 === 1 ? "border-l border-border" : ""
              } ${i >= 2 ? "max-lg:border-t max-lg:border-border" : ""} ${
                i === 2 ? "lg:border-l lg:border-border" : ""
              } ${i === 3 ? "lg:border-l lg:border-border" : ""}`}
            >
              <p className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack ticker */}
      <div className="mt-14 md:mt-20 border-y border-border bg-card/40 flex items-stretch">
        {/* Fixed label */}
        <div className="relative z-20 shrink-0 flex items-center gap-2.5 bg-navy px-5 md:px-7 border-r border-border">
          <span className="text-amber text-sm leading-none">◆</span>
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-[hsl(40_40%_90%)]">
            Stack
          </span>
        </div>

        {/* Marquee */}
        <div className="relative flex-1 overflow-hidden" aria-hidden="true">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {stack.map((tech, i) => (
                  <span
                    key={`${copy}-${tech}`}
                    className="group flex items-center gap-2.5 px-5 md:px-6 py-3.5 border-r border-border/70 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground"
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${
                        i % 2 === 0 ? "bg-primary" : "bg-amber"
                      }`}
                    />
                    {tech}
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
