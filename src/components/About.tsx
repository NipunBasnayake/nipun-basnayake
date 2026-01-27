"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { personalData, sectionsData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const fadeUp = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function About() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section id="about" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title={sectionsData.about.title}
          subtitle={sectionsData.about.subtitle}
          eyebrow="Profile"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div {...fadeUp(reduceMotion)}>
            <GlowCard className="h-full">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                  Professional Summary
                </p>
                <p className="text-base text-white/70">{personalData.bio}</p>
                <div className="flex flex-wrap gap-3">
                  {sectionsData.about.ctaButtons.map((button) => (
                    <Button
                      key={button.text}
                      href={button.link}
                      variant={button.type === "outline" ? "outline" : "primary"}
                      download={button.id === "download-cv" ? "" : undefined}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
          <motion.div
            className="space-y-6"
            {...fadeUp(reduceMotion, 0.1)}
          >
            <GlowCard>
              <div className="flex items-start gap-4">
                <GraduationCap className="h-6 w-6 text-cyan-300" />
                <div>
                  <h3 className="text-base font-semibold text-white">Education</h3>
                  <p className="text-sm text-white/70">{personalData.education}</p>
                </div>
              </div>
            </GlowCard>
            <GlowCard>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-cyan-300" />
                <div>
                  <h3 className="text-base font-semibold text-white">Location</h3>
                  <p className="text-sm text-white/70">{personalData.location}</p>
                </div>
              </div>
            </GlowCard>
            <GlowCard>
              <div className="flex items-start gap-4">
                <Sparkles className="h-6 w-6 text-cyan-300" />
                <div>
                  <h3 className="text-base font-semibold text-white">Experience</h3>
                  <p className="text-sm text-white/70">
                    {personalData.experience} Years in full-stack engineering
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

