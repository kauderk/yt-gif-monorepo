import type { TMutationObj } from '../mutation';
import { getMutationNodes } from '../mutation'
import { TryToSetLastActiveTimestamp } from './query'
import { TryToReset } from './reset'
import { TryToRestore } from './restore'
import { CleanupGarbage } from './cleanup'

export async function TryToRecoverTimestamps(
	that: ILocalWrapper,
	mutationsList: MutationRecord[],
	MutationObj: TMutationObj
) {
	const { lastActive, added } = getMutationNodes(
		that.getCrrContainer,
		mutationsList,
		MutationObj
	)

	// 0. set last active timestamp by attribute
	TryToSetLastActiveTimestamp(that.setObsTimestamp, lastActive)

	// 1. Reset when removed
	if (await TryToReset(that.getTargetWrapper, MutationObj)) {
		return
	}

	// 2. Restore last active timestamp
	if (await TryToRestore(that, added)) {
		return
	}

	// 1.2 cleanup - previous unrendered|removed node
	CleanupGarbage(added, MutationObj)
}
