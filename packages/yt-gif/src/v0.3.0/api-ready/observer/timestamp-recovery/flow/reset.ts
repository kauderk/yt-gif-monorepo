import { assertSelector } from '$lib/utils'
import { UIStore } from '$v3/init/config/UIStore'
import { ClickResetWrapper } from '$v3/lib/event/ClickResetWrapper'
import type { TMutationObj } from '../mutation'

export async function TryToReset(
	getTargetWrapper: ILocalWrapper['getTargetWrapper'],
	MutationObj: TMutationObj
) {
	const removedActiveObj = MutationObj.removed.find(
		rO => rO?.target?.timestamp && canReset(rO.blockID)
	)
	const activeMatch =
		!!removedActiveObj &&
		UIStore.get().timestamps.tm_reset_on_removal.value != 'disabled'

	if (activeMatch) {
		MutationObj.removed.length = 0

		await ClickResetWrapper(getTargetWrapper())
	}

	return activeMatch

	function canReset(id: s) {
		if ('block' == UIStore.get().timestamps.tm_reset_on_removal.value) {
			id = assertSelector(id)
			if (!document.querySelector('div.rm-block__input#' + id))
				return true
		} else if (
			'container' == UIStore.get().timestamps.tm_reset_on_removal.value
		) {
			if (!document.getElementById(id)) return true
		}
	}
}
