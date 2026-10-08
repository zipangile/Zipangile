"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Cinematic scroll progress — a thin gradient bar fused to the top of the
 * viewport, part of the design rather than a UI afterthought. Lerped via
 * spring so it glides instead of twitching.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #9721FF 0%, #FF2E9A 50%, #F36D14 100%)",
        boxShadow: "0 0 12px rgba(151,33,255,0.6), 0 0 24px rgba(255,46,154,0.3)",
      }}
    />
  );
}
