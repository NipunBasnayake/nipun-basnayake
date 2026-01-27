import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/ProjectDetail";
import { projectsData } from "@/data/portfolio";
import { getProjectSlug } from "@/lib/slugify";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: getProjectSlug(project.title),
  }));
}

type ProjectDetailPageProps = {
  params: { slug: string };
};

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projectsData.find(
    (item) => getProjectSlug(item.title) === params.slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
