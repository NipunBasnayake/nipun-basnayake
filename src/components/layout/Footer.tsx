import { contactData, navItems, siteData } from "../../data/portfolio";
import { Container } from "../common/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col gap-6 text-sm text-platinum/54 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-black text-platinum">{siteData.name}</p>
          <p className="mt-1">{contactData.closingLine}</p>
        </div>
        <nav className="flex flex-wrap gap-3" aria-label="Footer navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-platinum">
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
