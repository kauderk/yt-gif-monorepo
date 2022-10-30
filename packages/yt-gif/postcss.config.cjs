const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
	],
	browsers: ['last 2 versions', 'iOS >= 8', 'Safari >= 8'],
}

module.exports = config
