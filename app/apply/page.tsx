import React from "react";
import EquityApplicationForm from "../../components/EquityApplicationForm";
import Footer from "../../components/Footer";

/**
 * /apply — equity partnership application as a dedicated page.
 * Structured intake (founder → startup → the ask) posting to the Hub's
 * /api/v1/zipangile-equity-application endpoint.
 */
export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#0D0716] text-white antialiased pt-24">
      <EquityApplicationForm />
      <Footer />
    </main>
  );
}
