import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects, projectsSection } from "../../data/portfolio";
import { cn } from "../../lib/utils";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { ProjectCard } from "../ui/ProjectCard";

export function ProjectsSection() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [metrics, setMetrics] = useState({ cardWidth: 928, step: 948, offset: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const maxIndex = projects.length - 1;

  useEffect(() => {
    const updateMetrics = () => {
      const viewportWidth = viewportRef.current?.offsetWidth ?? window.innerWidth;
      const cardWidth = Math.min(viewportWidth * 0.84, 928);
      const step = cardWidth + 20;

      setMetrics({
        cardWidth,
        step,
        offset: Math.max(0, (viewportWidth - cardWidth) / 2),
      });
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);

    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  useEffect(() => {
    if (reduceMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current === maxIndex ? 0 : current + 1));
    }, 4600);

    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex, reduceMotion]);

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

    setIsPaused(false);
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-carbon py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-end">
          <SectionHeader copy={projectsSection} />
          <div className="flex items-center justify-start gap-3 lg:justify-end">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="grid size-12 place-items-center rounded-full border border-white/12 bg-white/[0.055] text-platinum transition hover:border-arctic/35 hover:bg-arctic/8 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={activeIndex === 0}
              aria-label="Previous project"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="grid size-12 place-items-center rounded-full border border-white/12 bg-white/[0.055] text-platinum transition hover:border-arctic/35 hover:bg-arctic/8 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={activeIndex === maxIndex}
              aria-label="Next project"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="mt-14 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex cursor-grab gap-5 active:cursor-grabbing"
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={handleDragEnd}
            animate={{ x: metrics.offset - activeIndex * metrics.step }}
            transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="shrink-0 snap-center"
                style={{ width: metrics.cardWidth }}
                animate={{
                  scale: index === activeIndex ? 1 : 0.9,
                  opacity: Math.abs(index - activeIndex) > 2 ? 0.4 : 1,
                }}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={cn(
                "h-2 rounded-full transition-all",
                index === activeIndex ? "w-10 bg-platinum" : "w-2 bg-white/20 hover:bg-white/40",
              )}
              onClick={() => goTo(index)}
              aria-label={`Go to ${project.title}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
