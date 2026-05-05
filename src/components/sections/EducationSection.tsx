import { motion } from "framer-motion";
import { education, educationSection } from "../../data/portfolio";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";

export function EducationSection() {
  return (
    <section id="education" className="relative bg-carbon py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader copy={educationSection} className="lg:sticky lg:top-28" />
          <div className="grid gap-5">
            {education.map((item, index) => (
              <motion.article
                key={item.id}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className="absolute -right-16 -top-16 size-44 rounded-full bg-arctic/12 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/12 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-arctic/78">
                      {item.period}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-platinum/38">
                      {item.location}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-black leading-none text-platinum">
                    {item.program}
                  </h3>
                  <p className="mt-3 font-semibold text-platinum/72">{item.institution}</p>
                  <p className="mt-5 text-sm leading-7 text-platinum/62">{item.details}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.focus.map((focus) => (
                      <span
                        key={focus}
                        className="rounded-full bg-obsidian/55 px-3 py-1 text-xs font-semibold text-platinum/62"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
