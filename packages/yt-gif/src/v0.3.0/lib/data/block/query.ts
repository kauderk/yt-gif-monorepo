import { getNestedBlocks, ReduceQuery } from '../proxy/recursive'

type THierarchy = [
	{ uid: string; string: string },
	{ title: string; uid: string }
]
type ParentUid = { parents: [{ uid: s }] }
export const getBlockParentUids = async (uid: s) => {
	try {
		const parentUIDsQuery = getNestedBlocks({
			module: 'Home',
			uid,
			connection: { inputs: { proxy: 'parents' } },
			query(node) {
				return {
					uid: node.id.toString(),
					string: node.name,
				}
			},
		})
		const UIDS = ReduceQuery({
			nest: parentUIDsQuery,
			connection: { inputs: { proxy: 'parents' } },
			query(block: typeof this.nest) {
				return [
					{ uid: block.uid, string: block.string },
					{ title: 'missing', uid: 'missing' },
				]
			},
		})

		return UIDS

		//return getPageNamesFromBlockUidList(UIDS) // if I fail. I fail.
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
