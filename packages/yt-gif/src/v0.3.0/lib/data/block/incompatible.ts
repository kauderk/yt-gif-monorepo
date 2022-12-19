import { ExpandBlock } from '.'
import { getBlockInfoByUID } from '../proxy/block-info'
import { Unhandled } from '../utils'

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
