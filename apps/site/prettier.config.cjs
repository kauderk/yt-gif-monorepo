const config = {
	useTabs: true,
	tabWidth: 4,
	semi: false,
	singleQuote: true,
	trailingComma: 'none',
	arrowParens: 'avoid',
	printWidth: 100,

	// brace_style: 'collapse,preserve-inline',
	// svelteBracketNewLine: false,
	astroAllowShorthand: false,
	plugins: [require.resolve('prettier-plugin-astro')],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro'
			}
		}
	]
}

console.log(config)

module.exports = config
