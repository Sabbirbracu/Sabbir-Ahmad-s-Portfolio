import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-dark border-t border-border">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          {/* Wordmark */}
          <div className="col-span-12 md:col-span-5">
            <p className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Sabbir Ahmad<span className="text-primary">.</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Building SaaS platforms, custom business systems, and AI-powered
              products for startups and growing businesses.
            </p>
          </div>

          {/* Navigate */}
          <div className="col-span-6 md:col-span-3">
            <p className="eyebrow mb-4">Navigate</p>
            <div className="flex flex-col gap-3 text-sm">
              <Link to="/projects" className="text-foreground/80 hover:text-primary transition-colors">
                All Projects
              </Link>
              <a href="/#experience" className="text-foreground/80 hover:text-primary transition-colors">
                Experience
              </a>
              <a href="/#about" className="text-foreground/80 hover:text-primary transition-colors">
                About
              </a>
              <a href="/resume.pdf" download className="text-foreground/80 hover:text-primary transition-colors">
                Resume
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="col-span-6 md:col-span-4">
            <p className="eyebrow mb-4">Connect</p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:sabbirahmad653@gmail.com"
                className="inline-flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors"
              >
                sabbirahmad653@gmail.com
              </a>
              <a
                href="https://github.com/Sabbirbracu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors"
              >
                GitHub <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/sabbirahmad653/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors"
              >
                LinkedIn <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="text-muted-foreground">
                Merul Badda, Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="rule mt-12 pt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © {currentYear} Sabbir Ahmad
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Designed &amp; built by me — of course.
          </p>
          <Link
            to="/admin/login"
            className="font-mono text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
