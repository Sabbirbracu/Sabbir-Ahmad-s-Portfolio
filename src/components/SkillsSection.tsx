import { motion } from "framer-motion";
import { Code2, Server, Database, Cloud, Shield, Brain, ShoppingCart } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend",
    skills: ["React", "Tailwind CSS", "TypeScript", "Responsive UI", "Framer Motion"],
    color: "text-blue-400",
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Django", "Laravel", "WebSockets"],
    color: "text-green-400",
  },
  {
    icon: Database,
    title: "Database",
    skills: ["MongoDB", "MySQL", "Redis", "Mongoose ODM", "Database Design"],
    color: "text-yellow-400",
  },
  {
    icon: Cloud,
    title: "DevOps",
    skills: ["VPS Deployment", "Nginx", "Docker", "CI/CD", "GitHub Actions"],
    color: "text-purple-400",
  },
  {
    icon: Shield,
    title: "Auth & Security",
    skills: ["JWT", "OAuth 2.0", "RBAC", "Session Management", "Data Encryption"],
    color: "text-red-400",
  },
  {
    icon: Brain,
    title: "AI/ML (Exploratory)",
    skills: ["Computer Vision", "CNNs", "TensorFlow", "PyTorch", "Python", "OpenCV"],
    color: "text-primary",
  },
  {
    icon: ShoppingCart,
    title: "Platforms & Automation",
    skills: ["WordPress", "WooCommerce", "Shopify", "Kajabi", "Go High Level", "Klaviyo", "Email Deliverability"],
    color: "text-orange-400",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />
      
      <div className="section-container relative">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left - Title & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 mb-6">
              Engineering <span className="text-gradient">Skills</span>
            </h2>
            
            <div className="glass-card p-6 mt-8">
              <h3 className="text-lg font-heading font-semibold mb-3 text-foreground">
                Engineering Philosophy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I focus on <span className="text-foreground">clean architecture</span>, 
                maintainable code, and systems that{" "}
                <span className="text-primary">scale beyond MVP</span>. 
                Every project is built with production deployment in mind.
              </p>
            </div>
          </motion.div>

          {/* Right - Skills Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card-hover p-6 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-secondary/50 ${category.color}`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-secondary/30 text-muted-foreground rounded-md border border-border/30 hover:border-primary/30 hover:text-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;