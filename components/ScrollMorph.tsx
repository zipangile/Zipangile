"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-driven morph wrapper. As the section travels through the viewport,
 * it subtly scales, lifts, and de-blurs — the world transforms rather than
 * just sliding past. Respects prefers-reduced-motion via framer-motion.
 */
export default function ScrollMorph({
  children,
  className = "",
  intensity = 1,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Entering: rise + unblur + settle scale. Exiting: drift + soften.
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [56 * intensity, 0, 0, -48 * intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.965, 1, 1, 0.985]);
  const blur = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [6, 0, 0, 4]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0.25]);
  const filter = useTransform(blur, (b) => `blur(${b.toFixed(2)}px)`);

  return (
    <motion.div ref={ref} style={{ y, scale, opacity, filter }} className={className}>
      {children}
    </motion.div>
  );
}
