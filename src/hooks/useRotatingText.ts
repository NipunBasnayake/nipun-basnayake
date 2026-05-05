import { useEffect, useState } from "react";

export function useRotatingText(items: string[], interval = 2200): string {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, items.length]);

  return items[index] ?? "";
}
