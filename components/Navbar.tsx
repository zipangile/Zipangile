"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Quote", href: "/quote" },
  { label: "Services", href: "/services" },
  { label: "Book", href: "/book" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0716] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl text-white tracking-wide"
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

        <Link
          href="/quote"
          className="btn-brand text-[12px] tracking-wide px-5 py-2.5"
        >
          Start a build
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
