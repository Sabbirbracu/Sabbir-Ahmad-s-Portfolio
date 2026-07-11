import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Sabbir Ahmad — Full Stack Software Engineer</title>
        <meta
          name="description"
          content="Sabbir Ahmad is a full-stack software engineer in Dhaka, Bangladesh. 17+ production projects shipped — React, Node.js, FastAPI, PostgreSQL. Currently building Bhashal."
        />
        <meta
          name="keywords"
          content="Full Stack Developer, Software Engineer, React, Node.js, FastAPI, PostgreSQL, MERN, Dhaka, Bangladesh"
        />
        <meta property="og:title" content="Sabbir Ahmad — Full Stack Software Engineer" />
        <meta
          property="og:description"
          content="I build production systems that hold up under real users."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sabbirdev.com" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ExperienceSection />
        <AboutSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
