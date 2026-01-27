"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { githubActivityData } from "@/data/portfolio";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageWithFallback } from "@/components/ImageWithFallback";

const fadeUp = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

type GitHubActivityProps = {
  rank: number | null;
  contributions: number | null;
};

type StatImageCardProps = {
  label: string;
  src: string;
  alt: string;
  tintClassName: string;
  delay: number;
  reduceMotion: boolean;
  fallbackText: string;
  heightClassName?: string;
  kind: "streak" | "langs";
};

function withGitHubCardParams(src: string, kind: "streak" | "langs") {
  try {
    const url = new URL(src);

    const host = url.hostname.toLowerCase();
    url.searchParams.set("hide_border", "true");

    const isStreak =
      host.includes("streak-stats") ||
      host.includes("demolab.com") ||
      host.includes("herokuapp.com");

    const isReadmeStats =
      host.includes("github-readme-stats") || host.includes("vercel.app");

    if (isStreak || kind === "streak") {
      url.searchParams.set("background", "00000000");
    }

    if (isReadmeStats || kind === "langs") {
      url.searchParams.set("bg_color", "00000000");
    }
    url.searchParams.set("v", "1");

    return url.toString();
  } catch {
    return src;
  }
}

function StatImageCard({
  label,
  src,
  alt,
  tintClassName,
  delay,
  reduceMotion,
  fallbackText,
  heightClassName = "h-[160px] sm:h-[140px] md:h-[190px]",
  kind,
}: StatImageCardProps) {
  const cleanedSrc = withGitHubCardParams(src, kind);

  return (
    <motion.div {...fadeUp(reduceMotion, delay)}>
      <GlowCard className={`h-full border-white/10 ${tintClassName}`}>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            {label}
          </p>

          {/* Fixed height container, auto width image */}
          <div
            className={`relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 px-4 ${heightClassName}`}
          >
            <ImageWithFallback
              src={cleanedSrc}
              alt={alt}
              unoptimized
              width={1200}
              height={300}
              className="mx-auto h-full w-auto max-h-full max-w-full object-contain"
              fallbackText={fallbackText}
            />
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export function GitHubActivity({ rank, contributions }: GitHubActivityProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const rankLabel = typeof rank === "number" ? `#${rank}` : "N/A";
  const contributionsLabel =
    typeof contributions === "number"
      ? contributions.toLocaleString()
      : "N/A";

  return (
    <section id="github-activity" className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title={githubActivityData.heading}
          subtitle={githubActivityData.subtext}
          eyebrow="Open Source"
        />

        <div className="mt-8 space-y-6">
          {/* Top cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <StatImageCard
              kind="streak"
              label="GitHub Streak"
              src={githubActivityData.streakUrl}
              alt="GitHub streak stats"
              fallbackText="Streak stats unavailable"
              reduceMotion={reduceMotion}
              delay={0}
              tintClassName="bg-gradient-to-br from-cyan-400/10 via-black/40 to-transparent"
            />

            <StatImageCard
              kind="langs"
              label="Top Languages"
              src={githubActivityData.topLanguagesUrl}
              alt="GitHub top languages"
              fallbackText="Language stats unavailable"
              reduceMotion={reduceMotion}
              delay={0.05}
              tintClassName="bg-gradient-to-br from-fuchsia-400/10 via-black/40 to-transparent"
            />
          </div>

          {/* Committers card */}
          <motion.div {...fadeUp(reduceMotion, 0.1)}>
            <GlowCard className="border-white/10 bg-gradient-to-br from-white/[0.08] via-black/50 to-cyan-400/10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Committers.top
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Sri Lanka Rank: {rankLabel}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    Contributions: {contributionsLabel}
                  </p>
                </div>

                <Button
                  href={githubActivityData.committersProfile}
                  variant="outline"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on committers.top
                </Button>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
