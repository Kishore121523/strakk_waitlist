import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strakk brand palette (dark theme)
        bg: "#0E1116", // background / surface
        surface: "#191D24", // card / elevated surface
        ink: "#ECEEF3", // primary text
        muted: "#9BA6B5", // muted text
        hairline: "#2A2F38", // borders / hairlines
        brand: "#FF5A1F", // primary accent / button (vivid orange)
        teal: "#12B6A0", // secondary accent (use sparingly)
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
