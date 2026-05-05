import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedGridProps {
  className?: string;
}

export function AnimatedGrid({ className }: AnimatedGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <motion.div
        className="absolute inset-[-1px] opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,240,232,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,232,0.18) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
        }}
        animate={reduceMotion ? undefined : { backgroundPosition: ["0px 0px", "72px 72px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_50%_50%,rgba(134,244,255,0.12),transparent_30%)]" />
    </div>
  );
}
