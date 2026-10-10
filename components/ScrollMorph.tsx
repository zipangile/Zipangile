"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Cinematic scroll morph — camera rack-focus through scroll.
 *
 * As a section travels through the viewport it moves through two acts:
 *   ENTER  — rises out of blur, scale settles from 0.94 → 1 (lens finding focus)
 *   HOLD   — tack sharp, full presence, and stays that way: no exit blur or
 *            fade, so content can never rest out of focus while reading.
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

  // ENTER: rise 64px → 0, unblur 10px → 0, scale 0.94 → 1
  // HOLD:  sharp — and stays sharp. The old EXIT act (blur + fade to 0.3)
  //        left sections resting out of focus whenever scroll stopped
  //        mid-viewport, especially on phones where a section is taller
  //        than the screen. Now exit is only a gentle drift.
  const y = useTransform(
    smooth,
    [0, 0.32, 0.62, 1],
    [64 * intensity, 0, 0, -24 * intensity]
  );
  const scale = useTransform(
    smooth,
    [0, 0.32, 0.62, 1],
    [0.94, 1, 1, 0.99]
  );
  const blurV = useTransform(smooth, [0, 0.28, 0.72, 1], [10, 0, 0, 0]);
  const opacity = useTransform(smooth, [0, 0.16, 0.84, 1], [0, 1, 1, 1]);
  const filter = useTransform(blurV, (b) => `blur(${b.toFixed(2)}px)`);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity, filter }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
