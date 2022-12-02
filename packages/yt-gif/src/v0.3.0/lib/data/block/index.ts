import { getBlockInfoByUID } from '../proxy/block-info'
import { getNestedBlocks, ReduceQuery } from '../proxy/recursive'
import { generateUID, sleep, sortObjectsByOrder, Unhandled } from '../utils'

/**
 * only one function required the children
 * @deprecated
 */
export const allChildrenInfo = async (blockUid: s) => {
	//
}

export const ExpandBlock = async (block_uid: s, block_expanded: b) => {
	// SrrGlobal.roamAlphaAPI.updateBlock
	const payload = {
		block: { uid: block_uid, open: block_expanded },
	}
	Unhandled(ExpandBlock, payload)
}
