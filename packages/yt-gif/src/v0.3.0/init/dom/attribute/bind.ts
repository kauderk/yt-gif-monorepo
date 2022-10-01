import { toggleClasses } from '$lib/utils'
import { attrData } from '../../config/paths'
import { cssData } from '$v3/init/config/paths'

/* ************* */
export function FlipBindAttr(
	toggleClasses = [cssData.dropdown__hidden],
	_attrData = attrData
) {
	for (const key in _attrData) {
		const { check, select, main } = Toggle(key, toggleClasses)
		if (!main) {
			console.log('yt-gif debugger')
			continue
		}

		if (main.tagName == 'INPUT') {
			ListenToChange(main, check)
		} else if (main.tagName == 'SELECT') {
			ListenToChange(main, select)
		}
	}
}

function ListenToChange(target: ImyElt, OnCb: () => void) {
	OnCb()
	target.addEventListener('change', OnCb)
	target.addEventListener('customBind', OnCb)
}

function Toggle(key: s, classes: s[]) {
	const main = <ImyElt>document.querySelector(`[data-main='${key}']`)
	const binds = () => document.queryAllasArr(`[data-bind*='${key}']`)

	const check = () =>
		binds().forEach(b => toggleClasses(!main.checked, classes, b))

	const select = () =>
		binds().forEach(b => {
			const { on, not } = GetFlipAttr(b)
			const { equals, any } = GetComparison(main)

			if (on) {
				// showMatch || showIfAny
				toggleClasses(!(equals(on) || any(on)), classes, b)
			} else if (not) {
				// hideMatch || hideIfAny
				toggleClasses(equals(not) || any(not), classes, b)
			}
		})
	return <const>{ check, select, main }
}
function GetFlipAttr(b: Element) {
	const on = b.getAttribute('on')
	const not = b.getAttribute('not')
	return { on, not }
}

function GetComparison(main: ImyElt) {
	const selOpts =
		main.type == 'select-multiple'
			? [...main.selectedOptions].map(o => o.value)
			: [main.value]
	const is = (v: s) => selOpts.includes(v)

	//prettier-ignore
	const equals = (s: s) => s.split(',').map(s => s.trim()).some(v => is(v))
	const any = (v: s) => !is('disabled') && v == 'any'
	return { equals, any }
}

interface ImyElt extends HTMLElement {
	checked: boolean
	type: string
	selectedOptions: HTMLOptionElement[]
	value: string
}
