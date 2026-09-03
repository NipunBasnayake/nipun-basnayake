import { developerHeroTools } from "../../data/heroTools";
import { RoleHero } from "../hero/RoleHero";

export function HeroSection() {
  return <RoleHero variant="developer" tools={developerHeroTools} />;
}
