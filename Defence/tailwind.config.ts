import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./views/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Portfolio primary palette
        primary: {
          DEFAULT: "#573CFA",
          light:   "#7c63fb",
        },
        // Neutrals matching portfolio bg/card/border
        navy: {
          50:  "#f0f0ff",
          100: "#e0e0ff",
          200: "#c4c0f9",
          300: "#a89fff",
          400: "#8b82b0",
          500: "#6b6490",
          600: "#2a2550",
          700: "#1e1a36",
          800: "#16132a",
          900: "#110f20",
          950: "#0d0b1a",
        },
        // Accent colours from portfolio
        gold: {
          DEFAULT: "#FB8D1A",
          400: "#FB8D1A",
          500: "#e07b0f",
        },
        olive: {
          DEFAULT: "#02864A",
          500: "#02864A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Georgia", "serif"],
      },
      animation: {
        "fade-in":  "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn:  { from: { opacity: "0" },                              to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
export default config;
