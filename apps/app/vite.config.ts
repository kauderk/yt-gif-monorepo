import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$cmp: path.resolve('./src/components'),
			$styles: path.resolve('./src/styles'),
			$stores: path.resolve('./src/stores'),
		},
		preserveSymlinks: false,
	},
	build: {
		target: ['es2020'],
		sourcemap: true,
	},
	ssr: {
		noExternal: ['@popperjs/core', 'dayjs', '@popperjs+core'],
	},
	server: {
		open: '/',
		fs: {
			allow: ['.', 'studio'],
		},
	},
})
