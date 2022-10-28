import { GetPlayerState } from '$v3/init/config/yt-gif-init'
import { isRendered } from '$v3/lib/dom/elements-yt-gif-parent'
import { allVideoParameters } from '$v3/lib/types/config'
import { TryReloadVideo } from '$v3/lib/event/TryReloadVideo'
import type { YT_IFRAME } from '$v3/lib/types/yt-types'
import { YT_TargetWrapper } from '$v3/lib/types/yt-types'
import { HandleEndState } from './HandleEndState'
import { windowExist } from '$lib/windowStore'

windowExist.subscribe(() => {
	// FIXME: window
	//window.AvoidCircularDependency.getOnStateChange = () => onStateChange
})
export async function onStateChange(state: YT_IFRAME) {
	const t = new YT_TargetWrapper(state.target)
	const id = t.GetIframeID()
	const map = allVideoParameters.get(id)
	const iframe = t.getIframe()

	if (!isRendered(iframe)) return t.DestroyTarget()

	if (state.data === GetPlayerState().ENDED) {
		await HandleEndState({
			Reload: async () =>
				TryReloadVideo({
					t,
					start: map?.start.value ?? 0,
					end: map?.end.value ?? 0,
				}),
			iframe,
			id,
		})
	}

	if (state.data === GetPlayerState().PLAYING && t.ytgif.timerID === null) {
		// NON NewIntervalUpdate
		t.ytgif.enter()
	}

	if (state.data === GetPlayerState().PAUSED) {
		t.ytgif.ClearTimers()
	}
}
