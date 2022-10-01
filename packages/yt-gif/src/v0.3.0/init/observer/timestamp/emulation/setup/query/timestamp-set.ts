import { ObjKey_AtIndexInMap } from '../../../../../../lib/backend-frontend/map-query'
import type { IArrObj } from '../../../types'
import { ClearParentNode, CreatePlaceholder } from '../node'
import { hasAnyVideoUrl } from '../guard-clause'
import { isKey } from '../types'
import type { GetTargetObj, TIDs} from './objects';
import { getPositionObj } from './objects'

export function GetTmSetObj(
	target: NonNullable<ReturnType<typeof GetTargetObj>>,
	startEndMap: Trm_map,
	block: HTMLElement,
	ids: TIDs
) {
	const { index, content } = target

	const ObjAsKey = ObjKey_AtIndexInMap(startEndMap, index, isKey)!
	const position = getPositionObj(ObjAsKey, target.defaultParent)

	const parent = ClearParentNode(target.defaultParent)
	const placeholder = CreatePlaceholder(position, content)

	const { tempUID, mapsKEY } = ids

	const tmSetObj: IArrObj = <const>{
		...position,

		targetIndex: index,
		tempUID,

		targetNode: placeholder,
		appendToParent: () => parent?.appendChild(placeholder),
		targetNodeParent: parent,

		timestamp: content,
		hasAnyVideoUrl: hasAnyVideoUrl(ObjAsKey.capture),

		color: window.getComputedStyle(placeholder).color,
		ObjAsKey,
		blockUid: tempUID,
		block,
		blockID: mapsKEY,
		startEndComponentMap: startEndMap,
	}
	return tmSetObj
}
