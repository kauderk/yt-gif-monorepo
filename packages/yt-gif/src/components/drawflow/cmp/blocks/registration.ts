import type Drawflow from '$cmp/drawflow/src/drawflow'
import { DrawflowBlocks } from './index'

export function createNodeComponents(editor: Drawflow) {
	editor.addNode(
		'graph-node',
		1,
		1,
		600,
		210,
		'graph-node',
		{},
		DrawflowBlocks.SvelteContent.GraphNodeID, // drawflow/cmp/Content.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		863,
		515,
		'graph-node',
		{},
		DrawflowBlocks.SimpleBlock.GraphNodeID, // drawflow/cmp/Simple.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		1100,
		715,
		'graph-node',
		{},
		DrawflowBlocks.PlayerBlock.GraphNodeID, // drawflow/cmp/Simple.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		100,
		715,
		'graph-node',
		{},
		DrawflowBlocks.PlayerBlock.GraphNodeID, // drawflow/cmp/Simple.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		1000,
		215,
		'graph-node',
		{},
		DrawflowBlocks.ShadowBlock.GraphNodeID, // drawflow/cmp/ShadowBlock.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		500,
		315,
		'graph-node',
		{},
		DrawflowBlocks.SocialMediaPost.GraphNodeID, // drawflow/cmp/SocialMediaPost.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		550,
		715,
		'graph-node',
		{},
		DrawflowBlocks.SquareTagsBlock.GraphNodeID, // drawflow/cmp/SquareTags.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		50,
		50,
		'graph-node',
		{},
		DrawflowBlocks.ToolsBlock.GraphNodeID, // drawflow/cmp/Tools.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		600,
		50,
		'graph-node',
		{},
		DrawflowBlocks.VideoBlock.GraphNodeID, // drawflow/cmp/Video.svelte
		'svelte'
	)
}
export function registerNodeComponents(editor: Drawflow) {
	Object.values(DrawflowBlocks).forEach(o => {
		editor.registerNode(o.GraphNodeID, o.cmp)
	})
}
