import Api from './Api.svelte'
import Chapter from './Chapter.svelte'
import Content from './Content.svelte'
import Simple from './Simple.svelte'
import Player from './Player.svelte'
import Shadow from './Shadow.svelte'
import SocialMediaPost from './SocialMediaPost.svelte'
import SquareTags from './SquareTags.svelte'
import Tools from './Tools.svelte'
import Video from './Video.svelte'
import MyBlock from './MyBlock.svelte'
import Ytvid from './Ytvid.svelte'

type Block = {
	[key: s]: {
		GraphNodeID: s
		cmp: any
		provider?: boolean
	}
}

export const DrawflowBlocks: Block = <const>{
	ApiBlock: {
		GraphNodeID: 'ApiBlock',
		cmp: Api,
		provider: true,
	},
	ChapterBlock: {
		GraphNodeID: 'ChapterBlock',
		cmp: Chapter,
	},
	SvelteContent: {
		GraphNodeID: 'SvelteContent',
		cmp: Content,
	},
	SimpleBlock: {
		GraphNodeID: 'SimpleBlock',
		cmp: Simple,
	},
	PlayerBlock: {
		GraphNodeID: 'PlayerBlock',
		cmp: Player,
	},
	ShadowBlock: {
		GraphNodeID: 'ShadowBlock',
		cmp: Shadow,
	},
	SocialMediaPost: {
		GraphNodeID: 'SocialMediaPost',
		cmp: SocialMediaPost,
	},
	SquareTagsBlock: {
		GraphNodeID: 'SquareTagsBlock',
		cmp: SquareTags,
	},
	ToolsBlock: {
		GraphNodeID: 'ToolsBlock',
		cmp: Tools,
	},
	VideoBlock: {
		GraphNodeID: 'VideoBlock',
		cmp: Video,
	},
	MyBlock: {
		GraphNodeID: 'MyBlock',
		cmp: MyBlock,
	},
	YtvidBlock: {
		GraphNodeID: 'YtvidBlock',
		cmp: Ytvid,
	},
}
