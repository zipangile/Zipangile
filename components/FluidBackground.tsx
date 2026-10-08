"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

// Number of campaign palette phases in lib/fluidSim (FLUID_PHASES) —
// kept as a literal here so the heavy sim module stays lazy-loaded.
const PALETTE_PHASE_COUNT = 4;

type SimHandle = {
  destroy: () => void;
  setPalettePosition?: (p: number) => void;
  setCalmMode?: (calm: boolean) => void;
  injectEnergy?: (amount: number) => void;
};

/**
 * Fixed WebGL fluid-simulation canvas behind all content.
 * - Campaign-colored reactive fluid: as the visitor scrolls, the palette
 *   breathes through the "THE POWER TO ..." sunset phases
 *   (CREATE → GROW → BUILD → BE YOU → CREATE), lerped — never twitchy
 * - Scroll VELOCITY injects turbulence: fast scrolling stirs the fluid,
 *   settled reading lets it calm (Lusion's cardinal rule)
 * - Calm mode: when the visitor focuses a form field (quote wizard,
 *   booking), the fluid damps to 25% energy — motion behind the message
 * - Cinematic post grade: film grain + vignette overlay unifies fluid,
 *   cards, portraits, and type into one world
 * - Cursor/touch movement pushes the fluid; gentle ambient drift when idle
 * - Pauses when tab hidden; respects prefers-reduced-motion (static gradient)
 * - pointer-events: none so it never blocks interaction
 */
export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<SimHandle | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scrollYVelocity = useVelocity(scrollY);

  // Parallax: the fluid drifts at a different rate than content —
  // depth between the world and the UI floating above it.
  const parallaxY = useTransform(scrollY, [0, 2000], [0, -140]);
  const smoothParallax = useSpring(parallaxY, { stiffness: 60, damping: 20 });

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

  // Scroll drives the fluid's palette (lerped inside the sim) and scroll
  // VELOCITY injects turbulence — the fluid senses the reader's energy.
  useEffect(() => {
    let lastV = 0;
    let energyAcc = 0;
    const unsubPos = scrollYProgress.on("change", (v) => {
      simRef.current?.setPalettePosition?.(v * PALETTE_PHASE_COUNT);
    });
    const unsubVel = scrollYVelocity.on("change", (v) => {
      // Lerp the velocity itself so turbulence eases in/out
      const lerped = lastV + (v - lastV) * 0.12;
      lastV = lerped;
      const speed = Math.abs(lerped);
      // Threshold: ignore micro-jitter, burst on real scrolls
      if (speed > 800) {
        energyAcc += (speed - 800) / 4000;
        if (energyAcc >= 1) {
          simRef.current?.injectEnergy?.(Math.min(energyAcc, 4));
          energyAcc = 0;
        }
      }
    });
    return () => {
      unsubPos();
      unsubVel();
    };
  }, [scrollYProgress, scrollYVelocity]);

  // Restraint on forms (Stripe's rule): when the visitor focuses any
  // input/textarea/select, damp the fluid so it never competes with typing.
  useEffect(() => {
    if (reducedMotion) return;
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (t.matches("input, textarea, select")) simRef.current?.setCalmMode?.(true);
    };
    const onFocusOut = () => simRef.current?.setCalmMode?.(false);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, [reducedMotion]);

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
    <>
      <motion.canvas
        ref={canvasRef}
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none h-full w-full"
        style={{ background: "#0D0716", y: smoothParallax, scale: 1.08 }}
      />
      {/* Cinematic post grade — film grain + vignette. One unified grade
          makes fluid, cards, portraits, and type feel like a single world. */}
      <div aria-hidden className="post-grade" />
    </>
  );
}
