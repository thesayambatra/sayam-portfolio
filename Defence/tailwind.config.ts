import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./views/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#b3c4d9",
          300: "#829dbb",
          400: "#55789b",
          500: "#345a80",
          600: "#244666",
          700: "#1a3355",
          800: "#12233a",
          900: "#0b1728",
          950: "#060e1c",
        },
        olive: {
          50: "#f6f7f0",
          100: "#e6e9dd",
          200: "#ccd3b8",
          300: "#aaba8d",
          400: "#86a066",
          500: "#6b8a4b",
          600: "#52703a",
          700: "#3f5830",
          800: "#314527",
          900: "#293a22",
          950: "#141d10",
        },
        gold: {
          50: "#fdf9ec",
          100: "#f9eec8",
          200: "#f2da8f",
          300: "#eac055",
          400: "#e3a92e",
          500: "#d18f17",
          600: "#b56e12",
          700: "#8f5113",
          800: "#764217",
          900: "#643a18",
          950: "#3a1f0b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
export default config;
