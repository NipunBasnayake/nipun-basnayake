import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { personalData, sectionsData } from "@/data/portfolio";

const resumeFile = "/assets/cv/Nipun_Sathsara_Basanayaka_Software_Engineer_CV.pdf";

export const dynamic = "force-static";

export default function ResumePage() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <SectionHeading
          title="Resume / CV"
          subtitle={`${personalData.fullName} - ${sectionsData.hero.subtitle}`}
          eyebrow="Resume"
        />
        <GlowCard className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Download or View My Resume
              </h3>
              <p className="mt-1 text-sm text-white/70">
                Full Stack Software Engineer with expertise in Spring Boot, React, and cloud technologies
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={resumeFile} variant="primary" download>
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button href={resumeFile} variant="outline" target="_blank">
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </Button>
              <Button href="/contact" variant="ghost">
                Get In Touch
              </Button>
            </div>
          </div>
        </GlowCard>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
          <iframe
            title="Resume PDF Preview"
            src={resumeFile}
            className="h-[85vh] w-full"
          />
        </div>
      </div>
    </section>
  );
}

