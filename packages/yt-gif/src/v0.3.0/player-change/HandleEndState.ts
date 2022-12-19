import { currentFullscreenPlayer } from '$v3/init/config/yt-gif-init'
import { UIStore } from '$v3/init/config/UIStore'
import { isSelected } from '$v3/lib/backend-frontend/option'
import {
	TryToPlayEndSound,
	TryToLoadNextTimestampSet,
	ResetFullscreenPlayer,
} from './lib'

export async function HandleEndState(Args: {
	Reload: () => Promise<void>
	iframe: HTMLIFrameElement
	id: string
}) {
	Args.iframe
		.closest('.yt-gif-wrapper')
		?.dispatchEvent(new CustomEvent('customVideoEnded'))

	if (UIStore.get().timestamps.tm_loop_hierarchy.value != 'disabled') {
		await TryToLoadNextTimestampSet(Args.iframe, Args.Reload)
	} else {
		await Args.Reload()
	}

	if (UIStore.get().range.end_loop_sound_volume.value != '0') {
		TryToPlayEndSound()
	}

	if (
		isSelected(
			UIStore.get().playerSettings.ps_options,
			'minimize_on_video_ended'
		) &&
		currentFullscreenPlayer === Args.id &&
		document.fullscreenElement
	) {
		ResetFullscreenPlayer()
	}
}
