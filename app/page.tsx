import React from "react";
import Hero from "../components/Hero";
import HeroScrollOut from "../components/HeroScrollOut";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import ScrollMorph from "../components/ScrollMorph";
import PageEnter from "../components/PageEnter";

/**
 * Home — the experience landing.
 * Hero (with cinematic scroll-out) → services preview → process → CTA.
 * The quote wizard and booking live on their own pages now.
 */
export default function Home() {
  return (
    <PageEnter>
      <main className="min-h-screen bg-transparent text-[#EDEDED] relative selection:bg-brand-500/30 selection:text-white antialiased">
        <HeroScrollOut>
          <Hero />
        </HeroScrollOut>
        <ScrollMorph intensity={0.9}>
          <Services preview />
        </ScrollMorph>
        <ScrollMorph intensity={1}>
          <HowItWorks />
        </ScrollMorph>
        <ScrollMorph intensity={1}>
          <CtaSection />
        </ScrollMorph>
        <Footer />
      </main>
    </PageEnter>
  );
}
