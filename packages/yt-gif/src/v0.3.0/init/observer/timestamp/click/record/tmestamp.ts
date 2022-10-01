import { lastBlockIDParameters } from '../../../../../lib/types/config'
import { HMSToSecondsOnly } from '$lib/utils'
import type { T_tmSetObj } from '../../types'
import type { T_YT_RECORD } from '$v3/lib/types/yt-types'

export function getTimestampBoundaryObj(
	secondsOnly: number,
	record: T_YT_RECORD | undefined,
	targetBlockID: string,
	tmSetObj: T_tmSetObj
) {
	const start = sec('start') ? secondsOnly : pearSec() || 0
	const end = sec('end')
		? secondsOnly
		: pearSec() || record?.wTarget?.getDuration?.() || 0
	const seekTo = sec('end') ? secondsOnly + 1 : secondsOnly

	const tm = record?.wTarget?.getCurrentTime?.()
	const currentTimeAlternative =
		lastBlockIDParameters.get(targetBlockID)?.updateTime
	const currentTime = tm ?? currentTimeAlternative?.value ?? start

	const bounded = ((tm = currentTime) => tm >= start && tm <= end)()
	const farEnough = ((tm = currentTime) => tm + 1 > seekTo)()

	return <const>{
		start,
		end,
		page: sec('end') ? 'end' : 'start',
		seekTo,
		currentTime,
		ok: bounded && farEnough,
	}

	function sec(p: startEnd) {
		return tmSetObj.self.page == p
	}
	function pearSec() {
		return HMSToSecondsOnly(tmSetObj.pear?.timestamp || '')
	}
}
