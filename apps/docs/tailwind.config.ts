import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff4f1",
          100: "#ffe4dc",
          200: "#ffcdc0",
          300: "#ffaa96",
          400: "#ff7a5c",
          500: "#f95232",
          600: "#e63419",
          700: "#c22812",
          800: "#a12415",
          900: "#852318",
          950: "#490e07"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"]
      },
      typography: (theme: (arg: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.slate.700"),
            a: {
              color: theme("colors.brand.600"),
              "&:hover": { color: theme("colors.brand.700") },
              textDecoration: "none"
            },
            "h1,h2,h3,h4": {
              fontWeight: "700",
              letterSpacing: "-0.025em"
            },
            code: {
              fontFamily: theme("fontFamily.mono"),
              fontSize: "0.875em",
              backgroundColor: theme("colors.slate.100"),
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400"
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              backgroundColor: "#0d1117",
              border: "1px solid",
              borderColor: theme("colors.slate.800")
            }
          }
        },
        dark: {
          css: {
            color: theme("colors.slate.300"),
            a: {
              color: theme("colors.brand.400"),
              "&:hover": { color: theme("colors.brand.300") }
            },
            "h1,h2,h3,h4": { color: theme("colors.white") },
            code: {
              backgroundColor: theme("colors.slate.800"),
              color: theme("colors.slate.200")
            },
            strong: { color: theme("colors.white") },
            blockquote: {
              color: theme("colors.slate.400"),
              borderLeftColor: theme("colors.slate.700")
            }
          }
        }
      })
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
