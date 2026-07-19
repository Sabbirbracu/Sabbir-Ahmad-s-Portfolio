import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import ExperienceSection from "@/components/ExperienceSection";
import StackSection from "@/components/StackSection";
import AboutSection from "@/components/AboutSection";
import InsightsSection from "@/components/InsightsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Sabbir Ahmad — Software Engineer | SaaS, Web & AI Development</title>
        <meta
          name="description"
          content="Sabbir Ahmad is a software engineer building SaaS platforms, custom web applications, and AI-powered products for startups and businesses. 17+ production applications shipped."
        />
        <meta
          name="keywords"
          content="SaaS Development, Custom Web Applications, AI Development, Software Engineer, Shopify Development, WordPress Development, Next.js, React, Node.js"
        />
        <meta property="og:title" content="Sabbir Ahmad — Software Engineer | SaaS, Web & AI Development" />
        <meta
          property="og:description"
          content="Building software that solves real business problems — SaaS platforms, business systems, and AI-powered products."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bysabbir.com" />
        <meta property="og:site_name" content="Sabbir Ahmad" />
        <meta property="og:image" content="https://pub-9d3effc166864bf2a230513269e822dc.r2.dev/about/img.webp" />
        <link rel="canonical" href="https://bysabbir.com" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
        <ProcessSection />
        <ExperienceSection />
        <StackSection />
        <AboutSection />
        <InsightsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
