import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type {
  HeroFloatingTool,
  HeroToolDepth,
  HeroVariant,
} from "../../data/heroTools";
import { cn } from "../../lib/utils";

interface FloatingToolsLayerProps {
  tools: HeroFloatingTool[];
  variant: HeroVariant;
}

interface FloatingToolItemProps {
  tool: HeroFloatingTool;
  variant: HeroVariant;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduceMotion: boolean;
}

const depthPresets: Record<
  HeroToolDepth,
  {
    zIndex: number;
    opacity: number;
    blur: number;
    scale: number;
    parallaxX: number;
    parallaxY: number;
    saturation: number;
    fallbackClassName: string;
  }
> = {
  far: {
    zIndex: 5,
    opacity: 0.32,
    blur: 7,
    scale: 0.9,
    parallaxX: -4,
    parallaxY: -3,
    saturation: 0.75,
    fallbackClassName: "border-white/10 bg-white/[0.025] text-platinum/40",
  },
  middle: {
    zIndex: 25,
    opacity: 0.72,
    blur: 1.4,
    scale: 1,
    parallaxX: 8,
    parallaxY: 6,
    saturation: 0.92,
    fallbackClassName: "border-white/10 bg-white/[0.045] text-platinum/70",
  },
  near: {
    zIndex: 45,
    opacity: 0.96,
    blur: 0,
    scale: 1.12,
    parallaxX: 15,
    parallaxY: 10,
    saturation: 1.08,
    fallbackClassName: "border-white/20 bg-white/[0.06] text-platinum",
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getVisibilityClass(priority: number) {
  if (priority <= 3) return "";
  if (priority === 4) return "hidden sm:block";
  if (priority <= 6) return "hidden md:block";
  if (priority <= 8) return "hidden lg:block";
  return "hidden xl:block";
}

function getGlow(variant: HeroVariant, depth: HeroToolDepth) {
  if (depth === "far") return "drop-shadow(0 10px 24px rgba(0,0,0,0.24))";

  if (variant === "developer") {
    return depth === "near"
      ? "drop-shadow(0 0 26px rgba(134,244,255,0.3)) drop-shadow(0 14px 34px rgba(0,0,0,0.32))"
      : "drop-shadow(0 0 18px rgba(134,244,255,0.16)) drop-shadow(0 10px 26px rgba(0,0,0,0.26))";
  }

  return depth === "near"
    ? "drop-shadow(0 0 28px rgba(162,41,255,0.28)) drop-shadow(0 0 18px rgba(255,90,61,0.18)) drop-shadow(0 14px 34px rgba(0,0,0,0.32))"
    : "drop-shadow(0 0 18px rgba(162,41,255,0.16)) drop-shadow(0 10px 26px rgba(0,0,0,0.26))";
}

function getResponsiveSize(size: number) {
  return `clamp(${Math.round(size * 0.68)}px, ${(size * 0.08).toFixed(2)}vw, ${size}px)`;
}

function FloatingToolItem({
  tool,
  variant,
  pointerX,
  pointerY,
  reduceMotion,
}: FloatingToolItemProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const preset = depthPresets[tool.depth];
  const parallaxX = useTransform(
    pointerX,
    (value) => value * (tool.parallax?.x ?? preset.parallaxX),
  );
  const parallaxY = useTransform(
    pointerY,
    (value) => value * (tool.parallax?.y ?? preset.parallaxY),
  );
  const shouldRenderImage = Boolean(tool.image && !imageFailed);

  return (
    <div
      className={cn(
        "absolute",
        getVisibilityClass(tool.mobilePriority),
      )}
      style={{
        zIndex: preset.zIndex,
        width: getResponsiveSize(tool.size),
        height: getResponsiveSize(tool.size),
        ...tool.position,
      }}
    >
      <motion.div
        className="h-full w-full"
        style={{
          x: reduceMotion ? 0 : parallaxX,
          y: reduceMotion ? 0 : parallaxY,
        }}
      >
        <motion.div
          className="grid h-full w-full place-items-center"
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
            opacity: preset.opacity,
            scale: preset.scale,
            filter: `blur(${preset.blur}px) saturate(${preset.saturation}) ${getGlow(variant, tool.depth)}`,
            willChange: reduceMotion ? "auto" : "transform",
          }}
        >
          {shouldRenderImage ? (
            <img
              src={tool.image}
              alt=""
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span
              className={cn(
                "grid h-full w-full place-items-center rounded-[1.35rem] border font-mono text-[0.68rem] font-black uppercase tracking-[0.08em] shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:text-xs",
                preset.fallbackClassName,
                variant === "developer" && tool.depth === "near" && "border-arctic/25",
                variant === "designer" && tool.depth === "near" && "border-wine/30",
              )}
            >
              {tool.shortLabel}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function FloatingToolsLayer({ tools, variant }: FloatingToolsLayerProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) {
      pointerX.set(0);
      pointerY.set(0);
      return undefined;
    }

    const updatePointer = (event: PointerEvent) => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const bounds = stageRef.current?.getBoundingClientRect();

        if (!bounds) return;

        const normalizedX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const normalizedY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        pointerX.set(clamp(normalizedX, -1, 1));
        pointerY.set(clamp(normalizedY, -1, 1));
      });
    };

    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", resetPointer);
    window.addEventListener("blur", resetPointer);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("blur", resetPointer);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div
      ref={stageRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {tools.map((tool) => (
        <FloatingToolItem
          key={tool.id}
          tool={tool}
          variant={variant}
          pointerX={smoothX}
          pointerY={smoothY}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
