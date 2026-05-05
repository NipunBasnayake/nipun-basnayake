import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { heroData, siteData } from "../../data/portfolio";
import { Container } from "../common/Container";
import { AnimatedGrid } from "../ui/AnimatedGrid";

const dustParticles = Array.from({ length: 16 }, (_, index) => ({
  id: `dust-${index}`,
  left: `${(index * 17 + 11) % 100}%`,
  top: `${(index * 13 + 9) % 100}%`,
  size: 1.5 + (index % 3) * 0.8,
  duration: 12 + (index % 4) * 2.5,
  delay: index * 0.35,
  driftX: index % 2 === 0 ? 14 : -12,
  driftY: index % 3 === 0 ? -10 : 8,
}));

const glowBlobs = [
  {
    className: "left-[-7rem] top-16 size-[24rem] bg-arctic/14",
    animate: { x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.08, 1] },
    delay: 0,
  },
  {
    className: "right-[-8rem] top-28 size-[30rem] bg-wine/12",
    animate: { x: [0, -20, 0], y: [0, 16, 0], scale: [1, 1.06, 1] },
    delay: 0.8,
  },
  {
    className: "left-[18%] bottom-[-10rem] size-[26rem] bg-ember/12",
    animate: { x: [0, 16, 0], y: [0, -12, 0], scale: [1, 1.04, 1] },
    delay: 1.2,
  },
];

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const rearTextRef = useRef<HTMLHeadingElement>(null);
  const frontTextRef = useRef<HTMLHeadingElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const portrait = portraitRef.current;
    const rearText = rearTextRef.current;
    const frontText = frontTextRef.current;

    if (!stage || !portrait || !rearText || !frontText || reduceMotion) {
      return;
    }

    const portraitX = gsap.quickTo(portrait, "x", { duration: 1.2, ease: "power3.out" });
    const rearX = gsap.quickTo(rearText, "x", { duration: 1.2, ease: "power3.out" });
    const frontX = gsap.quickTo(frontText, "x", { duration: 1.2, ease: "power3.out" });

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;

      portraitX(x * -8);
      rearX(x * 10);
      frontX(x * -12);
    };

    const handlePointerLeave = () => {
      portraitX(0);
      rearX(0);
      frontX(0);
    };

    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduceMotion]);

  return (
    <section
      id="hero"
      ref={stageRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-obsidian pb-10 pt-20"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#09111f_0%,#050505_52%,#0b0710_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(134,244,255,0.12),transparent_24%),radial-gradient(circle_at_16%_20%,rgba(162,41,255,0.08),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(255,90,61,0.06),transparent_28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(249,115,22,0.1),transparent_24%),radial-gradient(circle_at_50%_82%,rgba(244,240,232,0.06),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[linear-gradient(180deg,rgba(244,240,232,0.08)_0%,rgba(244,240,232,0.02)_30%,transparent_72%)] opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-[26rem] bg-[linear-gradient(0deg,rgba(5,5,5,0.82)_0%,rgba(5,5,5,0.1)_58%,transparent_100%)]" />
      <AnimatedGrid className="opacity-25" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {glowBlobs.map((blob, index) => (
          <motion.div
            key={blob.className}
            className={`absolute rounded-full blur-3xl ${blob.className}`}
            style={{ opacity: 0.12 + index * 0.02 }}
            animate={reduceMotion ? undefined : blob.animate}
            transition={{ duration: 18 + index * 4, repeat: Infinity, ease: "easeInOut", delay: blob.delay }}
          />
        ))}

        {dustParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-platinum/70 shadow-[0_0_14px_rgba(244,240,232,0.18)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: 0.12,
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, particle.driftX, 0],
                    y: [0, particle.driftY, 0],
                    opacity: [0.1, 0.28, 0.1],
                  }
            }
            transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,240,232,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,240,232,0.03)_1px,transparent_1px)] bg-[size:160px_160px] opacity-[0.08]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(5,5,5,0.36)_100%)]" />
      </div>

      <Container className="relative z-10">
        <div className="relative min-h-[48rem] pt-8 sm:min-h-[56rem] lg:min-h-[calc(100vh-5rem)]">
          <h1 className="sr-only">Nipun Basnayaka</h1>
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 px-4 text-center sm:hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-[20rem] w-[16rem]">
                {imageFailed ? (
                  <div className="grid h-full place-items-center rounded-b-[8rem] bg-gradient-to-b from-white/12 to-white/[0.02]">
                    <span className="font-display text-7xl font-black text-platinum/76">
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
                    className="h-full w-full object-contain object-bottom drop-shadow-[0_28px_40px_rgba(0,0,0,0.62)]"
                    onError={() => setImageFailed(true)}
                  />
                )}
              </div>

              <h1 className="bg-gradient-to-r from-platinum via-arctic to-wine bg-clip-text font-display text-[clamp(3.2rem,16vw,5.6rem)] font-black leading-[0.9] tracking-[-0.08em] text-transparent">
                {heroData.nameLines[0]}
              </h1>
              <h2 className="bg-gradient-to-r from-ember via-platinum to-arctic bg-clip-text font-display text-[clamp(2.7rem,14vw,4.8rem)] font-black leading-[0.92] tracking-[-0.08em] text-transparent">
                {heroData.nameLines[1]}
              </h2>
            </motion.div>

            <motion.h1
              ref={rearTextRef}
              className="pointer-events-none absolute left-1/2 top-[35%] z-10 hidden -ml-[68vw] w-[136vw] bg-gradient-to-r from-platinum via-arctic to-wine bg-clip-text text-center font-display text-[clamp(6.4rem,20vw,19rem)] font-black leading-[0.74] tracking-[-0.08em] text-transparent opacity-95 sm:block sm:top-[24%]"
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroData.nameLines[0]}
            </motion.h1>

            <motion.div
              ref={portraitRef}
              className="absolute left-1/2 top-[16%] z-30 -ml-[10.5rem] h-[28rem] w-[21rem] overflow-visible sm:top-[5%] sm:-ml-[14.5rem] sm:h-[39rem] sm:w-[29rem] lg:-ml-[16rem] lg:h-[43rem] lg:w-[32rem]"
              initial={{ opacity: 0, y: 70, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                y: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
            >
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

            <motion.h1
              ref={frontTextRef}
              className="pointer-events-none absolute bottom-[23%] left-1/2 z-40 hidden -ml-[73vw] w-[146vw] bg-gradient-to-r from-ember via-platinum to-arctic bg-clip-text text-center font-display text-[clamp(4.4rem,14vw,13.25rem)] font-black leading-[0.78] tracking-[-0.06em] text-transparent opacity-95 sm:block sm:bottom-[14%]"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroData.nameLines[1]}
            </motion.h1>
          </div>
        </div>
      </Container>
    </section>
  );
}
