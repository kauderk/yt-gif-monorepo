import { getBlockInfoByUID } from '../proxy/block-info'
import { getNestedBlocks, ReduceQuery } from '../proxy/recursive'
import { generateUID, sleep, sortObjectsByOrder, Unhandled } from '../utils'

export const updateBlock = async (
	block_uid: s,
	block_string: s,
	block_expanded?: boolean
) => {
	const payload = {
		uid: block_uid,
		string: block_string.toString(),
		open: block_expanded,
	}
	Unhandled(updateBlock, payload)
}

export const moveBlock = async (
	parent_uid: s,
	block_order: n,
	block_to_move_uid: s
) => {
	const payload = {
		location: { 'parent-uid': parent_uid, order: block_order },
		block: { uid: block_to_move_uid },
	}
	Unhandled(moveBlock, payload)
}

export const createBlock = async (
	parent_uid: s,
	block_order: n,
	block_string: s,
	manualUID = false
) => {
	parent_uid = parent_uid.replace('((', '').replace('))', '')
	let newUid = !manualUID ? await generateUID() : manualUID // polymorphism man...

	const payload = {
		location: {
			'parent-uid': parent_uid,
			order: block_order,
		},
		block: {
			string: block_string.toString(),
			uid: newUid,
		},
	}
	Unhandled(createBlock, payload)

	await sleep(10) //seems a brief pause is need for DB to register the write
	return <const>{
		uid: newUid,
		parentUid: parent_uid,
		order: block_order,
		string: block_string,
	}
}
export const SetNumberedViewWithUid = async (uid: s) => {
	const newViewType = 'numbered'
	const payload = {
		block: { uid, 'children-view-type': newViewType },
	}
	Unhandled(SetNumberedViewWithUid, payload)
}

export const CollapseDirectcChildren = async (
	block_uid: s,
	block_expanded: b
) => {
	const firstGen = await getBlockInfoByUID(block_uid)
	// @ts-expect-error
	const children = sortObjectsByOrder(firstGen[0][0].children)

	for (const child of children) {
		await ExpandBlock(child.uid, block_expanded)
	}
}
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
