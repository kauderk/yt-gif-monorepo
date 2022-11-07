// @ts-nocheck
import type Drawflow from 'drawflow'
import Content from './Content.svelte'
import Simple from './blocks/Simple.svelte'

export function createNodeComponents(editor: Drawflow) {
	editor.addNode(
		'github',
		1,
		1,
		150,
		300,
		'github',
		{},
		'SvelteContent', // drawflow/cmp/Content.svelte
		'svelte'
	)
	editor.addNode(
		'simple',
		1,
		1,
		150,
		300,
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
