import preprocess from 'svelte-preprocess'

export default {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		vite: {
			ssr: {
				noExternal: ['@popperjs/core', 'dayjs', '@popperjs+core']
			}
		}
	}
}
