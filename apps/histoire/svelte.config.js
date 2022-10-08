import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'
import { mdsvex } from 'mdsvex'
import remarkGithub from 'remark-github'
import remarkAbbr from 'remark-abbr'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { resolve } from 'path'

// mdsvex config
const mdsvexConfig = {
	extensions: ['.svelte.md', '.md', '.svx'],
	// layout: {
	// 	_: './src/mdsvexlayout.svelte' // default mdsvex layout
	// },
	remarkPlugins: [
		[
			remarkGithub,
			{
				// Use your own repository
				repository:
					'https://github.com/mvasigh/sveltekit-mdsvex-blog.git',
			},
		],
		remarkAbbr,
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
			},
		],
	],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.html', '.svx', ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter({
			split: false,
		}),
		alias: {
			// Root
			$root: resolve('../../'),

			// App (main)
			$site: resolve('../../apps/site/src'),

			// Apps (plop added)
			$docs: resolve('../../apps/docs/src'),
			$bookit: resolve('../../apps/bookit/src'),
			$vitebook: resolve('../../apps/vitebook/src'),
		},
	},
}

export default config
