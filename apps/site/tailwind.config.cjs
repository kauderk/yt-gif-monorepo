const tailwindConfig = require('@packages/config/tailwindConfig')

const config = {
	...tailwindConfig,
	content: [
		...tailwindConfig.content,
		'./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}',
		'./node_modules/astro-boilerplate-components/**/*.{js,ts,jsx,tsx}'
	],
	plugins: [
		...tailwindConfig.plugins,
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography')
	]
}

module.exports = config
