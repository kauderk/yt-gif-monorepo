import {
	closestBlock,
	isRendered,
	closestYTGIFparentID,
	getWrapperUrlSufix,
} from './elements-yt-gif-parent'
import { ElementsPerBlock } from './ytgif'
import { sleep } from '$lib/utils'

/* ***************** */
export function getBlockID(wrapper: QrySearch) {
	if (!wrapper) return null
	return closestYTGIFparentID(wrapper) + getWrapperUrlSufix(wrapper)
}
export function getCurrentInputBlock() {
	return document.querySelector(
		'.rm-block__input--active.rm-block-text'
	) as HTMLInputElement
}
type T_ObjInHierarchy = {
	lastWrapper: QrySearch
	container: QrySearch
	block: QrySearch
	id: s
	originalId: StrSearch
	ok: b
}
export async function getWrapperInHierarchyObj(
	pointOfReferenceElm: El
): Promise<T_ObjInHierarchy> {
	type QryS = QrySearch | undefined

	let el = closestBlock(pointOfReferenceElm)
	const originalId = el?.id

	while (el?.contains?.(pointOfReferenceElm)) {
		el = el.parentElement

		if (classIs(el?.parentElement, 'roam-app')) return GetFailObj() // if you get to the top of the DOM, stop

		let wrapper = getWrapper()
		if (!wrapper) {
			if (!classIs(el, 'roam-block-container')) {
				continue // F
			}
		}

		// await if the RAW wrapper exists
		while (
			isRendered(wrapper) &&
			!wrapper?.hasAttribute('invalid-yt-gif') &&
			classIs(wrapper, 'rm-xparser-default-yt-gif')
		) {
			await sleep(10)
		}

		wrapper = getWrapper() // get the wrapper again, in case it was rendered

		const block = closestBlock(wrapper)
		const lastWrapper = ElementsPerBlock(block, '.yt-gif-wrapper').pop()

		if (lastWrapper)
			// gotem!
			return <const>{
				lastWrapper,
				container: el,
				block,
				id: block?.id as s,
				originalId,
				ok: true,
			}
	}
	return GetFailObj()

	function classIs(x: QryS, cs: s) {
		return x ? x.classList.contains(cs) : false
	}
	function hasSel(x: QryS, sel: s) {
		return x ? x.querySelector(sel) : null
	}
	function GetFailObj() {
		return <T_ObjInHierarchy>{ ok: false }
	}
	function getWrapper() {
		return (
			hasSel(el?.firstElementChild, '.yt-gif-wrapper') ?? // wrapper!
			hasSel(el?.firstElementChild, '.rm-xparser-default-yt-gif') // RAW wrapper
		)
	}
}
