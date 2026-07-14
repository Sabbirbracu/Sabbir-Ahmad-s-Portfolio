import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { useState } from "react";
import { PopupModal } from "react-calendly";
import ContactModal from "./ContactModal";

const CTASection = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const CALENDLY_URL = "https://calendly.com/sabbirahmad653/30min";

  return (
    <>
      <section id="contact" className="relative overflow-hidden py-20 md:py-32 bg-[hsl(165_28%_11%)]">
        {/* Background graphics */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[hsl(160_62%_26%/0.15)] to-transparent rounded-full blur-3xl" />
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(160 62% 40%) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(160 62% 40%) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="border-t border-white/10 pt-10">
              <p className="eyebrow mb-12 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[hsl(160_62%_40%/0.6)]" />
                <span>
                  <span className="text-[hsl(160_62%_40%)]">10</span> <span className="text-white/60">— Contact</span>
                </span>
                <span className="h-px w-8 bg-[hsl(160_62%_40%/0.6)]" />
              </p>

              <h2 className="font-heading text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] xl:text-[6rem] sm:leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.04em] text-white">
                Software outlives{" "}
                <span className="bg-gradient-to-br from-[hsl(160_62%_35%)] via-[hsl(160_62%_40%)] to-[hsl(95_55%_45%)] bg-clip-text text-transparent">code</span>.
              </h2>
            </div>

            {/* Stanza — triptych */}
            <div className="mt-14 md:mt-16 max-w-3xl mx-auto grid sm:grid-cols-3 border-y border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {[
                "The technologies will evolve.",
                "Requirements will change.",
                "Teams will grow.",
              ].map((line, i) => (
                <div key={line} className="px-6 py-5">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[hsl(160_62%_40%)] mb-2 font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-mono text-xs md:text-[13px] tracking-[0.04em] text-white/70">
                    {line}
                  </p>
                </div>
              ))}
            </div>

            {/* Thesis */}
            <p className="mt-14 md:mt-16 mx-auto max-w-3xl font-heading text-xl md:text-3xl font-bold tracking-tight text-white leading-snug">
              What remains is the quality of the
              <br />
              <span className="bg-gradient-to-br from-[hsl(160_62%_35%)] via-[hsl(160_62%_40%)] to-[hsl(95_55%_45%)] bg-clip-text text-transparent">engineering decisions</span>
              <br />
              made from the beginning.
            </p>

            <p className="mt-6 mx-auto max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
              If you're building software that's meant to last, let's start
              with the right foundation.
            </p>

            {/* Actions */}
            <div className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Button
                size="lg"
                className="bg-[hsl(160_62%_26%)] text-white hover:bg-white hover:text-[hsl(160_62%_26%)] h-12 md:h-14 px-9 font-mono text-xs tracking-[0.15em] uppercase transition-colors font-semibold"
                onClick={() => setContactOpen(true)}
              >
                Discuss Your Product
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white hover:text-[hsl(160_62%_26%)] h-12 md:h-14 px-9 font-mono text-xs tracking-[0.15em] uppercase transition-colors font-semibold"
                onClick={() => setIsCalendlyOpen(true)}
              >
                <Calendar className="mr-2 w-4 h-4" />
                Book an Engineering Call
              </Button>
            </div>

            {/* Availability note */}
            <p className="mt-8 flex items-center justify-center gap-2.5 font-mono text-[11px] tracking-[0.15em] uppercase text-white/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_40%)] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[hsl(160_62%_40%)]" />
              </span>
              Currently accepting new projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
      <PopupModal
        url={CALENDLY_URL}
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById("root") as HTMLElement}
        prefill={{ name: "", email: "" }}
        pageSettings={{
          backgroundColor: "f7f8f2",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "196b50",
          textColor: "12241d",
        }}
      />
    </>
  );
};

export default CTASection;
