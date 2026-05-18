import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { navItems, siteData } from "../../data/portfolio";
import { Container } from "../common/Container";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const initials = siteData.shortName
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/8 bg-obsidian/95 lg:bg-obsidian/58 lg:backdrop-blur-lg">
      <Container className="flex h-20 items-center justify-between">
        <a
          href="#hero"
          className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
          aria-label={siteData.name}
        >
          <span className="grid size-10 place-items-center rounded-[1.1rem] border border-white/12 bg-white/[0.06] font-display text-sm font-black text-platinum shadow-cyan">
            {initials}
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.26em] text-platinum/68 sm:block">
            {siteData.shortName}
          </span>
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-platinum/62 transition hover:bg-white/[0.06] hover:text-platinum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
            >
              {item.label}
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
      </Container>

      <motion.div
        className={cn(
          "absolute left-0 right-0 top-20 px-5 pb-6 pt-3 md:hidden",
          "bg-black/90 backdrop-blur-md",
          "border-b border-white/10",

          !isOpen && "pointer-events-none"
        )}
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -12,
        }}
        transition={{ duration: 0.2 }}
      >
        <nav className="grid gap-3" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="
                  rounded-2xl
                  text-center
                  bg-black/60
                  backdrop-blur-md

                  border border-white/10

                  px-5 py-4

                  text-lg font-bold text-platinum

                  transition-all duration-200

                  hover:bg-black/75
                  hover:border-white/20
                  hover:scale-[1.01]
                "
            >
              {item.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
