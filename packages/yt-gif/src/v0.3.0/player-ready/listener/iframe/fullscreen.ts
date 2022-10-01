import { UI, setCurrentFullscreenPlayer } from '$v3/init/config/yt-gif-init'
import { playIs } from '../../lib/IFR'
import type { TQueryResult } from '$v3/player-ready/setup/GetQuery'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'

//#region 5. fullscreen
export function GetFullscreenCallbacks(q: TQueryResult, t: YT_TargetWrapper) {
	return <const>{
		default() {
			setCurrentFullscreenPlayer(t.GetIframeID())

			if (document.fullscreenElement) {
				return
			}
			if (q.parent.Hover()) {
				if ('mute' == UI.playerSettings.fullscreen_style.value) {
					q.isSoundingFine(false)
				} else if (
					'pause' == UI.playerSettings.fullscreen_style.value
				) {
					q.togglePlay(false)
				}
			} else if ('play' == UI.playerSettings.fullscreen_style.value) {
				q.togglePlay(true)
			}
		},
		autoplaySynergy() {
			if (document.fullscreenElement) {
				q.parent.others.toggleActive()
			} else if (playIs('all_visible')) {
				UI.playerSettings.play_style.dispatchEvent(new Event('change'))
			}
		},
	}
}
