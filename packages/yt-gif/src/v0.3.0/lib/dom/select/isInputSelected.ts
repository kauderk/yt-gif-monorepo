import { isSelected } from '../../backend-frontend/option'
import { UIStore } from '$v3/init/config/UIStore'

export function isIntersection_selectedValid() {
	return isIntersectionSeletectd() && isInputBufferSelected() // the only place where it is available
}
export function isInput_selectedValid() {
	return (
		isInputSelected() ||
		(!isIntersectionSeletectd() && isInputBufferSelected()) ||
		isSelected(UIStore.get().experience.initialize_mode, 'overflow')
	)
}
export function isInputSelected() {
	return isSelected(UIStore.get().experience.initialize_mode, 'input')
}
export function isIntersectionSeletectd() {
	return isSelected(UIStore.get().experience.xp_options, 'intersection')
}
export function isInputBufferSelected() {
	return isSelected(
		UIStore.get().experience.initialize_mode,
		'input_x_buffer'
	)
}
