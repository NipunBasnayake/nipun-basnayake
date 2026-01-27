"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projectsData, sectionsData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type ProjectsGridProps = {
  variant?: "home" | "page";
};

const fadeUp = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function ProjectsGrid({ variant = "home" }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const reduceMotion = useReducedMotionSafe();

  const orderedProjects = useMemo(
    () => [...projectsData].sort((a, b) => Number(b.featured) - Number(a.featured)),
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return orderedProjects;
    return orderedProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory, orderedProjects]);

  const featuredProjects = orderedProjects.filter((project) => project.featured);
  const otherProjects = orderedProjects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title={sectionsData.projects.title}
          subtitle={sectionsData.projects.subtitle}
          eyebrow="Projects"
        />
        {variant === "page" ? (
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            {...fadeUp(reduceMotion)}
          >
            {sectionsData.projects.categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition",
                  activeCategory === category
                    ? "border-cyan-300/70 bg-cyan-300/20 text-white"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-cyan-300/40"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        ) : null}

        {variant === "home" ? (
          <div className="mt-10 space-y-12">
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <motion.div key={project.title} {...fadeUp(reduceMotion, index * 0.05)}>
                  <ProjectCard project={project} variant="featured" />
                </motion.div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">More Projects</h3>
                <Button href="/projects" variant="outline" size="sm">
                  View All Projects
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    {...fadeUp(reduceMotion, index * 0.05)}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/70">
                No projects found for this category yet.
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div key={project.title} {...fadeUp(reduceMotion, index * 0.05)}>
                  <ProjectCard project={project} />
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

