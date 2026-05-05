import { motion } from "framer-motion";
import { contactData } from "../../data/portfolio";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Button } from "../ui/Button";
import { GradientBlob } from "../ui/GradientBlob";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <GradientBlob className="left-1/2 top-10 size-[34rem] -translate-x-1/2" colors="from-ember/30 via-arctic/20 to-wine/20" />
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.045] p-6 text-center backdrop-blur-xl sm:p-12 lg:p-16"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-platinum/60 to-transparent" />
          <SectionHeader copy={contactData.section} align="center" className="relative z-10" />
          <p className="relative z-10 mx-auto mt-8 max-w-2xl font-display text-2xl font-bold leading-8 text-platinum">
            {contactData.availability}
          </p>
          <div className="relative z-10 mt-9 flex flex-wrap justify-center gap-3">
            {contactData.links.map((link) => (
              <Button
                key={link.href}
                item={link}
                className={link.label === "WhatsApp" ? "hover:shadow-[0_0_38px_rgba(134,244,255,0.16)]" : undefined}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
