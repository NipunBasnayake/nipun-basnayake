import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useState } from "react";
import type { HeroFloatingTool, HeroVariant } from "../../data/heroTools";
import { cn } from "../../lib/utils";

interface FloatingToolNodeProps {
  tool: HeroFloatingTool;
  variant: HeroVariant;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduceMotion: boolean;
  entranceDelay?: number;
}

export function FloatingToolNode({
  tool,
  variant,
  pointerX,
  pointerY,
  reduceMotion,
  entranceDelay = 0.5,
}: FloatingToolNodeProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const isDeveloper = variant === "developer";
  const depth = tool.depth;

  // Parallax multipliers based on depth
  const defaultParallax =
    depth === "near" ? 18 : depth === "middle" ? 9 : -4;
  const pX = tool.parallax?.x ?? defaultParallax;
  const pY = tool.parallax?.y ?? (defaultParallax * 0.7);

  const parallaxX = useTransform(pointerX, (val) => val * pX);
  const parallaxY = useTransform(pointerY, (val) => val * pY);

  // Depth styling configuration
  const depthConfig = {
    far: {
      zIndex: 12,
      opacity: isDeveloper ? 0.42 : 0.38,
      blur: 4.5,
      scale: 0.86,
      border: isDeveloper
        ? "border-arctic/10 bg-[#06101c]/40"
        : "border-white/10 bg-[#160a18]/40",
      glow: "drop-shadow(0 10px 24px rgba(0,0,0,0.3))",
      sheen: "rgba(255,255,255,0.03)",
    },
    middle: {
      zIndex: 28,
      opacity: isDeveloper ? 0.82 : 0.78,
      blur: 0,
      scale: 0.98,
      border: isDeveloper
        ? "border-arctic/25 bg-[#071322]/65 shadow-[0_0_20px_rgba(134,244,255,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]"
        : "border-wine/25 bg-[#1a0c1e]/65 shadow-[0_0_20px_rgba(162,41,255,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]",
      glow: isDeveloper
        ? "drop-shadow(0 0 16px rgba(134,244,255,0.18)) drop-shadow(0 12px 28px rgba(0,0,0,0.35))"
        : "drop-shadow(0 0 16px rgba(162,41,255,0.18)) drop-shadow(0 12px 28px rgba(0,0,0,0.35))",
      sheen: isDeveloper
        ? "linear-gradient(135deg, rgba(134,244,255,0.12) 0%, transparent 45%)"
        : "linear-gradient(135deg, rgba(255,90,61,0.12) 0%, transparent 45%)",
    },
    near: {
      zIndex: 48,
      opacity: 1,
      blur: 0,
      scale: 1.1,
      border: isDeveloper
        ? "border-arctic/40 bg-[#08182c]/80 shadow-[0_0_36px_rgba(134,244,255,0.22),inset_0_1px_0_rgba(255,255,255,0.22),0_20px_45px_rgba(0,0,0,0.45)]"
        : "border-wine/35 bg-[#200e26]/80 shadow-[0_0_36px_rgba(162,41,255,0.22),0_0_18px_rgba(255,90,61,0.12),inset_0_1px_0_rgba(255,255,255,0.2),0_20px_45px_rgba(0,0,0,0.45)]",
      glow: isDeveloper
        ? "drop-shadow(0 0 28px rgba(134,244,255,0.32)) drop-shadow(0 16px 36px rgba(0,0,0,0.45))"
        : "drop-shadow(0 0 28px rgba(162,41,255,0.28)) drop-shadow(0 0 16px rgba(255,90,61,0.2)) drop-shadow(0 16px 36px rgba(0,0,0,0.45))",
      sheen: isDeveloper
        ? "linear-gradient(135deg, rgba(134,244,255,0.18) 0%, rgba(255,255,255,0.08) 25%, transparent 55%)"
        : "linear-gradient(135deg, rgba(255,90,61,0.18) 0%, rgba(162,41,255,0.12) 30%, transparent 55%)",
    },
  }[depth];

  // Priority-based responsive visibility classes
  const visibilityClass = (() => {
    if (tool.mobilePriority <= 2) return "block";
    if (tool.mobilePriority <= 4) return "hidden sm:block";
    if (tool.mobilePriority <= 6) return "hidden md:block";
    return "hidden lg:block";
  })();

  const baseSize = tool.size;
  const responsiveSize = `clamp(${Math.round(baseSize * 0.65)}px, ${(baseSize * 0.075).toFixed(2)}vw, ${baseSize}px)`;

  return (
    <motion.div
      className={cn("pointer-events-none absolute select-none", visibilityClass)}
      style={{
        zIndex: depthConfig.zIndex,
        width: responsiveSize,
        height: responsiveSize,
        ...tool.position,
      }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.8, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.65,
        delay: entranceDelay + (tool.motion?.delay ?? 0) * 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full"
        style={{
          x: reduceMotion ? 0 : parallaxX,
          y: reduceMotion ? 0 : parallaxY,
        }}
      >
        <motion.div
          className="relative grid h-full w-full place-items-center"
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
          style={{
            opacity: depthConfig.opacity,
            scale: depthConfig.scale,
            filter: `blur(${depthConfig.blur}px) ${depthConfig.glow}`,
            willChange: reduceMotion ? "auto" : "transform",
          }}
        >
          {/* Glass Card Surface */}
          <div
            className={cn(
              "relative grid h-full w-full place-items-center overflow-hidden rounded-2xl border p-2 backdrop-blur-md transition-all duration-300 sm:rounded-[1.4rem] sm:p-2.5",
              depthConfig.border,
            )}
          >
            {/* Tech / Craft Corner Mark for Near and Middle Tools */}
            {depth === "near" && (
              <>
                <span
                  className={cn(
                    "absolute left-1.5 top-1.5 size-1 rounded-full",
                    isDeveloper ? "bg-arctic" : "bg-ember",
                  )}
                />
                <span
                  className={cn(
                    "absolute right-1.5 bottom-1.5 size-1 rounded-full",
                    isDeveloper ? "bg-arctic/50" : "bg-wine/60",
                  )}
                />
              </>
            )}

            {/* Logo Image */}
            {tool.image && !imageFailed ? (
              <img
                src={tool.image}
                alt=""
                className="h-full w-full object-contain p-1"
                draggable={false}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <span className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-platinum/70 sm:text-xs">
                {tool.shortLabel}
              </span>
            )}

            {/* Surface Sheen Overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{ background: depthConfig.sheen }}
            />
          </div>

          {/* Type B / Node Technical Label Fragment (For Developer Middle tools) */}
          {isDeveloper && depth === "middle" && (
            <span className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-arctic/15 bg-obsidian/80 px-1.5 py-0.5 font-mono text-[0.55rem] tracking-widest text-arctic/60 backdrop-blur-sm">
              {tool.shortLabel.toLowerCase()}.node
            </span>
          )}

          {/* Type A / Creative Badge (For Designer Near tools) */}
          {!isDeveloper && depth === "near" && (
            <span className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-wine/20 bg-obsidian/80 px-2 py-0.5 font-mono text-[0.52rem] uppercase tracking-widest text-platinum/60 backdrop-blur-sm">
              {tool.shortLabel}
            </span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
