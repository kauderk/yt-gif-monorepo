const config = {
	mode: 'jit',
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		gradientColorStops: theme => ({
			...theme('colors'),
			primary: '#3490dc',
			secondary: '#ffed4a',
			danger: '#e3342f',
			pink: '#d53369',
			yellow: '#daae51',
		}),
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
					900: '#191919',
				},
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		darkTheme: 'black',
		logs: false,
	},
}

module.exports = config
