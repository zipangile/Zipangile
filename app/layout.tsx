import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zipangile | Venture Studio & Engineering — Lusaka",
  description: "Zipangile is a venture studio and engineering firm in Lusaka, Zambia. We build MVPs, platforms, and offline-first systems for founders — and digital public goods for the next billion users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-[#EDEDED] antialiased">
        {children}
      </body>
    </html>
  );
}
