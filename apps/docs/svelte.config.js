import { mdsvex } from 'mdsvex'
import path from 'path'
import adapter from '@sveltejs/adapter-netlify'
import preprocess from 'svelte-preprocess'
import slug from 'rehype-slug'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
		}),
		mdsvex({
			extensions: ['.svx', '.md'],
			rehypePlugins: [slug],
		}),
	],

	kit: {
		adapter: adapter(),
	},
}

export default config
