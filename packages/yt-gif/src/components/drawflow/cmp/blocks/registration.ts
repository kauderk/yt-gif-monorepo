import type Drawflow from '$cmp/drawflow/src/drawflow'
import type { AddNodeProps } from '$cmp/drawflow/src/drawflow/method-types'
import type { DeepPartial } from '$lib/types/utilities'
import { ObjectValues } from '$lib/utils'
import { recursiveAssign } from '$lib/utils/object'
import { DrawflowBlocks } from './index'

export function createNodeComponents(editor: Drawflow) {
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
		cords: { x: 600, y: 50 },
		node: {
			html: DrawflowBlocks.ContactDetailsBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 600, y: 50 },
		node: {
			html: DrawflowBlocks.AddressBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 600, y: 50 },
		node: {
			html: DrawflowBlocks.OrganizationBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 600, y: 50 },
		node: {
			html: DrawflowBlocks.UserBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 600, y: 50 },
		node: {
			html: DrawflowBlocks.OrganizationTypeBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 600, y: 50 },
		node: {
			html: DrawflowBlocks.OrganizationProfileBlock.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 600, y: 50 },
		node: {
			html: DrawflowBlocks.Input.GraphNodeID,
		},
	})
	addNode({
		cords: { x: 600, y: 50 },
		node: {
			html: DrawflowBlocks.TitleNote.GraphNodeID,
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

	function addNode(partial: DeepPartial<AddNodeProps> = {}) {
		const placeholder = {
			name: 'graph-node',
			connections: {
				inputs: 1,
				outputs: 1,
			},
			cords: {
				y: 150,
				x: 600,
			},
			// this could be troublesome
			data: {},
			node: {
				classoverride: 'graph-node',
				html: DrawflowBlocks.YTGIFBlock.GraphNodeID,
				typenode: 'svelte',
			},
		}
		// @ts-ignore
		const config = recursiveAssign(placeholder, partial) as AddNodeProps
		// how do you spread nested cursive object without loosing placeholder properties?
		editor.addNode(config)
	}
}

export function registerNodeComponents(editor: Drawflow) {
	Object.values(DrawflowBlocks).forEach(o => {
		editor.registerNode(o.GraphNodeID, o.cmp)
	})
}
