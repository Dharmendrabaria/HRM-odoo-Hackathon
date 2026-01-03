/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main Backgrounds
        background: "#f7f8fc", // App background
        foreground: "#0b1220", // Main text (Heading)

        // Primary Brand (Calmer Blue-Violet)
        primary: {
          DEFAULT: "#5b5bd6",
          hover: "#4f4fcf",
          soft: "#eef0ff", // Used for backgrounds
          foreground: "#ffffff",
        },

        // Neutrals (Visual Layers)
        surface: {
          DEFAULT: "#ffffff", // Card background
          hover: "#fafbff", // Card hover bg
        },
        border: "#e6e8f0", // Subtle border
        divider: "#eef0f6", // Dividers

        // Text Colors (Hierarchy)
        text: {
          heading: "#0b1220",
          body: "#334155",
          muted: "#64748b",
        },

        // Sidebar (Final Polish)
        sidebar: {
          bg: "#0b1220", // Near-black
          hover: "#1c1f3a", // Soft brand background
          active: "#1c1f3a",
          text: "#94a3b8", // Muted gray
          activeText: "#5b5bd6", // Brand color
          border: "#1e293b",
        },

        // Accents (Controlled Use)
        success: {
          DEFAULT: "#22c55e",
          soft: "#dcfce7",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#fbbf24",
          soft: "#fef3c7",
          foreground: "#ffffff",
        },
        error: {
          DEFAULT: "#ef4444",
          soft: "#fee2e2",
          foreground: "#ffffff",
        },
        info: {
          DEFAULT: "#38bdf8",
          soft: "#e0f2fe",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        hover:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        // No heavy shadows as requested
      },
      borderRadius: {
        "2xl": "1rem", // Standardizing consistent radius if needed, but Tailwind '2xl' is 1rem usually. User asked for rounded-2xl.
      },
    },
  },
  plugins: [],
};
