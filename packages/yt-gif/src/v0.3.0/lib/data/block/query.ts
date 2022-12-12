import {
	getFlatNodeConnections,
	getMultipleFlatNodeConnections,
} from '../proxy/flat-connections'
import { getNestedBlocks } from '../proxy/recursive'

export const getBlockParentUids = async (uid: s) => {
	try {
		const connection = <const>{
			outputs: { proxy: 'children' },
		}
		// parentUIDsQuery
		const nest = getNestedBlocks({
			uid,
			connection,
			walk: 'flat',
			query(node, payload) {
				return {
					uid: node.id.toString(),
				}
			},
		})
		const x = getFlatNodeConnections({
			nest,
			connection,
		})
		const y = getMultipleFlatNodeConnections({
			nest,
			connection,
		})
	} catch (e) {
		debugger
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
