import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { ServiceData } from "@/components/services";
import {
  FAQSection,
  ProblemSection,
  ProcessSection,
  ServiceCard,
  ServicesCTA,
  ServicesHero,
  StatsSection,
  TrustBar
} from "@/components/services";
import { motion } from "framer-motion";
import { Bot, Code, Globe, ShoppingCart, Wrench, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";
import { Helmet } from "react-helmet-async";

// Calendly configuration
const CALENDLY_URL = "https://calendly.com/sabbirahmad653/30min";

// Services data with tier-specific features
const services: ServiceData[] = [
  {
    id: 1,
    icon: Code,
    title: "Custom Full-Stack Web Application Development",
    tagline: "Turn Your Vision Into a Scalable Product",
    description: "End-to-end development of scalable, secure web applications that grow with your business. From concept to deployment, I handle everything.",
    pricing: [
      { 
        label: "MVP Build", 
        range: "$2,000 – $4,000", 
        timeline: "4-6 weeks", 
        popular: false,
        features: [
          "Core functionality development",
          "User authentication system",
          "Basic admin dashboard",
          "Responsive design",
          "API integration (up to 3)",
          "Database setup & design",
          "Basic testing & QA",
          "Deployment to hosting"
        ],
        tech: ["React/Next.js", "Node.js/Nest.js", "Express", "MongoDB/MySQL", "REST API"],
        deliverables: ["Source code", "Basic documentation", "1 month support"]
      },
      { 
        label: "Production App", 
        range: "$4,500 – $6,000+", 
        timeline: "8-12 weeks", 
        popular: true,
        features: [
          "Everything in MVP Build",
          "Advanced features & logic",
          "Role-based access control",
          "Advanced admin dashboard",
          "Payment integration",
          "Email notifications system",
          "Analytics & reporting",
          "Performance optimization",
          "Security hardening",
          "CI/CD pipeline setup"
        ],
        tech: ["React / Next.js", "Node.js / Nest.js/ Express/ Laravel", "MongoDB/ PostgreSQL/ MySQL", "Redis", "AWS/Vercel", "Docker"],
        deliverables: ["Source code", "Full documentation", "API docs", "3 months support", "Training session"]
      }
    ],
    guarantee: "100% satisfaction or revisions until you're happy",
    featured: true,
    slots: 2
  },
  {
    id: 2,
    icon: Globe,
    title: "High-Conversion Business Websites & Landing Pages",
    tagline: "Websites That Actually Convert Visitors",
    description: "Beautiful, performance-optimized websites designed with conversion psychology. Every element serves a purpose.",
    pricing: [
      { 
        label: "Landing Page", 
        range: "$300 – $600", 
        timeline: "3-5 days", 
        popular: false,
        features: [
          "Single page design",
          "Mobile responsive",
          "Contact form integration",
          "Basic SEO setup",
          "Social media links",
          "Fast loading optimization"
        ],
        tech: ["React/ Wordpress/ WebFlow/ Shopify", "JavaScript", "Tailwind CSS"],
        deliverables: ["Source files", "Hosting setup guide", "1 revision round"]
      },
      { 
        label: "Business Website", 
        range: "$700 – $1,500", 
        timeline: "1-2 weeks", 
        popular: true,
        features: [
          "Multi-page website (5-10 pages)",
          "Custom responsive design",
          "CMS integration",
          "Blog/News section",
          "Advanced SEO optimization",
          "Google Analytics setup",
          "Contact forms with email",
          "Image optimization",
          "SSL certificate setup"
        ],
        tech: ["React / WordPress", "Tailwind CSS", "Headless CMS", "Vercel/Netlify"],
        deliverables: ["Source code", "CMS training", "SEO report", "14 days support"]
      }
    ],
    guarantee: "Free revisions for 14 days after delivery",
    featured: false,
    slots: 4
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: "E-Commerce Development & Workflow Automation",
    tagline: "Sell More, Work Less with Smart Automation",
    description: "Complete e-commerce solutions with automated workflows that save you 10+ hours per week on repetitive tasks.",
    pricing: [
      { 
        label: "Starter Store", 
        range: "$800 – $1,500", 
        timeline: "1-2 weeks", 
        popular: false,
        features: [
          "Product catalog (up to 50)",
          "Shopping cart & checkout",
          "Single payment gateway",
          "Order management",
          "Basic email notifications",
          "Mobile responsive design",
          "Inventory tracking"
        ],
        tech: ["WooCommerce", "Stripe/PayPal", "WordPress"],
        deliverables: ["Store setup", "Product upload", "Payment testing", "User guide"]
      },
      { 
        label: "Advanced Automation", 
        range: "$2,000 – $4,000", 
        timeline: "3-4 weeks", 
        popular: true,
        features: [
          "Everything in Starter Store",
          "Unlimited products",
          "Multiple payment gateways",
          "Abandoned cart recovery",
          "Email marketing automation",
          "CRM integration",
          "Inventory automation",
          "Order fulfillment workflow",
          "Customer segmentation",
          "Analytics dashboard"
        ],
        tech: ["WooCommerce / Custom", "Stripe", "Mailchimp/Klaviyo", "Zapier", "CRM Integration"],
        deliverables: ["Full store", "Automation setup", "Email templates", "Training video", "30 days support"]
      }
    ],
    guarantee: "30-day bug-free guarantee",
    featured: false,
    slots: 3
  },
  {
    id: 4,
    icon: Bot,
    title: "AI Feature Integration for Web Applications",
    tagline: "Future-Proof Your Product with AI",
    description: "Leverage cutting-edge AI to add intelligent features that set your product apart and delight your users.",
    pricing: [
      { 
        label: "Single AI Feature", 
        range: "$800 – $1,500", 
        timeline: "1-2 weeks", 
        popular: false,
        features: [
          "One AI-powered feature",
          "API integration setup",
          "Basic prompt engineering",
          "Error handling",
          "Usage monitoring",
          "Basic rate limiting"
        ],
        tech: ["OpenAI API", "Node.js", "REST API"],
        deliverables: ["Feature integration", "API documentation", "Usage guide"]
      },
      { 
        label: "AI-Powered Module", 
        range: "$2,000 – $5,000", 
        timeline: "3-5 weeks", 
        popular: true,
        features: [
          "Multiple AI features",
          "Custom AI chatbot",
          "Content generation system",
          "Smart recommendations",
          "Advanced prompt engineering",
          "Conversation memory",
          "Admin controls & monitoring",
          "Cost optimization",
          "Fallback handling",
          "Performance analytics"
        ],
        tech: ["OpenAI / Claude API", "LangChain", "Vector DB", "Node.js", "React"],
        deliverables: ["Full AI module", "Admin dashboard", "Training session", "Documentation", "60 days support"]
      }
    ],
    guarantee: "Performance benchmarks guaranteed",
    featured: false,
    slots: 2
  },
  {
    id: 5,
    icon: Wrench,
    title: "Ongoing Maintenance & Technical Support",
    tagline: "Sleep Better Knowing Your App is Protected",
    description: "Keep your applications running smoothly with professional maintenance, security updates, and priority support.",
    pricing: [
      { 
        label: "Basic Plan", 
        range: "$150 / month", 
        timeline: "5 hrs included", 
        popular: false,
        features: [
          "Bug fixes & patches",
          "Security updates",
          "Basic monitoring",
          "Monthly backup",
          "Email support",
          "48hr response time"
        ],
        tech: ["Server Monitoring", "Git", "CI/CD"],
        deliverables: ["Monthly report", "Backup copies", "Update logs"]
      },
      { 
        label: "Priority Plan", 
        range: "$300 / month", 
        timeline: "12 hrs + priority", 
        popular: true,
        features: [
          "Everything in Basic Plan",
          "Priority support queue",
          "Minor feature updates",
          "Performance optimization",
          "24/7 uptime monitoring",
          "Weekly backups",
          "Database optimization",
          "Same-day response",
          "Monthly strategy call",
          "Dedicated Slack channel"
        ],
        tech: ["Server Monitoring", "AWS/Vercel", "Database", "Security Tools", "Analytics"],
        deliverables: ["Weekly reports", "Priority access", "Strategy calls", "Dedicated support"]
      }
    ],
    guarantee: "Cancel anytime, no questions asked",
    featured: false,
    slots: 5
  },
  {
    id: 6,
    icon: Zap,
    title: "Business Workflow Automation",
    tagline: "Automate Repetitive Tasks & Scale Effortlessly",
    description: "Connect your tools, automate workflows, and save 10+ hours per week with custom automation solutions using Go High Level, N8N, and Zapier.",
    pricing: [
      {
        label: "Starter Automation",
        range: "$500 – $1,000",
        timeline: "3-5 days",
        popular: false,
        features: [
          "Up to 5 workflow automations",
          "Connect 3-5 apps/tools",
          "Lead capture automation",
          "Email sequence setup",
          "Basic CRM integration",
          "Form to spreadsheet sync",
          "Notification triggers",
          "Basic error handling"
        ],
        tech: ["Zapier", "Google Sheets", "Email Tools", "CRM"],
        deliverables: ["Workflow documentation", "Setup guide", "7 days support"]
      },
      {
        label: "Advanced Automation",
        range: "$1,500 – $3,500",
        timeline: "1-3 weeks",
        popular: true,
        features: [
          "Unlimited workflow automations",
          "Connect 10+ apps/tools",
          "Go High Level setup & config",
          "N8N custom workflows",
          "Multi-step complex automations",
          "Conditional logic & branching",
          "Data transformation & mapping",
          "API integrations",
          "Webhook configurations",
          "Advanced error handling & alerts",
          "Performance monitoring",
          "Team training session"
        ],
        tech: ["Go High Level", "N8N", "Zapier", "Make", "Custom APIs", "Webhooks"],
        deliverables: ["Full automation suite", "Video walkthroughs", "Documentation", "30 days support", "Training"]
      }
    ],
    guarantee: "Save 10+ hours/week or we'll rebuild it free",
    featured: false,
    slots: 4
  }
];

const Services = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Ensure page scrolls to top when navigating to Services
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

  return (
    <>
      <Helmet>
        <title>Services | Sabbir - Full-Stack Developer | Transform Your Ideas Into Reality</title>
        <meta name="description" content="Professional web development services: full-stack applications, business websites, e-commerce, AI integration. 50+ projects delivered, 98% satisfaction rate. Book free consultation." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <ServicesHero onBookCall={openCalendly} />

        {/* Trust Bar */}
        <TrustBar />

        {/* Stats Section */}
        <StatsSection />

        {/* Problem Section */}
        <ProblemSection />

        {/* Services Grid */}
        <section className="py-16 bg-gradient-to-b from-muted/30 via-background to-background">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Services That Deliver
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Invest in Solutions, Not Problems
              </h2>
              <p className="text-muted-foreground">
                Every service is designed to solve real business challenges and deliver measurable results.
              </p>
            </motion.div>

            {/* Service Cards */}
            <div className="space-y-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  totalCards={services.length}
                  onBookCall={openCalendly}
                />
              ))}
            </div>

            {/* Spacer */}
            <div className="h-16" />
          </div>
        </section>

        {/* Process Section */}
        <ProcessSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA Section */}
        <ServicesCTA onBookCall={openCalendly} />
      </main>
      
      <Footer />

      {/* Calendly Popup Modal */}
      <PopupModal
        url={CALENDLY_URL}
        onModalClose={closeCalendly}
        open={isCalendlyOpen}
        rootElement={document.getElementById("root") as HTMLElement}
        prefill={{
          name: "",
          email: "",
        }}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "8b5cf6",
          textColor: "1a1a1a",
        }}
      />
    </>
  );
};

export default Services;
