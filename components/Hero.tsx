"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import CampaignHeadline from "./CampaignHeadline";

const BUILD_LINES = [
  { text: "$ zipangile build --scope mvp", tone: "cmd" },
  { text: "✓ scope locked · fixed price agreed", tone: "ok" },
  { text: "✓ design system · ready", tone: "ok" },
  { text: "✓ offline-first core · compiled", tone: "ok" },
  { text: "✓ client handover · documented", tone: "ok" },
  { text: "● status: systems online", tone: "live" },
];

export default function Hero() {
  return (
    <section className="bg-[#9721FF] pt-40 pb-20 md:pb-24 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          <div className="font-mono text-[11px] text-white border border-white/40 rounded-full px-5 py-2 mb-10 tracking-[0.3em] uppercase">
            Studio // Systems Online
          </div>

          <div className="mb-8">
            <CampaignHeadline
              as="h1"
              align="center"
              lines={[
                { text: "WE BUILD" },
                { text: "DIGITAL" },
                { text: "", accent: "PRODUCTS", accentColor: "#9721FF" },
                { text: "THAT MATTER." },
              ]}
              className="text-5xl md:text-7xl xl:text-[6.5rem]"
            />
          </div>

          <p className="text-base md:text-xl text-white max-w-2xl mb-12 leading-relaxed">
            Zipangile is a venture studio and engineering firm in Lusaka. We
            design and build MVPs, platforms, and offline-first systems for
            founders — and we engineer digital public goods for the next billion
            users.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 lg:mb-0">
            <Link
              href="/quote"
              className="btn-white inline-flex items-center gap-2 px-8 py-4 text-sm"
            >
              Start your build
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="btn-outline-white px-8 py-4 text-sm"
            >
              See what we build
            </Link>
          </div>
        </div>

        {/* Build pipeline panel — flat dark card, no tilt, no blur. */}
        <div className="w-full max-w-2xl mx-auto mt-16 lg:mt-20">
          <div className="rounded-2xl bg-[#0D0716] overflow-hidden text-left">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex items-center gap-2 ml-3">
                <Terminal className="w-3.5 h-3.5 text-white" />
                <span className="font-mono text-[11px] text-white tracking-wider">
                  zipangile.studio — build pipeline
                </span>
              </div>
            </div>
            <div className="px-6 py-5 font-mono text-[13px] leading-[2.1]">
              {BUILD_LINES.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.tone === "cmd"
                      ? "text-white"
                      : l.tone === "ok"
                        ? "text-white"
                        : "text-[#22C55E]"
                  }
                >
                  {l.text}
                  {i === BUILD_LINES.length - 1 && (
                    <span className="inline-block w-[8px] h-[15px] bg-[#22C55E] ml-1.5 align-middle" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
