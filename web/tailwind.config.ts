import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "768px",
      md: "1080px",
      lg: "1600px",
    },
    spacing: {
      "0": "0",
      "02e": "0.2em",
      "05e": "0.5em",
      1: "1px",
      "1e": "1em",
      "1re": "1rem",
      xs: "var(--space-xs)",
      sm: "var(--space-sm)",
      md: "var(--space-md)",
      lg: "var(--space-lg)",
      xl: "var(--space-xl)",
      xxl: "var(--space-xxl)",
      gutter: "var(--gutter)",
      "header-height": "var(--header-height)",
    },
    colors: {
      black: "black",
      white: "white",
      red: "var(--color-red)",
      yellow: "var(--color-yellow)",
      orange: "var(--color-orange)",
      blue: "var(--color-blue)",
    },
    fontSize: {
      sm: ["var(--text-sm)", "1"],
      md: ["var(--text-md)", "1.3"],
      lg: ["var(--text-lg)", "1"],
      xl: ["var(--text-xl)", "1"],
    },
    fontFamily: {
      "font-primary": ["var(--primary)"],
      "font-primary-b": ["var(--primary)"],
    },
  },
  plugins: [],
};
export default config;
