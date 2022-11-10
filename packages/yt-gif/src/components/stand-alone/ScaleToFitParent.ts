interface TProps {
	/**
	 * Event at cero, the next micro task seems to do a good job to repaint the element.
	 * OR. If the component has images or dynamic elements, compensate for that
	 */
	timeoutRepaint?: number
	sizeReference: 'parent' | 'first-child'
}
const Props: TProps = {
	timeoutRepaint: 0,
	sizeReference: 'parent',
}
export function ScaleToFitParent(el: HTMLElement, props = Props) {
	function scale() {
		const computed = (el: HTMLElement, k: any) =>
			Number(window.getComputedStyle(el)[k].replace('px', ''))

		const pr = el as HTMLElement,
			ch = el.firstChild as HTMLElement

		const sizeRef = props.sizeReference == 'parent' ? pr : ch,
			scaled = props.sizeReference == 'parent' ? ch : pr

		const ratio = computed(sizeRef, 'height') / computed(scaled, 'height'),
			padding = computed(scaled, 'height') * ratio

		const axis = (cor: 'Width' | 'Height') => {
			// @ts-ignore
			// prettier-ignore
			const p = sizeRef['client' + cor] / 2, c = (scaled['client' + cor] * ratio) / 2
			return p - c
		}

		// prevent
		// "weird" spacing
		sizeRef.style.setProperty('padding', '0px')
		scaled.style.setProperty('margin', '0px')
		// phantom overflow
		sizeRef.style.setProperty('overflow', 'hidden')

		// fit
		scaled.style.setProperty('transform', 'scale(' + ratio + ')')
		scaled.style.setProperty('transform-origin', 'top left')
		// center
		scaled.style.setProperty(
			'translate',
			axis('Width') + 'px ' + axis('Height') + 'px '
		)

		sizeRef.style.setProperty('padding-top', padding.toString()) // keeps the parent height in ratio to child resize
	}
	scale()

	if (props.timeoutRepaint !== undefined) {
		setTimeout(scale, props.timeoutRepaint)
	}

	const refresh = (e: KeyboardEvent) => e.altKey && e.key == 'r' && scale()
	window.addEventListener('keydown', refresh)
	parent.addEventListener('resize', scale)

	return {
		destroy() {
			parent.removeEventListener('resize', scale)
			window.removeEventListener('keydown', refresh)
		},
	}
}
