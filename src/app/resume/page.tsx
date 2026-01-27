import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionsData } from "@/data/portfolio";

const resumeFile = "/assets/cv/Nipun-Basnayaka-CV-Jan-26.pdf";

export const dynamic = "force-static";

export default function ResumePage() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <SectionHeading
          title={sectionsData.about.ctaButtons[0].text}
          subtitle={sectionsData.about.subtitle}
          eyebrow="Resume"
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={resumeFile} variant="primary">
            {sectionsData.about.ctaButtons[0].text}
          </Button>
          <Button href="/contact" variant="outline">
            {sectionsData.contact.title}
          </Button>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <iframe
            title="Resume PDF"
            src={resumeFile}
            className="h-[80vh] w-full"
          />
        </div>
      </div>
    </section>
  );
}

