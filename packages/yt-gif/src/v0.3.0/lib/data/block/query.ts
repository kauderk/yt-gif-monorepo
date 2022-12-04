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
				inputs: { proxy: 'parents' },
			},
			query(node) {
				return {
					uid: node.id.toString(),
					string: node.name,
				}
			},
		})

		const x = getFlatNodeConnections({
			nest: parentUIDsQuery,
			connection: {
				inputs: { proxy: 'parents' },
			},
		})
		const y = getMultipleFlatNodeConnections({
			nest: parentUIDsQuery,
			connection: {
				inputs: { proxy: 'parents' },
			},
		})
		debugger
		//const z = y.get("children")
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
