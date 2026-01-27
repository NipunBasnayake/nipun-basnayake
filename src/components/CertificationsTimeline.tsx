"use client";

import { motion } from "framer-motion";
import { certificationsData, sectionsData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const fadeUp = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

type CertificationsTimelineProps = {
  limit?: number;
  showAllLink?: boolean;
};

export function CertificationsTimeline({
  limit,
  showAllLink = false,
}: CertificationsTimelineProps) {
  const reduceMotion = useReducedMotionSafe();
  const ordered = [...certificationsData].sort(
    (a, b) => Number(b.date) - Number(a.date)
  );
  const visible = typeof limit === "number" ? ordered.slice(0, limit) : ordered;

  return (
    <section id="certifications" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title={sectionsData.certifications.title}
          subtitle={sectionsData.certifications.subtitle}
          eyebrow="Credentials"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((cert, index) => (
            <motion.div key={cert.title} {...fadeUp(reduceMotion, index * 0.05)}>
              <GlowCard className="h-full">
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10">
                    <ImageWithFallback
                      src={cert.badge}
                      alt={`${cert.title} badge`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-white">
                        {cert.title}
                      </h3>
                      <span className="text-xs text-cyan-200/80">{cert.date}</span>
                    </div>
                    <p className="text-sm text-white/60">{cert.issuer}</p>
                    {cert.verificationLink ? (
                      <a
                        href={cert.verificationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan-200/80 hover:text-cyan-100"
                      >
                        Verify credential
                      </a>
                    ) : null}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
        {showAllLink ? (
          <div className="mt-8 flex justify-end">
            <Button href="/certifications" variant="outline" size="sm">
              View All Certifications
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

