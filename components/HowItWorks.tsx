"use client";

import React from "react";
import CampaignHeadline from "./CampaignHeadline";

const STEPS = [
  {
    n: "01",
    accent: "#9721FF",
    title: "Discover",
    body: "You tell us the idea or the problem. We pressure-test it together — who it's for, what changes if it works, and whether software is actually the answer. If it's not a fit, we say so.",
  },
  {
    n: "02",
    accent: "#FF2E9A",
    title: "Scope",
    body: "We define the smallest build that proves the bet: features, timeline, and a fixed price. You know exactly what you're getting and what it costs before a single line is written.",
  },
  {
    n: "03",
    accent: "#14B8A6",
    title: "Build",
    body: "Design, engineering, and testing in tight cycles with you in the loop. Weekly demos, real progress you can click — no black boxes, no surprises at the end.",
  },
  {
    n: "04",
    accent: "#3B82F6",
    title: "Launch",
    body: "We ship it, harden it, and hand it over running. Documentation, training for your team, and a clean handover so you're not dependent on us to keep the lights on.",
  },
  {
    n: "05",
    accent: "#FFB800",
    title: "Partner",
    body: "After launch, we stay in your corner — support retainers, iteration sprints, or a longer partnership as you grow. We win when the product keeps working for you.",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-24 md:py-32 bg-[#0D0716] relative px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-xs text-[#FF2E9A] tracking-widest uppercase mb-4">
            HOW IT WORKS
          </p>
          <CampaignHeadline
            align="left"
            lines={[
              { text: "BUILT FOR", accent: "FOUNDERS.", accentColor: "#14B8A6" },
              { text: "NOT COMMITTEES." },
            ]}
            className="text-3xl md:text-6xl max-w-3xl"
          />
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-white/10 pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6 relative z-10"
                  style={{ background: s.accent }}
                >
                  <span className="font-mono text-sm text-white">{s.n}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-sans tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-white leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
