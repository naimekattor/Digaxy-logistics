import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#B8860B", 
          light: "#FDFBF7", 
          dark: "#1A1A1A",
          muted: "#8A8A8A",
          accent: "#D4A017",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;