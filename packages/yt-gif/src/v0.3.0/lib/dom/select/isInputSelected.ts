import { isSelected } from '../../backend-frontend/option'
import { UI } from '../../../init/config/yt-gif-init'

export function isIntersection_selectedValid() {
	return isIntersectionSeletectd() && isInputBufferSelected() // the only place where it is available
}
export function isInput_selectedValid() {
	return (
		isInputSelected() ||
		(!isIntersectionSeletectd() && isInputBufferSelected()) ||
		isSelected(UI.experience.initialize_mode, 'overflow')
	)
}
export function isInputSelected() {
	return isSelected(UI.experience.initialize_mode, 'input')
}
export function isIntersectionSeletectd() {
	return isSelected(UI.experience.xp_options, 'intersection')
}
export function isInputBufferSelected() {
	return isSelected(UI.experience.initialize_mode, 'input_x_buffer')
}
