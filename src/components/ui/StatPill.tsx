import { motion } from "framer-motion";
import type { ProofStat } from "../../data/portfolio";

interface StatPillProps {
  stat: ProofStat;
  index: number;
}

export function StatPill({ stat, index }: StatPillProps) {
  return (
    <motion.div
      className="rounded-[1.35rem] border border-white/10 bg-obsidian/54 p-4 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.6 + index * 0.05 }}
    >
      <p className="font-display text-2xl font-black text-platinum">{stat.value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-platinum/48">
        {stat.label}
      </p>
    </motion.div>
  );
}
