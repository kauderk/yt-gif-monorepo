import { simHover, isElementVisible } from '$lib/utils'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import type { TQueryResult } from '../setup/GetQuery'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'
import {
	GetAutoplayParent,
	TryToPauseAfterASecond,
	TryToPauseIfBlurred,
} from './query'

export async function AutoPlayToUpdate(
	iframe: IFR,
	t: YT_TargetWrapper,
	q: TQueryResult,
	map: IExtendedVideoParams
) {
	await t.WhileApiHolds(iframe)

	q.seekToUpdatedTime(map.updateTime.value ?? map.start.value)
	q.togglePlay(true)
	q.isSoundingFine(!map.mute.value)

	map.playRightAway.set(false)
}
//#region 11. last - let me watch would you
export async function TryFreezeAutoplay(
	iframe: IFR,
	t: YT_TargetWrapper,
	q: TQueryResult
) {
	const parent = GetAutoplayParent(iframe)
	const play = (bol: b) => q.videoIsPlayingWithSound(bol)

	if (parent) {
		parent.dispatchEvent(simHover())
	} // human wants to hear and watch
	else if (q.parent.Hover()) {
		play(true)

		TryToPauseAfterASecond(q, play)
	} //
	else {
		await t.WhileApiHolds(iframe, 300)
		const humanInteraction = t.ytgif.globalHumanInteraction

		// or if mouse is inside parent
		if (humanInteraction) {
			// user wants to listen, don't interrupt
			play(true)
		} //
		else if (isElementVisible(iframe as IFRH) && !humanInteraction) {
			TryToPauseIfBlurred(q, play)
		} //
		else if (!q.parent.Hover()) {
			play(false) // pause
		}
	}
}
