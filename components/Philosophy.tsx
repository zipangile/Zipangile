"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section id="mission" className="py-24 md:py-40 bg-black relative px-6 border-t border-border">
      <div className="absolute inset-y-0 left-10 md:left-24 w-[1px] bg-border/40 pointer-events-none" />
      <div className="absolute inset-y-0 right-10 md:right-24 w-[1px] bg-border/40 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 py-12">
        <div className="pl-6 md:pl-12 border-l-2 border-indigo-500/50">
          <p className="font-mono text-xs text-indigo-400 tracking-[0.2em] uppercase mb-8">
            // OUR PHILOSOPHY
          </p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <p className="text-3xl md:text-6xl font-bold tracking-[-0.03em] text-[#EDEDED] leading-[1.1] font-sans">
              Technology shouldn't be a walled garden.
            </p>
            <p className="text-xl md:text-3xl text-[#A1A1AA] font-light leading-relaxed max-w-4xl">
              We build digital public goods because fundamental infrastructure belongs to everyone. Sustainable, scalable, and radically open.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
