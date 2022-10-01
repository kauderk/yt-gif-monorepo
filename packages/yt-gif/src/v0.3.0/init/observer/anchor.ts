import { Anchor_Config, anchorInstanceMap } from '../../lib/types/config'
import { RemovedElementObserver, span } from '$lib/utils'
import { getAnchor_smart } from '../../lib/backend-frontend/get-maps'
import {
	isRendered,
	getUidFromBlock,
	closest_container,
} from '../../lib/dom/elements-yt-gif-parent'
import { links } from '../config/paths'
import { ToggleTooltips, getTooltipFlipObj } from '../dom/flip-tooltip'
import { cssData } from '$v3/init/config/paths'
import { Mutation_cb_raw_rm_cmpts } from '$v3/lib/backend-frontend/mutation'

//#region 3.1 observe anchor components
export function assignFirstAnchorWave({ raw_anchorSel } = cssData) {
	document.queryAllasArr(`.${raw_anchorSel}`).forEach(onRenderedCmpt_cb)
}
export async function onRenderedCmpt_cb(cmpt: Element) {
	if (!isRendered(cmpt)) {
		return
	}

	const anchorWrp = span(['yt-gif-anchor-wrapper'])
	anchorWrp.insertAdjacentHTML('afterbegin', links.html.fetched.anchor)

	//
	const tempUID = getUidFromBlock(cmpt, true)
	if (!tempUID) {
		return
	}

	const componentMap = await getAnchor_smart(tempUID)
	const uid = [...componentMap.values()]?.[0]

	//
	const anchor = anchorWrp.querySelector('.yt-gif-anchor') as El
	const tooltipObj = GetAnchorTooltip(anchor, uid)
	ToggleTooltips(true, tooltipObj)
	cmpt.parentElement?.replaceChild(anchorWrp, cmpt)

	if (uid) {
		closest_container(anchor)?.setAttribute(
			'yt-gif-anchor-container',
			uid as string
		)
	} else {
		anchor.setAttribute('disabled', '')
	}

	RemovedElementObserver({
		el: anchorWrp,
		OnRemovedFromDom_cb: () => anchorInstanceMap.delete(tempUID),
	})
}
function GetAnchorTooltip(anchor: Element, uid: string | Trm_map) {
	const obj = getTooltipFlipObj(anchor)
	return <const>{
		...obj,
		trueVal: obj.falseVal?.replace(Anchor_Config.uidRefRgx, `((${uid}))`),
	}
}
export function SetupAnchorObserver() {
	const anchorObs = new MutationObserver(async mutations =>
		Mutation_cb_raw_rm_cmpts(
			mutations,
			cssData.raw_anchorSel,
			onRenderedCmpt_cb
		)
	)
	anchorObs.observe(document.body, { childList: true, subtree: true })
}
