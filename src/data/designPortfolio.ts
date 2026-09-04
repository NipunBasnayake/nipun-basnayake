import type { SectionCopy } from "./portfolio";
import { designCategories } from "./designCategories";
import { designItems } from "./designGallery";

export type { DesignCategory } from "./designCategories";
export type { DesignItem } from "./designGallery";

export const designerHero = {
  eyebrow: "Freelance Graphic Designer since 2019",
  title: "Visual systems for brands, events, print, and digital campaigns.",
  intro:
    "A design portfolio space for logo work, branding, posters, flyers, cards, banners, social media visuals, and print-ready creative work.",
};

export const designerIntro: SectionCopy = {
  eyebrow: "Designer Profile",
  title: "Design craft with the same discipline I bring to software.",
  intro:
    "The designer side of this portfolio focuses on clear visual communication, layout systems, typography, brand consistency, and practical client-ready output.",
};

export const designerExperience = {
  period: "2019 - Present",
  role: "Freelance Graphic Designer",
  summary:
    "Freelance graphic design work across brand identity, event visuals, print designs, social media posts, invitations, cards, certificates, banners, and related creative materials.",
  focus: [
    "Logo and brand materials",
    "Posters, flyers, and event artwork",
    "Social media and digital campaign visuals",
    "Print-ready cards, certificates, brochures, and banners",
  ],
};

export { designCategories, designItems };
