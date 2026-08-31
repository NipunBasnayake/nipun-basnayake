import type { ContactDiscipline, ContactSource } from "../types/contact";

export const contactSources = ["home", "developer", "designer"] as const;
export const contactDisciplines = ["general", "developer", "designer"] as const;

export const inquiryTypes: Record<ContactDiscipline, string[]> = {
  general: ["General Inquiry", "Software Development", "Graphic Design"],
  developer: [
    "Full Stack Development",
    "Backend / API Development",
    "Frontend Development",
    "Software Project",
    "Contract / Freelance",
    "Employment Opportunity",
    "Technical Collaboration",
    "Other",
  ],
  designer: [
    "Logo Design",
    "Branding",
    "Poster / Flyer",
    "Social Media Design",
    "Wedding / Invitation Design",
    "Business / Print Design",
    "Event Design",
    "Other",
  ],
};

export const contactContexts: Record<
  ContactSource,
  {
    eyebrow: string;
    title: [string, string];
    intro: string;
    defaultDiscipline: ContactDiscipline;
    directLinkLabels: string[];
    accentText: string;
    glow: string;
    panelLine: string;
    submitLabel: string;
  }
> = {
  home: {
    eyebrow: "Software Engineering + Graphic Design",
    title: ["Let's Work", "Together."],
    intro:
      "Choose the kind of conversation you want to start, from product engineering to visual design or a general collaboration.",
    defaultDiscipline: "general",
    directLinkLabels: ["Email", "WhatsApp", "LinkedIn", "GitHub"],
    accentText: "text-arctic",
    glow: "from-arctic/24 via-wine/18 to-ember/16",
    panelLine: "via-platinum/60",
    submitLabel: "Send Message",
  },
  developer: {
    eyebrow: "Software Engineering Contact",
    title: ["Let's Build", "The System."],
    intro:
      "Start a conversation about full-stack development, backend APIs, product engineering, software projects, or technical collaboration.",
    defaultDiscipline: "developer",
    directLinkLabels: ["Email", "WhatsApp", "LinkedIn", "GitHub"],
    accentText: "text-arctic",
    glow: "from-arctic/30 via-arctic/12 to-wine/14",
    panelLine: "via-arctic/70",
    submitLabel: "Send Developer Inquiry",
  },
  designer: {
    eyebrow: "Graphic Design Contact",
    title: ["Let's Shape", "The Visuals."],
    intro:
      "Start a design conversation for branding, logos, print materials, social media, event visuals, invitations, or promotional work.",
    defaultDiscipline: "designer",
    directLinkLabels: ["Email", "WhatsApp", "LinkedIn"],
    accentText: "text-ember",
    glow: "from-wine/30 via-ember/18 to-arctic/12",
    panelLine: "via-ember/70",
    submitLabel: "Send Design Inquiry",
  },
};

export function normalizeContactSource(value: string | null): ContactSource {
  return contactSources.includes(value as ContactSource)
    ? (value as ContactSource)
    : "home";
}

export function normalizeContactDiscipline(
  value: string | null,
  fallback: ContactDiscipline,
): ContactDiscipline {
  return contactDisciplines.includes(value as ContactDiscipline)
    ? (value as ContactDiscipline)
    : fallback;
}
