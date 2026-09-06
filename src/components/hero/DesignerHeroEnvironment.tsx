import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { HeroFloatingTool } from "../../data/heroTools";
import { FloatingToolNode } from "./FloatingToolNode";

interface DesignerHeroEnvironmentProps {
  tools: HeroFloatingTool[];
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduceMotion: boolean;
}

export function DesignerHeroEnvironment({
  tools,
  pointerX,
  pointerY,
  reduceMotion,
}: DesignerHeroEnvironmentProps) {
  // Parallax transformations for background creative layers
  const frameParallaxX = useTransform(pointerX, [-1, 1], [-12, 12]);
  const frameParallaxY = useTransform(pointerY, [-1, 1], [-8, 8]);

  const bezierParallaxX = useTransform(pointerX, [-1, 1], [14, -14]);
  const bezierParallaxY = useTransform(pointerY, [-1, 1], [10, -10]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Deep Creative Studio Ambient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(32,10,36,0.5)_0%,rgba(5,5,5,0)_72%)]" />
      <div className="absolute left-[8%] top-[16%] size-[32rem] rounded-full bg-wine/[0.05] blur-3xl" />
      <div className="absolute right-[5%] bottom-[12%] size-[34rem] rounded-full bg-ember/[0.045] blur-3xl" />

      {/* 2. Abstract Blurred Poster Depth Fragments (Tactile Composition Layers) */}
      <motion.div
        className="absolute inset-0 hidden opacity-60 md:block"
        style={{
          x: reduceMotion ? 0 : frameParallaxX,
          y: reduceMotion ? 0 : frameParallaxY,
        }}
      >
        {/* Top-Left Abstract Artboard / Poster Fragment */}
        <div
          className="absolute left-[3%] top-[12%] h-[18rem] w-[14rem] rounded-3xl border border-white/[0.06] p-4 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(145deg, rgba(162, 41, 255, 0.12) 0%, rgba(255, 90, 61, 0.05) 50%, rgba(5, 5, 5, 0.4) 100%)",
            transform: "rotate(-3deg)",
          }}
        >
          {/* Internal abstract composition circle & baseline lines */}
          <div className="size-16 rounded-full border border-wine/25 bg-wine/10" />
          <div className="mt-8 space-y-2">
            <div className="h-1 w-3/4 rounded-full bg-white/[0.08]" />
            <div className="h-1 w-1/2 rounded-full bg-white/[0.06]" />
            <div className="h-1 w-2/3 rounded-full bg-white/[0.04]" />
          </div>
        </div>

        {/* Bottom-Right Abstract Layout Card */}
        <div
          className="absolute right-[4%] bottom-[14%] h-[20rem] w-[15rem] rounded-3xl border border-white/[0.06] p-5 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(215deg, rgba(255, 90, 61, 0.1) 0%, rgba(162, 41, 255, 0.06) 60%, rgba(5, 5, 5, 0.5) 100%)",
            transform: "rotate(2.5deg)",
          }}
        >
          <div className="flex justify-between">
            <div className="size-3 rounded-full bg-ember/30" />
            <span className="font-mono text-[0.55rem] text-platinum/30">CANVAS_02</span>
          </div>
          <div className="mt-12 h-24 rounded-2xl border border-ember/20 bg-ember/5" />
        </div>
      </motion.div>

      {/* 3. Floating Design Frames with Crop & Registration Marks */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: reduceMotion ? 0 : frameParallaxX,
          y: reduceMotion ? 0 : frameParallaxY,
        }}
      >
        {/* Frame A: Artboard Outline with Corner Crop Marks (Mid Left) */}
        <motion.div
          className="absolute left-[8%] top-[28%] hidden h-[22rem] w-[16rem] rounded-[2rem] border border-wine/20 lg:block"
          animate={
            reduceMotion
              ? undefined
              : { rotate: [-1.5, 0.5, -1.5], y: [0, -8, 0] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Top-Left Crop Mark */}
          <span className="absolute -left-2 -top-2 size-4 border-l-2 border-t-2 border-platinum/30" />
          {/* Top-Right Crop Mark */}
          <span className="absolute -right-2 -top-2 size-4 border-r-2 border-t-2 border-platinum/30" />
          {/* Bottom-Left Crop Mark */}
          <span className="absolute -bottom-2 -left-2 size-4 border-b-2 border-l-2 border-platinum/30" />
          {/* Bottom-Right Crop Mark */}
          <span className="absolute -bottom-2 -right-2 size-4 border-b-2 border-r-2 border-platinum/30" />
          <span className="absolute left-4 top-4 font-mono text-[0.55rem] uppercase tracking-widest text-platinum/35">
            ARTBOARD // 300 DPI
          </span>
        </motion.div>

        {/* Frame B: Poster Aspect Outline (Mid Right) */}
        <motion.div
          className="absolute right-[9%] top-[22%] hidden h-[24rem] w-[17rem] rounded-2xl border border-dashed border-ember/20 xl:block"
          animate={
            reduceMotion
              ? undefined
              : { rotate: [1.2, -0.8, 1.2], y: [0, 10, 0] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <span className="absolute right-4 bottom-4 font-mono text-[0.55rem] uppercase tracking-widest text-ember/40">
            A3 POSTER FRAME
          </span>
        </motion.div>
      </motion.div>

      {/* 4. Elegant SVG Bezier Path with Anchor Nodes & Control Handles */}
      <motion.div
        className="absolute inset-0 hidden sm:block"
        style={{
          x: reduceMotion ? 0 : bezierParallaxX,
          y: reduceMotion ? 0 : bezierParallaxY,
        }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flowing Master Bezier Path */}
          <path
            d="M 100 240 C 380 120 480 620 920 420 S 1360 680 1400 720"
            stroke="rgba(162, 41, 255, 0.16)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />

          {/* Secondary Organic Accent Curve */}
          <path
            d="M 180 720 C 440 820 620 480 1080 320 T 1380 200"
            stroke="rgba(255, 90, 61, 0.12)"
            strokeWidth="1.2"
          />

          {/* Anchor Node 1 with Tangent Handles */}
          <line
            x1="340"
            y1="190"
            x2="440"
            y2="330"
            stroke="rgba(162, 41, 255, 0.35)"
            strokeWidth="1"
          />
          <circle cx="340" cy="190" r="3" fill="#ff5a3d" fillOpacity="0.7" />
          <circle cx="440" cy="330" r="3" fill="#a229ff" fillOpacity="0.7" />
          <rect
            x="386"
            y="256"
            width="8"
            height="8"
            fill="#f4f0e8"
            stroke="#a229ff"
            strokeWidth="1.5"
          />

          {/* Anchor Node 2 (Right Studio Area) */}
          <line
            x1="860"
            y1="460"
            x2="980"
            y2="380"
            stroke="rgba(255, 90, 61, 0.35)"
            strokeWidth="1"
          />
          <circle cx="860" cy="460" r="3" fill="#86f4ff" fillOpacity="0.7" />
          <circle cx="980" cy="380" r="3" fill="#ff5a3d" fillOpacity="0.7" />
          <rect
            x="916"
            y="416"
            width="8"
            height="8"
            fill="#f4f0e8"
            stroke="#ff5a3d"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* 5. Special Creative Micro-Motifs (Color Swatches & Studio Badges) */}
      <div className="absolute inset-0 select-none">
        {/* Color Swatch Chip Motif */}
        <motion.div
          className="absolute left-[6%] top-[22%] hidden items-center gap-2 rounded-full border border-white/10 bg-obsidian/80 px-3 py-1.5 shadow-lg backdrop-blur-md sm:flex"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="font-mono text-[0.55rem] uppercase tracking-widest text-platinum/40">
            PALETTE
          </span>
          <div className="flex items-center gap-1">
            <span className="size-2.5 rounded-full bg-[#ff5a3d] shadow-[0_0_6px_#ff5a3d]" />
            <span className="size-2.5 rounded-full bg-[#a229ff] shadow-[0_0_6px_#a229ff]" />
            <span className="size-2.5 rounded-full bg-[#86f4ff] shadow-[0_0_6px_#86f4ff]" />
            <span className="size-2.5 rounded-full bg-[#f4f0e8]" />
          </div>
        </motion.div>

        {/* Creative Typographic Baseline Motif (Lower Right) */}
        <motion.div
          className="absolute right-[6%] bottom-[22%] hidden items-center gap-2 rounded border border-wine/20 bg-obsidian/75 px-2.5 py-1 font-mono text-[0.58rem] tracking-wider text-wine/70 backdrop-blur-sm md:flex"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <span>TYPE: GEOMETRIC / OPTICAL</span>
          <span className="text-ember/80">300 DPI</span>
        </motion.div>
      </div>

      {/* 6. Connected 3-Tier Designer Tools (Photoshop, Illustrator, InDesign, Premiere, After Effects, Corel, 3ds Max, Maya, Lumion) */}
      <div className="absolute inset-0">
        {tools.map((tool) => (
          <FloatingToolNode
            key={tool.id}
            tool={tool}
            variant="designer"
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
