import { DrawflowBlocks } from './blocks/index'

let count = 0
const uuid = () => (count += 1)

export const items = [
	{
		id: uuid(),
		icon: 'home',
		...DrawflowBlocks.SvelteContent,
		title: 'To they four in love',
	},
	{
		id: uuid(),
		icon: 'info',
		...DrawflowBlocks.SimpleBlock,
		title: 'Concluded resembled suspected his resources curiosity joy',
	},
	{
		id: uuid(),
		icon: 'chat',
		...DrawflowBlocks.PlayerBlock,
		title: 'Led all cottage met enabled attempt through talking delight',
	},
	{
		id: uuid(),
		icon: 'call',
		...DrawflowBlocks.ShadowBlock,
		title: 'Dare he feet my tell busy',
	},
	{
		id: uuid(),
		icon: 'security',
		...DrawflowBlocks.SocialMediaPost,
		title: 'Considered imprudence of he friendship boisterous',
	},
	{
		id: uuid(),
		icon: 'favorite',
		...DrawflowBlocks.SquareTagsBlock,
		title: 'Am of mr friendly by strongly peculiar juvenile',
	},
	{
		id: uuid(),
		icon: 'restaurant',
		...DrawflowBlocks.ToolsBlock,
		title: 'Goodness doubtful material has denoting suitable she two',
	},
	{
		id: uuid(),
		icon: 'tag_faces',
		...DrawflowBlocks.VideoBlock,
		title: 'He otherwise me incommode explained so in remaining',
	},
	{
		id: uuid(),
		icon: 'info',
		...DrawflowBlocks.MyBlock,
		title: 'Test block',
	},
]

export interface TItemCtx {
	id: number
	icon: string
	GraphNodeID: typeof DrawflowBlocks[keyof typeof DrawflowBlocks]['GraphNodeID']
	cmp: any
	title: string
}
