import { ChangeElementType, elm } from '$lib/utils'
import { fmtTimestamp } from '../../../../timestamp/utils'
import { timestampObj } from '../../types'
import type { getPositionObj } from './query/objects'

export function ClearParentNode(targetNodeParent: Element) {
	Array.from(targetNodeParent.attributes)?.forEach?.(attr =>
		targetNodeParent?.removeAttribute(attr.name)
	)
	targetNodeParent = ChangeElementType(targetNodeParent, 'div')
	targetNodeParent.className = timestampObj.parent.className
	targetNodeParent.innerHTML = ''
	return targetNodeParent
}
export function CreatePlaceholder(
	h: ReturnType<typeof getPositionObj>,
	content: string
) {
	const targetNode = <IBtnArrObj>elm([], 'a')
	targetNode.setAttribute(timestampObj.attr.timestampStyle, h.page)
	targetNode.setAttribute(timestampObj.attr.emulation, '')
	targetNode.setAttribute(timestampObj.attr.timestamp, content)
	targetNode.className = timestampObj.roamClassName
	const a = elm([], 'a')
	targetNode.appendChild(a)
	targetNode.a = a
	targetNode.a.textContent = content
	targetNode.a.textContent = fmtTimestamp()(targetNode.a.textContent) // javascript is crazy!
	return targetNode
}
