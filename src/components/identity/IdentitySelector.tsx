import { motion, useReducedMotion } from "framer-motion";
import { Code2, PenTool } from "lucide-react";
import { type KeyboardEvent, useState } from "react";
import { heroData } from "../../data/portfolio";
import { cn } from "../../lib/utils";
import { AnimatedGrid } from "../ui/AnimatedGrid";

type IdentityMode = "developer" | "designer";

interface IdentitySelectorProps {
  onNavigate: (to: string) => void;
}

const identityCopy = {
  developer: {
    titleTop: "Software",
    titleBottom: "Developer",
    label: "Systems / APIs / Products",
    href: "/developer",
    aria: "Open Software Developer Portfolio",
  },
  designer: {
    titleTop: "Graphic",
    titleBottom: "Designer",
    label: "Brand / Print / Visual Design",
    href: "/designer",
    aria: "Open Graphic Designer Portfolio",
  },
} satisfies Record<
  IdentityMode,
  {
    titleTop: string;
    titleBottom: string;
    label: string;
    href: string;
    aria: string;
  }
>;

function activateWithSpace(
  event: KeyboardEvent<HTMLAnchorElement>,
  navigate: () => void,
) {
  if (event.key !== " ") return;

  event.preventDefault();
  navigate();
}

function SplitSurface({
  mode,
  active,
  onActiveChange,
  onNavigate,
}: {
  mode: IdentityMode;
  active: IdentityMode | null;
  onActiveChange: (mode: IdentityMode | null) => void;
  onNavigate: (to: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const copy = identityCopy[mode];
  const isDeveloper = mode === "developer";
  const isActive = active === mode;
  const isSubdued = active !== null && !isActive;
  const Icon = isDeveloper ? Code2 : PenTool;

  const navigate = () => onNavigate(copy.href);

  return (
    <motion.a
      href={copy.href}
      aria-label={copy.aria}
      onClick={(event) => {
        event.preventDefault();
        navigate();
      }}
      onKeyDown={(event) => activateWithSpace(event, navigate)}
      onMouseEnter={() => onActiveChange(mode)}
      onMouseLeave={() => onActiveChange(null)}
      onFocus={() => onActiveChange(mode)}
      onBlur={() => onActiveChange(null)}
      className={cn(
        "group relative isolate flex min-h-[calc((100vh-5rem)/2)] cursor-pointer overflow-hidden outline-none md:min-h-[calc(100vh-5rem)] md:w-1/2",
        isDeveloper
          ? "items-start justify-start bg-[#071519]"
          : "items-end justify-end bg-[#170d18]",
      )}
      animate={
        reduceMotion
          ? undefined
          : {
              flexBasis:
                active === null
                  ? "50%"
                  : isActive
                    ? "54%"
                    : "46%",
            }
      }
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={cn(
          "absolute inset-0",
          isDeveloper
            ? "bg-[radial-gradient(circle_at_24%_46%,rgba(134,244,255,0.2),transparent_32%),linear-gradient(135deg,#071519_0%,#0a2025_58%,#061012_100%)]"
            : "bg-[radial-gradient(circle_at_76%_48%,rgba(255,90,61,0.16),transparent_34%),linear-gradient(225deg,#170d18_0%,#241023_56%,#080609_100%)]",
        )}
        animate={{
          opacity: isSubdued ? 0.64 : isActive ? 1 : 0.86,
        }}
        transition={{ duration: 0.45 }}
      />

      <motion.div
        className={cn(
          "absolute inset-0 opacity-20",
          isDeveloper ? "mix-blend-screen" : "mix-blend-soft-light",
        )}
        animate={{ opacity: isSubdued ? 0.09 : isActive ? 0.28 : 0.18 }}
        aria-hidden="true"
      >
        <AnimatedGrid />
      </motion.div>

      <motion.div
        className={cn(
          "pointer-events-none absolute top-1/2 hidden h-px w-[30vw] md:block",
          isDeveloper
            ? "left-[8vw] bg-gradient-to-r from-arctic/70 to-transparent"
            : "right-[8vw] bg-gradient-to-l from-ember/60 to-transparent",
        )}
        animate={{
          opacity: isSubdued ? 0.15 : isActive ? 0.78 : 0.38,
          x: isDeveloper ? (isActive ? 18 : 0) : isActive ? -18 : 0,
        }}
        aria-hidden="true"
      />

      <motion.div
        className={cn(
          "pointer-events-none absolute hidden md:block",
          isDeveloper
            ? "left-[18vw] top-[34%] h-28 w-28 border-l border-t border-arctic/20"
            : "right-[18vw] top-[34%] h-28 w-28 border-r border-t border-ember/20",
        )}
        animate={{
          opacity: isSubdued ? 0.1 : isActive ? 0.48 : 0.24,
          scale: isActive ? 1.06 : 1,
        }}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10 flex h-full min-h-[calc((100vh-5rem)/2)] w-full items-center px-6 py-14 sm:px-10 md:min-h-[calc(100vh-5rem)] lg:px-16",
          isDeveloper ? "justify-start text-left" : "justify-end text-right",
        )}
      >
        <motion.div
          className={cn(
            "max-w-[15rem] sm:max-w-xs lg:max-w-sm",
            isDeveloper ? "md:mr-28" : "md:ml-28",
          )}
          animate={{
            opacity: isSubdued ? 0.44 : 1,
            x: reduceMotion ? 0 : isActive ? (isDeveloper ? 8 : -8) : 0,
          }}
          transition={{ duration: 0.38 }}
        >
          <Icon
            className={cn(
              "mb-5 size-8 sm:size-9",
              isDeveloper ? "text-arctic" : "text-ember",
            )}
            aria-hidden="true"
          />
          <p
            className={cn(
              "font-mono text-[0.64rem] uppercase tracking-[0.24em] sm:text-xs sm:tracking-[0.3em]",
              isDeveloper ? "text-arctic/70" : "text-ember/70",
            )}
          >
            {copy.label}
          </p>
          <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.88] tracking-[-0.02em] text-platinum sm:text-6xl lg:text-7xl">
            <span className="block">{copy.titleTop}</span>
            <span className="block">{copy.titleBottom}</span>
          </h2>
          <motion.p
            className={cn(
              "mt-5 font-mono text-[0.68rem] uppercase tracking-[0.2em]",
              isDeveloper ? "text-arctic/55" : "text-wine/70",
            )}
            animate={{ opacity: isActive ? 1 : 0.58 }}
          >
            Enter portfolio
          </motion.p>
        </motion.div>
      </div>

      <span
        className={cn(
          "pointer-events-none absolute inset-3 rounded-[1.2rem] border opacity-0 transition duration-200 group-focus-visible:opacity-100",
          isDeveloper ? "border-arctic/70" : "border-ember/70",
        )}
        aria-hidden="true"
      />
    </motion.a>
  );
}

