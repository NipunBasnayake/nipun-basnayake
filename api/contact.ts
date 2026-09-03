import {
  contactDisciplines,
  contactSources,
  inquiryTypes,
} from "../src/data/contactContexts";
import type { ContactDiscipline, ContactFormData, ContactSource } from "../src/types/contact";

interface ContactApiRequest {
  method?: string;
  body?: unknown;
}

interface ContactApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ContactApiResponse;
  json(body: unknown): void;
}

interface ResendResponse {
  id?: string;
  message?: string;
  error?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeSource(value: unknown): ContactSource {
  return contactSources.includes(value as ContactSource)
    ? (value as ContactSource)
    : "home";
}

function normalizeDiscipline(value: unknown): ContactDiscipline {
  return contactDisciplines.includes(value as ContactDiscipline)
    ? (value as ContactDiscipline)
    : "general";
}

function validatePayload(body: unknown) {
  if (!isObject(body)) {
    return { ok: false as const, message: "Invalid request body." };
  }

  const source = normalizeSource(body.source);
  const discipline = normalizeDiscipline(body.discipline);
  const payload: ContactFormData = {
    source,
    discipline,
    name: clean(body.name, 100),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 40),
    inquiryType: clean(body.inquiryType, 80),
    subject: clean(body.subject, 180),
    message: clean(body.message, 5000),
    website: clean(body.website, 120),
  };

  if (payload.website) {
    return { ok: false as const, message: "Message rejected." };
  }

  if (!payload.name) {
    return { ok: false as const, message: "Name is required." };
  }

  if (!emailPattern.test(payload.email)) {
    return { ok: false as const, message: "A valid email address is required." };
  }

  if (!inquiryTypes[payload.discipline].includes(payload.inquiryType)) {
    return { ok: false as const, message: "Choose a valid inquiry type." };
  }

  if (!payload.subject) {
    return { ok: false as const, message: "Subject is required." };
  }

  if (payload.message.length < 20) {
    return {
      ok: false as const,
      message: "Message must be at least 20 characters.",
    };
  }

  return { ok: true as const, payload };
}

function sourceLabel(source: ContactSource) {
  if (source === "developer") return "Developer";
  if (source === "designer") return "Designer";
  return "General";
}

function buildEmailText(payload: ContactFormData) {
  return [
    "Portfolio Contact Message",
    "",
    `Source: ${sourceLabel(payload.source)}`,
    `Inquiry Type: ${payload.inquiryType}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone / WhatsApp: ${payload.phone}` : "",
    "",
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export default async function handler(
  request: ContactApiRequest,
  response: ContactApiResponse,
) {
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).json({});
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ message: "Method not allowed." });
    return;
  }

  const validation = validatePayload(request.body);

  if (!validation.ok) {
    response.status(400).json({ message: validation.message });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    response.status(503).json({
      message:
        "Email delivery is not configured yet. Please use a direct contact link.",
    });
    return;
  }

  const payload = validation.payload;
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: `[Portfolio ${sourceLabel(payload.source)}] ${payload.subject}`,
      text: buildEmailText(payload),
    }),
  });

  const resendData = (await resendResponse.json().catch(() => null)) as
    | ResendResponse
    | null;

  if (!resendResponse.ok) {
    response.status(502).json({
      message:
        resendData?.message ??
        resendData?.error ??
        "Email delivery failed. Please use a direct contact link.",
    });
    return;
  }

  response.status(200).json({ message: "Message sent.", id: resendData?.id });
}
