"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltCard from "./TiltCard";

type CutoutFigureProps = {
  src: string;
  alt: string;
  /** Accent hue for the ground glow, matched to the section's phase */
  accent: string;
  className?: string;
  /** Parallax drift in px as the figure moves through the viewport */
  parallax?: number;
  /** Rendered height cap (px) — figures scale generously by default */
  maxHeight?: number;
};

/**
 * Borderless cutout figure: a transparent-background PNG floating directly
 * on the fluid. No card, no border, no box — just the figure, a soft
 * ground shadow so it feels planted in the scene, a faint accent glow,
 * parallax drift and gentle cursor tilt. The figure stands IN the world.
 */
export default function CutoutFigure({
  src,
  alt,
  accent,
  className = "",
  parallax = 30,
  maxHeight = 560,
}: CutoutFigureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div ref={ref} style={{ y }} className={`relative ${className}`}>
      {/* Ground glow — the figure's own light pooling beneath it */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-[90%] rounded-full blur-[90px]"
        style={{ background: `radial-gradient(ellipse, ${accent}30, transparent 70%)` }}
      />
      <TiltCard maxTilt={4} glare={false} className="bg-transparent border-0 shadow-none">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            draggable={false}
            className="block h-auto w-full select-none pointer-events-none"
            style={{
              maxHeight,
              objectFit: "contain",
              // Soft contact shadow grounding the figure in the scene
              filter: `drop-shadow(0 42px 48px rgba(0,0,0,0.55)) drop-shadow(0 8px 18px ${accent}33)`,
            }}
          />
        </div>
      </TiltCard>
    </motion.div>
  );
}
