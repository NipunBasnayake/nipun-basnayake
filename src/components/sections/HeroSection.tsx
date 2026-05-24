import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
  type MutableRefObject,
} from "react";

import { heroData, siteData } from "../../data/portfolio";
import { Container } from "../common/Container";
import { AnimatedGrid } from "../ui/AnimatedGrid";

const ANIMATION_CONFIG = {
  sequence: {
    background: { delay: 0, duration: 0.8 },
    portrait: { delay: 0.2, duration: 0.9 },
    rearText: { delay: 0.3, duration: 0.9 },
    frontText: { delay: 0.5, duration: 0.9 },
  },

  easing: {
    entrance: [0.22, 1, 0.36, 1] as const,
  },

  parallax: {
    portraitX: 3.2,
    rearX: 4,
    frontX: -3.6,
  },

  particles: {
    count: 8,
    maxDuration: 14,
    maxDrift: 10,
  },
};

const CINEMATIC_EASING = {
  rear: [0.22, 1, 0.36, 1] as const,
  portrait: [0.19, 1, 0.22, 1] as const,
  front: [0.16, 1, 0.3, 1] as const,
};

const MAGNETIC_CONFIG = {
  maxOffsetX: 16,
  maxOffsetY: 12,
  maxRotateX: 7,
  maxRotateY: 9,
  maxScale: 1.015,
  followLerp: 0.085,
  returnLerp: 0.12,
  settleThreshold: 0.001,
};

const TEXT_DISTORTION_CONFIG = {
  rear: {
    maxOffsetX: 4,
    maxOffsetY: 1.6,
    maxSkewX: 1.8,
    maxSkewY: 0.7,
    stiffness: 0.07,
    damping: 0.82,
  },
  front: {
    maxOffsetX: 3,
    maxOffsetY: 1.2,
    maxSkewX: 1.35,
    maxSkewY: 0.55,
    stiffness: 0.075,
    damping: 0.8,
  },
  settleThreshold: 0.01,
} as const;

const PARTICLE_REPEL_CONFIG = {
  radius: 0.44,
  maxOffsetX: 7,
  maxOffsetY: 5,
  stiffness: 0.09,
  damping: 0.84,
  returnStiffness: 0.12,
  returnDamping: 0.88,
  settleThreshold: 0.01,
} as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

const springStep = (
  current: number,
  target: number,
  velocity: number,
  stiffness: number,
  damping: number
) => {
  const force = (target - current) * stiffness;
  const nextVelocity = (velocity + force) * damping;
  const nextValue = current + nextVelocity;

  return {
    value: nextValue,
    velocity: nextVelocity,
  };
};

const createRearTextVariants = (reduceMotion: boolean): Variants => ({
  hidden: {
    opacity: reduceMotion ? 1 : 0,
    y: reduceMotion ? 0 : 44,
    scale: reduceMotion ? 1 : 0.976,
    filter: reduceMotion ? "blur(0px)" : "blur(18px)",
  },
  visible: {
    opacity: 0.95,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: reduceMotion ? 0 : ANIMATION_CONFIG.sequence.rearText.duration,
      delay: reduceMotion ? 0 : ANIMATION_CONFIG.sequence.rearText.delay,
      ease: CINEMATIC_EASING.rear,
    },
  },
});

const createPortraitVariants = (reduceMotion: boolean): Variants => ({
  hidden: {
    opacity: reduceMotion ? 1 : 0,
    y: reduceMotion ? 0 : 56,
    scale: reduceMotion ? 1 : 0.94,
    rotateX: reduceMotion ? 0 : 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: reduceMotion ? 0 : ANIMATION_CONFIG.sequence.portrait.duration,
      delay: reduceMotion ? 0 : ANIMATION_CONFIG.sequence.portrait.delay,
      ease: CINEMATIC_EASING.portrait,
    },
  },
});

const createFrontTextVariants = (reduceMotion: boolean): Variants => ({
  hidden: {
    opacity: reduceMotion ? 1 : 0,
    y: reduceMotion ? 0 : 30,
    scale: reduceMotion ? 1 : 0.986,
  },
  visible: {
    opacity: 0.95,
    y: 0,
    scale: 1,
    transition: {
      duration: reduceMotion ? 0 : ANIMATION_CONFIG.sequence.frontText.duration,
      delay: reduceMotion ? 0 : ANIMATION_CONFIG.sequence.frontText.delay,
      ease: CINEMATIC_EASING.front,
    },
  },
});

const createDustParticles = () =>
  Array.from(
    { length: ANIMATION_CONFIG.particles.count },
    (_, index) => ({
      id: `dust-${index}`,
      left: `${(index * 22 + 11) % 100}%`,
      top: `${(index * 18 + 9) % 100}%`,
      size: 1.2 + (index % 3) * 0.6,
      duration:
        ANIMATION_CONFIG.particles.maxDuration +
        (index % 3) * 1.5,
      delay: index * 0.5,
      driftX:
        index % 2 === 0
          ? ANIMATION_CONFIG.particles.maxDrift
          : -ANIMATION_CONFIG.particles.maxDrift * 0.8,
      driftY:
        index % 3 === 0
          ? -(ANIMATION_CONFIG.particles.maxDrift - 2)
          : ANIMATION_CONFIG.particles.maxDrift * 0.6,
    })
  );

