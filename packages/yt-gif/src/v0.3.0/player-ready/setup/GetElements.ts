import {
	closestYTGIFparentID,
	getWrapperUrlSufix,
} from '$v3/lib/dom/elements-yt-gif-parent'
import { cssData } from '$v3/init/config/paths'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'

export function GetElementsObj(key: string, t: YT_TargetWrapper) {
	const iframe = (document.getElementById(key) as IFR) || t.getIframe()
	const parent = getParent(iframe)!
	// const timeDisplay = parent.querySelector(
	// 	'div.' + cssData.yt_gif_timestamp
	// ) as HTMLElement
	// const timeDisplayStart = timeDisplay.querySelector(
	// 	'.yt-gif-timestamp-start'
	// )!
	// const timeDisplayEnd = timeDisplay.querySelector('.yt-gif-timestamp-end')!
	// const resetBtn = parent.querySelector(
	// 	'[yt-gif-url-btn="reset"]'
	// ) as HTMLResetBtn
	const withEventListeners = [
		parent,
		parent.parentNode as El,
		//timeDisplay,
		iframe,
	] // ready to be cleaned

	return <const>{
		blockID: getBlockID(iframe),
		iframe,
		parent,
		withEventListeners,
		// timeDisplay,
		// resetBtn,
		// timeDisplayStart,
		// timeDisplayEnd,
	}
}
export type TQueryElements = ReturnType<typeof GetElementsObj>
export function getBlockID(iframe: IFR) {
	return closestYTGIFparentID(iframe) + getWrapperUrlSufix(getParent(iframe)!)
}
export function getParent(i: Element) {
	return i.closest('.' + cssData.yt_gif_wrapper) || i.parentElement
}
