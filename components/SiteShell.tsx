"use client";

import React from "react";
import Navbar from "./Navbar";

/**
 * SiteShell — persistent chrome across all pages.
 * Navbar + page content, nothing else. No canvas, no scroll chrome.
 */
export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
