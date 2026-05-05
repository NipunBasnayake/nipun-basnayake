import { motion, useReducedMotion } from "framer-motion";
import { useState, type PointerEvent } from "react";
import type { CtaItem, LinkItem } from "../../data/portfolio";
import { cn } from "../../lib/utils";

type ButtonLink = CtaItem | (LinkItem & { variant?: CtaItem["variant"] });

interface ButtonProps {
  item: ButtonLink;
  className?: string;
}

const variants: Record<NonNullable<ButtonLink["variant"]>, string> = {
  primary:
    "border-transparent bg-platinum text-obsidian shadow-[0_0_45px_rgba(244,240,232,0.2)] hover:bg-white",
  secondary:
    "border-platinum/18 bg-white/[0.06] text-platinum backdrop-blur-xl hover:border-arctic/45 hover:bg-arctic/10 hover:text-white",
  ghost:
    "border-white/10 bg-transparent text-platinum/72 hover:border-ember/40 hover:bg-ember/10 hover:text-platinum",
};

export function Button({ item, className }: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const Icon = item.icon;
  const variant = item.variant ?? "ghost";

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType === "touch") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.18;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.24;
    setTransform({ x, y });
  };

  return (
    <motion.a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border px-5 text-sm font-bold uppercase tracking-[0.18em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic sm:h-14 sm:px-7",
        variants[variant],
        className,
      )}
      animate={transform}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTransform({ x: 0, y: 0 })}
      whileHover={reduceMotion ? undefined : { scale: 1.035 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-ember/30 via-arctic/20 to-volt/25 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
      <span className="relative z-10">{item.label}</span>
      {Icon ? <Icon className="relative z-10 size-4 transition group-hover:translate-x-0.5" /> : null}
    </motion.a>
  );
}
