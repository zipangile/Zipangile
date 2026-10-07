"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, LayoutTemplate, WifiOff, BrainCircuit } from "lucide-react";

const SERVICES = [
  {
    icon: Rocket,
    accent: "indigo",
    title: "MVP Development",
    tag: "BUILD // 01",
    body: "From a validated idea to a working product in weeks, not quarters. We scope tightly, build the smallest thing that proves the bet, and ship something you can put in front of users or investors.",
  },
  {
    icon: LayoutTemplate,
    accent: "violet",
    title: "Custom Platforms",
    tag: "BUILD // 02",
    body: "Two-sided platforms, training systems, facilitator consoles, dashboards. We design the full loop — the people who run it and the people who use it — and build both sides to work together.",
  },
  {
    icon: WifiOff,
    accent: "indigo",
    title: "Offline-First Systems",
    tag: "BUILD // 03",
    body: "Our specialty. Products engineered to run on local networks, low-power hardware, and intermittent connectivity. If your users can't count on the internet, we build for that from day one.",
  },
  {
    icon: BrainCircuit,
    accent: "violet",
    title: "AI Integration",
    tag: "BUILD // 04",
    body: "On-device and local AI — tutoring, translation, automation, assessment — without a cloud dependency for every inference. Practical AI that works where your users actually are.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-black relative px-6">
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-4">
            STUDIO SERVICES
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#EDEDED] font-sans max-w-3xl">
            We build the product. You run the business.
          </h2>
          <p className="text-base md:text-lg text-[#A1A1AA] font-light leading-relaxed mt-6 max-w-2xl">
            Zipangile is a venture studio and engineering firm in Lusaka. Bring
            us a validated idea or an operational problem — we design and build
            the digital product that solves it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isIndigo = s.accent === "indigo";
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden bg-surface border border-border rounded-xl p-8 md:p-10 hover:border-indigo-500/40 transition-all duration-300 group"
              >
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-indigo-600/10 blur-[70px] pointer-events-none group-hover:bg-indigo-600/15 transition-all duration-500" />
                <div
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center mb-8 ${
                    isIndigo
                      ? "bg-indigo-500/10 border-indigo-500/30"
                      : "bg-violet-500/10 border-violet-500/30"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isIndigo ? "text-indigo-400" : "text-violet-400"}`} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#EDEDED] mb-3 font-sans tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed">
                  {s.body}
                </p>
                <div className="font-mono text-[10px] text-[#52525B] uppercase tracking-widest mt-8">
                  {s.tag}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
