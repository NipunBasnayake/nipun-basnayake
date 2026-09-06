import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { HeroFloatingTool } from "../../data/heroTools";
import { FloatingToolNode } from "./FloatingToolNode";

interface DeveloperHeroEnvironmentProps {
  tools: HeroFloatingTool[];
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduceMotion: boolean;
}

export function DeveloperHeroEnvironment({
  tools,
  pointerX,
  pointerY,
  reduceMotion,
}: DeveloperHeroEnvironmentProps) {
  // Parallax transformations for background architectural layers
  const gridParallaxX = useTransform(pointerX, [-1, 1], [-8, 8]);
  const gridParallaxY = useTransform(pointerY, [-1, 1], [-6, 6]);

  const networkParallaxX = useTransform(pointerX, [-1, 1], [10, -10]);
  const networkParallaxY = useTransform(pointerY, [-1, 1], [8, -8]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Deep Architectural Ambient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,24,44,0.45)_0%,rgba(5,5,5,0)_70%)]" />
      <div className="absolute left-[5%] top-[20%] size-[28rem] rounded-full bg-arctic/[0.035] blur-3xl" />
      <div className="absolute right-[8%] bottom-[15%] size-[32rem] rounded-full bg-wine/[0.03] blur-3xl" />

      {/* 2. Distant Architectural Coordinate Grid Layer */}
      <motion.div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          x: reduceMotion ? 0 : gridParallaxX,
          y: reduceMotion ? 0 : gridParallaxY,
        }}
      >
        <svg
          className="h-full w-full stroke-arctic/[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dev-arch-grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                strokeWidth="0.75"
              />
              {/* Corner crosshairs */}
              <path
                d="M 0 4 L 0 -4 M -4 0 L 4 0"
                stroke="rgba(134, 244, 255, 0.25)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dev-arch-grid)" />
        </svg>
      </motion.div>

      {/* 3. SVG Architectural Network Circuit & Connection Topology */}
      <motion.div
        className="absolute inset-0 hidden sm:block"
        style={{
          x: reduceMotion ? 0 : networkParallaxX,
          y: reduceMotion ? 0 : networkParallaxY,
        }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Path 1: Cloud & Ingress -> Spring Boot Module */}
          <path
            id="net-path-1"
            d="M 120 180 Q 320 220 540 260 T 1160 290"
            stroke="rgba(134, 244, 255, 0.12)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />

          {/* Path 2: Spring Boot -> Kafka & Event Stream -> TypeScript */}
          <path
            id="net-path-2"
            d="M 1160 290 Q 1340 220 1280 480 T 1120 540"
            stroke="rgba(134, 244, 255, 0.14)"
            strokeWidth="1.2"
          />

          {/* Path 3: Java Core -> React UI -> Postgres & Docker Cluster */}
          <path
            id="net-path-3"
            d="M 220 320 Q 140 520 240 680 T 560 760 L 980 720"
            stroke="rgba(134, 244, 255, 0.10)"
            strokeWidth="1.2"
            strokeDasharray="3 5"
          />

          {/* Cross Connector Line with Junction Nodes */}
          <line
            x1="240"
            y1="680"
            x2="480"
            y2="740"
            stroke="rgba(134, 244, 255, 0.16)"
            strokeWidth="1"
          />
          <circle cx="240" cy="680" r="3" fill="#86f4ff" fillOpacity="0.4" />
          <circle cx="480" cy="740" r="2.5" fill="#86f4ff" fillOpacity="0.5" />
          <circle cx="1160" cy="290" r="3" fill="#86f4ff" fillOpacity="0.5" />
          <circle cx="1120" cy="540" r="3" fill="#86f4ff" fillOpacity="0.4" />

          {/* Network Energy Pulses (Subtle cyan data flow) */}
          {!reduceMotion && (
            <>
              {/* Pulse 1: Traveling along Ingress -> Spring Boot */}
              <circle r="3" fill="#86f4ff">
                <animateMotion
                  dur="7s"
                  repeatCount="indefinite"
                  path="M 120 180 Q 320 220 540 260 T 1160 290"
                />
              </circle>
              {/* Pulse 2: Traveling along UI -> Microservice cluster */}
              <circle r="2.5" fill="#86f4ff" opacity="0.8">
                <animateMotion
                  dur="9s"
                  begin="2s"
                  repeatCount="indefinite"
                  path="M 220 320 Q 140 520 240 680 T 560 760 L 980 720"
                />
              </circle>
            </>
          )}
        </svg>
      </motion.div>

      {/* 4. Technical Micro-Telemetry Fragments (Refined Architectural Detail) */}
      <div className="absolute inset-0 select-none">
        {/* Fragment 1: Upper Left Telemetry */}
        <motion.div
          className="absolute left-[4%] top-[24%] hidden items-center gap-2 rounded border border-arctic/15 bg-obsidian/75 px-2.5 py-1 font-mono text-[0.6rem] tracking-widest text-arctic/50 backdrop-blur-sm lg:flex"
          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <span className="size-1.5 rounded-full bg-arctic/80 shadow-[0_0_8px_#86f4ff]" />
          <span>SYS.RUN // CLOUD_INGRESS</span>
        </motion.div>

        {/* Fragment 2: Top Right Event Stream Tag */}
        <motion.div
          className="absolute right-[5%] top-[14%] hidden items-center gap-1.5 rounded border border-arctic/15 bg-obsidian/75 px-2 py-0.5 font-mono text-[0.58rem] tracking-wider text-arctic/45 backdrop-blur-sm md:flex"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <span className="text-arctic/70">[EVENT_BUS]</span>
          <span>:: KAFKA_SYNC</span>
        </motion.div>

        {/* Fragment 3: Mid Right Deployment Status */}
        <motion.div
          className="absolute right-[6%] top-[66%] hidden items-center gap-2 rounded border border-arctic/15 bg-obsidian/75 px-2.5 py-1 font-mono text-[0.6rem] tracking-widest text-platinum/50 backdrop-blur-sm xl:flex"
          initial={reduceMotion ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <span className="size-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_#34d399]" />
          <span>01_DEPLOY :: COMPILED</span>
        </motion.div>

        {/* Fragment 4: Lower Left Query / API Fragment */}
        <motion.div
          className="absolute bottom-[20%] left-[6%] hidden items-center gap-2 rounded border border-arctic/15 bg-obsidian/75 px-2 py-0.5 font-mono text-[0.58rem] tracking-wider text-arctic/40 backdrop-blur-sm sm:flex"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <span>POST /api/v2/stream</span>
          <span className="text-arctic/60">{"{200 OK}"}</span>
        </motion.div>
      </div>

      {/* 5. Connected 3-Tier Developer Tools (React, Spring Boot, TypeScript, Docker, Java, AWS, Kafka, Postgres) */}
      <div className="absolute inset-0">
        {tools.map((tool) => (
          <FloatingToolNode
            key={tool.id}
            tool={tool}
            variant="developer"
            pointerX={pointerX}
            pointerY={pointerY}
            reduceMotion={reduceMotion}
            entranceDelay={0.45}
          />
        ))}
      </div>
    </div>
  );
}
