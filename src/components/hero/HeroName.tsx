import { motion } from "framer-motion";
import { heroData } from "../../data/portfolio";
import type { HeroVariant } from "../../data/heroTools";
import { cn } from "../../lib/utils";

interface HeroNameProps {
  variant: HeroVariant;
  reduceMotion: boolean;
}

export function HeroName({ variant, reduceMotion }: HeroNameProps) {
  const isDeveloper = variant === "developer";

  const topGradient = isDeveloper
    ? "from-platinum via-arctic/80 to-platinum/50"
    : "from-platinum via-wine/85 to-platinum/50";

  const bottomGradient = isDeveloper
    ? "from-platinum via-arctic to-platinum/90"
    : "from-platinum via-ember to-wine/90";

  return (
    <>
      {/* Top Name: NIPUN (Behind Portrait, z-20) */}
      <div className="pointer-events-none absolute inset-x-0 top-[17%] z-20 select-none text-center sm:top-[16%] md:top-[15%] lg:top-[26%]">
        {/* Desktop / Tablet */}
        <motion.div
          className="hidden sm:block"
          initial={reduceMotion ? false : { opacity: 0, y: 32, filter: "blur(14px)" }}
          animate={{ opacity: 0.92, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <h1
            className={cn(
              "bg-gradient-to-r bg-clip-text font-display text-[5.5rem] font-black leading-[0.74] tracking-normal text-transparent sm:text-[8rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] 2xl:text-[23rem]",
              topGradient,
            )}
          >
            {heroData.nameLines[0]}
          </h1>
        </motion.div>

        {/* Mobile */}
        <motion.div
          className="block sm:hidden"
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.72, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <h1
            className={cn(
              "bg-gradient-to-r bg-clip-text font-display text-[4rem] font-black leading-[0.78] tracking-normal text-transparent min-[390px]:text-[4.8rem]",
              topGradient,
            )}
          >
            {heroData.nameLines[0]}
          </h1>
        </motion.div>
      </div>

      {/* Bottom Name: BASNAYAKA (Foreground in front of Portrait base, z-40) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[13%] z-40 select-none text-center sm:bottom-[15%] md:bottom-[16%] lg:bottom-[11%]">
        {/* Desktop / Tablet */}
        <motion.div
          className="hidden sm:block"
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 0.82, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <h1
            className={cn(
              "bg-gradient-to-r bg-clip-text font-display text-[4.2rem] font-black leading-[0.78] tracking-normal text-transparent sm:text-[6rem] md:text-[8rem] lg:text-[10rem] 2xl:text-[13rem]",
              bottomGradient,
            )}
          >
            {heroData.nameLines[1]}
          </h1>
        </motion.div>

        {/* Mobile */}
        <motion.div
          className="block sm:hidden"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 0.72, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <h1
            className={cn(
              "bg-gradient-to-r bg-clip-text font-display text-[2.9rem] font-black leading-[0.82] tracking-normal text-transparent min-[390px]:text-[3.45rem]",
              bottomGradient,
            )}
          >
            {heroData.nameLines[1]}
          </h1>
        </motion.div>
      </div>
    </>
  );
}
