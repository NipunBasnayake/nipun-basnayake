"use client";

import { motion } from "framer-motion";
import {
  Code,
  Monitor,
  Database,
  Server,
  Shield,
  Settings,
  Sparkles,
  GraduationCap,
  Target,
} from "lucide-react";
import { mainSkillAreas, personalData } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

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
    : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function WhatIDo() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <section id="what-i-do" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="What I Do"
          subtitle="Building enterprise-grade applications with modern technologies"
          eyebrow="Expertise"
        />

        {/* Professional Summary */}
        <motion.div className="mt-10" {...fadeUp(reduceMotion)}>
          <GlowCard>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-cyan-300" />
                  <h3 className="text-xl font-semibold text-white">
                    My Approach
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-white/80">
                  I specialize in building scalable, production-ready web applications
                  from the ground up. My expertise spans the full development lifecycle—from
                  architecting secure backend systems with Spring Boot and NestJS, to crafting
                  responsive, user-friendly frontends with React and Angular.
                </p>
                <p className="text-base leading-relaxed text-white/80">
                  I focus on writing clean, maintainable code, implementing robust authentication
                  and security practices, and deploying solutions on AWS with CI/CD pipelines.
                  Whether it's microservices architecture, real-time systems, or complex business
                  logic, I deliver solutions that work reliably at scale.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:border-l lg:border-white/10 lg:pl-8">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-cyan-300" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">
                      Education
                    </p>
                    <p className="text-sm text-white/80">
                      BSc in IT<br />
                      <span className="text-xs text-white/60">UCSC (2022-2026)</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">
                      Experience
                    </p>
                    <p className="text-sm text-white/80">
                      {personalData.experience}+ Years<br />
                      <span className="text-xs text-white/60">Full Stack Engineering</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Technical Skills */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {mainSkillAreas.map((area, index) => {
            const Icon = iconMap[area.icon as keyof typeof iconMap] ?? Sparkles;

            return (
              <motion.div key={area.title} {...fadeUp(reduceMotion, 0.1 + index * 0.05)}>
                <GlowCard className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {area.title}
                      </h3>
                      <p className="text-xs text-white/60">{area.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <Badge key={skill} className="text-xs">
                        {skill}
                      </Badge>
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
