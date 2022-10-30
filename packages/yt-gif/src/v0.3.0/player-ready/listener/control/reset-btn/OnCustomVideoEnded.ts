import { closest_anchor_container } from '$v3/lib/dom/elements-yt-gif-parent'
import { DeactivateTimestampsInHierarchy } from '$v3/init/timestamp/hierarchy'
import { TryReloadVideo } from '$v3/lib/event/TryReloadVideo'
import { awaitingAtrr } from '$v3/lib/dom/attr'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import type { TQueryResult } from '$v3/player-ready/setup/GetQuery'
import type { TQueryElements } from '$v3/player-ready/setup/GetElements'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'
import type { TTimeTargetObj } from '$v3/player-ready/listener/control/time/ClearTimers'
import type { ILocal } from '$v3/player-ready/lib/TStat'

//#region 6. reload boundaries
export function GetFuncResetBoundaries(
	t: YT_TargetWrapper,
	q: TQueryResult,
	l: TQueryElements,
	map: IExtendedVideoParams,
	time: TTimeTargetObj,
	local: ILocal
) {
	return async function (evt: TResetYTEvent | null) {
		const tEl = (evt?.currentTarget as Element) ?? l.resetBtn
		const awaiting = (bol: b) => awaitingAtrr(bol, tEl)

		if (tEl.hasAttribute('awaiting')) return

		q.timeDisplay.visible(true)
		awaiting(true)

		DeactivateTimestampsInHierarchy(closest_anchor_container(tEl), l.parent)
		await TryReloadVideo({
			t,
			start: map.start.default,
			end: map.end.default,
		})
		q.seekToUpdatedTime(map.start.default ?? 0)

		time.UpdateTimeDisplay()
		awaiting(false)

		if (evt?.message != 'update-timestamp') {
			return q.timeDisplay.visible(false)
		}

		// update/visible until any interaction
		time.UpdateTimeDisplay()
		t.ytgif.timerID = window.setInterval(
			() => time.UpdateTimeDisplay(),
			local.update.tickOffset
		)
		t.ytgif.timers.push(t.ytgif.timerID)

		l.timeDisplay.onmousemove = stopUpdateDisplayOnce
	}
	function stopUpdateDisplayOnce(e: Event) {
		e.stopPropagation()
		e.preventDefault()
		q.timeDisplay.visible(false)
		;(e.currentTarget as HTMLElement).onmousemove = null
	}
}
