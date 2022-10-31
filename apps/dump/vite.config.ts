import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$cmp: resolve('./src/components'),
			$styles: resolve('./src/styles'),
			$stores: resolve('./src/stores'),
		},
		preserveSymlinks: false,
	},
	server: {
		fs: {
			allow: ['static', '../node_modules'],
		},
	},
})
