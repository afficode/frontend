/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      'ourGreen': '#0CC18E',
    },
    extend: {
      fontFamily: {
        'alice' : ['Alice', 'sans-serif'],
        'arima' : ['"Arima Madurai", cursive', 'sans-serif'],
        'barlow' : ['Barlow', 'sans-serif'],
        'crimson' : ['Crimson Pro', 'sans-serif'],
        'sono': ['Sono', 'sans-serif']
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('tw-elements/dist/plugin')
  ]
}
