import { svelteConfig } from '@packages/config'

const config = {
	onwarn: (warning, handler) => {
		const { code } = warning
		// I want to use "tree shaking" but @import is for global styles
		// and @use might be bad for performance but is the best I can do
		if (code === 'css-unused-selector' || code.startsWith('a11y-')) {
			return
		}
		handler(warning)
	},
	...svelteConfig,
}

export default config
