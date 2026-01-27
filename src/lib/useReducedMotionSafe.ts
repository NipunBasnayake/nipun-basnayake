import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => undefined;
  }

  const mediaQueryList = window.matchMedia(QUERY);
  const handler = () => callback();

  if (mediaQueryList.addEventListener) {
    mediaQueryList.addEventListener("change", handler);
    return () => mediaQueryList.removeEventListener("change", handler);
  }

  mediaQueryList.addListener(handler);
  return () => mediaQueryList.removeListener(handler);
};

const getSnapshot = () => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia(QUERY).matches;
};

const getServerSnapshot = () => false;

export const useReducedMotionSafe = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
