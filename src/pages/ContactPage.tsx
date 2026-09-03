import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "../components/common/Container";
import { GradientBlob } from "../components/ui/GradientBlob";
import {
  contactContexts,
  inquiryTypes,
  normalizeContactDiscipline,
  normalizeContactSource,
} from "../data/contactContexts";
import { contactData } from "../data/portfolio";
import { cn } from "../lib/utils";
import { sendContactMessage } from "../services/contactService";
import type {
  ContactDiscipline,
  ContactFormData,
  ContactFormErrors,
  ContactSource,
  ContactSubmitStatus,
} from "../types/contact";

interface ContactPageProps {
  search: string;
}

const disciplineLabels: Record<ContactDiscipline, string> = {
  developer: "Software Development",
  designer: "Graphic Design",
  general: "General",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createInitialForm(
  source: ContactSource,
  discipline: ContactDiscipline,
): ContactFormData {
  return {
    source,
    discipline,
    inquiryType: inquiryTypes[discipline][0],
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "",
  };
}

function validateForm(values: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const trimmed = {
    name: values.name.trim(),
    email: values.email.trim(),
    inquiryType: values.inquiryType.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  };

  if (!trimmed.name) {
    errors.name = "Enter your name.";
  }

  if (!trimmed.email) {
    errors.email = "Enter your email address.";
  } else if (!emailPattern.test(trimmed.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!trimmed.inquiryType) {
    errors.inquiryType = "Choose an inquiry type.";
  } else if (!inquiryTypes[values.discipline].includes(trimmed.inquiryType)) {
    errors.inquiryType = "Choose a valid inquiry type.";
  }

  if (!trimmed.subject) {
    errors.subject = "Add a subject.";
  }

  if (!trimmed.message) {
    errors.message = "Write a message.";
  } else if (trimmed.message.length < 20) {
    errors.message = "Write at least 20 characters.";
  }

  return errors;
}

function preparePayload(values: ContactFormData): ContactFormData {
  return {
    source: values.source,
    discipline: values.discipline,
    inquiryType: values.inquiryType.trim(),
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone?.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
    website: values.website?.trim(),
  };
}

function ContactMethods({ source }: { source: ContactSource }) {
  const context = contactContexts[source];
  const directLinks = contactData.links.filter((link) =>
    context.directLinkLabels.includes(link.label),
  );

  return (
    <div className="mt-9 grid gap-3 sm:grid-cols-2">
      {directLinks.map((link) => {
        const Icon = link.icon ?? ArrowUpRight;

        return (
          <a
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            aria-label={`${link.label} Nipun Basnayaka`}
            className="group flex min-h-16 items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.055] px-5 py-4 text-platinum/78 transition hover:border-white/20 hover:bg-white/[0.075] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-black/30">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="truncate font-semibold">{link.label}</span>
            </span>
            <ArrowUpRight
              className="size-4 shrink-0 text-platinum/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-platinum"
              aria-hidden="true"
            />
          </a>
        );
      })}
    </div>
  );
}

export function ContactPage({ search }: ContactPageProps) {
  const reduceMotion = useReducedMotion();
  const source = useMemo(
    () => normalizeContactSource(new URLSearchParams(search).get("from")),
    [search],
  );
  const context = contactContexts[source];
  const initialDiscipline = useMemo(
    () =>
      normalizeContactDiscipline(
        new URLSearchParams(search).get("focus"),
        context.defaultDiscipline,
      ),
    [context.defaultDiscipline, search],
  );
  const [form, setForm] = useState<ContactFormData>(() =>
    createInitialForm(source, initialDiscipline),
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactSubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setForm(createInitialForm(source, initialDiscipline));
    setErrors({});
    setStatus("idle");
    setStatusMessage("");
  }, [source, initialDiscipline]);

  useEffect(() => {
    if (status === "success" || status === "error") {
      statusRef.current?.focus();
    }
  }, [status]);

  const currentInquiryTypes = inquiryTypes[form.discipline];

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const updateDiscipline = (discipline: ContactDiscipline) => {
    setForm((current) => ({
      ...current,
      discipline,
      inquiryType: inquiryTypes[discipline][0],
    }));
    setErrors((current) => ({ ...current, discipline: undefined, inquiryType: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") return;

    const payload = preparePayload(form);
    const nextErrors = validateForm(payload);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      await sendContactMessage(payload);
      setStatus("success");
      setStatusMessage("Message received. I will reply as soon as I can.");
      setForm(createInitialForm(source, form.discipline));
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "The message could not be sent right now. Please use a direct contact link.",
      );
    }
  };

  const fieldClass =
    "mt-2 h-12 w-full rounded-[0.85rem] border border-white/10 bg-black/30 px-4 text-base text-platinum outline-none transition placeholder:text-platinum/30 focus:border-arctic/55 focus:bg-black/40";
  const textareaClass =
    "mt-2 min-h-36 w-full resize-y rounded-[0.85rem] border border-white/10 bg-black/30 px-4 py-3 text-base leading-7 text-platinum outline-none transition placeholder:text-platinum/30 focus:border-arctic/55 focus:bg-black/40";

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,#0a090f_52%,#050505_100%)]" />
      <GradientBlob
        className="left-[-12rem] top-24 size-[32rem]"
        colors={context.glow}
      />
      <GradientBlob
        className="right-[-12rem] bottom-20 size-[30rem]"
        colors="from-arctic/14 via-wine/16 to-transparent"
        delay={0.7}
      />

      <Container className="relative z-10 py-16 sm:py-24">
        <motion.div
          className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <section aria-labelledby="contact-heading">
            <p
              className={cn(
                "font-mono text-xs uppercase tracking-[0.3em]",
                context.accentText,
              )}
            >
              {context.eyebrow}
            </p>
            <h1
              id="contact-heading"
              className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.02em] text-platinum sm:text-7xl lg:text-8xl"
            >
              <span className="block">{context.title[0]}</span>
              <span className="block">{context.title[1]}</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-platinum/66 sm:text-lg sm:leading-9">
              {context.intro}
            </p>
            <ContactMethods source={source} />
          </section>

          <section
            className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-7 lg:p-9"
            aria-labelledby="contact-form-heading"
          >
            <div
              className={cn(
                "absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
                context.panelLine,
              )}
            />
            <div className="relative z-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-platinum/45">
                    Message
                  </p>
                  <h2
                    id="contact-form-heading"
                    className="mt-2 font-display text-3xl font-black leading-none text-platinum"
                  >
                    Send a note
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-platinum/55">
                  {source}
                </span>
              </div>

              <form className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={updateField}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                />
                <input type="hidden" name="source" value={source} />

                <fieldset>
                  <legend className="text-sm font-semibold text-platinum">
                    Inquiry focus
                  </legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {(["developer", "designer", "general"] as ContactDiscipline[]).map(
                      (discipline) => (
                        <button
                          key={discipline}
                          type="button"
                          onClick={() => updateDiscipline(discipline)}
                          className={cn(
                            "min-h-12 rounded-full border px-4 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic",
                            form.discipline === discipline
                              ? "border-transparent bg-platinum text-obsidian"
                              : "border-white/10 bg-black/25 text-platinum/60 hover:border-white/20 hover:text-platinum",
                          )}
                        >
                          {disciplineLabels[discipline]}
                        </button>
                      ),
                    )}
                  </div>
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="text-sm font-semibold text-platinum">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      className={fieldClass}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                    />
                    {errors.name ? (
                      <p id="contact-name-error" className="mt-2 text-sm text-ember">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="text-sm font-semibold text-platinum">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={updateField}
                      className={fieldClass}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                    />
                    {errors.email ? (
                      <p id="contact-email-error" className="mt-2 text-sm text-ember">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-[1fr_0.85fr]">
                  <div>
                    <label
                      htmlFor="contact-inquiry-type"
                      className="text-sm font-semibold text-platinum"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="contact-inquiry-type"
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={updateField}
                      className={fieldClass}
                      aria-invalid={Boolean(errors.inquiryType)}
                      aria-describedby={
                        errors.inquiryType ? "contact-inquiry-type-error" : undefined
                      }
                    >
                      {currentInquiryTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.inquiryType ? (
                      <p id="contact-inquiry-type-error" className="mt-2 text-sm text-ember">
                        {errors.inquiryType}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="text-sm font-semibold text-platinum">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      className={fieldClass}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="text-sm font-semibold text-platinum">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={updateField}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  />
                  {errors.subject ? (
                    <p id="contact-subject-error" className="mt-2 text-sm text-ember">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-sm font-semibold text-platinum">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    className={textareaClass}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className="mt-2 text-sm text-ember">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role={status === "error" ? "alert" : "status"}
                  aria-live={status === "submitting" ? "polite" : "assertive"}
                  className={cn(
                    "min-h-12 rounded-[1rem] border px-4 py-3 text-sm leading-6 outline-none",
                    status === "success" &&
                      "border-arctic/30 bg-arctic/10 text-arctic",
                    status === "error" &&
                      "border-ember/30 bg-ember/10 text-ember",
                    (status === "idle" || status === "submitting") &&
                      "border-white/10 bg-black/20 text-platinum/55",
                  )}
                >
                  {status === "success" ? (
                    <span className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {statusMessage}
                    </span>
                  ) : status === "error" ? (
                    <span className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {statusMessage}
                    </span>
                  ) : status === "submitting" ? (
                    "Sending your message..."
                  ) : (
                    "Your source context and inquiry type will be included with the message."
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex h-14 min-h-14 items-center justify-center gap-2 rounded-full border border-transparent bg-platinum px-6 text-sm font-black uppercase tracking-[0.16em] text-obsidian transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
                >
                  {status === "submitting" ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  )}
                  {status === "submitting" ? "Sending" : context.submitLabel}
                </button>
              </form>
            </div>
          </section>
        </motion.div>
      </Container>
    </main>
  );
}
