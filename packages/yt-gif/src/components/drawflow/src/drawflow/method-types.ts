import type { Content } from '@tiptap/core'
import type { ID, DrawflowNode, DrawflowNodeBase } from './types'

// FIXME: there are too many ways to describe a node
type x = DrawflowNode
export interface AddNodeProps extends DrawflowNodeBase {
	connections: {
		inputs: n
		outputs: n
	}

	cords: {
		y: n
		x: n
	}

	node: {
		classoverride: string
		html: string
		typenode: boolean | 'svelte' | 'vue'
		props?: {}
	}
}
