import { setCurrentFullscreenPlayer } from '$v3/init/config/yt-gif-init'
import { UIStore } from '$v3/init/config/UIStore'
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
				if (
					'mute' ==
					UIStore.get().playerSettings.fullscreen_style.value
				) {
					q.isSoundingFine(false)
				} else if (
					'pause' ==
					UIStore.get().playerSettings.fullscreen_style.value
				) {
					q.togglePlay(false)
				}
			} else if (
				'play' == UIStore.get().playerSettings.fullscreen_style.value
			) {
				q.togglePlay(true)
			}
		},
		autoplaySynergy() {
			if (document.fullscreenElement) {
				q.parent.others.toggleActive()
			} else if (playIs('all_visible')) {
				UIStore.get().playerSettings.play_style.dispatchEvent(
					new Event('change')
				)
			}
		},
	}
}
