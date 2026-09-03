import { IdentitySelector } from "../components/identity/IdentitySelector";

interface LandingPageProps {
  onNavigate: (to: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <main>
      <IdentitySelector onNavigate={onNavigate} />
    </main>
  );
}
