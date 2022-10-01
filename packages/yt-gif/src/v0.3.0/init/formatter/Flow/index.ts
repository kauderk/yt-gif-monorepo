import { ElementsPerBlock } from '../../../lib/dom/ytgif'
import { ObjKey_AtIndexInMap } from '../../../lib/backend-frontend/map-query'
import { NonReferencedPerBlock, replaceString } from '../../../lib/helpers'
import { UIDtoURLInstancesMapMap } from '../../../lib/types/config'
import { updateBlock } from '$lib/utils-roam-alpha-api'
import { TryToUpdateBlockSubString } from '../update'

export async function TryToUpdateBlock_fmt<
	T extends TblockUpd_fmt | TblockUpd_UrlBnt
>({
	block,
	targetNode,
	siblingSel,
	selfSel,
	getMap,
	isKey,
	fmtCmpnt_cb,
	tempUID,
	from,
}: T) {
	// Grab, if any, nested block information
	const siblingIndex = ElementsPerBlock(block, siblingSel).indexOf(targetNode)
	const selfIndex = NonReferencedPerBlock(block, selfSel, targetNode).indexOf(
		targetNode
	)
	const map = await getMap()
	const ObjAsKey = ObjKey_AtIndexInMap(map, siblingIndex, isKey)

	// exit if the information isn't available
	const { uid, capture } = ObjAsKey ?? {}
	if (!capture || !uid || selfIndex == -1) return
	const res = await TryToUpdateBlockSubString(uid, selfIndex, capture, null)
	if (!res?.success) return

	// update the block
	try {
		const replaceObj = { ...res, capture, from, replace: '' }
		replaceObj.replace = await fmtCmpnt_cb(replaceObj)
		await updateBlock(uid, replaceString(replaceObj), res.open)
		UIDtoURLInstancesMapMap.delete(uid)
		UIDtoURLInstancesMapMap.delete(tempUID)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		const _from = from as TblockUpd_UrlBnt['from']
		const tp = _from?.urlBtn?.closest('[data-tooltip]')
		const err = `${error?.message} ((${tempUID}))`
		console.error(err)
		return tp?.setAttribute('data-tooltip', err)
	}
	return <const>{ success: true }
}
