import { motion } from "framer-motion";
import type { TimelineItem } from "../../data/portfolio";

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

export function TimelineCard({ item, index }: TimelineCardProps) {
  return (
    <motion.article
      className="relative grid gap-5 border-t border-white/12 py-7 md:grid-cols-[160px_1fr_220px] md:gap-8 md:py-9"
      initial={{ opacity: 0, x: index % 2 === 0 ? -34 : 34 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-arctic shadow-[0_0_24px_rgba(134,244,255,0.9)]" />
      <p className="font-display text-6xl font-black leading-none text-platinum/14 md:text-7xl">
        {item.year}
      </p>
      <div>
        <h3 className="font-display text-2xl font-black text-platinum sm:text-3xl">{item.title}</h3>
        <p className="mt-3 max-w-2xl text-base leading-8 text-platinum/62">{item.description}</p>
      </div>
      <p className="self-end rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4 text-sm font-semibold leading-6 text-platinum/76 backdrop-blur-xl">
        {item.outcome}
      </p>
    </motion.article>
  );
}
