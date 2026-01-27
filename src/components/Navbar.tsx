"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { personalData, sectionsData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const projectLabel = sectionsData.projects.title.replace(/^My\s+/i, "");
const certificationsLabel = sectionsData.certifications.title.replace(/^My\s+/i, "");

const navItems = [
  { label: "Home", href: "/" },
  { label: projectLabel, href: "/projects" },
  { label: certificationsLabel, href: "/certifications" },
  { label: sectionsData.about.ctaButtons[0].text, href: "/resume" },
  { label: sectionsData.contact.title, href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-400 text-xs font-bold text-black">
            {personalData.firstName[0]}
            {personalData.lastName[0]}
          </span>
          <span>{personalData.fullName}</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" size="sm">
            {sectionsData.contact.title}
          </Button>
        </nav>
        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      <div
        className={cn(
          "md:hidden",
          isOpen ? "max-h-96 border-t border-white/10" : "max-h-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/80"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" size="sm">
            {sectionsData.contact.title}
          </Button>
        </div>
      </div>
    </header>
  );
}
