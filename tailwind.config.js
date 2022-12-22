/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#1f2738",
        "green-neon": "#00ff84",
        "green-shadow": "#1fdb9d",
        "red-neon": "#ff2121",
        "red-shadow": "#ff3c00",
        "blue-neon": "#214aff",
        "blue-shadow": "#0051ff",
        "paginator-select": "#0284c7",
      },
      transitionTimingFunction: {
        "show-elem": "cubic-bezier(0.35, 0, 0.25, 1)",
        "show-contact": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
    animation: {
      load: "startLoad cubic-bezier(0.645, 0.045, 0.355, 1) infinite",
    },
    keyframes: {
      startLoad: {
        "0%": {
          left: "0%",
        },
        "100%": {
          left: "100%",
        },
      },
    },
  },
  plugins: [],
};
