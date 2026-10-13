import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";

/**
 * Home — hero → services preview → process → CTA.
 * The quote wizard and booking live on their own pages.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0716] text-white antialiased">
      <Hero />
      <Services preview />
      <HowItWorks />
      <CtaSection />
      <Footer />
    </main>
  );
}
