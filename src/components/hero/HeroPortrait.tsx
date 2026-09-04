import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { heroData } from "../../data/portfolio";
import type { HeroVariant } from "../../data/heroTools";

type HeroPortraitComposition = "landing" | "role";

interface HeroPortraitProps {
  composition?: HeroPortraitComposition;
  hoverTone?: HeroVariant | null;
  variant?: HeroVariant;
}

const portraitSourceWidth = 1722;
// Alpha-weighted subject mass sits about 11.65px right of the source canvas center.
const visibleSubjectCorrectionPx = -11.65;
const visibleSubjectCorrectionRatio =
  visibleSubjectCorrectionPx / portraitSourceWidth;

const portraitWidths: Record<HeroPortraitComposition, string> = {
  landing: "clamp(19rem, 38vw, 29rem)",
  role: "clamp(19rem, 38vw, 29rem)",
};

const getHoverFilter = (tone?: HeroVariant | null) => {
  if (tone === "developer") {
    return "drop-shadow(0 0 30px rgba(134,244,255,0.32)) drop-shadow(0 20px 42px rgba(0,0,0,0.65))";
  }

  if (tone === "designer") {
    return "drop-shadow(0 0 30px rgba(162,41,255,0.24)) drop-shadow(0 0 20px rgba(255,90,61,0.18)) drop-shadow(0 20px 42px rgba(0,0,0,0.65))";
  }

  return "drop-shadow(0 18px 38px rgba(0,0,0,0.55))";
};

export function HeroPortrait({
  composition = "role",
  hoverTone,
  variant,
}: HeroPortraitProps) {
  const reduceMotion = useReducedMotion();
  const activeTone = hoverTone ?? variant;

  const style = {
    "--hero-portrait-x": "50%",
    "--hero-portrait-y": "48%",
    "--hero-portrait-width": portraitWidths[composition],
    "--hero-portrait-translate-y": "-48%",
    "--portrait-visual-offset-x": `calc(var(--hero-portrait-width) * ${visibleSubjectCorrectionRatio})`,
    left: "calc(var(--hero-portrait-x) + var(--portrait-visual-offset-x))",
    top: "var(--hero-portrait-y)",
    width: "var(--hero-portrait-width)",
    transform: "translate(-50%, var(--hero-portrait-translate-y))",
  } as CSSProperties;

  return (
    <div
      className="pointer-events-none absolute z-30"
      style={style}
    >
      {/* Role-specific rim glow behind portrait */}
      {variant ? (
        <div
          className="pointer-events-none absolute -inset-x-12 top-6 -bottom-10 -z-10 rounded-full"
          style={{
            background:
              variant === "developer"
                ? "radial-gradient(ellipse at 50% 45%, rgba(134, 244, 255, 0.16) 0%, rgba(56, 189, 248, 0.06) 45%, transparent 72%)"
                : "radial-gradient(ellipse at 50% 45%, rgba(162, 41, 255, 0.16) 0%, rgba(255, 90, 61, 0.09) 45%, transparent 72%)",
            filter: "blur(28px)",
          }}
          aria-hidden="true"
        />
      ) : null}

      <motion.div
        className="relative w-full"
        initial={reduceMotion ? false : { opacity: 0, y: 38, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: reduceMotion ? 1 : activeTone ? 1.01 : 1,
          filter: getHoverFilter(activeTone),
        }}
        transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={heroData.portrait}
          alt={heroData.portraitAlt}
          className="block w-full object-contain object-bottom"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>
    </div>
  );
}
