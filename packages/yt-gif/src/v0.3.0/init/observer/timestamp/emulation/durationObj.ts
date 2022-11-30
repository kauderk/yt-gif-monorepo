import { YTvideoIDs } from '../../../../lib/types/config'
import { getYouTubeVideoID } from '$lib/utils'
import { tryToGetUrlDuration } from '../../../../lib/backend-frontend/url-duration'
import { isSelected } from '../../../../lib/backend-frontend/option'
import { getMap_smart } from '../../../../lib/backend-frontend/get-maps'
import { UIStore } from '$v3/init/config/UIStore'
import { getWrapperInHierarchyObj } from '../../../../lib/dom/roam'
import type { IArrObj } from '../types'
import { fmtTimestamp } from '$v3/init/timestamp/utils'

export async function durationObj(
	succesfulEmulationMap: Map<string, IArrObj[]>
) {
	// gain some performance
	const obj = { getDuration: () => -1 }

	if (!isSelected(UIStore.get().timestamps.tm_options, 'YT_API_KEY_V3')) {
		return obj
	}

	let wrapperObjs =
		Array<Awaited<ReturnType<typeof getWrapperInHierarchyObj>>>() // ok. this is crazy

	const rawTargets = [...succesfulEmulationMap.values()].map(
		arrs => arrs[0]?.targetNodeParent
	)
	if (rawTargets.length == 0) {
		return obj
	}

	for (const el of rawTargets) {
		const o = await getWrapperInHierarchyObj(el)
		if (!wrapperObjs.find(x => x.id == o.id)) {
			// push if o.id is not in wrapperObjs
			wrapperObjs.push(o)
		}
	}

	const durationMap = new Map<s, n>() // store duration of each grandparent wrapper, if any
	for (const wo of wrapperObjs) {
		const lastUrl = wo.lastWrapper?.getAttribute('data-video-url')
		const videoId = getYouTubeVideoID(lastUrl ?? '') || 'invalid'
		if (durationMap.has(wo.id) && !durationMap.get(wo.id))
			YTvideoIDs.delete(videoId) // it fetched something wrong, clean it and try angain

		// getMap_smart -> avoid making redundant requests from YT API V3
		durationMap.set(
			wo.id,
			await getMap_smart(
				videoId,
				YTvideoIDs,
				tryToGetUrlDuration,
				videoId
			)
		)
	}

	return <const>{
		getDuration(targetBlockID: s) {
			// a grandparent wrapper should have it's duration
			const foundBlockID = wrapperObjs.find(x =>
				x.container?.contains(document.getElementById(targetBlockID))
			)?.id as s
			return durationMap.get(foundBlockID) as n
		},
	}
}
export function GetDuration(duration: number) {
	// if it is anything else but null or undefined, then parse it to secondsOnly
	return duration ?? false ? fmtTimestamp<n>('S')(duration + '') : duration
}
