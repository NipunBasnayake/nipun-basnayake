import type { ProjectCaseStudy } from "../../data/portfolio";

interface ProjectCardProps {
  project: ProjectCaseStudy;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group relative h-full min-h-[34rem] overflow-hidden rounded-[2.4rem_0.9rem_2.4rem_0.9rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="absolute -right-20 -top-24 size-72 rounded-full bg-gradient-to-br from-arctic/55 via-wine/30 to-ember/35 blur-3xl transition duration-700 group-hover:scale-125" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-platinum/40 to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-arctic/70">{project.type}</p>
          <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-platinum/42">
            0{index + 1}
          </span>
        </div>

        <h3 className="mt-10 max-w-2xl font-display text-4xl font-black leading-[0.9] text-platinum sm:text-6xl">
          {project.title}
        </h3>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-platinum/34">Problem</p>
            <p className="mt-3 text-sm leading-7 text-platinum/66 sm:text-base sm:leading-8">
              {project.problem}
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-platinum/34">Solution</p>
            <p className="mt-3 text-sm leading-7 text-platinum/66 sm:text-base sm:leading-8">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2.5 pt-10">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-obsidian/45 px-3 py-1.5 text-xs font-semibold text-platinum/62"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
