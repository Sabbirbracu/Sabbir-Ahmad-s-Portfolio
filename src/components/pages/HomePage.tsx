"use client";

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
