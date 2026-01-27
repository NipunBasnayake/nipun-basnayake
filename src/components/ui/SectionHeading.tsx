"use client";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="max-w-2xl text-base text-white/70 md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

