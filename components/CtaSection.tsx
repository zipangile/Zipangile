"use client";

import React from "react";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import CampaignHeadline from "./CampaignHeadline";

export default function CtaSection() {
  return (
    <section id="contact" className="bg-[#FF2E9A] py-28 md:py-40 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-mono text-xs text-white tracking-[0.3em] uppercase mb-6">
          READY WHEN YOU ARE
        </p>
        <CampaignHeadline
          align="center"
          lines={[
            { text: "LET'S BUILD" },
            { text: "SOMETHING THAT" },
            { text: "", accent: "MATTERS.", accentColor: "#FF2E9A" },
          ]}
          className="text-4xl md:text-7xl mb-6"
        />
        <p className="text-base md:text-xl text-white leading-relaxed max-w-2xl mx-auto mb-12">
          Tell us about your idea or the problem you&apos;re solving. We reply
          to every serious enquiry — usually within two working days.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:consult@zipangile.tech?subject=Project%20enquiry%20—%20Zipangile%20Studio"
            className="btn-white inline-flex items-center gap-2.5 px-8 py-4 text-sm"
          >
            <Mail className="w-4 h-4" />
            consult@zipangile.tech
          </a>
          <a
            href="tel:+260976557502"
            className="btn-outline-white inline-flex items-center gap-2.5 px-8 py-4 text-sm"
          >
            <Phone className="w-4 h-4" />
            0976 557 502
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <p className="font-mono text-[11px] text-white tracking-[0.2em] uppercase mt-10">
          Lusaka, Zambia // Building for the next billion users
        </p>
      </div>
    </section>
  );
}
