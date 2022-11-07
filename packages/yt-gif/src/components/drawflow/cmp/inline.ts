// @ts-nocheck
import type Drawflow from '$cmp/drawflow/src/drawflow'
import Content from './Content.svelte'
import Simple from './blocks/Simple.svelte'
import Player from './blocks/Player.svelte'
import ShadowBlock from './blocks/Shadow.svelte'
import SocialMediaPost from './blocks/SocialMediaPost.svelte'
import SquareTags from './blocks/SquareTags.svelte'
import Tools from './blocks/Tools.svelte'
import Video from './blocks/Video.svelte'

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
		1100,
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
		215,
		'graph-node',
		{},
		'ShadowBlock', // drawflow/cmp/ShadowBlock.svelte
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
		'SocialMediaPost', // drawflow/cmp/SocialMediaPost.svelte
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
		'SquareTagsBlock', // drawflow/cmp/SquareTags.svelte
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
		'ToolsBlock', // drawflow/cmp/Tools.svelte
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
		'VideoBlock', // drawflow/cmp/Video.svelte
		'svelte'
	)
}
export function registerNodeComponents(editor: Drawflow) {
	editor.registerNode('SvelteContent', Content)
	editor.registerNode('SimpleBlock', Simple)
	editor.registerNode('PlayerBlock', Player)
	editor.registerNode('ShadowBlock', ShadowBlock)
	editor.registerNode('SocialMediaPost', SocialMediaPost)
	editor.registerNode('SquareTagsBlock', SquareTags)
	editor.registerNode('ToolsBlock', Tools)
	editor.registerNode('VideoBlock', Video)
}
