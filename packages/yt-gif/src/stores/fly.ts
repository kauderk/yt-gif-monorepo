import { derived, get, writable } from 'svelte/store'

export const focusTutorial = writable(false)
export const swap = writable({
	swap: true,
	target: <HTMLElement | null>null,
})
export const tempTarget = writable(<HTMLElement | null>null)

tempTarget.subscribe(target => {
	if (target) {
		console.log(target)
		swap.update(o => ({ ...o, target }))
	}
})
let cashed = ''
export const style = derived(swap, () => {
	if (get(swap).target) {
		return (cashed = getCssTransform())
	}
	return cashed
})

export const getCssTransform = () => {
	const rectTarget = evalRect(get(swap).target!)

	const tnsX = rectTarget.rect.left //rectTarget.rect.left
	const tnsY = rectTarget.rect.top - 4 //rectTarget.rect.top
	const tns = 'transform: translate(' + tnsX + 'px, ' + tnsY + 'px);'
	const width = 'width: ' + rectTarget.rect.width + 'px;'
	const height = 'height: ' + rectTarget.rect.height + 'px;'

	return tns + width + height
}
function evalRect(node: HTMLElement) {
	const tRect = node.getBoundingClientRect()
	//const cRect = current.getBoundingClientRect()
	return {
		cmp: {
			centerX: tRect.left + tRect.width * 0.5,
			centerY: tRect.top + tRect.height * 0.5,
		},
		rect: tRect,
	}
}
