import { toggleAttribute } from '$lib/utils'
import type { T_tmSetObj } from '../types'

export function ToggleBoundarySet1(
	bol: boolean,
	tmSetObj: T_tmSetObj,
	targetWrapper: QrySearch
) {
	toggleActiveAttr(bol, tmSetObj.self.targetNode)
	if (tmSetObj.pear) {
		toggleActiveAttr(bol, tmSetObj.pear.targetNode)
	}

	toggleAttribute(bol, 'last-active-timestamp', tmSetObj.self.targetNode)
	if (targetWrapper) {
		toggleAttribute(bol, 'yt-active', targetWrapper)
	}

	function toggleActiveAttr(bol: b, el: El) {
		if (el) toggleAttribute(bol, 'active-timestamp', el)
	}
}
