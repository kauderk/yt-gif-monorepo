// FIXME: HOW DO YOU TYPE THIS
import { default as Content } from '../Content.svelte'
import { default as Simple } from '../blocks/Simple.svelte'
import { default as Player } from '../blocks/Player.svelte'
import { default as Shadow } from '../blocks/Shadow.svelte'
import { default as SocialMediaPost } from '../blocks/SocialMediaPost.svelte'
import { default as SquareTags } from '../blocks/SquareTags.svelte'
import { default as Tools } from '../blocks/Tools.svelte'
import { default as Video } from '../blocks/Video.svelte'

const keys = <const>{
	SvelteContent: 'SvelteContent',
	SimpleBlock: 'SimpleBlock',
	PlayerBlock: 'PlayerBlock',
	ShadowBlock: 'ShadowBlock',
	SocialMediaPost: 'SocialMediaPost',
	SquareTagsBlock: 'SquareTagsBlock',
	ToolsBlock: 'ToolsBlock',
	VideoBlock: 'VideoBlock',
}

export const items = [
	{
		id: 1,
		icon: 'home',
		GraphNodeID: keys.SvelteContent,
		cmp: Content,
		title: 'To they four in love',
	},
	{
		id: 2,
		icon: 'info',
		GraphNodeID: keys.SimpleBlock,
		cmp: Simple,
		title: 'Concluded resembled suspected his resources curiosity joy',
	},
	{
		id: 3,
		icon: 'chat',
		GraphNodeID: keys.PlayerBlock,
		cmp: Player,
		title: 'Led all cottage met enabled attempt through talking delight',
	},
	{
		id: 4,
		icon: 'call',
		GraphNodeID: keys.ShadowBlock,
		cmp: Shadow,
		title: 'Dare he feet my tell busy',
	},
	{
		id: 5,
		icon: 'security',
		GraphNodeID: keys.SocialMediaPost,
		cmp: SocialMediaPost,
		title: 'Considered imprudence of he friendship boisterous',
	},
	{
		id: 6,
		icon: 'favorite',
		GraphNodeID: keys.SquareTagsBlock,
		cmp: SquareTags,
		title: 'Am of mr friendly by strongly peculiar juvenile',
	},
	{
		id: 7,
		icon: 'restaurant',
		GraphNodeID: keys.ToolsBlock,
		cmp: Tools,
		title: 'Goodness doubtful material has denoting suitable she two',
	},
	{
		id: 8,
		icon: 'tag_faces',
		GraphNodeID: keys.VideoBlock,
		cmp: Video,
		title: 'He otherwise me incommode explained so in remaining',
	},
]

export interface TItemCtx {
	id: number
	icon: string
	GraphNodeID: typeof keys[keyof typeof keys]
	cmp: any
	title: string
}
