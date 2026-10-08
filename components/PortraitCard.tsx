"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltCard from "./TiltCard";

type PortraitCardProps = {
  src: string;
  alt: string;
  /** Campaign caption chip, e.g. "THE POWER TO CREATE" */
  caption: string;
  /** Accent hue for the chip + ring, matched to the portrait's phase */
  accent: string;
  className?: string;
  /** Parallax drift in px as the card moves through the viewport */
  parallax?: number;
};

/**
 * Reactive campaign portrait: 3D cursor tilt + glare (TiltCard), gentle
 * scroll parallax, and a "THE POWER TO ..." caption chip. The portraits
 * carry the campaign's fashion-editorial energy into the page.
 */
export default function PortraitCard({
  src,
  alt,
  caption,
  accent,
  className = "",
  parallax = 36,
}: PortraitCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div ref={ref} style={{ y }} className={`relative ${className}`}>
      <TiltCard maxTilt={6} className="rounded-2xl">
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          style={{ boxShadow: `0 24px 80px rgba(0,0,0,0.55), 0 0 64px ${accent}26` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="block h-auto w-full select-none"
            draggable={false}
          />
          {/* Bottom grade so the caption chip sits cleanly */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-8 w-1.5 rounded-full"
              style={{ background: accent }}
            />
            <span className="font-campaign text-white text-lg leading-none tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {caption}
            </span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
