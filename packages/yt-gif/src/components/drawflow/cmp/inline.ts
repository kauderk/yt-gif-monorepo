import type Drawflow from 'drawflow'

export function createNodeComponent(editor: Drawflow) {
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
}
