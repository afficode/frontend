/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: "#2686CE",
      yellow: "#EBBA16",
      white: "#FFFFFF",
      black: "#000000",
      green: "#047F73",
      lightBlue: "#2686CE",
      lightBlue1: "#0F8EEF",
      grey: "#D9D9D9",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
