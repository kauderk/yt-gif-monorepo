/// <reference types="histoire" />

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { join, resolve } from 'path'
import { readFileSync } from 'fs'
import { cwd } from 'process'
import alias from '@rollup/plugin-alias'

export default defineConfig({
	build: {
		target: ['es2020'],
	},
	resolve: {
		preserveSymlinks: false,
		build: {
			sourcemap: true,
		},
	},
	plugins: [
		svelte(),
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
					find: '$lib',
					replacement: resolve('../../packages/yt-gif/src/lib'),
				},
			],
		}),
	],
	histoire: {
		// Histoire config can also go here
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
						replacement: resolve(
							'../../packages/yt-gif/src/v0.3.0'
						),
					},
					{
						find: '$lib',
						replacement: resolve('../../packages/yt-gif/src/lib'),
					},
				],
			}),
		],
	},
})
