import type Drawflow from '$cmp/drawflow/src/drawflow'
import type { AddNodeProps } from '$cmp/drawflow/src/drawflow/types'
import type { DeepPartial } from '$lib/types/utilities'
import { ObjectValues } from '$lib/utils'
import { recursiveAssign } from '$lib/utils/object'
import { DrawflowBlocks } from './index'

export function createNodeComponents(editor: Drawflow) {
	addNode({
		pos_x: 300,
		pos_y: 700,

		html: DrawflowBlocks.ApiBlock.GraphNodeID,
	})

	function addNode(partial: DeepPartial<AddNodeProps> = {}) {
		const placeholder = {
			// connections
			inputs: 1,
			outputs: 1,

			// coordinates
			pos_y: 150,
			pos_x: 600,

			data: {},
			// node
			name: 'graph-node',
			class: 'graph-node',
			html: DrawflowBlocks.YTGIFBlock.GraphNodeID,
			typenode: 'svelte',
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
