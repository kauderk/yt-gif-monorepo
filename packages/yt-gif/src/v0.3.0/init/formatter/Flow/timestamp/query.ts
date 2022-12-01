import { fmtTimestamp } from '../../../timestamp/utils'
import { floatParam } from '../../../../lib/utils'
import { stopEvents } from '../../../../lib/helpers'
import { UIStore } from '$v3/init/config/UIStore'

export type Tfmt_tm = {
	page?: Tpage
	value?: s
	match: s
}
export function StopPropagations(
	urlBtn: (page: Tpage) => IBtn,
	targetNode: El,
	innerWrapperSel = '.yt-gif-url-btns'
) {
	const innerWrapper = targetNode.querySelector(innerWrapperSel) as IBtn
	if (innerWrapper) {
		innerWrapper.onmousedown = stopEvents
	}

	btnNames.map(s => urlBtn(s)).forEach(btn => (btn.onmousedown = stopEvents))
}
export const btnNames: Array<Tpage> = [
	'yt-gif',
	'format',
	'url',
	'start',
	'end',
	'start|end',
]
function getFmtPage(p: s, url: s) {
	return fmtTimestamp(
		UIStore.get().timestamps.tm_workflow_grab.value as keyof Itime
	)(floatParam(p, url) || '0')
} // javascript is crazy!

export function startTm(url: s) {
	return getFmtPage('t|start', url)
}
export function endTm(url: s) {
	return getFmtPage('end', url)
}
