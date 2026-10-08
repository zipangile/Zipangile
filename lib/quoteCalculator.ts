/**
 * Zipangile idea-to-quote calculator.
 * All amounts in ZMW. Quotes are indicative estimates — final scope is
 * confirmed in consultation.
 */

export type ProjectCategory =
  | "website"
  | "mobile-app"
  | "mvp"
  | "custom-platform"
  | "other";

export type Timeline = "rush" | "standard" | "flexible";

export interface FeatureOption {
  id: string;
  label: string;
  hint: string;
  price: number; // ZMW
}

export interface QuoteBreakdown {
  base: number;
  baseLabel: string;
  features: { label: string; price: number }[];
  featuresTotal: number;
  subtotal: number;
  timeline: Timeline;
  timelineLabel: string;
  multiplier: number;
  total: number;
  low: number;
  high: number;
}

export const CATEGORIES: { id: ProjectCategory; label: string; base: number; blurb: string }[] = [
  { id: "website", label: "Website", base: 8000, blurb: "Business site or landing page" },
  { id: "mobile-app", label: "Mobile app", base: 18000, blurb: "Android app, phone-first" },
  { id: "mvp", label: "MVP", base: 25000, blurb: "Smallest thing that proves the bet" },
  { id: "custom-platform", label: "Custom platform", base: 60000, blurb: "Two-sided systems, dashboards" },
  { id: "other", label: "Something else", base: 15000, blurb: "Tell us — we'll scope it together" },
];

export const FEATURES: FeatureOption[] = [
  { id: "auth", label: "User accounts & login", hint: "Sign-up, login, profiles", price: 3000 },
  { id: "payments", label: "Mobile money & card payments", hint: "MTN, Airtel, Zamtel, cards via Lenco", price: 5000 },
  { id: "offline", label: "Offline mode", hint: "Works without internet, syncs later", price: 8000 },
  { id: "ai", label: "AI features", hint: "Chat, smart search, automation", price: 10000 },
  { id: "i18n", label: "Multi-language", hint: "e.g. English + Nyanja + Bemba", price: 4000 },
  { id: "admin", label: "Admin dashboard", hint: "Manage users, content, reports", price: 5000 },
  { id: "notifications", label: "Notifications / SMS", hint: "Push, email, SMS alerts", price: 2500 },
  { id: "analytics", label: "Analytics", hint: "Usage dashboards & reports", price: 2000 },
];

export const TIMELINES: { id: Timeline; label: string; detail: string; multiplier: number }[] = [
  { id: "rush", label: "Rush", detail: "4 weeks", multiplier: 1.5 },
  { id: "standard", label: "Standard", detail: "8–10 weeks", multiplier: 1.0 },
  { id: "flexible", label: "Flexible", detail: "12+ weeks", multiplier: 0.9 },
];

export function calculateQuote(
  category: ProjectCategory,
  featureIds: string[],
  timeline: Timeline
): QuoteBreakdown {
  const cat = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0];
  const tl = TIMELINES.find((t) => t.id === timeline) ?? TIMELINES[1];

  const features = FEATURES.filter((f) => featureIds.includes(f.id)).map((f) => ({
    label: f.label,
    price: f.price,
  }));
  const featuresTotal = features.reduce((s, f) => s + f.price, 0);
  const subtotal = cat.base + featuresTotal;
  const total = Math.round(subtotal * tl.multiplier);

  return {
    base: cat.base,
    baseLabel: cat.label,
    features,
    featuresTotal,
    subtotal,
    timeline,
    timelineLabel: `${tl.label} (${tl.detail})`,
    multiplier: tl.multiplier,
    total,
    low: Math.round(total * 0.85),
    high: Math.round(total * 1.15),
  };
}

export function formatZMW(n: number): string {
  return "K" + n.toLocaleString("en-ZM");
}

export function makeQuoteReference(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `ZQ-${s}`;
}

export interface SavedQuote {
  reference: string;
  createdAt: string;
  idea: string;
  category: ProjectCategory;
  featureIds: string[];
  timeline: Timeline;
  breakdown: QuoteBreakdown;
}

export function saveQuote(q: Omit<SavedQuote, "reference" | "createdAt">): SavedQuote {
  const saved: SavedQuote = {
    ...q,
    reference: makeQuoteReference(),
    createdAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem("zipangile-quote", JSON.stringify(saved));
    window.dispatchEvent(new CustomEvent("zipangile:quote-ready", { detail: saved }));
  } catch {
    /* storage unavailable — quote still returned */
  }
  return saved;
}

export function loadQuote(): SavedQuote | null {
  try {
    const raw = localStorage.getItem("zipangile-quote");
    return raw ? (JSON.parse(raw) as SavedQuote) : null;
  } catch {
    return null;
  }
}
