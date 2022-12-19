import { UIStore } from '$v3/init/config/UIStore'
import type { TMutationObj, TMutIdx, T_tmRecord } from '../mutation'

export function CleanupGarbage(added: T_tmRecord[], MutationObj: TMutationObj) {
	if (
		!UIStore.get().timestamps.tm_recovery.checked ||
		added.length > 0 ||
		MutationObj.removed.length > 0
	) {
		return
	}

	const inactiveYetAdded = MutationObj.removed.find(
		r =>
			OkTimestamp(r) &&
			added.some(a => OkTimestamp(a) && SameBlockID(a, r))
	)

	if (inactiveYetAdded) {
		const start = MutationObj.removed.indexOf(inactiveYetAdded)
		MutationObj.removed.splice(start, 1)
	}
}
function OkTimestamp(o: TMutIdx | T_tmRecord) {
	return o.target.timestamp
}
function SameBlockID(a: T_tmRecord, r: TMutIdx) {
	return a.blockID.includes(r.blockID)
}
