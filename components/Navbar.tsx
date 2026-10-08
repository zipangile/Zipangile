"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Models", id: "models" },
  { label: "Book", id: "booking" },
  { label: "Flagship", id: "flagship" },
  { label: "Mission", id: "mission" },
];

export default function Navbar() {
  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-mono text-sm font-bold tracking-[0.3em] text-[#F4F4F5] hover:text-white transition-colors"
        >
          ZIPANGILE
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => handleScroll(e, l.id)}
              className="text-[11px] font-mono tracking-[0.2em] text-[#A1A1AA] hover:text-white transition-colors uppercase"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleScroll(e, "contact")}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.15em] uppercase px-5 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-[#EDEDED] hover:bg-white hover:text-black hover:border-white transition-all"
        >
          Start a build
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.header>
  );
}
