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

type DepthPreset = {
  zIndex: number;
  opacity: number;
  blur: number;
  scale: number;
  parallaxX: number;
  parallaxY: number;
  saturation: number;
  imageScale: number;
  surfacePadding: number;
  surfaceRadius: number;
  imageRadius: number;
  fallbackClassName: string;
};

const depthPresets: Record<HeroToolDepth, DepthPreset> = {
  far: {
    zIndex: 5,
    opacity: 0.38,
    blur: 4.2,
    scale: 0.92,
    parallaxX: -4,
    parallaxY: -3,
    saturation: 0.82,
    imageScale: 0.82,
    surfacePadding: 4,
    surfaceRadius: 16,
    imageRadius: 12,
    fallbackClassName: "border-white/10 bg-white/[0.025] text-platinum/40",
  },
  middle: {
    zIndex: 25,
    opacity: 0.78,
    blur: 0.85,
    scale: 1,
    parallaxX: 8,
    parallaxY: 6,
    saturation: 0.96,
    imageScale: 0.88,
    surfacePadding: 5,
    surfaceRadius: 21,
    imageRadius: 16,
    fallbackClassName: "border-white/10 bg-white/[0.045] text-platinum/70",
  },
  near: {
    zIndex: 45,
    opacity: 1,
    blur: 0,
    scale: 1.14,
    parallaxX: 15,
    parallaxY: 10,
    saturation: 1.04,
    imageScale: 0.92,
    surfacePadding: 6,
    surfaceRadius: 26,
    imageRadius: 20,
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

function getSurfaceStyle(variant: HeroVariant, depth: HeroToolDepth) {
  const isDeveloper = variant === "developer";

  if (depth === "far") {
    return {
      backgroundColor: isDeveloper
        ? "rgba(4, 10, 18, 0.34)"
        : "rgba(17, 6, 17, 0.36)",
      borderColor: "rgba(255, 255, 255, 0.06)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 28px rgba(0,0,0,0.22)",
    };
  }

  if (depth === "middle") {
    return {
      backgroundColor: isDeveloper
        ? "rgba(5, 12, 22, 0.46)"
        : "rgba(22, 8, 21, 0.46)",
      borderColor: isDeveloper
        ? "rgba(134, 244, 255, 0.13)"
        : "rgba(162, 41, 255, 0.14)",
      boxShadow: isDeveloper
        ? "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -16px 28px rgba(0,0,0,0.22), 0 16px 38px rgba(0,0,0,0.30), 0 0 22px rgba(134,244,255,0.11)"
        : "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -16px 28px rgba(0,0,0,0.22), 0 16px 38px rgba(0,0,0,0.30), 0 0 22px rgba(162,41,255,0.12)",
    };
  }

  return {
    backgroundColor: isDeveloper
      ? "rgba(5, 13, 24, 0.58)"
      : "rgba(24, 8, 23, 0.58)",
    borderColor: isDeveloper
      ? "rgba(134, 244, 255, 0.22)"
      : "rgba(255, 90, 61, 0.17)",
    boxShadow: isDeveloper
      ? "inset 0 1px 0 rgba(255,255,255,0.13), inset 0 -20px 34px rgba(0,0,0,0.24), 0 20px 46px rgba(0,0,0,0.36), 0 0 30px rgba(134,244,255,0.16)"
      : "inset 0 1px 0 rgba(255,255,255,0.13), inset 0 -20px 34px rgba(0,0,0,0.24), 0 20px 46px rgba(0,0,0,0.36), 0 0 28px rgba(162,41,255,0.15), 0 0 18px rgba(255,90,61,0.10)",
  };
}

function getSurfaceSheen(variant: HeroVariant, depth: HeroToolDepth) {
  const accent =
    variant === "developer"
      ? "rgba(134,244,255,0.16)"
      : "rgba(255,90,61,0.14)";
  const opacity = depth === "far" ? 0.35 : depth === "middle" ? 0.55 : 0.72;

  return `linear-gradient(135deg, rgba(255,255,255,${0.11 * opacity}) 0%, transparent 38%), radial-gradient(circle at 22% 16%, ${accent}, transparent 34%), linear-gradient(180deg, transparent 52%, rgba(0,0,0,${0.2 * opacity}) 100%)`;
}

interface FloatingToolVisualProps {
  tool: HeroFloatingTool;
  variant: HeroVariant;
  preset: DepthPreset;
  imageFailed: boolean;
  onImageError: () => void;
}

function FloatingToolVisual({
  tool,
  variant,
  preset,
  imageFailed,
  onImageError,
}: FloatingToolVisualProps) {
  const shouldRenderImage = Boolean(tool.image && !imageFailed);

  if (!shouldRenderImage) {
    return (
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
    );
  }

  return (
    <span
      className="relative grid h-full w-full place-items-center overflow-hidden border backdrop-blur-md"
      style={{
        ...getSurfaceStyle(variant, tool.depth),
        borderRadius: preset.surfaceRadius,
        padding: preset.surfacePadding,
      }}
    >
      <span
        className="relative grid place-items-center overflow-hidden"
        style={{
          width: `${preset.imageScale * 100}%`,
          height: `${preset.imageScale * 100}%`,
          borderRadius: preset.imageRadius,
        }}
      >
        <img
          src={tool.image}
          alt=""
          className="h-full w-full object-contain"
          style={{ borderRadius: "inherit" }}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={onImageError}
        />
        {tool.surfaceTone === "soften-bright" ? (
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: "inherit",
              backgroundColor: tool.depth === "far"
                ? "rgba(0,0,0,0.10)"
                : "rgba(0,0,0,0.075)",
            }}
          />
        ) : null}
      </span>
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: preset.surfaceRadius,
          background: getSurfaceSheen(variant, tool.depth),
        }}
      />
    </span>
  );
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

  useEffect(() => {
    setImageFailed(false);
  }, [tool.image]);

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
          <FloatingToolVisual
            tool={tool}
            variant={variant}
            preset={preset}
            imageFailed={imageFailed}
            onImageError={() => setImageFailed(true)}
          />
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
      className="pointer-events-none absolute bottom-0 top-0 left-[calc(50%_-_50vw)] right-[calc(50%_-_50vw)]"
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
