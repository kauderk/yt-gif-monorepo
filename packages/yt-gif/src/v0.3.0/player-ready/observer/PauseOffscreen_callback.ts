import { isRendered } from '$v3/lib/dom/elements-yt-gif-parent'
import { UI } from '$v3/init/config/yt-gif-init'
import { isSelected } from '$v3/lib/backend-frontend/option'
import { playIs } from '../lib/IFR'
import type { TQueryResult } from '$v3/player-ready/setup/GetQuery'
import type { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import type { ILocal } from '../lib/TStat'

//#region 10. pause on off screen
export function GetFuncPauseOffscreen(
	q: TQueryResult,
	t: YT_TargetWrapper,
	l: ILocal
) {
	const loadedAndBlurred = () =>
		q.tick() > l.update.start + 1 && !t.ytgif.globalHumanInteraction

	return (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) => {
		if (!entries[0] || !isRendered(entries[0].target)) {
			observer.disconnect()
			return
		}

		if (loadedAndBlurred()) {
			if (!playIs('all_visible')) {
				return stopIfInactive(q)
			}

			if (entries[0].isIntersecting) {
				q.togglePlay(true)
			} else {
				stopIfInactive(q)
			}
		}
	}
}
function stopIfInactive(q: TQueryResult) {
	if (
		!q.parent.isActive() ||
		!isSelected(UI.playerSettings.ps_options, 'mantain_last_active_player')
	) {
		return q.togglePlay(false)
	}
	q.parent.others.toggleActive()
	q.target.others.Mute()
	q.target.others.Pause()
}
