import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import QuoteWizard from "../components/QuoteWizard";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import EngagementModels from "../components/EngagementModels";
import BookingForm from "../components/BookingForm";
import BentoGrid from "../components/BentoGrid";
import Philosophy from "../components/Philosophy";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import FluidBackground from "../components/FluidBackground";
import ScrollMorph from "../components/ScrollMorph";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-[#EDEDED] relative selection:bg-brand-500/30 selection:text-white antialiased">
      <FluidBackground />
      <Navbar />
      <Hero />
      <ScrollMorph intensity={1.1}>
        <QuoteWizard />
      </ScrollMorph>
      <ScrollMorph intensity={0.9}>
        <Services />
      </ScrollMorph>
      <ScrollMorph intensity={1}>
        <HowItWorks />
      </ScrollMorph>
      <ScrollMorph intensity={0.9}>
        <EngagementModels />
      </ScrollMorph>
      <ScrollMorph intensity={1.1}>
        <BookingForm />
      </ScrollMorph>
      <ScrollMorph intensity={0.8}>
        <BentoGrid />
      </ScrollMorph>
      <ScrollMorph intensity={0.8}>
        <Philosophy />
      </ScrollMorph>
      <ScrollMorph intensity={1}>
        <CtaSection />
      </ScrollMorph>
      <Footer />
    </main>
  );
}
