import type { Metadata } from "next";
import { Righteous, Inter, Anton } from "next/font/google";
import "./globals.css";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Heavy condensed display for campaign headlines ("THE POWER TO ..." energy).
// Righteous stays the wordmark/UI voice; Anton carries the big statements.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zipangile | Venture Studio & Engineering — Lusaka",
  description:
    "Zipangile is a venture studio and engineering firm in Lusaka, Zambia. Scope your idea into an instant quote, book a consultation, and let us build your MVP, platform, or offline-first system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${righteous.variable} ${inter.variable} ${anton.variable} bg-[#0D0716] text-[#EDEDED] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
