import { UI } from '../../config/yt-gif-init'
import { rm_components } from '../../config/driver'

export function KickStartMasterObserver() {
	rm_components.state.initialKey = rm_components.assertCurrentKey(
		UI.defaultValues.override_roam_video_component as s
	)
	const { initialKey } = rm_components.state
	rm_components.checkSubDeploymentStyle(initialKey, true) // start with some value
	rm_components.RunMasterObserverWithKey(initialKey)
}
