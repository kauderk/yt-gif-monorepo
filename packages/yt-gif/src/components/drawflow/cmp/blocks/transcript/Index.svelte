<script lang="ts">
	import type { TranscriptResponse } from 'youtube-transcript'
	import Tooltip from '../../views/toolbar/Tooltip.svelte'
	import { CreateChapterBlock } from '../chapter/create'
	export let row = {
		text: 'Title',
		duration: 0,
		offset: 0,
	}
	export let transcript: TranscriptResponse[] = [row]
</script>

<div>
	{#each transcript as { text, duration, offset }}
		<Tooltip
			info={[
				`Timestamp: ${offset}`,
				`CLick to create a block at this point`,
				`Duration ${duration + 30 * 60}`,
			]}>
			<a
				href="#{text}"
				on:click={() => {
					CreateChapterBlock(0, {
						start: offset,
						title: text,
					})
				}}>{text}</a>
		</Tooltip>
	{/each}
</div>
