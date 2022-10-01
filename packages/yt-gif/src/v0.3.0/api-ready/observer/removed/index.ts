import {
	recordedIDs,
	UIDtoURLInstancesMapMap,
	allVideoParameters,
} from '$v3/lib/types/config'
import { getOption } from '$v3/lib/backend-frontend/option'
import { UI } from '$v3/init/config/yt-gif-init'
import { DeactivateTimestampsInHierarchy } from '$v3/init/timestamp/hierarchy'
import { isRendered } from '$v3/lib/dom/elements-yt-gif-parent'

export function RemovedFromDom(o: {
	that: ILocalWrapper
	blockID: s
	deployed(): boolean
	wrapper: El
	uid: s
	newId: s
}) {
	const rm_container = o.that.getCrrContainer()
	UIDtoURLInstancesMapMap.delete(o.uid)
	if (!o.deployed()) {
		recordedIDs.delete(o.blockID)
		allVideoParameters.delete(o.newId)
	}

	if (!UI.timestamps.tm_recovery.checked) {
		DeactivateTimestampsInHierarchy(rm_container, o.wrapper)
	}

	if (
		!isRendered(rm_container) &&
		rm_container?.closest('.rm-sidebar-outline')
	) {
		o.that.delObsTimestmp()
	}

	if (!isRendered(rm_container)) {
		getOption(UI.timestamps.tm_options, 'anchor').removeEventListener(
			'customChange',
			o.that.switchTimestampObsOnAchor
		)
	}
}
