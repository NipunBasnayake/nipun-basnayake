import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import { useEffect, useState } from "react";
import type { Certificate } from "../../data/portfolio";
import { certificates, certificatesSection } from "../../data/portfolio";
import { cn } from "../../lib/utils";
import { Container } from "../common/Container";
import { GradientBlob } from "../ui/GradientBlob";

function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="relative h-full min-h-[30rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:scale-[1.015] hover:border-arctic/30">
      <div className="absolute -right-20 -top-20 size-56 rounded-full bg-gradient-to-br from-arctic/25 via-wine/25 to-ember/20 blur-3xl" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-white/10 bg-obsidian/60">
          {certificate.image && !imageFailed ? (
            <img
              src={certificate.image}
              alt={`${certificate.title} certificate`}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_20%,rgba(134,244,255,0.18),transparent_34%),linear-gradient(135deg,rgba(255,90,61,0.18),rgba(162,41,255,0.12),rgba(5,5,5,0.9))] p-6 text-center">
              <div>
                <Award className="mx-auto size-10 text-arctic" />
                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-platinum/48">
                  Certificate Image
                </p>
                <p className="mt-3 font-display text-2xl font-black leading-none text-platinum/78">
                  {certificate.issuer}
                </p>
              </div>
            </div>
          )}
          <div className="absolute left-3 top-3 rounded-full border border-white/12 bg-obsidian/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-platinum/68 backdrop-blur-xl">
            {certificate.status === "preparing" ? "Preparing" : "Earned"}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-2 pt-6">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-arctic/72">{certificate.issuer}</p>
            <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-platinum/48">
              0{index + 1}
            </span>
          </div>
          <h3 className="mt-5 font-display text-2xl font-black leading-[0.95] text-platinum">
            {certificate.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-platinum/62">{certificate.description}</p>
          <p className="mt-auto pt-8 font-mono text-xs uppercase tracking-[0.22em] text-ember/80">
            {certificate.year}
          </p>
        </div>
      </div>
    </article>
  );
}

export function CertificatesSection() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardStep, setCardStep] = useState(432);
  const maxIndex = Math.max(0, certificates.length - 1);

  useEffect(() => {
    const updateStep = () => {
      setCardStep(Math.min(window.innerWidth * 0.82, 416) + 16);
    };

    updateStep();
    window.addEventListener("resize", updateStep);

    return () => window.removeEventListener("resize", updateStep);
  }, []);

  const goTo = (nextIndex: number) => {
    setActiveIndex(Math.min(maxIndex, Math.max(0, nextIndex)));
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.18;

    if (swipe < -80) {
      goTo(activeIndex + 1);
    } else if (swipe > 80) {
      goTo(activeIndex - 1);
    }
  };

  return (
    <section id="certificates" className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <GradientBlob className="left-1/2 top-16 size-[34rem] -translate-x-1/2" colors="from-arctic/22 via-wine/20 to-ember/16" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            className="max-w-[46rem]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-arctic/80">
              {certificatesSection.eyebrow}
            </p>
            <h2 className="max-w-[46rem] font-display text-[clamp(2.2rem,7vw,5.8rem)] font-black leading-[0.9] text-platinum">
              <span className="block">Credentials that reinforce</span>
              <span className="block">the engineering stack.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-platinum/64 sm:text-lg">
              {certificatesSection.intro}
            </p>
          </motion.div>
          <div className="flex items-center justify-start gap-3 lg:justify-end">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="grid size-14 place-items-center rounded-full border border-white/18 bg-platinum text-obsidian shadow-[0_12px_40px_rgba(244,240,232,0.12)] transition hover:border-arctic/45 hover:bg-arctic disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-platinum disabled:opacity-35"
              aria-label="Previous certificate"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === maxIndex}
              className="grid size-14 place-items-center rounded-full border border-white/18 bg-platinum text-obsidian shadow-[0_12px_40px_rgba(244,240,232,0.12)] transition hover:border-arctic/45 hover:bg-arctic disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-platinum disabled:opacity-35"
              aria-label="Next certificate"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-14 overflow-hidden">
          <motion.div
            className="flex cursor-grab gap-4 active:cursor-grabbing"
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{ x: -activeIndex * cardStep }}
            transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className={cn(
                  "w-[min(82vw,26rem)] flex-none transition-opacity",
                  Math.abs(index - activeIndex) > 2 && "opacity-45",
                )}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
              >
                <CertificateCard certificate={certificate} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <AnimatePresence initial={false}>
            {certificates.map((certificate, index) => (
              <button
                key={certificate.id}
                type="button"
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === activeIndex ? "w-10 bg-arctic" : "w-2 bg-white/20 hover:bg-white/40",
                )}
                onClick={() => goTo(index)}
                aria-label={`Go to ${certificate.title}`}
              />
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
