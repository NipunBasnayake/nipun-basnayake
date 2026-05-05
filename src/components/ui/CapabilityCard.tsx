import { motion } from "framer-motion";
import type { Capability } from "../../data/portfolio";
import { cn } from "../../lib/utils";

interface CapabilityCardProps {
  capability: Capability;
  index: number;
}

export function CapabilityCard({ capability, index }: CapabilityCardProps) {
  const Icon = capability.icon;

  return (
    <motion.article
      className="group relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-7"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-110px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div className={cn("absolute -right-20 -top-20 size-52 rounded-full bg-gradient-to-br opacity-70 blur-3xl transition group-hover:scale-125", capability.accent)} />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-9 flex items-center justify-between">
          <span className="grid size-13 place-items-center rounded-[1.25rem] border border-white/12 bg-obsidian/45 text-platinum shadow-cyan">
            <Icon className="size-6" />
          </span>
          <span className="font-mono text-xs text-platinum/38">0{index + 1}</span>
        </div>
        <h3 className="font-display text-3xl font-black leading-none text-platinum">{capability.title}</h3>
        <p className="mt-5 text-sm leading-7 text-platinum/62">{capability.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-8">
          {capability.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-platinum/58"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
