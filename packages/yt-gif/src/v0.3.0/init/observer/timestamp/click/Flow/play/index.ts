import { TryReloadVideo } from '../../../../../../lib/event/TryReloadVideo'
import type {
	ITryPlayInput} from './query';
import {
	CanGoOn,
	TrySeekToFlow,
	TryMutePausePlayer,
	TryDispatchCustomPlayerReady,
} from './query'

/**
 * Simulate Mouseenter
 */
export async function tryPlayLastBlock(input: ITryPlayInput) {
	if (!CanGoOn(input)) {
		return
	}
	const { boundaryObj } = input
	const { record, timestampObj } = boundaryObj

	await TryReloadVideo({ t: record?.wTarget, ...timestampObj })

	TrySeekToFlow({ ...input, ...boundaryObj })

	TryMutePausePlayer(record)

	TryDispatchCustomPlayerReady(boundaryObj)
}
