/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
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
  plugins: [require("daisyui"), require('flowbite/plugin') ],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#2686CE",
        "secondary": "#EBBA16",
      }
    },"light"],
  },
};
