import { sveltekit } from '@sveltejs/kit/vite'
import { join } from 'path'
import { readFileSync } from 'fs'
import { cwd } from 'process'
import alias from '@rollup/plugin-alias'

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')))

/** @type {import('vite').UserConfig} */
const config = {
	build: {
		target: ['es2020']
	},
	resolve: {
		preserveSymlinks: false,
		build: {
			sourcemap: true
		}
	},
	ssr: {
		noExternal: [
			...Object.keys(pkg.dependencies || {}),
			'@popperjs/core',
			'dayjs',
			'@popperjs+core'
		]
	},
	server: {
		open: '/'
	},

	plugins: [
		alias({
			//resolve: ['.js', '.ts', '.svelte'],
			entries: [
				{ find: 'src', replacement: '../../packages/yt-gif/src' },
				{ find: '$chm', replacement: '../../packages/yt-gif/src/chrome_extension' },
				{ find: '$static', replacement: 'static' },
				{ find: '$v2', replacement: '../../packages/yt-gif/src/yt-gif/v0.2.0/js' },
				{ find: '$v3', replacement: '../../packages/yt-gif/src/v0.3.0' },
				{ find: '$lib', replacement: '../../packages/yt-gif/src/lib' }
			]
		}),

		/* Vitebook Fix: https://github.com/vitebook/vitebook/issues/89
		 *********************************************************************/
		!process.env.VITEBOOK && sveltekit()
	]
}

if (process.env.NODE_ENV === 'production') config.resolve.preserveSymlinks = true

export default config
