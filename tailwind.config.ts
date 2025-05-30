import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ServiceNow specific colors
        "brand-primary": {
          DEFAULT: "var(--color-brand-primary)",
          foreground: "var(--color-brand-primary-foreground)",
          hover: "var(--color-brand-primary-hover)",
        },
        "brand-secondary": {
          DEFAULT: "var(--color-brand-secondary)",
          foreground: "var(--color-brand-secondary-foreground)",
        },
        "brand-tertiary": {
          DEFAULT: "var(--color-brand-tertiary)",
          foreground: "var(--color-brand-tertiary-foreground)",
        },
        "brand-border": "var(--color-brand-border)",
        "functional-success": {
          DEFAULT: "var(--color-functional-success)",
          foreground: "var(--color-functional-success-foreground)",
        },
        "functional-warning": {
          DEFAULT: "var(--color-functional-warning)",
          foreground: "var(--color-functional-warning-foreground)",
        },
        "functional-error": {
          DEFAULT: "var(--color-functional-error)",
          foreground: "var(--color-functional-error-foreground)",
        },
        "functional-info": {
          DEFAULT: "var(--color-functional-info)",
          foreground: "var(--color-functional-info-foreground)",
        },
        "functional-accent": {
          DEFAULT: "var(--color-functional-accent)",
          foreground: "var(--color-functional-accent-foreground)",
        },
        "semantic-critical": "var(--color-semantic-critical)",
        "semantic-high": "var(--color-semantic-high)",
        "semantic-medium": "var(--color-semantic-medium)",
        "semantic-low": "var(--color-semantic-low)",
        "semantic-info": "var(--color-semantic-info)",
        "semantic-positive": "var(--color-semantic-positive)",
        "semantic-negative": "var(--color-semantic-negative)",
        "semantic-warning": "var(--color-semantic-warning)",
        "semantic-error": {
          DEFAULT: "var(--color-semantic-error)",
          foreground: "var(--color-semantic-error-foreground)",
        },
        "dashboard-palette": {
          "01": "var(--color-dashboard-palette-01)",
          "02": "var(--color-dashboard-palette-02)",
          "03": "var(--color-dashboard-palette-03)",
          "04": "var(--color-dashboard-palette-04)",
          "05": "var(--color-dashboard-palette-05)",
          "06": "var(--color-dashboard-palette-06)",
          "07": "var(--color-dashboard-palette-07)",
          "08": "var(--color-dashboard-palette-08)",
          "09": "var(--color-dashboard-palette-09)",
          "10": "var(--color-dashboard-palette-10)",
          "11": "var(--color-dashboard-palette-11)",
          "12": "var(--color-dashboard-palette-12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.5rem", fontWeight: "600" }],
        h2: ["1.875rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }],
      },
      spacing: {
        "4": "4px",
        "8": "8px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
        "64": "64px",
        "96": "96px",
        "128": "128px",
      },
      boxShadow: {
        card: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        floating: "0px 4px 8px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
