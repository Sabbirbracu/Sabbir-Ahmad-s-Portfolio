import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(165_28%_11%)] border-t border-white/10">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          {/* Wordmark */}
          <div className="col-span-12 md:col-span-5">
            <p className="font-heading text-2xl font-bold tracking-tight text-white">
              Sabbir Ahmad<span className="text-[hsl(160_62%_40%)]">.</span>
            </p>
            <p className="mt-3 text-sm text-white/70 max-w-xs leading-relaxed">
              Building SaaS platforms, custom business systems, and AI-powered
              products for startups and growing businesses.
            </p>
          </div>

          {/* Navigate */}
          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[hsl(160_62%_40%)] mb-4 font-semibold">Navigate</p>
            <div className="flex flex-col gap-3 text-sm">
              <Link to="/projects" className="text-white/80 hover:text-[hsl(160_62%_40%)] transition-colors">
                All Projects
              </Link>
              <a href="/#experience" className="text-white/80 hover:text-[hsl(160_62%_40%)] transition-colors">
                Experience
              </a>
              <a href="/#about" className="text-white/80 hover:text-[hsl(160_62%_40%)] transition-colors">
                About
              </a>
              <a href="/resume.pdf" download className="text-white/80 hover:text-[hsl(160_62%_40%)] transition-colors">
                Resume
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="col-span-6 md:col-span-4">
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[hsl(160_62%_40%)] mb-4 font-semibold">Connect</p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:sabbirahmad653@gmail.com"
                className="inline-flex items-center gap-1 text-white/80 hover:text-[hsl(160_62%_40%)] transition-colors"
              >
                sabbirahmad653@gmail.com
              </a>
              <a
                href="https://github.com/Sabbirbracu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/80 hover:text-[hsl(160_62%_40%)] transition-colors"
              >
                GitHub <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/sabbirahmad653/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/80 hover:text-[hsl(160_62%_40%)] transition-colors"
              >
                LinkedIn <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="text-white/60">
                Merul Badda, Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="font-mono text-xs text-white/60">
            © {currentYear} Sabbir Ahmad
          </p>
          <p className="font-mono text-xs text-white/60">
            Designed &amp; built by me — of course.
          </p>
          <Link
            to="/admin/login"
            className="font-mono text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
