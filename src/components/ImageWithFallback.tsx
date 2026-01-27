"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = ImageProps & {
  wrapperClassName?: string;
  fallbackText?: string;
};

export function ImageWithFallback({
  wrapperClassName,
  fallbackText = "Image unavailable",
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xs text-white/50",
          wrapperClassName
        )}
        role="img"
        aria-label={props.alt}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={() => setHasError(true)}
      className={cn("rounded-2xl", props.className)}
    />
  );
}
