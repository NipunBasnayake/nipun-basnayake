"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { personalData, sectionsData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";

const fadeUp = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <motion.div {...fadeUp(reduceMotion)}>
            <Badge className="border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
              {sectionsData.hero.subtitle}
            </Badge>
          </motion.div>
          <motion.h1
            className="text-4xl font-semibold leading-tight text-white md:text-5xl"
            {...fadeUp(reduceMotion, 0.1)}
          >
            {personalData.fullName}
          </motion.h1>
          <motion.p
            className="text-base text-white/70 md:text-lg"
            {...fadeUp(reduceMotion, 0.2)}
          >
            {personalData.bio}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-2"
            {...fadeUp(reduceMotion, 0.3)}
          >
            {personalData.roles.map((role) => (
              <Badge key={role} className="border-white/10 bg-white/5 text-white/70">
                {role}
              </Badge>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-3"
            {...fadeUp(reduceMotion, 0.4)}
          >
            {sectionsData.hero.ctaButtons.map((button) => (
              <Button
                key={button.text}
                href={button.link}
                variant={button.type === "outline" ? "outline" : "primary"}
              >
                {button.text}
              </Button>
            ))}
          </motion.div>
          <motion.div
            className="grid gap-3 text-sm text-white/70 sm:grid-cols-2"
            {...fadeUp(reduceMotion, 0.5)}
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-300" />
              <span>{personalData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-300" />
              <a href={`mailto:${personalData.email}`} className="hover:text-white">
                {personalData.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-cyan-300" />
              <a href={`tel:${personalData.phone}`} className="hover:text-white">
                {personalData.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-100">
                {personalData.experience}+ Years Experience
              </Badge>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="relative"
          {...fadeUp(reduceMotion, 0.2)}
        >
          <div className="relative mx-auto h-[360px] w-[280px] sm:h-[420px] sm:w-[340px]">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-400/20 via-transparent to-fuchsia-500/30 blur-2xl" />
            <ImageWithFallback
              src={personalData.profilePic}
              alt={personalData.fullName}
              fill
              priority
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-6 hidden w-32 sm:block">
            <ImageWithFallback
              src={personalData.illustration}
              alt="Profile illustration"
              width={160}
              height={160}
              className="rounded-3xl border border-white/10 bg-white/5"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
