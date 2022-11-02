import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'
import alias from '@rollup/plugin-alias'

export default defineConfig({
	ssr: {
		noExternal: ['@popperjs/core', 'dayjs', '@popperjs+core'],
	},
	optimizeDeps: {
		include: ['svelvet'],
	},

	resolve: {
		alias: {
			'@lib': resolve('./src/lib'),
			'@cmp': resolve('./src/components'),
			'@styles': resolve('./src/styles'),
			'@stores': resolve('./src/stores'),
		},
		preserveSymlinks: false,
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
					find: '$cmp',
					replacement: resolve(
						'../../packages/yt-gif/src/components'
					),
				},
				{
					find: '$styles',
					replacement: resolve('../../packages/yt-gif/src/styles'),
				},
				{
					find: '$stores',
					replacement: resolve('../../packages/yt-gif/src/stores'),
				},
				{
					// this will be overwritten by sveltekit :D
					find: '$lib',
					replacement: resolve('../../packages/yt-gif/src/lib'),
				},
			],
		}),
		sveltekit(),
	],
	server: {
		fs: {
			allow: ['static', '../node_modules'],
		},
	},
})
