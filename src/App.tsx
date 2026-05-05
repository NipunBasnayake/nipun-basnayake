import { CertificatesSection } from "./components/sections/CertificatesSection";
import { ContactSection } from "./components/sections/ContactSection";
import { EducationSection } from "./components/sections/EducationSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { SummarySection } from "./components/sections/SummarySection";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { useLenis } from "./hooks/useLenis";

export function App() {
  useLenis();

  return (
    <div className="min-h-screen bg-obsidian text-platinum">
      <Navbar />
      <main>
        <HeroSection />
        <SummarySection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
