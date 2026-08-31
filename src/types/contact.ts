export type ContactSource = "home" | "developer" | "designer";
export type ContactDiscipline = "general" | "developer" | "designer";
export type ContactSubmitStatus = "idle" | "submitting" | "success" | "error";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  discipline: ContactDiscipline;
  inquiryType: string;
  subject: string;
  message: string;
  source: ContactSource;
  website?: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;
