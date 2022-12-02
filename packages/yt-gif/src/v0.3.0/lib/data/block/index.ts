import { SrrGlobal } from '$lib/global/SrrGlobal'
import { getBlockInfoByUID } from '../block-info'
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
		const parentUIDs = (await SrrGlobal.roamAlphaAPI.q(
			`[:find (pull ?block [{:block/parents [:block/uid]}]) :in $ [?block-uid ...] :where [?block :block/uid ?block-uid]]`,
			[uid]
		)[0][0]) as ParentUid
		const UIDS = parentUIDs.parents.map(e => e.uid)
		UIDS.shift()
		return getPageNamesFromBlockUidList(UIDS) // if I fail. I fail.
	} catch (e) {
		return null
	}
}

export const getPageNamesFromBlockUidList = async (blockUidList: string[]) => {
	//blockUidList ex ['sdfsd', 'ewfawef']
	const rule =
		'[[(ancestor ?b ?a)[?a :block/children ?b]][(ancestor ?b ?a)[?parent :block/children ?b ](ancestor ?parent ?a) ]]'
	const query = `[:find  (pull ?block [:block/uid :block/string])(pull ?page [:node/title :block/uid])
									 :in $ [?block_uid_list ...] %
									 :where
									  [?block :block/uid ?block_uid_list]
									 [?page :node/title]
									 (ancestor ?block ?page)]`

	const results: THierarchy[] = await SrrGlobal.roamAlphaAPI.q(
		query,
		blockUidList,
		rule
	)
	return results
}
