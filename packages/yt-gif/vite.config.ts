import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
	ssr: {
		noExternal: [
			'@popperjs/core',
			'dayjs',
			'@popperjs+core',
			'@sveltestack/svelte-query',
			'popper.js',
		],
	},
	optimizeDeps: {
		include: [
			'svelvet',
			'tippy.js',
			'@popperjs/core',
			'@popperjs+core',
			'popper.js',
		],
		esbuildOptions: {
			plugins: [
				esbuildCommonjs([
					'@tiptap/extension-bubble-menu',
					'tippy.js',
					'popper.js',
					'@popperjs/core',
					'@popperjs+core',
				]),
			],
		},
	},
	plugins: [viteCommonjs(), sveltekit()],
	build: {
		target: ['es2020'],
		sourcemap: true,
	},
	resolve: {
		alias: {
			src: resolve('./src'),
			$chm: resolve('src/chrome_extension'),
			$static: resolve('static'),
			$v2: resolve('src/yt-gif/v0.2.0/js'),
			$v3: resolve('src/v0.3.0'),
			$cmp: resolve('src/components'),
			$styles: resolve('src/styles'),
			$stores: resolve('src/stores'),
		},
		preserveSymlinks: false,
	},
	server: {
		open: '/',
		fs: {
			allow: ['.'],
		},
	},
})
