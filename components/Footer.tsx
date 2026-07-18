"use client";

import React from "react";

export default function Footer() {
  return (
    <footer id="infrastructure" className="border-t border-border bg-[#050505] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-xs font-mono text-[#52525B] tracking-wider uppercase text-center sm:text-left">
          Zipangile &copy; 2026. Open Infrastructure.
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#10B981] status-blink" />
          <span className="text-xs font-mono text-[#A1A1AA] tracking-wider uppercase">
            Status: Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
