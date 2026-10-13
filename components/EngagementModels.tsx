"use client";

import React from "react";
import { FileCheck2, LifeBuoy, Handshake, ArrowUpRight } from "lucide-react";
import CampaignHeadline from "./CampaignHeadline";

const MODELS = [
  {
    icon: FileCheck2,
    accent: "#9721FF",
    name: "Fixed-scope build",
    tag: "MODEL // 01",
    headline: "One build. One price. No surprises.",
    body: "You bring the idea, we scope it tightly and build it for a fixed fee. You know the full price before we write a line — and the scope is locked so it can't drift.",
    points: ["Fixed price agreed up front", "Weekly demos, full source handover", "Documentation + team training included"],
    featured: true,
    cta: "Request a quote",
    flow: { kind: "quote" as const },
  },
  {
    icon: LifeBuoy,
    accent: "#FF2E9A",
    name: "Build + support retainer",
    tag: "MODEL // 02",
    headline: "Launch it, then keep improving it.",
    body: "A fixed-scope build followed by an ongoing partnership: we keep the product running, ship improvements, and add features as your users teach you what matters.",
    points: ["Priority support + uptime care", "Monthly iteration sprints", "Roadmap guidance as you grow"],
    featured: false,
    cta: "Talk to us",
    flow: { kind: "email" as const, subject: "Build + support retainer enquiry" },
  },
  {
    icon: Handshake,
    accent: "#14B8A6",
    name: "Equity partnership",
    tag: "MODEL // 03",
    headline: "For exceptional founders, we build alongside you.",
    body: "A small number of partnerships each year where we take a stake and build with you long-term — product, technical strategy, and ongoing engineering. Selective by design.",
    points: ["Application + founder conversation", "Long-term technical partnership", "Aligned incentives, shared upside"],
    featured: false,
    cta: "Apply",
    flow: { kind: "email" as const, subject: "Equity partnership application" },
  },
];

export default function EngagementModels() {
  const flowHref = (m: (typeof MODELS)[number]): string => {
    if (m.flow.kind === "email") {
      return `mailto:consult@zipangile.tech?subject=${encodeURIComponent(m.flow.subject)}`;
    }
    return "/quote";
  };

  return (
    <section id="models" className="py-28 md:py-40 bg-[#0D0716] relative px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-xs text-[#3B82F6] tracking-[0.3em] uppercase mb-5">
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
          <p className="text-base md:text-lg text-white leading-relaxed mt-6 max-w-2xl">
            No inflated promises, no hidden meters. Pick the shape that fits
            where you are — every engagement starts with a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MODELS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.name}
                className={`rounded-2xl p-8 md:p-10 flex flex-col ${
                  m.featured ? "bg-[#9721FF]" : "bg-[#190D2B] border-t-4"
                }`}
                style={m.featured ? undefined : { borderTopColor: m.accent }}
              >
                {m.featured && (
                  <div className="self-start font-mono text-[10px] tracking-[0.2em] uppercase text-[#9721FF] bg-white rounded-full px-3 py-1 mb-8">
                    Most common
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 ${
                    m.featured ? "bg-white/15" : ""
                  }`}
                  style={m.featured ? undefined : { background: m.accent }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-mono text-[10px] text-white uppercase tracking-[0.25em] mb-3">
                  {m.tag}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-sans tracking-tight">
                  {m.name}
                </h3>
                <p className="text-sm text-white font-medium mb-4">{m.headline}</p>
                <p className="text-sm text-white leading-relaxed mb-8">
                  {m.body}
                </p>
                <ul className="space-y-3 mb-10">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-white">
                      <span className="mt-[7px] h-1 w-1 rounded-full bg-white shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {m.flow.kind === "email" ? (
                  <a
                    href={flowHref(m)}
                    className={`mt-auto inline-flex items-center gap-2 text-sm rounded-lg px-5 py-3 font-medium ${
                      m.featured ? "btn-white" : "btn-outline-white"
                    }`}
                  >
                    {m.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      window.location.href = flowHref(m);
                    }}
                    className={`mt-auto inline-flex items-center gap-2 text-sm rounded-lg px-5 py-3 font-medium ${
                      m.featured ? "btn-white" : "btn-outline-white"
                    }`}
                  >
                    {m.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
