import React from "react";
import Services from "../../components/Services";
import EngagementModels from "../../components/EngagementModels";
import CtaSection from "../../components/CtaSection";
import Footer from "../../components/Footer";
import ScrollMorph from "../../components/ScrollMorph";
import PageEnter from "../../components/PageEnter";

/**
 * /services — the full services lineup + engagement models.
 */
export default function ServicesPage() {
  return (
    <PageEnter>
      <main className="min-h-screen bg-transparent text-[#EDEDED] relative selection:bg-brand-500/30 selection:text-white antialiased pt-24">
        <Services />
        <ScrollMorph intensity={0.9}>
          <EngagementModels />
        </ScrollMorph>
        <ScrollMorph intensity={1}>
          <CtaSection />
        </ScrollMorph>
        <Footer />
      </main>
    </PageEnter>
  );
}
