import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle, Sparkles } from "lucide-react";

interface ServicesCTAProps {
  onBookCall: () => void;
}

const ServicesCTA = ({ onBookCall }: ServicesCTAProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Limited Availability
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            Ready to Build Something
            <span className="text-primary"> Amazing?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project in a free 30-minute strategy call. No
            pressure, no commitment—just a conversation about your goals.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              "Free consultation",
              "No commitment required",
              "Get a clear roadmap",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
                {item}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="group h-14 px-8 text-lg font-semibold"
            onClick={onBookCall}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Your Free Strategy Call
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="mt-4 text-sm text-muted-foreground">
            Usually responds within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCTA;
