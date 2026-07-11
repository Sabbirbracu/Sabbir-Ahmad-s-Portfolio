import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    Calendar,
    Check,
    CheckCircle2,
    Clock,
    Crown,
    LucideIcon,
    MessageSquare,
    Shield,
    Sparkles,
    Timer,
} from "lucide-react";
import { useState } from "react";
import QuoteRequestModal from "./QuoteRequestModal";
export interface PricingTier {
  label: string;
  range: string;
  timeline: string;
  popular: boolean;
  features: string[];
  tech: string[];
  deliverables: string[];
}

export interface ServiceData {
  id: number;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  pricing: PricingTier[];
  guarantee: string;
  featured: boolean;
  slots: number;
}

interface ServiceCardProps {
  service: ServiceData;
  index: number;
  totalCards: number;
  onBookCall: () => void;
}

const ServiceCard = ({
  service,
  index,
  totalCards,
  onBookCall,
}: ServiceCardProps) => {
  const [selectedTier, setSelectedTier] = useState(
    service.pricing.findIndex((p) => p.popular) !== -1
      ? service.pricing.findIndex((p) => p.popular)
      : 0
  );
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const currentTier = service.pricing[selectedTier];

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-lg transition-shadow hover:shadow-xl ${
        service.featured
          ? "border-primary/40 bg-gradient-to-br from-primary/5 via-background to-background"
          : "border-border bg-card"
      }`}
    >
      {/* Featured Badge */}
      {service.featured && (
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-center py-2 text-sm font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          Most Popular
          <Sparkles className="w-4 h-4" />
        </div>
      )}

      <div className="p-5 md:p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4 flex-1">
            <div
              className={`p-3 rounded-xl shrink-0 ${
                service.featured
                  ? "bg-primary/15 text-primary"
                  : "bg-muted/80 text-muted-foreground"
              }`}
            >
              <service.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                {service.title}
              </h3>
              <p className="text-primary font-medium text-sm">
                {service.tagline}
              </p>
            </div>
          </div>
          {/* Slots Badge */}
          {service.slots <= 3 && (
            <div className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1 shrink-0">
              <Timer className="w-3 h-3" />
              {service.slots} left
            </div>
          )}
        </div>

        {/* Pricing Toggle - Shows price & timeline */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {service.pricing.map((tier, idx) => (
            <button
              key={tier.label}
              onClick={() => setSelectedTier(idx)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                selectedTier === idx
                  ? "border-primary bg-primary/5"
                  : "border-border/50 bg-muted/20 hover:border-border"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-2 right-3 px-2 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  BEST VALUE
                </span>
              )}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`font-semibold ${selectedTier === idx ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {tier.label}
                </span>
                {selectedTier === idx && (
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div
                className={`text-lg font-bold ${selectedTier === idx ? "text-foreground" : "text-muted-foreground"}`}
              >
                {tier.range}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                {tier.timeline}
              </div>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Dynamic Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTier}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Features Grid */}
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    What's Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentTier.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="pt-3 border-t border-border/30">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentTier.tech.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 rounded-md bg-muted/50 text-muted-foreground text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="pt-3 border-t border-border/30">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                    Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentTier.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 rounded-md bg-primary/5 border border-primary/20 text-foreground text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Guarantee */}
                <div className="flex items-center gap-2 pt-3 border-t border-border/30">
                  <Shield className="w-4 h-4 text-green-500 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      Guarantee:
                    </span>{" "}
                    {service.guarantee}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: CTA Section */}
          <div className="lg:w-64 lg:border-l lg:border-border/30 lg:pl-6">
            <div className="space-y-4">
              {/* Custom Quote */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                <p className="text-sm text-muted-foreground mb-3">
                  Have specific requirements?
                </p>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send for Custom Quote
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Book Consultation */}
              <Button
                className="w-full group/btn bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={onBookCall}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Free 30-min call • No commitment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        serviceName={service.title}
      />
    </div>
  );
};

export default ServiceCard;
