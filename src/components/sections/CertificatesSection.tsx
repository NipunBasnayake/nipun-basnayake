import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Award, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Certificate } from "../../data/portfolio";
import { certificates, certificatesSection } from "../../data/portfolio";
import { cn } from "../../lib/utils";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { GradientBlob } from "../ui/GradientBlob";

function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(certificate.image) && !imageFailed;
  const isLinked = Boolean(certificate.referenceUrl);

  return (
    <article className="relative z-10 will-change-transform hover:z-20 h-full min-h-[30rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:scale-[1.015] hover:border-arctic/30">
      <div className="absolute -right-20 -top-20 size-56 rounded-full bg-gradient-to-br from-arctic/25 via-wine/25 to-ember/20 blur-3xl" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-white/10 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
          {hasImage ? (
            <a
              href={certificate.image}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open certificate image for ${certificate.title} in a new tab`}
              className="group flex h-full items-center justify-center overflow-hidden rounded-[1.1rem] bg-white"
            >
              <img
                src={certificate.image}
                alt={`${certificate.title} certificate`}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                onError={() => setImageFailed(true)}
              />
            </a>
          ) : (
            <div className="grid aspect-[4/3] place-items-center rounded-[1.1rem] bg-[radial-gradient(circle_at_50%_20%,rgba(134,244,255,0.18),transparent_34%),linear-gradient(135deg,rgba(255,90,61,0.18),rgba(162,41,255,0.12),rgba(5,5,5,0.9))] p-6 text-center">
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
          <div className="mt-auto pt-8">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-ember/80">{certificate.year}</p>
              {isLinked ? (
                <a
                  href={certificate.referenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-platinum/80 transition hover:border-arctic/45 hover:bg-arctic hover:text-obsidian"
                  aria-label={`Open reference link for ${certificate.title} in a new tab`}
                >
                  Reference
                  <ExternalLink className="size-3.5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CertificatesSection() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [metrics, setMetrics] = useState({ cardWidth: 416, step: 432, offset: 0 });
  const maxIndex = Math.max(0, certificates.length - 1);

  useEffect(() => {
    const updateMetrics = () => {
      const viewportWidth = viewportRef.current?.offsetWidth ?? window.innerWidth;
      const cardWidth = Math.min(viewportWidth * 0.82, 416);
      const step = cardWidth + 16;

      setMetrics({
        cardWidth,
        step,
        offset: 0,
      });
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);

    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  const goTo = (nextIndex: number) => {
    setActiveIndex(Math.min(maxIndex, Math.max(0, nextIndex)));
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.16;

    if (swipe < -90) {
      goTo(activeIndex + 1);
    } else if (swipe > 90) {
      goTo(activeIndex - 1);
    }

  };

  return (
    <section id="certificates" className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <GradientBlob className="left-1/2 top-16 size-[34rem] -translate-x-1/2" colors="from-arctic/22 via-wine/20 to-ember/16" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <SectionHeader copy={certificatesSection} />
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

        <div
          ref={viewportRef}
          className="mt-14 overflow-hidden py-4"
        >
          <motion.div
            className="flex cursor-grab gap-4 active:cursor-grabbing"
            drag={reduceMotion ? false : "x"}
            dragElastic={0.12}
            onDrag={(event, info) => {
              setMetrics((current) => ({ ...current, offset: info.offset.x }));
            }}
            onDragEnd={(event, info) => {
              handleDragEnd(event as any, info);
              setMetrics((current) => ({ ...current, offset: 0 }));
            }}
            whileTap={{ cursor: "grabbing" }}
            animate={{ x: metrics.offset - activeIndex * metrics.step }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}
          >
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className={cn(
                  "w-[min(82vw,26rem)] flex-none transition-opacity",
                  Math.abs(index - activeIndex) > 2 && "opacity-45",
                )}
                style={{ width: metrics.cardWidth }}
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
