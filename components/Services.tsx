"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import CampaignHeadline from "./CampaignHeadline";
import CutoutFigure from "./CutoutFigure";
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
    accent: "#9721FF",
    title: "Tech Consultation",
    price: "K1,500 / hour · K5,000 / half-day",
    tag: "ADVISE // 01",
    body: "Strategy, architecture reviews, and digital transformation advice from people who actually ship. One honest session can save you a quarter of building the wrong thing.",
    cta: true,
  },
  {
    icon: Globe,
    accent: "#FF2E9A",
    title: "Website Development",
    price: "from K8,000",
    tag: "BUILD // 02",
    body: "Business sites and landing pages that load fast, rank well, and convert. Designed, built, and deployed — with content you can update yourself.",
  },
  {
    icon: Rocket,
    accent: "#9721FF",
    title: "MVP Development",
    price: "from K25,000",
    tag: "BUILD // 03",
    body: "From a validated idea to a working product in weeks, not quarters. We scope tightly, build the smallest thing that proves the bet, and ship something you can put in front of users or investors.",
  },
  {
    icon: LayoutDashboard,
    accent: "#FF2E9A",
    title: "Custom Platforms",
    price: "quoted per scope",
    tag: "BUILD // 04",
    body: "Two-sided platforms, training systems, facilitator consoles, dashboards. We design the full loop — the people who run it and the people who use it — and build both sides to work together.",
  },
  {
    icon: CreditCard,
    accent: "#9721FF",
    title: "Payment Integration",
    price: "K5,000 flat",
    tag: "WIRE // 05",
    body: "Mobile money (MTN, Airtel, Zamtel), cards, and bank transfer wired into your site or app through Lenco — with webhooks, receipts, and reconciliation that just works.",
  },
  {
    icon: GraduationCap,
    accent: "#FF2E9A",
    title: "Team Training",
    price: "K3,000 / person / day",
    tag: "ENABLE // 06",
    body: "Practical workshops for your team — digital tools, product thinking, AI in the workplace. Hands-on, in plain language, built around your actual work.",
  },
  {
    icon: Wrench,
    accent: "#9721FF",
    title: "Maintenance Retainer",
    price: "from K2,500 / month",
    tag: "CARE // 07",
    body: "Ongoing support for the things we built together — updates, monitoring, small improvements, and someone to call when it matters. No ticket black holes.",
  },
  {
    icon: Compass,
    accent: "#FF2E9A",
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

/**
 * Scrollytelling services (Pudding pattern): the portrait stays sticky
 * while service cards scroll past it — and each card entering the
 * viewport shifts the portrait's accent halo to match. Content drives
 * the visual; they can't feel separate.
 */
function ServiceCard({
  s,
  index,
  onActive,
}: {
  s: (typeof SERVICES)[number];
  index: number;
  onActive: (accent: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const Icon = s.icon;
  const wasActive = useRef(false);

  React.useEffect(() => {
    if (inView && !wasActive.current) {
      wasActive.current = true;
      onActive(s.accent);
    } else if (!inView) {
      wasActive.current = false;
    }
  }, [inView, s.accent, onActive]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel overflow-hidden p-8 md:p-10 group flex flex-col"
    >
      <div
        className="absolute -right-16 -top-16 w-56 h-56 rounded-full blur-[70px] pointer-events-none transition-all duration-700"
        style={{ background: `${s.accent}1a` }}
      />
      <div className="flex items-start justify-between mb-8">
        <div
          className="w-12 h-12 rounded-lg border flex items-center justify-center backdrop-blur-md"
          style={{ background: `${s.accent}14`, borderColor: `${s.accent}4d` }}
        >
          <Icon className="w-6 h-6" style={{ color: s.accent }} />
        </div>
        <div
          className="font-mono text-[11px] tracking-wider rounded-full px-4 py-1.5 whitespace-nowrap border backdrop-blur-md"
          style={{ color: s.accent, borderColor: `${s.accent}4d`, background: `${s.accent}14` }}
        >
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
}

export default function Services({ preview = false }: { preview?: boolean }) {
  const [haloAccent, setHaloAccent] = useState("#F5A623");
  const shown = preview ? SERVICES.slice(0, 4) : SERVICES;

  return (
    <section id="services" className="py-24 md:py-32 bg-transparent relative px-6">
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
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

        {/* Scrollytelling: sticky portrait + scrolling cards */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 items-start">
          <div className="hidden lg:block sticky top-28">
            <CutoutFigure
              src="/images/cutout-2-transparent.png"
              alt="Zipangile founder celebrating — arms raised in joy"
              accent={haloAccent}
              parallax={0}
              maxHeight={480}
            />
            <p className="mt-6 text-sm text-[#71717A] font-light leading-relaxed text-center">
              Each service, priced in the open.
              <br />
              Scroll — the studio responds.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {shown.map((s, i) => (
              <ServiceCard key={s.title} s={s} index={i} onActive={setHaloAccent} />
            ))}

            {preview && (
              <Link
                href="/services"
                className="glass-panel p-8 flex items-center justify-between group hover:border-brand-400/40 transition-all"
              >
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-300 mb-2">
                    + {SERVICES.length - 4} more services
                  </p>
                  <p className="text-white font-medium">See the full lineup</p>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-300 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 md:p-10 flex flex-col justify-between"
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
                className="btn-fluid mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-medium text-sm rounded-xl"
              >
                Book a consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
