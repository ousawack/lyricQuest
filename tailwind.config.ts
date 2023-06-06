import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        beth: ["Beth Ellen", "beth-ellen"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
