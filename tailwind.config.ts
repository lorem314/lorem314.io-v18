import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "bg-0": "var(--bg-0)",
        "bg-1": "var(--bg-1)",
        "content-bg": "var(--content-bg)",
        "label-color": "var(--label-color)",
        "label-border-color": "var(--label-border-color)",

        "misc-button-icon-color": "var(--misc-button-icon-color)",
        "misc-button-bg": "var(--misc-button-bg)",
        "misc-button-hover-bg": "var(--misc-button-hover-bg)",
        "misc-button-active-bg": "var(--misc-button-active-bg)",
        "misc-button-active-color": "var(--misc-button-active-color)",

        "input-text-foreground": "var(--input-text-foreground)",
        "input-text-background": "var(--input-text-background)",
        "input-text-border-color": "var(--input-text-border-color)",

        "tooltip-color": "var(--tooltip-color)",
        "tooltip-bg": "var(--tooltip-bg)",
        "tooltip-border-color": "var(--tooltip-border-color)",

        "ch-border-color": "var(--ch-border-color)",
        "ch-pre-title-foreground": "var(--ch-pre-title-foreground)",
        "ch-pre-title-background": "var(--ch-pre-title-background)",

        // "": "var(--)",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
} satisfies Config
