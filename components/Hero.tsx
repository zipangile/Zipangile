"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";
import CampaignHeadline from "./CampaignHeadline";
import PortraitCard from "./PortraitCard";

const BUILD_LINES = [
  { text: "$ zipangile build --scope mvp", tone: "cmd" },
  { text: "✓ scope locked · fixed price agreed", tone: "ok" },
  { text: "✓ design system · ready", tone: "ok" },
  { text: "✓ offline-first core · compiled", tone: "ok" },
  { text: "✓ client handover · documented", tone: "ok" },
  { text: "● status: systems online", tone: "live" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 30, o: 0 });

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Headline reacts to cursor proximity — the words feel lit from within
  // as the visitor's cursor drifts near them.
  const onMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    // Peak glow near the headline band (~30% down), fading with distance.
    const dy = Math.abs(y - 32) / 40;
    const o = Math.max(0, 1 - dy);
    setGlow({ x, y, o: Math.min(1, o * 1.2) });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden pt-32 pb-20"
    >
      {/* Cursor-reactive headline aura */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: glow.o * 0.9,
          background: `radial-gradient(560px circle at ${glow.x}% ${glow.y}%, rgba(151,33,255,0.20), rgba(255,46,154,0.07) 55%, transparent 75%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-[11px] text-brand-300 border border-brand-500/30 rounded-full px-5 py-2 bg-brand-950/20 backdrop-blur-sm mb-10 tracking-[0.3em] uppercase"
            >
              Studio // Systems Online
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <CampaignHeadline
                as="h1"
                align="responsive"
                lines={[
                  { text: "WE BUILD" },
                  { text: "DIGITAL" },
                  { text: "", accent: "PRODUCTS", accentColor: "#7C3AED" },
                  { text: "THAT MATTER." },
                ]}
                className="text-5xl md:text-7xl xl:text-[6.5rem]"
                style={{
                  textShadow:
                    glow.o > 0.05
                      ? `0 0 ${Math.round(60 * glow.o)}px rgba(151,33,255,${(0.45 * glow.o).toFixed(2)})`
                      : "none",
                  transition: "text-shadow 0.25s ease",
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-xl text-[#A1A1AA] max-w-2xl mb-12 font-light leading-relaxed"
            >
              Zipangile is a venture studio and engineering firm in Lusaka. We
              design and build MVPs, platforms, and offline-first systems for
              founders — and we engineer digital public goods for the next billion
              users.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-4 lg:mb-0"
            >
              <MagneticButton
                onClick={() => handleScroll("quote")}
                className="btn-gradient-brand group inline-flex items-center gap-2 px-8 py-4 text-white font-medium text-sm rounded-xl"
              >
                Start your build
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </MagneticButton>
              <MagneticButton
                onClick={() => handleScroll("flagship")}
                className="px-8 py-4 border border-white/15 text-[#EDEDED] font-medium text-sm rounded-xl hover:border-brand-400/60 hover:text-white active:scale-[0.98] transition-colors"
              >
                See our flagship
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 hidden lg:block"
          >
            <PortraitCard
              src="/images/portrait-create.webp"
              alt="Zipangile campaign portrait — woman in sunglasses against an orange and purple sunset gradient"
              caption="THE POWER TO CREATE"
              accent="#F36D14"
              parallax={30}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto mt-16 lg:mt-20"
          style={{ perspective: 1200 }}
        >
          <TiltCard maxTilt={6} className="rounded-2xl">
            <div className="rounded-2xl border border-white/10 bg-[#0A0A0C]/90 backdrop-blur-md shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden text-left">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <Terminal className="w-3.5 h-3.5 text-[#63636B]" />
                  <span className="font-mono text-[11px] text-[#63636B] tracking-wider">
                    zipangile.studio — build pipeline
                  </span>
                </div>
              </div>
              <div className="px-6 py-5 font-mono text-[13px] leading-[2.1]">
                {BUILD_LINES.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + i * 0.28, duration: 0.4 }}
                    className={
                      l.tone === "cmd"
                        ? "text-[#EDEDED]"
                        : l.tone === "ok"
                          ? "text-[#A1A1AA]"
                          : "text-emerald-400"
                    }
                  >
                    {l.text}
                    {i === BUILD_LINES.length - 1 && (
                      <span className="inline-block w-[8px] h-[15px] bg-emerald-400/80 ml-1.5 align-middle status-blink" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
