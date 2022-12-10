import { DrawflowBlocks } from '../index'
import { DrawflowStore as ctx } from '../../store'

import { get } from 'svelte/store'
import type { TranscriptData } from 'src/routes/api/youtube/transcript/+server'
import { createTiptapContent } from '$cmp/text-editor/tiptap/extension/parse'

export function CreateTranscriptBlock(data: TranscriptData) {
	const GraphNodeID = 'TranscriptBlock'

	const placeholder = <const>{
		name: GraphNodeID,
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
			classoverride: GraphNodeID,
			html: DrawflowBlocks.TranscriptBlock.GraphNodeID,
			typenode: 'svelte',
		},
		content: createTiptapContent(GraphNodeID, {
			transcript: data.id?.transcript ?? undefined,
		}),
	}
	get(ctx).editor.addNode(placeholder)
}
