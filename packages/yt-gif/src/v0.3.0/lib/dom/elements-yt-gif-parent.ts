import { properBlockIDSufix } from '../utils'
import { isSelected } from '../backend-frontend/option'
import { attrInfo } from '../../init/config/paths'
import { UIStore } from '$v3/init/config/UIStore'

export { properBlockIDSufix }
export function toggleAttribute(
	bol: boolean,
	class_: string,
	el: HTMLElement,
	value = ''
) {
	if (bol) {
		el.setAttribute(class_, value)
	} else {
		el.removeAttribute(class_)
	}
}
export function toggleClasses(
	bol: boolean,
	classNames: string[],
	el: HTMLElement
) {
	if (bol) el.classList.add(...classNames)
	else el.classList.remove(...classNames)
}
export function closestBlock(el: QrySearch) {
	return el ? el.closest('.rm-block__input') : null
}
export function isRendered(el: QrySearch) {
	return document.body.contains(el!)
}
export function getUidFromBlock(el: QrySearch, closest = false) {
	let block = el
	if (closest) block = closestBlock(el) as Element
	return block?.id?.slice(-9) as s
}
export function closest_container_request(el?: Element) {
	if (isSelected(UIStore.get().timestamps.tm_options, 'anchor'))
		return closest_anchor_container(el!)
	else return closest_container(el!)
}
export function closest_anchor_container(el: QrySearch) {
	const anc = (el: QrySearch) =>
		el?.closest('[yt-gif-anchor-container]') ?? null

	const yuid = (el: QrySearch) => el?.getAttribute('yt-gif-anchor-container')

	const buid = (el: QrySearch) => el?.getAttribute('yt-gif-block-uid')

	const rm = closest_container(el) as Element
	const yt = anc(el)

	if (buid(rm) == yuid(anc(rm))) return anc(rm)
	return rm || yt
}
export function closest_container(el: QrySearch) {
	return el?.closest('.roam-block-container') ?? null
}
export function closestYTGIFparentID(el: QrySearch) {
	return (closestBlock(el) || el?.closest('.dwn-yt-gif-player-container'))
		?.id as s
}
export function getWrapperUrlSufix(wrapper: QrySearch, uid = '') {
	const url = wrapper?.getAttribute(attrInfo.url.path)
	const urlIndex = wrapper?.getAttribute(attrInfo.url.index)
	const urlSufix = properBlockIDSufix(url!, urlIndex!)
	return uid + urlSufix
}
export function closest_attr(el: Element, attr: string) {
	const found = el?.closest(`[${attr}]`)
	return <const>{ found, value: found?.getAttribute(attr) }
}
