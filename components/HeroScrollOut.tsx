"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Hero scroll-out.
 *
 * As the visitor leaves the hero, the whole hero block gently recedes:
 * scales down toward 0.94, drifts up and fades — while the fluid behind
 * surges (handled by FluidBackground's velocity-reactive turbulence).
 * Deliberately no blur: the focus-pull effect read as broken on real
 * devices, and the hero must stay crisp until it's off-screen.
 */
export default function HeroScrollOut({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.6,
  });

  // Gentle recede: scale 1 → 0.94, rise -80px, fade → 0. No blur.
  const scale = useTransform(smooth, [0, 1], [1, 0.94]);
  const y = useTransform(smooth, [0, 1], [0, -80]);
  const opacity = useTransform(smooth, [0, 0.75, 1], [1, 0.6, 0]);

  return (
    <motion.div ref={ref} style={{ scale, y, opacity }}>
      {children}
    </motion.div>
  );
}
