/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
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
				mytheme: {
					primary: '#2686CE',
					secondary: '#EBBA16',
				},
			},
			'light',
		],
	},
};
