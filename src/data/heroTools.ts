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
    id: "aws",
    label: "AWS",
    shortLabel: "AWS",
    image: `${developerToolImageBase}/aws.png`,
    surfaceTone: "soften-bright",
    depth: "far",
    size: 84,
    mobilePriority: 7,
    position: { left: "3%", top: "15%" },
    motion: { x: 3, y: -5, rotate: -1.2, duration: 12.8, delay: 0.4 },
  },
  {
    id: "java",
    label: "Java",
    shortLabel: "Java",
    image: `${developerToolImageBase}/java.png`,
    surfaceTone: "soften-bright",
    depth: "middle",
    size: 96,
    mobilePriority: 5,
    position: { left: "12%", top: "34%" },
    motion: { x: 5, y: -7, rotate: 1.4, duration: 9.4, delay: 0 },
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    shortLabel: "SB",
    image: `${developerToolImageBase}/springboot.png`,
    surfaceTone: "soften-bright",
    depth: "near",
    size: 130,
    mobilePriority: 1,
    position: { right: "6%", top: "29%" },
    motion: { x: -7, y: 8, rotate: 1.2, duration: 8.6, delay: 0.35 },
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
    position: { right: "12%", top: "52%" },
    motion: { x: 6, y: -5, rotate: -1.5, duration: 8.2, delay: 0.15 },
  },
  {
    id: "react",
    label: "React",
    shortLabel: "React",
    image: `${developerToolImageBase}/react.png`,
    surfaceTone: "soften-bright",
    depth: "near",
    size: 136,
    mobilePriority: 2,
    position: { left: "7%", bottom: "22%" },
    motion: { x: -8, y: 9, rotate: -1.8, duration: 9.1, delay: 0.7 },
  },
  {
    id: "docker",
    label: "Docker",
    shortLabel: "Docker",
    image: `${developerToolImageBase}/docker.png`,
    surfaceTone: "soften-bright",
    depth: "middle",
    size: 108,
    mobilePriority: 4,
    position: { right: "20%", bottom: "18%" },
    motion: { x: -6, y: -8, rotate: 1.6, duration: 10.2, delay: 0.55 },
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
    position: { left: "21%", bottom: "11%" },
    motion: { x: 4, y: 5, rotate: -1, duration: 13.5, delay: 1.1 },
  },
  {
    id: "kafka",
    label: "Apache Kafka",
    shortLabel: "Kafka",
    image: `${developerToolImageBase}/kafka.png`,
    surfaceTone: "soften-bright",
    depth: "far",
    size: 84,
    mobilePriority: 6,
    position: { right: "3%", top: "16%" },
    motion: { x: -4, y: 6, rotate: 1.3, duration: 14.4, delay: 0.9 },
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
    position: { left: "7%", top: "50%" },
    motion: { x: -8, y: 8, rotate: -1.5, duration: 8.8, delay: 0 },
  },
  {
    id: "illustrator",
    label: "Adobe Illustrator",
    shortLabel: "Ai",
    image: `${designerToolImageBase}/illustrator.png`,
    depth: "near",
    size: 132,
    mobilePriority: 2,
    position: { right: "6%", top: "31%" },
    motion: { x: -7, y: 7, rotate: 1.7, duration: 9.4, delay: 0.35 },
  },
  {
    id: "indesign",
    label: "Adobe InDesign",
    shortLabel: "Id",
    image: `${designerToolImageBase}/indesign.png`,
    depth: "near",
    size: 112,
    mobilePriority: 3,
    position: { right: "17%", bottom: "18%" },
    motion: { x: 6, y: -8, rotate: -1.1, duration: 8.2, delay: 0.8 },
  },
  {
    id: "premiere-pro",
    label: "Adobe Premiere Pro",
    shortLabel: "Pr",
    image: `${designerToolImageBase}/premierpro.png`,
    depth: "middle",
    size: 100,
    mobilePriority: 4,
    position: { left: "13%", top: "29%" },
    motion: { x: 5, y: -7, rotate: 1.4, duration: 9.6, delay: 0.2 },
  },
  {
    id: "after-effects",
    label: "Adobe After Effects",
    shortLabel: "Ae",
    image: `${designerToolImageBase}/aftereffect.png`,
    depth: "middle",
    size: 96,
    mobilePriority: 5,
    position: { right: "9%", top: "57%" },
    motion: { x: 6, y: 5, rotate: -1.6, duration: 10.4, delay: 0.5 },
  },
  {
    id: "coreldraw",
    label: "CorelDRAW",
    shortLabel: "Corel",
    image: `${designerToolImageBase}/coreldraw.png`,
    depth: "middle",
    size: 92,
    mobilePriority: 6,
    position: { left: "24%", top: "19%" },
    motion: { x: -5, y: -6, rotate: 1.2, duration: 9.9, delay: 1 },
  },
  {
    id: "3ds-max",
    label: "Autodesk 3ds Max",
    shortLabel: "3ds",
    image: `${designerToolImageBase}/3dmax.png`,
    depth: "far",
    size: 80,
    mobilePriority: 7,
    position: { left: "3%", top: "17%" },
    motion: { x: 3, y: -5, rotate: -1.1, duration: 13.6, delay: 0.65 },
  },
  {
    id: "maya",
    label: "Autodesk Maya",
    shortLabel: "Maya",
    image: `${designerToolImageBase}/maya.png`,
    depth: "far",
    size: 78,
    mobilePriority: 8,
    position: { left: "16%", bottom: "10%" },
    motion: { x: -4, y: 5, rotate: 1.1, duration: 14.2, delay: 1.25 },
  },
  {
    id: "lumion",
    label: "Lumion",
    shortLabel: "Lumion",
    image: `${designerToolImageBase}/lumion.png`,
    depth: "far",
    size: 84,
    mobilePriority: 9,
    position: { right: "3.5%", bottom: "11%" },
    motion: { x: 4, y: 6, rotate: -1.4, duration: 15, delay: 1.5 },
  },
];
