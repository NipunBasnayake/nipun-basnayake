import { motion } from "framer-motion";
import { summaryData } from "../../data/portfolio";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { GradientBlob } from "../ui/GradientBlob";

export function SummarySection() {
  return (
    <section id="summary" className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <GradientBlob className="right-[-12rem] top-20 size-[28rem]" colors="from-wine/25 via-ember/20 to-transparent" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <SectionHeader copy={summaryData.section} />
          <div className="relative justify-self-end lg:max-w-[41rem]">
            <div className="absolute -left-6 top-8 hidden h-28 w-28 rounded-[1.6rem] border border-arctic/16 md:block" />
            <motion.div
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 backdrop-blur-sm sm:p-8\"
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute right-[-5rem] top-[-5rem] size-48 rounded-full bg-arctic/10 blur-3xl" />
              <div className="relative z-10 space-y-6">
                {summaryData.body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-9 text-platinum/72 sm:text-lg sm:leading-10">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative z-10 mt-9 grid">
                {summaryData.proofPoints.map((point) => (
                  <div key={point} className="flex gap-4 border-t border-white/10 py-4 last:pb-0">
                    <span className="mt-2 h-px w-10 flex-none bg-gradient-to-r from-ember to-arctic" />
                    <p className="text-sm font-semibold leading-7 text-platinum/72">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {summaryData.competencies.map((competency, index) => {
            const Icon = competency.icon;

            return (
              <motion.article
                key={competency.id}
                className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-carbon/75 p-6 backdrop-blur-xl"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.58, delay: index * 0.08 }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arctic/70 to-transparent" />
                <Icon className="size-7 text-arctic" />
                <h3 className="mt-7 font-display text-2xl font-black leading-none text-platinum">
                  {competency.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-platinum/62">{competency.description}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
