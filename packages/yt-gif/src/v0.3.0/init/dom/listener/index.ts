import { getOption } from '../../../lib/backend-frontend/option'
import { UIStore } from '$v3/init/config/UIStore'
import { ifBuffer_ShiftOldest } from '$v3/init/observer/performance'

//#region 3.2 pre startup - iframes
export function togglePlayPauseStyles() {
	const mute = UIStore.get().playerSettings.mute_style
	const play = UIStore.get().playerSettings.play_style

	const ilogicSoftStyle = () => mute.value == 'soft' && play.value == 'soft'
	const playState = () =>
		(getOption(play, 'soft').disabled = ilogicSoftStyle())

	playState()
	mute.addEventListener('change', playState)
	play.addEventListener('change', playState)
}
export function initialize_modes_synergy(
	slider = UIStore.get().range.iframe_buffer_slider,
	input_x_buffer = getOption(
		UIStore.get().experience.initialize_mode,
		'input_x_buffer'
	),
	initialize_mode = UIStore.get().experience.initialize_mode
) {
	initialize_mode.addEventListener(
		'change',
		() => (input_x_buffer.disabled = false)
	)

	input_x_buffer.addEventListener('customChange', ifBuffer_ShiftOldest)
	slider.addEventListener('click', ifBuffer_ShiftOldest)
	slider.addEventListener('wheel', ifBuffer_ShiftOldest)
}
