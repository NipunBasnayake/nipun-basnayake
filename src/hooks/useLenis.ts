import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis(): void {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      syncTouch: false,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);
}
