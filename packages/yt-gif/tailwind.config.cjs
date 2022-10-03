const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				ddm: {
					50: '#f5f5f5',
					100: '#ebebeb',
					200: '#cccccc',
					300: '#adadad',
					400: '#707070',
					500: '#333333',
					600: '#2e2e2e',
					700: '#262626',
					800: '#1f1f1f',
					900: '#191919'
				}
			}
		}
	},
	plugins: []
}

module.exports = config
