import React from "react";
import QuoteWizard from "../../components/QuoteWizard";
import Footer from "../../components/Footer";

/**
 * /quote — the idea-to-quote wizard as a dedicated page.
 * More room, better focus: the full four-step flow without competing sections.
 */
export default function QuotePage() {
  return (
    <main className="min-h-screen bg-[#0D0716] text-white antialiased pt-24">
      <QuoteWizard standalone />
      <Footer />
    </main>
  );
}
