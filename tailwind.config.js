/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(24, 59, 91, 0.10)",
        glow: "0 24px 70px rgba(109, 183, 232, 0.26)",
        coral: "0 20px 52px rgba(255, 107, 97, 0.34)",
      },
    },
  },
  plugins: [],
};
