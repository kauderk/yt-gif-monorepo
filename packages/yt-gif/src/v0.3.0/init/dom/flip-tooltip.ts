import { isTrue, toggleAttribute, toggleClasses } from '$lib/utils'

//#region flip icons and tooltip helpers
export function getIconFlipObj(el: Element) {
	const falseVal = Array.from(el.classList)
		?.reverse()
		.find(c => c.includes('bp3-icon-'))!
	const trueVal = 'bp3-icon-' + el.getAttribute('flip-icon')
	return <const>{ falseVal, trueVal, el }
}
export function getTooltipFlipObj(el: Element) {
	const trueVal = el.getAttribute('flip-tooltip') as s
	const falseVal = el.getAttribute('data-tooltip') as s
	return <const>{ falseVal, trueVal, el }
}
type IToggle = {
	falseVal: string
	trueVal: string
	el: Element
}
export function ToggleIcons(bol: boolean, { falseVal, trueVal, el }: IToggle) {
	bol = isTrue(bol)
	toggleClasses(false, [trueVal, falseVal], el)
	toggleClasses(true, [bol ? trueVal : falseVal], el)
	return bol
}
export function ToggleTooltips(
	bol: boolean,
	{ falseVal, trueVal, el }: IToggle
) {
	bol = isTrue(bol)
	toggleAttribute(true, 'data-tooltip', el, bol ? trueVal : falseVal)
	return bol
}
