import { getMap_smart } from '../../../../../../lib/backend-frontend/get-maps'
import { Value_AtIndexInMap } from '../../../../../../lib/backend-frontend/map-query'
import { getUidFromBlock } from '../../../../../../lib/dom/elements-yt-gif-parent'
import type { IArrObj} from '../../../types';
import { timestampObj } from '../../../types'
import { OutOfBoundsSibling } from '../guard-clause'
import { isKey } from '../types'

export type TIDs = ReturnType<typeof GetBlockIDs>
export function GetBlockIDs(block: HTMLElement) {
	return <const>{
		mapsKEY: block.id,
		tempUID: getUidFromBlock(block),
	}
}
export async function getCashedEmulationArr(
	mapsKEY: string,
	map_successfulEmulationArr: Map<string, IArrObj[]>
) {
	return (await getMap_smart(mapsKEY, map_successfulEmulationArr, () =>
		Array<IArrObj>()
	)) as IArrObj[]
}
export function GetTargetObj(
	siblingsArr: Element[],
	node: Element,
	startEndMap: Trm_map
) {
	const defaultParent = siblingsArr.find(x => x === node)!
	const index = siblingsArr.indexOf(node)
	if (OutOfBoundsSibling(index, defaultParent)) {
		return null
	}

	const content = Value_AtIndexInMap(startEndMap, index, isKey)
	if (!content) {
		return null
	}
	return <const>{ index, defaultParent, content }
}

export function getPositionObj(
	ObjAsKey: TObjAsKey,
	targetNodeParent: QrySearch
) {
	const { indent, similarCount, uid: fromUid } = ObjAsKey
	const similarCountButRoot = indent == 0 ? 0 : similarCount

	return <const>{
		indent,
		similarCount,
		fromUid,
		fromUniqueUid: fromUid + similarCountButRoot,
		// FIXME!
		page: <startEnd>['start', 'end'].find(
				key =>
					targetNodeParent?.classList.contains(
						// @ts-ignore come on!
						timestampObj[key]?.targetClass
					)
				// find timestampObj key that is included in targetNode classlist
			) || 'timestamp',
	}
}
