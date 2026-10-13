"use client";

import React from "react";
import Link from "next/link";
import CampaignHeadline from "./CampaignHeadline";
import {
  PhoneCall,
  Globe,
  Rocket,
  LayoutDashboard,
  CreditCard,
  GraduationCap,
  Wrench,
  Compass,
  ArrowRight,
} from "lucide-react";

// Flat accent colors rotate across the cards — simple, colorful, no glow.
const ACCENTS = ["#9721FF", "#FF2E9A", "#14B8A6", "#3B82F6", "#FFB800"];

const SERVICES = [
  {
    icon: PhoneCall,
    title: "Tech Consultation",
    price: "K1,500 / hour · K5,000 / half-day",
    tag: "ADVISE // 01",
    body: "Strategy, architecture reviews, and digital transformation advice from people who actually ship. One honest session can save you a quarter of building the wrong thing.",
    cta: true,
  },
  {
    icon: Globe,
    title: "Website Development",
    price: "from K8,000",
    tag: "BUILD // 02",
    body: "Business sites and landing pages that load fast, rank well, and convert. Designed, built, and deployed — with content you can update yourself.",
  },
  {
    icon: Rocket,
    title: "MVP Development",
    price: "from K25,000",
    tag: "BUILD // 03",
    body: "From a validated idea to a working product in weeks, not quarters. We scope tightly, build the smallest thing that proves the bet, and ship something you can put in front of users or investors.",
  },
  {
    icon: LayoutDashboard,
    title: "Custom Platforms",
    price: "quoted per scope",
    tag: "BUILD // 04",
    body: "Two-sided platforms, training systems, facilitator consoles, dashboards. We design the full loop — the people who run it and the people who use it — and build both sides to work together.",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    price: "K5,000 flat",
    tag: "WIRE // 05",
    body: "Mobile money (MTN, Airtel, Zamtel), cards, and bank transfer wired into your site or app through Lenco — with webhooks, receipts, and reconciliation that just works.",
  },
  {
    icon: GraduationCap,
    title: "Team Training",
    price: "K3,000 / person / day",
    tag: "ENABLE // 06",
    body: "Practical workshops for your team — digital tools, product thinking, AI in the workplace. Hands-on, in plain language, built around your actual work.",
  },
  {
    icon: Wrench,
    title: "Maintenance Retainer",
    price: "from K2,500 / month",
    tag: "CARE // 07",
    body: "Ongoing support for the things we built together — updates, monitoring, small improvements, and someone to call when it matters. No ticket black holes.",
  },
  {
    icon: Compass,
    title: "Startup Launchpad",
    price: "K7,500 flat",
    tag: "LAUNCH // 08",
    body: "A guided setup package for new startups: cloud credits (AWS, Google, Microsoft for Startups), domains, email infrastructure, payment integration, PACRA incorporation guidance, and warm introductions into the ecosystem — BongoHive, NTBC, ZICTA. We've navigated all of it ourselves, so we shortcut the process for you. Linkages-only intro session: K2,000.",
  },
];

function scrollToBooking(e: React.MouseEvent) {
  // Multi-page: booking lives at /book now
  e.preventDefault();
  window.location.href = "/book";
}

function ServiceCard({
  s,
  accent,
}: {
  s: (typeof SERVICES)[number];
  accent: string;
}) {
  const Icon = s.icon;
  return (
    <div
      className="bg-[#190D2B] rounded-2xl p-8 md:p-10 flex flex-col border-t-4"
      style={{ borderTopColor: accent }}
    >
      <div className="flex items-start justify-between mb-8">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ background: accent }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div
          className="font-mono text-[11px] tracking-wider rounded-full px-4 py-1.5 whitespace-nowrap"
          style={{ color: accent, border: `1px solid ${accent}` }}
        >
          {s.price}
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-sans tracking-tight">
        {s.title}
      </h3>
      <p className="text-sm md:text-base text-white leading-relaxed flex-1">
        {s.body}
      </p>
      <div className="flex items-center justify-between mt-8">
        <div className="font-mono text-[10px] text-white uppercase tracking-widest">
          {s.tag}
        </div>
        {s.cta && (
          <button
            onClick={scrollToBooking}
            className="inline-flex items-center gap-1.5 text-[12px] font-mono tracking-wider uppercase text-white underline underline-offset-4"
            style={{ textDecorationColor: accent }}
          >
            Book now
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Services({ preview = false }: { preview?: boolean }) {
  const shown = preview ? SERVICES.slice(0, 4) : SERVICES;

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0D0716] relative px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <p className="font-mono text-xs text-[#14B8A6] tracking-widest uppercase mb-4">
            STUDIO SERVICES
          </p>
          <CampaignHeadline
            align="left"
            lines={[
              { text: "PRICED IN" },
              { text: "THE OPEN." },
              { text: "BUILT TO", accent: "LAST.", accentColor: "#14B8A6" },
            ]}
            className="text-3xl md:text-6xl max-w-3xl"
          />
          <p className="text-base md:text-lg text-white leading-relaxed mt-6 max-w-2xl">
            Zipangile is a venture studio and engineering firm in Lusaka. Every
            service below has a real price — no &ldquo;contact us for a
            quote&rdquo; games. Every build is engineered offline-first where it
            matters, with practical AI integration when it earns its place.
          </p>
        </div>

        {/* Services grid — flat cards, colored top borders */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {shown.map((s, i) => (
              <ServiceCard key={s.title} s={s} accent={ACCENTS[i % ACCENTS.length]} />
            ))}

            {preview && (
              <Link
                href="/services"
                className="bg-[#190D2B] rounded-2xl p-8 flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#FF2E9A] mb-2">
                    + {SERVICES.length - 4} more services
                  </p>
                  <p className="text-white font-medium">See the full lineup</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            )}

            <div className="bg-[#190D2B] rounded-2xl p-8 md:p-10 flex flex-col justify-between border-t-4 border-t-[#9721FF]">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-sans tracking-tight">
                  Not sure what fits?
                </h3>
                <p className="text-sm md:text-base text-white leading-relaxed">
                  Start with a consultation. We&apos;ll tell you honestly whether
                  you need us at all — and what the cheapest correct option is.
                </p>
              </div>
              <button
                onClick={scrollToBooking}
                className="btn-brand mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm"
              >
                Book a consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
