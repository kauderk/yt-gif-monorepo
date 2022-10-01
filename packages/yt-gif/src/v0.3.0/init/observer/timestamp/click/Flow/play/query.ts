import { UI } from '../../../../../config/yt-gif-init'
import type { T_YT_RECORD } from '$v3/lib/types/yt-types'
import type { PulseObj } from '$v3/init/timestamp/lib'
import type { tryGetRecordBoundary } from '../../record/record'

export function TryDispatchCustomPlayerReady({
	timestampObj,
	obsTimestamp,
	targetWrapper,
}: TFlow) {
	const detail: ICustomPlayerReady = {
		...timestampObj,
		updateTime: timestampObj.currentTime ?? timestampObj.seekTo,
		playRightAway: UI.timestamps.tm_seek_action.value == 'play',
		mute: UI.timestamps.tm_seek_action.value == 'mute',
		obsTimestamp,
	}
	targetWrapper?.dispatchEvent(
		new CustomEvent('customPlayerReady', {
			detail,
			cancelBubble: true,
		})
	)
}
export function TrySeekToFlow({
	seekToMessage,
	record,
	timestampObj,
}: TFlow & ITryPlayInput) {
	const { ok, currentTime, seekTo, start } = timestampObj
	if (seekToMessage == 'seekTo-soft' && ok) {
		record?.wTarget?.seekTo(currentTime)
	} else if (seekTo != start) {
		// ReloadYTVideo already seeks to start
		record?.wTarget?.seekTo(seekTo)
	}
}
export function CanGoOn({
	pulse,
	boundaryObj,
	seekToMessage,
	simMessage,
}: ITryPlayInput) {
	if (!boundaryObj.success) {
		return false
	}
	if (simMessage == 'visuals') {
		pulse('purple')
	} else {
		pulse('green')
	}
	const { ok } = boundaryObj.timestampObj
	if (simMessage == 'visuals' && ok && seekToMessage != 'seekTo-strict') {
		return false // should this return the next line "ReloadYTVideo"
	}
	return true
}
export function TryMutePausePlayer(record: T_YT_RECORD | undefined) {
	record?.isSoundingFine(UI.timestamps.tm_seek_action.value != 'mute')
	record?.togglePlay(UI.timestamps.tm_seek_action.value != 'pause')
}
type TFlow = ITryPlayInput['boundaryObj']
export interface ITryPlayInput {
	pulse: ReturnType<typeof PulseObj>
	boundaryObj: ReturnType<typeof tryGetRecordBoundary>
	simMessage: string
	seekToMessage: string
}
