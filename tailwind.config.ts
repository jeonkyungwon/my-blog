import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class", // ✅ 다크 모드 적용
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"], // ✅ 프리텐다드 적용
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#27272a", // zinc.800
            a: { color: "#2563eb", fontWeight: "500" }, // blue.600
            h1: { fontSize: "2.25rem", fontWeight: "700" }, // 4xl
            h2: { fontSize: "1.875rem", fontWeight: "600" }, // 3xl
            h3: { fontSize: "1.5rem", fontWeight: "600" }, // 2xl
            h4: { fontSize: "1.25rem", fontWeight: "500" }, // xl
            code: {
              backgroundColor: "#f4f4f5", // zinc.100
              color: "#db2777", // pink.600
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
            },
            pre: {
              backgroundColor: "#18181b", // zinc.900
              color: "#fff",
              padding: "1rem",
              borderRadius: "0.5rem",
            },
          },
        },
        dark: {
          css: {
            color: "#f4f4f5", // zinc.100
            a: { color: "#60a5fa", fontWeight: "500" }, // blue.400
            h1: { color: "#f4f4f5" },
            h2: { color: "#f4f4f5" },
            h3: { color: "#f4f4f5" },
            h4: { color: "#f4f4f5" },
            code: {
              backgroundColor: "#27272a", // zinc.800
              color: "#f9a8d4", // pink.300
            },
            pre: {
              backgroundColor: "#18181b",
              color: "#fff",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
