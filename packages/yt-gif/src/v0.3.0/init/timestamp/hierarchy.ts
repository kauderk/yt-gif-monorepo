import {
	closest_container_request,
	closest_anchor_container,
} from '../../lib/dom/elements-yt-gif-parent'
import { toggleAttribute } from '$lib/utils'
import { YTvideoIDs } from '../../lib/types/config'
import type { YT_TargetWrapper } from '../../lib/types/yt-types'

export function DeactivateTimestampsInHierarchy(
	rm_container: QrySearch,
	targetWrapper: QrySearch
) {
	if (!rm_container) return
	const sel = '[yt-gif-timestamp-emulation]'
	const all = TimestampsInHierarchy(rm_container, targetWrapper, sel)
	all.forEach(el => {
		toggleAttribute(false, 'active-timestamp', el)
		toggleAttribute(false, 'last-active-timestamp', el)
	})
}
export function TimestampsInHierarchy<T extends IBtn>(
	rm_container: Element,
	targetWrapper: QrySearch,
	allSelector: string
) {
	const badSets = rm_container
		.queryAllasArr('.yt-gif-wrapper')
		.filter(w => w != targetWrapper)
		.map(w => closest_container_request(w)?.queryAllasArr(allSelector))
		.flat(Infinity)

	const actives = Array.from(
		rm_container.querySelectorAll(allSelector)
	).filter(tm => !badSets.includes(tm))

	return actives as T[]
}
export function ValidateHierarchyTimestamps(
	wrapper: Element,
	t: YT_TargetWrapper
) {
	const videoId = t.GetVideoID()
	YTvideoIDs.set(videoId, t.getDuration?.())

	const d = YTvideoIDs.get(videoId)
	const rm_container = closest_anchor_container(wrapper)

	if (rm_container && typeof d == 'number')
		TimestampsInHierarchy<IBtnArrObj>(
			rm_container,
			wrapper,
			'[yt-gif-timestamp-emulation]'
		).forEach(tm => tm.validateSelf?.(d))
}
