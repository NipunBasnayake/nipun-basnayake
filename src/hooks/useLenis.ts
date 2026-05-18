import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis(): void {
  useEffect(() => {
    // Gate 1: Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      return;
    }

    // Gate 2: Check for coarse pointer (touch devices, stylus)
    // On mobile, native scroll is already smooth enough; use battery and main-thread budget instead
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    if (coarsePointerQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.85, // Slightly faster; users on desktop can handle smooth 0.85s
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      syncTouch: false,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    // Handle visibility change: pause RAF loop when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        frameId = requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    frameId = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);
}
