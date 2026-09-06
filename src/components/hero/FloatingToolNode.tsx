import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { type CSSProperties, useState } from "react";
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
  const developerDepthConfig = {
    far: {
      zIndex: 12,
      opacity: 0.42,
      blur: 4.5,
      scale: 0.86,
      border: "border-arctic/10 bg-[#06101c]/40",
      glow: "drop-shadow(0 10px 24px rgba(0,0,0,0.3))",
      sheen: "rgba(255,255,255,0.03)",
    },
    middle: {
      zIndex: 28,
      opacity: 0.82,
      blur: 0,
      scale: 0.98,
      border: "border-arctic/25 bg-[#071322]/65 shadow-[0_0_20px_rgba(134,244,255,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]",
      glow: "drop-shadow(0 0 16px rgba(134,244,255,0.18)) drop-shadow(0 12px 28px rgba(0,0,0,0.35))",
      sheen: "linear-gradient(135deg, rgba(134,244,255,0.12) 0%, transparent 45%)",
    },
    near: {
      zIndex: 48,
      opacity: 1,
      blur: 0,
      scale: 1.1,
      border: "border-arctic/40 bg-[#08182c]/80 shadow-[0_0_36px_rgba(134,244,255,0.22),inset_0_1px_0_rgba(255,255,255,0.22),0_20px_45px_rgba(0,0,0,0.45)]",
      glow: "drop-shadow(0 0 28px rgba(134,244,255,0.32)) drop-shadow(0 16px 36px rgba(0,0,0,0.45))",
      sheen: "linear-gradient(135deg, rgba(134,244,255,0.18) 0%, rgba(255,255,255,0.08) 25%, transparent 55%)",
    },
  }[depth];

  const designerDepthConfig = {
    far: {
      zIndex: 12,
      opacity: 0.34,
      blur: 3,
      scale: 0.86,
      border: "border-white/10 bg-[#160a18]/38 shadow-[0_12px_28px_rgba(0,0,0,0.22)]",
      glow: "drop-shadow(0 10px 22px rgba(0,0,0,0.26))",
      sheen: "linear-gradient(135deg, rgba(255,255,255,0.04), transparent 48%)",
    },
    middle: {
      zIndex: 28,
      opacity: 0.82,
      blur: 0,
      scale: 0.96,
      border: "border-wine/18 bg-[#1b0b20]/72 shadow-[0_0_18px_rgba(162,41,255,0.12),0_14px_32px_rgba(0,0,0,0.32)]",
      glow: "drop-shadow(0 0 14px rgba(162,41,255,0.16)) drop-shadow(0 12px 24px rgba(0,0,0,0.34))",
      sheen: "linear-gradient(135deg, rgba(255,90,61,0.08), transparent 52%)",
    },
    near: {
      zIndex: 48,
      opacity: 0.96,
      blur: 0,
      scale: 1.04,
      border: "border-wine/24 bg-[#211026]/78 shadow-[0_0_24px_rgba(162,41,255,0.16),0_0_12px_rgba(255,90,61,0.08),0_18px_36px_rgba(0,0,0,0.38)]",
      glow: "drop-shadow(0 0 18px rgba(162,41,255,0.2)) drop-shadow(0 14px 28px rgba(0,0,0,0.38))",
      sheen: "linear-gradient(135deg, rgba(255,90,61,0.1), rgba(162,41,255,0.07) 34%, transparent 58%)",
    },
  }[depth];

  const depthConfig = isDeveloper ? developerDepthConfig : designerDepthConfig;

  // Priority-based responsive visibility classes (Show 4 tools on mobile for both developer & designer)
  const visibilityClass = (() => {
    if (tool.mobilePriority <= 4) return "block";
    if (tool.mobilePriority <= 6) return "hidden sm:block";
    return "hidden lg:block";
  })();

  const baseSize = tool.size;
  const mobileScale = isDeveloper ? 0.44 : 0.42;
  const viewportScale = isDeveloper ? 0.065 : 0.06;
  const responsiveSize = `clamp(${Math.round(baseSize * mobileScale)}px, ${(baseSize * viewportScale).toFixed(2)}vw, ${baseSize}px)`;
  const positionStyle = {
    "--tool-top": tool.position.top ?? "auto",
    "--tool-right": tool.position.right ?? "auto",
    "--tool-bottom": tool.position.bottom ?? "auto",
    "--tool-left": tool.position.left ?? "auto",
    "--tool-mobile-top": tool.mobilePosition?.top ?? tool.position.top ?? "auto",
    "--tool-mobile-right": tool.mobilePosition?.right ?? tool.position.right ?? "auto",
    "--tool-mobile-bottom": tool.mobilePosition?.bottom ?? tool.position.bottom ?? "auto",
    "--tool-mobile-left": tool.mobilePosition?.left ?? tool.position.left ?? "auto",
  } as CSSProperties;

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute select-none bottom-[var(--tool-mobile-bottom)] left-[var(--tool-mobile-left)] right-[var(--tool-mobile-right)] top-[var(--tool-mobile-top)] sm:bottom-[var(--tool-bottom)] sm:left-[var(--tool-left)] sm:right-[var(--tool-right)] sm:top-[var(--tool-top)]",
        visibilityClass,
      )}
      style={{
        zIndex: depthConfig.zIndex,
        width: responsiveSize,
        height: responsiveSize,
        ...positionStyle,
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
          {/* Clean Glass Card Surface with Rounded Corners */}
          <div
            className={cn(
              "relative grid h-full w-full place-items-center overflow-hidden rounded-[1.15rem] border backdrop-blur-md transition-all duration-300 sm:rounded-[1.5rem]",
              isDeveloper ? "p-1.5 sm:p-2" : "p-2 sm:p-2.5",
              depthConfig.border,
            )}
          >
            {/* Logo Image with Rounded Corners */}
            {tool.image && !imageFailed ? (
              <img
                src={tool.image}
                alt=""
                className="h-full w-full rounded-lg object-contain p-0.5 sm:rounded-xl sm:p-1"
                draggable={false}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <span className="font-mono text-[0.55rem] font-bold uppercase tracking-wider text-platinum/70 sm:text-xs">
                {tool.shortLabel}
              </span>
            )}

            {/* Surface Sheen Overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{ background: depthConfig.sheen }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
