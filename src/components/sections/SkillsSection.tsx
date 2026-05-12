import { motion } from "framer-motion";
import { skillCategories, skillsSection } from "../../data/portfolio";
import { cn } from "../../lib/utils";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { GradientBlob } from "../ui/GradientBlob";

export function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden bg-carbon py-24 sm:py-32">
      <GradientBlob className="-left-24 bottom-20 size-[24rem]" colors="from-arctic/25 via-volt/20 to-transparent" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <SectionHeader copy={skillsSection} className="lg:sticky lg:top-28" />
          <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.article
                  key={category.id}
                  className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-arctic/28 hover:shadow-[0_18px_70px_rgba(134,244,255,0.1)] sm:p-7 min-h-[18rem]"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-110px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <div
                    className={cn(
                      "absolute -right-20 -top-20 size-52 rounded-full bg-gradient-to-br opacity-70 blur-3xl transition group-hover:scale-125",
                      category.accent,
                    )}
                  />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="grid size-13 place-items-center rounded-[1.25rem] border border-white/12 bg-obsidian/45 text-platinum shadow-cyan">
                        <Icon className="size-6" />
                      </span>
                      <span className="font-mono text-xs text-platinum/38">0{index + 1}</span>
                    </div>
                    <h3 className="font-display font-black leading-none text-platinum text-3xl">
                      {category.title}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-platinum/62">{category.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/8 bg-obsidian/44 px-3 py-1.5 text-xs font-semibold text-platinum/62"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
