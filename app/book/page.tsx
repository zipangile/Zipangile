import React from "react";
import BookingForm from "../../components/BookingForm";
import Footer from "../../components/Footer";
import PageEnter from "../../components/PageEnter";

/**
 * /book — consultation booking as a dedicated page.
 * The saved quote (if any) attaches automatically via localStorage.
 */
export default function BookPage() {
  return (
    <PageEnter>
      <main className="min-h-screen bg-transparent text-[#EDEDED] relative selection:bg-brand-500/30 selection:text-white antialiased pt-24">
        <BookingForm />
        <Footer />
      </main>
    </PageEnter>
  );
}
