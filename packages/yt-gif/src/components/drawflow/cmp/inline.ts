// @ts-nocheck
import type Drawflow from '$cmp/drawflow/src/drawflow'
import Content from './Content.svelte'
import Simple from './blocks/Simple.svelte'
import Player from './blocks/Player.svelte'

export function createNodeComponents(editor: Drawflow) {
	editor.addNode(
		'github',
		1,
		1,
		600,
		210,
		'github',
		{},
		'SvelteContent', // drawflow/cmp/Content.svelte
		'svelte'
	)
	editor.addNode(
		'simple',
		1,
		1,
		863,
		515,
		'simple',
		{},
		'SimpleBlock', // drawflow/cmp/Simple.svelte
		'svelte'
	)
	editor.addNode(
		'simple',
		1,
		1,
		1000,
		715,
		'simple',
		{},
		'PlayerBlock', // drawflow/cmp/Simple.svelte
		'svelte'
	)
}
export function registerNodeComponents(editor: Drawflow) {
	editor.registerNode('SvelteContent', Content)
	editor.registerNode('SimpleBlock', Simple)
	editor.registerNode('PlayerBlock', Player)
}
