"use client";

import React, { useState } from "react";
import CampaignHeadline from "./CampaignHeadline";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  CalendarCheck,
  Rocket,
  Lightbulb,
  LayoutGrid,
  Clock3,
  ReceiptText,
} from "lucide-react";
import {
  CATEGORIES,
  FEATURES,
  TIMELINES,
  calculateQuote,
  formatZMW,
  saveQuote,
  type ProjectCategory,
  type Timeline,
  type SavedQuote,
} from "../lib/quoteCalculator";

const STEPS = [
  { id: 0, label: "Your idea", icon: Lightbulb },
  { id: 1, label: "Features", icon: LayoutGrid },
  { id: 2, label: "Timeline", icon: Clock3 },
  { id: 3, label: "Your quote", icon: ReceiptText },
];

function scrollToBooking() {
  // Multi-page: booking lives at /book — quote is already saved to localStorage
  window.location.href = "/book";
}

export default function QuoteWizard({ standalone = false }: { standalone?: boolean }) {
  const [step, setStep] = useState(0);
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("mvp");
  const [featureIds, setFeatureIds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<Timeline>("standard");
  const [quote, setQuote] = useState<SavedQuote | null>(null);
  const [ideaError, setIdeaError] = useState(false);

  const toggleFeature = (id: string) =>
    setFeatureIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  const canNext = () => {
    if (step === 0) return idea.trim().length >= 10;
    return true;
  };

  const next = () => {
    if (step === 0 && !canNext()) {
      setIdeaError(true);
      return;
    }
    setIdeaError(false);
    if (step === 2) {
      const breakdown = calculateQuote(category, featureIds, timeline);
      setQuote(saveQuote({ idea: idea.trim(), category, featureIds, timeline, breakdown }));
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const breakdown = quote?.breakdown ?? calculateQuote(category, featureIds, timeline);

  return (
    <section id="quote" className="py-28 md:py-40 relative px-6 bg-[#0D0716]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-[#FFB800] tracking-[0.3em] uppercase mb-4">
            IDEA → QUOTE
          </p>
          <CampaignHeadline
            align="center"
            lines={[
              { text: "WHAT WOULD IT COST" },
              { text: "TO", accent: "BUILD", accentColor: "#FF2E9A" },
              { text: "YOUR IDEA?" },
            ]}
            className="text-3xl md:text-6xl max-w-4xl mx-auto"
          />
          <p className="text-base md:text-lg text-white leading-relaxed mt-6 max-w-2xl mx-auto">
            Walk through your idea in under a minute and get an instant,
            itemized estimate. No account, no sales call, no waiting.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-12">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 rounded-full px-3 md:px-4 py-2 border ${
                    active
                      ? "border-[#9721FF] bg-[#9721FF] text-white"
                      : done
                        ? "border-white/40 text-white cursor-pointer"
                        : "border-white/20 text-white"
                  }`}
                >
                  {done ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline text-[11px] font-mono tracking-[0.15em] uppercase">
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`w-4 md:w-10 h-px ${done ? "bg-white" : "bg-white/20"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-[#190D2B] rounded-2xl p-6 md:p-12 min-h-[480px] border-t-4 border-t-[#9721FF]">
          <div key={step} className="step-fade">
            {step === 0 && (
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                  Tell us the idea.
                </h3>
                <p className="text-white mb-8">
                  A few sentences is plenty — what it does, who it&apos;s for.
                </p>
                <textarea
                  value={idea}
                  onChange={(e) => {
                    setIdea(e.target.value);
                    if (e.target.value.trim().length >= 10) setIdeaError(false);
                  }}
                  rows={5}
                  placeholder="e.g. A mobile app where farmers in Eastern Province list their produce and buyers place orders for delivery…"
                  className="field px-5 py-4 text-[15px] resize-y mb-2"
                />
                {ideaError && (
                  <p className="text-[#FF2E9A] text-xs mb-4">
                    Give us at least a sentence or two so the estimate means something.
                  </p>
                )}
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white mt-6 mb-3">
                  What best describes it?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={`text-left rounded-xl border p-4 ${
                        category === c.id
                          ? "border-[#9721FF] bg-[#9721FF]"
                          : "border-white/15 bg-[#0D0716]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[15px] font-medium text-white">{c.label}</span>
                        <span className="font-mono text-[11px] text-white">
                          {formatZMW(c.base)}+
                        </span>
                      </div>
                      <p className="text-xs text-white">{c.blurb}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                  Pick your features.
                </h3>
                <p className="text-white mb-8">
                  Tap everything your idea needs. Prices update live.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FEATURES.map((f) => {
                    const on = featureIds.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() => toggleFeature(f.id)}
                        className={`text-left rounded-xl border p-4 ${
                          on
                            ? "border-[#FF2E9A] bg-[#FF2E9A]"
                            : "border-white/15 bg-[#0D0716]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[15px] font-medium text-white flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                                on ? "bg-white border-white" : "border-white/40"
                              }`}
                            >
                              {on && <Check className="w-3 h-3 text-[#FF2E9A]" />}
                            </span>
                            {f.label}
                          </span>
                          <span className="font-mono text-[11px] text-white">
                            +{formatZMW(f.price)}
                          </span>
                        </div>
                        <p className="text-xs text-white pl-6">{f.hint}</p>
                      </button>
                    );
                  })}
                </div>
                <p className="text-right font-mono text-sm text-white mt-6">
                  Features subtotal: {formatZMW(breakdown.featuresTotal)}
                </p>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                  How fast do you need it?
                </h3>
                <p className="text-white mb-8">
                  Speed costs. Patience saves.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TIMELINES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTimeline(t.id)}
                      className={`rounded-xl border p-6 text-center ${
                        timeline === t.id
                          ? "border-[#14B8A6] bg-[#14B8A6]"
                          : "border-white/15 bg-[#0D0716]"
                      }`}
                    >
                      <p className="font-display text-xl text-white mb-1">{t.label}</p>
                      <p className="text-sm text-white mb-3">{t.detail}</p>
                      <p className="font-mono text-sm text-white">
                        ×{t.multiplier.toFixed(1)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-white border border-white/25 rounded-full px-4 py-1.5 mb-8">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your scoped quote · {quote?.reference ?? "—"}
                </div>

                <p className="font-mono text-xs tracking-[0.2em] uppercase text-white mb-3">
                  Indicative estimate
                </p>
                <p className="font-display text-6xl md:text-7xl text-white mb-2">
                  {formatZMW(breakdown.low)} – {formatZMW(breakdown.high)}
                </p>
                <p className="text-sm text-white mb-10">
                  Most similar builds land near{" "}
                  <span className="text-white font-medium">{formatZMW(breakdown.total)}</span>
                </p>

                <div className="max-w-xl mx-auto text-left rounded-xl border border-white/15 bg-[#0D0716] p-6 mb-10">
                  <div className="flex justify-between text-sm py-2 border-b border-white/10">
                    <span className="text-white">{breakdown.baseLabel} — base</span>
                    <span className="font-mono text-white">{formatZMW(breakdown.base)}</span>
                  </div>
                  {breakdown.features.map((f) => (
                    <div key={f.label} className="flex justify-between text-sm py-2 border-b border-white/10">
                      <span className="text-white">{f.label}</span>
                      <span className="font-mono text-white">+{formatZMW(f.price)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm py-2 border-b border-white/10">
                    <span className="text-white">{breakdown.timelineLabel} timeline</span>
                    <span className="font-mono text-white">×{breakdown.multiplier.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-white">Range (±15%)</span>
                    <span className="font-mono text-white">
                      {formatZMW(breakdown.low)} – {formatZMW(breakdown.high)}
                    </span>
                  </div>
                </div>

                <p className="font-mono text-[11px] text-white tracking-[0.15em] uppercase mb-8">
                  Indicative estimate — final scope confirmed in consultation
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={scrollToBooking}
                    className="btn-brand inline-flex items-center gap-2 px-8 py-4 text-[15px]"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Book a consultation to discuss
                  </button>
                  <button
                    onClick={scrollToBooking}
                    className="btn-outline-white inline-flex items-center gap-2 px-8 py-4 text-[15px]"
                  >
                    <Rocket className="w-4 h-4" />
                    Start my build
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm text-white disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          {step < 3 ? (
            <button
              onClick={next}
              className="btn-brand inline-flex items-center gap-2 px-8 py-3.5 text-sm"
            >
              {step === 2 ? "See my quote" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setStep(0);
                setQuote(null);
              }}
              className="text-sm font-mono tracking-wider uppercase text-white"
            >
              Start over
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
