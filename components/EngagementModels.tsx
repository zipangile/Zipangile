"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCheck2, LifeBuoy, Handshake, ArrowUpRight } from "lucide-react";
import CampaignHeadline from "./CampaignHeadline";

const MODELS = [
  {
    icon: FileCheck2,
    name: "Fixed-scope build",
    tag: "MODEL // 01",
    headline: "One build. One price. No surprises.",
    body: "You bring the idea, we scope it tightly and build it for a fixed fee. You know the full price before we write a line — and the scope is locked so it can't drift.",
    points: ["Fixed price agreed up front", "Weekly demos, full source handover", "Documentation + team training included"],
    featured: true,
    cta: "Request a quote",
  },
  {
    icon: LifeBuoy,
    name: "Build + support retainer",
    tag: "MODEL // 02",
    headline: "Launch it, then keep improving it.",
    body: "A fixed-scope build followed by an ongoing partnership: we keep the product running, ship improvements, and add features as your users teach you what matters.",
    points: ["Priority support + uptime care", "Monthly iteration sprints", "Roadmap guidance as you grow"],
    featured: false,
    cta: "Talk to us",
  },
  {
    icon: Handshake,
    name: "Equity partnership",
    tag: "MODEL // 03",
    headline: "For exceptional founders, we build alongside you.",
    body: "A small number of partnerships each year where we take a stake and build with you long-term — product, technical strategy, and ongoing engineering. Selective by design.",
    points: ["Application + founder conversation", "Long-term technical partnership", "Aligned incentives, shared upside"],
    featured: false,
    cta: "Apply",
  },
];

export default function EngagementModels() {
  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="models" className="py-28 md:py-40 bg-transparent relative px-6 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-xs text-brand-300 tracking-[0.3em] uppercase mb-5">
            ENGAGEMENT MODELS
          </p>
          <CampaignHeadline
            align="left"
            lines={[
              { text: "THREE HONEST WAYS" },
              { text: "TO", accent: "WORK WITH US.", accentColor: "#3B82F6" },
            ]}
            className="text-3xl md:text-6xl max-w-3xl"
          />
          <p className="text-base md:text-lg text-[#A1A1AA] font-light leading-relaxed mt-6 max-w-2xl">
            No inflated promises, no hidden meters. Pick the shape that fits
            where you are — every engagement starts with a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MODELS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl p-8 md:p-10 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  m.featured
                    ? "bg-gradient-to-b from-brand-500/[0.12] to-surface border border-brand-500/30 shadow-[0_0_60px_rgba(151,33,255,0.12)]"
                    : "bg-surface border border-white/[0.08] hover:border-white/[0.16]"
                }`}
              >
                {m.featured && (
                  <div className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.2em] uppercase text-brand-300 bg-brand-500/15 border border-brand-500/30 rounded-full px-3 py-1">
                    Most common
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center mb-8">
                  <Icon className="w-6 h-6 text-brand-300" />
                </div>
                <p className="font-mono text-[10px] text-[#63636B] uppercase tracking-[0.25em] mb-3">
                  {m.tag}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-[#F4F4F5] mb-3 font-sans tracking-tight">
                  {m.name}
                </h3>
                <p className="text-sm text-brand-200/80 font-medium mb-4">{m.headline}</p>
                <p className="text-sm text-[#A1A1AA] font-light leading-relaxed mb-8">
                  {m.body}
                </p>
                <ul className="space-y-3 mb-10">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-[#C9C9CF] font-light">
                      <span className="mt-[7px] h-1 w-1 rounded-full bg-brand-400 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToQuote}
                  className={`mt-auto inline-flex items-center gap-2 text-sm font-medium rounded-lg px-5 py-3 transition-all active:scale-[0.98] ${
                    m.featured
                      ? "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                      : "border border-white/15 text-[#EDEDED] hover:border-brand-400/50 hover:text-white"
                  }`}
                >
                  {m.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
