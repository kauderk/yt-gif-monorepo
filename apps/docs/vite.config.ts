import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import path, { join } from 'path';
import { readFileSync } from 'fs';
import { cwd } from 'process';

// @ts-ignore
const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')));

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$components: path.resolve('./src/components')
		},
		preserveSymlinks: false
	},
	build: {
		target: ['es2020'],
		sourcemap: true
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
		open: '/',
		fs: {
			allow: ['.']
		}
	}
});
