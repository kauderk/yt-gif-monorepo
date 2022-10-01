import { allVideoParameters } from '$v3/lib/types/config'
import type { YT_TargetWrapper, T_YT_RECORD } from '$v3/lib/types/yt-types'
import type { TQueryResult } from './GetQuery'

export function TrySetupRecordID(
	recording: T_YT_RECORD | undefined,
	t: YT_TargetWrapper,
	q: TQueryResult
) {
	if (!recording) {
		return
	}
	recording.wTarget = t
	recording.sameBoundaries = function (tg = t) {
		if (!tg) return false

		const key = tg.GetIframeID()
		const { start: startM, end: endM } = allVideoParameters.get(key)!
		const { start, end } = tg.GetVars()

		return startM.value == start && endM.value == end
	}
	recording.seekToUpdatedTime = q.seekToUpdatedTime
	recording.isSoundingFine = q.isSoundingFine
	recording.togglePlay = q.togglePlay
	recording.bounded = function (sec: number) {
		const d = t.getDuration() ?? 0
		return sec >= 0 && sec <= d
	}
}
