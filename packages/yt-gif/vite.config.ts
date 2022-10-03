import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			input: 'src/svelte/main.ts',
			output: {
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`
			}
		}
	},
	ssr: {
		noExternal: ['@popperjs/core', 'dayjs', '@popperjs+core']
	},
	optimizeDeps: {
		include: ['svelvet']
	},
	plugins: [
		svelte({
			//compilerOptions: { customElement: true },
			preprocess: preprocess({
				postcss: true
			})
		})
	],
	root: 'src/svelte',
	resolve: {
		alias: {
			src: resolve('./src'),
			$chm: resolve('src/chrome_extension'),
			$static: resolve('static'),
			$v2: resolve('src/yt-gif/v0.2.0/js'),
			$v3: resolve('src/v0.3.0'),
			$lib: resolve('src/lib')
		}
	}
})
