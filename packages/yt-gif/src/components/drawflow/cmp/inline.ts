// @ts-nocheck
import type Drawflow from '$cmp/drawflow/src/drawflow'
import Content from './Content.svelte'
import Simple from './blocks/Simple.svelte'

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
}
export function registerNodeComponents(editor: Drawflow) {
	editor.registerNode('SvelteContent', Content)
	editor.registerNode('SimpleBlock', Simple)
}
