import { About } from "@/components/About";
import { CertificationsTimeline } from "@/components/CertificationsTimeline";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SkillsGrid } from "@/components/SkillsGrid";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SkillsGrid />
      <ProjectsGrid variant="home" />
      <CertificationsTimeline limit={6} showAllLink />
      <ContactSection />
    </>
  );
}

