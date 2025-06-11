/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"], // ✅ 프리텐다드 적용
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
