"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code,
  Monitor,
  Database,
  Server,
  Shield,
  Settings,
  Sparkles,
} from "lucide-react";
import { mainSkillAreas, sectionsData } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = {
  Code,
  Monitor,
  Database,
  Server,
  Shield,
  Settings,
} as const;

const fadeUp = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export function SkillsGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title={sectionsData.skills.title}
          subtitle={sectionsData.skills.subtitle}
          eyebrow="Skill Areas"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {mainSkillAreas.map((area, index) => {
            const Icon = iconMap[area.icon as keyof typeof iconMap] ?? Sparkles;

            return (
              <motion.div key={area.title} {...fadeUp(reduceMotion, index * 0.05)}>
                <GlowCard className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {area.title}
                      </h3>
                      <p className="text-sm text-white/60">{area.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
