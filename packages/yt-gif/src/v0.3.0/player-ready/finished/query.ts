import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import type { TQueryResult } from '../setup/GetQuery'
import { playIs } from '../lib/IFR'
import type { ILocal } from '../lib/TStat'
import type { TStyleCallbacks } from '$v3/player-ready/listener/toggle'

export function TryToPauseIfBlurred(q: TQueryResult, play: TPlay) {
	const bol = playIs('all_visible')
	play(bol) // pause?

	if (bol && !q.parent.Hover() && q.isPlaying()) {
		// if mouse is outside parent and video is playing
		play(false)
	}
}
export function TryToPauseAfterASecond(q: TQueryResult, play: TPlay) {
	setTimeout(() => {
		if (!q.parent.isActive() && !q.parent.Hover()) {
			play(false)
		}
	}, 1000)
}
export function GetAutoplayParent(iframe: IFR) {
	return (
		iframe.closest('.rm-alias-tooltip__content') || //tooltip
		iframe.closest('.bp3-card') || //card
		iframe.closest('.myPortal')
	)
}
export function TryToRunPreviousParams(
	t: YT_TargetWrapper,
	local: ILocal,
	styleCallbacks: TStyleCallbacks
) {
	// volume
	try {
		t.setVolume(local.update.volume)
	} catch (error) {
		console.log(error)
	}
	// playback rate
	styleCallbacks.playback()
}
type TPlay = (bol: b) => void
