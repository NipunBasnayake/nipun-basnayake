import { motion, useReducedMotion } from "framer-motion";
import { heroData } from "../../data/portfolio";
import type { HeroFloatingTool, HeroVariant } from "../../data/heroTools";
import { cn } from "../../lib/utils";
import { Container } from "../common/Container";
import { AnimatedGrid } from "../ui/AnimatedGrid";
import { FloatingToolsLayer } from "./FloatingToolsLayer";
import { HeroPortrait } from "./HeroPortrait";

interface RoleHeroProps {
  variant: HeroVariant;
  tools: HeroFloatingTool[];
}

const variantCopy = {
  developer: {
    eyebrow: "Full Stack Software Engineer / Product Engineer",
    tone: "Spring Boot / React / APIs / Microservices",
    background:
      "bg-[linear-gradient(180deg,#09111f_0%,#050505_52%,#0b0710_100%)]",
    nameTop: "from-platinum via-arctic to-wine",
    nameBottom: "from-ember via-platinum to-arctic",
    glowLeft: "bg-arctic/10",
    glowRight: "bg-wine/10",
    labelColor: "text-arctic/75",
  },
  designer: {
    eyebrow: "Freelance Graphic Designer / Since 2019",
    tone: "Brand / Print / Social / Visual Design",
    background:
      "bg-[linear-gradient(180deg,#140b18_0%,#050505_52%,#16080d_100%)]",
    nameTop: "from-platinum via-wine to-arctic",
    nameBottom: "from-ember via-platinum to-wine",
    glowLeft: "bg-wine/10",
    glowRight: "bg-ember/10",
    labelColor: "text-ember/75",
  },
} satisfies Record<
  HeroVariant,
  {
    eyebrow: string;
    tone: string;
    background: string;
    nameTop: string;
    nameBottom: string;
    glowLeft: string;
    glowRight: string;
    labelColor: string;
  }
>;

export function RoleHero({ variant, tools }: RoleHeroProps) {
  const reduceMotion = useReducedMotion();
  const copy = variantCopy[variant];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-obsidian pt-20"
    >
      <div className={cn("absolute inset-0", copy.background)} />
      <AnimatedGrid className="opacity-20 mix-blend-soft-light" />

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        <motion.div
          className={cn("absolute left-[-9rem] top-16 size-[24rem] rounded-full blur-3xl", copy.glowLeft)}
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.72, 1, 0.72] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={cn("absolute bottom-[-8rem] right-[-10rem] size-[28rem] rounded-full blur-3xl", copy.glowRight)}
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.6, 0.92, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(244,240,232,0.07),transparent_22%),radial-gradient(circle_at_50%_64%,rgba(0,0,0,0.28),transparent_36%)]" />
      </div>

      <Container className="relative z-20">
        <div className="relative min-h-[calc(100vh-5rem)]">
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-[20%] z-20 hidden text-center sm:block md:top-[17%] lg:top-[22%]"
            initial={reduceMotion ? false : { opacity: 0, y: 32, filter: "blur(14px)" }}
            animate={{ opacity: 0.92, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <h1
              className={cn(
                "bg-gradient-to-r bg-clip-text font-display text-[clamp(7rem,23vw,22rem)] font-black leading-[0.74] tracking-[-0.07em] text-transparent",
                copy.nameTop,
              )}
            >
              {heroData.nameLines[0]}
            </h1>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[8%] z-20 hidden text-center sm:block md:bottom-[22%] lg:bottom-[13%]"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 0.94, y: 0 }}
            transition={{ duration: 0.82, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <h1
              className={cn(
                "bg-gradient-to-r bg-clip-text font-display text-[clamp(4rem,12vw,12rem)] font-black leading-[0.78] tracking-[-0.055em] text-transparent",
                copy.nameBottom,
              )}
            >
              {heroData.nameLines[1]}
            </h1>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 top-[18%] z-20 text-center sm:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <h1
              className={cn(
                "bg-gradient-to-r bg-clip-text font-display text-[clamp(4rem,18vw,5rem)] font-black leading-[0.78] tracking-[-0.05em] text-transparent",
                copy.nameTop,
              )}
            >
              {heroData.nameLines[0]}
            </h1>
            <h1
              className={cn(
                "bg-gradient-to-r bg-clip-text font-display text-[clamp(3.2rem,15vw,4.2rem)] font-black leading-[0.82] tracking-[-0.04em] text-transparent",
                copy.nameBottom,
              )}
            >
              {heroData.nameLines[1]}
            </h1>
          </motion.div>

          <FloatingToolsLayer tools={tools} variant={variant} />

          <HeroPortrait composition="role" />

          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-40 mx-auto max-w-xl px-6 text-center sm:bottom-10">
            <motion.p
              className={cn(
                "font-mono text-[0.65rem] uppercase tracking-[0.28em] sm:text-xs",
                copy.labelColor,
              )}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.62 }}
            >
              {copy.eyebrow}
            </motion.p>
            <motion.p
              className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-platinum/40 sm:text-[0.7rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.7 }}
            >
              {copy.tone}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
