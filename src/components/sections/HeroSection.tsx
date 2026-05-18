import { motion, useReducedMotion, type Transition } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
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

  blur: {
    glow: "blur-2xl",
  },
};

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

const GLOW_BLOBS = [
  {
    className: "left-[-7rem] top-16 size-[24rem] bg-arctic/14",
    animate: {
      x: [0, 12, 0],
      y: [0, -9, 0],
      scale: [1, 1.04, 1],
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0,
    },
  },
  {
    className: "right-[-8rem] top-28 size-[30rem] bg-wine/12",
    animate: {
      x: [0, -10, 0],
      y: [0, 8, 0],
      scale: [1, 1.03, 1],
    },
    transition: {
      duration: 22,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.8,
    },
  },
  {
    className: "left-[18%] bottom-[-10rem] size-[26rem] bg-ember/12",
    animate: {
      x: [0, 8, 0],
      y: [0, -6, 0],
      scale: [1, 1.02, 1],
    },
    transition: {
      duration: 24,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1.2,
    },
  },
];

interface GlowBlobsProps {
  reduceMotion: boolean;
}

const GlowBlobsComponent = memo(
  function GlowBlobs({
    reduceMotion,
  }: GlowBlobsProps) {
    return (
      <>
        {GLOW_BLOBS.map((blob, index) => (
          <motion.div
            key={`glow-${index}`}
            className={`absolute rounded-full ${ANIMATION_CONFIG.blur.glow} ${blob.className}`}
            style={{
              opacity: 0.08 + index * 0.02,
              willChange: "transform",
            }}
            animate={reduceMotion ? undefined : blob.animate}
            transition={reduceMotion ? undefined : (blob.transition as Transition)}
          />
        ))}
      </>
    );
  }
);

interface DustParticlesProps {
  particles: ReturnType<typeof createDustParticles>;
  reduceMotion: boolean;
}

const DustParticlesComponent = memo(
  function DustParticles({
    particles,
    reduceMotion,
  }: DustParticlesProps) {
    return (
      <>
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-platinum/70 shadow-[0_0_14px_rgba(244,240,232,0.14)]"
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
          />
        ))}
      </>
    );
  }
);

export const HeroSection = memo(function HeroSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const stageRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const rearTextRef = useRef<HTMLHeadingElement | null>(null);
  const frontTextRef = useRef<HTMLHeadingElement | null>(null);

  const [imageFailed, setImageFailed] = useState(false);

  const dustParticles = useMemo(
    () => createDustParticles(),
    []
  );

  const pointerTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (prefersReducedMotion || !stageRef.current) return;

      const bounds =
        stageRef.current.getBoundingClientRect();

      const x =
        ((event.clientX - bounds.left) / bounds.width -
          0.5) *
        2;

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
    },
    [prefersReducedMotion]
  );

  const throttledPointerMove = useCallback(
    (event: PointerEvent) => {
      if (pointerTimeoutRef.current) return;

      handlePointerMove(event);

      pointerTimeoutRef.current = setTimeout(() => {
        pointerTimeoutRef.current = null;
      }, 16);
    },
    [handlePointerMove]
  );

  const handlePointerLeave = useCallback(() => {
    portraitRef.current?.style.removeProperty(
      "--parallax-x"
    );

    rearTextRef.current?.style.removeProperty(
      "--parallax-x"
    );

    frontTextRef.current?.style.removeProperty(
      "--parallax-x"
    );
  }, []);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    stage.addEventListener(
      "pointermove",
      throttledPointerMove
    );

    stage.addEventListener(
      "pointerleave",
      handlePointerLeave
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

      if (pointerTimeoutRef.current) {
        clearTimeout(pointerTimeoutRef.current);
      }
    };
  }, [throttledPointerMove, handlePointerLeave]);

  return (
    <section
      id="hero"
      ref={stageRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-obsidian pb-10 pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#09111f_0%,#050505_52%,#0b0710_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(78%_52%_at_50%_14%,rgba(134,244,255,0.13)_0%,rgba(134,244,255,0)_66%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_42%_at_84%_28%,rgba(255,90,61,0.16)_0%,rgba(255,90,61,0)_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(255,90,61,0.06)_0%,rgba(134,244,255,0.04)_42%,rgba(0,0,0,0)_72%)]" />

      {/* Animated Grid */}
      <AnimatedGrid className="opacity-25" />

      {/* Decorative Elements */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-[-9rem] top-16 size-[24rem] rounded-full bg-arctic/12 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-10rem] size-[28rem] rounded-full bg-wine/12 blur-3xl" />

        <GlowBlobsComponent
          reduceMotion={prefersReducedMotion}
        />

        <DustParticlesComponent
          particles={dustParticles}
          reduceMotion={prefersReducedMotion}
        />
      </div>

      <Container className="relative z-10">
        <div className="relative min-h-[48rem] pt-8 sm:min-h-[56rem] lg:min-h-[calc(100vh-5rem)]">

          {/* Rear Text */}
          <motion.h1
            ref={rearTextRef}
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
                "translateX(var(--parallax-x, 0px))",
              transition:
                "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration:
                ANIMATION_CONFIG.sequence.rearText
                  .duration,
              delay:
                ANIMATION_CONFIG.sequence.rearText.delay,
              ease: ANIMATION_CONFIG.easing.entrance,
            }}
          >
            {heroData.nameLines[0]}
          </motion.h1>

          {/* Portrait */}
          <motion.div
            ref={portraitRef}
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
              transition:
                "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            initial={{
              opacity: 0,
              y: 70,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration:
                ANIMATION_CONFIG.sequence.portrait
                  .duration,
              delay:
                ANIMATION_CONFIG.sequence.portrait.delay,
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
                className="h-full w-full object-contain object-bottom drop-shadow-[0_38px_52px_rgba(0,0,0,0.68)]"
                onError={() => setImageFailed(true)}
              />
            )}
          </motion.div>

          {/* Front Text */}
          <motion.h1
            ref={frontTextRef}
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
                "translateX(var(--parallax-x, 0px))",
              transition:
                "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration:
                ANIMATION_CONFIG.sequence.frontText
                  .duration,
              delay:
                ANIMATION_CONFIG.sequence.frontText
                  .delay,
              ease: ANIMATION_CONFIG.easing.entrance,
            }}
          >
            {heroData.nameLines[1]}
          </motion.h1>

        </div>
      </Container>
    </section>
  );
});