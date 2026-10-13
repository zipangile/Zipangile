"use client";

import React, { useState, useEffect } from "react";
import { CalendarCheck, CheckCircle2, Loader2, ArrowRight, ReceiptText } from "lucide-react";
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

const HUB_BOOKING_URL = "https://ubuntuplay.zipangile.tech/api/v1/zipangile-booking";

// ?service=<slug> deep-links from the services page pre-select the service dropdown.
const SERVICE_SLUGS: Record<string, string> = {
  "tech-consultation": SERVICE_OPTIONS[0],
  "website-development": SERVICE_OPTIONS[1],
  "mvp-development": SERVICE_OPTIONS[2],
  "custom-platform": SERVICE_OPTIONS[3],
  "payment-integration": SERVICE_OPTIONS[4],
  "team-training": SERVICE_OPTIONS[5],
  "maintenance-retainer": SERVICE_OPTIONS[6],
  "startup-launchpad": SERVICE_OPTIONS[7],
};

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
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    // Deep-link: /book?service=<slug> pre-selects the matching service option.
    try {
      const svc = new URLSearchParams(window.location.search).get("service");
      if (svc && SERVICE_SLUGS[svc]) {
        setForm((f) => ({ ...f, service: SERVICE_SLUGS[svc] }));
      }
    } catch {
      /* ignore */
    }
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    const notesWithQuote =
      quote && !form.notes.includes(quote.reference)
        ? `[Quote ${quote.reference}: ${quote.breakdown.baseLabel}, ${formatZMW(quote.breakdown.low)}–${formatZMW(quote.breakdown.high)}] ${form.notes}`.trim()
        : form.notes;
    const reference = makeReference();
    try {
      // The Hub wakes from sleep on first traffic — allow a generous timeout.
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 60000);
      const resp = await fetch(HUB_BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, notes: notesWithQuote, reference }),
        signal: ctrl.signal,
      }).finally(() => clearTimeout(timer));
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.ok) {
        throw new Error(
          data.error || "The booking service didn't respond. Please try again."
        );
      }
      const b: Booking = {
        ...form,
        notes: notesWithQuote,
        reference: data.reference || reference,
        createdAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem("zipangile-booking", JSON.stringify(b));
      } catch {
        /* ignore */
      }
      setBooking(b);
    } catch (err) {
      const msg =
        err instanceof Error && err.name === "AbortError"
          ? "The request timed out — the server may be waking up. Please try again in a few seconds."
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  // Confirmation emails are sent by the booking service now that the form
  // posts to the Hub — no manual "confirm via email" step needed.

  const inputCls = "field px-4 py-3.5 text-[15px]";
  const labelCls = "field-label";

  return (
    <section id="booking" className="py-28 md:py-40 bg-[#0D0716] relative px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <p className="font-mono text-xs text-[#3B82F6] tracking-[0.3em] uppercase mb-4">
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
          <p className="text-base md:text-lg text-white leading-relaxed mt-6 max-w-2xl mx-auto">
            Pick a service and a date that suits you. We confirm the slot
            within two working days, then send a payment link — mobile money or
            card. No payment is taken until your slot is confirmed.
          </p>
        </div>

        {booking ? (
          <div className="rounded-2xl bg-[#9721FF] p-8 md:p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
              Booking received.
            </h3>
            <p className="text-white leading-relaxed max-w-xl mx-auto mb-8">
              Your reference is{" "}
              <span className="font-mono text-white tracking-wider">{booking.reference}</span>.
              We&apos;ll confirm <strong className="font-medium">{booking.date}</strong>{" "}
              for <strong className="font-medium">{booking.service.split(" — ")[0]}</strong>{" "}
              within two working days at <strong className="font-medium">{booking.contact}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="font-mono text-[11px] text-white tracking-[0.15em] uppercase">
                {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.contact)
                  ? "A confirmation is on its way — check your inbox"
                  : `We'll reach out to you at ${booking.contact}`}
              </p>
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
                className="text-[13px] font-mono tracking-wider uppercase text-white underline underline-offset-4"
              >
                Make another booking
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="bg-[#190D2B] rounded-2xl p-8 md:p-12 border-t-4 border-t-[#3B82F6]"
            noValidate
          >
            {quote && (
              <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-[#0D0716] px-5 py-4 mb-8">
                <ReceiptText className="w-5 h-5 text-white shrink-0" />
                <div className="text-sm">
                  <span className="font-mono text-white tracking-wider">{quote.reference}</span>
                  <span className="text-white">
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
                {errors.name && <p className="text-[#FF2E9A] text-xs mt-2">{errors.name}</p>}
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
                {errors.contact && <p className="text-[#FF2E9A] text-xs mt-2">{errors.contact}</p>}
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
                  className={`${inputCls} appearance-none`}
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
                {errors.date && <p className="text-[#FF2E9A] text-xs mt-2">{errors.date}</p>}
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="bk-notes" className={labelCls}>
                What are you working on? <span className="normal-case tracking-normal">(optional)</span>
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
              className="btn-brand w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[15px] disabled:opacity-60"
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

            {submitError && (
              <p className="text-[#FF2E9A] text-sm mt-4 text-center" role="alert">
                {submitError}
              </p>
            )}

            <p className="font-mono text-[11px] text-white tracking-[0.15em] uppercase text-center mt-6">
              No payment now — we confirm first, then send a payment link
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
