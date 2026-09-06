export type HeroVariant = "developer" | "designer";
export type HeroToolDepth = "far" | "middle" | "near";

export interface HeroFloatingTool {
  id: string;
  label: string;
  shortLabel: string;
  image?: string;
  surfaceTone?: "normal" | "soften-bright";
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

const developerToolImageBase = "/hero-tools/developer";
const designerToolImageBase = "/hero-tools/designer";

export const developerHeroTools: HeroFloatingTool[] = [
  {
    id: "spring-boot",
    label: "Spring Boot",
    shortLabel: "SB",
    image: `${developerToolImageBase}/springboot.png`,
    surfaceTone: "soften-bright",
    depth: "near",
    size: 130,
    mobilePriority: 1,
    position: { right: "7%", top: "27%" },
    motion: { x: -6, y: 7, rotate: 1.2, duration: 8.4, delay: 0.2 },
    parallax: { x: 18, y: 12 },
  },
  {
    id: "react",
    label: "React",
    shortLabel: "React",
    image: `${developerToolImageBase}/react.png`,
    surfaceTone: "soften-bright",
    depth: "near",
    size: 134,
    mobilePriority: 2,
    position: { left: "6%", bottom: "24%" },
    motion: { x: -7, y: 8, rotate: -1.5, duration: 9.0, delay: 0.5 },
    parallax: { x: 18, y: 12 },
  },
  {
    id: "typescript",
    label: "TypeScript",
    shortLabel: "TS",
    image: `${developerToolImageBase}/typescript.png`,
    surfaceTone: "soften-bright",
    depth: "middle",
    size: 104,
    mobilePriority: 3,
    position: { right: "13%", top: "53%" },
    motion: { x: 5, y: -6, rotate: -1.4, duration: 8.6, delay: 0.3 },
    parallax: { x: 10, y: 7 },
  },
  {
    id: "java",
    label: "Java",
    shortLabel: "Java",
    image: `${developerToolImageBase}/java.png`,
    surfaceTone: "soften-bright",
    depth: "middle",
    size: 98,
    mobilePriority: 4,
    position: { left: "12%", top: "33%" },
    motion: { x: 5, y: -6, rotate: 1.2, duration: 9.2, delay: 0.1 },
    parallax: { x: 10, y: 7 },
  },
  {
    id: "docker",
    label: "Docker",
    shortLabel: "Docker",
    image: `${developerToolImageBase}/docker.png`,
    surfaceTone: "soften-bright",
    depth: "middle",
    size: 104,
    mobilePriority: 5,
    position: { right: "21%", bottom: "16%" },
    motion: { x: -5, y: -7, rotate: 1.5, duration: 10.0, delay: 0.6 },
    parallax: { x: 9, y: 6 },
  },
  {
    id: "aws",
    label: "AWS",
    shortLabel: "AWS",
    image: `${developerToolImageBase}/aws.png`,
    surfaceTone: "soften-bright",
    depth: "far",
    size: 82,
    mobilePriority: 6,
    position: { left: "3.5%", top: "14%" },
    motion: { x: 3, y: -4, rotate: -1.0, duration: 13.0, delay: 0.4 },
    parallax: { x: -4, y: -3 },
  },
  {
    id: "kafka",
    label: "Apache Kafka",
    shortLabel: "Kafka",
    image: `${developerToolImageBase}/kafka.png`,
    surfaceTone: "soften-bright",
    depth: "far",
    size: 82,
    mobilePriority: 7,
    position: { right: "3.5%", top: "15%" },
    motion: { x: -4, y: 5, rotate: 1.1, duration: 13.8, delay: 0.8 },
    parallax: { x: -4, y: -3 },
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    shortLabel: "PG",
    image: `${developerToolImageBase}/postgres.png`,
    surfaceTone: "soften-bright",
    depth: "far",
    size: 78,
    mobilePriority: 8,
    position: { left: "19%", bottom: "12%" },
    motion: { x: 4, y: 5, rotate: -1.0, duration: 14.0, delay: 1.0 },
    parallax: { x: -4, y: -3 },
  },
];

export const designerHeroTools: HeroFloatingTool[] = [
  {
    id: "photoshop",
    label: "Adobe Photoshop",
    shortLabel: "Ps",
    image: `${designerToolImageBase}/photoshop.png`,
    depth: "near",
    size: 128,
    mobilePriority: 1,
    position: { left: "6%", top: "48%" },
    motion: { x: -7, y: 7, rotate: -1.4, duration: 8.8, delay: 0.1 },
    parallax: { x: 18, y: 12 },
  },
  {
    id: "illustrator",
    label: "Adobe Illustrator",
    shortLabel: "Ai",
    image: `${designerToolImageBase}/illustrator.png`,
    depth: "near",
    size: 130,
    mobilePriority: 2,
    position: { right: "7%", top: "28%" },
    motion: { x: -6, y: 7, rotate: 1.5, duration: 9.2, delay: 0.35 },
    parallax: { x: 18, y: 12 },
  },
  {
    id: "indesign",
    label: "Adobe InDesign",
    shortLabel: "Id",
    image: `${designerToolImageBase}/indesign.png`,
    depth: "near",
    size: 114,
    mobilePriority: 3,
    position: { right: "16%", bottom: "18%" },
    motion: { x: 6, y: -7, rotate: -1.2, duration: 8.4, delay: 0.75 },
    parallax: { x: 16, y: 10 },
  },
  {
    id: "premiere-pro",
    label: "Adobe Premiere Pro",
    shortLabel: "Pr",
    image: `${designerToolImageBase}/premierpro.png`,
    depth: "middle",
    size: 100,
    mobilePriority: 4,
    position: { left: "13%", top: "28%" },
    motion: { x: 5, y: -6, rotate: 1.3, duration: 9.5, delay: 0.2 },
    parallax: { x: 10, y: 7 },
  },
  {
    id: "after-effects",
    label: "Adobe After Effects",
    shortLabel: "Ae",
    image: `${designerToolImageBase}/aftereffect.png`,
    depth: "middle",
    size: 96,
    mobilePriority: 5,
    position: { right: "10%", top: "56%" },
    motion: { x: 6, y: 5, rotate: -1.5, duration: 10.2, delay: 0.5 },
    parallax: { x: 10, y: 7 },
  },
  {
    id: "coreldraw",
    label: "CorelDRAW",
    shortLabel: "Corel",
    image: `${designerToolImageBase}/coreldraw.png`,
    depth: "middle",
    size: 92,
    mobilePriority: 6,
    position: { left: "23%", top: "18%" },
    motion: { x: -5, y: -5, rotate: 1.1, duration: 9.8, delay: 0.9 },
    parallax: { x: 9, y: 6 },
  },
  {
    id: "3ds-max",
    label: "Autodesk 3ds Max",
    shortLabel: "3ds",
    image: `${designerToolImageBase}/3dmax.png`,
    depth: "far",
    size: 80,
    mobilePriority: 7,
    position: { left: "3.5%", top: "15%" },
    motion: { x: 3, y: -4, rotate: -1.0, duration: 13.2, delay: 0.6 },
    parallax: { x: -4, y: -3 },
  },
  {
    id: "maya",
    label: "Autodesk Maya",
    shortLabel: "Maya",
    image: `${designerToolImageBase}/maya.png`,
    depth: "far",
    size: 78,
    mobilePriority: 8,
    position: { left: "16%", bottom: "11%" },
    motion: { x: -4, y: 5, rotate: 1.0, duration: 14.0, delay: 1.2 },
    parallax: { x: -4, y: -3 },
  },
  {
    id: "lumion",
    label: "Lumion",
    shortLabel: "Lumion",
    image: `${designerToolImageBase}/lumion.png`,
    depth: "far",
    size: 82,
    mobilePriority: 9,
    position: { right: "4%", bottom: "11%" },
    motion: { x: 4, y: 6, rotate: -1.3, duration: 14.8, delay: 1.4 },
    parallax: { x: -4, y: -3 },
  },
];
