// @ts-nocheck
import type Drawflow from '$cmp/drawflow/src/drawflow'
import Content from './Content.svelte'
import Simple from './blocks/Simple.svelte'
import Player from './blocks/Player.svelte'
import Shadow from './blocks/Shadow.svelte'
import SocialMediaPost from './blocks/SocialMediaPost.svelte'
import SquareTags from './blocks/SquareTags.svelte'
import Tools from './blocks/Tools.svelte'
import Video from './blocks/Video.svelte'

export const DrawflowKeyComponents = <const>{
	SvelteContent: 'SvelteContent',
	SimpleBlock: 'SimpleBlock',
	PlayerBlock: 'PlayerBlock',
	ShadowBlock: 'ShadowBlock',
	SocialMediaPost: 'SocialMediaPost',
	SquareTagsBlock: 'SquareTagsBlock',
	ToolsBlock: 'ToolsBlock',
	VideoBlock: 'VideoBlock',
}
const keys = DrawflowKeyComponents

export function createNodeComponents(editor: Drawflow) {
	editor.addNode(
		'graph-node',
		1,
		1,
		600,
		210,
		'graph-node',
		{},
		keys.SvelteContent, // drawflow/cmp/Content.svelte
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
		keys.SimpleBlock, // drawflow/cmp/Simple.svelte
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
		keys.PlayerBlock, // drawflow/cmp/Simple.svelte
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
		keys.PlayerBlock, // drawflow/cmp/Simple.svelte
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
		keys.ShadowBlock, // drawflow/cmp/ShadowBlock.svelte
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
		keys.SocialMediaPost, // drawflow/cmp/SocialMediaPost.svelte
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
		keys.SquareTagsBlock, // drawflow/cmp/SquareTags.svelte
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
		keys.ToolsBlock, // drawflow/cmp/Tools.svelte
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
		keys.VideoBlock, // drawflow/cmp/Video.svelte
		'svelte'
	)
}
export function registerNodeComponents(editor: Drawflow) {
	editor.registerNode(keys.SvelteContent, Content)
	editor.registerNode(keys.SimpleBlock, Simple)
	editor.registerNode(keys.PlayerBlock, Player)
	editor.registerNode(keys.ShadowBlock, Shadow)
	editor.registerNode(keys.SocialMediaPost, SocialMediaPost)
	editor.registerNode(keys.SquareTagsBlock, SquareTags)
	editor.registerNode(keys.ToolsBlock, Tools)
	editor.registerNode(keys.VideoBlock, Video)
}