export function IdentitySelector({ onNavigate }: IdentitySelectorProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<IdentityMode | null>(null);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-obsidian pt-20"
    >
      <div className="relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden md:flex-row">
        <SplitSurface
          mode="developer"
          active={active}
          onActiveChange={setActive}
          onNavigate={onNavigate}
        />
        <SplitSurface
          mode="designer"
          active={active}
          onActiveChange={setActive}
          onNavigate={onNavigate}
        />

        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(244,240,232,0.08),transparent_22%),linear-gradient(90deg,rgba(134,244,255,0.08),transparent_44%,rgba(162,41,255,0.1))]" />

          <motion.div
            className="absolute inset-x-0 top-[17%] z-20 text-center sm:top-[15%] md:top-[16%]"
            animate={{
              x: reduceMotion
                ? 0
                : active === "developer"
                  ? -10
                  : active === "designer"
                    ? 10
                    : 0,
              opacity: active === "designer" ? 0.78 : 0.9,
            }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="bg-gradient-to-r from-platinum via-arctic to-wine bg-clip-text font-display text-[clamp(4.4rem,15vw,14rem)] font-black leading-[0.74] tracking-[-0.055em] text-transparent">
              {heroData.nameLines[0]}
            </h1>
          </motion.div>

          <motion.div
            className="absolute inset-x-0 bottom-[22%] z-20 text-center sm:bottom-[19%] md:bottom-[17%]"
            animate={{
              x: reduceMotion
                ? 0
                : active === "developer"
                  ? -8
                  : active === "designer"
                    ? 8
                    : 0,
              opacity: active === "developer" ? 0.78 : 0.94,
            }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="bg-gradient-to-r from-ember via-platinum to-arctic bg-clip-text font-display text-[clamp(3.3rem,8.7vw,8.2rem)] font-black leading-[0.8] tracking-[-0.04em] text-transparent">
              {heroData.nameLines[1]}
            </h1>
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 z-30 h-[26rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 sm:h-[32rem] sm:w-[24rem] md:h-[35rem] md:w-[26rem]"
            animate={{
              scale: reduceMotion ? 1 : active ? 1.012 : 1,
              filter:
                active === "developer"
                  ? "drop-shadow(0 0 26px rgba(134,244,255,0.28))"
                  : active === "designer"
                    ? "drop-shadow(0 0 26px rgba(255,90,61,0.2)) drop-shadow(0 0 18px rgba(162,41,255,0.18))"
                    : "drop-shadow(0 18px 38px rgba(0,0,0,0.55))",
            }}
            transition={{ duration: 0.45 }}
          >
            <img
              src={heroData.portrait}
              alt={heroData.portraitAlt}
              className="h-full w-full object-contain object-bottom"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
