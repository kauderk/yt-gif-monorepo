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
			connection: {
				//inputs: { proxy: 'parents' },
				outputs: { proxy: 'children' },
			},
			query(node) {
				return {
					uid: node.id.toString(),
					string: node.name,
				}
			},
		})
		type Node = typeof parentUIDsQuery
		let indexes = [0] //0 0 0

		debugger
		function walkDownTree(node: Node) {
			let nextNode = node
			let indexPosition = 0

			while (nextNode) {
				//
				let currentIndex = indexes[indexPosition]
				let previousNode = nextNode
				nextNode = nextNode.children?.[currentIndex] as Node
				//
				if (nextNode) {
					indexes.push(0)
					indexPosition++
				} else {
					indexPosition--
					indexes[indexPosition]++
					indexes.pop()
					nextNode = previousNode
				}
			}
			return
		}
		walkDownTree(parentUIDsQuery)
		debugger
		// const UIDS = ReduceQuery({
		// 	nest: parentUIDsQuery,
		// 	connection: { inputs: { proxy: 'parents' } },
		// 	query(current: typeof this.nest, parent: typeof this.nest) {
		// 		return {
		// 			uid: current.uid,
		// 			parentUid: parent?.uid,
		// 			hasChildren: !!current?.parents?.length,
		// 		}
		// 	},
		// })
		// const map = new Map<string, object>()
		// array?.forEach(o => {
		// 	map.set(o.uid, o)
		// })

		// let branches = []

		// for (const [uid, valObj] of [...map.entries()]) {
		// 	if (!valObj.hasChildren) {
		// 		let branch: any[] = []
		// 		let index = 0
		// 		branch.push(uid)
		// 		//branch[index] = [uid]

		// 		let freezeParentUid = valObj.parentUid

		// 		while (map.has(freezeParentUid)) {
		// 			index++
		// 			freezeParentUid = map.get(freezeParentUid)?.parentUid
		// 			branch.push(freezeParentUid)
		// 		}
		// 		branches.push(branch)
		// 	}
		// }

		//return UIDS

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
