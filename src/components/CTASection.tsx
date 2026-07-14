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
      <section id="contact" className="section-dark relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-dark-glow pointer-events-none" />
        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rule pt-10 text-center"
          >
            <p className="eyebrow mb-12 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/60" />
              <span>
                <span className="eyebrow-index">10</span> — Contact
              </span>
              <span className="h-px w-8 bg-primary/60" />
            </p>

            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05]">
              Software outlives <span className="text-primary">code</span>.
            </h2>

            {/* Stanza — triptych */}
            <div className="mt-14 md:mt-16 max-w-3xl mx-auto grid sm:grid-cols-3 border-y border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[
                "The technologies will evolve.",
                "Requirements will change.",
                "Teams will grow.",
              ].map((line, i) => (
                <div key={line} className="px-6 py-5">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-primary/70 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-mono text-xs md:text-[13px] tracking-[0.04em] text-muted-foreground">
                    {line}
                  </p>
                </div>
              ))}
            </div>

            {/* Thesis */}
            <p className="mt-14 md:mt-16 mx-auto max-w-3xl font-heading text-xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
              What remains is the quality of the{" "}
              <span className="text-primary">engineering decisions</span> made
              from the beginning.
            </p>

            <p className="mt-6 mx-auto max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              If you're building software that's meant to last, let's start
              with the right foundation.
            </p>

            {/* Actions */}
            <div className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Button
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-foreground hover:text-background h-12 md:h-14 px-9 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
                onClick={() => setContactOpen(true)}
              >
                Discuss Your Product
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-foreground/40 bg-transparent text-foreground hover:bg-foreground hover:text-background h-12 md:h-14 px-9 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
                onClick={() => setIsCalendlyOpen(true)}
              >
                <Calendar className="mr-2 w-4 h-4" />
                Book an Engineering Call
              </Button>
            </div>

            {/* Availability note */}
            <p className="mt-8 flex items-center justify-center gap-2.5 font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
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
