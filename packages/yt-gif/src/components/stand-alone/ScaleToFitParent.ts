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
type cord = 'width' | 'height'
export function ScaleToFitParent(el: HTMLElement, props = Props) {
	function scale() {
		const { sizeRef, scaled } = getElms(el, props)
		let { ratioY, ratioX, padding } = tryGetAspectRatio(sizeRef, scaled)
		const axis = createAxisFunc(sizeRef, scaled, ratioY)

		// prevent
		// "weird" spacing
		sizeRef.style.setProperty('padding', '0px')
		scaled.style.setProperty('margin', '0px')
		// phantom overflow
		sizeRef.style.setProperty('overflow', 'hidden')

		// fit
		scaled.style.setProperty('transform', `scale(${ratioX}, ${ratioY})`)
		scaled.style.setProperty('transform-origin', 'top left')

		// center
		scaled.style.setProperty(
			'translate',
			`${axis('width')}px ${axis('height')}px`
		)

		sizeRef.style.setProperty('padding-top', padding.toString()) // keeps the parent height in ratio to child resize
	}

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
function createAxisFunc(
	sizeRef: HTMLElement,
	scaled: HTMLElement,
	ratioY: number
) {
	return (cor: cord) => {
		const cap = cor.charAt(0).toUpperCase() + cor.slice(1)
		// @ts-ignore
		// prettier-ignore
		const p = sizeRef['client' + cap] / 2, c = (scaled['client' + cap] * ratioY) / 2
		return p - c
	}
}

function tryGetAspectRatio(sizeRef: HTMLElement, scaled: HTMLElement) {
	let ratioX = computed(sizeRef, 'width') / computed(scaled, 'width'),
		ratioY = computed(sizeRef, 'height') / computed(scaled, 'height'),
		sizeRefRatioY =
			computed(sizeRef, 'width') / computed(sizeRef, 'height'),
		padding = computed(scaled, 'height') * 0

	const tempRatio = ratioY - (ratioY - ratioX)
	ratioY = sizeRefRatioY > 0 ? tempRatio : ratioY
	return { ratioY, ratioX, padding }
}

function getElms(el: HTMLElement, props: TProps) {
	const pr = el as HTMLElement,
		ch = el.firstChild as HTMLElement

	const sizeRef = props.sizeReference == 'parent' ? pr : ch,
		scaled = props.sizeReference == 'parent' ? ch : pr
	return { sizeRef, scaled }
}

function computed(el: HTMLElement, k: cord) {
	return Number(window.getComputedStyle(el)[k].replace('px', ''))
}
