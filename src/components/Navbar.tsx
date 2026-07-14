import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { index: "02", label: "Work", href: "/#work", isRoute: false },
  { index: "03", label: "Services", href: "/#services", isRoute: false, hasDropdown: true },
  { index: "04", label: "Clients", href: "/#testimonials", isRoute: false },
  { index: "05", label: "Process", href: "/#process", isRoute: false },
  { index: "08", label: "About", href: "/#about", isRoute: false },
  { index: "10", label: "Contact", href: "/#contact", isRoute: false },
];

const serviceLinks = [
  { label: "SaaS Development", href: "/#services" },
  { label: "Custom Web Applications", href: "/#services" },
  { label: "AI-Powered Applications", href: "/#services" },
  { label: "Shopify Development", href: "/#services" },
  { label: "WordPress & WooCommerce", href: "/#services" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, isRoute: boolean) => {
    setIsMobileOpen(false);

    if (!isRoute && href.startsWith("/#")) {
      const hash = href.substring(1);
      if (location.pathname === "/") {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Wordmark */}
        <Link
          to="/"
          className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-foreground"
        >
          Sabbir Ahmad<span className="text-primary">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="group font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 bg-transparent border-none outline-none">
                  <span className="text-primary/60 group-hover:text-primary transition-colors mr-1.5">
                    {link.index}
                  </span>
                  {link.label}
                  <ChevronDown className="w-3 h-3 mt-0.5 group-hover:text-primary transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[240px]">
                  {serviceLinks.map((service) => (
                    <DropdownMenuItem key={service.label} asChild>
                      <Link
                        to={service.href}
                        onClick={() => handleNavClick(service.href, false)}
                        className="cursor-pointer font-mono text-xs tracking-wider"
                      >
                        {service.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleNavClick(link.href, link.isRoute)}
                className="group font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-primary/60 group-hover:text-primary transition-colors mr-1.5">
                  {link.index}
                </span>
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-mono text-xs tracking-[0.15em] uppercase px-5 transition-colors"
              >
                Resume
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full h-screen flex flex-col">
              <DialogHeader>
                <DialogTitle className="font-heading">Resume — Sabbir Ahmad</DialogTitle>
                <DialogDescription>Preview of resume (PDF)</DialogDescription>
              </DialogHeader>
              <div className="mt-2 flex-1 overflow-hidden">
                {isResumeOpen && (
                  <iframe src="/resume.pdf" title="Resume" className="w-full h-full" />
                )}
              </div>
              <DialogFooter>
                <a
                  href="/resume.pdf"
                  download
                  className="text-sm text-primary editorial-link"
                >
                  Download Resume
                </a>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="section-container py-6 space-y-5">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.label} className="space-y-2">
                    <div className="font-mono text-sm tracking-[0.15em] uppercase text-foreground">
                      {link.label}
                    </div>
                    <div className="pl-4 space-y-3">
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.label}
                          to={service.href}
                          onClick={() => handleNavClick(service.href, false)}
                          className="block font-mono text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => handleNavClick(link.href, link.isRoute)}
                    className="block font-mono text-sm tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <a
                href="/resume.pdf"
                download
                className="block font-mono text-sm tracking-[0.15em] uppercase text-primary"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
