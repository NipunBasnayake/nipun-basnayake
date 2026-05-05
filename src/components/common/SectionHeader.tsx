import { motion } from "framer-motion";
import type { SectionCopy } from "../../data/portfolio";
import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  copy: SectionCopy;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ copy, align = "left", className }: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-arctic/80">
        {copy.eyebrow}
      </p>
      <h2 className="font-display text-4xl font-black leading-[0.9] text-platinum sm:text-6xl lg:text-7xl">
        {copy.title}
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-8 text-platinum/64 sm:text-lg">
        {copy.intro}
      </p>
    </motion.div>
  );
}
