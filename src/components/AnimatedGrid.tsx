import { motion } from "framer-motion";

const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(186 100% 50% / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(186 100% 50% / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Animated Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Radial Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 20%, hsl(186 100% 50% / 0.08) 0%, transparent 50%)`,
        }}
      />
      
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 80%, hsl(200 100% 60% / 0.05) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
};

export default AnimatedGrid;