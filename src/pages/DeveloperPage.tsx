import { CertificatesSection } from "../components/sections/CertificatesSection";
import { ContactSection } from "../components/sections/ContactSection";
import { EducationSection } from "../components/sections/EducationSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { SummarySection } from "../components/sections/SummarySection";

export function DeveloperPage() {
  return (
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
  );
}
