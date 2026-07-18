import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BentoGrid from "../components/BentoGrid";
import Philosophy from "../components/Philosophy";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-[#EDEDED] relative selection:bg-indigo-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <BentoGrid />
      <Philosophy />
      <Footer />
    </main>
  );
}
