import { closestBlock } from './elements-yt-gif-parent'

export function ElementsPerBlock(block: QrySearch, selector: string) {
	if (!block) return []

	return block
		.queryAllasArr(selector)
		.filter(b => closestBlock(b)?.id == block.id) // FIXME: could be null checks
}
