"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Hero cinematic scroll-out.
 *
 * As the visitor leaves the hero, the whole hero block performs a camera
 * pull-back: content scales down toward 0.88, blurs to 14px, drifts up and
 * fades — while the fluid behind surges (handled by FluidBackground's
 * velocity-reactive turbulence). The effect is a dramatic dolly-out, not
 * a flat scroll-past.
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

  // Pull-back: scale 1 → 0.88, blur 0 → 14px, rise -120px, fade → 0
  const scale = useTransform(smooth, [0, 1], [1, 0.88]);
  const y = useTransform(smooth, [0, 1], [0, -120]);
  const blurV = useTransform(smooth, [0, 0.7, 1], [0, 6, 14]);
  const opacity = useTransform(smooth, [0, 0.75, 1], [1, 0.6, 0]);
  const filter = useTransform(blurV, (b) => `blur(${b.toFixed(2)}px)`);

  return (
    <motion.div ref={ref} style={{ scale, y, opacity, filter }}>
      {children}
    </motion.div>
  );
}
