/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Nunito Variable', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primary: '#1f1d7c'
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
