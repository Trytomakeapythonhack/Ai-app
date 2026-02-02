import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        oat: {
          50: "#faf8f2",
          100: "#f4f0e4",
          200: "#e8dfc4",
          300: "#d7c79c",
          400: "#c2a76a",
          500: "#ad8a4a",
          600: "#8f6d38",
          700: "#735630",
          800: "#5f472c",
          900: "#523c27"
        }
      }
    },
  },
  plugins: [],
};

export default config;
