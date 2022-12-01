import { isSelected } from '../../../../lib/backend-frontend/option'
import { closest_anchor_container } from '../../../../lib/dom/elements-yt-gif-parent'
import { UIStore } from '$v3/init/config/UIStore'
import { _getYTwrapperRootObj, getYTwrapperRootObj } from '../query'
import type { IClickInput } from '../types'

export async function getRelevantWrapperObjFunc1(
	tEl: IBtn,
	{ tmSetObj, uid }: IClickInput
) {
	const yuid = (el: QrySearch) => el?.getAttribute('yt-gif-anchor-container')
	const buid = (el: QrySearch) => el?.getAttribute('yt-gif-block-uid')

	let anchorUid
	if (isSelected(UIStore.get().timestamps.tm_options, 'anchor'))
		anchorUid =
			buid(tEl?.closest('[yt-gif-block-uid]')) ||
			yuid(closest_anchor_container(tmSetObj.self.targetNode))

	const m_uid = anchorUid || uid
	const getWrapperObj =
		m_uid != uid ? _getYTwrapperRootObj : getYTwrapperRootObj

	return getWrapperObj(m_uid, tEl)
}
export function getClicks1(which: number) {
	return <const>{
		left: which == 1,
		right: which == 3,
		middle: which == 2,
	}
}
