import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FFFFFF",
          subtle: "#F6F7F9",
          muted: "#F0F2F5",
          inverse: "#0A0A0C",
          "inverse-2": "#111116",
        },
        ink: {
          DEFAULT: "#0A0A0C",
          2: "#4B4F57",
          3: "#878C95",
          4: "#A9AEB6",
          inverse: "#FFFFFF",
          "inverse-2": "#A6ABB5",
          "inverse-3": "#6A6F79",
        },
        line: {
          DEFAULT: "#ECEDF1",
          2: "#E1E3E9",
          inverse: "rgba(255,255,255,0.10)",
          "inverse-2": "rgba(255,255,255,0.16)",
        },
        accent: {
          DEFAULT: "#2F5BFF",
          dark: "#1D46E0",
          bright: "#5B84FF",
          tint: "#EBF0FF",
          "tint-2": "#DDE6FF",
          soft: "rgba(47,91,255,0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6.2vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-lg": ["clamp(2.25rem, 4.8vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" }],
        "heading-1": ["clamp(2rem, 3.8vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-2": ["clamp(1.65rem, 2.8vw, 2.35rem)", { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-3": ["clamp(1.35rem, 2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.55" }],
        "label": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
        "eyebrow": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.14em", fontWeight: "600" }],
      },
      borderRadius: {
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
        "2xl": "36px",
        "3xl": "44px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(10,12,20,0.05)",
        sm: "0 1px 3px rgba(10,12,20,0.06), 0 1px 2px rgba(10,12,20,0.04)",
        md: "0 4px 16px rgba(10,12,20,0.06), 0 2px 5px rgba(10,12,20,0.04)",
        lg: "0 12px 34px rgba(10,12,20,0.10), 0 4px 10px rgba(10,12,20,0.05)",
        xl: "0 24px 64px rgba(10,12,20,0.14), 0 8px 20px rgba(10,12,20,0.06)",
        float: "0 30px 70px -20px rgba(20,28,60,0.30)",
        glow: "0 0 0 1px rgba(47,91,255,0.20), 0 18px 50px -12px rgba(47,91,255,0.45)",
        "inner-line": "inset 0 0 0 1px rgba(255,255,255,0.08)",
      },
      maxWidth: {
        content: "1200px",
        prose: "42rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "70%, 100%": { transform: "scale(1.7)", opacity: "0" },
        },
        eq: {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "float-slow": "float-slow 7s ease-in-out infinite",
        "float-soft": "float-soft 5s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        eq: "eq 0.9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
