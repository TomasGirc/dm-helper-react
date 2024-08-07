/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "main-black": "#383C43",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("flowbite/plugin"),
  ],
};
