import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0716",
        surface: "#12081F",
        border: "#241335",
        primary: "#9721FF",
        accent: "#FF2E9A",
        textPrimary: "#EDEDED",
        textSecondary: "#A1A1AA",
        textTertiary: "#52525B",
        // Electric purple (brand) scale — sampled from the Zipangile brand mark
        brand: {
          200: "#D9B8FF",
          300: "#C07FFF",
          400: "#A94DFF",
          500: "#9721FF",
          600: "#7E1AD9",
          700: "#6713B3",
          950: "#2A0A4D",
        },
        // Vibrant pink companion scale
        brandpink: {
          300: "#FF7CC0",
          400: "#FF529F",
          500: "#FF2E9A",
          600: "#E01F86",
          700: "#C21771",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-righteous)", "var(--font-inter)", "sans-serif"],
      },
      animation: {
        "shimmer-glow": "shimmer-glow 8s linear infinite",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        "shimmer-glow": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
