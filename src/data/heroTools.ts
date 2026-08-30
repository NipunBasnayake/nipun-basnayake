export type HeroVariant = "developer" | "designer";

export interface HeroFloatingTool {
  id: string;
  label: string;
  shortLabel: string;
  image?: string;
  size: number;
  priority?: "primary" | "secondary";
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
}

export const developerHeroTools: HeroFloatingTool[] = [
  {
    id: "java",
    label: "Java",
    shortLabel: "Jv",
    size: 58,
    priority: "primary",
    position: { left: "17%", top: "28%" },
    motion: { x: 2, y: -5, rotate: -1.2, duration: 6.8, delay: 0 },
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    shortLabel: "Sp",
    size: 66,
    priority: "primary",
    position: { right: "18%", top: "27%" },
    motion: { x: -3, y: 4, rotate: 1.4, duration: 7.4, delay: 0.4 },
  },
  {
    id: "react",
    label: "React",
    shortLabel: "Re",
    size: 72,
    priority: "primary",
    position: { left: "13%", top: "47%" },
    motion: { x: -2, y: 5, rotate: 1.8, duration: 8.2, delay: 0.8 },
  },
  {
    id: "typescript",
    label: "TypeScript",
    shortLabel: "Ts",
    size: 52,
    priority: "primary",
    position: { right: "14%", top: "48%" },
    motion: { x: 3, y: -4, rotate: -1.5, duration: 6.2, delay: 0.2 },
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    shortLabel: "Pg",
    size: 48,
    priority: "secondary",
    position: { left: "22%", bottom: "24%" },
    motion: { x: 2, y: 4, rotate: -1, duration: 7.8, delay: 1 },
  },
  {
    id: "docker",
    label: "Docker",
    shortLabel: "Dk",
    size: 60,
    priority: "primary",
    position: { right: "24%", bottom: "22%" },
    motion: { x: -2, y: -5, rotate: 1.2, duration: 8.6, delay: 0.7 },
  },
  {
    id: "aws",
    label: "AWS",
    shortLabel: "Aw",
    size: 44,
    priority: "secondary",
    position: { left: "32%", top: "20%" },
    motion: { x: 2, y: -3, rotate: 1.1, duration: 5.6, delay: 1.3 },
  },
  {
    id: "kafka",
    label: "Kafka",
    shortLabel: "Kf",
    size: 54,
    priority: "secondary",
    position: { right: "32%", top: "68%" },
    motion: { x: -3, y: 3, rotate: -1.6, duration: 7, delay: 1.1 },
  },
];

export const designerHeroTools: HeroFloatingTool[] = [
  {
    id: "photoshop",
    label: "Adobe Photoshop",
    shortLabel: "Ps",
    size: 66,
    priority: "primary",
    position: { left: "17%", top: "29%" },
    motion: { x: 2, y: -5, rotate: -1.4, duration: 7.1, delay: 0 },
  },
  {
    id: "illustrator",
    label: "Adobe Illustrator",
    shortLabel: "Ai",
    size: 72,
    priority: "primary",
    position: { right: "18%", top: "29%" },
    motion: { x: -3, y: 4, rotate: 1.7, duration: 8.4, delay: 0.45 },
  },
  {
    id: "figma",
    label: "Figma",
    shortLabel: "Fg",
    size: 58,
    priority: "primary",
    position: { left: "13%", top: "49%" },
    motion: { x: -2, y: 5, rotate: 1.5, duration: 6.5, delay: 0.7 },
  },
  {
    id: "indesign",
    label: "Adobe InDesign",
    shortLabel: "Id",
    size: 54,
    priority: "secondary",
    position: { right: "14%", top: "50%" },
    motion: { x: 3, y: -4, rotate: -1.2, duration: 7.6, delay: 0.2 },
  },
  {
    id: "lightroom",
    label: "Adobe Lightroom",
    shortLabel: "Lr",
    size: 48,
    priority: "secondary",
    position: { left: "24%", bottom: "24%" },
    motion: { x: 2, y: 4, rotate: -1.1, duration: 8.1, delay: 1 },
  },
  {
    id: "print-layout",
    label: "Print Layout",
    shortLabel: "Pr",
    size: 60,
    priority: "primary",
    position: { right: "24%", bottom: "23%" },
    motion: { x: -2, y: -5, rotate: 1.4, duration: 8.8, delay: 0.8 },
  },
];
