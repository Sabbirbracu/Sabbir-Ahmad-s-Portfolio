import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Timeline depends on complexity. Landing pages take 3-5 days, business websites 1-2 weeks, MVPs 4-6 weeks, and full production apps 8-12 weeks. I'll give you an accurate estimate after our discovery call.",
  },
  {
    question: "What's your payment structure?",
    answer:
      "I typically work with 50% upfront and 50% on completion. For larger projects, we can split into milestones (e.g., 40% start, 30% mid-project, 30% launch). I accept bank transfer, PayPal, and crypto.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes! All projects include a support period (7-90 days depending on the package). After that, you can opt for my monthly maintenance plans starting at $150/month.",
  },
  {
    question: "Can I see progress during development?",
    answer:
      "Absolutely. I provide weekly demos and progress updates. You'll have access to a staging environment where you can see and test the work in real-time.",
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer:
      "I offer unlimited revisions during the development phase. If we can't find a solution that works for you, I provide a partial refund based on completed work. My 98% satisfaction rate speaks to my commitment to quality.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, I work with clients worldwide. I'm flexible with time zones and use async communication tools effectively. Video calls are scheduled at times that work for both of us.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground">
            Get answers to frequently asked questions about working with me.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-xl px-5 bg-card/30 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary py-4 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
