import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { useLenis } from "./hooks/useLenis";
import {
  type AppRoute,
  type RouteDirection,
  useRouteNavigation,
} from "./hooks/useRouteNavigation";
import { DesignerPage } from "./pages/DesignerPage";
import { DeveloperPage } from "./pages/DeveloperPage";
import { LandingPage } from "./pages/LandingPage";

const routeMeta: Record<AppRoute, { title: string; description: string }> = {
  "/": {
    title: "Nipun Basnayaka | Software Engineer + Graphic Designer",
    description:
      "Choose between Nipun Basnayaka's software engineering portfolio and freelance graphic design portfolio.",
  },
  "/developer": {
    title: "Nipun Basnayaka | Software Developer Portfolio",
    description:
      "Software engineering portfolio for Nipun Basnayaka, focused on full-stack systems, APIs, SaaS, ERP, React, Spring Boot, Docker, Kafka, and cloud-ready delivery.",
  },
  "/designer": {
    title: "Nipun Basnayaka | Graphic Designer Portfolio",
    description:
      "Graphic design portfolio for Nipun Basnayaka, a freelance graphic designer since 2019 working across brand, print, social, event, and visual design.",
  },
};

const pageVariants = {
  initial: ({
    direction,
    reduceMotion,
  }: {
    direction: RouteDirection;
    reduceMotion: boolean;
  }) => ({
    opacity: reduceMotion ? 0 : 0.72,
    x: reduceMotion
      ? 0
      : direction === -1
        ? "-100vw"
        : direction === 1
          ? "100vw"
          : 0,
    y: reduceMotion || direction !== 0 ? 0 : 16,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: ({
    direction,
    reduceMotion,
  }: {
    direction: RouteDirection;
    reduceMotion: boolean;
  }) => ({
    opacity: 0,
    x: reduceMotion
      ? 0
      : direction === -1
        ? "14vw"
        : direction === 1
          ? "-14vw"
          : 0,
    y: reduceMotion || direction !== 0 ? 0 : -12,
  }),
};

export function App() {
  useLenis();
  const reduceMotion = useReducedMotion() ?? false;
  const { route, direction, navigate } = useRouteNavigation();

  useEffect(() => {
    const meta = routeMeta[route];
    document.title = meta.title;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (description) {
      description.content = meta.description;
    }
  }, [route]);

  const page =
    route === "/developer" ? (
      <DeveloperPage />
    ) : route === "/designer" ? (
      <DesignerPage />
    ) : (
      <LandingPage onNavigate={navigate} />
    );

  return (
    <div className="min-h-screen overflow-x-hidden bg-obsidian text-platinum">
      <Navbar route={route} onNavigate={navigate} />
      <AnimatePresence
        mode="wait"
        initial={false}
        custom={{ direction, reduceMotion }}
      >
        <motion.div
          key={route}
          custom={{ direction, reduceMotion }}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: reduceMotion ? 0.16 : 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: reduceMotion ? "auto" : "transform, opacity" }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
      <Footer route={route} onNavigate={navigate} />
    </div>
  );
}
