export interface DesignCategory {
  id: string;
  label: string;
  description?: string;
  featured?: boolean;
}

export const designCategories = [
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
] satisfies DesignCategory[];

export type DesignCategoryId = (typeof designCategories)[number]["id"];
