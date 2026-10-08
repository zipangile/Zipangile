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

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-[#EDEDED] relative selection:bg-brand-500/30 selection:text-white antialiased">
      <Navbar />
      <Hero />
      <QuoteWizard />
      <Services />
      <HowItWorks />
      <EngagementModels />
      <BookingForm />
      <BentoGrid />
      <Philosophy />
      <CtaSection />
      <Footer />
    </main>
  );
}
