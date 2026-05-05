import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

interface GradientBlobProps {
  className?: string;
  colors?: string;
  delay?: number;
}

export function GradientBlob({
  className,
  colors = "from-ember/35 via-arctic/20 to-wine/30",
  delay = 0,
}: GradientBlobProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute rounded-[42%_58%_70%_30%/35%_35%_65%_65%] bg-gradient-to-br blur-3xl",
        colors,
        className,
      )}
      aria-hidden="true"
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 42, -20, 0],
              y: [0, -34, 28, 0],
              rotate: [0, 8, -6, 0],
              scale: [1, 1.12, 0.96, 1],
            }
      }
      transition={{ duration: 16, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
