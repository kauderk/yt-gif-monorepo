import type { IExtendedVideoParams } from '$v3/lib/types/video-types'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import { PlayIs, SoundIs } from '../lib/PlayIs'
import type { ILocal } from '../lib/TStat'
import { GetElementsMethods, GetConfig, GetTarget } from './composition'

export function GetQuery(params: IQueryInput) {
	const { parent, timeDisplay, iframe } = params
	const { map, t, local } = params

	return <const>{
		...GetElementsMethods(parent, iframe, timeDisplay, t),
		...GetConfig(map),
		...GetTarget(t),

		videoIsPlayingWithSound(boo = true) {
			this.isSoundingFine(boo)
			this.togglePlay(boo)
		},
		togglePlay(bol: b, el = iframe) {
			if (bol) {
				PlayIs('yt-playing', el)
				t.playVideo()
			} else {
				PlayIs('yt-paused', el)
				t.pauseVideo()
			}
		},
		isSoundingFine(bol = true, el = iframe) {
			if (bol) {
				SoundIs('yt-unmute', el)
				t.unMute()
				t.setVolume(local.update.volume)
			} else {
				SoundIs('yt-mute', el)
				t.mute()
			}
		},

		UpdateLocalVolume(v?: n) {
			v = v ?? t.getVolume()
			local.update.volume = v
		},
		seekToUpdatedTime(desiredTime: n) {
			local.update.start = desiredTime
			t.seekTo(local.update.start)
		},
	}
}

interface IQueryInput {
	map: IExtendedVideoParams
	parent: Element
	timeDisplay: HTMLElement
	t: YT_TargetWrapper
	iframe: IFR
	local: ILocal
}

export type TQueryResult = ReturnType<typeof GetQuery>
