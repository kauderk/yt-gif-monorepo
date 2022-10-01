import { toggleAttribute } from '$lib/utils'
import { getYTUrlObj, hasYTGifAttr, hasYTGifClass } from './filter'
import { ReadyUrlBtns } from '.'

/* ****************** */
export function ToggleUrlBtnObserver(bol: b, obs: MutationObserver) {
	obs.disconnect()

	if (bol) {
		const allUrlBtns_rm = document
			.queryAllasArr<HTMLElement>('.bp3-icon-video')
			.filter(
				// those that do not have yt-gif customization
				b => !hasYTGifAttr(b) && !hasYTGifClass(b) && getYTUrlObj(b).url
			)

		ReadyUrlBtns(allUrlBtns_rm)

		// const ytElms =
		document
			.queryAllasArr<HTMLElement>(
				'.yt-gif-controls :is([formatter],[insertOptions]), [yt-gif-timestamp-emulation]'
			)
			.forEach(el => (el as IBtn)?.tryToAppendUrlBtns?.()) // YIKES! how do you implement an interface?

		obs.observe(document.body, { childList: true, subtree: true })
	} else {
		// const allUrlBtns =
		document
			.queryAllasArr(`.yt-gif-url-btns-wrapper`)
			.forEach(el => el.remove())
		// const allUrlBtns_rm =
		document
			.queryAllasArr('.bp3-icon-video')
			.forEach(el => el.classList.remove('yt-gif'))
	}
}
export function ToggleBtnsWithNoUrl(bol: b) {
	// const noUrlBtns =
	document
		.queryAllasArr('.yt-gif-url-btns-wrapper[no-url]')
		.forEach(wrp => toggleAttribute(!bol, 'style', wrp, 'display: none'))
}
