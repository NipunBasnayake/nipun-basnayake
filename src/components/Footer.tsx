import Link from "next/link";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { personalData, sectionsData } from "@/data/portfolio";

const socialLinks = [
  { label: "GitHub", href: personalData.socialLinks.github, icon: Github },
  { label: "LinkedIn", href: personalData.socialLinks.linkedin, icon: Linkedin },
  { label: "Facebook", href: personalData.socialLinks.facebook, icon: Facebook },
  { label: "Instagram", href: personalData.socialLinks.instagram, icon: Instagram },
  { label: "WhatsApp", href: personalData.socialLinks.whatsapp, icon: MessageCircle },
];

const quickLinks = [
  { label: sectionsData.projects.title, href: "/projects" },
  { label: sectionsData.certifications.title, href: "/certifications" },
  { label: sectionsData.about.ctaButtons[0].text, href: "/resume" },
  { label: sectionsData.contact.title, href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/80">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {personalData.fullName}
          </h3>
          <p className="text-sm text-white/60">{personalData.bio}</p>
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
        <div className="space-y-3 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Quick Links
          </p>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Contact
          </p>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-cyan-300" />
            <a href={`mailto:${personalData.email}`} className="hover:text-white">
              {personalData.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-cyan-300" />
            <a href={`tel:${personalData.phone}`} className="hover:text-white">
              {personalData.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-300" />
            <span>{personalData.location}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {personalData.fullName}. All rights reserved.
      </div>
    </footer>
  );
}

