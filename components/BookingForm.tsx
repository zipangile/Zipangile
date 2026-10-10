"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, Loader2, Mail, ArrowRight, ReceiptText } from "lucide-react";
import { loadQuote, formatZMW, type SavedQuote } from "../lib/quoteCalculator";
import CampaignHeadline from "./CampaignHeadline";

const SERVICE_OPTIONS = [
  "Tech Consultation — K1,500/hr",
  "Website Development — from K8,000",
  "MVP Development — from K25,000",
  "Custom Platform — quoted per scope",
  "Payment Integration — K5,000 flat",
  "Team Training — K3,000/person/day",
  "Maintenance Retainer — from K2,500/month",
  "Startup Launchpad — K7,500 flat",
  "Not sure yet — help me decide",
];

type FormState = {
  name: string;
  contact: string;
  service: string;
  date: string;
  notes: string;
};

type Booking = FormState & { reference: string; createdAt: string };

function makeReference() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `ZQ-${s}`;
}

export default function BookingForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    contact: "",
    service: SERVICE_OPTIONS[0],
    date: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [quote, setQuote] = useState<SavedQuote | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zipangile-booking");
      if (saved) setBooking(JSON.parse(saved));
    } catch {
      /* ignore */
    }
    setQuote(loadQuote());
    const onQuote = (e: Event) => setQuote((e as CustomEvent<SavedQuote>).detail);
    window.addEventListener("zipangile:quote-ready", onQuote);
    return () => window.removeEventListener("zipangile:quote-ready", onQuote);
  }, []);

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function validate(): boolean {
    const er: Partial<FormState> = {};
    if (!form.name.trim()) er.name = "Please tell us your name.";
    if (!form.contact.trim()) er.contact = "We need an email or phone number to confirm.";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact.trim()) &&
      !/^\+?[0-9\s-]{9,15}$/.test(form.contact.trim())
    )
      er.contact = "That doesn't look like an email or phone number.";
    if (!form.date) er.date = "Pick a preferred date.";
    else if (form.date < today) er.date = "That date is in the past.";
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate a short round-trip; the booking is stored locally and the
    // confirmation email draft is prepared for the visitor to send.
    setTimeout(() => {
      const notesWithQuote =
        quote && !form.notes.includes(quote.reference)
          ? `[Quote ${quote.reference}: ${quote.breakdown.baseLabel}, ${formatZMW(quote.breakdown.low)}–${formatZMW(quote.breakdown.high)}] ${form.notes}`.trim()
          : form.notes;
      const b: Booking = {
        ...form,
        notes: notesWithQuote,
        reference: makeReference(),
        createdAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem("zipangile-booking", JSON.stringify(b));
      } catch {
        /* ignore */
      }
      setBooking(b);
      setSubmitting(false);
    }, 900);
  }

  function mailtoHref(b: Booking) {
    const subject = encodeURIComponent(`Booking ${b.reference} — ${b.service.split(" — ")[0]}`);
    const body = encodeURIComponent(
      `Hi Zipangile,\n\nI'd like to confirm this booking:\n\nReference: ${b.reference}\nName: ${b.name}\nContact: ${b.contact}\nService: ${b.service}\nPreferred date: ${b.date}\nNotes: ${b.notes || "—"}\n\nThanks.`
    );
    return `mailto:support@zipangile.tech?subject=${subject}&body=${body}`;
  }

  const inputCls =
    "glass-input px-4 py-3.5 text-[15px] placeholder:text-white";
  const labelCls = "glass-label";

  return (
    <section id="booking" className="py-28 md:py-40 bg-transparent relative px-6 border-t border-white/[0.06] overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <p className="font-mono text-xs text-brand-400 tracking-[0.3em] uppercase mb-4">
            BOOKING
          </p>
          <CampaignHeadline
            align="center"
            lines={[
              { text: "BOOK A" },
              { text: "", accent: "CONSULTATION.", accentColor: "#3B82F6" },
            ]}
            className="text-3xl md:text-6xl"
          />
          <p className="text-base md:text-lg text-white font-light leading-relaxed mt-6 max-w-2xl mx-auto">
            Pick a service and a date that suits you. We confirm the slot
            within two working days, then send a payment link — mobile money or
            card. No payment is taken until your slot is confirmed.
          </p>
        </div>

        {booking ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-600/15 to-brandpink-600/10 p-8 md:p-12 text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-brand-300 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#F4F4F5] tracking-tight mb-3">
              Booking received.
            </h3>
            <p className="text-white font-light leading-relaxed max-w-xl mx-auto mb-8">
              Your reference is{" "}
              <span className="font-mono text-brand-300 tracking-wider">{booking.reference}</span>.
              We&apos;ll confirm <strong className="text-[#EDEDED] font-medium">{booking.date}</strong>{" "}
              for <strong className="text-[#EDEDED] font-medium">{booking.service.split(" — ")[0]}</strong>{" "}
              within two working days at <strong className="text-[#EDEDED] font-medium">{booking.contact}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={mailtoHref(booking)}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black font-medium text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Mail className="w-4 h-4" />
                Confirm via email
              </a>
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem("zipangile-booking");
                  } catch {
                    /* ignore */
                  }
                  setBooking(null);
                  setForm({ name: "", contact: "", service: SERVICE_OPTIONS[0], date: "", notes: "" });
                }}
                className="text-[13px] font-mono tracking-wider uppercase text-white hover:text-white transition-colors"
              >
                Make another booking
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-8 md:p-12"
            noValidate
          >
            {quote && (
              <div className="flex items-center gap-4 rounded-xl border border-brand-500/30 bg-brand-500/[0.07] px-5 py-4 mb-8">
                <ReceiptText className="w-5 h-5 text-brand-300 shrink-0" />
                <div className="text-sm">
                  <span className="font-mono text-brand-300 tracking-wider">{quote.reference}</span>
                  <span className="text-white font-light">
                    {" "}· {quote.breakdown.baseLabel} · {formatZMW(quote.breakdown.low)}–
                    {formatZMW(quote.breakdown.high)} — attached to this booking.
                  </span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="bk-name" className={labelCls}>
                  Your name *
                </label>
                <input
                  id="bk-name"
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="e.g. Chanda Mwila"
                  className={inputCls}
                />
                {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="bk-contact" className={labelCls}>
                  Email or phone *
                </label>
                <input
                  id="bk-contact"
                  type="text"
                  value={form.contact}
                  onChange={set("contact")}
                  placeholder="you@example.com or 0977 123 456"
                  className={inputCls}
                />
                {errors.contact && <p className="text-red-400 text-xs mt-2">{errors.contact}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="bk-service" className={labelCls}>
                  Service *
                </label>
                <select
                  id="bk-service"
                  value={form.service}
                  onChange={set("service")}
                  className={`${inputCls} appearance-none [&>option]:bg-[#0A0A0A]`}
                >
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="bk-date" className={labelCls}>
                  Preferred date *
                </label>
                <input
                  id="bk-date"
                  type="date"
                  value={form.date}
                  min={today}
                  onChange={set("date")}
                  className={`${inputCls} [color-scheme:dark]`}
                />
                {errors.date && <p className="text-red-400 text-xs mt-2">{errors.date}</p>}
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="bk-notes" className={labelCls}>
                What are you working on? <span className="text-white normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                id="bk-notes"
                value={form.notes}
                onChange={set("notes")}
                rows={4}
                placeholder="A sentence or two about your idea, problem, or what you'd like the session to cover."
                className={`${inputCls} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-fluid w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white font-medium text-[15px] rounded-xl disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving your booking…
                </>
              ) : (
                <>
                  <CalendarCheck className="w-4 h-4" />
                  Request booking
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="font-mono text-[11px] text-white tracking-[0.15em] uppercase text-center mt-6">
              No payment now — we confirm first, then send a payment link
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
