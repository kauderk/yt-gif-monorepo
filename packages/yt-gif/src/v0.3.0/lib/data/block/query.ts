import {
	getFlatNodeConnections,
	getMultipleFlatNodeConnections,
} from '../proxy/flat-connections'
import { getNestedBlocks } from '../proxy/recursive'

export const getBlockParentUids = async (uid: s) => {
	try {
		const parentUIDsQuery = getNestedBlocks({
			uid,
			connection: {
				outputs: { proxy: 'children' },
			},
			walk: 'flat',
			query(node, payload) {
				return {
					uid: node.id.toString(),
				}
			},
		})
		const x = getFlatNodeConnections({
			nest: parentUIDsQuery,
			connection: {
				outputs: { proxy: 'children' },
			},
		})
		const y = getMultipleFlatNodeConnections({
			nest: parentUIDsQuery,
			connection: {
				inputs: { proxy: 'parents' },
				outputs: { proxy: 'children' },
			},
		})
	} catch (e) {
		return null
	}
}

type THierarchy = [
	{ uid: string; string: string },
	{ title: string; uid: string }
]
/**
 * @deprecated
 */
export const getPageNamesFromBlockUidList = async (blockUidList: string[]) => {
	return <THierarchy>{}
}

/**
 * @deprecated
 */
export const allChildrenInfo = async (blockUid: s) => {
	return ''
}
