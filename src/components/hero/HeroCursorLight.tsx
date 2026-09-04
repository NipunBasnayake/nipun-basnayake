import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { HeroVariant } from "../../data/heroTools";

interface HeroCursorLightProps {
  variant: HeroVariant;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduceMotion: boolean;
}

export function HeroCursorLight({
  variant,
  pointerX,
  pointerY,
  reduceMotion,
}: HeroCursorLightProps) {
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 24, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 24, mass: 0.5 });

  // Map -1..1 to percentage offsets across the hero
  const lightX = useTransform(smoothX, [-1, 1], ["25%", "75%"]);
  const lightY = useTransform(smoothY, [-1, 1], ["20%", "80%"]);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: lightX,
          top: lightY,
          width: "clamp(24rem, 45vw, 42rem)",
          height: "clamp(24rem, 45vw, 42rem)",
          background:
            variant === "developer"
              ? "radial-gradient(circle, rgba(134, 244, 255, 0.08) 0%, rgba(56, 189, 248, 0.04) 35%, rgba(0, 0, 0, 0) 70%)"
              : "radial-gradient(circle, rgba(162, 41, 255, 0.09) 0%, rgba(255, 90, 61, 0.05) 38%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
