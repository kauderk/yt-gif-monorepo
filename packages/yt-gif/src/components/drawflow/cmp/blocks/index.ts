import YTGIF from './YTGIF.svelte'
import Api from './Api.svelte'
import Chapter from './chapter/Index.svelte'
import Transcript from './transcript/Index.svelte'
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
import ContactDetails from './diagram/ContactDetails.svelte'
import Address from './diagram/Address.svelte'
import Organization from './diagram/Organization.svelte'
import OrganizationType from './diagram/OrganizationType.svelte'
import User from './diagram/User.svelte'
import OrganizationProfile from './diagram/OrganizationProfile.svelte'
import Input from './diagram/Input.svelte'
import TitleNote from './diagram/TitleNote.svelte'

type Block = {
	[key: s]: {
		GraphNodeID: s
		cmp: any
		provider?: boolean
        title?: string
	}
}

export const DrawflowBlocks: Block = <const>{
	YTGIFBlock: {
		GraphNodeID: 'YTGIFBlock',
		cmp: YTGIF,
		provider: true,
	},
	ApiBlock: {
		GraphNodeID: 'ApiBlock',
		cmp: Api,
		provider: true,
	},
	ChapterBlock: {
		GraphNodeID: 'ChapterBlock',
		cmp: Chapter,
	},
	TranscriptBlock: {
		GraphNodeID: 'TranscriptBlock',
		cmp: Transcript,
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
	ContactDetailsBlock: {
		GraphNodeID: 'ContactDetailsBlock',
        title: "Create Contact Details",
		cmp: ContactDetails,
	},
	AddressBlock: {
		GraphNodeID: 'AddressBlock',
        title: "Create Address",
		cmp: Address,
	},
	OrganizationBlock: {
		GraphNodeID: 'OrganizationBlock',
        title: "Create Organization",
		cmp: Organization,
	},
	UserBlock: {
		GraphNodeID: 'UserBlock',
        title: "Create User",
		cmp: User,
	},
	OrganizationTypeBlock: {
		GraphNodeID: 'OrganizationTypeBlock',
        title: "Create Organization Type",
		cmp: OrganizationType,
	},
	OrganizationProfileBlock: {
		GraphNodeID: 'OrganizationProfileBlock',
        title: "Create Organization Profile",
		cmp: OrganizationProfile,
	},
	InputBlock: {
		GraphNodeID: 'InputBlock',
        title: "Input",
		cmp: Input,
	},
	TitleNoteBlock: {
		GraphNodeID: 'TitleNoteBlock',
        title: "",
		cmp: TitleNote,
	},
}
