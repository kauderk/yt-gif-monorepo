import type Drawflow from '$cmp/drawflow/src/drawflow'
import type { AddNodeProps } from '$cmp/drawflow/src/drawflow/method-types'
import { ObjectValues } from '$lib/utils'
import { DrawflowBlocks } from './index'

export function createNodeComponents(editor: Drawflow) {
	
	addNode({
		cords: { x: 31, y: 349.5 },
		node: {
			html: DrawflowBlocks.InputBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 32.5, y: 479 },
		node: {
			html: DrawflowBlocks.InputBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 32, y: 611 },
		node: {
			html: DrawflowBlocks.InputBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 52, y: 157.7 },
		node: {
			html: DrawflowBlocks.TitleNoteBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 801, y: 431.4 },
		node: {
			html: DrawflowBlocks.TitleNoteBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 1246.4, y: 736.7 },
		node: {
			html: DrawflowBlocks.TitleNoteBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 603.4, y: 92 },
		node: {
			html: DrawflowBlocks.ContactDetailsBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 233, y: 328.5 },
		node: {
			html: DrawflowBlocks.AddressBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 633, y: 615.4 },
		node: {
			html: DrawflowBlocks.OrganizationBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 1134, y: 131.4 },
		node: {
			html: DrawflowBlocks.UserBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 1599.5, y: 376.5 },
		node: {
			html: DrawflowBlocks.OrganizationProfileBlock.GraphNodeID,
		}
	})
	addNode({
		cords: { x: 1139, y: 502.7 },
		node: {
			html: DrawflowBlocks.OrganizationTypeBlock.GraphNodeID,
		}
	})

    return undefined

	return ObjectValues(DrawflowBlocks).forEach((o, i) => {
		addNode({
			cords: { x: 0 + i * 100, y: 0 + i * 100 },
			node: {
				html: o.GraphNodeID,
			},
		})
	})

	return undefined

	type RecursivePartial<T> = {
		[P in keyof T]?: RecursivePartial<T[P]>
	}
	function addNode(partial: RecursivePartial<AddNodeProps> = {}) {
		const placeholder = <const>{
			name: 'graph-node',
			connections: {
				inputs: 1,
				outputs: 1,
				...partial.connections,
			},
			cords: {
				y: 150,
				x: 600,
				...partial.cords,
			},
			// this could be troublesome
			data: { ...partial.data },
			node: {
				classoverride: 'graph-node',
				html: DrawflowBlocks.YTGIFBlock.GraphNodeID,
				typenode: 'svelte',
				...partial.node,
			},
		}
		// how do you spread nested cursive object without loosing placeholder properties?
		editor.addNode(placeholder)
	}
}

export function registerNodeComponents(editor: Drawflow) {
	Object.values(DrawflowBlocks).forEach(o => {
		editor.registerNode(o.GraphNodeID, o.cmp)
	})
}
