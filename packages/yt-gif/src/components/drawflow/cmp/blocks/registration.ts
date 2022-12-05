import type Drawflow from '$cmp/drawflow/src/drawflow'
import type { AddNodeProps } from '$cmp/drawflow/src/drawflow/method-types'
import type { DeepPartial } from '$lib/types/utilities'
import { ObjectValues } from '$lib/utils'
import { recursiveAssign } from '$lib/utils/object'
import { DrawflowBlocks } from './index'

export function createNodeComponents(editor: Drawflow) {
	addNode({
		cords: { x: 300, y: 300 },
		node: {
			html: DrawflowBlocks.PlayerBlock.GraphNodeID,
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
