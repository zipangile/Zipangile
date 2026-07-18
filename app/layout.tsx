import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zipangile | Building Digital Public Goods",
  description: "Zipangile is a technology engineering firm designing resilient, open infrastructure for the next billion users.",
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
