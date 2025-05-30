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
          DEFAULT: "#003C71",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#5A697B",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#00C6B1",
          foreground: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          foreground: "#2E384D",
        },
        destructive: {
          DEFAULT: "#FF4D4D",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5F6F7",
          foreground: "#5A697B",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#2E384D",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2E384D",
        },
        success: {
          DEFAULT: "#4BCA81",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FFC400",
          foreground: "#2E384D",
        },
        emerald: {
          DEFAULT: "#10b981",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
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
