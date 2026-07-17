import { AnimatePresence, motion } from "framer-motion";
import { Play, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface TextTestimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
}

const textTestimonials: TextTestimonial[] = [
  {
    id: 1,
    name: "Mor Marks",
    role: "CEO",
    company: "Adapt online, Inc.",
    quote:
      "Sabbir's technical expertise and problem-solving skills are exceptional. He delivered a complex web application on time and exceeded all our expectations. He was flexible and responsive. Would definitely hire again.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    quote:
      "Working with Sabbir was a pleasure. His attention to detail and commitment to quality made our project a huge success. Highly recommended!",
  },
  {
    id: 3,
    name: "Juliet Easton",
    role: "Marketing Lead",
    company: "BadAss.Marketing, LLC",
    quote:
      "Sabbir transformed our vision into reality. His full-stack expertise and proactive communication made the development process smooth and efficient.",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Marketing Director",
    company: "GrowthHub",
    quote:
      "The website Sabbir built for us increased our conversions by 40%. His understanding of both design and functionality is truly impressive.",
  },
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % textTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const youtubeVideoId = "2Fs0-o5jeEU";
  // Click-to-load facade: the YouTube iframe (and its tracking cookies) only
  // mount after the visitor chooses to play, keeping the initial page load
  // cookie-free and lighter.
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-28 bg-[hsl(165_28%_11%)]">
      {/* Premium dark background graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-radial from-[hsl(160_62%_26%/0.15)] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[hsl(42_88%_50%/0.08)] to-transparent rounded-full blur-3xl" />
        
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
              <span className="text-[hsl(160_62%_40%)]">04</span> <span className="text-white/60">— Client Voices</span>
            </p>
            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-[2.75rem] leading-[1.1] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] sm:leading-[1.05] lg:leading-[1.02] font-extrabold tracking-[-0.04em] text-white">
                Trusted by <span className="font-black uppercase bg-gradient-to-br from-[hsl(160_62%_22%)] via-[hsl(160_62%_24%)] to-[hsl(95_55%_32%)] bg-clip-text text-transparent">FOUNDERS</span>
                <br />
                and businesses
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-3xl">
                Helping clients ship reliable software matters more than simply
                delivering code.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Elegant video testimonial card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="relative h-full flex flex-col bg-gradient-to-br from-[hsl(162_30%_12%)] to-[hsl(162_30%_10%)] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
              {/* Subtle top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(160_62%_35%)] to-transparent opacity-50" />
              
              {/* Video container with elegant padding */}
              <div className="p-6 md:p-8">
                <div className="relative aspect-video bg-black/40 overflow-hidden">
                  {videoLoaded ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&autoplay=1`}
                      title="Client Testimonial Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setVideoLoaded(true)}
                      aria-label="Play client testimonial video"
                      className="group/play absolute inset-0 w-full h-full"
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`}
                        alt="Client Testimonial Video thumbnail"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute inset-0 bg-black/40 group-hover/play:bg-black/25 transition-colors duration-300" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[hsl(160_62%_26%)] group-hover/play:bg-[hsl(160_62%_30%)] group-hover/play:scale-105 transition-all duration-300 shadow-2xl">
                          <Play className="w-7 h-7 md:w-8 md:h-8 text-white translate-x-0.5" fill="currentColor" />
                        </span>
                      </span>
                    </button>
                  )}

                  {/* Subtle corner ornaments */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-white/20 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white/20 pointer-events-none" />
                </div>
              </div>
              
              {/* Refined bottom info */}
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10">
                    <Play className="w-4 h-4 text-[hsl(160_62%_40%)]" fill="currentColor" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-xs tracking-[0.15em] uppercase text-white/90 font-semibold">
                      Video Testimonial
                    </p>
                    <p className="font-mono text-[10px] text-white/40 mt-0.5">
                      Client Review
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(160_62%_30%/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </motion.div>

          {/* Elegant text testimonial card with photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="group"
          >
            <div className="relative h-full flex flex-col bg-gradient-to-br from-[hsl(162_30%_12%)] to-[hsl(162_30%_10%)] border border-white/10 hover:border-white/20 p-8 md:p-10 transition-all duration-500">
              {/* Subtle top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(160_62%_35%)] to-transparent opacity-50" />
              
              {/* Refined quote mark */}
              <div className="absolute top-8 right-8 opacity-5">
                <Quote className="w-20 h-20 text-white" strokeWidth={1.5} />
              </div>

              <div className="relative z-10 flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Opening quote icon */}
                    <div className="mb-4">
                      <Quote className="w-8 h-8 text-[hsl(160_62%_35%)]" strokeWidth={2} />
                    </div>

                    {/* Quote text */}
                    <blockquote className="text-lg md:text-xl text-white/95 leading-[1.7] font-normal mb-auto">
                      {textTestimonials[currentSlide].quote}
                    </blockquote>

                    {/* Closing quote icon */}
                    <div className="mt-4 flex justify-end">
                      <Quote className="w-8 h-8 text-[hsl(160_62%_35%)] rotate-180" strokeWidth={2} />
                    </div>

                    {/* Client info - elegant layout */}
                    <div className="mt-10 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        {/* Professional circular photo */}
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-[hsl(160_62%_35%)] blur-md opacity-20" />
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10">
                            <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${textTestimonials[currentSlide].name}`}
                              alt={textTestimonials[currentSlide].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Client details - refined typography */}
                        <div className="flex-1">
                          <p className="font-heading text-base font-bold text-white mb-1">
                            {textTestimonials[currentSlide].name}
                          </p>
                          <p className="font-sans text-sm text-white/60">
                            {textTestimonials[currentSlide].role}
                          </p>
                          <p className="font-mono text-xs text-[hsl(160_62%_45%)] mt-0.5 tracking-wider">
                            {textTestimonials[currentSlide].company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Refined progress indicators */}
                <div className="flex gap-2 mt-8">
                  {textTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className="relative h-[3px] overflow-hidden transition-all duration-300"
                      style={{ width: index === currentSlide ? "56px" : "16px" }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    >
                      <div className="absolute inset-0 bg-white/10" />
                      {index === currentSlide && (
                        <motion.div
                          className="absolute inset-0 bg-[hsl(160_62%_40%)]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 6, ease: "linear" }}
                          style={{ transformOrigin: "left" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tl from-[hsl(160_62%_30%/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
