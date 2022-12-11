import { ObjectValues } from '$lib/utils'
import { DrawflowBlocks, type TDrawflowBlocks } from './blocks/index'

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
export type ItemSlot = TDrawflowBlocks & {
	uid: n
	icon: s
	title: s
}
const AutoItems = ObjectValues(DrawflowBlocks).map((o, i) => {
	return {
		id: uuid(),
		icon: knownIcons[i % knownIcons.length],
		...o,
		//@ts-ignore
		title: o.title ?? o.GraphNodeID,
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

export type Scroller = {
	//scrollHeight: number
	deltaY: number
	scrollLeft: number
	scrollTop: number
	//scrollWidth: number
}
