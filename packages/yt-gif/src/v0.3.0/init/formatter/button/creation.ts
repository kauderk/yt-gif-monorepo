import { isRendered } from '../../../lib/dom/elements-yt-gif-parent'
import { div, toggleClasses } from '$lib/utils'
import { links } from '../../config/paths'

/* ***************** */

export function GetConfirmBtns(btnNames: s[], urlBtn: Function) {
	// TODO : how do you know which ppts are being used before hand?
	return () =>
		btnNames
			.map(s => urlBtn(s))
			.forEach(btn => {
				const p: HTMLElement =
					btn?.closest('.btn-row') ||
					btn?.closest('.yt-gif-url-btn-wrapper')
				if (p && !btn.onclick) p.style.display = 'none'
			})
}
export function GetUrlBtn<type>(el: El, sel: s) {
	return (page: type) =>
		el.querySelector(`${sel} [yt-gif-url-btn="${page}"]`) as IBtn
}
export function appendVerticalUrlBtns(targetNode: El, kind = 'formatter') {
	const urlBtns = appendlUrlBtns(targetNode, kind) as El
	toggleClasses(true, ['vertical'], urlBtns)
}
export function appendlUrlBtns(targetNode: El, kind = 'formatter') {
	const c = 'yt-gif-url-btns-wrapper'
	const el = targetNode.querySelector(`[${kind}]`) ?? div([c])

	// hardcoded for now
	const dir = kind == 'formatter' ? 'urlBtn' : 'insertOptions'

	if (!el.querySelector('.yt-gif-url-btns'))
		el.insertAdjacentHTML('afterbegin', links.html.fetched[dir])
	if (!isRendered(el)) targetNode.insertAdjacentElement('afterbegin', el)

	toggleClasses(true, [c], el)
	return targetNode.querySelector('.yt-gif-url-btns')
}
