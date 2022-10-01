import { observedParameters } from '$v3/lib/types/config'
import { UI } from '$v3/init/config/yt-gif-init'
import { getBlockID } from '$v3/lib/dom/roam'
import { TrySetUpTimestampRecovery } from '.'

// 5.0 timestamp recovery
export function TimestampRecovery(o: {
	rm_container: El | null
	grandParentBlock: El
	blockID: string
}) {
	const { rm_container, grandParentBlock, blockID } = o
	const that: ILocalWrapper = {
		getCrrContainer: () => rm_container!,

		getTargetWrapper: () => {
			const block =
				document.getElementById(grandParentBlock.id) ?? grandParentBlock
			if (!block) return null

			return block.queryAllasArr('.yt-gif-wrapper')?.pop() ?? null
		},

		getLocalBlockID: () => {
			return getBlockID(that.getTargetWrapper()) ?? blockID
		},

		getObsTimestamp: () => {
			const lastActive = observedParameters.get(
				that.getLocalBlockID()
			)?.lastActiveTimestamp

			if (lastActive && UI.timestamps.tm_recovery.checked) {
				return lastActive
			}
			return null
		},

		delObsTimestmp: () => {
			observedParameters.delete(that.getLocalBlockID())
		},

		setObsTimestamp: (commonObj: TlastActiveTm['lastActiveTimestamp']) => {
			if (!commonObj || !commonObj.blockID) return
			const blockID = that.getLocalBlockID()
			const lastActive =
				observedParameters.get(blockID)?.lastActiveTimestamp

			const equals =
				commonObj.target?.timestamp === lastActive?.target?.timestamp
			const ok = commonObj.target?.timestamp

			if (ok && (!equals || !lastActive))
				// newEntry || not even initialized || it's pair is missing
				observedParameters.set(blockID, {
					lastActiveTimestamp: commonObj,
				}) // Hmmm...
		},

		switchTimestampObsOnAchor: (e: Event) => {},
	}

	return <const>{
		...that,
		...TrySetUpTimestampRecovery(that, rm_container!),
	}
}
