export function ScaleToFitParent(el: HTMLElement) {
	function scale() {
		const computed = (el: HTMLElement, k: any) =>
			Number(window.getComputedStyle(el)[k].replace('px', ''))
		const scaled = el.firstChild as HTMLElement,
			parent = el!,
			ratio = computed(parent, 'height') / computed(scaled, 'height'),
			padding = computed(scaled, 'height') * ratio

		const axis = (cor: 'Width' | 'Height') => {
			// @ts-ignore
			// prettier-ignore
			const p = parent['client' + cor] / 2, c = (scaled['client' + cor] * ratio) / 2
			return p - c
		}

		// prevent
		// "weird" spacing
		parent.style.setProperty('padding', '0px')
		scaled.style.setProperty('margin', '0px')
		// phantom overflow
		parent.style.setProperty('overflow', 'hidden')

		// fit
		scaled.style.setProperty('transform', 'scale(' + ratio + ')')
		scaled.style.setProperty('transform-origin', 'top left')
		// center
		scaled.style.setProperty(
			'translate',
			axis('Width') + 'px ' + axis('Height') + 'px '
		)

		parent.style.setProperty('padding-top', padding.toString()) // keeps the parent height in ratio to child resize
	}
	scale()
	// if the component has images or dynamic elements, compensate for that
	setTimeout(scale, 500)

	parent.addEventListener('resize', scale)

	return {
		destroy() {
			parent.removeEventListener('resize', scale)
		},
	}
}
