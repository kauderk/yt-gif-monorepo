import { defineConfig } from 'vite'
import { resolve } from 'path'

const path = 'roamresearch'
const mode: 'prod' | 'dev' = 'dev'
const min = mode.includes('prod')
const name = 'yt-gif-app'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: './src/v0.3.0/index.ts',
			formats: ['umd'],
			name,
			fileName: _ => `${path}/${mode}/${name}.js`,
		},
		target: ['es2020'],
		emptyOutDir: false, // don't erase previous /dev or /prod content
		cssCodeSplit: true,
		//
		// generate compact builds if dev mode
		minify: min ? 'terser' : false,
		manifest: !min,
		sourcemap: !min,
		//
		// output a consistent naming conventions
		// nested under the folder mode
		// index.js | style.css
		rollupOptions: {
			output: {
				assetFileNames: ({ name: pre }) => {
					if (/\.css$/.test(pre ?? '')) {
						const file =
							pre == 'style.css'
								? `${name}.css`
								: '[name].[extname]'
						return `${path}/${mode}/${file}`
					}
					// ref: https://github.com/vitejs/vite/discussions/5303
					return `${path}/${mode}/[name].[extname]`
				},
			},
		},
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
			$lib: resolve('src/lib'),
		},
		preserveSymlinks: false,
	},
})
