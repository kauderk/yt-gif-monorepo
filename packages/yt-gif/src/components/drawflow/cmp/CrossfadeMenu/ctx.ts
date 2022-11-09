// FIXME: HOW DO YOU TYPE THIS
import { default as Player } from '../blocks/Player.svelte'
import { default as Shadow } from '../blocks/Shadow.svelte'
import { default as Tools } from '../blocks/Tools.svelte'
import { default as Video } from '../blocks/Video.svelte'
import { default as SquareTags } from '../blocks/SquareTags.svelte'
import { default as SocialMediaPost } from '../blocks/SocialMediaPost.svelte'

export const items = [
	{
		id: 1,
		icon: 'home',
		cmp: SocialMediaPost,
		title: 'To they four in love',
	},
	{
		id: 2,
		icon: 'info',
		cmp: Player,
		title: 'Concluded resembled suspected his resources curiosity joy',
	},
	{
		id: 3,
		icon: 'chat',
		cmp: Shadow,
		title: 'Led all cottage met enabled attempt through talking delight',
	},
	{ id: 4, icon: 'call', cmp: Tools, title: 'Dare he feet my tell busy' },
	{
		id: 5,
		icon: 'security',
		cmp: Video,
		title: 'Considered imprudence of he friendship boisterous',
	},
	{
		id: 6,
		icon: 'favorite',
		cmp: SquareTags,
		title: 'Am of mr friendly by strongly peculiar juvenile',
	},
	{
		id: 7,
		icon: 'restaurant',
		cmp: null,
		title: 'Goodness doubtful material has denoting suitable she two',
	},
	{
		id: 8,
		icon: 'tag_faces',
		cmp: null,
		title: 'He otherwise me incommode explained so in remaining',
	},
	{
		id: 9,
		icon: 'lock',
		cmp: null,
		title: 'Polite barton in it warmly do county length an',
	},
]
