import { motion, useReducedMotion } from "framer-motion";
import type { HeroFloatingTool, HeroVariant } from "../../data/heroTools";
import { cn } from "../../lib/utils";

interface FloatingToolsLayerProps {
  tools: HeroFloatingTool[];
  variant: HeroVariant;
}

export function FloatingToolsLayer({ tools, variant }: FloatingToolsLayerProps) {
  const reduceMotion = useReducedMotion();
  const isDeveloper = variant === "developer";

  return (
    <div className="pointer-events-none absolute inset-0 z-[25]" aria-hidden="true">
      {tools.map((tool) => (
        <motion.div
          key={tool.id}
          className={cn(
            "absolute grid aspect-square place-items-center rounded-[1.15rem] border bg-obsidian/30 font-mono font-black uppercase tracking-[0.08em] shadow-[0_12px_34px_rgba(0,0,0,0.26)] backdrop-blur-md",
            tool.priority === "secondary" && "hidden sm:grid",
            isDeveloper
              ? "border-arctic/20 text-arctic/75 shadow-[0_0_32px_rgba(134,244,255,0.1)]"
              : "border-wine/25 text-ember/80 shadow-[0_0_32px_rgba(162,41,255,0.12)]",
          )}
          style={{
            width: tool.size,
            height: tool.size,
            ...tool.position,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, tool.motion.x, 0],
                  y: [0, tool.motion.y, 0],
                  rotate: [0, tool.motion.rotate, 0],
                }
          }
          transition={{
            duration: tool.motion.duration,
            delay: tool.motion.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {tool.image ? (
            <img
              src={tool.image}
              alt=""
              className="h-[58%] w-[58%] object-contain"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="text-[0.72rem] sm:text-xs">{tool.shortLabel}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
