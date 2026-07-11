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
            className="rule pt-8"
          >
            <p className="eyebrow mb-10">
              <span className="eyebrow-index">05</span> — Contact
            </p>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]">
              Let's build something
              <br />
              that <span className="text-primary">lasts</span>.
            </h2>

            <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Open to remote roles, onsite opportunities with global teams, and
              selective contract work. If you need an engineer who owns the
              outcome — not just the code — let's talk.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Button
                size="lg"
                className="rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-12 px-7 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
                onClick={() => setContactOpen(true)}
              >
                Contact Me
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background h-12 px-7 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
                onClick={() => setIsCalendlyOpen(true)}
              >
                <Calendar className="mr-2 w-4 h-4" />
                Book a Call
              </Button>
              <a
                href="mailto:sabbirahmad653@gmail.com"
                className="font-mono text-xs tracking-[0.1em] text-foreground editorial-link"
              >
                sabbirahmad653@gmail.com
              </a>
            </div>
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
          backgroundColor: "faf8f3",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "d6431a",
          textColor: "1a1613",
        }}
      />
    </>
  );
};

export default CTASection;
