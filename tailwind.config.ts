import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        carbon: "#0b0d10",
        platinum: "#f4f0e8",
        ember: "#ff5a3d",
        volt: "#b9ff4a",
        arctic: "#86f4ff",
        wine: "#a229ff",
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 90, 61, 0.26)",
        cyan: "0 0 48px rgba(134, 244, 255, 0.18)",
      },
      backgroundImage: {
        "noise-texture":
          "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 28%), radial-gradient(circle at 80% 0%, rgba(134,244,255,0.08), transparent 30%), linear-gradient(135deg, rgba(255,90,61,0.12), transparent 38%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
