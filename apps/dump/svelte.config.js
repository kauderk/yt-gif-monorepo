import adapter from '@sveltejs/adapter-netlify'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-')) {
			return
		}
		handler(warning)
	},
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter({
			// if true, will deploy the app using edge functions
			// (https://vercel.com/docs/concepts/functions/edge-functions)
			// rather than serverless functions
			edge: false,

			// an array of dependencies that esbuild should treat
			// as external when bundling functions
			external: ['prisma/schema.prisma'],

			// if true, will split your app into multiple functions
			// instead of creating a single one for the entire app
			split: false,
		}),
		files: {
			// stupidity :D
			lib: '../../packages/yt-gif/src/lib',
		},
	},
}

export default config
