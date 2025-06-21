import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: "transparent",
              padding: 0,
            },
            code: {
              backgroundColor: "transparent",
              color: "inherit",
            },
          },
        },
        invert: {
          css: {
            pre: {
              backgroundColor: "transparent",
              padding: 0,
            },
            code: {
              backgroundColor: "transparent",
              color: "inherit",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
