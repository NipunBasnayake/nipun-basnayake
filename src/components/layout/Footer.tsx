import { siteData } from "../../data/portfolio";
import type { AppRoute } from "../../hooks/useRouteNavigation";
import { Container } from "../common/Container";

interface FooterProps {
  route: AppRoute;
  onNavigate: (to: string) => void;
}

const footerLinksByRoute: Record<AppRoute, Array<{ label: string; href: string }>> = {
  "/": [
    { label: "Developer", href: "/developer" },
    { label: "Designer", href: "/designer" },
    { label: "Contact", href: "/developer#contact" },
  ],
  "/developer": [
    { label: "Profile", href: "/developer#summary" },
    { label: "Work", href: "/developer#projects" },
    { label: "Certificates", href: "/developer#certificates" },
    { label: "Contact", href: "/developer#contact" },
  ],
  "/designer": [
    { label: "Profile", href: "/designer#designer-profile" },
    { label: "Design Work", href: "/designer#design-work" },
    { label: "Developer", href: "/developer" },
    { label: "Contact", href: "/designer#designer-contact" },
  ],
};

export function Footer({ route, onNavigate }: FooterProps) {
  const footerLinks = footerLinksByRoute[route];

  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col gap-6 text-sm text-platinum/54 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-platinum/64">
            &copy; {new Date().getFullYear()} {siteData.name}. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.href);
              }}
              className="transition hover:text-platinum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
