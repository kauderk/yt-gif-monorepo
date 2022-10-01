import { UI } from '$v3/init/config/yt-gif-init'
import { isSelected } from '$v3/lib/backend-frontend/option'
import type { TQueryResult } from '../../setup/GetQuery'
import {
	anyValidInAndOutKey,
	AnyPlayOnHover,
} from '../../lib/anyValidInAndOutKey'
import { muteIs, CanUnmute } from '../../lib/IFR'

// 3. hover over the frame - mute | pause
export function GetHoverStates(q: TQueryResult) {
	return <const>{
		stop(this: Element, e: MouseEvent) {
			q.parent.others.toggleActive()

			q.target.others.StrictFlow()

			q.UpdateLocalVolume()
			q.UpdateHumanInteraction(false)

			if (anyValidInAndOutKey(e) && !muteIs('all_muted')) {
				q.parent.toggleActive(true)
				q.videoIsPlayingWithSound()
			} else {
				q.parent.toggleActive(false)
				q.togglePlay(!AnyPlayOnHover() && q.isPlaying())
				q.isSoundingFine(false)
			}
		},
		play() {
			// if (
			// 	isSelected(
			// 		UI.playerSettings.ps_options,
			// 		'mantain_last_active_player'
			// 	)
			// )
			q.parent.others.toggleActive()

			q.target.others.StrictFlow()

			q.UpdateHumanInteraction(true)
			q.togglePlay(true)

			if (CanUnmute()) {
				q.isSoundingFine()
			} else if (muteIs('soft')) {
				q.isSoundingFine(false)
			}
		},
	}
}
