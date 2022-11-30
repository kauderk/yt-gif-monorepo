import { UIStore } from '$v3/init/config/UIStore'

export async function ClickOnTimestamp<T extends IBtnArrObj>(
	target: IBtn,
	override = <TClickEventOverride>{}
) {
	const seekToMessage =
		UIStore.get().timestamps.tm_seek_to.value == 'soft'
			? 'seekTo-soft'
			: 'seekTo-strict'

	const event: T_TmClickDetailEvent = {
		// cringe event object
		...(<MouseEvent>{}),
		currentTarget: target,
		which: 1,
		mute: UIStore.get().timestamps.tm_seek_action.value == 'mute',
		simMessage: override.simMessage || '',
		seekToMessage: override.seekToMessage || seekToMessage,
	}
	// how do you resolve/return a promise using a CustomEvent handler?
	await (target as T)?.OnClicks?.(event)
}
