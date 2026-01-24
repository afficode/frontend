/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
		require('flowbite/plugin'),
		require('tailwind-scrollbar')({ nocompatible: true }),
	],
	daisyui: {
		// prefix: '',
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"],
					primary: '#2686CE',
					secondary: '#EBBA16',
					"#root": {
						"background-color": "#FBFBFB"
					}
				},
				"dark": false,
			},
			
		],
	},
};
