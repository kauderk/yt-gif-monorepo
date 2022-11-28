import { DrawflowBlocks } from '../index'
import { DrawflowStore as ctx } from '../../store'
import type ChapterBlock from './Index.svelte'
import type { ChapterData } from 'src/routes/api/youtube/chapters/+server'
import { get } from 'svelte/store'
import type { TranscriptData } from 'src/routes/api/youtube/transcript/+server'

export function CreateTranscriptBlock(data: TranscriptData) {
	const placeholder = <const>{
		name: 'graph-node',
		connections: {
			inputs: 1,
			outputs: 1,
		},
		cords: {
			x: 0,
			y: 0,
		},
		data: {},
		node: {
			classoverride: 'graph-node',
			html: DrawflowBlocks.TranscriptBlock.GraphNodeID,
			typenode: 'svelte',
			props: { transcript: data.id?.transcript },
		},
	}
	get(ctx).editor.addNode(placeholder)
}
