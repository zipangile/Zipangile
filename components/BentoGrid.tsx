"use client";

import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Server, Cpu, Database, Share2, ArrowRight } from "lucide-react";

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-card relative overflow-hidden bg-surface border border-border rounded-xl p-8 transition-all duration-300 ${className}`}
    >
      <div className="glow-card-bg" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section id="ubuntu-play" className="py-24 md:py-32 bg-black relative px-6">
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <p className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-4">
            FLAGSHIP ARCHITECTURE
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#EDEDED] font-sans">
            Engineering for resilient digital public spaces.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bento-glow-border p-[1px]">
            <div className="bg-surface rounded-xl p-8 md:p-12 h-full flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none group-hover:bg-indigo-600/15 transition-all duration-500" />

              <div>
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-8">
                  <Server className="w-6 h-6 text-indigo-400" />
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-[#EDEDED] mb-4 font-sans tracking-tight">
                  Ubuntu Play: The Offline-First Classroom Server.
                </h3>

                <p className="text-sm md:text-base text-[#A1A1AA] max-w-xl font-light leading-relaxed mb-8">
                  Engineered for low-resource environments. We bypass traditional connectivity limits to deliver robust, high-speed educational infrastructure entirely locally.
                </p>
              </div>

              <div>
                <a
                  href="https://ubuntuplay.fly.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-sans text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(99,102,241,0.25)]"
                >
                  Launch Ubuntu Play
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <GlowCard className="h-[320px] lg:h-auto">
            <div>
              <div className="w-12 h-12 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-violet-400" />
              </div>
              <h4 className="text-lg font-bold text-[#EDEDED] mb-2 font-sans tracking-tight">
                Zero-Dependency Operations
              </h4>
              <p className="text-xs md:text-sm text-[#A1A1AA] font-light leading-relaxed">
                Self-contained, containerized builds that mount easily on low-power, generic hardware with absolutely zero complex package management needed.
              </p>
            </div>
            <div className="font-mono text-[10px] text-[#52525B] uppercase tracking-widest mt-6">
              SYSTEM // STANDALONE
            </div>
          </GlowCard>

          <GlowCard className="h-[320px] lg:h-auto">
            <div>
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-indigo-400" />
              </div>
              <h4 className="text-lg font-bold text-[#EDEDED] mb-2 font-sans tracking-tight">
                Local AI & Automation
              </h4>
              <p className="text-xs md:text-sm text-[#A1A1AA] font-light leading-relaxed">
                Embedding light, offline-capable language models to automate curriculum updates, translations, and student self-assessment right inside the local network.
              </p>
            </div>
            <div className="font-mono text-[10px] text-[#52525B] uppercase tracking-widest mt-6">
              COMPUTE // OFFLINE
            </div>
          </GlowCard>

          <GlowCard className="lg:col-span-2 h-[320px] lg:h-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
              <div>
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-6">
                  <Share2 className="w-6 h-6 text-violet-400" />
                </div>
                <h4 className="text-lg font-bold text-[#EDEDED] mb-2 font-sans tracking-tight">
                  Open Source at the Core
                </h4>
                <p className="text-xs md:text-sm text-[#A1A1AA] font-light leading-relaxed">
                  Every component is fully transparent, auditable, and extensible. We construct community-vetted infrastructure that protects digital privacy and fosters local technology sovereignty.
                </p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-border/80 pt-6 md:pt-0 md:pl-10 flex flex-col justify-center h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-2 w-2 rounded-full bg-green-500 status-blink" />
                  <span className="font-mono text-[10px] tracking-wider text-[#A1A1AA] uppercase">PUBLIC PROTOCOL</span>
                </div>
                <div className="text-2xl font-mono text-[#EDEDED] tracking-tighter">
                  0.0.0.0 // LOCALHOST
                </div>
                <div className="text-xs text-[#52525B] mt-1 font-mono uppercase">
                  RELIABILITY // 99.9% LOCAL UPTIME
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
