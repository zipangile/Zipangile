import React from "react";
import BookingForm from "../../components/BookingForm";
import Footer from "../../components/Footer";

/**
 * /book — consultation booking as a dedicated page.
 * The saved quote (if any) attaches automatically via localStorage.
 */
export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#0D0716] text-white antialiased pt-24">
      <BookingForm />
      <Footer />
    </main>
  );
}
