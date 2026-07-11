import { motion } from "framer-motion";
import { AlertTriangle, ArrowDown, Ban, CircleDollarSign, Clock, FileQuestion, Ghost, ShieldAlert } from "lucide-react";

const PROBLEMS = [
  { 
    problem: "Paid upfront, got ghosted", 
    description: "You hired someone who seemed great, took your money, then vanished into thin air.",
    icon: Ghost,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20 hover:border-red-500/40"
  },
  { 
    problem: "\"Almost done\" for 3 months", 
    description: "Every week it's the same story. Deadlines pass, excuses pile up, and your launch keeps getting pushed.",
    icon: Clock,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20 hover:border-orange-500/40"
  },
  { 
    problem: "Code that breaks everything", 
    description: "Cheap development costs you 10x more to fix. Now you're stuck with spaghetti code that crashes daily.",
    icon: Ban,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20 hover:border-rose-500/40"
  },
  { 
    problem: "Zero documentation", 
    description: "Want to make a simple change? Too bad. No one knows how the code works, not even the person who wrote it.",
    icon: FileQuestion,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20 hover:border-amber-500/40"
  },
  { 
    problem: "Security nightmares", 
    description: "Your customer data is at risk. You found out the hard way that security was an afterthought.",
    icon: ShieldAlert,
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    borderColor: "border-red-600/20 hover:border-red-600/40"
  },
  { 
    problem: "Money down the drain", 
    description: "You've already spent thousands. Now you need to start over or pay even more to salvage the mess.",
    icon: CircleDollarSign,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20 hover:border-yellow-500/40"
  }
];

const ProblemSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-6"
          >
            <AlertTriangle className="w-4 h-4" />
            Does This Sound Familiar?
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            You've Been <span className="text-red-500">Burned Before</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If you've worked with developers before, you probably know the pain. 
            These stories happen every day — and they're costing businesses like yours 
            <span className="text-foreground font-medium"> thousands of dollars</span>.
          </p>
        </motion.div>
        
        {/* Problem Cards - Staggered Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {PROBLEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative p-6 rounded-2xl ${item.bgColor} border ${item.borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                "{item.problem}"
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              
              {/* Decorative quote marks */}
              <div className={`absolute top-4 right-4 text-4xl ${item.color} opacity-10 font-serif`}>
                "
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emotional Hook + Transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
            <p className="text-lg text-muted-foreground mb-4">
              You're not alone. <span className="text-foreground font-medium">73% of software projects fail</span> due to 
              poor communication, unclear requirements, or unreliable developers.
            </p>
            <p className="text-xl font-heading font-bold text-foreground mb-6">
              But it doesn't have to be this way.
            </p>
            
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
            
            <p className="mt-4 text-primary font-semibold">
              Here's what working with a reliable developer looks like
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
