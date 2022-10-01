import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import typescript from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias'
import preprocess from 'svelte-preprocess'
import scss from 'rollup-plugin-scss'
import postcss from 'rollup-plugin-postcss'

const production = !process.env.ROLLUP_WATCH
const name = 'Graph'

export default {
	external: ['moment'],
	input: `src/svelte/App.svelte`,
	output: {
		//sourcemap: true,
		format: 'umd',
		name: `${name}`,
		inlineDynamicImports: true,
		dir: 'dist',
		entryFileNames: `${name}.js`,
	},
	plugins: [
		alias({
			//resolve: ['.js', '.ts', '.svelte'],
			entries: [
				{ find: 'src', replacement: 'src' },
				{ find: '$chm', replacement: 'src/chrome_extension' },
				{ find: '$static', replacement: 'static' },
				{ find: '$v2', replacement: 'src/yt-gif/v0.2.0/js' },
				{ find: '$v3', replacement: 'src/v0.3.0' },
				{ find: '$lib', replacement: 'src/lib' },
			],
		}),
		svelte({
			preprocess: preprocess({
				postcss: true,
				sass: true,
				scss: true,
			}),
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: `${name}.css` }),
		postcss({ extract: `${name}.post.css` }),
		scss({ output: `${name}.s.css` }),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),
		typescript(),
	],
	watch: {
		clearScreen: false,
	},
}
