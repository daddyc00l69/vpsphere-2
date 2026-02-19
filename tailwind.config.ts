import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF", // vpsPurple
        "primary-dashboard": "#4c42ff",
        "background-light": "#F7F8FA", // vpsBackground
        "background-dark": "#100f23",
        success: "#28A745",
        danger: "#DC3545",
        warning: "#FFC107",
        vpsPurple: "#6C63FF",
        vpsIndigo: "#8E7CFF",
        vpsBackground: "#F7F8FA",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1.5rem",
        full: "9999px",
        vps: "12px",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
