import { isRendered } from '$v3/lib/dom/elements-yt-gif-parent'
import { toggleAttribute } from '$lib/utils'
import { UI } from '$v3/init/config/yt-gif-init'
import { isSelected } from '$v3/lib/backend-frontend/option'
import type { TQueryResult } from '$v3/player-ready/setup/GetQuery'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'
import type { ILocal } from '../../../lib/TStat'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import type { TQueryElements } from '$v3/player-ready/setup/GetElements'

//#region 4. Controls - timedisplay
// timeDisplay
export function TimeTargetObj(
	q: TQueryResult,
	iframe: IFR,
	map: IExtendedVideoParams,
	local: ILocal,
	t: YT_TargetWrapper,
	l: TQueryElements
) {
	function NewIntervalUpdate() {
		if (!isRendered(iframe)) {
			return t.DestroyTarget()
		}
		if (!q.whole.anyHover()) {
			return
		}

		UpdateTimeDisplay()

		t.ytgif.PushSingleInterval(() => {
			if (q.whole.anyHover()) {
				UpdateTimeDisplay()
			}
		}, local.update.tickOffset)
	}
	function UpdateTimeDisplay() {
		const span = q.clipSpan()
		const offsetClip = span < 0
		const offsetStart = q.tick() > map.end.value

		// toggleAttribute(offsetStart, 'tick-offset', l.timeDisplayStart)
		// toggleAttribute(offsetClip, 'offset', l.timeDisplayEnd)

		// timeDisplay.textContent = '00:00/00:00'
		if (isSelected(UI.display.ms_options, 'clip_lifespan_format')) {
			// 'bounded tick'/'clip end'
			const boundedTick = Math.abs(span - (map.end.value - q.tick()))
			const validEnd = offsetClip ? map.end.value : span

			// l.timeDisplayStart.textContent = fmtMSS(boundedTick)
			// l.timeDisplayEnd.textContent = fmtMSS(validEnd)
		} // 'update'/'end'
		else {
			// l.timeDisplayStart.textContent = fmtMSS(q.tick())
			// l.timeDisplayEnd.textContent = fmtMSS(map.end.value)
		}
	}
	return <const>{
		NewIntervalUpdate,
		UpdateTimeDisplay,
		SeekToScroll(e: WheelEvent) {
			q.videoIsPlayingWithSound(false)

			let dir =
				q.tick() +
				Math.sign(e.deltaY) *
					Math.round(
						Number(UI.range.timestamp_display_scroll_offset.value)
					) *
					-1

			if (isSelected(UI.display.ms_options, 'clip_lifespan_format')) {
				if (dir <= map.start.value) {
					dir = map.end.value - 1 //can go beyond that
				}
				if (dir >= map.end.value) {
					dir = map.start.value //can go beyond that
				}
			}

			t.seekTo(dir)

			UpdateTimeDisplay()

			setTimeout(() => {
				if (q.whole.anyHover()) {
					q.videoIsPlayingWithSound()
				}
			}, local.update.tickOffset) //nice delay to show feedback
		},
	}
}
export type TTimeTargetObj = ReturnType<typeof TimeTargetObj>

function fmtMSS(seconds: n) {
	const format = (val: n) => `0${Math.floor(val)}`.slice(-2)
	const hours = seconds / 3600
	const minutes = (seconds % 3600) / 60
	const displayFormat =
		hours < 1 ? [minutes, seconds % 60] : [hours, minutes, seconds % 60]

	return displayFormat.map(format).join(':')
}
