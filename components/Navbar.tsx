"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Quote", href: "/quote" },
  { label: "Services", href: "/services" },
  { label: "Book", href: "/book" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0716] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-xl text-white tracking-wide shrink-0"
        >
          Zipangile
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[11px] font-mono tracking-[0.2em] uppercase text-white ${
                  active ? "underline underline-offset-8 decoration-[#9721FF] decoration-2" : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/quote"
            className="btn-brand text-[11px] sm:text-[12px] tracking-wide px-4 py-2 sm:px-5 sm:py-2.5"
          >
            Start a build
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white shrink-0"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — simple flat dropdown, no animation */}
      {open && (
        <nav className="md:hidden border-t border-white/10 bg-[#0D0716] px-6 py-2">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block py-4 text-sm font-mono tracking-[0.2em] uppercase text-white border-b border-white/5 last:border-0 ${
                  active ? "underline underline-offset-8 decoration-[#9721FF] decoration-2" : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
