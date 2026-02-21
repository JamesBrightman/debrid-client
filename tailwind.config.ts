import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", '"Segoe UI"', "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        coral: {
          50: "#fff3ef",
          100: "#ffe5dc",
          200: "#ffd0bf",
          300: "#ffb59a",
          400: "#ff9a76",
          500: "#ff8e61",
          600: "#f56d3f",
          700: "#cf5232",
          800: "#a5402a",
          900: "#743021",
        },
        ocean: {
          50: "#ecf3ff",
          100: "#dce8ff",
          200: "#b9ceff",
          300: "#a8c3f5",
          400: "#7ea3ef",
          500: "#5e7fda",
          600: "#4b6fd1",
          700: "#3d5f9f",
          800: "#264a93",
          900: "#1f3a73",
        },
        sky: {
          50: "#f4f8ff",
          100: "#ebf3ff",
          200: "#dce8ff",
          300: "#c8d3e4",
          400: "#b5c9f0",
          500: "#9fc1ff",
          600: "#7da3e1",
          700: "#5f82be",
          800: "#496596",
          900: "#31476d",
        },
        sage: {
          50: "#f2f8f1",
          100: "#e4f9de",
          200: "#d4edcc",
          300: "#a8d39f",
          400: "#86ad7f",
          500: "#6d975f",
          600: "#547b49",
          700: "#3f6338",
          800: "#2f6f36",
          900: "#1f4424",
        },
        amber: {
          50: "#fff8e8",
          100: "#fff0c8",
          200: "#ffeab8",
          300: "#f0cf79",
          400: "#e2b75f",
          500: "#c8962f",
          600: "#ad7d16",
          700: "#9b6a00",
          800: "#7c5600",
          900: "#5d4100",
        },
      },
      backgroundImage: {
        "app-ombre":
          "radial-gradient(circle at 12% 8%, rgb(167 139 250 / 0.62) 0%, transparent 42%), radial-gradient(circle at 88% 10%, rgb(129 140 248 / 0.5) 0%, transparent 46%), linear-gradient(135deg, #ece6ff 0%, #dedcff 34%, #cfd7ff 68%, #bacaff 100%)",
        "card-shell":
          "linear-gradient(145deg, var(--color-white) 0%, var(--color-ocean-50) 100%)",
        "cta-gradient":
          "linear-gradient(120deg, var(--color-ocean-500), var(--color-ocean-600))",
        "pill-coral":
          "linear-gradient(120deg, var(--color-coral-300), var(--color-coral-500))",
      },
      boxShadow: {
        card: "0 18px 30px -24px rgb(61 95 159 / 0.5), 0 10px 18px -14px rgb(95 130 190 / 0.35)",
        "card-coral":
          "0 18px 30px -24px rgb(207 82 50 / 0.48), 0 10px 18px -14px rgb(207 82 50 / 0.3)",
        "card-shell":
          "0 18px 28px -24px color-mix(in srgb, var(--color-ocean-500) 35%, transparent)",
        cta: "0 10px 18px -12px color-mix(in srgb, var(--color-ocean-600) 60%, transparent)",
      },
    },
  },
};

export default config;
