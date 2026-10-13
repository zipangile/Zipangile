"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0D0716] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="font-mono text-sm font-bold tracking-[0.3em] text-white mb-3">
              ZIPANGILE
            </div>
            <p className="text-sm text-white max-w-sm leading-relaxed">
              A venture studio and engineering firm in Lusaka, Zambia — building
              digital products for founders and digital public goods for
              everyone.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:consult@zipangile.tech"
              className="inline-flex items-center gap-2.5 text-sm text-white"
            >
              <Mail className="w-4 h-4 text-[#FF2E9A]" />
              consult@zipangile.tech
            </a>
            <a
              href="tel:+260976557502"
              className="inline-flex items-center gap-2.5 text-sm text-white"
            >
              <Phone className="w-4 h-4 text-[#FF2E9A]" />
              0976 557 502
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-white tracking-[0.2em] uppercase">
            Zipangile Digital Media Services &copy; 2026 · Lusaka, Zambia
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#10B981]" />
            <span className="text-[11px] font-mono text-white tracking-[0.2em] uppercase">
              Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
