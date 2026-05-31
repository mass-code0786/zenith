"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  top: 12 + ((index * 29) % 76),
  size: 2 + (index % 3),
  delay: (index % 8) * 0.55,
  duration: 8 + (index % 7),
  x: ((index % 5) - 2) * 18,
  y: ((index % 7) - 3) * 14,
  opacity: 0.24 + (index % 4) * 0.06,
}));

export function HeroBackground() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 45, damping: 24, mass: 0.9 });
  const springY = useSpring(pointerY, { stiffness: 45, damping: 24, mass: 0.9 });
  const nearX = useTransform(springX, [-1, 1], [-28, 28]);
  const nearY = useTransform(springY, [-1, 1], [-18, 18]);
  const farX = useTransform(springX, [-1, 1], [18, -18]);
  const farY = useTransform(springY, [-1, 1], [12, -12]);

  useEffect(() => {
    function updatePointer(event: PointerEvent) {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      pointerX.set(x * 2);
      pointerY.set(y * 2);
    }

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [pointerX, pointerY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ x: farX, y: farY }} className="hero-aurora absolute inset-0">
        <span className="aurora-orb aurora-orb-one" />
        <span className="aurora-orb aurora-orb-two" />
        <span className="aurora-orb aurora-orb-three" />
      </motion.div>

      <motion.img
        src="/brand/zenith-mark.svg"
        alt=""
        aria-hidden="true"
        className="hero-logo-watermark"
        style={{ x: farX, y: farY }}
        animate={{ y: [0, -18, 0], rotate: [-4, 3, -4], scale: [1, 1.035, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        style={{ x: nearX, y: nearY }}
        className="hero-wave-lines absolute inset-x-[-18%] top-[8%] h-[58%] w-[136%]"
        viewBox="0 0 1400 520"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="zenithWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9945ff" stopOpacity="0" />
            <stop offset="22%" stopColor="#9945ff" />
            <stop offset="52%" stopColor="#14f195" />
            <stop offset="78%" stopColor="#00c2ff" />
            <stop offset="100%" stopColor="#00c2ff" stopOpacity="0" />
          </linearGradient>
          <filter id="zenithGlow" x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="wave-runner wave-runner-one" filter="url(#zenithGlow)">
          <path d="M-40 310 C 180 80, 335 440, 560 230 S 965 150, 1190 285 S 1515 310, 1660 130" />
          <path d="M-80 365 C 130 150, 360 450, 590 295 S 985 190, 1230 335 S 1510 360, 1680 200" />
        </g>
        <g className="wave-runner wave-runner-two" filter="url(#zenithGlow)">
          <path d="M-120 250 C 140 20, 355 360, 625 185 S 990 110, 1250 230 S 1530 285, 1700 85" />
          <path d="M-160 415 C 80 230, 325 485, 610 365 S 1040 280, 1300 420 S 1560 445, 1730 300" />
        </g>
      </motion.svg>

      <motion.div style={{ x: nearX, y: nearY }} className="absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="hero-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{
              x: [0, particle.x, -particle.x * 0.45, 0],
              y: [0, particle.y, -particle.y * 0.5, 0],
              scale: [1, 1.5, 0.85, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
