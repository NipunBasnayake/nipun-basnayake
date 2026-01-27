"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import type { Project } from "@/components/ProjectCard";

const fadeUp = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div {...fadeUp(reduceMotion)}>
          <GlowCard className="p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border-cyan-300/40 bg-cyan-400/10 text-cyan-100">
                    {project.category}
                  </Badge>
                  {project.featured ? (
                    <Badge className="border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200">
                      Featured
                    </Badge>
                  ) : null}
                </div>
                <h1 className="text-3xl font-semibold text-white md:text-4xl">
                  {project.title}
                </h1>
                <p className="text-base text-white/70">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.demoLink ? (
                    <Button href={project.demoLink} variant="primary">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  ) : null}
                  {project.codeLink ? (
                    <Button href={project.codeLink} variant="outline">
                      <Github className="h-4 w-4" />
                      Source Code
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.div>
        <motion.div className="mt-10" {...fadeUp(reduceMotion, 0.1)}>
          <GlowCard>
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Layers className="h-5 w-5 text-cyan-300" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white">Project Highlights</h2>
                <p className="mt-2 text-sm text-white/70">
                  {project.description}
                </p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}

