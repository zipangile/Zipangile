"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Quote", href: "/quote" },
  { label: "Services", href: "/services" },
  { label: "Book", href: "/book" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl text-white tracking-wide hover:text-brand-300 transition-colors"
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
                className={`text-[11px] font-mono tracking-[0.2em] uppercase transition-colors ${
                  active ? "text-white" : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/quote"
          className="btn-gradient-brand inline-flex items-center gap-1.5 text-[12px] font-medium tracking-wide px-5 py-2.5 rounded-lg text-white"
        >
          Start a build
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.header>
  );
}
