import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const TRUST_SIGNALS = [
  "Secure Payment via Escrow",
  "NDA & Contract Included",
  "Source Code Ownership",
  "Post-Launch Support"
];

const TrustBar = () => {
  return (
    <section className="py-6 border-y border-border/50 bg-muted/30">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_SIGNALS.map((signal, index) => (
            <motion.div
              key={signal}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Shield className="w-4 h-4 text-green-500" />
              {signal}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
