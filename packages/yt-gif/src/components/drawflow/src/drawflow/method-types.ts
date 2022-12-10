import type { Content } from '@tiptap/core'
import type { ID, DrawflowNode } from './types'

// FIXME: there are too many ways to describe a node
type x = DrawflowNode
export interface AddNodeProps {
	name: ID

	connections: {
		inputs: n
		outputs: n
	}

	cords: {
		y: n
		x: n
	}

	data: any

	content: Content

	node: {
		classoverride: string
		html: string
		typenode: boolean | 'svelte' | 'vue'
		props?: {}
	}
}
