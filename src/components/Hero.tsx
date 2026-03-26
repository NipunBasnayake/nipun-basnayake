"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Award, Code2, Briefcase } from "lucide-react";
import { personalData, sectionsData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const fadeUp = (reduceMotion: boolean, delay = 0) => ({
  initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const typingRoles = [
  "Full Stack Software Engineer",
  "Spring Boot Developer",
  "React Developer",
  "SaaS Architect",
];

function useTypingEffect(texts: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = texts[currentTextIndex];

    if (!isDeleting && currentText === targetText) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setCurrentText((prev) =>
          isDeleting
            ? targetText.substring(0, prev.length - 1)
            : targetText.substring(0, prev.length + 1)
        );
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return currentText;
}

export function Hero() {
  const reduceMotion = useReducedMotionSafe();
  const typedText = useTypingEffect(typingRoles, 80, 40, 2000);

  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <motion.div {...fadeUp(reduceMotion)}>
            <Badge className="border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
              <Briefcase className="mr-1.5 inline h-3.5 w-3.5" />
              {sectionsData.hero.subtitle}
            </Badge>
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              className="text-4xl font-semibold leading-tight text-white md:text-5xl"
              {...fadeUp(reduceMotion, 0.1)}
            >
              {personalData.fullName}
            </motion.h1>

            <motion.div
              className="flex items-center gap-2 text-2xl font-medium md:text-3xl"
              {...fadeUp(reduceMotion, 0.15)}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>
          </div>

          <motion.p
            className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
            {...fadeUp(reduceMotion, 0.2)}
          >
            I build scalable, real-world systems with modern technologies. Specialized in enterprise applications, RESTful APIs, and cloud-native solutions.
          </motion.p>

          {/* Stats Badges */}
          <motion.div
            className="flex flex-wrap gap-3"
            {...fadeUp(reduceMotion, 0.25)}
          >
            <Badge className="border-cyan-300/40 bg-cyan-300/10 text-cyan-100">
              <Award className="mr-1.5 inline h-3.5 w-3.5" />
              6+ Months Industry Experience
            </Badge>
            <Badge className="border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-100">
              <Code2 className="mr-1.5 inline h-3.5 w-3.5" />
              20+ Projects Built
            </Badge>
            <Badge className="border-green-400/40 bg-green-400/10 text-green-100">
              Spring Boot + React
            </Badge>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            {...fadeUp(reduceMotion, 0.3)}
          >
            <Button
              href="#projects"
              variant="primary"
            >
              View Projects
            </Button>
            <Button
              href="/assets/cv/Nipun_Sathsara_Basanayaka_Software_Engineer_CV.pdf"
              variant="outline"
              download
            >
              Download CV
            </Button>
          </motion.div>

          <motion.div
            className="grid gap-3 text-sm text-white/70 sm:grid-cols-2"
            {...fadeUp(reduceMotion, 0.35)}
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
          </motion.div>
        </div>
        <motion.div
          className="relative"
          {...fadeUp(reduceMotion, 0.2)}
        >
          <div className="relative mx-auto h-[400px] w-[300px] sm:h-[460px] sm:w-[380px] lg:h-[600px] lg:w-[450px]">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-400/20 via-transparent to-fuchsia-500/30 blur-2xl" />
            <ImageWithFallback
              src={personalData.profilePic}
              alt={personalData.firstName + " " + personalData.lastName}
              fill
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-cover"
            />
          </div>
          </motion.div>
      </div>
    </section>
  );
}
