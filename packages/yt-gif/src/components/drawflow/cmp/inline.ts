// @ts-nocheck
import type Drawflow from '$cmp/drawflow/src/drawflow'
import Content from './Content.svelte'
import Simple from './blocks/Simple.svelte'
import Player from './blocks/Player.svelte'
import ShadowBlock from './blocks/Shadow.svelte'

export function createNodeComponents(editor: Drawflow) {
	editor.addNode(
		'graph-node',
		1,
		1,
		600,
		210,
		'graph-node',
		{},
		'SvelteContent', // drawflow/cmp/Content.svelte
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
		'SimpleBlock', // drawflow/cmp/Simple.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		1000,
		715,
		'graph-node',
		{},
		'PlayerBlock', // drawflow/cmp/Simple.svelte
		'svelte'
	)
	editor.addNode(
		'graph-node',
		1,
		1,
		1000,
		315,
		'graph-node',
		{},
		'ShadowBlock', // drawflow/cmp/ShadowBlock.svelte
		'svelte'
	)
}
export function registerNodeComponents(editor: Drawflow) {
	editor.registerNode('SvelteContent', Content)
	editor.registerNode('SimpleBlock', Simple)
	editor.registerNode('PlayerBlock', Player)
	editor.registerNode('ShadowBlock', ShadowBlock)
}
