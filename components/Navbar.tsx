"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm font-bold tracking-[0.25em] text-[#EDEDED] hover:text-white transition-colors"
        >
          ZIPANGILE
        </a>

        <nav className="flex items-center gap-8">
          <a
            href="#mission"
            onClick={(e) => handleScroll(e, "mission")}
            className="text-xs font-mono tracking-wider text-[#A1A1AA] hover:text-[#EDEDED] transition-colors uppercase"
          >
            Mission
          </a>
          <a
            href="#ubuntu-play"
            onClick={(e) => handleScroll(e, "ubuntu-play")}
            className="text-xs font-mono tracking-wider text-[#A1A1AA] hover:text-[#EDEDED] transition-colors uppercase"
          >
            Ubuntu Play
          </a>
          <a
            href="#infrastructure"
            onClick={(e) => handleScroll(e, "infrastructure")}
            className="text-xs font-mono tracking-wider text-[#A1A1AA] hover:text-[#EDEDED] transition-colors uppercase"
          >
            Infrastructure
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
