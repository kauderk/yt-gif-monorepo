import { ObjectValues } from '$lib/utils'
import { DrawflowBlocks } from './blocks/index'

let count = 0
const uuid = () => (count += 1)

const knownIcons = [
	'home',
	'chat',
	'call',
	'security',
	'favorite',
	'restaurant',
	'tag_faces',
	'info',
]
const AutoItems = ObjectValues(DrawflowBlocks).map((o, i) => {
	return {
		id: uuid(),
		icon: knownIcons[i % knownIcons.length],
		...o,
		title: o.GraphNodeID,
	}
})
export const items = AutoItems

export interface TItemCtx {
	id: number
	icon: string
	GraphNodeID: typeof DrawflowBlocks[keyof typeof DrawflowBlocks]['GraphNodeID']
	cmp: any
	title: string
}
