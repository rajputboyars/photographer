/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "#0A0F1C",
        panel: "#141A2B",
        ink: "#F4F6FB",
        accent: "#9CC7FF",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Avenir Next", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1440px",
        measure: "36rem",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
