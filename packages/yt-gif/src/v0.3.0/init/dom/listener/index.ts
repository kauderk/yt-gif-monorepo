import { getOption } from '../../../lib/backend-frontend/option'
import { UI } from '../../config/yt-gif-init'
import { ifBuffer_ShiftOldest } from '$v3/init/observer/performance'

//#region 3.2 pre startup - iframes
export function togglePlayPauseStyles() {
	const mute = UI.playerSettings.mute_style
	const play = UI.playerSettings.play_style

	const ilogicSoftStyle = () => mute.value == 'soft' && play.value == 'soft'
	const playState = () =>
		(getOption(play, 'soft').disabled = ilogicSoftStyle())

	playState()
	mute.addEventListener('change', playState)
	play.addEventListener('change', playState)
}
export function initialize_modes_synergy(
	slider = UI.range.iframe_buffer_slider,
	input_x_buffer = getOption(UI.experience.initialize_mode, 'input_x_buffer'),
	initialize_mode = UI.experience.initialize_mode
) {
	initialize_mode.addEventListener(
		'change',
		() => (input_x_buffer.disabled = false)
	)

	input_x_buffer.addEventListener('customChange', ifBuffer_ShiftOldest)
	slider.addEventListener('click', ifBuffer_ShiftOldest)
	slider.addEventListener('wheel', ifBuffer_ShiftOldest)
}
