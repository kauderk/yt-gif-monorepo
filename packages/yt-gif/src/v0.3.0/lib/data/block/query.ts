import { getFlatNodeConnections } from '../proxy/flat-connections'
import { getNestedBlocks } from '../proxy/recursive'

type THierarchy = [
	{ uid: string; string: string },
	{ title: string; uid: string }
]
export const getBlockParentUids = async (uid: s) => {
	try {
		const parentUIDsQuery = getNestedBlocks({
			uid,
			connection: {
				outputs: { proxy: 'children' },
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
				outputs: { proxy: 'children' },
			},
		})
	} catch (e) {
		return null
	}
}

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
