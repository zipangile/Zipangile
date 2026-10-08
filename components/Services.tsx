"use client";

import React from "react";
import { motion } from "framer-motion";
import CampaignHeadline from "./CampaignHeadline";
import PortraitCard from "./PortraitCard";
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

const SERVICES = [
  {
    icon: PhoneCall,
    accent: "indigo",
    title: "Tech Consultation",
    price: "K1,500 / hour · K5,000 / half-day",
    tag: "ADVISE // 01",
    body: "Strategy, architecture reviews, and digital transformation advice from people who actually ship. One honest session can save you a quarter of building the wrong thing.",
    cta: true,
  },
  {
    icon: Globe,
    accent: "violet",
    title: "Website Development",
    price: "from K8,000",
    tag: "BUILD // 02",
    body: "Business sites and landing pages that load fast, rank well, and convert. Designed, built, and deployed — with content you can update yourself.",
  },
  {
    icon: Rocket,
    accent: "indigo",
    title: "MVP Development",
    price: "from K25,000",
    tag: "BUILD // 03",
    body: "From a validated idea to a working product in weeks, not quarters. We scope tightly, build the smallest thing that proves the bet, and ship something you can put in front of users or investors.",
  },
  {
    icon: LayoutDashboard,
    accent: "violet",
    title: "Custom Platforms",
    price: "quoted per scope",
    tag: "BUILD // 04",
    body: "Two-sided platforms, training systems, facilitator consoles, dashboards. We design the full loop — the people who run it and the people who use it — and build both sides to work together.",
  },
  {
    icon: CreditCard,
    accent: "indigo",
    title: "Payment Integration",
    price: "K5,000 flat",
    tag: "WIRE // 05",
    body: "Mobile money (MTN, Airtel, Zamtel), cards, and bank transfer wired into your site or app through Lenco — with webhooks, receipts, and reconciliation that just works.",
  },
  {
    icon: GraduationCap,
    accent: "violet",
    title: "Team Training",
    price: "K3,000 / person / day",
    tag: "ENABLE // 06",
    body: "Practical workshops for your team — digital tools, product thinking, AI in the workplace. Hands-on, in plain language, built around your actual work.",
  },
  {
    icon: Wrench,
    accent: "indigo",
    title: "Maintenance Retainer",
    price: "from K2,500 / month",
    tag: "CARE // 07",
    body: "Ongoing support for the things we built together — updates, monitoring, small improvements, and someone to call when it matters. No ticket black holes.",
  },
  {
    icon: Compass,
    accent: "violet",
    title: "Startup Launchpad",
    price: "K7,500 flat",
    tag: "LAUNCH // 08",
    body: "A guided setup package for new startups: cloud credits (AWS, Google, Microsoft for Startups), domains, email infrastructure, payment integration, PACRA incorporation guidance, and warm introductions into the ecosystem — BongoHive, NTBC, ZICTA. We've navigated all of it ourselves, so we shortcut the process for you. Linkages-only intro session: K2,000.",
  },
];

function scrollToBooking(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-transparent relative px-6">
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 grid lg:grid-cols-[1fr_290px] gap-10 items-center">
          <div>
            <p className="font-mono text-xs text-brand-400 tracking-widest uppercase mb-4">
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
            <p className="text-base md:text-lg text-[#A1A1AA] font-light leading-relaxed mt-6 max-w-2xl">
              Zipangile is a venture studio and engineering firm in Lusaka. Every
              service below has a real price — no &ldquo;contact us for a
              quote&rdquo; games. Every build is engineered offline-first where it
              matters, with practical AI integration when it earns its place.
            </p>
          </div>
          <div className="hidden lg:block">
            <PortraitCard
              src="/images/portrait-build.webp"
              alt="Zipangile engineer holding a laptop against a gold and teal gradient"
              caption="THE POWER TO BUILD"
              accent="#F5A623"
              parallax={24}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isIndigo = s.accent === "indigo";
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden bg-surface border border-border rounded-xl p-8 md:p-10 hover:border-brand-500/40 transition-all duration-300 group flex flex-col"
              >
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-brand-600/10 blur-[70px] pointer-events-none group-hover:bg-brand-600/15 transition-all duration-500" />
                <div className="flex items-start justify-between mb-8">
                  <div
                    className={`w-12 h-12 rounded-lg border flex items-center justify-center ${
                      isIndigo
                        ? "bg-brand-500/10 border-brand-500/30"
                        : "bg-brandpink-500/10 border-brandpink-500/30"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isIndigo ? "text-brand-400" : "text-brandpink-400"}`} />
                  </div>
                  <div className="font-mono text-[11px] tracking-wider text-brand-300 border border-brand-500/30 bg-brand-500/10 rounded-full px-4 py-1.5 whitespace-nowrap">
                    {s.price}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#EDEDED] mb-3 font-sans tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed flex-1">
                  {s.body}
                </p>
                <div className="flex items-center justify-between mt-8">
                  <div className="font-mono text-[10px] text-[#52525B] uppercase tracking-widest">
                    {s.tag}
                  </div>
                  {s.cta && (
                    <button
                      onClick={scrollToBooking}
                      className="inline-flex items-center gap-1.5 text-[12px] font-mono tracking-wider uppercase text-brand-300 hover:text-white transition-colors"
                    >
                      Book now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-xl p-8 md:p-10 border border-brand-500/30 bg-gradient-to-br from-brand-600/15 to-brandpink-600/10 flex flex-col justify-between hover:border-brand-400/60 transition-all duration-300 group"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#F4F4F5] mb-3 font-sans tracking-tight">
                Not sure what fits?
              </h3>
              <p className="text-sm md:text-base text-[#C9C9CF] font-light leading-relaxed">
                Start with a consultation. We&apos;ll tell you honestly whether
                you need us at all — and what the cheapest correct option is.
              </p>
            </div>
            <button
              onClick={scrollToBooking}
              className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-medium text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Book a consultation
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
