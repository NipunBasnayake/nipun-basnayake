import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { heroData } from "../../data/portfolio";
import type { HeroVariant } from "../../data/heroTools";

type HeroPortraitComposition = "landing" | "role";

interface HeroPortraitProps {
  composition?: HeroPortraitComposition;
  hoverTone?: HeroVariant | null;
}

const portraitSourceWidth = 1722;
// Alpha-weighted subject mass sits about 11.65px right of the source canvas center.
const visibleSubjectCorrectionPx = -11.65;
const visibleSubjectCorrectionRatio =
  visibleSubjectCorrectionPx / portraitSourceWidth;

const portraitWidths: Record<HeroPortraitComposition, string> = {
  landing: "clamp(19rem, 34vw, 26rem)",
  role: "clamp(19rem, 38vw, 29rem)",
};

const getHoverFilter = (hoverTone?: HeroVariant | null) => {
  if (hoverTone === "developer") {
    return "drop-shadow(0 0 26px rgba(134,244,255,0.28))";
  }

  if (hoverTone === "designer") {
    return "drop-shadow(0 0 26px rgba(255,90,61,0.2)) drop-shadow(0 0 18px rgba(162,41,255,0.18))";
  }

  return "drop-shadow(0 18px 38px rgba(0,0,0,0.55))";
};

export function HeroPortrait({
  composition = "role",
  hoverTone,
}: HeroPortraitProps) {
  const reduceMotion = useReducedMotion();
  const style = {
    "--hero-portrait-x": "50%",
    "--hero-portrait-y": "50%",
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
      <motion.div
        className="relative w-full"
        initial={reduceMotion ? false : { opacity: 0, y: 42, scale: 0.94 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: reduceMotion ? 1 : hoverTone ? 1.012 : 1,
          filter: getHoverFilter(hoverTone),
        }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
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
