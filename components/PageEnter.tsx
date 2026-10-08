"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * PageEnter — cinematic page-load transition.
 * Every page condenses out of the fluid on load: rises from blur,
 * so navigation feels like arriving somewhere, not a hard cut.
 * (Static export: each page is separate HTML; this makes loads intentional.)
 */
export default function PageEnter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
