import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { contactData } from "../../data/portfolio";
import { Container } from "../common/Container";
import { GradientBlob } from "../ui/GradientBlob";

interface ContactSectionProps {
  onNavigate: (to: string) => void;
}

export function ContactSection({ onNavigate }: ContactSectionProps) {
  const href = "/contact?from=developer";

  return (
    <section id="contact" className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <GradientBlob
        className="left-1/2 top-10 size-[34rem] -translate-x-1/2"
        colors="from-ember/24 via-arctic/20 to-wine/18"
      />
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 text-center backdrop-blur-sm sm:p-12"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-arctic/70 to-transparent" />
          <p className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-arctic/75">
            Contact
          </p>
          <h2 className="relative z-10 mx-auto mt-5 max-w-3xl font-display text-4xl font-black leading-[0.95] text-platinum sm:text-6xl">
            Have a software project in mind?
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-2xl text-base leading-8 text-platinum/64">
            {contactData.availability}
          </p>
          <a
            href={href}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(href);
            }}
            className="relative z-10 mt-9 inline-flex h-14 items-center justify-center gap-2 rounded-full border border-transparent bg-platinum px-7 text-sm font-black uppercase tracking-[0.16em] text-obsidian transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arctic"
          >
            Contact Me
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
