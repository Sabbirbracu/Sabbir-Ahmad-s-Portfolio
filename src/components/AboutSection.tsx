import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rule pt-8 mb-14 md:mb-20"
        >
          <p className="eyebrow mb-6">
            <span className="eyebrow-index">08</span> — About
          </p>
        </motion.div>

        {/* Portrait + Narrative */}
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-5 lg:col-span-4"
          >
            <div className="relative border border-border">
              <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-primary z-10" />
              <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-primary z-10" />
              <img
                src="/img.png"
                alt="Sabbir Ahmad"
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="flex justify-between items-baseline mt-3">
              <p className="font-mono text-xs text-muted-foreground">
                Sabbir Ahmad
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                Dhaka, Bangladesh
              </p>
            </div>

            {/* Education */}
            <div className="mt-6 border border-border bg-card p-5 flex items-center gap-4">
              <span className="flex items-center justify-center w-11 h-11 shrink-0 border border-primary/40 text-primary">
                <GraduationCap className="w-5 h-5" />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  B.Sc. Computer Science &amp; Engineering
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  BRAC University — Final semester
                </p>
              </div>
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 md:col-span-7 flex flex-col justify-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-tight text-foreground">
              Engineering products that{" "}
              <span className="text-primary">last</span>.
            </h2>

            <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm Sabbir Ahmad, a software engineer passionate about building
                software that continues to perform long after launch.
              </p>
              <p>
                Currently completing my Bachelor's in Computer Science &amp;
                Engineering at BRAC University, I've spent the past few years
                designing, developing, and shipping production-ready
                applications for startups and businesses. My work spans SaaS
                platforms, custom business systems, ecommerce solutions, and
                AI-powered applications.
              </p>
              <p>
                I enjoy solving complex engineering challenges, designing
                scalable architectures, and building software that delivers
                measurable business value. Beyond client work, I'm actively
                exploring artificial intelligence and computer vision —
                researching practical ways to integrate intelligent
                capabilities into modern software products.
              </p>
              <p>
                Whether it's launching an MVP, scaling an existing platform, or
                integrating AI into business workflows, I focus on building
                solutions that are reliable, maintainable, and ready for
                real-world use.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
