import { useCallback, useEffect, useRef, useState } from "react";

export type AppRoute = "/" | "/developer" | "/designer";
export type RouteDirection = -1 | 0 | 1;

const validRoutes = new Set<AppRoute>(["/", "/developer", "/designer"]);

function normalizeRoute(pathname: string): AppRoute {
  return validRoutes.has(pathname as AppRoute)
    ? (pathname as AppRoute)
    : "/";
}

function scrollToHash(hash: string): void {
  const id = hash.replace("#", "");
  const target = document.getElementById(id);

  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getRouteDirection(route: AppRoute): RouteDirection {
  if (route === "/developer") return -1;
  if (route === "/designer") return 1;
  return 0;
}

export function useRouteNavigation() {
  const [route, setRoute] = useState<AppRoute>(() =>
    normalizeRoute(window.location.pathname),
  );
  const [direction, setDirection] = useState<RouteDirection>(() =>
    getRouteDirection(normalizeRoute(window.location.pathname)),
  );
  const pendingHashRef = useRef(window.location.hash);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    const nextRoute = normalizeRoute(url.pathname);

    pendingHashRef.current = url.hash;
    window.history.pushState({}, "", `${nextRoute}${url.hash}`);
    setDirection(getRouteDirection(nextRoute));
    setRoute(nextRoute);

    window.setTimeout(() => {
      if (url.hash) {
        scrollToHash(url.hash);
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = normalizeRoute(window.location.pathname);

      pendingHashRef.current = window.location.hash;
      setDirection(getRouteDirection(nextRoute));
      setRoute(nextRoute);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!pendingHashRef.current) return;

    const hash = pendingHashRef.current;
    pendingHashRef.current = "";

    window.setTimeout(() => scrollToHash(hash), 0);
  }, [route]);

  return { route, direction, navigate };
}
