import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "ui-sans-serif", "system-ui"],
        inter: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
        ],
      },
      colors: {
        "color-100": "#0d1315",
        "color-200": "#35626E",
        "color-300": "#E1E7E9",
        "color-400": "#6E8C95",
        "color-500": "#833E3E",
        "color-600": "#41833E",
      },
    },
    animation: {
      fadeInUp: "fadeInUp 0.8s ease-in-out",
    },
    keyframes: {
      fadeInUp: {
        "0%": {
          opacity: '0',
          transform: "translateY(40px)",
        },
        "100%": {
          opacity: '1',
          transform: "translateY(0)",
        },
      }
    }
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
