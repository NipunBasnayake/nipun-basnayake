"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-white/10 bg-black/80 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-b border-white/5 bg-black/60 backdrop-blur"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold text-white transition-all"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-400 text-xs font-bold text-black transition-transform group-hover:scale-110">
            {personalData.firstName[0]}
            {personalData.lastName[0]}
          </span>
          <span className="hidden sm:inline">{personalData.fullName}</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm transition-colors",
                  isActive
                    ? "font-medium text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-cyan-400 after:to-fuchsia-400"
                    : "text-white/70 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/contact" variant="primary" size="sm">
            {sectionsData.contact.title}
          </Button>
        </nav>
        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle navigation"
          aria-controls="mobile-nav"
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
        id="mobile-nav"
        className={cn(
          "transition-all duration-300 md:hidden",
          isOpen ? "max-h-96 border-t border-white/10" : "max-h-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors",
                  isActive ? "font-medium text-white" : "text-white/80 hover:text-white"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/contact" variant="primary" size="sm">
            {sectionsData.contact.title}
          </Button>
        </div>
      </div>
    </header>
  );
}

