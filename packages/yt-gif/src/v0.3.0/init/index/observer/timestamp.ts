import { getOption } from '../../../lib/backend-frontend/option'
import { UI } from '../../config/yt-gif-init'
import { toggleTimestampEmulation } from '../../observer/timestamp/mutation/toggle'
import { ChangeTimestampsDisplay } from '../../observer/timestamp/display'
import { ToggleTimestampShortcuts } from '../../observer/timestamp/shortcut'
import { TimestampBtnsMutation_cb } from '../../observer/timestamp/mutation'
import { addCustomChangeListener } from '$v3/lib/dom/options'
import { SrrGlobal } from '$lib/global/SrrGlobal'

export function ClearTimestampObserver(
	{ timestampObserver } = SrrGlobal.YT_GIF_OBSERVERS
) {
	timestampObserver?.disconnect()
	timestampObserver = new MutationObserver(TimestampBtnsMutation_cb)
	return timestampObserver
}

export async function KickstartTimestampObserver(
	{ timestampObserver, keyupEventHandler } = SrrGlobal.YT_GIF_OBSERVERS
) {
	await toggleTimestampEmulation(
		UI.display.simulate_roam_research_timestamps.checked,
		timestampObserver!,
		keyupEventHandler
	)
	UI.display.simulate_roam_research_timestamps.addEventListener(
		'change',
		async e =>
			toggleTimestampEmulation(
				(e.currentTarget as HTMLInputElement).checked,
				timestampObserver!,
				keyupEventHandler
			)
	)
	addCustomChangeListener(
		getOption(UI.timestamps.tm_options, 'shortcuts'),
		e => ToggleTimestampShortcuts(e.detail.currentValue, keyupEventHandler)
	)
	UI.timestamps.tm_workflow_display.addEventListener('change', e =>
		ChangeTimestampsDisplay(
			(e.currentTarget as HTMLSelectElement).value as keyof Itime
		)
	)
}
