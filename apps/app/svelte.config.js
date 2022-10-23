import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-netlify'
//const pkg = require('./package.json')

/** @type {import('@sveltejs/kit').Config} */

const config = {
	onwarn: (warning, handler) => {
		const { code } = warning
		// I want to use "tree shaking" but @import is for global styles
		// and @use might be bad for performance but is the best I can do
		if (code === 'css-unused-selector') {
			return
		}

		handler(warning)
	},
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			defaults: {
				style: 'postcss',
			},
			postcss: true,
		}),
	],

	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		// adapter: node(),
		adapter: adapter(),

		// // hydrate the <div id="svelte"> element in src/app.html
		// target: '#svelte',

		// vite: {
		//   ssr: {
		//     noExternal: Object.keys(pkg.dependencies || {}),
		//   },
		// },
	},
}
export default config
