import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";
import type { HeroFloatingTool, HeroVariant } from "../../data/heroTools";
import { cn } from "../../lib/utils";
import { Container } from "../common/Container";
import { DesignerHeroEnvironment } from "./DesignerHeroEnvironment";
import { DeveloperHeroEnvironment } from "./DeveloperHeroEnvironment";
import { HeroCursorLight } from "./HeroCursorLight";
import { HeroName } from "./HeroName";
import { HeroPortrait } from "./HeroPortrait";

interface RoleHeroProps {
  variant: HeroVariant;
  tools: HeroFloatingTool[];
}

const variantCopy = {
  developer: {
    eyebrow: "Full Stack Software Engineer / Product Engineer",
    tone: "Spring Boot / React / APIs / Distributed Systems",
    background:
      "bg-[linear-gradient(180deg,#06101e_0%,#050505_54%,#090712_100%)]",
    glowLeft: "bg-arctic/10",
    glowRight: "bg-wine/10",
    labelColor: "text-arctic/85",
  },
  designer: {
    eyebrow: "Freelance Graphic Designer / Since 2019",
    tone: "Brand Identity / Print / Motion / Visual Systems",
    background:
      "bg-[linear-gradient(180deg,#160b1b_0%,#050505_54%,#14080e_100%)]",
    glowLeft: "bg-wine/10",
    glowRight: "bg-ember/10",
    labelColor: "text-ember/85",
  },
} satisfies Record<
  HeroVariant,
  {
    eyebrow: string;
    tone: string;
    background: string;
    glowLeft: string;
    glowRight: string;
    labelColor: string;
  }
>;

export function RoleHero({ variant, tools }: RoleHeroProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const copy = variantCopy[variant];
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 24, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 24, mass: 0.45 });

  useEffect(() => {
    if (reduceMotion) {
      pointerX.set(0);
      pointerY.set(0);
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const bounds = sectionRef.current?.getBoundingClientRect();
        if (!bounds) return;

        const normalizedX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const normalizedY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        pointerX.set(Math.min(Math.max(normalizedX, -1), 1));
        pointerY.set(Math.min(Math.max(normalizedY, -1), 1));
      });
    };

    const handleReset = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handleReset);
    window.addEventListener("blur", handleReset);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handleReset);
      window.removeEventListener("blur", handleReset);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-obsidian pt-20"
    >
      {/* 1. Base Gradient Atmosphere */}
      <div className={cn("absolute inset-0", copy.background)} />

      {/* 2. Ambient Color Blobs */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        <motion.div
          className={cn("absolute left-[-8rem] top-12 size-[26rem] rounded-full blur-3xl", copy.glowLeft)}
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 0.95, 0.7] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={cn("absolute bottom-[-6rem] right-[-8rem] size-[30rem] rounded-full blur-3xl", copy.glowRight)}
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>

      {/* 3. High-Performance Cursor Spotlight */}
      <HeroCursorLight
        variant={variant}
        pointerX={pointerX}
        pointerY={pointerY}
        reduceMotion={reduceMotion}
      />

      {/* 4. Full Viewport Environment Layer (Spans full width 2% - 98%) */}
      <div className="pointer-events-none absolute inset-0 z-15">
        {variant === "developer" ? (
          <DeveloperHeroEnvironment
            tools={tools}
            pointerX={smoothX}
            pointerY={smoothY}
            reduceMotion={reduceMotion}
          />
        ) : (
          <DesignerHeroEnvironment
            tools={tools}
            pointerX={smoothX}
            pointerY={smoothY}
            reduceMotion={reduceMotion}
          />
        )}
      </div>

      {/* 5. Central Hero Composition */}
      <Container className="relative z-20">
        <div className="relative min-h-[calc(100vh-5rem)]">
          {/* Layered Typography: NIPUN (Behind, z-20) & BASNAYAKA (Front, z-40) */}
          <HeroName variant={variant} reduceMotion={reduceMotion} />

          {/* Centered Dominant Portrait (z-30) */}
          <HeroPortrait composition="role" variant={variant} />

          {/* Bottom Role Eyebrow & Tone (z-50) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-50 mx-auto max-w-xl px-6 text-center sm:bottom-10">
            <motion.p
              className={cn(
                "font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] sm:text-xs",
                copy.labelColor,
              )}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {copy.eyebrow}
            </motion.p>
            <motion.p
              className="mt-2.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-platinum/50 sm:text-[0.7rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            >
              {copy.tone}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