const AURORA_RIBBONS = [
  {
    className:
      "left-[-22%] top-[8%] h-[15rem] w-[92rem] bg-[linear-gradient(100deg,rgba(134,244,255,0)_0%,rgba(134,244,255,0.08)_12%,rgba(134,244,255,0.58)_34%,rgba(162,41,255,0.36)_58%,rgba(255,90,61,0.18)_80%,rgba(255,90,61,0)_100%)]",
    animate: {
      x: [0, 52, 0],
      y: [0, -18, 0],
      rotate: [-7, -3, -7],
      scale: [1, 1.05, 1],
    },
    transition: {
      duration: 28,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0,
    },
  },
  {
    className:
      "right-[-24%] top-[18%] h-[18rem] w-[100rem] bg-[linear-gradient(95deg,rgba(255,90,61,0)_0%,rgba(255,90,61,0.08)_14%,rgba(255,90,61,0.5)_30%,rgba(162,41,255,0.34)_56%,rgba(134,244,255,0.16)_76%,rgba(134,244,255,0)_100%)]",
    animate: {
      x: [0, -46, 0],
      y: [0, 14, 0],
      rotate: [6, 2, 6],
      scale: [1, 1.045, 1],
    },
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1.2,
    },
  },
  {
    className:
      "left-[8%] bottom-[-14%] h-[17rem] w-[86rem] bg-[linear-gradient(110deg,rgba(162,41,255,0)_0%,rgba(162,41,255,0.1)_14%,rgba(162,41,255,0.48)_34%,rgba(255,255,255,0.08)_52%,rgba(255,90,61,0.26)_72%,rgba(255,90,61,0)_100%)]",
    animate: {
      x: [0, 38, 0],
      y: [0, -16, 0],
      rotate: [-4, -1, -4],
      scale: [1, 1.03, 1],
    },
    transition: {
      duration: 32,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.6,
    },
  },
];

interface AuroraBackdropProps {
  reduceMotion: boolean;
  isDesktop: boolean;
  backdropRef: MutableRefObject<HTMLDivElement | null>;
}

const AuroraBackdropComponent = memo(
  function AuroraBackdrop({
    reduceMotion,
    isDesktop,
    backdropRef,
  }: AuroraBackdropProps) {
    const visibleRibbons = isDesktop ? AURORA_RIBBONS : AURORA_RIBBONS.slice(0, 2);

    return (
      <div
        ref={backdropRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
        style={{
          transform:
            "translate3d(var(--aurora-x, 0px), var(--aurora-y, 0px), 0) rotate(var(--aurora-rotate, 0deg))",
          transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(72% 54% at 50% 14%, rgba(134,244,255,0.18) 0%, rgba(134,244,255,0.04) 34%, rgba(162,41,255,0.02) 58%, rgba(0,0,0,0) 82%)",
            mixBlendMode: "screen",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.35, 0.62, 0.35],
                  scale: [1, 1.04, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : ({ duration: 18, repeat: Infinity, ease: "easeInOut" } as Transition)
          }
        />

        {visibleRibbons.map((ribbon, index) => (
          <motion.div
            key={`aurora-${index}`}
            className={`absolute rounded-full blur-3xl ${ribbon.className}`}
            style={{
              opacity: 0.18 + index * 0.05,
              mixBlendMode: "screen",
              willChange: "transform, opacity",
              transformOrigin: "center",
            }}
            animate={reduceMotion ? undefined : ribbon.animate}
            transition={reduceMotion ? undefined : (ribbon.transition as Transition)}
          />
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0)_0%,rgba(5,5,5,0.16)_68%,rgba(5,5,5,0.5)_100%)]" />
      </div>
    );
  }
);

interface DustParticlesProps {
  particles: ReturnType<typeof createDustParticles>;
  reduceMotion: boolean;
  particleRefs: MutableRefObject<Array<HTMLSpanElement | null>>;
}

const DustParticlesComponent = memo(
  function DustParticles({
    particles,
    reduceMotion,
    particleRefs,
  }: DustParticlesProps) {
    return (
      <>
        {particles.map((particle, index) => (
          <motion.span
            key={particle.id}
            className="absolute"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: 0.08,
              willChange: "transform",
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                  x: [0, particle.driftX, 0],
                  y: [0, particle.driftY, 0],
                  opacity: [0.06, 0.16, 0.06],
                }
            }
            transition={
              reduceMotion
                ? undefined
                : ({
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                } as Transition)
            }
          >
            <span
              ref={(node) => {
                particleRefs.current[index] = node;
              }}
              className="absolute rounded-full bg-platinum/70 shadow-[0_0_14px_rgba(244,240,232,0.14)]"
              style={{
                width: particle.size,
                height: particle.size,
                transform:
                  "translate3d(var(--particle-x, 0px), var(--particle-y, 0px), 0)",
                willChange: "transform",
                pointerEvents: "none",
              }}
            />
          </motion.span>
        ))}
      </>
    );
  }
);

