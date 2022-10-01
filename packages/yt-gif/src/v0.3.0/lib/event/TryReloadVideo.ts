import { isRendered } from '../dom/elements-yt-gif-parent'
import { allVideoParameters } from '../types/config'
import type { YT_TargetWrapper } from '../types/yt-types'
import { sleep } from '$lib/utils'

/* ***************** */
export async function TryReloadVideo({
	t,
	start,
	end,
}: {
	t: YT_TargetWrapper | undefined
	start: number
	end: number
}) {
	if (!t) return

	const vars = t.GetVars()
	const map = allVideoParameters.get(t.GetIframeID())
	if (!map) {
		console.warn(
			`YT GIF: ReloadYTVideo: Couldn't find VideoConfigParameters for ${t.GetIframeID()}`
		)
	}

	const iframe = t.getIframe()

	start = start || 0
	end = end || t.getDuration()

	if (map?.start.value == start && map?.end.value == end) {
		while (isRendered(iframe) && !t.ApiIsWorking()) {
			await sleep(50)
		}
		return t.seekTo(start)
	}

	map?.start.set((vars.start = start))
	map?.end.set((vars.end = end))
	const vol = t.getVolume()

	while (isRendered(iframe) && !t.ApiIsWorking()) {
		await sleep(50)
	}

	// the only way...
	if (t.getPlayerState() ?? 0) {
		t.setPlayerState('F')
	}

	try {
		t.setOnStateChange(async () => {})
	} catch (error) {
		console.warn(
			'YT GIF: ReloadYTVideo | onStateChange assignment to undefined'
		)
	}

	// ...to prevent double "endState"
	await t.loadVideoById({
		// ...it requirers to set "endSeconds" once again
		videoId: t.GetVideoID(),
		startSeconds: start,
		endSeconds: end,
	})

	while (isRendered(iframe) && !t.getCurrentTime()) {
		await sleep(50)
	}

	t.setVolume(vol)

	try {
		t.setOnStateChange(window.AvoidCircularDependency.getOnStateChange())
	} catch (error) {
		console.error(
			'YT GIF: ReloadYTVideo | onStateChange assignment to undefined'
		)
	}
}
