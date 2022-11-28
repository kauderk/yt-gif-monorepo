import type Drawflow from '$cmp/drawflow/src/drawflow'
import type { AddNodeProps } from '$cmp/drawflow/src/drawflow/method-types'
import { DrawflowBlocks } from './index'

export function createNodeComponents(editor: Drawflow) {
	return addNode()

	addNode({
		cords: { x: 863, y: 515 },
		node: {
			html: DrawflowBlocks.SimpleBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 1100, y: 715 },
		node: {
			html: DrawflowBlocks.PlayerBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 100, y: 715 },
		node: {
			html: DrawflowBlocks.PlayerBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 1000, y: 215 },
		node: {
			html: DrawflowBlocks.ShadowBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 500, y: 315 },
		node: {
			html: DrawflowBlocks.SocialMediaPost.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 550, y: 715 },
		node: {
			html: DrawflowBlocks.SquareTagsBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 50, y: 50 },
		node: {
			html: DrawflowBlocks.ToolsBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 600, y: 50 },
		node: {
			html: DrawflowBlocks.VideoBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 1000, y: 50 },
		node: {
			html: DrawflowBlocks.MyBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 100, y: 100 },
		node: {
			html: DrawflowBlocks.YtvidBlock.GraphNodeID,
		},
	})
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
				y: 600,
				x: 210,
				...partial.cords,
			},
			// this could be troublesome
			data: { ...partial.data },
			node: {
				classoverride: 'graph-node',
				html: DrawflowBlocks.SvelteContent.GraphNodeID,
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
