"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

// Number of campaign palette phases in lib/fluidSim (FLUID_PHASES) —
// kept as a literal here so the heavy sim module stays lazy-loaded.
const PALETTE_PHASE_COUNT = 4;

type SimHandle = {
  destroy: () => void;
  setPalettePosition?: (p: number) => void;
};

/**
 * Fixed WebGL fluid-simulation canvas behind all content.
 * - Campaign-colored reactive fluid: as the visitor scrolls, the palette
 *   breathes through the "THE POWER TO ..." sunset phases
 *   (CREATE → GROW → BUILD → BE YOU → CREATE)
 * - Cursor/touch movement pushes the fluid; gentle ambient drift when idle
 * - Pauses when tab hidden; respects prefers-reduced-motion (static gradient)
 * - pointer-events: none so it never blocks interaction
 */
export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<SimHandle | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    (async () => {
      try {
        const { createFluidSimulation } = await import("../lib/fluidSim");
        if (cancelled) return;
        // Lower dye resolution on small screens for perf
        const small = Math.min(window.innerWidth, window.innerHeight) < 700;
        const sim = createFluidSimulation(canvas, {
          DYE_RESOLUTION: small ? 384 : 768,
          BLOOM_INTENSITY: 0.5,
        });
        simRef.current = sim;
        // Start on the CREATE phase (orange → purple), the campaign signature
        sim.setPalettePosition?.(0);
      } catch (err) {
        console.warn("FluidBackground: WebGL unavailable, using static backdrop.", err);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      simRef.current?.destroy();
      simRef.current = null;
    };
  }, [reducedMotion]);

  // Scroll drives the fluid's palette: page progress 0→1 maps across the
  // campaign phases and wraps back to CREATE at the bottom.
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      simRef.current?.setPalettePosition?.(v * PALETTE_PHASE_COUNT);
    });
    return unsub;
  }, [scrollYProgress]);

  if (reducedMotion || failed) {
    // Calm static fallback — warm sunset brand gradient, no motion
    return (
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px circle at 20% 8%, rgba(243,109,20,0.16), transparent 60%), radial-gradient(1000px circle at 80% 30%, rgba(151,33,255,0.14), transparent 60%), radial-gradient(800px circle at 85% 85%, rgba(255,46,154,0.10), transparent 60%), #0D0716",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none h-full w-full"
      style={{ background: "#0D0716" }}
    />
  );
}
