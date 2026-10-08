"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltCard from "./TiltCard";

type PortraitCardProps = {
  src: string;
  alt: string;
  /** Campaign caption chip, e.g. "THE POWER TO CREATE" */
  caption: string;
  /** Accent hue for the chip + halo, matched to the portrait's phase */
  accent: string;
  className?: string;
  /** Parallax drift in px as the card moves through the viewport */
  parallax?: number;
};

/**
 * Reactive campaign portrait: feathered edges dissolve into the fluid
 * behind it, a soft accent halo glows through, and the whole thing
 * tilts gently with the cursor. The portrait emerges FROM the
 * environment instead of sitting on top of it.
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
      {/* Ambient halo — the portrait's own light bleeding into the fluid */}
      <div
        aria-hidden
        className="portrait-halo"
        style={{ background: `radial-gradient(circle, ${accent}55, transparent 70%)` }}
      />
      <TiltCard maxTilt={5} className="rounded-[28px]">
        <div className="relative">
          {/* Feathered image — edges dissolve, no hard rectangle */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="portrait-blend block h-auto w-full select-none"
            draggable={false}
          />
          {/* Brand grade wash so the portrait sits in the same color world */}
          <div
            aria-hidden
            className="portrait-blend pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${accent}14, transparent 45%, rgba(13,7,22,0.55))`,
            }}
          />
          {/* Caption chip floats on the dissolved edge */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center">
            <div className="flex items-center gap-2.5 rounded-full bg-black/35 px-5 py-2.5 backdrop-blur-md border border-white/10">
              <span
                aria-hidden
                className="inline-block h-6 w-1.5 rounded-full"
                style={{ background: accent }}
              />
              <span className="font-campaign text-white text-base leading-none tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {caption}
              </span>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
