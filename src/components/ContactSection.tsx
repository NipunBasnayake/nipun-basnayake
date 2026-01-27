"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { personalData, sectionsData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const fadeUp = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const socialLinks = [
  { label: "GitHub", href: personalData.socialLinks.github, icon: Github },
  { label: "LinkedIn", href: personalData.socialLinks.linkedin, icon: Linkedin },
  { label: "Facebook", href: personalData.socialLinks.facebook, icon: Facebook },
  { label: "Instagram", href: personalData.socialLinks.instagram, icon: Instagram },
  { label: "WhatsApp", href: personalData.socialLinks.whatsapp, icon: MessageCircle },
];

type ContactSectionProps = {
  showHeading?: boolean;
};

export function ContactSection({ showHeading = true }: ContactSectionProps) {
  const reduceMotion = useReducedMotionSafe();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showToast, setShowToast] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowToast(true);
    setFormState({ name: "", email: "", message: "" });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        {showHeading ? (
          <SectionHeading
            title={sectionsData.contact.title}
            subtitle={sectionsData.contact.subtitle}
            eyebrow="Contact"
          />
        ) : null}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <motion.div {...fadeUp(reduceMotion)}>
            <GlowCard className="h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {sectionsData.contact.heading}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    {sectionsData.contact.description}
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/70">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-cyan-300" />
                    <a href={`mailto:${personalData.email}`} className="hover:text-white">
                      {personalData.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-cyan-300" />
                    <a href={`tel:${personalData.phone}`} className="hover:text-white">
                      {personalData.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    <span>{personalData.location}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:border-cyan-300/60 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
          <motion.div {...fadeUp(reduceMotion, 0.1)}>
            <GlowCard>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-xs uppercase tracking-[0.2em] text-white/50"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    name="name"
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, name: event.target.value }))
                    }
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-xs uppercase tracking-[0.2em] text-white/50"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    name="email"
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, email: event.target.value }))
                    }
                    autoComplete="email"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-xs uppercase tracking-[0.2em] text-white/50"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, message: event.target.value }))
                    }
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button type="submit" variant="primary">
                  Send Message
                </Button>
              </form>
            </GlowCard>
          </motion.div>
        </div>
        <div className="relative mt-6" aria-live="polite">
          {showToast ? (
            <motion.div
              {...fadeUp(reduceMotion)}
              role="status"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs text-cyan-100"
            >
              Thanks! Your message has been queued for review.
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

