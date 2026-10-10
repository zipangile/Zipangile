"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Gentle scroll reveal — sections rise into place as they enter.
 *
 * Deliberately no blur anywhere: the old focus-pull (blur 10px → 0 on
 * enter, blur → 7 + fade on exit) left sections resting out of focus
 * whenever scroll stopped mid-viewport. Crisp text at every scroll
 * position beats a cinematic effect that reads as broken.
 *
 * All motion values are spring-lerped (Lusion's cardinal rule: never apply
 * raw scroll values — lerped values feel expensive, raw values feel twitchy).
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

  // Spring-lerp the raw progress so every derived value glides
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.5,
  });

  // ENTER: rise 48px → 0, fade in, scale 0.97 → 1. Settles sharp and
  // stays sharp — no blur, no exit fade. Content is crisp at every
  // scroll position.
  const y = useTransform(
    smooth,
    [0, 0.35, 0.65, 1],
    [48 * intensity, 0, 0, -16 * intensity]
  );
  const scale = useTransform(
    smooth,
    [0, 0.35, 0.65, 1],
    [0.97, 1, 1, 1]
  );
  const opacity = useTransform(smooth, [0, 0.18, 0.85, 1], [0, 1, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
