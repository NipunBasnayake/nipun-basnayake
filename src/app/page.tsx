import { CertificationsTimeline } from "@/components/CertificationsTimeline";
import { ContactSection } from "@/components/ContactSection";
import { GitHubActivity } from "@/components/github/GitHubActivity";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { WhatIDo } from "@/components/WhatIDo";
import { getCommittersRank } from "@/lib/committers";

export const dynamic = "force-static";

export default async function Home() {
  const { rank, contributions } = await getCommittersRank();

  return (
    <>
      {/* 1. Hero - Who I Am */}
      <Hero />

      {/* 2. What I Do - My Expertise */}
      <WhatIDo />

      {/* 3. GitHub Activity - Social Proof */}
      <GitHubActivity rank={rank} contributions={contributions} />

      {/* 4. Featured Projects */}
      <ProjectsGrid variant="home" />

      {/* 5. Certifications & Proof */}
      <CertificationsTimeline limit={6} showAllLink />

      {/* 6. Contact */}
      <ContactSection />
    </>
  );
}

