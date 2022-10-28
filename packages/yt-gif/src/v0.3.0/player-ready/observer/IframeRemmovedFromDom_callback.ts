import {
	closestYTGIFparentID,
	getWrapperUrlSufix,
	isRendered,
} from '$v3/lib/dom/elements-yt-gif-parent'
import { attrInfo } from '$v3/init/config/paths'
import {
	allVideoParameters,
	recordedIDs,
	lastBlockIDParameters,
	videoParams,
} from '$v3/lib/types/config'
import { Clone, div, RemoveElsEventListeners } from '$lib/utils'
import { isBlockRef } from '$lib/utils-roam-alpha-api'
import { ifBuffer_ShiftOldest } from '$v3/init/observer/performance'
import type {
	TVideoParams,
	IExtendedVideoParams,
} from '$v3/lib/types/video-types'
import type { IFlipIterator } from '../listener/toggle'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import type { TQueryResult } from '$v3/player-ready/setup/GetQuery'
import { getParent } from '$v3/player-ready/setup/GetElements'
import type { ILocal } from '$v3/player-ready/lib/TStat'
import type { TQueryElements } from '$v3/player-ready/setup/GetElements'
import { SrrGlobal } from '$lib/global/SrrGlobal'

//#region 8. on destroyed - clean up and ready next session
export function GetOnIframeRemovedFromDom(
	flipIterator: IFlipIterator,
	t: YT_TargetWrapper,
	q: TQueryResult,
	map: IExtendedVideoParams,
	entry: ILocal['entry'],
	elements: TQueryElements
) {
	return async () => {
		const { iframe, parent } = elements
		const { blockID, blcokID_prfx, volume, canBeCleanedByBuffer, key } =
			entry

		// expensive for sure 🙋
		RemoveElsEventListeners(elements.withEventListeners)
		flipIterator.next(false)

		// Update Next Session Values
		const session = lastBlockIDParameters.get(blockID) ?? videoParams
		const media: TVideoParams = Clone(session)
		media.src.set(getWrapperUrlSufix(parent))
		media.id.set(map.id.value)
		media.updateTime.set(q.isBounded(q.tick()) ? q.tick() : map.start.value)
		media.volume.update = t.getVolume() ?? map.volume.update

		if (media.timestamps.history.length == 0) {
			// kinda spaghetti, but it's super necessary - This will not ignore the first block editing - stack change
			media.timestamps.history.push(map.start.value)
		}
		if (media.volume.history.length == 0) {
			media.volume.history.push(volume)
		}

		// clean... video maps
		t.ytgif.ClearTimers()
		recordedIDs.delete(blockID)
		allVideoParameters.delete(key)

		const prefix = closestYTGIFparentID(iframe) ?? blcokID_prfx
		const suffix = parent.getAttribute(attrInfo.url.index) as s
		// remove useless previous entries
		for (const key of lastBlockIDParameters.keys()) {
			const remove = () => lastBlockIDParameters.delete(key)
			const isYTgif =
				key?.endsWith(suffix) && key?.includes(media.id.value)
			const isBlock = key.startsWith(prefix)

			if (isYTgif && isBlock) {
				remove()
				continue
			}
			if (!isYTgif) {
				continue
			}

			// i'm trying to avoid the await func
			const wasDeletedExternally =
				canBeCleanedByBuffer && (await isBlockRef(prefix.slice(-9)))

			if (wasDeletedExternally) {
				console.log('yt-gif debugger')
				remove()
			}
		}
		// yet add latest params
		if (blockID != null) {
			lastBlockIDParameters.set(blockID, media)
		}

		if (canBeCleanedByBuffer) {
			ifBuffer_ShiftOldest()
		}

		// either save the target
		const targetExist = document.querySelector('#' + key) == iframe
		if (targetExist) {
			return console.log(
				`${key} is displaced, not removed, thus is not destroyed.`
			)
		}

		setTimeout(() => {
			if (targetExist) {
				return
			}

			t.DestroyTarget()

			// roam research displaces blocks and the YT player api doesn't catch up...
			const TRY = TryToGetPreviousParent(key)
			if (!TRY) {
				return
			}

			const { previousParent, observerTarget } = TRY
			previousParent.parentNode?.replaceChild(
				observerTarget,
				previousParent
			)
		}, 1000)
	}
}
function TryToGetPreviousParent(key: string) {
	const previousIframe = document.querySelector('#' + key)!
	if (!isRendered(previousIframe)) {
		return null
	}

	const previousParent = getParent(previousIframe)!
	if (!isRendered(previousParent)) {
		return null
	}

	const observerTarget = div([
		SrrGlobal.AvoidCircularDependency.getCurrentClassesToObserver()[0],
	])
	return <const>{ previousParent, observerTarget }
}
