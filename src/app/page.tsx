import { About } from "@/components/About";
import { CertificationsTimeline } from "@/components/CertificationsTimeline";
import { ContactSection } from "@/components/ContactSection";
import { GitHubActivity } from "@/components/github/GitHubActivity";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SkillsGrid } from "@/components/SkillsGrid";
import { getCommittersRank } from "@/lib/committers";

export const dynamic = "force-static";

export default async function Home() {
  const { rank, contributions } = await getCommittersRank();

  return (
    <>
      <Hero />
      <GitHubActivity rank={rank} contributions={contributions} />
      <About />
      <SkillsGrid />
      <ProjectsGrid variant="home" />
      <CertificationsTimeline limit={6} showAllLink />
      <ContactSection />
    </>
  );
}

