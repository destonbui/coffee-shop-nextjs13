/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "theme-green-main": "rgb(0, 111, 60)",
        "theme-green-darker": "rgb(0, 62, 16)",
        "theme-green-lighter": "rgb(73, 164, 108)",
      },
      fontFamily: {
        baloo: ["var(--font-baloo)"],
        arimo: ["var(--font-arimo)"],
      },
    },
  },
  plugins: [],
};
