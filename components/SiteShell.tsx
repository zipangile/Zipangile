"use client";

import React from "react";
import FluidBackground from "./FluidBackground";
import ScrollProgress from "./ScrollProgress";
import Navbar from "./Navbar";

/**
 * SiteShell — persistent chrome across all pages.
 * The fluid background lives here so it never unmounts between page
 * navigations; the canvas keeps breathing while content swaps above it.
 * (Static export: each page is separate HTML, so the sim restarts per
 * page load — the enter animation makes that feel intentional.)
 */
export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FluidBackground />
      <ScrollProgress />
      <Navbar />
      {children}
    </>
  );
}