export const HeroSection = memo(function HeroSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  
  // Gate expensive effects by device: only on desktop (fine pointer)
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    setIsDesktop(query.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const stageRef = useRef<HTMLElement | null>(null);
  const auroraBackdropRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const portraitMagneticRef = useRef<HTMLDivElement | null>(null);
  const rearTextRef = useRef<HTMLHeadingElement | null>(null);
  const frontTextRef = useRef<HTMLHeadingElement | null>(null);
  const dustParticleRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [imageFailed, setImageFailed] = useState(false);

  const rearTextVariants = useMemo(
    () => createRearTextVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );

  const portraitVariants = useMemo(
    () => createPortraitVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );

  const frontTextVariants = useMemo(
    () => createFrontTextVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );

  // Only create dust particles on desktop to save memory and paint cost
  const dustParticles = useMemo(
    () => (isDesktop ? createDustParticles() : []),
    [isDesktop]
  );

  const dustParticleAnchors = useMemo(
    () =>
      dustParticles.map((particle) => ({
        x: (parseFloat(particle.left) / 100) * 2 - 1,
        y: (parseFloat(particle.top) / 100) * 2 - 1,
      })),
    [dustParticles]
  );

  const pointerTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const typographyFrameRef = useRef<number | null>(null);
  const typographyTargetRef = useRef({
    x: 0,
    y: 0,
    active: false,
  });
  const typographyCurrentRef = useRef({
    rear: {
      x: 0,
      y: 0,
      skewX: 0,
      skewY: 0,
      velocityX: 0,
      velocityY: 0,
      velocitySkewX: 0,
      velocitySkewY: 0,
    },
    front: {
      x: 0,
      y: 0,
      skewX: 0,
      skewY: 0,
      velocityX: 0,
      velocityY: 0,
      velocitySkewX: 0,
      velocitySkewY: 0,
    },
  });

  const magneticFrameRef = useRef<number | null>(null);
  const magneticTargetRef = useRef({
    x: 0,
    y: 0,
    active: false,
  });
  const magneticCurrentRef = useRef({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const particleFrameRef = useRef<number | null>(null);
  const particleInteractionActiveRef = useRef(false);
  const particleTargetRef = useRef(
    dustParticles.map(() => ({ x: 0, y: 0 }))
  );
  const particleCurrentRef = useRef(
    dustParticles.map(() => ({
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
    }))
  );

  const setMagneticStyles = useCallback(
    (
      x: number,
      y: number,
      rotateX: number,
      rotateY: number,
      scale: number
    ) => {
      const element = portraitMagneticRef.current;

      if (!element) return;

      element.style.setProperty("--magnetic-x", `${x}px`);
      element.style.setProperty("--magnetic-y", `${y}px`);
      element.style.setProperty(
        "--magnetic-rotate-x",
        `${rotateX}deg`
      );
      element.style.setProperty(
        "--magnetic-rotate-y",
        `${rotateY}deg`
      );
      element.style.setProperty("--magnetic-scale", `${scale}`);
    },
    []
  );

  const setAuroraStyles = useCallback((x: number, y: number, rotate: number) => {
    const element = auroraBackdropRef.current;

    if (!element) return;

    element.style.setProperty("--aurora-x", `${x}px`);
    element.style.setProperty("--aurora-y", `${y}px`);
    element.style.setProperty("--aurora-rotate", `${rotate}deg`);
  }, []);

  const stopMagneticAnimation = useCallback(() => {
    if (magneticFrameRef.current !== null) {
      cancelAnimationFrame(magneticFrameRef.current);
      magneticFrameRef.current = null;
    }
  }, []);

  const setParticleStyle = useCallback(
    (index: number, x: number, y: number) => {
      const element = dustParticleRefs.current[index];

      if (!element) return;

      element.style.setProperty("--particle-x", `${x}px`);
      element.style.setProperty("--particle-y", `${y}px`);
    },
    []
  );

  const stopParticleAnimation = useCallback(() => {
    if (particleFrameRef.current !== null) {
      cancelAnimationFrame(particleFrameRef.current);
      particleFrameRef.current = null;
    }
  }, []);

  const runParticleAnimation = useCallback(() => {
    particleFrameRef.current = null;

    let hasMotionRemaining = false;

    particleCurrentRef.current.forEach((current, index) => {
      const target = particleTargetRef.current[index] ?? { x: 0, y: 0 };
      const stiffness = particleInteractionActiveRef.current
        ? PARTICLE_REPEL_CONFIG.stiffness
        : PARTICLE_REPEL_CONFIG.returnStiffness;
      const damping = particleInteractionActiveRef.current
        ? PARTICLE_REPEL_CONFIG.damping
        : PARTICLE_REPEL_CONFIG.returnDamping;

      const nextX = springStep(
        current.x,
        target.x,
        current.velocityX,
        stiffness,
        damping
      );
      const nextY = springStep(
        current.y,
        target.y,
        current.velocityY,
        stiffness,
        damping
      );

      const boundedX = clamp(
        nextX.value,
        -PARTICLE_REPEL_CONFIG.maxOffsetX,
        PARTICLE_REPEL_CONFIG.maxOffsetX
      );
      const boundedY = clamp(
        nextY.value,
        -PARTICLE_REPEL_CONFIG.maxOffsetY,
        PARTICLE_REPEL_CONFIG.maxOffsetY
      );

      particleCurrentRef.current[index] = {
        x: boundedX,
        y: boundedY,
        velocityX: nextX.velocity,
        velocityY: nextY.velocity,
      };

      setParticleStyle(index, boundedX, boundedY);

      const settledX = Math.abs(boundedX - target.x) < PARTICLE_REPEL_CONFIG.settleThreshold;
      const settledY = Math.abs(boundedY - target.y) < PARTICLE_REPEL_CONFIG.settleThreshold;
      const slowedX = Math.abs(nextX.velocity) < PARTICLE_REPEL_CONFIG.settleThreshold;
      const slowedY = Math.abs(nextY.velocity) < PARTICLE_REPEL_CONFIG.settleThreshold;

      if (!settledX || !settledY || !slowedX || !slowedY) {
        hasMotionRemaining = true;
      }
    });

    if (hasMotionRemaining) {
      particleFrameRef.current = requestAnimationFrame(runParticleAnimation);
      return;
    }

    if (!particleInteractionActiveRef.current) {
      particleCurrentRef.current = dustParticles.map(() => ({
        x: 0,
        y: 0,
        velocityX: 0,
        velocityY: 0,
      }));
      dustParticleRefs.current.forEach((_, index) => {
        setParticleStyle(index, 0, 0);
      });
    }
  }, [dustParticles, setParticleStyle]);

  const startParticleAnimation = useCallback(() => {
    if (particleFrameRef.current !== null) return;

    particleFrameRef.current = requestAnimationFrame(runParticleAnimation);
  }, [runParticleAnimation]);

  useEffect(() => {
    particleInteractionActiveRef.current = false;
    particleTargetRef.current = dustParticles.map(() => ({ x: 0, y: 0 }));
    particleCurrentRef.current = dustParticles.map(() => ({
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
    }));
    dustParticleRefs.current = dustParticles.map(() => null);

    stopParticleAnimation();

    dustParticles.forEach((_, index) => {
      setParticleStyle(index, 0, 0);
    });
  }, [dustParticles, setParticleStyle, stopParticleAnimation]);

  const setTypographyStyles = useCallback(
    (
      element: HTMLHeadingElement | null,
      x: number,
      y: number,
      skewX: number,
      skewY: number
    ) => {
      if (!element) return;

      element.style.setProperty("--type-x", `${x}px`);
      element.style.setProperty("--type-y", `${y}px`);
      element.style.setProperty("--type-skew-x", `${skewX}deg`);
      element.style.setProperty("--type-skew-y", `${skewY}deg`);
    },
    []
  );

  const stopTypographyAnimation = useCallback(() => {
    if (typographyFrameRef.current !== null) {
      cancelAnimationFrame(typographyFrameRef.current);
      typographyFrameRef.current = null;
    }
  }, []);

  const runTypographyAnimation = useCallback(() => {
    typographyFrameRef.current = null;

    const target = typographyTargetRef.current;
    const current = typographyCurrentRef.current;
    const rearTargetX = clamp(
      target.x * TEXT_DISTORTION_CONFIG.rear.maxOffsetX,
      -TEXT_DISTORTION_CONFIG.rear.maxOffsetX,
      TEXT_DISTORTION_CONFIG.rear.maxOffsetX
    );
    const rearTargetY = clamp(
      -target.y * TEXT_DISTORTION_CONFIG.rear.maxOffsetY,
      -TEXT_DISTORTION_CONFIG.rear.maxOffsetY,
      TEXT_DISTORTION_CONFIG.rear.maxOffsetY
    );
    const rearTargetSkewX = clamp(
      target.x * TEXT_DISTORTION_CONFIG.rear.maxSkewX,
      -TEXT_DISTORTION_CONFIG.rear.maxSkewX,
      TEXT_DISTORTION_CONFIG.rear.maxSkewX
    );
    const rearTargetSkewY = clamp(
      -target.y * TEXT_DISTORTION_CONFIG.rear.maxSkewY,
      -TEXT_DISTORTION_CONFIG.rear.maxSkewY,
      TEXT_DISTORTION_CONFIG.rear.maxSkewY
    );
    const frontTargetX = clamp(
      target.x * TEXT_DISTORTION_CONFIG.front.maxOffsetX,
      -TEXT_DISTORTION_CONFIG.front.maxOffsetX,
      TEXT_DISTORTION_CONFIG.front.maxOffsetX
    );
    const frontTargetY = clamp(
      -target.y * TEXT_DISTORTION_CONFIG.front.maxOffsetY,
      -TEXT_DISTORTION_CONFIG.front.maxOffsetY,
      TEXT_DISTORTION_CONFIG.front.maxOffsetY
    );
    const frontTargetSkewX = clamp(
      target.x * TEXT_DISTORTION_CONFIG.front.maxSkewX,
      -TEXT_DISTORTION_CONFIG.front.maxSkewX,
      TEXT_DISTORTION_CONFIG.front.maxSkewX
    );
    const frontTargetSkewY = clamp(
      -target.y * TEXT_DISTORTION_CONFIG.front.maxSkewY,
      -TEXT_DISTORTION_CONFIG.front.maxSkewY,
      TEXT_DISTORTION_CONFIG.front.maxSkewY
    );

    const nextRearX = springStep(
      current.rear.x,
      rearTargetX,
      current.rear.velocityX,
      TEXT_DISTORTION_CONFIG.rear.stiffness,
      TEXT_DISTORTION_CONFIG.rear.damping
    );
    const nextRearY = springStep(
      current.rear.y,
      rearTargetY,
      current.rear.velocityY,
      TEXT_DISTORTION_CONFIG.rear.stiffness,
      TEXT_DISTORTION_CONFIG.rear.damping
    );
    const nextRearSkewX = springStep(
      current.rear.skewX,
      rearTargetSkewX,
      current.rear.velocitySkewX,
      TEXT_DISTORTION_CONFIG.rear.stiffness,
      TEXT_DISTORTION_CONFIG.rear.damping
    );
    const nextRearSkewY = springStep(
      current.rear.skewY,
      rearTargetSkewY,
      current.rear.velocitySkewY,
      TEXT_DISTORTION_CONFIG.rear.stiffness,
      TEXT_DISTORTION_CONFIG.rear.damping
    );

    const nextFrontX = springStep(
      current.front.x,
      frontTargetX,
      current.front.velocityX,
      TEXT_DISTORTION_CONFIG.front.stiffness,
      TEXT_DISTORTION_CONFIG.front.damping
    );
    const nextFrontY = springStep(
      current.front.y,
      frontTargetY,
      current.front.velocityY,
      TEXT_DISTORTION_CONFIG.front.stiffness,
      TEXT_DISTORTION_CONFIG.front.damping
    );
    const nextFrontSkewX = springStep(
      current.front.skewX,
      frontTargetSkewX,
      current.front.velocitySkewX,
      TEXT_DISTORTION_CONFIG.front.stiffness,
      TEXT_DISTORTION_CONFIG.front.damping
    );
    const nextFrontSkewY = springStep(
      current.front.skewY,
      frontTargetSkewY,
      current.front.velocitySkewY,
      TEXT_DISTORTION_CONFIG.front.stiffness,
      TEXT_DISTORTION_CONFIG.front.damping
    );

    typographyCurrentRef.current = {
      rear: {
        x: clamp(
          nextRearX.value,
          -TEXT_DISTORTION_CONFIG.rear.maxOffsetX,
          TEXT_DISTORTION_CONFIG.rear.maxOffsetX
        ),
        y: clamp(
          nextRearY.value,
          -TEXT_DISTORTION_CONFIG.rear.maxOffsetY,
          TEXT_DISTORTION_CONFIG.rear.maxOffsetY
        ),
        skewX: clamp(
          nextRearSkewX.value,
          -TEXT_DISTORTION_CONFIG.rear.maxSkewX,
          TEXT_DISTORTION_CONFIG.rear.maxSkewX
        ),
        skewY: clamp(
          nextRearSkewY.value,
          -TEXT_DISTORTION_CONFIG.rear.maxSkewY,
          TEXT_DISTORTION_CONFIG.rear.maxSkewY
        ),
        velocityX: nextRearX.velocity,
        velocityY: nextRearY.velocity,
        velocitySkewX: nextRearSkewX.velocity,
        velocitySkewY: nextRearSkewY.velocity,
      },
      front: {
        x: clamp(
          nextFrontX.value,
          -TEXT_DISTORTION_CONFIG.front.maxOffsetX,
          TEXT_DISTORTION_CONFIG.front.maxOffsetX
        ),
        y: clamp(
          nextFrontY.value,
          -TEXT_DISTORTION_CONFIG.front.maxOffsetY,
          TEXT_DISTORTION_CONFIG.front.maxOffsetY
        ),
        skewX: clamp(
          nextFrontSkewX.value,
          -TEXT_DISTORTION_CONFIG.front.maxSkewX,
          TEXT_DISTORTION_CONFIG.front.maxSkewX
        ),
        skewY: clamp(
          nextFrontSkewY.value,
          -TEXT_DISTORTION_CONFIG.front.maxSkewY,
          TEXT_DISTORTION_CONFIG.front.maxSkewY
        ),
        velocityX: nextFrontX.velocity,
        velocityY: nextFrontY.velocity,
        velocitySkewX: nextFrontSkewX.velocity,
        velocitySkewY: nextFrontSkewY.velocity,
      },
    };

    setTypographyStyles(
      rearTextRef.current,
      typographyCurrentRef.current.rear.x,
      typographyCurrentRef.current.rear.y,
      typographyCurrentRef.current.rear.skewX,
      typographyCurrentRef.current.rear.skewY
    );
    setTypographyStyles(
      frontTextRef.current,
      typographyCurrentRef.current.front.x,
      typographyCurrentRef.current.front.y,
      typographyCurrentRef.current.front.skewX,
      typographyCurrentRef.current.front.skewY
    );

    const rearSettled =
      Math.abs(typographyCurrentRef.current.rear.x - rearTargetX) <
        TEXT_DISTORTION_CONFIG.settleThreshold &&
      Math.abs(typographyCurrentRef.current.rear.y - rearTargetY) <
        TEXT_DISTORTION_CONFIG.settleThreshold &&
      Math.abs(typographyCurrentRef.current.rear.skewX - rearTargetSkewX) <
        TEXT_DISTORTION_CONFIG.settleThreshold &&
      Math.abs(typographyCurrentRef.current.rear.skewY - rearTargetSkewY) <
        TEXT_DISTORTION_CONFIG.settleThreshold;

    const frontSettled =
      Math.abs(typographyCurrentRef.current.front.x - frontTargetX) <
        TEXT_DISTORTION_CONFIG.settleThreshold &&
      Math.abs(typographyCurrentRef.current.front.y - frontTargetY) <
        TEXT_DISTORTION_CONFIG.settleThreshold &&
      Math.abs(typographyCurrentRef.current.front.skewX - frontTargetSkewX) <
        TEXT_DISTORTION_CONFIG.settleThreshold &&
      Math.abs(typographyCurrentRef.current.front.skewY - frontTargetSkewY) <
        TEXT_DISTORTION_CONFIG.settleThreshold;

    if (!rearSettled || !frontSettled) {
      typographyFrameRef.current = requestAnimationFrame(runTypographyAnimation);
      return;
    }

    if (!target.active) {
      typographyCurrentRef.current = {
        rear: {
          x: 0,
          y: 0,
          skewX: 0,
          skewY: 0,
          velocityX: 0,
          velocityY: 0,
          velocitySkewX: 0,
          velocitySkewY: 0,
        },
        front: {
          x: 0,
          y: 0,
          skewX: 0,
          skewY: 0,
          velocityX: 0,
          velocityY: 0,
          velocitySkewX: 0,
          velocitySkewY: 0,
        },
      };
      setTypographyStyles(rearTextRef.current, 0, 0, 0, 0);
      setTypographyStyles(frontTextRef.current, 0, 0, 0, 0);
    }
  }, [setTypographyStyles]);

  const startTypographyAnimation = useCallback(() => {
    if (typographyFrameRef.current !== null) return;

    typographyFrameRef.current = requestAnimationFrame(runTypographyAnimation);
  }, [runTypographyAnimation]);

  const runMagneticAnimation = useCallback(() => {
    magneticFrameRef.current = null;

    const target = magneticTargetRef.current;
    const current = magneticCurrentRef.current;
    const easing = target.active
      ? MAGNETIC_CONFIG.followLerp
      : MAGNETIC_CONFIG.returnLerp;

    const nextX = lerp(current.x, target.x, easing);
    const nextY = lerp(current.y, target.y, easing);
    const nextRotateX = lerp(current.rotateX, target.y * -MAGNETIC_CONFIG.maxRotateX, easing);
    const nextRotateY = lerp(current.rotateY, target.x * MAGNETIC_CONFIG.maxRotateY, easing);
    const hoverIntensity = clamp(
      1 - Math.max(Math.abs(target.x), Math.abs(target.y)) * 0.65,
      0,
      1
    );
    const nextScale = lerp(
      current.scale,
      1 + hoverIntensity * (MAGNETIC_CONFIG.maxScale - 1),
      easing
    );

    magneticCurrentRef.current = {
      x: nextX,
      y: nextY,
      rotateX: nextRotateX,
      rotateY: nextRotateY,
      scale: nextScale,
    };

    setMagneticStyles(nextX, nextY, nextRotateX, nextRotateY, nextScale);

    const hasSettled =
      Math.abs(nextX - target.x) < MAGNETIC_CONFIG.settleThreshold &&
      Math.abs(nextY - target.y) < MAGNETIC_CONFIG.settleThreshold &&
      Math.abs(nextRotateX - target.y * -MAGNETIC_CONFIG.maxRotateX) <
        MAGNETIC_CONFIG.settleThreshold &&
      Math.abs(nextRotateY - target.x * MAGNETIC_CONFIG.maxRotateY) <
        MAGNETIC_CONFIG.settleThreshold &&
      Math.abs(nextScale - (1 + hoverIntensity * (MAGNETIC_CONFIG.maxScale - 1))) <
        MAGNETIC_CONFIG.settleThreshold;

    if (!hasSettled) {
      magneticFrameRef.current = requestAnimationFrame(runMagneticAnimation);
      return;
    }

    if (!target.active) {
      magneticCurrentRef.current = {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      };
      setMagneticStyles(0, 0, 0, 0, 1);
    }
  }, [setMagneticStyles]);

  const startMagneticAnimation = useCallback(() => {
    if (magneticFrameRef.current !== null) return;

    magneticFrameRef.current = requestAnimationFrame(runMagneticAnimation);
  }, [runMagneticAnimation]);

  const handleMagneticPointerMove = useCallback(
    (event: PointerEvent) => {
      if (
        prefersReducedMotion ||
        !isDesktop ||
        !portraitRef.current ||
        !portraitMagneticRef.current
      ) {
        return;
      }

      const bounds = portraitRef.current.getBoundingClientRect();
      const normalizedX = clamp(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -1,
        1
      );
      const normalizedY = clamp(
        ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
        -1,
        1
      );

      magneticTargetRef.current = {
        x: normalizedX,
        y: normalizedY,
        active: true,
      };

      startMagneticAnimation();
    },
    [isDesktop, prefersReducedMotion, startMagneticAnimation]
  );

  const handleMagneticPointerEnter = useCallback(() => {
    if (prefersReducedMotion || !isDesktop) return;

    magneticTargetRef.current.active = true;
    startMagneticAnimation();
  }, [isDesktop, prefersReducedMotion, startMagneticAnimation]);

  const handleMagneticPointerLeave = useCallback(() => {
    magneticTargetRef.current = {
      x: 0,
      y: 0,
      active: false,
    };
    startMagneticAnimation();
  }, [startMagneticAnimation]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      // Disable parallax on touch devices entirely
      if (prefersReducedMotion || !stageRef.current || !isDesktop) return;

      const bounds =
        stageRef.current.getBoundingClientRect();

      const x =
        ((event.clientX - bounds.left) / bounds.width -
          0.5) *
        2;

      const y =
        ((event.clientY - bounds.top) / bounds.height -
          0.5) *
        2;

      setAuroraStyles(x * 18, y * 10, x * 1.6);

      portraitRef.current?.style.setProperty(
        "--parallax-x",
        `${x * ANIMATION_CONFIG.parallax.portraitX}px`
      );

      rearTextRef.current?.style.setProperty(
        "--parallax-x",
        `${x * ANIMATION_CONFIG.parallax.rearX}px`
      );

      frontTextRef.current?.style.setProperty(
        "--parallax-x",
        `${x * ANIMATION_CONFIG.parallax.frontX}px`
      );

      const textBounds = stageRef.current.getBoundingClientRect();
      typographyTargetRef.current = {
        x: clamp(
          ((event.clientX - textBounds.left) / textBounds.width) * 2 - 1,
          -1,
          1
        ),
        y: clamp(
          ((event.clientY - textBounds.top) / textBounds.height) * 2 - 1,
          -1,
          1
        ),
        active: true,
      };

      startTypographyAnimation();

      if (dustParticles.length > 0) {
        const cursorX = clamp(
          ((event.clientX - textBounds.left) / textBounds.width) * 2 - 1,
          -1,
          1
        );
        const cursorY = clamp(
          ((event.clientY - textBounds.top) / textBounds.height) * 2 - 1,
          -1,
          1
        );

        particleInteractionActiveRef.current = true;
        particleTargetRef.current = dustParticleAnchors.map((anchor) => {
          const awayX = anchor.x - cursorX;
          const awayY = anchor.y - cursorY;
          const distance = Math.hypot(awayX, awayY) || 0.0001;
          const influence = clamp(
            1 - distance / PARTICLE_REPEL_CONFIG.radius,
            0,
            1
          );
          const softened = influence * influence;

          return {
            x: clamp(
              (awayX / distance) * PARTICLE_REPEL_CONFIG.maxOffsetX * softened,
              -PARTICLE_REPEL_CONFIG.maxOffsetX,
              PARTICLE_REPEL_CONFIG.maxOffsetX
            ),
            y: clamp(
              (awayY / distance) * PARTICLE_REPEL_CONFIG.maxOffsetY * softened,
              -PARTICLE_REPEL_CONFIG.maxOffsetY,
              PARTICLE_REPEL_CONFIG.maxOffsetY
            ),
          };
        });

        startParticleAnimation();
      }
    },
    [dustParticleAnchors, dustParticles.length, prefersReducedMotion, startParticleAnimation, startTypographyAnimation]
  );

  const throttledPointerMove = useCallback(
    (event: PointerEvent) => {
      // Skip on mobile entirely
      if (!isDesktop) return;
      
      if (pointerTimeoutRef.current) return;

      handlePointerMove(event);

      pointerTimeoutRef.current = setTimeout(() => {
        pointerTimeoutRef.current = null;
      }, 16);
    },
    [handlePointerMove, isDesktop]
  );

  const handlePointerLeave = useCallback(() => {
    setAuroraStyles(0, 0, 0);

    portraitRef.current?.style.removeProperty(
      "--parallax-x"
    );

    rearTextRef.current?.style.removeProperty(
      "--parallax-x"
    );

    frontTextRef.current?.style.removeProperty(
      "--parallax-x"
    );

    typographyTargetRef.current = {
      x: 0,
      y: 0,
      active: false,
    };

    particleInteractionActiveRef.current = false;
    particleTargetRef.current = dustParticles.map(() => ({ x: 0, y: 0 }));

    startTypographyAnimation();
    startParticleAnimation();
  }, [dustParticles, setAuroraStyles, startParticleAnimation, startTypographyAnimation]);

  useEffect(() => {
    const stage = stageRef.current;
    const portrait = portraitRef.current;

    if (!stage) return;

    stage.addEventListener(
      "pointermove",
      throttledPointerMove
    );

    stage.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    portrait?.addEventListener(
      "pointerenter",
      handleMagneticPointerEnter
    );

    portrait?.addEventListener(
      "pointermove",
      handleMagneticPointerMove
    );

    portrait?.addEventListener(
      "pointerleave",
      handleMagneticPointerLeave
    );

    return () => {
      stage.removeEventListener(
        "pointermove",
        throttledPointerMove
      );

      stage.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      portrait?.removeEventListener(
        "pointerenter",
        handleMagneticPointerEnter
      );

      portrait?.removeEventListener(
        "pointermove",
        handleMagneticPointerMove
      );

      portrait?.removeEventListener(
        "pointerleave",
        handleMagneticPointerLeave
      );

      if (pointerTimeoutRef.current) {
        clearTimeout(pointerTimeoutRef.current);
      }

      stopMagneticAnimation();
      stopTypographyAnimation();
      stopParticleAnimation();
    };
  }, [
    handleMagneticPointerEnter,
    handleMagneticPointerLeave,
    handleMagneticPointerMove,
    handlePointerLeave,
    stopMagneticAnimation,
    stopParticleAnimation,
    stopTypographyAnimation,
    throttledPointerMove,
  ]);

  return (
    <section
      id="hero"
      ref={stageRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-obsidian pb-10 pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#09111f_0%,#050505_52%,#0b0710_100%)]" />

      <AuroraBackdropComponent
        reduceMotion={prefersReducedMotion}
        isDesktop={isDesktop}
        backdropRef={auroraBackdropRef}
      />

      {/* Animated Grid */}
      <AnimatedGrid className="opacity-20 mix-blend-soft-light" />

      {/* Decorative Elements */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-[-9rem] top-16 size-[24rem] rounded-full bg-arctic/6 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-10rem] size-[28rem] rounded-full bg-wine/6 blur-3xl" />

        <DustParticlesComponent
          particles={dustParticles}
          reduceMotion={prefersReducedMotion}
          particleRefs={dustParticleRefs}
        />
      </div>

      <Container className="relative z-10">
        <div className="relative min-h-[48rem] pt-8 sm:min-h-[56rem] lg:min-h-[calc(100vh-5rem)]">

          {/* Rear Text */}
          <motion.h1
            ref={rearTextRef}
            variants={rearTextVariants}
            initial="hidden"
            animate="visible"
            className="
                      pointer-events-none
                      absolute
                      left-1/2

                      top-[24%]
                      sm:top-[22%]
                      md:top-[18%]
                      lg:top-[24%]

                      z-10
                      hidden
                      sm:block

                      -ml-[50vw]
                      w-[100vw]

                      bg-gradient-to-r
                      from-platinum
                      via-arctic
                      to-wine

                      bg-clip-text
                      text-center
                      font-display

                      text-[clamp(8rem,26vw,26rem)]

                      font-black
                      leading-[0.74]
                      tracking-[-0.08em]

                      text-transparent
                      opacity-95
                    "
            style={{
              transform:
                "translateX(var(--parallax-x, 0px)) translate3d(var(--type-x, 0px), var(--type-y, 0px), 0) skewX(var(--type-skew-x, 0deg)) skewY(var(--type-skew-y, 0deg))",
              willChange: "transform, opacity, filter",
              transition:
                "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {heroData.nameLines[0]}
          </motion.h1>

          {/* Portrait */}
          <motion.div
            ref={portraitRef}
            variants={portraitVariants}
            initial="hidden"
            animate="visible"
            className="
                      absolute
                      left-1/2

                      top-[10%]
                      sm:top-[6%]
                      md:top-[3%]
                      lg:top-[5%]

                      z-30

                      -ml-[11.5rem]
                      sm:-ml-[14.5rem]

                      h-[32rem]
                      sm:h-[39rem]

                      w-[23rem]
                      sm:w-[29rem]
                    "
            style={{
              transform:
                "translateX(var(--parallax-x, 0px))",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
              transition:
                "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <div
              ref={portraitMagneticRef}
              className="relative h-full w-full"
              style={{
                transform:
                  "perspective(1200px) translate3d(var(--magnetic-x, 0px), var(--magnetic-y, 0px), 0) rotateX(var(--magnetic-rotate-x, 0deg)) rotateY(var(--magnetic-rotate-y, 0deg)) scale(var(--magnetic-scale, 1))",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform",
              }}
            >
              {/* Mobile Text */}
              <div className="
                            pointer-events-none
                            absolute
                            inset-x-0

                            bottom-[-10%]

                            z-20
                            flex
                            flex-col
                            items-center
                            gap-1

                            sm:hidden
                          ">
                <span
                  className="
                          bg-gradient-to-r
                          from-platinum
                          via-arctic
                          to-wine

                          bg-clip-text
                          text-center
                          font-display

                          text-[clamp(4rem,16vw,5rem)]

                          font-black
                          leading-[0.84]
                          tracking-[-0.07em]

                          text-transparent

                          drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]
                        "
                >
                  {heroData.nameLines[0]}
                </span>

                <span
                  className="
                          bg-gradient-to-r
                          from-ember
                          via-platinum
                          to-arctic

                          bg-clip-text
                          text-center
                          font-display

                          text-[clamp(3.5rem,14vw,5rem)]

                          font-black
                          leading-[0.84]
                          tracking-[-0.06em]

                          text-transparent

                          drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]
                        "
                >
                  {heroData.nameLines[1]}
                </span>
              </div>

              {imageFailed ? (
                <div className="grid h-full place-items-center rounded-b-[8rem] bg-gradient-to-b from-white/12 to-white/[0.02]">
                  <span className="font-display text-8xl font-black text-platinum/76">
                    {siteData.shortName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                </div>
              ) : (
                <img
                  src={heroData.portrait}
                  alt={heroData.portraitAlt}
                  className="h-full w-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>
          </motion.div>

          {/* Front Text */}
          <motion.h1
            ref={frontTextRef}
            variants={frontTextVariants}
            initial="hidden"
            animate="visible"
            className="
                      pointer-events-none
                          absolute

                          bottom-[4%]
                          sm:bottom-[2%]
                          md:bottom-[25%]
                          lg:bottom-[14%]

                          left-1/2
                          z-40

                          hidden
                          sm:block

                          -ml-[50vw]
                          w-[100vw]

                          bg-gradient-to-r
                          from-ember
                          via-platinum
                          to-arctic

                          bg-clip-text
                          text-center
                          font-display

                          text-[clamp(4.4rem,14vw,13.25rem)]

                          font-black
                          leading-[0.78]
                          tracking-[-0.06em]

                          text-transparent
                          opacity-95
                        "
            style={{
              transform:
                "translateX(var(--parallax-x, 0px)) translate3d(var(--type-x, 0px), var(--type-y, 0px), 0) skewX(var(--type-skew-x, 0deg)) skewY(var(--type-skew-y, 0deg))",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.96) 22%, #000 58%, #000 100%)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.96) 22%, #000 58%, #000 100%)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "0% 50%",
              maskPosition: "0% 50%",
              WebkitMaskSize: "220% 100%",
              maskSize: "220% 100%",
              willChange: "transform, opacity, mask-size",
              transition:
                "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {heroData.nameLines[1]}
          </motion.h1>

        </div>
      </Container>
    </section>
  );
});