import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	ssr: {
		noExternal: ['@popperjs/core', 'dayjs', '@popperjs+core'],
	},
	optimizeDeps: {
		include: ['svelvet'],
	},
	plugins: [sveltekit()],
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
