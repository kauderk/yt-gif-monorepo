import { videoParams } from '$v3/lib/types/config'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import { GetClosestRate, toggleAttribute, toggleClasses } from '$lib/utils'
import { HandleOthers } from '../listener/parent/HandleOthers'
export function GetElementsMethods(
	parent: Element,
	iframe: IFR,
	timeDisplay: HTMLElement,
	// FIXME: get me out of here
	t: YT_TargetWrapper
) {
	const active = 'yt-active'
	return <const>{
		parent: {
			others: {
				toggleActive(bol = false) {
					document
						.queryAllasArr(`[${active}]`)
						.filter(el => el != parent)
						.forEach(el => toggleAttribute(bol, active, el))
				},
			},
			toggleActive: (bol: b) => toggleAttribute(bol, active, parent),
			Hover: () => parent.matches(':hover'),
			isActive: () => parent.hasAttribute(active),
		},
		timeDisplay: {
			Hover: () => timeDisplay.matches(':hover'),
			OnCustomVideoEnded() {
				if (timeDisplay.classList.contains('yt-gif-timestamp-update')) {
					timeDisplay.onmousemove = null
					this.visible(false)
					t.ytgif.ClearTimers()
				}
			},
			visible(bol: b) {
				toggleClasses(bol, ['yt-gif-timestamp-update'], timeDisplay)
				toggleClasses(!bol, ['yt-gif-invisible-element'], timeDisplay)
			},
		},
		whole: {
			anyHover() {
				return parent.matches(':hover') || timeDisplay.matches(':hover')
			},
		},
		target: {
			others: HandleOthers(iframe),
		},
	}
}

export function GetTarget(t: YT_TargetWrapper) {
	return <const>{
		tick: (_ = t) => _?.getCurrentTime(),
		closestRate(x: n) {
			const rates: Array<n> = t.getAvailablePlaybackRates() || []
			return GetClosestRate(rates, x) || 1
		},
		UpdateHumanInteraction(b: b) {
			t.ytgif.globalHumanInteraction = b
		},
		isPlaying() {
			return t.getPlayerState() === 1
		},
	}
}
export function GetConfig(map: IExtendedVideoParams) {
	return <const>{
		clipSpan: () => map.end.value - map.start.value,
		isBounded: (x: n) => map.start.value < x && x < map.end.value,
		getMapVolume: () => {
			return videoParams.volume.value || 40
		},
	}
}
