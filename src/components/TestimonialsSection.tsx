import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
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

  return (
    <section id="testimonials" className="section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-glow pointer-events-none" />

      <div className="section-container relative py-20 md:py-28">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rule pt-8 mb-14 md:mb-20"
        >
          <p className="eyebrow mb-6">
            <span className="eyebrow-index">02</span> — Client Voices
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight text-foreground max-w-2xl">
              What clients say when the work is{" "}
              <span className="text-primary">done</span>.
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              From startup founders to marketing teams — people I've shipped
              real products for.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8 items-stretch">
          {/* Video testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-6"
          >
            <div className="border border-border h-full flex flex-col">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
                <Play className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  Video Review
                </span>
              </div>
              <div className="aspect-video flex-1">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
                  title="Client Testimonial Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Rotating text testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="col-span-12 md:col-span-6"
          >
            <div className="border border-border h-full flex flex-col p-8 md:p-10">
              <span
                className="font-heading text-6xl leading-none text-primary select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div className="flex-1 flex flex-col justify-between mt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <blockquote className="text-lg md:text-xl text-foreground leading-relaxed">
                      {textTestimonials[currentSlide].quote}
                    </blockquote>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="w-12 h-12 border border-primary/50 flex items-center justify-center">
                        <span className="font-heading font-semibold text-lg text-primary">
                          {textTestimonials[currentSlide].name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-foreground">
                          {textTestimonials[currentSlide].name}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground mt-0.5">
                          {textTestimonials[currentSlide].role} —{" "}
                          {textTestimonials[currentSlide].company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress dots */}
                <div className="flex gap-2 mt-10 pt-6 border-t border-border">
                  {textTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className="relative h-1 overflow-hidden transition-all duration-300"
                      style={{ width: index === currentSlide ? "40px" : "12px" }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    >
                      <div className="absolute inset-0 bg-foreground/20" />
                      {index === currentSlide && (
                        <motion.div
                          className="absolute inset-0 bg-primary"
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
