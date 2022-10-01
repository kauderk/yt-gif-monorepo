// https://stackblitz.com/edit/angular-3ph3on?file=src%2Fapp%2Fapp.component.ts
import tinycolor from 'tinycolor2'
import Color from 'color'

export interface TC {
	name: string
	hex: string
	darkContrast: boolean
}

export function saveCssShadeStyleVariables(c: s, s: s, opposite: s) {
	for (const { value, name } of computeColors(c, opposite)) {
		document.documentElement.style.setProperty(`${s}${name}`, value)
	}
}
// @ts-ignore
window.colors = saveCssShadeStyleVariables

// https://gist.github.com/jedfoster/7939513
const mix = function (color_1: s, color_2: s, weight: n) {
	function d2h(d: n) {
		return d.toString(16)
	} // convert a decimal value to hex
	function h2d(h: s) {
		return parseInt(h, 16)
	} // convert a hex value to decimal

	weight = typeof weight !== 'undefined' ? weight : 50 // set the weight to 50%, if that argument is omitted

	let color = '#'

	for (let i = 0; i <= 5; i += 2) {
		// loop through each of the 3 hex pairs—red, green, and blue
		let v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
			v2 = h2d(color_2.substr(i, 2)),
			// combine the current pairs from each source color, according to the specified weight
			val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)))

		while (val.length < 2) {
			val = '0' + val
		} // prepend a '0' if val results in a single digit

		color += val // concatenate val to our new color string
	}

	return color // PROFIT!
}

function multiply(rgb1: n[], rgb2: n[]) {
	var result = [],
		i = 0
	for (; i < rgb1.length; i++) {
		result.push(Math.floor((rgb1[i] * rgb2[i]) / 255))
	}
	return result
}
function computeColors(c: string, opposite: string) {
	const rgb = Color(c).rgb().array()

	const color = Color(c).hex().substring(1)
	const light = opposite.substring(1)
	const dark = Color(multiply(rgb, rgb)).hex().substring(1)

	document.documentElement.style.setProperty(`--ddm-theme`, light)

	return [
		_(mix(light, color, 89), '50'),
		_(mix(light, color, 71), '100'),
		_(mix(light, color, 50), '200'),
		_(mix(light, color, 30), '300'),
		_(mix(light, color, 16), '400'),
		_(mix(light, color, 0), '500'),
		_(mix(dark, color, 13), '600'),
		_(mix(dark, color, 30), '700'),
		_(mix(dark, color, 46), '800'),
		_(mix(dark, color, 75), '900'),
		// A100: lighten(saturate(mix(dark, color, 15%), 80%), 45.6%),
		// A200: lighten(saturate(mix(dark, color, 15%), 80%), 35.6%),
		// A400: lighten(saturate(mix(dark, color, 15%), 100%), 25.6%),
		// A700: lighten(saturate(mix(dark, color, 15%), 100%), 20.5%),
		//
		// _(tinycolor(color).lighten(52), '50'),
		// _(tinycolor(color).lighten(37), '100'),
		// _(tinycolor(color).lighten(26), '200'),
		// _(tinycolor(color).lighten(12), '300'),
		// _(tinycolor(color).lighten(6), '400'),
		// _(tinycolor(color), '500'),
		// _(tinycolor(color).darken(6), '600'),
		// _(tinycolor(color).darken(12), '700'),
		// _(tinycolor(color).darken(18), '800'),
		// _(tinycolor(color).darken(24), '900'),
		_(tinycolor(c).lighten(50).saturate(30), 'A100'),
		_(tinycolor(c).lighten(30).saturate(30), 'A200'),
		_(tinycolor(c).lighten(10).saturate(15), 'A400'),
		_(tinycolor(c).lighten(5).saturate(5), 'A700'),
	]
}

function _(value: unknown, name: s) {
	return {
		value: <s>value,
		name,
	}
}
