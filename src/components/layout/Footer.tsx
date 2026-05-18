import { contactData, navItems, siteData } from "../../data/portfolio";
import { Container } from "../common/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col gap-6 text-sm text-platinum/54 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-platinum/64">© {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
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
