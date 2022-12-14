import {
	getFlatNodeConnections,
	getMultipleFlatNodeConnections,
} from '../proxy/flat-connections'
import { tryGetNestedBlocks } from '../proxy/recursive'

export const getBlockParentUids = async (uid: s) => {
	try {
		const connection = <const>{
			outputs: { proxy: 'children' },
		}
		// parentUIDsQuery
		const nest = tryGetNestedBlocks({
			uid,
			connection,
			walk: 'flat',
			query(node, payload) {
				return {
					name: `${node.name} #${node.id}`,
				}
			},
		})!
		const x = getFlatNodeConnections({
			nest,
			connection,
		})
		const y = getMultipleFlatNodeConnections({
			nest,
			connection,
		})
		console
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
