"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050505] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="font-mono text-sm font-bold tracking-[0.3em] text-[#F4F4F5] mb-3">
              ZIPANGILE
            </div>
            <p className="text-sm text-[#A1A1AA] font-light max-w-sm leading-relaxed">
              A venture studio and engineering firm in Lusaka, Zambia — building
              digital products for founders and digital public goods for
              everyone.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:support@zipangile.tech"
              className="inline-flex items-center gap-2.5 text-sm text-[#C9C9CF] hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-indigo-300" />
              support@zipangile.tech
            </a>
            <a
              href="tel:+260972111440"
              className="inline-flex items-center gap-2.5 text-sm text-[#C9C9CF] hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-indigo-300" />
              +260 972 111440
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-[#63636B] tracking-[0.2em] uppercase">
            Zipangile &copy; 2026 · Lusaka, Zambia
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#10B981] status-blink" />
            <span className="text-[11px] font-mono text-[#A1A1AA] tracking-[0.2em] uppercase">
              Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
