import { motion } from "framer-motion";
import { experience, experienceSection } from "../../data/portfolio";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <Container>
        <SectionHeader copy={experienceSection} />
        <div className="mt-16 grid gap-5">
          {experience.map((item, index) => (
            <motion.article
              key={item.id}
              className="relative grid gap-7 overflow-hidden border-t border-white/12 py-8 lg:grid-cols-[13rem_1fr_18rem] lg:gap-10 lg:py-10"
              initial={{ opacity: 0, x: index % 2 === 0 ? -34 : 34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-arctic shadow-[0_0_24px_rgba(134,244,255,0.9)]" />
              <div>
                <p className="font-display text-5xl font-black leading-none text-platinum/14 lg:text-6xl">
                  0{index + 1}
                </p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-arctic/72">
                  {item.period}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-platinum/42">
                  {item.company} / {item.location}
                </p>
                <h3 className="mt-3 font-display text-3xl font-black leading-none text-platinum sm:text-4xl">
                  {item.role}
                </h3>
                <p className="mt-5 max-w-3xl text-base leading-8 text-platinum/66">{item.summary}</p>
                <div className="mt-6 grid gap-3">
                  {item.responsibilities.map((responsibility) => (
                    <p key={responsibility} className="border-l border-ember/45 pl-4 text-sm leading-7 text-platinum/64">
                      {responsibility}
                    </p>
                  ))}
                </div>
              </div>
              <div className="self-end rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-platinum/38">Stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-obsidian/60 px-3 py-1 text-xs font-semibold text-platinum/62"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
