"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { projectsData } from "@/data/portfolio";
import { getProjectSlug } from "@/lib/slugify";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export type Project = (typeof projectsData)[number];

type ProjectCardProps = {
  project: Project;
  variant?: "featured" | "default";
};

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  const slug = getProjectSlug(project.title);
  const showViewButton = project.viewButton || variant === "featured";
  const imageRatio = variant === "featured" ? "aspect-[16/10]" : "aspect-[4/3]";
  const cardStyles =
    variant === "featured"
      ? "border-cyan-300/30 bg-gradient-to-br from-white/[0.05] via-black/60 to-fuchsia-500/10"
      : undefined;

  return (
    <GlowCard className={cn("flex h-full flex-col gap-4", cardStyles)}>
      <div className={cn("relative w-full overflow-hidden rounded-2xl border border-white/10", imageRatio)}>
        <Link href={`/projects/${slug}`} className="block h-full w-full">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 90vw, 30vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/projects/${slug}`} className="text-lg font-semibold text-white">
            {project.title}
          </Link>
          {project.featured ? (
            <Badge className="border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200">
              Featured
            </Badge>
          ) : null}
        </div>
        <p className="text-sm text-white/70">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-3">
        {showViewButton ? (
          <Button href={`/projects/${slug}`} variant="ghost" size="sm">
            View Details
          </Button>
        ) : null}
        {project.demoLink ? (
          <Button href={project.demoLink} variant="outline" size="sm">
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </Button>
        ) : null}
        {project.codeLink ? (
          <Button href={project.codeLink} variant="outline" size="sm">
            <Github className="h-4 w-4" />
            Source Code
          </Button>
        ) : null}
      </div>
    </GlowCard>
  );
}

