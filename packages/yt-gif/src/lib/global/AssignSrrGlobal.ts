import { rm_components } from '$v3/init/config/driver'
import { onStateChange } from '$v3/player-change'
import { SrrGlobal } from './SrrGlobal'

export function AvoidCircularDependency() {
	SrrGlobal.YT_GIF_OBSERVERS.creationCounter = 0
	SrrGlobal.AvoidCircularDependency.getCurrentClassesToObserver =
		function () {
			return rm_components.state.currentClassesToObserver
		}
	SrrGlobal.AvoidCircularDependency.getOnStateChange = () => onStateChange
}
