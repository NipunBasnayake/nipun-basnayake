import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { AppRoute } from "../../hooks/useRouteNavigation";
import { siteData } from "../../data/portfolio";
import { cn } from "../../lib/utils";
import { Container } from "../common/Container";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  route: AppRoute;
  onNavigate: (to: string) => void;
}

const landingLinks: NavLink[] = [
  { label: "Developer", href: "/developer" },
  { label: "Designer", href: "/designer" },
  { label: "Contact", href: "/developer#contact" },
];

const developerLinks: NavLink[] = [
  { label: "Profile", href: "/developer#summary" },
  { label: "Skills", href: "/developer#skills" },
  { label: "Experience", href: "/developer#experience" },
  { label: "Work", href: "/developer#projects" },
  { label: "Certificates", href: "/developer#certificates" },
  { label: "Education", href: "/developer#education" },
  { label: "Contact", href: "/developer#contact" },
];

const designerLinks: NavLink[] = [
  { label: "Profile", href: "/designer#designer-profile" },
  { label: "Experience", href: "/designer#designer-experience" },
  { label: "Design Work", href: "/designer#design-work" },
  { label: "Contact", href: "/designer#designer-contact" },
];

function getNavLinks(route: AppRoute): NavLink[] {
  if (route === "/developer") return developerLinks;
  if (route === "/designer") return designerLinks;
  return landingLinks;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function Navbar({ route, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = getNavLinks(route);
  const initials = getInitials(siteData.shortName);
  const isRoleRoute = route !== "/";

  const handleNavigate = (href: string) => {
    onNavigate(href);
    setIsOpen(false);
  };

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-3 z-50 px-3">
      <Container className="pointer-events-auto">
        <div className="flex h-16 items-center justify-between rounded-full border border-white/10 bg-obsidian/70 px-3 shadow-[0_18px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:px-4">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              handleNavigate("/");
            }}
            className="group flex min-w-0 items-center gap-3 rounded-full pr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
            aria-label={siteData.name}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.065] font-display text-sm font-black text-platinum shadow-cyan">
              {initials}
            </span>
            <span className="hidden max-w-[11rem] truncate font-mono text-[0.66rem] uppercase tracking-[0.24em] text-platinum/70 sm:block">
              {siteData.shortName}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {isRoleRoute ? (
              <div className="mr-2 flex h-10 items-center rounded-full border border-white/10 bg-black/30 p-1">
                {[
                  { label: "Dev", href: "/developer" as const, active: route === "/developer" },
                  { label: "Design", href: "/designer" as const, active: route === "/designer" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavigate(item.href);
                    }}
                    className={cn(
                      "relative isolate rounded-full px-3.5 py-2 text-[0.66rem] font-black uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic",
                      item.active ? "text-obsidian" : "text-platinum/55 hover:text-platinum",
                      item.href === "/designer" && item.active && "text-platinum",
                    )}
                  >
                    {item.active ? (
                      <motion.span
                        layoutId="navbar-mode-pill"
                        className={cn(
                          "absolute inset-0 -z-10 rounded-full",
                          route === "/developer" ? "bg-arctic" : "bg-wine",
                        )}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}

            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate(item.href);
                }}
                className="group relative px-2.5 py-2 text-sm font-semibold text-platinum/60 transition hover:text-platinum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic lg:px-3"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-1 left-3 right-3 h-px origin-center scale-x-0 bg-gradient-to-r from-arctic/0 via-arctic/70 to-wine/70 transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-platinum md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <motion.div
        className={cn(
          "pointer-events-auto absolute left-3 right-3 top-[4.75rem] mx-auto max-w-7xl rounded-[1.35rem] border border-white/10 bg-obsidian/90 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl md:hidden",
          !isOpen && "pointer-events-none",
        )}
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -10,
        }}
        transition={{ duration: 0.2 }}
      >
        <nav className="grid gap-2" aria-label="Mobile navigation">
          {isRoleRoute ? (
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/developer"
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate("/developer");
                }}
                className={cn(
                  "rounded-full border px-4 py-3 text-center text-sm font-black uppercase tracking-[0.14em] transition",
                  route === "/developer"
                    ? "border-arctic/40 bg-arctic text-obsidian"
                    : "border-white/10 bg-black/40 text-platinum/70",
                )}
              >
                Developer
              </a>
              <a
                href="/designer"
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate("/designer");
                }}
                className={cn(
                  "rounded-full border px-4 py-3 text-center text-sm font-black uppercase tracking-[0.14em] transition",
                  route === "/designer"
                    ? "border-wine/50 bg-wine text-platinum"
                    : "border-white/10 bg-black/40 text-platinum/70",
                )}
              >
                Designer
              </a>
            </div>
          ) : null}

          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavigate(item.href);
              }}
              className="rounded-full border border-white/10 bg-black/40 px-5 py-3 text-center text-sm font-bold text-platinum/80 transition hover:border-white/20 hover:bg-black/60"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
