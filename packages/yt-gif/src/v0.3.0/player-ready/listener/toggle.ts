import { isElementVisible } from '$lib/utils'
import { UI } from '$v3/init/config/yt-gif-init'
import type { TQueryResult } from '../setup/GetQuery'
import { AnyPlayOnHover } from '../lib/anyValidInAndOutKey'
import { playIs, muteIs } from '../lib/IFR'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import type { ILocal } from '$v3/player-ready/lib/TStat'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'

//#region 2. play/mute styles
export function* FlipStyleGenerator(o: TStyleCallbacks) {
	let bol = true
	while (true) {
		// UI.playerSettings.play_style = Flip(
		// 	UI.playerSettings.play_style,
		// 	bol,
		// 	o.play
		// )
		// UI.playerSettings.mute_style = Flip(
		// 	UI.playerSettings.mute_style,
		// 	bol,
		// 	o.mute
		// )
		// UI.display.yt_playback_speed = Flip(
		// 	UI.display.yt_playback_speed,
		// 	bol,
		// 	o.playback
		// )
		bol = yield bol
	}
}
export type IFlipIterator = ReturnType<typeof FlipStyleGenerator>
export function GetStyleCallbacks(
	iframe: IFR,
	q: TQueryResult,
	t: YT_TargetWrapper,
	map: IExtendedVideoParams,
	local: ILocal
) {
	return <const>{
		play: GetFuncPlay(iframe as IFRH, q),
		mute: GetFuncMute(iframe as IFRH, q),
		playback: GetFuncPlayback(t, map, local),
	}
}
export type TStyleCallbacks = ReturnType<typeof GetStyleCallbacks>
/* ********** */
function GetFuncPlay(iframe: IFRH, q: TQueryResult) {
	return function () {
		if (!isElementVisible(iframe)) return //play all VISIBLE Players, this will be called on all visible iframes

		if (playIs('all_visible')) {
			q.togglePlay(true)
			q.isSoundingFine(false)
		} else if (AnyPlayOnHover()) {
			q.togglePlay(!AnyPlayOnHover())
		}
	}
}
function GetFuncMute(iframe: IFRH, q: TQueryResult) {
	return function () {
		if (!isElementVisible(iframe)) return //mute all VISIBLE Players, this will be called on all visible iframes

		if (muteIs('strict') || muteIs('all_muted')) {
			q.isSoundingFine(false)
		}
	}
}
function GetFuncPlayback(
	t: YT_TargetWrapper,
	map: IExtendedVideoParams,
	local: ILocal
) {
	return function () {
		const value = 'Default'
		const speed = value == 'Default' ? map.speed.value : Number(value)
		local.update.tickOffset = 1000 / speed
		t.setPlaybackRate(speed)
	}
}
function Flip(
	binaryInput: HTMLSelectElement,
	bol = false,
	cb = () => {
		/* empty */
	}
) {
	if (binaryInput?.tagName) {
		if (bol) binaryInput.addEventListener('change', cb)
		else binaryInput.removeEventListener('change', cb)
	}

	return binaryInput
}
