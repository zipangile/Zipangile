import React from "react";
import QuoteWizard from "../../components/QuoteWizard";
import Footer from "../../components/Footer";
import PageEnter from "../../components/PageEnter";

/**
 * /quote — the idea-to-quote wizard as a dedicated page.
 * More room, better focus: the full four-step flow without competing sections.
 */
export default function QuotePage() {
  return (
    <PageEnter>
      <main className="min-h-screen bg-transparent text-[#EDEDED] relative selection:bg-brand-500/30 selection:text-white antialiased pt-24">
        <QuoteWizard standalone />
        <Footer />
      </main>
    </PageEnter>
  );
}
