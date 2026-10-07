"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section id="contact" className="py-28 md:py-40 bg-black relative px-6 overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 radial-glow-hero pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs text-indigo-300 tracking-[0.3em] uppercase mb-6">
            READY WHEN YOU ARE
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] text-[#F4F4F5] leading-[1.02] mb-6">
            Let&apos;s build something
            <br />
            that matters.
          </h2>
          <p className="text-base md:text-xl text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto mb-12">
            Tell us about your idea or the problem you&apos;re solving. We reply
            to every serious enquiry — usually within two working days.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:support@zipangile.tech?subject=Project%20enquiry%20—%20Zipangile%20Studio"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-black font-medium text-sm rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.12)] hover:shadow-[0_0_44px_rgba(255,255,255,0.28)]"
            >
              <Mail className="w-4 h-4" />
              support@zipangile.tech
            </a>
            <a
              href="tel:+260972111440"
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/15 text-[#EDEDED] font-medium text-sm rounded-xl hover:border-indigo-400/60 hover:text-white active:scale-[0.98] transition-all"
            >
              <Phone className="w-4 h-4" />
              +260 972 111440
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </a>
          </div>

          <p className="font-mono text-[11px] text-[#63636B] tracking-[0.2em] uppercase mt-10">
            Lusaka, Zambia // Building for the next billion users
          </p>
        </motion.div>
      </div>
    </section>
  );
}
