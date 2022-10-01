import { closestBlock } from '../../../../../lib/dom/elements-yt-gif-parent'
import { ElementsPerBlock } from '../../../../../lib/dom/ytgif'
import { timestampObj } from '../../types'
import { Local } from './Local'
import {
	GetBlockIDs,
	GetTargetObj,
	getCashedEmulationArr,
} from './query/objects'
import { GetTmSetObj } from './query/timestamp-set'

const componentSel = `.${timestampObj.end.targetClass}, .${timestampObj.start.targetClass}, .${timestampObj.parent.className}`
export async function SetupRerenderedComponents(found: Element[]) {
	const local = Local(found)
	let siblingsArr: Element[] = []

	for (const node of local.renderedComponents) {
		const block = closestBlock(node) as HTMLElement
		if (!block) {
			continue
		}

		// you are iterating through renderedComponents (mutation records), so you need to get the original siblings of each block
		siblingsArr = ElementsPerBlock(block, `:is(${componentSel})`)

		const ids = GetBlockIDs(block)

		await local.TryUpdateMap(ids, siblingsArr, node)

		const target = GetTargetObj(siblingsArr, node, local.startEndMap)
		if (!target) {
			continue
		}

		const tmSetObj = GetTmSetObj(target, local.startEndMap, block, ids)

		const cashed = await getCashedEmulationArr(
			tmSetObj.blockID,
			local.map_successfulEmulationArr
		)
		cashed.push(tmSetObj)
	}
	return local.map_successfulEmulationArr
}
