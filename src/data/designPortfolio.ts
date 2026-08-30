import type { SectionCopy } from "./portfolio";

export interface DesignCategory {
  id: string;
  label: string;
  description?: string;
  featured?: boolean;
}

export interface DesignItem {
  id: string;
  title: string;
  categoryId: string;
  image: string;
  thumbnail: string;
  width: number;
  height: number;
  alt: string;
  year?: string;
  description?: string;
  featured?: boolean;
}

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

export const designCategories: DesignCategory[] = [
  { id: "logo-design", label: "Logo Design", featured: true },
  { id: "branding", label: "Branding", featured: true },
  { id: "posters", label: "Posters", featured: true },
  { id: "flyers", label: "Flyers", featured: true },
  { id: "social-media", label: "Social Media", featured: true },
  { id: "wedding-cards", label: "Wedding Cards" },
  { id: "invitations", label: "Invitations" },
  { id: "business-cards", label: "Business Cards" },
  { id: "certificates", label: "Certificates" },
  { id: "brochures", label: "Brochures" },
  { id: "banners", label: "Banners" },
  { id: "event-designs", label: "Event Designs" },
  { id: "print-designs", label: "Print Designs" },
  { id: "other", label: "Other" },
];

export const designItems: DesignItem[] = [];
