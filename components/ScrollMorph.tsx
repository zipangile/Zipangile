"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Cinematic scroll morph — camera rack-focus through scroll.
 *
 * As a section travels through the viewport it moves through three acts:
 *   ENTER  — rises out of blur, scale settles from 0.94 → 1 (lens finding focus)
 *   HOLD   — tack sharp, full presence
 *   EXIT   — drifts up, softens into blur, recedes to 0.96 (focus racks away)
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
  // HOLD:  sharp
  // EXIT:  drift -56px, soften to 6px blur, recede to 0.96, fade to 0.3
  const y = useTransform(
    smooth,
    [0, 0.32, 0.62, 1],
    [64 * intensity, 0, 0, -56 * intensity]
  );
  const scale = useTransform(
    smooth,
    [0, 0.32, 0.62, 1],
    [0.94, 1, 1, 0.965]
  );
  const blurV = useTransform(smooth, [0, 0.28, 0.72, 1], [10, 0, 0, 7]);
  const opacity = useTransform(smooth, [0, 0.16, 0.84, 1], [0, 1, 1, 0.3]);
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
