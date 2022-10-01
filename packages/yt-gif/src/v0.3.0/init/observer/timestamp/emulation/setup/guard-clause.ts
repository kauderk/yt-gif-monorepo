import { Value_AtIndexInMap } from '../../../../../lib/backend-frontend/map-query'
import { isKey } from './types'
import {
	ExtractUrlsObj,
	ExtractContentFromCmpt,
} from '$v3/init/formatter/query/extract'

export function hasAnyVideoUrl(capture: s) {
	// https://gist.github.com/tonY1883/a3b85925081688de569b779b4657439b
	return ExtractUrlsObj(ExtractContentFromCmpt(capture))?.match
}
export function OutOfBoundsSibling(
	targetIndex: number,
	targetNodeParent: Element | undefined
) {
	return (
		targetIndex == -1 || !targetNodeParent || !targetNodeParent?.parentNode
	)
}
export function DelayedBlocks(
	startEndComponentMap: Trm_map,
	siblingsArr: Element[],
	node: Element
) {
	return (
		!startEndComponentMap ||
		(startEndComponentMap.size !== siblingsArr.length &&
			!Value_AtIndexInMap(
				startEndComponentMap,
				siblingsArr.indexOf(node),
				isKey
			))
	)
}
