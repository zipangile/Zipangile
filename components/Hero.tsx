"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden mesh-grid pt-16">
      <div className="absolute inset-0 radial-glow-hero pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs text-indigo-400 border border-indigo-500/30 rounded-full px-4 py-1.5 bg-indigo-950/20 backdrop-blur-sm mb-8 tracking-widest uppercase"
        >
          v2.0 // SYSTEMS ONLINE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl font-bold text-[#EDEDED] tracking-[-0.04em] leading-[0.95] mb-8"
        >
          Building Digital
          <br />
          Public Goods.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-12 font-sans font-light leading-relaxed"
        >
          Zipangile is a technology engineering firm designing resilient, open infrastructure for the next billion users.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => handleScroll("ubuntu-play")}
            className="px-8 py-4 bg-white text-black font-sans font-medium text-sm rounded-lg hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
          >
            Explore Infrastructure
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleScroll("ubuntu-play")}
      >
        <span className="font-mono text-[10px] tracking-widest text-[#52525B] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-[#52525B]" />
      </motion.div>
    </section>
  );
}
