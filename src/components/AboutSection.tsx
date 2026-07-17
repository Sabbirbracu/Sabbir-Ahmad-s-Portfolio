import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden bg-[hsl(165_28%_11%)]">
      {/* Dark background graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-gradient-radial from-[hsl(160_62%_26%/0.15)] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[hsl(42_88%_50%/0.08)] to-transparent rounded-full blur-3xl" />
        
        {/* Minimal grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(160 62% 40%) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(160 62% 40%) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Side decorations */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border border-white/5 rotate-12" />
        <div className="absolute bottom-1/3 right-12 w-16 h-16 border border-[hsl(42_88%_50%/0.15)]" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <div className="border-t border-white/10 pt-8">
            <p className="eyebrow mb-6">
              <span className="text-[hsl(160_62%_40%)]">08</span> <span className="text-white/60">— About</span>
            </p>
            <h2 className="font-heading text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] sm:leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.04em] text-white">
              Engineering products
              <br />
              that{" "}
              <span className="bg-gradient-to-br from-[hsl(160_62%_35%)] via-[hsl(160_62%_40%)] to-[hsl(95_55%_45%)] bg-clip-text text-transparent">last</span>
            </h2>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Portrait Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-gradient-to-br from-[hsl(162_30%_12%)] to-[hsl(162_30%_10%)] border border-white/10 overflow-hidden">
              {/* Subtle top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(160_62%_35%)] to-transparent opacity-50" />
              
              {/* Image */}
              <div className="p-6">
                <div className="relative overflow-hidden">
                  <img
                    src="https://pub-9d3effc166864bf2a230513269e822dc.r2.dev/about/img.webp"
                    alt="Sabbir Ahmad"
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {/* Corner accents */}
                  <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[hsl(160_62%_35%)]" />
                  <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[hsl(42_88%_50%)]" />
                </div>
              </div>

              {/* Info bar */}
              <div className="px-6 pb-6 pt-4 border-t border-white/10">
                <div className="flex justify-between items-baseline mb-4">
                  <p className="font-heading text-lg font-bold text-white">
                    Sabbir Ahmad
                  </p>
                  <p className="font-mono text-xs text-white/60 uppercase tracking-wider">
                    Dhaka, Bangladesh
                  </p>
                </div>

                {/* Education Card */}
                <div className="bg-gradient-to-r from-[hsl(160_62%_30%)] to-[hsl(42_88%_35%)] p-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 shrink-0 bg-white/10 border border-white/30">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-white">
                      B.Sc. Computer Science &amp; Engineering
                    </p>
                    <p className="text-xs text-white/80 mt-0.5">
                      BRAC University — Final semester
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Narrative Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="space-y-6 text-base md:text-lg text-white/80 leading-relaxed">
              <p>
                I'm <span className="text-white font-semibold">Sabbir Ahmad</span>, a software engineer passionate about building
                software that continues to perform long after launch.
              </p>
              <p>
                Currently completing my Bachelor's in Computer Science &amp;
                Engineering at BRAC University, I've spent the past few years
                designing, developing, and shipping production-ready
                applications for startups and businesses. My work spans <span className="text-white">SaaS
                platforms, custom business systems, ecommerce solutions, and
                AI-powered applications</span>.
              </p>
              <p>
                I enjoy solving complex engineering challenges, designing
                scalable architectures, and building software that delivers
                measurable business value. Beyond client work, I'm actively
                exploring <span className="text-[hsl(160_62%_40%)] font-semibold">artificial intelligence and computer vision</span> —
                researching practical ways to integrate intelligent
                capabilities into modern software products.
              </p>
              <p>
                Whether it's launching an MVP, scaling an existing platform, or
                integrating AI into business workflows, I focus on building
                solutions that are <span className="text-white font-semibold">reliable, maintainable, and ready for
                real-world use</span>.
              </p>
            </div>

            {/* Stats or highlights */}
            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="group">
                <div className="relative inline-block">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-[hsl(160_62%_40%)]">17+</div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_40%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-mono text-xs text-white/60 uppercase tracking-wider mt-1">Projects</div>
              </div>
              <div className="group">
                <div className="relative inline-block">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-[hsl(160_62%_40%)]">5+</div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_40%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-mono text-xs text-white/60 uppercase tracking-wider mt-1">Tech Stack</div>
              </div>
              <div className="group">
                <div className="relative inline-block">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-[hsl(160_62%_40%)]">2024</div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[hsl(42_88%_50%)] to-[hsl(160_62%_40%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-mono text-xs text-white/60 uppercase tracking-wider mt-1">Since</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
