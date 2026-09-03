import type { ContactFormData } from "../types/contact";

export async function sendContactMessage(payload: ContactFormData) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as
    | { message?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      data?.message ??
        "The message could not be sent right now. Please try a direct contact link instead.",
    );
  }

  return data;
}
