import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sixty: ["Sixtyfour", "serif"]
    },
  },
} satisfies Config;
