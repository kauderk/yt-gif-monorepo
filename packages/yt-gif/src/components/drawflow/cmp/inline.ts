// @ts-nocheck
import type Drawflow from '$cmp/drawflow/src/drawflow'
import Content from './Content.svelte'
import Simple from './blocks/Simple.svelte'

export function createNodeComponents(editor: Drawflow) {}
export function registerNodeComponents(editor: Drawflow) {
	editor.registerNode('SvelteContent', Content)
	editor.registerNode('SimpleBlock', Simple)
}
