"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Handshake } from "lucide-react";
import CampaignHeadline from "./CampaignHeadline";

const EQUITY_APPLICATION_URL =
  "https://ubuntuplay.zipangile.tech/api/v1/zipangile-equity-application";

const STAGES = [
  { id: "idea", label: "Idea stage", hint: "You have the vision, nothing built yet" },
  { id: "mvp", label: "MVP built", hint: "Something working, not yet launched" },
  { id: "launched", label: "Launched", hint: "Live with users, pre-revenue or early" },
  { id: "revenue", label: "Revenue", hint: "Paying customers, growing" },
];

type FormState = {
  name: string;
  contact: string;
  startup: string;
  website: string;
  stage: string;
  pitch: string;
  traction: string;
  needs: string;
  deck: string;
  notes: string;
};

function makeReference() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `ZA-${s}`;
}

export default function EquityApplicationForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    contact: "",
    startup: "",
    website: "",
    stage: "",
    pitch: "",
    traction: "",
    needs: "",
    deck: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const set =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      setErrors((er) => ({ ...er, [k]: undefined }));
    };

  function validate(): boolean {
    const er: Partial<FormState> = {};
    if (!form.name.trim()) er.name = "Please tell us your name.";
    if (!form.contact.trim()) er.contact = "We need an email or phone number.";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact.trim()) &&
      !/^\+?[0-9\s-]{9,15}$/.test(form.contact.trim())
    )
      er.contact = "That doesn't look like an email or phone number.";
    if (!form.startup.trim()) er.startup = "What is your startup called?";
    if (!form.stage) er.stage = "Pick the stage that fits best.";
    if (form.pitch.trim().length < 30)
      er.pitch = "Give us a few sentences so we can take you seriously.";
    if (!form.needs.trim())
      er.needs = "Tell us what you need from Zipangile.";
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    const ref = makeReference();
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 60000);
      const resp = await fetch(EQUITY_APPLICATION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, reference: ref }),
        signal: ctrl.signal,
      }).finally(() => clearTimeout(timer));
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.ok) {
        throw new Error(
          data.error || "The application service didn't respond. Please try again."
        );
      }
      setReference(data.reference || ref);
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

  const inputCls = "field px-4 py-3.5 text-[15px] w-full";
  const labelCls = "field-label";
  const errCls = "text-[#FF2E9A] text-xs mt-1.5";

  if (reference) {
    return (
      <section className="py-28 md:py-40 bg-[#0D0716] relative px-6">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle2 className="w-16 h-16 text-[#14B8A6] mx-auto mb-8" />
          <p className="font-mono text-xs text-[#14B8A6] tracking-[0.3em] uppercase mb-4">
            APPLICATION RECEIVED
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-white mb-6">
            Thanks, {form.name.split(" ")[0]}.
          </h2>
          <p className="text-white leading-relaxed mb-4">
            Your equity partnership application for{" "}
            <strong>{form.startup}</strong> is with us. Your reference is{" "}
            <span className="font-mono text-[#14B8A6]">{reference}</span>.
          </p>
          <p className="text-white leading-relaxed">
            We read every application personally. If there is a fit, we will
            invite you to a founder conversation — usually within two weeks.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-28 md:py-40 bg-[#0D0716] relative px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-[#14B8A6] tracking-[0.3em] uppercase mb-4">
            EQUITY PARTNERSHIP
          </p>
          <CampaignHeadline
            align="center"
            lines={[
              { text: "LET'S BUILD" },
              { text: "IT", accent: "TOGETHER.", accentColor: "#14B8A6" },
            ]}
            className="text-3xl md:text-6xl max-w-3xl mx-auto"
          />
          <p className="text-base md:text-lg text-white leading-relaxed mt-6 max-w-2xl mx-auto">
            A small number of partnerships each year where we take a stake and
            build with you long-term. Tell us about your startup — if there is
            a fit, we will invite you to a founder conversation.
          </p>
        </div>

        {/* Process */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { n: "01", t: "You apply", d: "The form below — ten minutes, honest answers." },
            { n: "02", t: "We review", d: "Every application read by a person, not a filter." },
            { n: "03", t: "We talk", d: "Founder conversation, then a decision in ~2 weeks." },
          ].map((s) => (
            <div
              key={s.n}
              className="bg-[#190D2B] rounded-2xl p-6 border-t-4 border-t-[#14B8A6]"
            >
              <p className="font-mono text-[11px] text-[#14B8A6] tracking-[0.2em] mb-2">
                STEP {s.n}
              </p>
              <p className="text-white font-medium mb-1">{s.t}</p>
              <p className="text-sm text-white">{s.d}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-[#190D2B] rounded-2xl p-6 md:p-12 border-t-4 border-t-[#14B8A6]"
        >
          {/* Founder */}
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#14B8A6] mb-6">
            The founder
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div>
              <label htmlFor="eq-name" className={labelCls}>
                Your name *
              </label>
              <input
                id="eq-name"
                className={inputCls}
                value={form.name}
                onChange={set("name")}
                placeholder="e.g. Mutinta Phiri"
                autoComplete="name"
              />
              {errors.name && <p className={errCls}>{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="eq-contact" className={labelCls}>
                Email or phone *
              </label>
              <input
                id="eq-contact"
                className={inputCls}
                value={form.contact}
                onChange={set("contact")}
                placeholder="you@startup.com / +260..."
                autoComplete="email"
              />
              {errors.contact && <p className={errCls}>{errors.contact}</p>}
            </div>
          </div>

          {/* Startup */}
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#14B8A6] mb-6">
            The startup
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="eq-startup" className={labelCls}>
                Startup name *
              </label>
              <input
                id="eq-startup"
                className={inputCls}
                value={form.startup}
                onChange={set("startup")}
                placeholder="e.g. AgroLink"
              />
              {errors.startup && <p className={errCls}>{errors.startup}</p>}
            </div>
            <div>
              <label htmlFor="eq-website" className={labelCls}>
                Website <span className="opacity-60">(optional)</span>
              </label>
              <input
                id="eq-website"
                className={inputCls}
                value={form.website}
                onChange={set("website")}
                placeholder="https://…"
                inputMode="url"
              />
            </div>
          </div>
          <div className="mb-5">
            <p className={labelCls}>Stage *</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setForm((f) => ({ ...f, stage: s.id }));
                    setErrors((er) => ({ ...er, stage: undefined }));
                  }}
                  className={`text-left rounded-xl border p-4 ${
                    form.stage === s.id
                      ? "border-[#14B8A6] bg-[#14B8A6]"
                      : "border-white/15 bg-[#0D0716]"
                  }`}
                >
                  <span className="text-[15px] font-medium text-white">{s.label}</span>
                  <p className="text-xs text-white mt-1">{s.hint}</p>
                </button>
              ))}
            </div>
            {errors.stage && <p className={errCls}>{errors.stage}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="eq-pitch" className={labelCls}>
              What are you building? *
            </label>
            <textarea
              id="eq-pitch"
              rows={4}
              className={`${inputCls} resize-y`}
              value={form.pitch}
              onChange={set("pitch")}
              placeholder="What it does, who it is for, and why it matters — a few sentences."
            />
            {errors.pitch && <p className={errCls}>{errors.pitch}</p>}
          </div>
          <div className="mb-10">
            <label htmlFor="eq-traction" className={labelCls}>
              Traction <span className="opacity-60">(optional)</span>
            </label>
            <textarea
              id="eq-traction"
              rows={3}
              className={`${inputCls} resize-y`}
              value={form.traction}
              onChange={set("traction")}
              placeholder="Users, revenue, pilots, partnerships — whatever proves momentum."
            />
          </div>

          {/* The ask */}
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#14B8A6] mb-6">
            The ask
          </p>
          <div className="mb-5">
            <label htmlFor="eq-needs" className={labelCls}>
              What do you need from Zipangile? *
            </label>
            <textarea
              id="eq-needs"
              rows={4}
              className={`${inputCls} resize-y`}
              value={form.needs}
              onChange={set("needs")}
              placeholder="e.g. Build our MVP and act as technical co-founder for the first year."
            />
            {errors.needs && <p className={errCls}>{errors.needs}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="eq-deck" className={labelCls}>
              Pitch deck link <span className="opacity-60">(optional)</span>
            </label>
            <input
              id="eq-deck"
              className={inputCls}
              value={form.deck}
              onChange={set("deck")}
              placeholder="Google Drive, Dropbox, DocSend…"
              inputMode="url"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="eq-notes" className={labelCls}>
              Anything else <span className="opacity-60">(optional)</span>
            </label>
            <textarea
              id="eq-notes"
              rows={3}
              className={`${inputCls} resize-y`}
              value={form.notes}
              onChange={set("notes")}
              placeholder="Co-founders, timelines, constraints — anything we should know."
            />
          </div>

          {submitError && (
            <p className="text-[#FF2E9A] text-sm mb-6">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-brand w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Handshake className="w-4 h-4" />
                Submit application
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-white mt-4">
            Selective by design — we take on a small number of partnerships
            each year. We reply to every serious application.
          </p>
        </form>
      </div>
    </section>
  );
}
