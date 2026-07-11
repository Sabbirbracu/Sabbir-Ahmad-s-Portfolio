import { motion, useInView } from "framer-motion";
import { Award, Clock, Heart, LucideIcon, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

const STATS: Stat[] = [
  { value: 50, suffix: "+", label: "Projects Delivered", icon: Rocket },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: Heart },
  { value: 4, suffix: "+", label: "Years Experience", icon: Award },
  { value: 24, suffix: "hr", label: "Avg Response Time", icon: Clock }
];

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasStarted]);

  return { count, ref };
};

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const { count, ref } = useCountUp(stat.value, 2000);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
    >
      <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
