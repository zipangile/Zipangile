"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <section id="quote" className="py-28 md:py-40 relative px-6 overflow-hidden border-t border-white/[0.06]">
      <div className="absolute -top-32 left-1/4 w-[500px] h-[400px] rounded-full bg-brand-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[400px] rounded-full bg-brandpink-600/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-brand-300 tracking-[0.3em] uppercase mb-4">
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
          <p className="text-base md:text-lg text-[#A1A1AA] font-light leading-relaxed mt-6 max-w-2xl mx-auto">
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
                  className={`flex items-center gap-2 rounded-full px-3 md:px-4 py-2 border transition-all ${
                    active
                      ? "border-brand-400/60 bg-brand-500/15 text-white"
                      : done
                        ? "border-brand-500/30 bg-brand-500/5 text-brand-300 cursor-pointer hover:border-brand-400/50"
                        : "border-white/10 text-[#52525B]"
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
                  <div className={`w-4 md:w-10 h-px ${done ? "bg-brand-500/60" : "bg-white/10"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="glass-panel p-6 md:p-12 min-h-[480px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 32, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                    Tell us the idea.
                  </h3>
                  <p className="text-[#A1A1AA] font-light mb-8">
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
                    className="w-full px-5 py-4 bg-white/[0.04] border border-white/10 rounded-2xl text-[15px] text-[#EDEDED] placeholder:text-[#52525B] focus:outline-none focus:border-brand-400/70 focus:bg-white/[0.06] transition-all resize-y mb-2"
                  />
                  {ideaError && (
                    <p className="text-brandpink-400 text-xs mb-4">
                      Give us at least a sentence or two so the estimate means something.
                    </p>
                  )}
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#A1A1AA] mt-6 mb-3">
                    What best describes it?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCategory(c.id)}
                        className={`text-left rounded-2xl border p-4 backdrop-blur-md transition-all ${
                          category === c.id
                            ? "border-brand-400/70 bg-brand-500/15 shadow-[0_0_32px_rgba(151,33,255,0.25)]"
                            : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[15px] font-medium text-white">{c.label}</span>
                          <span className="font-mono text-[11px] text-brand-300">
                            {formatZMW(c.base)}+
                          </span>
                        </div>
                        <p className="text-xs text-[#A1A1AA] font-light">{c.blurb}</p>
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
                  <p className="text-[#A1A1AA] font-light mb-8">
                    Tap everything your idea needs. Prices update live.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FEATURES.map((f) => {
                      const on = featureIds.includes(f.id);
                      return (
                        <button
                          key={f.id}
                          onClick={() => toggleFeature(f.id)}
                          className={`text-left rounded-2xl border p-4 backdrop-blur-md transition-all ${
                            on
                              ? "border-brandpink-400/70 bg-brandpink-500/15 shadow-[0_0_32px_rgba(255,46,154,0.22)]"
                              : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[15px] font-medium text-white flex items-center gap-2">
                              <span
                                className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                                  on ? "bg-brandpink-500 border-brandpink-400" : "border-white/25"
                                }`}
                              >
                                {on && <Check className="w-3 h-3 text-white" />}
                              </span>
                              {f.label}
                            </span>
                            <span className="font-mono text-[11px] text-brandpink-300">
                              +{formatZMW(f.price)}
                            </span>
                          </div>
                          <p className="text-xs text-[#A1A1AA] font-light pl-6">{f.hint}</p>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-right font-mono text-sm text-brand-300 mt-6">
                    Features subtotal: {formatZMW(breakdown.featuresTotal)}
                  </p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                    How fast do you need it?
                  </h3>
                  <p className="text-[#A1A1AA] font-light mb-8">
                    Speed costs. Patience saves.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TIMELINES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTimeline(t.id)}
                        className={`rounded-2xl border p-6 text-center backdrop-blur-md transition-all ${
                          timeline === t.id
                            ? "border-brand-400/70 bg-brand-500/15 shadow-[0_0_32px_rgba(151,33,255,0.25)]"
                            : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                        }`}
                      >
                        <p className="font-display text-xl text-white mb-1">{t.label}</p>
                        <p className="text-sm text-[#A1A1AA] font-light mb-3">{t.detail}</p>
                        <p
                          className={`font-mono text-sm ${
                            t.multiplier > 1
                              ? "text-brandpink-300"
                              : t.multiplier < 1
                                ? "text-emerald-300"
                                : "text-brand-300"
                          }`}
                        >
                          ×{t.multiplier.toFixed(1)}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-brand-300 border border-brand-500/30 rounded-full px-4 py-1.5 mb-8">
                    <Sparkles className="w-3.5 h-3.5" />
                    Your scoped quote · {quote?.reference ?? "—"}
                  </div>

                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#A1A1AA] mb-3">
                    Indicative estimate
                  </p>
                  <p className="font-display text-6xl md:text-7xl text-white mb-2">
                    {formatZMW(breakdown.low)} – {formatZMW(breakdown.high)}
                  </p>
                  <p className="text-sm text-[#A1A1AA] font-light mb-10">
                    Most similar builds land near{" "}
                    <span className="text-white font-medium">{formatZMW(breakdown.total)}</span>
                  </p>

                  <div className="max-w-xl mx-auto text-left rounded-2xl border border-white/[0.08] bg-black/30 p-6 mb-10">
                    <div className="flex justify-between text-sm py-2 border-b border-white/[0.06]">
                      <span className="text-[#A1A1AA]">{breakdown.baseLabel} — base</span>
                      <span className="font-mono text-white">{formatZMW(breakdown.base)}</span>
                    </div>
                    {breakdown.features.map((f) => (
                      <div key={f.label} className="flex justify-between text-sm py-2 border-b border-white/[0.06]">
                        <span className="text-[#A1A1AA]">{f.label}</span>
                        <span className="font-mono text-white">+{formatZMW(f.price)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm py-2 border-b border-white/[0.06]">
                      <span className="text-[#A1A1AA]">{breakdown.timelineLabel} timeline</span>
                      <span className="font-mono text-brand-300">×{breakdown.multiplier.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2">
                      <span className="text-[#A1A1AA]">Range (±15%)</span>
                      <span className="font-mono text-brandpink-300">
                        {formatZMW(breakdown.low)} – {formatZMW(breakdown.high)}
                      </span>
                    </div>
                  </div>

                  <p className="font-mono text-[11px] text-[#63636B] tracking-[0.15em] uppercase mb-8">
                    Indicative estimate — final scope confirmed in consultation
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={scrollToBooking}
                      className="btn-fluid inline-flex items-center gap-2 px-8 py-4 text-white font-medium text-[15px] rounded-xl"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Book a consultation to discuss
                    </button>
                    <button
                      onClick={scrollToBooking}
                      className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-[#EDEDED] font-medium text-[15px] rounded-xl hover:border-brandpink-400/60 hover:text-white transition-all"
                    >
                      <Rocket className="w-4 h-4" />
                      Start my build
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-[#A1A1AA]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          {step < 3 ? (
            <button
              onClick={next}
              className="btn-fluid inline-flex items-center gap-2 px-8 py-3.5 text-white font-medium text-sm rounded-xl"
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
              className="text-sm font-mono tracking-wider uppercase text-[#A1A1AA] hover:text-white transition-colors"
            >
              Start over
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
