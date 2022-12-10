import { DrawflowBlocks } from '../index'
import { DrawflowStore as ctx } from '../../store'
import type ChapterBlock from './Index.svelte'
import type { ChapterData } from 'src/routes/api/youtube/chapters/+server'
import { get } from 'svelte/store'

export function CreateChapterBlocks(data: ChapterData) {
	data.chapters
		?.map(c => {
			const _ = c.chapterRenderer
			return <ChapterBlock['$$prop_def']>{
				title: _.title.simpleText,
				content: 'BLOCK',
				start: _.timeRangeStartMillis,
				thumbnail: {
					..._.thumbnail.thumbnails[0],
					src: _.thumbnail.thumbnails[0].url,
				},
			}
		})
		.forEach((props, i) => {
			CreateChapterBlock(i, props)
		})
}
export function CreateChapterBlock(i = 0, props: ChapterBlock['$$prop_def']) {
	const placeholder = <const>{
		name: 'ChapterBlock',
		connections: {
			inputs: 1,
			outputs: 1,
		},
		cords: {
			x: 0 + i * 100,
			y: 0 + i * 100,
		},
		data: {},
		node: {
			classoverride: 'ChapterBlock',
			html: DrawflowBlocks.ChapterBlock.GraphNodeID,
			typenode: 'svelte',
			props,
		},
	}
	get(ctx).editor.addNode(placeholder)
}
