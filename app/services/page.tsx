import React from "react";
import Services from "../../components/Services";
import EngagementModels from "../../components/EngagementModels";
import CtaSection from "../../components/CtaSection";
import Footer from "../../components/Footer";

/**
 * /services — the full services lineup + engagement models.
 */
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0D0716] text-white antialiased pt-24">
      <Services />
      <EngagementModels />
      <CtaSection />
      <Footer />
    </main>
  );
}
