import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { DesignGallery } from "../components/design/DesignGallery";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { Button } from "../components/ui/Button";
import { GradientBlob } from "../components/ui/GradientBlob";
import { RoleHero } from "../components/hero/RoleHero";
import { contactData } from "../data/portfolio";
import {
  designCategories,
  designItems,
  designerExperience,
  designerIntro,
} from "../data/designPortfolio";
import { designerHeroTools } from "../data/heroTools";

function DesignerHero() {
  return <RoleHero variant="designer" tools={designerHeroTools} />;
}

function DesignerProfileSection() {
  return (
    <section id="designer-profile" className="relative overflow-hidden bg-carbon py-24 sm:py-32">
      <GradientBlob
        className="-right-24 top-24 size-[26rem]"
        colors="from-wine/22 via-ember/18 to-transparent"
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader copy={designerIntro} />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Brand identity and logo systems",
              "Print-ready layouts and event materials",
              "Digital and social media campaign visuals",
              "Typography, hierarchy, and visual consistency",
            ].map((item, index) => (
              <motion.article
                key={item}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-ember/72">
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-display text-2xl font-black leading-tight text-platinum">
                  {item}
                </h3>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function DesignerExperienceSection() {
  return (
    <section id="designer-experience" className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm sm:p-9 lg:p-12">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-gradient-to-br from-wine/30 via-ember/18 to-transparent blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[18rem_1fr] lg:items-end">
            <div>
              <BriefcaseBusiness className="size-8 text-ember" />
              <p className="mt-7 font-mono text-xs uppercase tracking-[0.24em] text-ember/72">
                {designerExperience.period}
              </p>
              <h2 className="mt-4 font-display text-4xl font-black leading-none text-platinum sm:text-5xl">
                {designerExperience.role}
              </h2>
            </div>
            <div>
              <p className="max-w-3xl text-base leading-8 text-platinum/68 sm:text-lg sm:leading-9">
                {designerExperience.summary}
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {designerExperience.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-obsidian/58 px-4 py-2 text-sm font-semibold text-platinum/62"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DesignCategoriesSection() {
  return (
    <section className="relative overflow-hidden bg-carbon py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-wine/78">
              Design Categories
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[0.95] text-platinum sm:text-6xl">
              A flexible category system for growing work.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-platinum/58 sm:text-base sm:leading-8">
            These categories are generated from `src/data/designPortfolio.ts`, so the portfolio can expand without hardcoding filters throughout the UI.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {designCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] px-4 py-4"
            >
              <p className="font-semibold text-platinum/78">{category.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function DesignWorkSection() {
  return (
    <section id="design-work" className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <GradientBlob
        className="left-1/2 top-20 size-[34rem] -translate-x-1/2"
        colors="from-wine/24 via-ember/18 to-arctic/12"
      />
      <Container className="relative z-10">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <SectionHeader
            copy={{
              eyebrow: "Design Work",
              title: "A visual gallery built for mixed formats.",
              intro:
                "The gallery is ready for logo, brand, poster, flyer, social, card, banner, and print work without forcing every piece into a square.",
            }}
          />
          <p className="text-sm leading-7 text-platinum/58 sm:text-base sm:leading-8">
            Real artwork has not been added yet, so this section intentionally shows an empty state instead of fictional portfolio pieces.
          </p>
        </div>
        <DesignGallery categories={designCategories} items={designItems} />
      </Container>
    </section>
  );
}

function DesignerContactSection() {
  return (
    <section id="designer-contact" className="relative overflow-hidden bg-carbon py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.055] p-7 text-center backdrop-blur-sm sm:p-12">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent" />
          <h2 className="relative z-10 mx-auto max-w-3xl font-display text-4xl font-black leading-[0.95] text-platinum sm:text-6xl">
            Need design work with clean visual direction?
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-2xl text-base leading-8 text-platinum/64">
            Contact Nipun for freelance graphic design work across brand, print, social media, events, and visual communication.
          </p>
          <div className="relative z-10 mt-9 flex flex-wrap justify-center gap-3">
            {contactData.links.map((link) => (
              <Button key={link.href} item={link} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function DesignerPage() {
  return (
    <main>
      <DesignerHero />
      <DesignerProfileSection />
      <DesignerExperienceSection />
      <DesignCategoriesSection />
      <DesignWorkSection />
      <DesignerContactSection />
    </main>
  );
}
