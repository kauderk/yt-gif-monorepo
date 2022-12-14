import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'
import alias from '@rollup/plugin-alias'

/** @type {import('vite').UserConfig} */
const config = {
	build: {
		target: ['es2020'],
	},
	resolve: {
		preserveSymlinks: false,
		build: {
			sourcemap: true,
		},
	},
	ssr: {
		noExternal: [
			'@popperjs/core',
			'dayjs',
			'@popperjs+core',
			'svelte-popover',
		],
	},
	server: {
		open: '/',
	},
	optimizeDeps: {
		include: ['svelvet'],
	},

	plugins: [
		alias({
			//resolve: ['.js', '.ts', '.svelte'],
			entries: [
				{
					find: 'src',
					replacement: resolve('../../packages/yt-gif/src'),
				},
				{
					find: '$chm',
					replacement: resolve(
						'../../packages/yt-gif/src/chrome_extension'
					),
				},
				{ find: '$static', replacement: 'static' },
				{
					find: '$v2',
					replacement: resolve(
						'../../packages/yt-gif/src/yt-gif/v0.2.0/js'
					),
				},
				{
					find: '$v3',
					replacement: resolve('../../packages/yt-gif/src/v0.3.0'),
				},
				{
					find: '$lib',
					replacement: resolve('../../packages/yt-gif/src/lib'),
				},
			],
		}),

		/* Vitebook Fix: https://github.com/vitebook/vitebook/issues/89
		 *********************************************************************/
		sveltekit(),
	],
}

if (process.env.NODE_ENV === 'production')
	config.resolve.preserveSymlinks = true

export default config
