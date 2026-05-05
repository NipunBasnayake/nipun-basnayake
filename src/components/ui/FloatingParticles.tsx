import { motion, useReducedMotion } from "framer-motion";

const particles = Array.from({ length: 22 }, (_, index) => ({
  id: `particle-${index}`,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 2 + (index % 4),
  duration: 7 + (index % 6),
  delay: index * 0.22,
}));

export function FloatingParticles() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-platinum/70 shadow-[0_0_18px_rgba(244,240,232,0.45)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -18, 0],
                  opacity: [0.18, 0.8, 0.18],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
