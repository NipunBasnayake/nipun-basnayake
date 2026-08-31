export type HeroVariant = "developer" | "designer";
export type HeroToolDepth = "far" | "middle" | "near";

export interface HeroFloatingTool {
  id: string;
  label: string;
  shortLabel: string;
  image?: string;
  depth: HeroToolDepth;
  size: number;
  mobilePriority: number;
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  motion: {
    x: number;
    y: number;
    rotate: number;
    duration: number;
    delay: number;
  };
  parallax?: {
    x: number;
    y: number;
  };
}

const toolImageBase = "/assets/images/tools";

export const developerHeroTools: HeroFloatingTool[] = [
  {
    id: "aws",
    label: "AWS",
    shortLabel: "AWS",
    image: `${toolImageBase}/developer/aws.svg`,
    depth: "far",
    size: 78,
    mobilePriority: 7,
    position: { left: "8%", top: "15%" },
    motion: { x: 3, y: -5, rotate: -1.2, duration: 12.8, delay: 0.4 },
  },
  {
    id: "java",
    label: "Java",
    shortLabel: "Java",
    image: `${toolImageBase}/developer/java.svg`,
    depth: "middle",
    size: 88,
    mobilePriority: 5,
    position: { left: "18%", top: "31%" },
    motion: { x: 5, y: -7, rotate: 1.4, duration: 9.4, delay: 0 },
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    shortLabel: "SB",
    image: `${toolImageBase}/developer/spring-boot.svg`,
    depth: "near",
    size: 124,
    mobilePriority: 1,
    position: { right: "15%", top: "24%" },
    motion: { x: -7, y: 8, rotate: 1.2, duration: 8.6, delay: 0.35 },
  },
  {
    id: "typescript",
    label: "TypeScript",
    shortLabel: "TS",
    image: `${toolImageBase}/developer/typescript.svg`,
    depth: "middle",
    size: 94,
    mobilePriority: 3,
    position: { right: "12%", top: "49%" },
    motion: { x: 6, y: -5, rotate: -1.5, duration: 8.2, delay: 0.15 },
  },
  {
    id: "react",
    label: "React",
    shortLabel: "React",
    image: `${toolImageBase}/developer/react.svg`,
    depth: "near",
    size: 132,
    mobilePriority: 2,
    position: { left: "19%", bottom: "19%" },
    motion: { x: -8, y: 9, rotate: -1.8, duration: 9.1, delay: 0.7 },
  },
  {
    id: "docker",
    label: "Docker",
    shortLabel: "Docker",
    image: `${toolImageBase}/developer/docker.svg`,
    depth: "middle",
    size: 100,
    mobilePriority: 4,
    position: { right: "22%", bottom: "21%" },
    motion: { x: -6, y: -8, rotate: 1.6, duration: 10.2, delay: 0.55 },
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    shortLabel: "PG",
    image: `${toolImageBase}/developer/postgresql.svg`,
    depth: "far",
    size: 72,
    mobilePriority: 8,
    position: { left: "9%", bottom: "33%" },
    motion: { x: 4, y: 5, rotate: -1, duration: 13.5, delay: 1.1 },
  },
  {
    id: "kafka",
    label: "Apache Kafka",
    shortLabel: "Kafka",
    image: `${toolImageBase}/developer/kafka.svg`,
    depth: "far",
    size: 82,
    mobilePriority: 6,
    position: { right: "8%", bottom: "14%" },
    motion: { x: -4, y: 6, rotate: 1.3, duration: 14.4, delay: 0.9 },
  },
];

export const designerHeroTools: HeroFloatingTool[] = [
  {
    id: "photoshop",
    label: "Adobe Photoshop",
    shortLabel: "Ps",
    image: `${toolImageBase}/designer/photoshop.svg`,
    depth: "near",
    size: 124,
    mobilePriority: 1,
    position: { left: "17%", bottom: "22%" },
    motion: { x: -8, y: 8, rotate: -1.5, duration: 8.8, delay: 0 },
  },
  {
    id: "illustrator",
    label: "Adobe Illustrator",
    shortLabel: "Ai",
    image: `${toolImageBase}/designer/illustrator.svg`,
    depth: "near",
    size: 130,
    mobilePriority: 2,
    position: { right: "16%", top: "24%" },
    motion: { x: -7, y: 7, rotate: 1.7, duration: 9.4, delay: 0.35 },
  },
  {
    id: "indesign",
    label: "Adobe InDesign",
    shortLabel: "Id",
    image: `${toolImageBase}/designer/indesign.svg`,
    depth: "near",
    size: 108,
    mobilePriority: 3,
    position: { right: "22%", bottom: "18%" },
    motion: { x: 6, y: -8, rotate: -1.1, duration: 8.2, delay: 0.8 },
  },
  {
    id: "premiere-pro",
    label: "Adobe Premiere Pro",
    shortLabel: "Pr",
    image: `${toolImageBase}/designer/premiere-pro.svg`,
    depth: "middle",
    size: 92,
    mobilePriority: 4,
    position: { left: "15%", top: "32%" },
    motion: { x: 5, y: -7, rotate: 1.4, duration: 9.6, delay: 0.2 },
  },
  {
    id: "after-effects",
    label: "Adobe After Effects",
    shortLabel: "Ae",
    image: `${toolImageBase}/designer/after-effects.svg`,
    depth: "middle",
    size: 88,
    mobilePriority: 5,
    position: { right: "11%", top: "50%" },
    motion: { x: 6, y: 5, rotate: -1.6, duration: 10.4, delay: 0.5 },
  },
  {
    id: "coreldraw",
    label: "CorelDRAW",
    shortLabel: "Corel",
    image: `${toolImageBase}/designer/coreldraw.svg`,
    depth: "middle",
    size: 84,
    mobilePriority: 6,
    position: { left: "31%", top: "20%" },
    motion: { x: -5, y: -6, rotate: 1.2, duration: 9.9, delay: 1 },
  },
  {
    id: "3ds-max",
    label: "Autodesk 3ds Max",
    shortLabel: "3ds",
    image: `${toolImageBase}/designer/3ds-max.svg`,
    depth: "far",
    size: 76,
    mobilePriority: 7,
    position: { left: "7%", top: "17%" },
    motion: { x: 3, y: -5, rotate: -1.1, duration: 13.6, delay: 0.65 },
  },
  {
    id: "maya",
    label: "Autodesk Maya",
    shortLabel: "Maya",
    image: `${toolImageBase}/designer/maya.svg`,
    depth: "far",
    size: 74,
    mobilePriority: 8,
    position: { right: "8%", bottom: "32%" },
    motion: { x: -4, y: 5, rotate: 1.1, duration: 14.2, delay: 1.25 },
  },
  {
    id: "lumion",
    label: "Lumion",
    shortLabel: "Lumion",
    image: `${toolImageBase}/designer/lumion.svg`,
    depth: "far",
    size: 80,
    mobilePriority: 9,
    position: { left: "10%", bottom: "14%" },
    motion: { x: 4, y: 6, rotate: -1.4, duration: 15, delay: 1.5 },
  },
];
